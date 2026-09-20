export function generateYoutubeMetadata(
  pokemonName
) {
  const name =
    pokemonName
      .replace("♀", "")
      .replace("♂", "")
      .trim();

  const keywordBase = [
    "Pokemon",
    "Pokemon drawing",
    `${name} drawing`,
    `how to draw ${name}`,
    "Pokemon art",
    "Pokemon drawing tutorial",
    "Pokedex",
    "Pokemon fan art"
  ];

  const tags = [
    ...new Set(
      keywordBase
    )
  ];

  return {
    keywords: tags,

    searchTerms: tags.join(", "),

    seoTitle:
      `How to Draw ${name} | Pokémon Drawing Tutorial`,

    seoDescription:
      `Learn how to draw ${name} from Pokémon step by step. Follow this Pokémon drawing tutorial from the basic sketch to the finished artwork.`,

    thumbnailText:
      `DRAWING ${name.toUpperCase()}`
  };
}