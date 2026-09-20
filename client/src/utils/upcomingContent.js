function done(status) {
  return (
    status === "completed" ||
    status === "published"
  );
}

export function getUpcomingContent(
  pokemonList = [],
  count = 10
) {
  const result = [];

  for (
    const pokemon of pokemonList
  ) {
    if (
      !done(
        pokemon.drawing?.status
      )
    ) {
      result.push({
        pokemon,
        type: "drawing"
      });
    }

    if (
      !done(
        pokemon.short?.status
      )
    ) {
      result.push({
        pokemon,
        type: "short"
      });
    }

    if (
      !done(
        pokemon.long?.status
      )
    ) {
      result.push({
        pokemon,
        type: "long"
      });
    }

    if (
      result.length >= count
    ) {
      break;
    }
  }

  return result.slice(
    0,
    count
  );
}

export function getContentTypeName(
  type
) {
  if (type === "drawing")
    return "Drawing";

  if (type === "short")
    return "YouTube Short";

  if (type === "long")
    return "Long Video";

  return "Content";
}