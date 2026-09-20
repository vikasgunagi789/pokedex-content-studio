import { useRef } from "react";
import {
  exportJson,
  importJsonFile,
} from "../utils/exportContent";

function ImportExportPanel({
  pokemonList = [],
  onImport,
}) {
  const fileInputRef = useRef(null);

  function handleExport() {
    if (!pokemonList.length) {
      alert(
        "There is no content to export."
      );

      return;
    }

    exportJson(
      pokemonList,
      "pokedex-content-studio.json"
    );
  }

  async function handleImport(event) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      const importedData =
        await importJsonFile(file);

      if (!Array.isArray(importedData)) {
        throw new Error(
          "Invalid Pokémon data."
        );
      }

      if (onImport) {
        onImport(importedData);
      }

      alert(
        "Content imported successfully."
      );
    } catch (error) {
      console.error(
        "Import failed:",
        error
      );

      alert(
        "Unable to import this JSON file."
      );
    }

    event.target.value = "";
  }

  return (
    <div className="import-export-panel">
      <div>
        <span className="section-label">
          DATA MANAGEMENT
        </span>

        <h3>
          Backup Content
        </h3>

        <p>
          Export your content as JSON or
          restore it from a previous backup.
        </p>
      </div>

      <div className="import-export-actions">
        <button
          type="button"
          className="secondary-button"
          onClick={handleExport}
        >
          Export JSON
        </button>

        <button
          type="button"
          className="secondary-button"
          onClick={() =>
            fileInputRef.current?.click()
          }
        >
          Import JSON
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          onChange={handleImport}
          hidden
        />
      </div>
    </div>
  );
}

export default ImportExportPanel;