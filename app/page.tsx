"use client";

import React, { FormEvent } from "react";
import BottomBar from "@/components/bottomBar.tsx";
import ChatView from "@/components/chatView.tsx";
import WelcomeScreen from "@/components/welcomeScreen.tsx";
import { useChat } from "ai/react";
import { Document } from "langchain/document";
import { Toaster, toast } from "sonner";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.tsx";
import DataView from "@/components/dataView.tsx";
import Header from "@/components/header";

export default function Chat() {
  const [sourcesForMessages, setSourcesForMessages] = React.useState<
    Record<string, Document>
  >({});

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    stop,
    reload,
    isLoading,
    setMessages,
  } = useChat({
    onResponse(response) {
      // Process response
      const sourcesHeader = response.headers.get("x-sources");
      const sources = sourcesHeader ? JSON.parse(atob(sourcesHeader)) : [];
      const messageIndexHeader = response.headers.get("x-message-index");

      if (sources.length && messageIndexHeader !== null) {
        setSourcesForMessages((prevMessages) => ({
          ...prevMessages,
          [messageIndexHeader]: sources,
        }));
      }
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit(e);
  }

  const destroyChat = React.useCallback(() => {
    setMessages([]);
  }, [setMessages]);

  return (
    <div className="flex flex-grow flex-col min-h-screen">
      <Header destroyChat={destroyChat} />
      <div className="flex flex-grow flex-col items-center justify-center">
        {messages.length !== 0 ? (
          <div className="flex flex-col flex-grow mt-3">
            <div className="flex flex-grow w-screen flex-col">
              <ResizablePanelGroup
                direction="horizontal"
                className="flex flex-col flex-grow"
              >
                <ResizablePanel defaultSize={66.6}>
                  <ChatView messages={messages} />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={33.3} className="hidden md:block">
                  <DataView sourcesForMessages={sourcesForMessages} />
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        ) : (
          <WelcomeScreen />
        )}
      </div>

      <div className="bottom-0 w-full">
        <BottomBar
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={(e: FormEvent<HTMLFormElement>) => submit(e)}
          stop={stop}
          isLoading={isLoading}
          reload={reload}
          messages={messages}
          destroyChat={destroyChat}
        />
      </div>
      <Toaster />
    </div>
  );
}
