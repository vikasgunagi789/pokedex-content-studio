import {
  CONTENT_STATUSES,
  getStatusLabel
} from "../utils/contentTypes";

function ContentStatusEditor({
  type,
  content,
  onChange
}) {
  const currentStatus =
    content?.status ||
    "pending";

  function handleChange(
    event
  ) {
    if (!onChange) return;

    onChange(
      type,
      event.target.value
    );
  }

  return (
    <div className="content-status-editor">

      <div className="content-status-editor-header">
        <div>
          <span className="section-label">
            STATUS
          </span>

          <h4>
            {type === "short"
              ? "YouTube Short"
              : type === "long"
              ? "Long Video"
              : "Drawing"}
          </h4>
        </div>

        <span
          className={`status ${currentStatus}`}
        >
          {getStatusLabel(
            currentStatus
          )}
        </span>
      </div>

      <select
        value={currentStatus}
        onChange={handleChange}
      >
        {CONTENT_STATUSES.map(
          (status) => (
            <option
              key={status.id}
              value={status.id}
            >
              {status.label}
            </option>
          )
        )}
      </select>

    </div>
  );
}

export default ContentStatusEditor;