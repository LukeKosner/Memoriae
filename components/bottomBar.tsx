import React from "react";
import { Alert, AlertDescription } from "./ui/alert.tsx";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";

export default function BottomBar({
  input,
  handleInputChange,
  handleSubmit,
}: {
  input: string;
  // eslint-disable-next-line no-unused-vars
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <div className="w-screen p-3 space-y-3">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row space-x-3">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask me anything"
            className="p-3"
          />
          <Button type="submit" className="p-3">
            Ask
          </Button>
        </div>
      </form>
      <Alert>
        <AlertDescription>
          By using Contraphobia, you agree to our{" "}
          <a
            target="_blank"
            href="/terms"
            rel="noopener noreferrer"
            className="underline"
          >
            Terms of Service
          </a>
          . Information may be inaccurate or improperly attributed.
        </AlertDescription>
      </Alert>
    </div>
  );
}
