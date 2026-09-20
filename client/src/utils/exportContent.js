export function exportJson(
  data,
  filename = "pokedex-content-studio.json"
) {
  try {
    const json = JSON.stringify(
      data,
      null,
      2
    );

    const blob = new Blob(
      [json],
      {
        type: "application/json"
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download = filename;

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  } catch (error) {
    console.error(
      "Unable to export JSON:",
      error
    );

    throw error;
  }
}


/*
  Import a JSON file selected
  by the user.

  Returns a Promise that resolves
  with the parsed JSON data.
*/
export function importJsonFile(
  file
) {
  return new Promise(
    (resolve, reject) => {
      if (!file) {
        reject(
          new Error(
            "No file selected."
          )
        );

        return;
      }

      const reader =
        new FileReader();

      reader.onload = () => {
        try {
          const parsed =
            JSON.parse(
              reader.result
            );

          resolve(parsed);
        } catch (error) {
          reject(
            new Error(
              "The selected file is not valid JSON."
            )
          );
        }
      };

      reader.onerror = () => {
        reject(
          new Error(
            "Unable to read the selected file."
          )
        );
      };

      reader.readAsText(file);
    }
  );
}


/*
  Compatibility alias.

  Some newer components may use
  exportJSON instead of exportJson.
*/
export const exportJSON =
  exportJson;


export function exportPokemon(
  pokemon
) {
  if (!pokemon) {
    return;
  }

  exportJson(
    pokemon,
    `pokemon-${pokemon.id}.json`
  );
}


export function exportContentList(
  pokemonList
) {
  exportJson(
    pokemonList,
    "pokedex-content-studio.json"
  );
}