import {
  generatePokemonCaption,
  generatePokemonHashtags
} from "../utils/contentGenerator";

function SocialContent({
  pokemon,
  onUpdate
}) {
  const content =
    pokemon?.short || {};

  const caption =
    content.socialCaption ||
    generatePokemonCaption(
      pokemon
    );

  const hashtags =
    content.socialHashtags ||
    generatePokemonHashtags(
      pokemon
    );

  function update(
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

  function generate() {
    update({
      socialCaption:
        generatePokemonCaption(
          pokemon
        ),
      socialHashtags:
        generatePokemonHashtags(
          pokemon
        )
    });
  }

  return (
    <section className="social-content">

      <div className="social-header">
        <div>
          <span className="section-label">
            SOCIAL CONTENT
          </span>

          <h3>
            Social Media Post
          </h3>
        </div>

        <button
          type="button"
          onClick={generate}
        >
          Generate
        </button>
      </div>

      <div className="social-field">
        <label>
          Caption
        </label>

        <textarea
          rows="6"
          value={caption}
          onChange={(event) =>
            update({
              socialCaption:
                event.target
                  .value
            })
          }
        />
      </div>

      <div className="social-field">
        <label>
          Hashtags
        </label>

        <textarea
          rows="4"
          value={
            Array.isArray(
              hashtags
            )
              ? hashtags.join(
                  " "
                )
              : hashtags
          }
          onChange={(event) =>
            update({
              socialHashtags:
                event.target
                  .value
            })
          }
        />
      </div>
    </section>
  );
}

export default SocialContent;