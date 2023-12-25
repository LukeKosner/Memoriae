import { Document } from "langchain/document";
import React from "react";

export default function DataView({
  sources,
}: {
  sources: Record<string, Document>;
}) {
  return (
    <div className="flex flex-col flex-grow space-y-3 p-3">
      {Object.entries(sources).map(([messageIndex, sourceEntries]) => (
        <div key={messageIndex}>
          <div className="font-bold">Sources for message {messageIndex}</div>
          <ul className="list-disc list-inside">
            {Array.isArray(sourceEntries) &&
              sourceEntries.map((source: Document) => (
                <p key={source.metadata.id}>
                  {JSON.stringify(
                    source.metadata.source.split("contraphobia")[1],
                  )}
                </p>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
