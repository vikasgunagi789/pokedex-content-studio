import { useState } from "react";

function CopyButton({
  text = "",
  label = "Copy"
}) {
  const [copied, setCopied] =
    useState(false);

  async function handleCopy() {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(
        text
      );

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 1500);
    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );
    }
  }

  return (
    <button
      type="button"
      className="copy-button"
      onClick={handleCopy}
      disabled={!text}
    >
      {copied
        ? "Copied"
        : label}
    </button>
  );
}

export default CopyButton;