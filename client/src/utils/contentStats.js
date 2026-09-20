function getStatus(item, type) {
  return item?.[type]?.status || "pending";
}

export function getContentStats(pokemonList = []) {
  let pending = 0;
  let inProgress = 0;
  let completed = 0;
  let published = 0;

  pokemonList.forEach((pokemon) => {
    ["drawing", "short", "long"].forEach((type) => {
      const status = getStatus(pokemon, type);

      if (status === "pending") {
        pending++;
      }

      if (status === "in-progress") {
        inProgress++;
      }

      if (status === "completed") {
        completed++;
      }

      if (status === "published") {
        published++;
      }
    });
  });

  return {
    totalPokemon: pokemonList.length,
    totalContent: pokemonList.length * 3,
    pending,
    inProgress,
    completed,
    published,
  };
}

export function getTotalPublished(pokemonList = []) {
  return pokemonList.reduce((total, pokemon) => {
    return (
      total +
      ["drawing", "short", "long"].filter(
        (type) =>
          getStatus(pokemon, type) === "published"
      ).length
    );
  }, 0);
}

export function getTotalCompleted(pokemonList = []) {
  return pokemonList.reduce((total, pokemon) => {
    return (
      total +
      ["drawing", "short", "long"].filter(
        (type) => {
          const status = getStatus(pokemon, type);

          return (
            status === "completed" ||
            status === "published"
          );
        }
      ).length
    );
  }, 0);
}

export function getPokemonContentStats(pokemon) {
  const types = ["drawing", "short", "long"];

  const stats = {
    pending: 0,
    inProgress: 0,
    completed: 0,
    published: 0,
  };

  types.forEach((type) => {
    const status = getStatus(pokemon, type);

    if (status === "pending") {
      stats.pending++;
    }

    if (status === "in-progress") {
      stats.inProgress++;
    }

    if (status === "completed") {
      stats.completed++;
    }

    if (status === "published") {
      stats.published++;
    }
  });

  return stats;
}