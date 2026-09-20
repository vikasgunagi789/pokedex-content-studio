import {
  useMemo
} from "react";

import {
  getNextScheduledItems
} from "../utils/scheduleGenerator";

import ScheduleCard from "./ScheduleCard";

function ScheduleGenerator({
  pokemonList = [],
  onOpenPokemon
}) {
  const schedule =
    useMemo(
      () =>
        getNextScheduledItems(
          pokemonList,
          14
        ),
      [pokemonList]
    );

  return (
    <div className="schedule-generator">

      <div className="schedule-generator-header">

        <div>
          <span className="section-label">
            AUTOMATIC PLANNER
          </span>

          <h3>
            Next 14 Days
          </h3>

          <p>
            The schedule updates
            automatically from your
            current production status.
          </p>
        </div>

      </div>

      <div className="schedule-generator-grid">

        {schedule.map(
          (item, index) => (
            <ScheduleCard
              key={
                `${item.date}-${index}`
              }
              item={item}
              index={index}
              onOpen={
                onOpenPokemon
              }
            />
          )
        )}

      </div>

    </div>
  );
}

export default ScheduleGenerator;