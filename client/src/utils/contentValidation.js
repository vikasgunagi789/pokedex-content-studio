export function validateContent(
  pokemon
) {
  const warnings = [];

  if (!pokemon) {
    return [
      {
        type: "error",
        message:
          "Pokémon data is missing."
      }
    ];
  }

  if (
    !pokemon.name
  ) {
    warnings.push({
      type: "error",
      message:
        "Pokémon name is missing."
    });
  }

  const contentTypes = [
    {
      key: "drawing",
      label: "Drawing"
    },
    {
      key: "short",
      label: "Short"
    },
    {
      key: "long",
      label: "Long Video"
    }
  ];

  contentTypes.forEach(
    ({
      key,
      label
    }) => {
      const content =
        pokemon[key];

      if (!content) {
        warnings.push({
          type: "warning",
          message:
            `${label} content has not been created.`
        });

        return;
      }

      if (
        content.status ===
          "completed" ||
        content.status ===
          "published"
      ) {
        if (
          !content.title
        ) {
          warnings.push({
            type: "warning",
            message:
              `${label} is marked complete but has no title.`
          });
        }
      }
    }
  );

  return warnings;
}

export function hasValidationWarnings(
  pokemon
) {
  return (
    validateContent(
      pokemon
    ).length > 0
  );
}