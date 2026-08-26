const getPreviousDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  date.setUTCDate(date.getUTCDate() - 1);

  return date.toISOString().split("T")[0];
};

export const calculateStreaks = (dates, today) => {
  if (!dates || dates.length === 0) {
    return {
      currentStreak: 0,
      longestStreak: 0,
    };
  }

  // Remove duplicates and sort newest -> oldest
  const uniqueDates = [...new Set(dates)].sort((a, b) =>
    b.localeCompare(a)
  );

  const dateSet = new Set(uniqueDates);

  // Current streak

  let currentStreak = 0;

  let startDate;

  if (dateSet.has(today)) {
    startDate = today;
  } else {
    startDate = getPreviousDate(today);

    if (!dateSet.has(startDate)) {
      startDate = null;
    }
  }

  if (startDate) {
    let currentDate = startDate;

    while (dateSet.has(currentDate)) {
      currentStreak++;

      currentDate = getPreviousDate(currentDate);
    }
  }

  // Longest streak

  let longestStreak = 0;
  let streak = 0;
  let previousDate = null;

  // oldest -> newest
  const ascendingDates = [...uniqueDates].reverse();

  for (const date of ascendingDates) {
    if (!previousDate) {
      streak = 1;
    } else {
      const expectedDate = getNextDate(previousDate);

      if (date === expectedDate) {
        streak++;
      } else {
        streak = 1;
      }
    }

    longestStreak = Math.max(longestStreak, streak);

    previousDate = date;
  }

  return {
    currentStreak,
    longestStreak,
  };
};

const getNextDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(Date.UTC(year, month - 1, day));

  date.setUTCDate(date.getUTCDate() + 1);

  return date.toISOString().split("T")[0];
};