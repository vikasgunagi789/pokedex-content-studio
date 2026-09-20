/* =========================================================
   POKÉDEX CONTENT GENERATOR
   Generates separate content for:
   - Drawing
   - Short Video
   - Long Video
========================================================= */

/* =========================================================
   HELPERS
========================================================= */

function getPokemonName(pokemon) {
  if (typeof pokemon === "string") {
    return pokemon;
  }

  if (pokemon && typeof pokemon.name === "string") {
    return pokemon.name;
  }

  return "Pokémon";
}

function cleanPokemonName(name) {
  return String(name)
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
    );
}

/* =========================================================
   DRAWING CONTENT
========================================================= */

function generateDrawingTitle(name) {
  return `Drawing ${name} | Pokémon Art`;
}

function generateDrawingCaption(name) {
  return `Drawing ${name} from the original Pokémon series! 🎨

Watch the artwork come together from sketch to final details.

Which Pokémon should I draw next?`;

}

function generateDrawingHashtags(name) {
  const tag = name.replace(/\s+/g, "");

  return `#Pokemon #${tag} #PokemonDrawing #Drawing #PokemonArt #Art`;
}

/* =========================================================
   SHORT VIDEO CONTENT
========================================================= */

function generateShortTitle(name) {
  return `Drawing ${name} in 60 Seconds! | Pokémon Drawing`;
}

function generateShortCaption(name) {
  return `Watch me draw ${name} step by step! ✏️

This Pokémon drawing comes together from a simple sketch to the final artwork.

Follow the journey as I complete the Pokédex!

Which Pokémon should I draw next?`;

}

function generateShortHashtags(name) {
  const tag = name.replace(/\s+/g, "");

  return `#Pokemon #${tag} #PokemonShorts #DrawingShorts #PokemonDrawing #ArtShorts #Shorts`;
}

function generateShortScript(name) {
  return `Today I'm drawing ${name}!

Let's start with the basic sketch and slowly build up the details.

Now it's time to add the important features and refine the drawing.

And here is the final ${name} drawing!

Which Pokémon should I draw next?`;
}

/* =========================================================
   LONG VIDEO CONTENT
========================================================= */

function generateLongTitle(name) {
  return `How to Draw ${name} | Step-by-Step Pokémon Drawing`;
}

function generateLongDescription(name) {
  return `In this video, I'll show you how I draw ${name} step by step.

We'll start with the basic sketch, add the main shapes and details, and then complete the final artwork.

This is part of my journey to draw all the original Pokémon from the Pokédex.

If you enjoy Pokémon drawing videos, make sure to follow the channel for the next Pokémon drawing.`;
}

function generateLongCaption(name) {
  return `I drew ${name} from start to finish!

In this full Pokémon drawing video, you can follow the complete artwork process, from the initial sketch to the finished drawing.

This is another step in my journey to complete the Pokédex through drawing.

Which Pokémon should be next?`;

}

function generateLongHashtags(name) {
  const tag = name.replace(/\s+/g, "");

  return `#Pokemon #${tag} #HowToDraw #PokemonDrawing #DrawingTutorial #PokemonArt #Art`;
}

function generateLongScript(name) {
  return `Welcome back to the Pokédex drawing series!

Today we're drawing ${name}.

We'll begin with the basic shapes and proportions before slowly adding the important details.

Once the main sketch is ready, we'll refine the lines and work on the smaller features.

After that, we'll complete the final details and finish the artwork.

And that's the final ${name} drawing!

Thanks for watching, and I'll see you in the next Pokémon drawing.`;
}

/* =========================================================
   MAIN CONTENT GENERATOR
========================================================= */

export function generateContent(pokemon) {
  const pokemonName = cleanPokemonName(
    getPokemonName(pokemon)
  );

  return {
    pokemonName,

    /* -----------------------------------------
       GENERAL
    ----------------------------------------- */

    title: generateShortTitle(pokemonName),

    description: generateLongDescription(
      pokemonName
    ),

    /* -----------------------------------------
       DRAWING
    ----------------------------------------- */

    drawing: {
      title: generateDrawingTitle(
        pokemonName
      ),

      caption: generateDrawingCaption(
        pokemonName
      ),

      hashtags: generateDrawingHashtags(
        pokemonName
      )
    },

    /* -----------------------------------------
       SHORT VIDEO
    ----------------------------------------- */

    short: {
      title: generateShortTitle(
        pokemonName
      ),

      caption: generateShortCaption(
        pokemonName
      ),

      hashtags: generateShortHashtags(
        pokemonName
      ),

      script: generateShortScript(
        pokemonName
      )
    },

    /* -----------------------------------------
       LONG VIDEO
    ----------------------------------------- */

    long: {
      title: generateLongTitle(
        pokemonName
      ),

      description: generateLongDescription(
        pokemonName
      ),

      caption: generateLongCaption(
        pokemonName
      ),

      hashtags: generateLongHashtags(
        pokemonName
      ),

      script: generateLongScript(
        pokemonName
      )
    },

    /* -----------------------------------------
       BACKWARD COMPATIBILITY
       Keeps existing components working.
    ----------------------------------------- */

    caption: generateShortCaption(
      pokemonName
    ),

    socialCaption: generateShortCaption(
      pokemonName
    ),

    hashtags: generateShortHashtags(
      pokemonName
    ),

    script: generateShortScript(
      pokemonName
    )
  };
}

/* =========================================================
   INDIVIDUAL EXPORTS
========================================================= */

export {
  cleanPokemonName,
  generateDrawingTitle,
  generateDrawingCaption,
  generateDrawingHashtags,
  generateShortTitle,
  generateShortCaption,
  generateShortHashtags,
  generateShortScript,
  generateLongTitle,
  generateLongDescription,
  generateLongCaption,
  generateLongHashtags,
  generateLongScript
};