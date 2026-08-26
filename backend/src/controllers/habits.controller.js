import { getTodayLocalDate } from "../utils/date.js";
import prisma from "../utils/prisma.js";
import { calculateStreaks } from "../utils/streak.js";

export const createHabit = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: "Habit name is required",
      });
    }

    const trimmedName = name.trim();

    if (trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Habit name cannot exceed 100 characters",
      });
    }

    const habit = await prisma.habit.create({
      data: {
        name: trimmedName,
        description: description?.trim() || null,
        ownerId: req.user,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Habit created successfully",
      habit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getHabits = async (req, res) => {
  try {
    const habits = await prisma.habit.findMany({
      where: {
        ownerId: req.user,
      },
      include: {
        owner: {
          select: {
            timezone: true,
          },
        },
        checkIns: {
          select: {
            localDate: true,
          },
          orderBy: {
            localDate: "desc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const habitsWithStats = habits.map((habit) => {
      const timezone = habit.owner.timezone;

      const today = getTodayLocalDate(timezone);

      const dates = habit.checkIns.map(
        (checkIn) => checkIn.localDate
      );

      const {
        currentStreak,
        longestStreak,
      } = calculateStreaks(dates, today);

      const completedToday = dates.includes(today);

      return {
        id: habit.id,
        name: habit.name,
        description: habit.description,
        ownerId: habit.ownerId,
        createdAt: habit.createdAt,
        currentStreak,
        longestStreak,
        completedToday,
      };
    });

    return res.status(200).json({
      success: true,
      habits: habitsWithStats,
    });
  } catch (error) {
    console.error("Get habits error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateHabit = async (req, res) => {
  try {
    const { habitId } = req.params;
    const { name, description } = req.body;

    const id = Number(habitId);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid habit ID",
      });
    }

    const habit = await prisma.habit.findFirst({
      where: {
        id,
        ownerId: req.user,
      },
    });

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    // Build update data
    const data = {};

    if (name !== undefined) {
      if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
          success: false,
          message: "Habit name cannot be empty",
        });
      }

      const trimmedName = name.trim();

      if (trimmedName.length > 100) {
        return res.status(400).json({
          success: false,
          message: "Habit name cannot exceed 100 characters",
        });
      }

      data.name = trimmedName;
    }

    if (description !== undefined) {
      if (description !== null && typeof description !== "string") {
        return res.status(400).json({
          success: false,
          message: "Description must be a string",
        });
      }

      data.description = description?.trim() || null;
    }

    // Make sure something was provided
    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Nothing to update",
      });
    }

    const updatedHabit = await prisma.habit.update({
      where: {
        id,
      },
      data,
    });

    return res.status(200).json({
      success: true,
      message: "Habit updated successfully",
      habit: updatedHabit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const { habitId } = req.params;

    const id = Number(habitId);

    // Validate habit ID
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid habit ID",
      });
    }

    const habit = await prisma.habit.findFirst({
      where: {
        id,
        ownerId: req.user,
      },
    });

    if (!habit) {
      return res.status(404).json({
        success: false,
        message: "Habit not found",
      });
    }

    await prisma.habit.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Habit deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getHabitById = async (req, res) => {
  try {
    const { habitId } = req.params;

    const id = Number(habitId);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid habit ID",
      });
    }

    const habit = await prisma.habit.findFirst({
      where: {
        id,
        ownerId: req.user,
      },
      include: {
        owner: {
          select: {
            timezone: true,
          },
        },
        checkIns: {
          select: {
            id: true,
            localDate: true,
            checkedInAt: true,
          },
          orderBy: {
            localDate: "desc",
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

    const today = getTodayLocalDate(habit.owner.timezone);

    const dates = habit.checkIns.map(
      (checkIn) => checkIn.localDate
    );

    const {
      currentStreak,
      longestStreak,
    } = calculateStreaks(dates, today);

    return res.status(200).json({
      success: true,
      habit: {
        id: habit.id,
        name: habit.name,
        description: habit.description,
        createdAt: habit.createdAt,
        currentStreak,
        longestStreak,
        completedToday: dates.includes(today),
        checkIns: habit.checkIns,
      },
    });
  } catch (error) {
    console.error("Get habit error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};