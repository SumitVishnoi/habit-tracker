import { compareLocalDates, getLocalDate, getTodayLocalDate, isValidLocalDate } from "../utils/date.js";
import prisma from "../utils/prisma.js";

export const createCheckIn = async (req, res) => {
  try {
    const { habitId } = req.params;
    const { date } = req.body;

    const id = Number(habitId);

    // 1. Validate habit ID
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid habit ID",
      });
    }

    // 2. Find habit belonging to current user
    const habit = await prisma.habit.findFirst({
      where: {
        id,
        ownerId: req.userId,
      },
      include: {
        owner: {
          select: {
            timezone: true,
          },
        },
      },
    });

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    const timezone = habit.owner.timezone;

    // 3. Determine local date
    let localDate;

    if (date === undefined) {
      // Check in for today
      localDate = getTodayLocalDate(timezone);
    } else {
      // Backfill
      if (!isValidLocalDate(date)) {
        return res.status(400).json({
          success: false,
          message: "Invalid date. Use YYYY-MM-DD",
        });
      }

      localDate = date;
    }

    // 4. Get today's local date
    const today = getTodayLocalDate(timezone);

    // 5. Reject future local dates
    if (compareLocalDates(localDate, today) > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot check in for a future date",
      });
    }

    // 6. Determine habit creation local date
    const habitCreatedLocalDate = getLocalDate(
      habit.createdAt,
      timezone
    );

    // 7. Reject date before habit creation
    if (
      compareLocalDates(localDate, habitCreatedLocalDate) < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Cannot check in before the habit was created",
      });
    }

    // 8. Create check-in
    const checkIn = await prisma.checkIn.create({
      data: {
        habitId: habit.id,
        checkedInAt: new Date(),
        localDate,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Check-in created successfully",
      checkIn,
    });
  } catch (error) {
    // 9. Handle duplicate local day
    if (error.code === "P2002") {
      return res.status(409).json({
        success: false,
        message: "Habit already checked in for this day",
      });
    }

    console.error("Create check-in error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCheckInHistory = async (req, res) => {
  try {
    const { habitId } = req.params;

    const id = Number(habitId);

    // 1. Validate habit ID
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid habit ID",
      });
    }

    // 2. Check habit ownership
    const habit = await prisma.habit.findFirst({
      where: {
        id,
        ownerId: req.userId,
      },
    });

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    // 3. Get check-ins
    const checkIns = await prisma.checkIn.findMany({
      where: {
        habitId: id,
      },
      orderBy: {
        localDate: "desc",
      },
      select: {
        id: true,
        habitId: true,
        localDate: true,
        checkedInAt: true,
      },
    });

    return res.status(200).json({
      success: true,
      checkIns,
    });
  } catch (error) {
    console.error("Get check-in history error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};