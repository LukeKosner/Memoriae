import React from "react";

export default function TopBar() {
  return (
    <div className="p-3 flex flex-row items-center justify-between">
      <h1 className="text-xl">Contraphobia</h1>
      <p className="text-sm hidden md:inline">
        A chatbot that fights Holocaust denial with survivor testimony.
      </p>
    </div>
  );
}
