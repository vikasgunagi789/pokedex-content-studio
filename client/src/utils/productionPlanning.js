export const PRIORITIES = [
  "low",
  "normal",
  "high",
  "urgent"
];

export function formatPriority(
  priority
) {
  if (priority === "urgent") {
    return "Urgent";
  }

  if (priority === "high") {
    return "High";
  }

  if (priority === "low") {
    return "Low";
  }

  return "Normal";
}

export function isOverdue(content) {
  if (!content?.dueDate) {
    return false;
  }

  if (
    content.status ===
      "completed" ||
    content.status ===
      "published"
  ) {
    return false;
  }

  const due =
    new Date(
      content.dueDate
    );

  if (
    Number.isNaN(
      due.getTime()
    )
  ) {
    return false;
  }

  const today =
    new Date();

  today.setHours(
    23,
    59,
    59,
    999
  );

  return due < today;
}

export function getDaysUntilDue(
  content
) {
  if (!content?.dueDate) {
    return null;
  }

  const due =
    new Date(
      content.dueDate
    );

  if (
    Number.isNaN(
      due.getTime()
    )
  ) {
    return null;
  }

  const today =
    new Date();

  today.setHours(
    0,
    0,
    0,
    0
  );

  due.setHours(
    0,
    0,
    0,
    0
  );

  const difference =
    due.getTime() -
    today.getTime();

  return Math.ceil(
    difference /
      (1000 * 60 * 60 * 24)
  );
}

export function getPlanningSummary(
  pokemonList
) {
  let total = 0;
  let overdue = 0;
  let urgent = 0;
  let high = 0;

  pokemonList.forEach(
    (pokemon) => {
      [
        pokemon.drawing,
        pokemon.short,
        pokemon.long
      ].forEach(
        (content) => {
          if (!content) {
            return;
          }

          total += 1;

          if (
            isOverdue(content)
          ) {
            overdue += 1;
          }

          if (
            content.priority ===
            "urgent"
          ) {
            urgent += 1;
          }

          if (
            content.priority ===
            "high"
          ) {
            high += 1;
          }
        }
      );
    }
  );

  return {
    total,
    overdue,
    urgent,
    high
  };
}