import {
  validateContent
} from "../utils/contentValidation";

function ContentWarnings({
  pokemon
}) {
  const warnings =
    validateContent(
      pokemon
    );

  if (
    warnings.length === 0
  ) {
    return (
      <section className="content-warnings success">
        <strong>
          Content looks good
        </strong>

        <p>
          No missing-content
          warnings were detected.
        </p>
      </section>
    );
  }

  return (
    <section className="content-warnings">

      <div className="warnings-header">
        <div>
          <span className="section-label">
            VALIDATION
          </span>

          <h3>
            Content Warnings
          </h3>
        </div>

        <strong>
          {warnings.length}
        </strong>
      </div>

      <div className="warning-list">
        {warnings.map(
          (
            warning,
            index
          ) => (
            <div
              className={`warning-item ${warning.type}`}
              key={`${warning.message}-${index}`}
            >
              <span>
                {warning.type ===
                "error"
                  ? "!"
                  : "•"}
              </span>

              <p>
                {warning.message}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default ContentWarnings;