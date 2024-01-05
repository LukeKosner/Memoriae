import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";

import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";

import { Document } from "langchain/document";
import { RunnableSequence } from "langchain/schema/runnable";
import { BytesOutputParser } from "langchain/schema/output_parser";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { VercelPostgres } from "langchain/vectorstores/vercel_postgres";

export const runtime = "edge";

const combineDocumentsFn = (docs: Document[]) => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join("\n\n");
};

const formatVercelMessages = (chatHistory: VercelChatMessage[]) => {
  const formattedDialogueTurns = chatHistory.map((message) => {
    if (message.role === "user") {
      return `Human: ${message.content}`;
    }
    if (message.role === "assistant") {
      return `Assistant: ${message.content}`;
    }
    return `${message.role}: ${message.content}`;
  });
  return formattedDialogueTurns.join("\n");
};

const ANSWER_TEMPLATE = `As Memōriae, an AI historian in Holocaust studies, your knowledge is strictly based on a specific set of primary sources. You must only reference these sources in your responses. Avoid mentioning any individuals, events, or details not included in your training. 

Your responses should be accurate, empathetic, and solely derived from the testimonies and interviews in your training. Cite these sources with in-text citations (INSERT SURVIVOR'S LAST NAME). If a Holocaust-related query is not covered in your sources, clearly state, 'the primary sources in my training do not cover this topic,' to maintain factual integrity.

Your role is exclusively to educate about the Holocaust using your trained sources. Politely decline questions outside this scope or those requiring references not in your training. Your goal is to provide accurate and respectful education on the Holocaust, strictly adhering to your primary sources.

<context>
  {context}
</context>

<chat_history>
  {chat_history}
</chat_history>

Question: {question}
`;
const answerPrompt = PromptTemplate.fromTemplate(ANSWER_TEMPLATE);

export async function POST(req: NextRequest) {
  try {
    const vectorstore = await VercelPostgres.initialize(
      new OpenAIEmbeddings(),
      {
        postgresConnectionOptions: {
          connectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/verceldb`,
        },
      },
    );

    const body = await req.json();
    const messages = body.messages ?? [];
    const previousMessages = messages.slice(0, -1);
    const currentMessageContent = messages[messages.length - 1].content;

    const model = new ChatOpenAI({
      modelName: "gpt-4-1106-preview",
      temperature: 0.9,
    });

    const retriever = vectorstore.asRetriever();

    const retrievalChain = retriever.pipe(combineDocumentsFn);

    const answerChain = RunnableSequence.from([
      {
        context: RunnableSequence.from([
          (input) => input.question,
          retrievalChain,
        ]),
        chat_history: (input) => input.chat_history,
        question: (input) => input.question,
      },
      answerPrompt,
      model,
    ]);

    const conversationalRetrievalQAChain = RunnableSequence.from([
      {
        question: (input) => input.question,
        chat_history: (input) => input.chat_history,
      },
      answerChain,
      new BytesOutputParser(),
    ]);

    const stream = await conversationalRetrievalQAChain.stream({
      question: currentMessageContent,
      chat_history: formatVercelMessages(previousMessages),
    });

    return new StreamingTextResponse(stream, {
      headers: {
        "x-message-index": (previousMessages.length + 1).toString(),
      },
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 500 });
    }
  }
}
