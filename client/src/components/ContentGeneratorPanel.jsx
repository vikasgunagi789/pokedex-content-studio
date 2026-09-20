import { useState } from "react";
import {
  generateContent
} from "../utils/contentGenerator";
import CopyButton from "./CopyButton";

function ContentGeneratorPanel({
  pokemon,
  contentType = "short",
  onGenerated
}) {
  const [generated, setGenerated] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  function handleGenerate() {
    if (!pokemon?.name) return;

    setLoading(true);

    try {
      const result =
        generateContent(
          pokemon.name,
          contentType
        );

      setGenerated(result);

      if (onGenerated) {
        onGenerated(
          contentType,
          result
        );
      }
    } catch (error) {
      console.error(
        "Content generation failed:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="content-generator-panel">

      <div className="content-generator-header">

        <div>
          <span className="section-label">
            CONTENT GENERATOR
          </span>

          <h3>
            {contentType === "short"
              ? "YouTube Short Content"
              : "Long Video Content"}
          </h3>

          <p>
            Generate reusable content
            for {pokemon?.name}.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading
            ? "Generating..."
            : "Generate Content"}
        </button>

      </div>

      {generated && (
        <div className="generated-content">

          {Object.entries(
            generated
          ).map(
            ([key, value]) => (
              <div
                className="generated-field"
                key={key}
              >

                <div className="generated-field-header">

                  <strong>
                    {formatFieldName(
                      key
                    )}
                  </strong>

                  <CopyButton
                    text={String(
                      value || ""
                    )}
                  />

                </div>

                <textarea
                  value={
                    value || ""
                  }
                  readOnly
                  rows={
                    String(
                      value || ""
                    ).length > 150
                      ? 6
                      : 3
                  }
                />

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

function formatFieldName(
  value
) {
  return value
    .replace(
      /([A-Z])/g,
      " $1"
    )
    .replace(
      /^./,
      (letter) =>
        letter.toUpperCase()
    );
}

export default ContentGeneratorPanel;