
import { useMemo, useState } from "react";

import {
  ArrowLeft,
  Copy,
  Check,
  RefreshCw,
  Play
} from "lucide-react";

import { generateContent } from "../utils/contentGenerator";
import { getPokemonImage } from "../utils/pokemonImage";

function PokemonDetail({
  pokemon,
  videos = [],
  onBack,
  onUpdate
}) {
  const [copiedField, setCopiedField] = useState("");

  /*
   * GENERATE CONTENT
   */
  const generatedContent = useMemo(() => {
    return generateContent(pokemon?.name || "Pokémon");
  }, [pokemon?.name]);

  const drawingTitle = generatedContent.drawing.title;
  const drawingCaption = generatedContent.drawing.caption;
  const drawingHashtags = generatedContent.drawing.hashtags;

  const shortTitle = generatedContent.short.title;
  const shortCaption = generatedContent.short.caption;
  const shortHashtags = generatedContent.short.hashtags;
  const shortScript = generatedContent.short.script;

  const longTitle = generatedContent.long.title;
  const longDescription = generatedContent.long.description;
  const longCaption = generatedContent.long.caption;
  const longHashtags = generatedContent.long.hashtags;
  const longScript = generatedContent.long.script;

  /*
   * INSTAGRAM CAPTION
   */
  const instagramCaption = useMemo(() => {
    const pokemonName = pokemon?.name || "Pokémon";

    const pokemonHashtag = pokemonName.replace(
      /[^a-zA-Z0-9]/g,
      ""
    );

    return [
      `Drawing ${pokemonName} for my Pokédex journey!`,
      "",
      `Follow my journey as I draw Pokémon, one at a time.`,
      "",
      `#Pokemon #${pokemonHashtag} #PokemonDrawing #PokemonArt #Pokedex #AnimeArt #Drawing`
    ].join("\n");
  }, [pokemon?.name]);

  /*
   * FIND VIDEOS FOR THIS POKÉMON
   *
   * Supports common video object fields:
   * pokemonId, pokemonName, pokemon.id, pokemon.name,
   * url, videoUrl, cloudinaryUrl and secure_url.
   */
  const pokemonVideos = useMemo(() => {
    if (!Array.isArray(videos)) {
      return [];
    }

    return videos.filter((video) => {
      const videoPokemonId =
        video.pokemonId ??
        video.pokemon?.id ??
        video.pokemon?.pokemonId;

      const videoPokemonName = String(
        video.pokemonName ??
        video.pokemon?.name ??
        ""
      ).toLowerCase().trim();

      const currentPokemonName = String(
        pokemon?.name || ""
      ).toLowerCase().trim();

      const matchesId =
        videoPokemonId !== undefined &&
        videoPokemonId !== null &&
        String(videoPokemonId) === String(pokemon?.id);

      const matchesName =
        videoPokemonName !== "" &&
        videoPokemonName === currentPokemonName;

      return matchesId || matchesName;
    });
  }, [videos, pokemon?.id, pokemon?.name]);

  /*
   * COPY CONTENT
   */
  async function copyText(text, field) {
    try {
      await navigator.clipboard.writeText(String(text ?? ""));

      setCopiedField(field);

      window.setTimeout(() => {
        setCopiedField("");
      }, 1500);
    } catch (error) {
      console.error("Copy failed:", error);
      window.alert(
        "Unable to copy. Please check your browser permissions."
      );
    }
  }

  /*
   * SAVE GENERATED CONTENT
   */
  function saveGeneratedContent() {
    const updatedPokemon = {
      ...pokemon,

      instagramCaption,

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
        script: shortScript,
        instagramCaption
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

  /*
   * REGENERATE CONTENT
   */
  function regenerateContent() {
    const regenerated = generateContent(
      pokemon?.name || "Pokémon"
    );

    console.log("Generated content:", regenerated);

    window.alert(
      "New content was generated in the console. Your current displayed content has not been changed."
    );
  }

  /*
   * COPY ALL CONTENT
   */
  async function copyAllContent() {
    const allContent = `
POKÉMON: ${pokemon.name}

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


INSTAGRAM CAPTION

${instagramCaption}
`.trim();

    await copyText(allContent, "all");
  }

  /*
   * UPDATE PRODUCTION STATUS
   */
  function updateStatus(contentType, status) {
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

      {/* BACK BUTTON */}

      <button
        type="button"
        className="detail-back-button"
        onClick={onBack}
      >
        <ArrowLeft size={17} />
        <span>Back to Pokédex</span>
      </button>

      {/* POKÉMON HERO */}

      <section className="pokemon-detail-hero">
        <div className="detail-image-wrapper">
          <img
            src={getPokemonImage(pokemon.id)}
            alt={pokemon.name}
            className="detail-pokemon-image"
          />
        </div>

        <div className="detail-hero-info">
          <span className="detail-number">
            #{String(pokemon.number ?? pokemon.id).padStart(3, "0")}
          </span>

          <h1>{pokemon.name}</h1>

          <p className="detail-subtitle">
            Pokémon Content Workspace
          </p>

          <div className="detail-meta">
            {pokemon.type && (
              <span>
                {Array.isArray(pokemon.type)
                  ? pokemon.type.join(" / ")
                  : pokemon.type}
              </span>
            )}

            <span>Generation 1</span>
            <span>Kanto</span>
          </div>
        </div>
      </section>

      {/* PRODUCTION STATUS */}

      <section className="detail-section">
        <div className="detail-section-heading">
          <div>
            <span className="section-label">
              PRODUCTION STATUS
            </span>

            <h2>Content Pipeline</h2>
          </div>
        </div>

        <div className="detail-status-grid">
          <StatusCard
            title="Drawing"
            status={pokemon.drawing?.status || "pending"}
            onChange={(status) => updateStatus("drawing", status)}
          />

          <StatusCard
            title="Short"
            status={pokemon.short?.status || "pending"}
            onChange={(status) => updateStatus("short", status)}
          />

          <StatusCard
            title="Long Video"
            status={pokemon.long?.status || "pending"}
            onChange={(status) => updateStatus("long", status)}
          />
        </div>
      </section>

      {/* CLOUDINARY VIDEO LIBRARY */}

      <section className="detail-section">
        <div className="detail-section-heading">
          <div>
            <span className="section-label">
              YOUR UPLOADED VIDEOS
            </span>

            <h2>{pokemon.name} Video Library</h2>

            <p>
              Videos linked to this Pokémon from your Video Vault.
            </p>
          </div>

          <span className="pending-badge">
            {pokemonVideos.length}{" "}
            {pokemonVideos.length === 1 ? "Video" : "Videos"}
          </span>
        </div>

        {pokemonVideos.length > 0 ? (
          <div className="pokemon-video-grid">
            {pokemonVideos.map((video, index) => {
              const videoUrl =
                video.url ||
                video.videoUrl ||
                video.cloudinaryUrl ||
                video.secure_url ||
                "";

              const videoTitle =
                video.title ||
                video.name ||
                `${pokemon.name} Video ${index + 1}`;

              if (!videoUrl) {
                return (
                  <div
                    className="content-field"
                    key={video.id ?? `${pokemon.id}-${index}`}
                  >
                    <div className="field-heading">
                      <span>{videoTitle}</span>
                    </div>

                    <p>
                      This video entry does not contain a usable video URL.
                      Check the video details in your Video Vault.
                    </p>
                  </div>
                );
              }

              return (
                <article
                  className="pokemon-video-card"
                  key={video.id ?? videoUrl}
                >
                  <div className="pokemon-video-heading">
                    <Play size={17} />

                    <h3>{videoTitle}</h3>
                  </div>

                  <video
                    className="pokemon-detail-video"
                    src={videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                  >
                    Your browser does not support HTML video.
                  </video>

                  {video.videoType && (
                    <p className="pokemon-video-type">
                      Type: {video.videoType}
                    </p>
                  )}

                  {video.description && (
                    <p className="pokemon-video-description">
                      {video.description}
                    </p>
                  )}

                  <div className="pokemon-video-actions">
                    <button
                      type="button"
                      className="field-copy-button"
                      onClick={() =>
                        copyText(
                          videoUrl,
                          `video-url-${video.id ?? index}`
                        )
                      }
                    >
                      {copiedField ===
                      `video-url-${video.id ?? index}` ? (
                        <>
                          <Check size={14} />
                          Copied URL
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          Copy Video URL
                        </>
                      )}
                    </button>

                    <a
                      className="video-open-link"
                      href={videoUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open Video
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No videos linked yet</h3>

            <p>
              Add a video for {pokemon.name} in the Video Vault.
              It will appear here when its Pokémon ID or name matches.
            </p>
          </div>
        )}
      </section>

      {/* CONTENT GENERATOR */}

      <section className="detail-section">
        <div className="detail-section-heading">
          <div>
            <span className="section-label">
              CONTENT STUDIO
            </span>

            <h2>YouTube & Social Content</h2>

            <p>
              Ready-to-use content for {pokemon.name}.
            </p>
          </div>

          <div className="detail-actions">
            <button
              type="button"
              className="secondary-action-button"
              onClick={regenerateContent}
            >
              <RefreshCw size={15} />
              Regenerate
            </button>

            <button
              type="button"
              className="primary-action-button"
              onClick={saveGeneratedContent}
            >
              Save Content
            </button>
          </div>
        </div>

        {/* DRAWING CONTENT */}

        <div className="content-category-heading">
          <span className="section-label">DRAWING</span>
          <h3>Drawing Content</h3>
          <p>Content for your Pokémon artwork post.</p>
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

        {/* SHORT VIDEO CONTENT */}

        <div className="content-category-heading">
          <span className="section-label">SHORT VIDEO</span>
          <h3>Short Video Content</h3>
          <p>Content for your Pokémon Shorts.</p>
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

        {/* LONG VIDEO CONTENT */}

        <div className="content-category-heading">
          <span className="section-label">LONG VIDEO</span>
          <h3>Long Video Content</h3>
          <p>Content for your full-length Pokémon video.</p>
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

        {/* INSTAGRAM CONTENT */}

        <div className="content-category-heading">
          <span className="section-label">INSTAGRAM</span>
          <h3>Instagram Caption</h3>
          <p>
            Copy this caption and hashtags for your Instagram post or Reel.
          </p>
        </div>

        <ContentField
          label="Instagram Caption with Hashtags"
          value={instagramCaption}
          field="instagram-caption"
          copiedField={copiedField}
          onCopy={copyText}
          multiline
        />

        {/* COPY ALL CONTENT */}

        <button
          type="button"
          className="copy-all-content-button"
          onClick={copyAllContent}
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
        <span>{label}</span>

        <button
          type="button"
          className="field-copy-button"
          onClick={() => onCopy(value, field)}
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
          multiline ? "multiline" : ""
        }`}
        style={{ whiteSpace: "pre-wrap" }}
      >
        {value || ""}
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
        <strong>{title}</strong>

        <span className={`detail-status-badge ${status}`}>
          {formatStatus(status)}
        </span>
      </div>

      <select
        value={status}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {formatStatus(option)}
          </option>
        ))}
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
    "in-progress": "In Progress",
    completed: "Completed",
    published: "Published"
  };

  return labels[status] || "Pending";
}

export default PokemonDetail;
