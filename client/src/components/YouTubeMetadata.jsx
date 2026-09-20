import {
  generateContent
} from "../utils/contentGenerator";

function YouTubeMetadata({
  pokemon,
  onUpdate
}) {
  const content =
    pokemon?.short || {};

  const generated =
    generateContent(
      pokemon
    );

  function updateShort(
    changes
  ) {
    onUpdate({
      ...pokemon,
      short: {
        ...content,
        ...changes
      }
    });
  }

  function generateAll() {
    updateShort({
      title:
        generated.title,
      description:
        generated.description,
      hashtags:
        generated.hashtags
    });
  }

  return (
    <section className="youtube-metadata">

      <div className="metadata-header">
        <div>
          <span className="section-label">
            YOUTUBE METADATA
          </span>

          <h3>
            {pokemon.name}
          </h3>

          <p>
            Prepare the metadata for
            your Pokémon video.
          </p>
        </div>

        <button
          type="button"
          onClick={
            generateAll
          }
        >
          Generate Metadata
        </button>
      </div>

      <div className="metadata-grid">

        <div className="metadata-field">
          <label>
            YouTube Title
          </label>

          <input
            value={
              content.title ||
              ""
            }
            onChange={(event) =>
              updateShort({
                title:
                  event.target
                    .value
              })
            }
            placeholder="YouTube title"
          />
        </div>

        <div className="metadata-field">
          <label>
            Description
          </label>

          <textarea
            rows="8"
            value={
              content.description ||
              ""
            }
            onChange={(event) =>
              updateShort({
                description:
                  event.target
                    .value
              })
            }
            placeholder="YouTube description"
          />
        </div>

        <div className="metadata-field">
          <label>
            Hashtags
          </label>

          <textarea
            rows="4"
            value={
              Array.isArray(
                content.hashtags
              )
                ? content.hashtags.join(
                    " "
                  )
                : content.hashtags ||
                  ""
            }
            onChange={(event) =>
              updateShort({
                hashtags:
                  event.target.value
              })
            }
            placeholder="#Pokemon #Drawing #Shorts"
          />
        </div>

      </div>
    </section>
  );
}

export default YouTubeMetadata;