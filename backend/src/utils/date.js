export const getLocalDate = (date, timezone) => {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
};

export const getTodayLocalDate = (timezone) => {
  return getLocalDate(new Date(), timezone);
};

export const compareLocalDates = (dateA, dateB) => {
  if (dateA < dateB) return -1;
  if (dateA > dateB) return 1;
  return 0;
};

export const isValidLocalDate = (value) => {
  if (typeof value !== "string") {
    return false;
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }

  const [year, month, day] = value.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
};