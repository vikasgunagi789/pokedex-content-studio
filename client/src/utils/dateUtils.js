export function formatDate(dateString) {
  if (!dateString) {
    return "Not scheduled";
  }

  const date = new Date(
    `${dateString}T00:00:00`
  );

  if (Number.isNaN(date.getTime())) {
    return "Invalid date";
  }

  return date.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );
}

export function getDaysDifference(
  dateString
) {
  if (!dateString) {
    return null;
  }

  const target = new Date(
    `${dateString}T00:00:00`
  );

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const difference =
    target.getTime() -
    today.getTime();

  return Math.round(
    difference /
      (1000 * 60 * 60 * 24)
  );
}

export function getScheduleLabel(
  dateString
) {
  const difference =
    getDaysDifference(dateString);

  if (difference === null) {
    return "Not scheduled";
  }

  if (difference < 0) {
    return "Past";
  }

  if (difference === 0) {
    return "Today";
  }

  if (difference === 1) {
    return "Tomorrow";
  }

  return `In ${difference} days`;
}