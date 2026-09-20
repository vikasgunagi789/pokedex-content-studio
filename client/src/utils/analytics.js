function statusOf(
  pokemon,
  type
) {
  return (
    pokemon?.[type]?.status ||
    "pending"
  );
}

function isDone(status) {
  return (
    status === "completed" ||
    status === "published"
  );
}

export function getAnalytics(
  pokemonList = []
) {
  const total =
    pokemonList.length;

  let drawings = 0;
  let shorts = 0;
  let longs = 0;
  let fullyCompleted = 0;

  pokemonList.forEach(
    (pokemon) => {
      const drawingDone =
        isDone(
          statusOf(
            pokemon,
            "drawing"
          )
        );

      const shortDone =
        isDone(
          statusOf(
            pokemon,
            "short"
          )
        );

      const longDone =
        isDone(
          statusOf(
            pokemon,
            "long"
          )
        );

      if (drawingDone)
        drawings++;

      if (shortDone)
        shorts++;

      if (longDone)
        longs++;

      if (
        drawingDone &&
        shortDone &&
        longDone
      ) {
        fullyCompleted++;
      }
    }
  );

  return {
    totalPokemon: total,

    drawings,

    shorts,

    longs,

    fullyCompleted,

    remainingDrawings:
      Math.max(
        total - drawings,
        0
      ),

    remainingShorts:
      Math.max(
        total - shorts,
        0
      ),

    remainingLongs:
      Math.max(
        total - longs,
        0
      ),

    percentage:
      total === 0
        ? 0
        : Math.round(
            ((drawings +
              shorts +
              longs) /
              (total * 3)) *
              100
          )
  };
}

function statusOf(
  pokemon,
  type
) {
  return (
    pokemon?.[type]?.status ||
    "pending"
  );
}

function isDone(status) {
  return (
    status === "completed" ||
    status === "published"
  );
}

export function getAnalytics(
  pokemonList = []
) {
  const total =
    pokemonList.length;

  let drawings = 0;
  let shorts = 0;
  let longs = 0;
  let fullyCompleted = 0;

  pokemonList.forEach(
    (pokemon) => {
      const drawingDone =
        isDone(
          statusOf(
            pokemon,
            "drawing"
          )
        );

      const shortDone =
        isDone(
          statusOf(
            pokemon,
            "short"
          )
        );

      const longDone =
        isDone(
          statusOf(
            pokemon,
            "long"
          )
        );

      if (drawingDone)
        drawings++;

      if (shortDone)
        shorts++;

      if (longDone)
        longs++;

      if (
        drawingDone &&
        shortDone &&
        longDone
      ) {
        fullyCompleted++;
      }
    }
  );

  return {
    totalPokemon: total,
    drawings,
    shorts,
    longs,
    fullyCompleted,

    remainingDrawings:
      Math.max(
        total - drawings,
        0
      ),

    remainingShorts:
      Math.max(
        total - shorts,
        0
      ),

    remainingLongs:
      Math.max(
        total - longs,
        0
      ),

    percentage:
      total === 0
        ? 0
        : Math.round(
            ((drawings +
              shorts +
              longs) /
              (total * 3)) *
              100
          )
  };
}

export function getFullyCompletedPokemon(
  pokemonList = []
) {
  return pokemonList.filter(
    (pokemon) =>
      isDone(
        statusOf(
          pokemon,
          "drawing"
        )
      ) &&
      isDone(
        statusOf(
          pokemon,
          "short"
        )
      ) &&
      isDone(
        statusOf(
          pokemon,
          "long"
        )
      )
  );
}

export function getIncompletePokemon(
  pokemonList = []
) {
  return pokemonList.filter(
    (pokemon) => {
      return !(
        isDone(
          statusOf(
            pokemon,
            "drawing"
          )
        ) &&
        isDone(
          statusOf(
            pokemon,
            "short"
          )
        ) &&
        isDone(
          statusOf(
            pokemon,
            "long"
          )
        )
      );
    }
  );
}