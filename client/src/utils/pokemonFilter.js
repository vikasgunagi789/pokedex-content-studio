function getOverallStatus(pokemon) {
  const statuses = [
    pokemon?.drawing?.status || "pending",
    pokemon?.short?.status || "pending",
    pokemon?.long?.status || "pending",
  ];

  if (
    statuses.every(
      (status) => status === "published"
    )
  ) {
    return "published";
  }

  if (
    statuses.some(
      (status) => status === "in-progress"
    )
  ) {
    return "in-progress";
  }

  if (
    statuses.some(
      (status) =>
        status === "completed" ||
        status === "published"
    )
  ) {
    return "completed";
  }

  return "pending";
}

export function filterPokemon(
  pokemonList = [],
  search = "",
  statusFilter = "all"
) {
  const searchText = search
    .trim()
    .toLowerCase();

  return pokemonList.filter((pokemon) => {
    const matchesSearch =
      !searchText ||
      pokemon.name
        ?.toLowerCase()
        .includes(searchText) ||
      String(pokemon.number || "")
        .includes(searchText) ||
      String(pokemon.id || "")
        .includes(searchText);

    if (!matchesSearch) {
      return false;
    }

    if (statusFilter === "all") {
      return true;
    }

    return (
      getOverallStatus(pokemon) ===
      statusFilter
    );
  });
}

export function getOverallPokemonStatus(
  pokemon
) {
  return getOverallStatus(pokemon);
}