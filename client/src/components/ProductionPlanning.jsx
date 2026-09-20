import { useEffect, useState } from "react";

import {
  PRIORITIES,
  formatPriority,
  isOverdue,
  getDaysUntilDue
} from "../utils/productionPlanning";

const CONTENT_TYPES = [
  {
    key: "drawing",
    label: "Drawing"
  },
  {
    key: "short",
    label: "Short Video"
  },
  {
    key: "long",
    label: "Long Video"
  }
];

function ProductionPlanning({
  pokemon,
  onUpdate
}) {
  const [activeType, setActiveType] =
    useState("drawing");

  const content =
    pokemon?.[activeType] || {};

  const [priority, setPriority] =
    useState(
      content.priority ||
        "normal"
    );

  const [dueDate, setDueDate] =
    useState(
      content.dueDate ||
        ""
    );

  const [duration, setDuration] =
    useState(
      content.estimatedDuration ||
        ""
    );

  const [planningNotes, setPlanningNotes] =
    useState(
      content.planningNotes ||
        ""
    );

  useEffect(() => {
    const currentContent =
      pokemon?.[activeType] || {};

    setPriority(
      currentContent.priority ||
        "normal"
    );

    setDueDate(
      currentContent.dueDate ||
        ""
    );

    setDuration(
      currentContent.estimatedDuration ||
        ""
    );

    setPlanningNotes(
      currentContent.planningNotes ||
        ""
    );
  }, [
    pokemon,
    activeType
  ]);

  function savePlanning() {
    const updatedContent = {
      ...content,

      priority,

      dueDate,

      estimatedDuration:
        duration,

      planningNotes,

      planningUpdatedAt:
        new Date().toISOString()
    };

    const updatedPokemon = {
      ...pokemon,

      [activeType]:
        updatedContent
    };

    onUpdate(
      updatedPokemon
    );
  }

  function clearPlanning() {
    const updatedContent = {
      ...content
    };

    delete updatedContent.priority;
    delete updatedContent.dueDate;
    delete updatedContent.estimatedDuration;
    delete updatedContent.planningNotes;
    delete updatedContent.planningUpdatedAt;

    const updatedPokemon = {
      ...pokemon,

      [activeType]:
        updatedContent
    };

    setPriority("normal");
    setDueDate("");
    setDuration("");
    setPlanningNotes("");

    onUpdate(
      updatedPokemon
    );
  }

  const daysUntilDue =
    getDaysUntilDue({
      ...content,
      dueDate,
      priority
    });

  const overdue =
    isOverdue({
      ...content,
      dueDate
    });

  function getDueMessage() {
    if (!dueDate) {
      return "No due date set.";
    }

    if (overdue) {
      return "This content is overdue.";
    }

    if (
      daysUntilDue === 0
    ) {
      return "Due today.";
    }

    if (
      daysUntilDue === 1
    ) {
      return "Due tomorrow.";
    }

    if (
      daysUntilDue > 1
    ) {
      return `Due in ${daysUntilDue} days.`;
    }

    return "Due date information unavailable.";
  }

  return (
    <section className="production-planning">

      <div className="planning-header">
        <div>
          <span className="section-label">
            PRODUCTION PLANNING
          </span>

          <h3>
            Plan {pokemon?.name}
          </h3>

          <p>
            Set priorities and deadlines
            for your content production.
          </p>
        </div>

        <div
          className={`planning-status ${
            overdue
              ? "overdue"
              : ""
          }`}
        >
          {getDueMessage()}
        </div>
      </div>

      {/* =================================================
          CONTENT TYPE
      ================================================= */}

      <div className="planning-type-tabs">
        {CONTENT_TYPES.map(
          (type) => (
            <button
              key={type.key}
              type="button"
              className={
                activeType ===
                type.key
                  ? "active"
                  : ""
              }
              onClick={() =>
                setActiveType(
                  type.key
                )
              }
            >
              {type.label}
            </button>
          )
        )}
      </div>

      {/* =================================================
          PLANNING FORM
      ================================================= */}

      <div className="planning-form">

        <div className="planning-field">
          <label>
            Priority
          </label>

          <select
            value={priority}
            onChange={(event) =>
              setPriority(
                event.target.value
              )
            }
          >
            {PRIORITIES.map(
              (item) => (
                <option
                  key={item}
                  value={item}
                >
                  {formatPriority(
                    item
                  )}
                </option>
              )
            )}
          </select>
        </div>

        <div className="planning-field">
          <label>
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(event) =>
              setDueDate(
                event.target.value
              )
            }
          />
        </div>

        <div className="planning-field">
          <label>
            Estimated Duration
          </label>

          <input
            type="text"
            value={duration}
            onChange={(event) =>
              setDuration(
                event.target.value
              )
            }
            placeholder="Example: 2 hours"
          />
        </div>

        <div className="planning-field planning-field-full">
          <label>
            Planning Notes
          </label>

          <textarea
            rows="5"
            value={planningNotes}
            onChange={(event) =>
              setPlanningNotes(
                event.target.value
              )
            }
            placeholder="Add planning notes, recording ideas, deadlines, references, or reminders..."
          />
        </div>

      </div>

      {/* =================================================
          SUMMARY
      ================================================= */}

      <div className="planning-summary">

        <div className="planning-summary-item">
          <span>
            Content
          </span>

          <strong>
            {
              CONTENT_TYPES.find(
                (type) =>
                  type.key ===
                  activeType
              )?.label
            }
          </strong>
        </div>

        <div className="planning-summary-item">
          <span>
            Priority
          </span>

          <strong
            className={`priority-text ${priority}`}
          >
            {formatPriority(
              priority
            )}
          </strong>
        </div>

        <div className="planning-summary-item">
          <span>
            Due Date
          </span>

          <strong>
            {dueDate ||
              "Not set"}
          </strong>
        </div>

      </div>

      {/* =================================================
          ACTIONS
      ================================================= */}

      <div className="planning-actions">

        <button
          type="button"
          className="secondary-action"
          onClick={
            clearPlanning
          }
        >
          Clear Planning
        </button>

        <button
          type="button"
          className="primary-action"
          onClick={
            savePlanning
          }
        >
          Save Planning
        </button>

      </div>

    </section>
  );
}

export default ProductionPlanning;