const VALID_STATUSES = [
  "pending",
  "in-progress",
  "completed",
  "published"
];

export function isValidStatus(status) {
  return VALID_STATUSES.includes(
    status
  );
}

export function getNextStatus(status) {
  const index =
    VALID_STATUSES.indexOf(
      status
    );

  if (index === -1) {
    return "pending";
  }

  if (
    index ===
    VALID_STATUSES.length - 1
  ) {
    return "published";
  }

  return VALID_STATUSES[index + 1];
}

export function getPreviousStatus(
  status
) {
  const index =
    VALID_STATUSES.indexOf(
      status
    );

  if (index <= 0) {
    return "pending";
  }

  return VALID_STATUSES[index - 1];
}

export function applyStatusChange(
  content,
  newStatus
) {
  if (
    !isValidStatus(
      newStatus
    )
  ) {
    return content;
  }

  const now =
    new Date().toISOString();

  const previousStatus =
    content?.status ||
    "pending";

  const history =
    Array.isArray(
      content?.history
    )
      ? content.history
      : [];

  const historyEntry = {
    type: "status-change",
    from: previousStatus,
    to: newStatus,
    timestamp: now
  };

  return {
    ...content,

    status: newStatus,

    updatedAt: now,

    ...(newStatus ===
      "completed" &&
    !content.completedAt
      ? {
          completedAt: now
        }
      : {}),

    ...(newStatus ===
      "published"
      ? {
          publishedAt:
            content.publishedAt ||
            now
        }
      : {}),

    history: [
      ...history,
      historyEntry
    ]
  };
}

export function formatStatus(
  status
) {
  if (
    status ===
    "in-progress"
  ) {
    return "In Progress";
  }

  if (
    status ===
    "completed"
  ) {
    return "Completed";
  }

  if (
    status ===
    "published"
  ) {
    return "Published";
  }

  return "Pending";
}