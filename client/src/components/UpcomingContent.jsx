import {
  getUpcomingContent,
  getContentTypeName
} from "../utils/upcomingContent";

function UpcomingContent({
  pokemonList = [],
  onOpen
}) {
  const items =
    getUpcomingContent(
      pokemonList,
      8
    );

  return (
    <div className="upcoming-content">

      <div className="panel-header">

        <div>
          <span className="section-label">
            NEXT CONTENT
          </span>

          <h3>
            Upcoming Production
          </h3>
        </div>

      </div>

      <div className="upcoming-content-list">

        {items.map(
          (item, index) => (
            <div
              className="upcoming-content-item"
              key={`${item.pokemon.id}-${item.type}`}
            >

              <span className="upcoming-index">
                {String(
                  index + 1
                ).padStart(2, "0")}
              </span>

              <div className="upcoming-content-info">

                <strong>
                  #{String(
                    item.pokemon.number
                  ).padStart(
                    3,
                    "0"
                  )}{" "}
                  {item.pokemon.name}
                </strong>

                <span>
                  {getContentTypeName(
                    item.type
                  )}
                </span>

              </div>

              <button
                type="button"
                className="secondary-button"
                onClick={() =>
                  onOpen?.(
                    item.pokemon
                  )
                }
              >
                Open
              </button>

            </div>
          )
        )}

        {items.length === 0 && (
          <div className="empty-state">
            <strong>
              Everything is complete
            </strong>

            <p>
              There is currently no
              unfinished content.
            </p>
          </div>
        )}

      </div>

    </div>
  );
}

export default UpcomingContent;