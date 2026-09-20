import { useState } from "react";
import {
  generateBulkContent,
} from "../utils/bulkGenerator";

function BulkContentGenerator({
  pokemonList = [],
  onUpdate,
}) {
  const [contentType, setContentType] =
    useState("drawing");

  const [isGenerating, setIsGenerating] =
    useState(false);

  function handleGenerate() {
    if (!pokemonList.length) {
      alert(
        "There are no Pokémon available."
      );
      return;
    }

    const confirmed = window.confirm(
      `Generate ${contentType} content for ${pokemonList.length} Pokémon?`
    );

    if (!confirmed) {
      return;
    }

    setIsGenerating(true);

    try {
      const updatedPokemon =
        generateBulkContent(
          pokemonList,
          contentType
        );

      if (onUpdate) {
        onUpdate(updatedPokemon);
      }
    } catch (error) {
      console.error(
        "Bulk generation failed:",
        error
      );

      alert(
        "Unable to generate content."
      );
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="bulk-generator">
      <div>
        <span className="section-label">
          BULK GENERATOR
        </span>

        <h3>
          Generate Content
        </h3>

        <p>
          Generate content for all Pokémon
          at once.
        </p>
      </div>

      <div className="bulk-generator-controls">
        <select
          value={contentType}
          onChange={(event) =>
            setContentType(
              event.target.value
            )
          }
        >
          <option value="drawing">
            Drawing
          </option>

          <option value="short">
            YouTube Short
          </option>

          <option value="long">
            Long Video
          </option>
        </select>

        <button
          type="button"
          className="primary-button"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating
            ? "Generating..."
            : "Generate All"}
        </button>
      </div>
    </div>
  );
}

export default BulkContentGenerator;