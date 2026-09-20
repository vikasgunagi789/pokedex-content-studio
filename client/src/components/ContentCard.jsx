import {
  CheckCircle2,
  Circle,
  Clock3,
  Upload
} from "lucide-react";

function ContentCard({
  type,
  status,
  title,
  onClick
}) {
  const statusInfo =
    getStatusInfo(status);

  return (
    <button
      type="button"
      className="content-card"
      onClick={onClick}
    >
      <div className="content-card-icon">
        {statusInfo.icon}
      </div>

      <div className="content-card-body">
        <div className="content-card-heading">
          <span>
            {getTypeLabel(type)}
          </span>

          <span
            className={`status-pill ${status}`}
          >
            {statusInfo.label}
          </span>
        </div>

        <strong>
          {title ||
            `Create ${getTypeLabel(
              type
            )} Content`}
        </strong>

        <small>
          Click to open editor
        </small>
      </div>
    </button>
  );
}

function getTypeLabel(type) {
  if (type === "drawing") {
    return "Drawing";
  }

  if (type === "short") {
    return "Short";
  }

  if (type === "long") {
    return "Long Video";
  }

  return type;
}

function getStatusInfo(status) {
  if (
    status === "published"
  ) {
    return {
      label: "Published",
      icon: (
        <Upload
          size={18}
        />
      )
    };
  }

  if (
    status === "completed"
  ) {
    return {
      label: "Completed",
      icon: (
        <CheckCircle2
          size={18}
        />
      )
    };
  }

  if (
    status ===
    "in-progress"
  ) {
    return {
      label: "In Progress",
      icon: (
        <Clock3
          size={18}
        />
      )
    };
  }

  return {
    label: "Pending",
    icon: (
      <Circle size={18} />
    )
  };
}

export default ContentCard;