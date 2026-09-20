export function calculatePercentage(
  completed,
  total
) {
  if (!total || total <= 0) {
    return 0;
  }

  return Math.round(
    (completed / total) * 100
  );
}

export function calculatePokemonProgress(pokemon) {
  if (!pokemon) {
    return {
      completed: 0,
      total: 3,
      percentage: 0,
    };
  }

  const types = [
    "drawing",
    "short",
    "long",
  ];

  const completed = types.filter((type) => {
    const status =
      pokemon[type]?.status || "pending";

    return (
      status === "completed" ||
      status === "published"
    );
  }).length;

  return {
    completed,
    total: 3,
    percentage: calculatePercentage(
      completed,
      3
    ),
  };
}

export function calculateOverallProgress(
  pokemonList = []
) {
  const total = pokemonList.length * 3;

  let completed = 0;

  pokemonList.forEach((pokemon) => {
    ["drawing", "short", "long"].forEach(
      (type) => {
        const status =
          pokemon[type]?.status || "pending";

        if (
          status === "completed" ||
          status === "published"
        ) {
          completed++;
        }
      }
    );
  });

  return {
    completed,
    total,
    percentage: calculatePercentage(
      completed,
      total
    ),
  };
}

export function calculateTypeProgress(
  pokemonList = [],
  type
) {
  if (
    !["drawing", "short", "long"].includes(type)
  ) {
    return {
      completed: 0,
      total: pokemonList.length,
      percentage: 0,
    };
  }

  const total = pokemonList.length;

  const completed = pokemonList.filter(
    (pokemon) => {
      const status =
        pokemon[type]?.status || "pending";

      return (
        status === "completed" ||
        status === "published"
      );
    }
  ).length;

  return {
    completed,
    total,
    percentage: calculatePercentage(
      completed,
      total
    ),
  };
}