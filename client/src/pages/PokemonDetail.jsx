import { useMemo, useState } from "react";

import {
  ArrowLeft,
  Copy,
  Check,
  RefreshCw
} from "lucide-react";

import { generateContent } from "../utils/contentGenerator";

import { getPokemonImage } from "../utils/pokemonImage";

function PokemonDetail({
  pokemon,
  onBack,
  onUpdate
}) {
  const [copiedField, setCopiedField] = useState("");

  /*
   * Generate content directly from
   * the Pokémon name.
   */
  const generatedContent = useMemo(() => {
    return generateContent(
      pokemon?.name || "Pokémon"
    );
  }, [pokemon?.name]);

  /*
   * DRAWING CONTENT
   */
  const drawingTitle =
    generatedContent.drawing.title;

  const drawingCaption =
    generatedContent.drawing.caption;

  const drawingHashtags =
    generatedContent.drawing.hashtags;

  /*
   * SHORT VIDEO CONTENT
   */
  const shortTitle =
    generatedContent.short.title;

  const shortCaption =
    generatedContent.short.caption;

  const shortHashtags =
    generatedContent.short.hashtags;

  const shortScript =
    generatedContent.short.script;

  /*
   * LONG VIDEO CONTENT
   */
  const longTitle =
    generatedContent.long.title;

  const longDescription =
    generatedContent.long.description;

  const longCaption =
    generatedContent.long.caption;

  const longHashtags =
    generatedContent.long.hashtags;

  const longScript =
    generatedContent.long.script;

  /* =====================================================
     COPY
  ===================================================== */

  async function copyText(text, field) {
    try {
      await navigator.clipboard.writeText(text);

      setCopiedField(field);

      setTimeout(() => {
        setCopiedField("");
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  }

  /* =====================================================
     SAVE CONTENT
  ===================================================== */

  function saveGeneratedContent() {
    const updatedPokemon = {
      ...pokemon,

      drawing: {
        ...(pokemon.drawing || {}),
        title: drawingTitle,
        caption: drawingCaption,
        hashtags: drawingHashtags
      },

      short: {
        ...(pokemon.short || {}),
        title: shortTitle,
        caption: shortCaption,
        socialCaption: shortCaption,
        hashtags: shortHashtags,
        script: shortScript
      },

      long: {
        ...(pokemon.long || {}),
        title: longTitle,
        description: longDescription,
        caption: longCaption,
        hashtags: longHashtags,
        script: longScript
      }
    };

    onUpdate(updatedPokemon);
  }

  /* =====================================================
     REGENERATE
  ===================================================== */

  function regenerateContent() {
    const regenerated = generateContent(
      pokemon?.name || "Pokémon"
    );

    console.log(
      "Generated content:",
      regenerated
    );
  }

  /* =====================================================
     COPY ALL CONTENT
  ===================================================== */

  async function copyAllContent() {
    const allContent = `
DRAWING CONTENT

TITLE
${drawingTitle}

CAPTION
${drawingCaption}

HASHTAGS
${drawingHashtags}


SHORT VIDEO CONTENT

TITLE
${shortTitle}

CAPTION
${shortCaption}

HASHTAGS
${shortHashtags}

SCRIPT
${shortScript}


LONG VIDEO CONTENT

TITLE
${longTitle}

DESCRIPTION
${longDescription}

CAPTION
${longCaption}

HASHTAGS
${longHashtags}

SCRIPT
${longScript}
`.trim();

    await copyText(
      allContent,
      "all"
    );
  }

  /* =====================================================
     STATUS UPDATE
  ===================================================== */

  function updateStatus(
    contentType,
    status
  ) {
    const updatedPokemon = {
      ...pokemon,

      [contentType]: {
        ...(pokemon[contentType] || {}),
        status
      }
    };

    onUpdate(updatedPokemon);
  }

  return (
    <div className="pokemon-detail-page">

      {/* =================================================
          BACK
      ================================================= */}

      <button
        type="button"
        className="detail-back-button"
        onClick={onBack}
      >
        <ArrowLeft size={17} />

        <span>
          Back to Pokédex
        </span>
      </button>

      {/* =================================================
          HERO
      ================================================= */}

      <section className="pokemon-detail-hero">

        <div className="detail-image-wrapper">
          <img
            src={getPokemonImage(
              pokemon.id
            )}
            alt={pokemon.name}
            className="detail-pokemon-image"
          />
        </div>

        <div className="detail-hero-info">

          <span className="detail-number">
            #
            {String(
              pokemon.number
            ).padStart(3, "0")}
          </span>

          <h1>
            {pokemon.name}
          </h1>

          <p className="detail-subtitle">
            Pokémon Content Workspace
          </p>

          <div className="detail-meta">

            {pokemon.type && (
              <span>
                {Array.isArray(
                  pokemon.type
                )
                  ? pokemon.type.join(
                      " / "
                    )
                  : pokemon.type}
              </span>
            )}

            <span>
              Generation 1
            </span>

            <span>
              Kanto
            </span>

          </div>
        </div>
      </section>

      {/* =================================================
          PRODUCTION STATUS
      ================================================= */}

      <section className="detail-section">

        <div className="detail-section-heading">

          <div>
            <span className="section-label">
              PRODUCTION STATUS
            </span>

            <h2>
              Content Pipeline
            </h2>
          </div>

        </div>

        <div className="detail-status-grid">

          <StatusCard
            title="Drawing"
            status={
              pokemon.drawing?.status ||
              "pending"
            }
            onChange={(status) =>
              updateStatus(
                "drawing",
                status
              )
            }
          />

          <StatusCard
            title="Short"
            status={
              pokemon.short?.status ||
              "pending"
            }
            onChange={(status) =>
              updateStatus(
                "short",
                status
              )
            }
          />

          <StatusCard
            title="Long Video"
            status={
              pokemon.long?.status ||
              "pending"
            }
            onChange={(status) =>
              updateStatus(
                "long",
                status
              )
            }
          />

        </div>
      </section>

      {/* =================================================
          GENERATED CONTENT
      ================================================= */}

      <section className="detail-section">

        <div className="detail-section-heading">

          <div>

            <span className="section-label">
              CONTENT STUDIO
            </span>

            <h2>
              YouTube & Social Content
            </h2>

            <p>
              Ready-to-use content for{" "}
              {pokemon.name}.
            </p>

          </div>

          <div className="detail-actions">

            <button
              type="button"
              className="secondary-action-button"
              onClick={
                regenerateContent
              }
            >
              <RefreshCw size={15} />

              Regenerate
            </button>

            <button
              type="button"
              className="primary-action-button"
              onClick={
                saveGeneratedContent
              }
            >
              Save Content
            </button>

          </div>

        </div>

        {/* =================================================
            DRAWING CONTENT
        ================================================= */}

        <div className="content-category-heading">
          <span className="section-label">
            DRAWING
          </span>

          <h3>
            Drawing Content
          </h3>

          <p>
            Content for your Pokémon artwork post.
          </p>
        </div>

        <ContentField
          label="Drawing Title"
          value={drawingTitle}
          field="drawing-title"
          copiedField={copiedField}
          onCopy={copyText}
        />

        <ContentField
          label="Drawing Caption"
          value={drawingCaption}
          field="drawing-caption"
          copiedField={copiedField}
          onCopy={copyText}
          multiline
        />

        <ContentField
          label="Drawing Hashtags"
          value={drawingHashtags}
          field="drawing-hashtags"
          copiedField={copiedField}
          onCopy={copyText}
          multiline
        />

        {/* =================================================
            SHORT VIDEO CONTENT
        ================================================= */}

        <div className="content-category-heading">
          <span className="section-label">
            SHORT VIDEO
          </span>

          <h3>
            Short Video Content
          </h3>

          <p>
            Content for your Pokémon Shorts.
          </p>
        </div>

        <ContentField
          label="Short Video Title"
          value={shortTitle}
          field="short-title"
          copiedField={copiedField}
          onCopy={copyText}
        />

        <ContentField
          label="Short Video Caption"
          value={shortCaption}
          field="short-caption"
          copiedField={copiedField}
          onCopy={copyText}
          multiline
        />

        <ContentField
          label="Short Video Hashtags"
          value={shortHashtags}
          field="short-hashtags"
          copiedField={copiedField}
          onCopy={copyText}
          multiline
        />

        <ContentField
          label="Short Video Script"
          value={shortScript}
          field="short-script"
          copiedField={copiedField}
          onCopy={copyText}
          multiline
        />

        {/* =================================================
            LONG VIDEO CONTENT
        ================================================= */}

        <div className="content-category-heading">
          <span className="section-label">
            LONG VIDEO
          </span>

          <h3>
            Long Video Content
          </h3>

          <p>
            Content for your full-length Pokémon video.
          </p>
        </div>

        <ContentField
          label="Long Video Title"
          value={longTitle}
          field="long-title"
          copiedField={copiedField}
          onCopy={copyText}
        />

        <ContentField
          label="Long Video Description"
          value={longDescription}
          field="long-description"
          copiedField={copiedField}
          onCopy={copyText}
          multiline
        />

        <ContentField
          label="Long Video Caption"
          value={longCaption}
          field="long-caption"
          copiedField={copiedField}
          onCopy={copyText}
          multiline
        />

        <ContentField
          label="Long Video Hashtags"
          value={longHashtags}
          field="long-hashtags"
          copiedField={copiedField}
          onCopy={copyText}
          multiline
        />

        <ContentField
          label="Long Video Script"
          value={longScript}
          field="long-script"
          copiedField={copiedField}
          onCopy={copyText}
          multiline
        />

        {/* =================================================
            COPY EVERYTHING
        ================================================= */}

        <button
          type="button"
          className="copy-all-content-button"
          onClick={
            copyAllContent
          }
        >
          {copiedField === "all" ? (
            <>
              <Check size={17} />
              Copied Everything
            </>
          ) : (
            <>
              <Copy size={17} />
              Copy All Content
            </>
          )}
        </button>

      </section>
    </div>
  );
}

/* =====================================================
   CONTENT FIELD
===================================================== */

function ContentField({
  label,
  value,
  field,
  copiedField,
  onCopy,
  multiline = false
}) {
  return (
    <div className="content-field">

      <div className="field-heading">

        <span>
          {label}
        </span>

        <button
          type="button"
          className="field-copy-button"
          onClick={() =>
            onCopy(
              value,
              field
            )
          }
        >
          {copiedField === field ? (
            <>
              <Check size={14} />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy
            </>
          )}
        </button>

      </div>

      <div
        className={`content-field-box ${
          multiline
            ? "multiline"
            : ""
        }`}
      >
        {value}
      </div>

    </div>
  );
}

/* =====================================================
   STATUS CARD
===================================================== */

function StatusCard({
  title,
  status,
  onChange
}) {
  const options = [
    "pending",
    "in-progress",
    "completed",
    "published"
  ];

  return (
    <div className="detail-status-card">

      <div className="detail-status-card-top">

        <strong>
          {title}
        </strong>

        <span
          className={`detail-status-badge ${status}`}
        >
          {formatStatus(status)}
        </span>

      </div>

      <select
        value={status}
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
      >
        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {formatStatus(option)}
            </option>
          )
        )}
      </select>

    </div>
  );
}

/* =====================================================
   FORMAT STATUS
===================================================== */

function formatStatus(status) {
  const labels = {
    pending: "Pending",

    "in-progress":
      "In Progress",

    completed:
      "Completed",

    published:
      "Published"
  };

  return (
    labels[status] ||
    "Pending"
  );
}

export default PokemonDetail;