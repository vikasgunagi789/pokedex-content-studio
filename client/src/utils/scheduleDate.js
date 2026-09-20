export function formatScheduleDate(
  date
) {
  if (!date) return "";

  const value =
    date instanceof Date
      ? date
      : new Date(date);

  return value.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }
  );
}

export function formatDayName(
  date
) {
  if (!date) return "";

  const value =
    date instanceof Date
      ? date
      : new Date(date);

  return value.toLocaleDateString(
    "en-IN",
    {
      weekday: "long"
    }
  );
}

export function getRelativeDay(
  date,
  index
) {
  if (index === 0) {
    return "TODAY";
  }

  if (index === 1) {
    return "TOMORROW";
  }

  return `DAY ${String(
    index + 1
  ).padStart(2, "0")}`;
}