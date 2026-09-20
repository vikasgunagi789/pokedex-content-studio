import { useEffect, useState } from "react";

function ProductionNotes({
  pokemon,
  onUpdate
}) {
  const [notes, setNotes] =
    useState(
      pokemon?.productionNotes ||
        ""
    );

  useEffect(() => {
    setNotes(
      pokemon?.productionNotes ||
        ""
    );
  }, [pokemon]);

  function saveNotes() {
    const updatedPokemon = {
      ...pokemon,
      productionNotes: notes,
      productionNotesUpdatedAt:
        new Date().toISOString()
    };

    onUpdate(updatedPokemon);
  }

  return (
    <section className="production-notes">

      <div className="section-heading">
        <div>
          <span className="section-label">
            PRODUCTION NOTES
          </span>

          <h3>
            {pokemon?.name}
          </h3>
        </div>
      </div>

      <textarea
        value={notes}
        onChange={(event) =>
          setNotes(
            event.target.value
          )
        }
        placeholder="Write production notes, ideas, reminders or recording instructions..."
        rows="8"
      />

      <div className="notes-actions">
        <span>
          {notes.length} characters
        </span>

        <button
          type="button"
          onClick={saveNotes}
        >
          Save Notes
        </button>
      </div>
    </section>
  );
}

export default ProductionNotes;