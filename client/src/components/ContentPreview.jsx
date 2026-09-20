function ContentPreview({
  pokemon
}) {
  const short =
    pokemon?.short || {};

  const long =
    pokemon?.long || {};

  return (
    <section className="content-preview">

      <div className="preview-header">
        <div>
          <span className="section-label">
            PREVIEW
          </span>

          <h3>
            Content Preview
          </h3>
        </div>
      </div>

      <div className="preview-grid">

        <article className="preview-card">
          <span className="preview-type">
            SHORT VIDEO
          </span>

          <h4>
            {short.title ||
              `${pokemon.name} Drawing`}
          </h4>

          <p>
            {short.description ||
              "No description available yet."}
          </p>

          <div className="preview-footer">
            <span>
              {short.status ||
                "pending"}
            </span>
          </div>
        </article>

        <article className="preview-card">
          <span className="preview-type">
            LONG VIDEO
          </span>

          <h4>
            {long.title ||
              `${pokemon.name} Full Drawing`}
          </h4>

          <p>
            {long.description ||
              "No description available yet."}
          </p>

          <div className="preview-footer">
            <span>
              {long.status ||
                "pending"}
            </span>
          </div>
        </article>

      </div>
    </section>
  );
}

export default ContentPreview;