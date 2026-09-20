function isPublished(content) {
  return content?.status === "published";
}

function isScheduled(content) {
  return Boolean(
    content?.scheduledDate
  );
}

function drawingReady(pokemon) {
  const status =
    pokemon?.drawing?.status ||
    "pending";

  return (
    status === "completed" ||
    status === "published"
  );
}

function getShortCandidates(
  pokemonList
) {
  return pokemonList.filter(
    (pokemon) => {
      const short =
        pokemon.short || {};

      return (
        !isPublished(short) &&
        !isScheduled(short) &&
        drawingReady(pokemon)
      );
    }
  );
}

function getLongCandidates(
  pokemonList
) {
  return pokemonList.filter(
    (pokemon) => {
      const long =
        pokemon.long || {};

      return (
        !isPublished(long) &&
        !isScheduled(long) &&
        drawingReady(pokemon)
      );
    }
  );
}

export function generateSchedule(
  pokemonList = [],
  numberOfDays = 14,
  startDate = new Date()
) {
  const shorts =
    getShortCandidates(
      pokemonList
    );

  const longs =
    getLongCandidates(
      pokemonList
    );

  const schedule = [];

  let shortIndex = 0;
  let longIndex = 0;

  for (
    let day = 0;
    day < numberOfDays;
    day++
  ) {
    const date = new Date(
      startDate
    );

    date.setDate(
      date.getDate() + day
    );

    const useShort =
      day % 2 === 0;

    let pokemon = null;
    let contentType = null;

    if (
      useShort &&
      shorts[shortIndex]
    ) {
      pokemon =
        shorts[shortIndex];
      shortIndex++;
      contentType = "short";
    } else if (
      longs[longIndex]
    ) {
      pokemon =
        longs[longIndex];
      longIndex++;
      contentType = "long";
    } else if (
      shorts[shortIndex]
    ) {
      pokemon =
        shorts[shortIndex];
      shortIndex++;
      contentType = "short";
    }

    if (!pokemon) {
      schedule.push({
        date,
        contentType: null,
        pokemon: null,
        status: "empty"
      });

      continue;
    }

    schedule.push({
      date,
      contentType,
      pokemon,
      status: "planned"
    });
  }

  return schedule;
}

export function getNextScheduledItems(
  pokemonList = [],
  count = 14
) {
  return generateSchedule(
    pokemonList,
    count,
    new Date()
  );
}