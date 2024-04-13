import React from "react";

function HighlightMatch({ text, query }: { text: string; query: string }) {
  if (!query?.trim()) return text;
  const textFragments = text?.split(new RegExp(`(${query})`, "gi"));
  return textFragments?.map((fragment, i) =>
    fragment.toLowerCase() === query.toLowerCase() ? (
      <span key={i} className="bg-yellow">
        {fragment}
      </span>
    ) : (
      <span key={i}>{fragment}</span>
    ),
  );
}

export default HighlightMatch;
