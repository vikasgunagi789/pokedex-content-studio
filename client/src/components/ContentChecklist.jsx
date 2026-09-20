import { useMemo } from "react";

const CHECKLISTS = {
  drawing: [
    "Reference image selected",
    "Sketch completed",
    "Line art completed",
    "Coloring completed",
    "Final image exported"
  ],

  short: [
    "Hook prepared",
    "Drawing footage recorded",
    "Video edited",
    "Music added",
    "Vertical format checked",
    "Short exported"
  ],

  long: [
    "Video concept prepared",
    "Recording completed",
    "Video edited",
    "Music added",
    "Thumbnail prepared",
    "Description prepared",
    "Final video exported"
  ],

  publishing: [
    "Title checked",
    "Description checked",
    "Tags checked",
    "Thumbnail checked",
    "Visibility selected",
    "Published"
  ]
};

function ContentChecklist({
  pokemon,
  type,
  onUpdate
}) {
  const items =
    CHECKLISTS[type] ||
    [];

  const content =
    pokemon?.[type] || {};

  const completed =
    Array.isArray(
      content.checklist
    )
      ? content.checklist
      : [];

  const completedCount =
    completed.length;

  const percentage =
    items.length === 0
      ? 0
      : Math.round(
          (completedCount /
            items.length) *
            100
        );

  const toggleItem = (
    index
  ) => {
    const next =
      completed.includes(index)
        ? completed.filter(
            (item) =>
              item !== index
          )
        : [
            ...completed,
            index
          ];

    onUpdate({
      ...pokemon,
      [type]: {
        ...content,
        checklist: next
      }
    });
  };

  const summary = useMemo(
    () => ({
      completed:
        completedCount,
      total:
        items.length
    }),
    [
      completedCount,
      items.length
    ]
  );

  return (
    <section className="content-checklist">

      <div className="checklist-header">
        <div>
          <span className="section-label">
            CHECKLIST
          </span>

          <h3>
            {type ===
            "publishing"
              ? "Publishing Checklist"
              : `${type} Checklist`}
          </h3>
        </div>

        <strong>
          {percentage}%
        </strong>
      </div>

      <div className="checklist-progress">
        <div
          style={{
            width: `${percentage}%`
          }}
        />
      </div>

      <div className="checklist-items">
        {items.map(
          (
            item,
            index
          ) => {
            const checked =
              completed.includes(
                index
              );

            return (
              <button
                key={item}
                type="button"
                className={
                  checked
                    ? "checklist-item checked"
                    : "checklist-item"
                }
                onClick={() =>
                  toggleItem(
                    index
                  )
                }
              >
                <span className="check-icon">
                  {checked
                    ? "✓"
                    : ""}
                </span>

                <span>
                  {item}
                </span>
              </button>
            );
          }
        )}
      </div>

      <small>
        {summary.completed} of{" "}
        {summary.total} completed
      </small>
    </section>
  );
}

export default ContentChecklist;