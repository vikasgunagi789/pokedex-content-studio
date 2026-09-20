import {
  calculateTypeProgress,
} from "../utils/progress";

function ProductionOverview({
  pokemonList = [],
}) {
  const types = [
    {
      id: "drawing",
      label: "Drawings",
    },
    {
      id: "short",
      label: "YouTube Shorts",
    },
    {
      id: "long",
      label: "Long Videos",
    },
  ];

  return (
    <div className="production-overview">
      {types.map((type) => {
        const progress =
          calculateTypeProgress(
            pokemonList,
            type.id
          );

        return (
          <div
            className="production-overview-card"
            key={type.id}
          >
            <div className="production-overview-header">
              <div>
                <span>
                  {type.label}
                </span>

                <strong>
                  {progress.completed} /{" "}
                  {progress.total}
                </strong>
              </div>

              <strong>
                {progress.percentage}%
              </strong>
            </div>

            <div className="production-overview-track">
              <div
                className="production-overview-fill"
                style={{
                  width: `${progress.percentage}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductionOverview;