import { Message } from "ai/react";
import { Card, CardContent } from "@/components/ui/card.tsx";
import Link from "next/link";
import sourceRetriever from "@/lib/sources.ts";
import React from "react";
import { Document } from "langchain/document";
import { Badge } from "./ui/badge.tsx";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable.tsx";
import DataView from "./dataView.tsx";

export default function ChatView({
  messages,
  sources,
}: {
  messages: Message[];
  sources: Record<string, Document>;
}) {
  function processText(text: string) {
    const regex = /\(([^)]+)\)/g;
    const parts = text.split(regex);
    const result = [];

    for (let i = 0; i < parts.length; i += 1) {
      const part = parts[i];
      // Check if this part is a matched group (odd index)
      if (i % 2 !== 0) {
        const sourceName = sourceRetriever(part.toLowerCase());

        result.push(
          <Link
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
            href={`${sourceName?.url}`}
          >
            <Badge variant="secondary" key={i}>
              {sourceName?.name}
            </Badge>
          </Link>,
        );
      } else {
        result.push(part);
      }
    }

    return result;
  }

  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="flex flex-grow h-full w-full"
    >
      <ResizablePanel defaultSize={75}>
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
                <Card
                  className={`pt-3 max-w-4xl ${
                    m.role === "user"
                      ? "text-blue-500 border-blue-500"
                      : "text-200"
                  }`}
                >
                  <CardContent>
                    <p>{processText(m.content)}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25}>
        <DataView sources={sources} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
