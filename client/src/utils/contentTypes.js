export const CONTENT_TYPES = [
  {
    id: "drawing",
    label: "Drawing",
    shortLabel: "Drawing"
  },
  {
    id: "short",
    label: "YouTube Short",
    shortLabel: "Short"
  },
  {
    id: "long",
    label: "Long Video",
    shortLabel: "Long"
  }
];

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

export function getContentTypeLabel(type) {
  const item = CONTENT_TYPES.find(
    (contentType) =>
      contentType.id === type
  );

  return item?.label || type;
}

export function getStatusLabel(status) {
  const item = CONTENT_STATUSES.find(
    (contentStatus) =>
      contentStatus.id === status
  );

  return item?.label || "Pending";
}

export function isCompletedStatus(status) {
  return (
    status === "completed" ||
    status === "published"
  );
}