import { generateContent } from "./contentGenerator";

const CONTENT_TYPES = [
  "drawing",
  "short",
  "long",
];

export function generateBulkContent(
  pokemonList = [],
  contentType = "drawing"
) {
  if (
    !CONTENT_TYPES.includes(contentType)
  ) {
    return pokemonList;
  }

  return pokemonList.map((pokemon) => {
    const generated =
      generateContent(
        pokemon.name,
        contentType
      );

    return {
      ...pokemon,

      [contentType]: {
        ...(pokemon[contentType] || {}),
        ...generated,
      },
    };
  });
}

export function generateAllContent(
  pokemonList = []
) {
  return pokemonList.map((pokemon) => {
    const updatedPokemon = {
      ...pokemon,
    };

    CONTENT_TYPES.forEach((type) => {
      const generated =
        generateContent(
          pokemon.name,
          type
        );

      updatedPokemon[type] = {
        ...(pokemon[type] || {}),
        ...generated,
      };
    });

    return updatedPokemon;
  });
}