import {
  formatScheduleDate,
  formatDayName,
  getRelativeDay
} from "../utils/scheduleDate";

function ScheduleCard({
  item,
  index,
  onOpen
}) {
  const pokemon =
    item?.pokemon;

  if (!pokemon) {
    return (
      <div className="schedule-card empty">

        <div className="schedule-card-day">
          {getRelativeDay(
            item?.date,
            index
          )}
        </div>

        <strong>
          No content available
        </strong>

        <span>
          Complete more content to
          generate the schedule.
        </span>

      </div>
    );
  }

  const isShort =
    item.contentType === "short";

  return (
    <div className="schedule-card">

      <div className="schedule-card-top">

        <div>
          <span className="schedule-relative">
            {getRelativeDay(
              item.date,
              index
            )}
          </span>

          <strong>
            {formatScheduleDate(
              item.date
            )}
          </strong>

          <small>
            {formatDayName(
              item.date
            )}
          </small>
        </div>

        <span
          className={`schedule-type ${
            isShort
              ? "short"
              : "long"
          }`}
        >
          {isShort
            ? "SHORT"
            : "LONG"}
        </span>

      </div>

      <div className="schedule-card-pokemon">

        <div className="schedule-pokemon-number">
          #{String(
            pokemon.number
          ).padStart(3, "0")}
        </div>

        <div>
          <strong>
            {pokemon.name}
          </strong>

          <span>
            {isShort
              ? "YouTube Short"
              : "Long-form Video"}
          </span>
        </div>

      </div>

      <div className="schedule-card-status">

        <span>
          Drawing
        </span>

        <strong>
          {pokemon.drawing
            ?.status ||
            "pending"}
        </strong>

      </div>

      <button
        type="button"
        className="secondary-button"
        onClick={() =>
          onOpen?.(pokemon)
        }
      >
        Open Pokémon
      </button>

    </div>
  );
}

export default ScheduleCard;