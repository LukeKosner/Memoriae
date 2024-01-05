import { Message } from "ai/react";
import Link from "next/link";
import sourceRetriever, { InterviewWithType } from "@/lib/sources.ts";
import React from "react";
import { Badge } from "./ui/badge.tsx";

export default function ChatView({ messages }: { messages: Message[] }) {
  const [sourcesForMessages, setSourcesForMessages] = React.useState<
    InterviewWithType[]
  >([]);
  function processText(text) {
    const regex = /\(([^)]+)\)/g;
    const parts = text.split(regex);
    const result = [];

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];

      if (i % 2 !== 0) {
        // This is a matched group (odd index)
        const sourceName = sourceRetriever(part.toLowerCase());

        if (sourceName === undefined) {
          result.push(`(${part})`);
        } else {
          result.push(
            <Link
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href={sourceName.url}
            >
              <Badge variant="secondary" key={i}>
                {sourceName.name}
              </Badge>
            </Link>,
          );
        }
      } else {
        result.push(part);
      }
    }

    return result;
  }

  return (
    <div className="flex flex-col flex-grow space-y-3 p-3">
      {messages
        .filter((m) => m.content !== "")
        .map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`py-2 px-3 rounded-xl max-w-2xl ${
                m.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              <p>{processText(m.content)}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
