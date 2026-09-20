export const CONTENT_STATUSES = [
  {
    id: "pending",
    label: "Pending"
  },
  {
    id: "in-progress",
    label: "In Progress"
  },
  {
    id: "completed",
    label: "Completed"
  },
  {
    id: "published",
    label: "Published"
  }
];

export function getStatusLabel(status) {
  const found = CONTENT_STATUSES.find(
    (item) => item.id === status
  );

  return found
    ? found.label
    : "Pending";
}

export function isCompleted(status) {
  return (
    status === "completed" ||
    status === "published"
  );
}

export function isPublished(status) {
  return status === "published";
}