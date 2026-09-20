import {
  getPokemonContentStats,
} from "../utils/contentStats";

function formatStatus(status) {
  if (status === "in-progress") {
    return "In Progress";
  }

  if (status === "published") {
    return "Published";
  }

  if (status === "completed") {
    return "Completed";
  }

  return "Pending";
}

function PokemonContentSummary({
  pokemon,
}) {
  if (!pokemon) {
    return null;
  }

  const stats =
    getPokemonContentStats(pokemon);

  const content = [
    {
      id: "drawing",
      label: "Drawing",
      status:
        pokemon.drawing?.status ||
        "pending",
    },
    {
      id: "short",
      label: "Short",
      status:
        pokemon.short?.status ||
        "pending",
    },
    {
      id: "long",
      label: "Long Video",
      status:
        pokemon.long?.status ||
        "pending",
    },
  ];

  return (
    <div className="pokemon-content-summary">
      <div className="pokemon-content-summary-header">
        <div>
          <span className="section-label">
            CONTENT STATUS
          </span>

          <h3>
            {pokemon.name}
          </h3>
        </div>

        <strong>
          {stats.completed +
            stats.published} / 3
        </strong>
      </div>

      <div className="pokemon-content-summary-list">
        {content.map((item) => (
          <div
            className="pokemon-content-summary-item"
            key={item.id}
          >
            <span>{item.label}</span>

            <span
              className={`status ${item.status}`}
            >
              {formatStatus(
                item.status
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonContentSummary;