import { useMemo, useState } from "react";

const CONTENT_TYPES = [
  {
    key: "drawing",
    label: "Drawing",
    icon: "✎"
  },
  {
    key: "short",
    label: "Short",
    icon: "▸"
  },
  {
    key: "long",
    label: "Long Video",
    icon: "▤"
  }
];

const STATUS_OPTIONS = [
  "pending",
  "in-progress",
  "completed",
  "published"
];

function formatStatus(status) {
  if (status === "in-progress") {
    return "In Progress";
  }

  if (status === "completed") {
    return "Completed";
  }

  if (status === "published") {
    return "Published";
  }

  return "Pending";
}

function ProductionWorkspace({
  pokemon,
  onUpdate
}) {
  const [activeType, setActiveType] =
    useState("drawing");

  const content =
    pokemon?.[activeType] || {};

  const updateContent = (changes) => {
    const updatedPokemon = {
      ...pokemon,
      [activeType]: {
        ...content,
        ...changes
      }
    };

    onUpdate(updatedPokemon);
  };

  const stats = useMemo(() => {
    return {
      status:
        content.status || "pending",

      title:
        content.title || "",

      description:
        content.description || "",

      notes:
        content.notes || ""
    };
  }, [content]);

  return (
    <section className="production-workspace">

      <div className="workspace-header">
        <div>
          <span className="section-label">
            PRODUCTION WORKSPACE
          </span>

          <h3>
            {pokemon?.name || "Pokémon"}
          </h3>

          <p>
            Manage each content type from
            one workspace.
          </p>
        </div>

        <div className="workspace-status">
          <span
            className={`content-badge ${stats.status}`}
          >
            {formatStatus(stats.status)}
          </span>
        </div>
      </div>

      <div className="workspace-tabs">
        {CONTENT_TYPES.map(
          (type) => (
            <button
              key={type.key}
              type="button"
              className={
                activeType ===
                type.key
                  ? "workspace-tab active"
                  : "workspace-tab"
              }
              onClick={() =>
                setActiveType(
                  type.key
                )
              }
            >
              <span>
                {type.icon}
              </span>

              {type.label}
            </button>
          )
        )}
      </div>

      <div className="workspace-card">

        <div className="workspace-row">
          <div>
            <label>
              Status
            </label>

            <select
              value={
                stats.status
              }
              onChange={(event) =>
                updateContent({
                  status:
                    event.target.value
                })
              }
            >
              {STATUS_OPTIONS.map(
                (status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {formatStatus(
                      status
                    )}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label>
              Title
            </label>

            <input
              type="text"
              value={
                stats.title
              }
              onChange={(event) =>
                updateContent({
                  title:
                    event.target.value
                })
              }
              placeholder="Content title"
            />
          </div>
        </div>

        <div className="workspace-field">
          <label>
            Description
          </label>

          <textarea
            rows="5"
            value={
              stats.description
            }
            onChange={(event) =>
              updateContent({
                description:
                  event.target.value
              })
            }
            placeholder="Write your content description..."
          />
        </div>

        <div className="workspace-field">
          <label>
            Production Notes
          </label>

          <textarea
            rows="5"
            value={
              stats.notes
            }
            onChange={(event) =>
              updateContent({
                notes:
                  event.target.value
              })
            }
            placeholder="Add production notes..."
          />
        </div>

      </div>
    </section>
  );
}

export default ProductionWorkspace;