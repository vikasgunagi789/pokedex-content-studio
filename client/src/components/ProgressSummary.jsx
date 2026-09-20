import {
  useMemo
} from "react";

import {
  getAnalytics
} from "../utils/analytics";

function ProgressSummary({
  pokemonList = []
}) {
  const data =
    useMemo(
      () =>
        getAnalytics(
          pokemonList
        ),
      [pokemonList]
    );

  return (
    <div className="progress-summary">

      <div className="progress-summary-main">

        <span className="section-label">
          GENERATION 1
        </span>

        <h3>
          Pokédex Completion
        </h3>

        <strong>
          {data.percentage}%
        </strong>

        <p>
          {data.drawings +
            data.shorts +
            data.longs}{" "}
          completed content items
          across{" "}
          {data.totalPokemon}{" "}
          Pokémon.
        </p>

      </div>

      <div className="progress-summary-stats">

        <div>
          <span>
            Drawings
          </span>

          <strong>
            {data.drawings}
          </strong>
        </div>

        <div>
          <span>
            Shorts
          </span>

          <strong>
            {data.shorts}
          </strong>
        </div>

        <div>
          <span>
            Long Videos
          </span>

          <strong>
            {data.longs}
          </strong>
        </div>

        <div>
          <span>
            Fully Complete
          </span>

          <strong>
            {data.fullyCompleted}
          </strong>
        </div>

      </div>

    </div>
  );
}

export default ProgressSummary;