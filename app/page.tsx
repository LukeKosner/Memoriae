"use client";

import BottomBar from "@/components/bottomBar.tsx";
import ChatView from "@/components/chatView.tsx";
import TopBar from "@/components/topBar.tsx";
import WelcomeScreen from "@/components/welcomeScreen.tsx";
import { useChat } from "ai/react";
import { Document } from "langchain/document";
import React from "react";

export default function Chat() {
  const [sourcesForMessages, setSourcesForMessages] = React.useState<
    Record<string, Document>
  >({});

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onResponse(response) {
      const sourcesHeader = response.headers.get("x-sources");
      const sources = sourcesHeader ? JSON.parse(atob(sourcesHeader)) : [];
      const messageIndexHeader = response.headers.get("x-message-index");
      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages({
          ...sourcesForMessages,
          [messageIndexHeader]: sources,
        });
      }
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />

      <div className="flex flex-grow justify-center">
        {messages.length !== 0 ? (
          <div className="flex flex-grow h-full w-full">
            <ChatView messages={messages}  />
          </div>
        ) : (
          <WelcomeScreen />
        )}
      </div>

      <div className="bottom-0">
        <BottomBar
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
