function formatDate(
  timestamp
) {
  if (!timestamp) {
    return "Unknown";
  }

  const date =
    new Date(timestamp);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown";
  }

  return date.toLocaleString();
}

function ProductionHistory({
  pokemon
}) {
  const history = [];

  [
    "drawing",
    "short",
    "long"
  ].forEach(
    (type) => {
      const content =
        pokemon?.[type];

      if (
        !content ||
        !Array.isArray(
          content.history
        )
      ) {
        return;
      }

      content.history.forEach(
        (entry) => {
          history.push({
            ...entry,
            contentType:
              type
          });
        }
      );
    }
  );

  history.sort(
    (a, b) =>
      new Date(
        b.timestamp
      ) -
      new Date(
        a.timestamp
      )
  );

  return (
    <section className="production-history">

      <div className="history-header">
        <div>
          <span className="section-label">
            ACTIVITY
          </span>

          <h3>
            Production History
          </h3>
        </div>

        <span>
          {history.length} events
        </span>
      </div>

      {history.length ===
      0 ? (
        <div className="history-empty">
          <strong>
            No production history
          </strong>

          <p>
            Status changes will
            appear here.
          </p>
        </div>
      ) : (
        <div className="history-list">
          {history.map(
            (
              item,
              index
            ) => (
              <div
                className="history-item"
                key={`${item.timestamp}-${index}`}
              >
                <div className="history-dot">
                  •
                </div>

                <div className="history-content">
                  <strong>
                    {item.contentType}
                  </strong>

                  <p>
                    {item.type ===
                    "status-change"
                      ? `${item.from} → ${item.to}`
                      : "Production updated"}
                  </p>

                  <small>
                    {formatDate(
                      item.timestamp
                    )}
                  </small>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}

export default ProductionHistory;