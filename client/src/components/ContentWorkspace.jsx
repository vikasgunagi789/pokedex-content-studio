import { useMemo, useState } from "react";
import ContentCard from "./ContentCard";
import { generateBulkContent } from "../utils/bulkGenerator";
import { generateYoutubeMetadata } from "../utils/youtubeMetadata";
import { exportJson } from "../utils/exportContent";

function ContentWorkspace({ pokemonList = [], onUpdate }) {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [contentType, setContentType] = useState("drawing");
  const [isGenerating, setIsGenerating] = useState(false);

  const stats = useMemo(() => {
    const total = pokemonList.length;

    const completed = pokemonList.filter(
      (pokemon) =>
        pokemon.status === "completed" ||
        pokemon.status === "published"
    ).length;

    const published = pokemonList.filter(
      (pokemon) => pokemon.status === "published"
    ).length;

    return {
      total,
      completed,
      published,
    };
  }, [pokemonList]);

  const handleGenerate = () => {
    if (!selectedPokemon) {
      alert("Please select a Pokémon first.");
      return;
    }

    setIsGenerating(true);

    const generated = generateBulkContent(
      [selectedPokemon],
      contentType
    );

    const updatedPokemon = generated[0];

    if (onUpdate) {
      onUpdate(updatedPokemon);
    }

    setSelectedPokemon(updatedPokemon);

    setTimeout(() => {
      setIsGenerating(false);
    }, 300);
  };

  const handleExport = () => {
    if (!pokemonList.length) {
      alert("There is no Pokémon data to export.");
      return;
    }

    exportJson(
      pokemonList,
      "pokedex-content-studio-data.json"
    );
  };

  return (
    <section className="content-workspace">
      <div className="workspace-header">
        <div>
          <p className="section-eyebrow">CONTENT WORKSPACE</p>

          <h2>Pokédex Content Studio</h2>

          <p>
            Manage Pokémon content, generate ideas, prepare YouTube
            metadata, and track your publishing workflow.
          </p>
        </div>

        <button
          type="button"
          className="secondary-button"
          onClick={handleExport}
        >
          Export Data
        </button>
      </div>

      <div className="workspace-stats">
        <div className="workspace-stat">
          <span>Total Pokémon</span>
          <strong>{stats.total}</strong>
        </div>

        <div className="workspace-stat">
          <span>Completed</span>
          <strong>{stats.completed}</strong>
        </div>

        <div className="workspace-stat">
          <span>Published</span>
          <strong>{stats.published}</strong>
        </div>
      </div>

      <div className="workspace-controls">
        <div className="control-group">
          <label htmlFor="pokemon-selector">
            Select Pokémon
          </label>

          <select
            id="pokemon-selector"
            value={selectedPokemon?.id || ""}
            onChange={(event) => {
              const pokemon = pokemonList.find(
                (item) =>
                  String(item.id) === event.target.value
              );

              setSelectedPokemon(pokemon || null);
            }}
          >
            <option value="">Choose Pokémon</option>

            {pokemonList.map((pokemon) => (
              <option
                key={pokemon.id}
                value={pokemon.id}
              >
                #{String(pokemon.id).padStart(3, "0")}{" "}
                {pokemon.name}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="content-type">
            Content Type
          </label>

          <select
            id="content-type"
            value={contentType}
            onChange={(event) =>
              setContentType(event.target.value)
            }
          >
            <option value="drawing">
              Drawing Short
            </option>

            <option value="short">
              YouTube Short
            </option>

            <option value="long">
              Long-form Video
            </option>
          </select>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating
            ? "Generating..."
            : "Generate Content"}
        </button>
      </div>

      {selectedPokemon ? (
        <div className="selected-pokemon-preview">
          <div>
            <span className="preview-label">
              Selected Pokémon
            </span>

            <h3>{selectedPokemon.name}</h3>
          </div>

          <div>
            <span className="preview-label">
              Content Type
            </span>

            <strong>{contentType}</strong>
          </div>
        </div>
      ) : (
        <div className="empty-workspace">
          <h3>No Pokémon selected</h3>

          <p>
            Select a Pokémon above to start generating content.
          </p>
        </div>
      )}

      <div className="content-card-grid">
        {pokemonList.map((pokemon) => (
          <ContentCard
            key={pokemon.id}
            pokemon={pokemon}
            onClick={() => setSelectedPokemon(pokemon)}
          />
        ))}
      </div>
    </section>
  );
}

export default ContentWorkspace;