import React from "react";

export default function Footer({ isChat }: { isChat: boolean }) {
  return (
    <div className="relative w-full rounded-lg border px-4 py-3 text-sm bg-white">
      <p>
        By using Memōriae, you agree to our{" "}
        <a
          target="_blank"
          href="/terms"
          rel="noopener noreferrer"
          className="underline"
        >
          Terms of Service
        </a>
        .
        {isChat ? (
          <span> Information may be inaccurate or improperly attributed.</span>
        ) : (
          <span />
        )}
      </p>
      <p>
        &copy; {new Date().getFullYear()} Luke Kosner. Made with ♥ in New York,
        USA.
      </p>
    </div>
  );
}
