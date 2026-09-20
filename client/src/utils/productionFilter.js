function status(
  pokemon,
  type
) {
  return (
    pokemon?.[type]?.status ||
    "pending"
  );
}

function completed(value) {
  return (
    value === "completed" ||
    value === "published"
  );
}

export function filterByProduction(
  pokemonList = [],
  filter = "all"
) {
  return pokemonList.filter(
    (pokemon) => {
      switch (filter) {
        case "drawing-complete":
          return completed(
            status(
              pokemon,
              "drawing"
            )
          );

        case "drawing-needed":
          return !completed(
            status(
              pokemon,
              "drawing"
            )
          );

        case "short-complete":
          return completed(
            status(
              pokemon,
              "short"
            )
          );

        case "long-complete":
          return completed(
            status(
              pokemon,
              "long"
            )
          );

        case "fully-complete":
          return (
            completed(
              status(
                pokemon,
                "drawing"
              )
            ) &&
            completed(
              status(
                pokemon,
                "short"
              )
            ) &&
            completed(
              status(
                pokemon,
                "long"
              )
            )
          );

        default:
          return true;
      }
    }
  );
}