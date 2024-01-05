import React from "react";
import { useAuth } from "@clerk/nextjs";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Message } from "ai";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "./ui/tooltip.tsx";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import Footer from "./footer.tsx";

export default function BottomBar({
  input,
  handleInputChange,
  handleSubmit,
  stop,
  isLoading,
  reload,
  messages,
  destroyChat,
}: {
  input: string;
  // eslint-disable-next-line no-unused-vars
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  stop: () => void;
  isLoading: boolean;
  reload: () => void;
  messages: Message[];
  destroyChat: () => void;
}) {
  const { isSignedIn } = useAuth();

  function refresh() {
    stop();
    destroyChat();
  }

  const showReload = messages.length !== 0 && !isLoading;

  return (
    <div className="w-screen p-3 space-y-3">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row space-x-3">
          <div className="flex flex-row flex-grow space-x-3">
            <div className="flex flex-col items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipContent className="p-1 rounded-md border m-1 text-xs">
                    <p>New chat</p>
                  </TooltipContent>
                  <TooltipTrigger asChild>
                    <Button variant="outline" onClick={() => refresh()}>
                      <PlusIcon />
                    </Button>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder={
                isSignedIn
                  ? "Ask a question..."
                  : "To prevent spam, we ask you to sign in."
              }
              disabled={!isSignedIn}
              className={`p-3 ${messages.length !== 0}`}
            />

            {showReload && (
              <div className="flex flex-col items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipContent className="p-1 rounded-md border m-1 text-xs">
                      <p>Reload</p>
                    </TooltipContent>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          reload();
                        }}
                      >
                        <ReloadIcon />
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
          {isLoading ? (
            <Button variant="destructive" onClick={stop} className="p-3">
              Stop
            </Button>
          ) : (
            <Button type="submit" className="p-3" disabled={!isSignedIn}>
              Ask
            </Button>
          )}
        </div>
      </form>
      <Footer isChat />
    </div>
  );
}
