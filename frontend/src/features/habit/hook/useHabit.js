import { useCallback, useState } from "react";
import {
  getHabits,
  getHabitById,
  createHabit,
  updateHabit,
  deleteHabit,
} from "../services/habit.api";

import {
  createCheckIn,
  getCheckInHistory,
  deleteCheckIn,
} from "../services/checkin.api";


export const useHabit = () => {
  const [ loading, setLoading ] = useState(false);

  const [habits, setHabits] = useState([]);
  const [error, setError] = useState("");

  const clearError = useCallback(() => {
    setError("");
  }, []);

  // Get all habits
  const handleGetHabits = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getHabits();

      setHabits(data.habits || []);

      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to load habits.";

      setError(message);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading]);

  // Get single habit
  const handleGetHabit = useCallback(async (habitId) => {
    try {
      setLoading(true)
      setError("");

      const data = await getHabitById(habitId);

      return data.habit;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to load habit.";

      setError(message);
      throw error;
    } finally {
      setLoading(false)
    }
  }, []);

  // Create habit
  const handleCreateHabit = useCallback(async (habitData) => {
    try {
      setLoading(true)
      setError("");

      const data = await createHabit(habitData);

      // Add newly created habit directly to state
      if (data.habit) {
        setHabits((prev) => [...prev, data.habit]);
      }

      return data.habit;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to create habit.";

      setError(message);
      throw error;
    } finally {
      setLoading(false)
    }
  }, []);

  // Update habit
  const handleUpdateHabit = useCallback(async (habitId, habitData) => {
    try {
      setLoading(true)
      setError("");

      const data = await updateHabit(habitId, habitData);

      // Update habit directly in state
      if (data.habit) {
        setHabits((prev) =>
          prev.map((habit) =>
            habit.id === habitId ? data.habit : habit
          )
        );
      }

      return data.habit;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to update habit.";

      setError(message);
      throw error;
    } finally {
      setLoading(false)
    }
  }, []);

  // Delete habit
  const handleDeleteHabit = useCallback(async (habitId) => {
    try {
      setLoading(true)
      setError("");

      await deleteHabit(habitId);

      setHabits((prev) =>
        prev.filter((habit) => habit.id !== habitId)
      );
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to delete habit.";

      setError(message);
      throw error;
    } finally {
      setLoading(false)
    }
  }, []);

  // Check in
  const handleCreateCheckIn = useCallback(async (habitId, date) => {
    try {
      setLoading(true)
      setError("");

      const data = await createCheckIn(habitId, date);

      /*
       * Don't call handleGetHabits() here.
       *
       * Update the affected habit from the response if
       * your backend returns the updated habit.
       */
      if (data.habit) {
        setHabits((prev) =>
          prev.map((habit) =>
            habit.id === habitId ? data.habit : habit
          )
        );
      }

      return data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Unable to check in.";

      setError(message);
      throw error;
    } finally {
      setLoading(false)
    }
  }, []);

  // Get check-in history
  const handleGetCheckInHistory = useCallback(async (habitId) => {
    try {
      setLoading(true)
      setError("");

      const data = await getCheckInHistory(habitId);

      return data.checkIns || [];
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Unable to load check-in history.";

      setError(message);
      throw error;
    } finally {
      setLoading(false)
    }
  }, []);

  // Delete check-in
  const handleDeleteCheckIn = useCallback(
    async (habitId, checkInId) => {
      try {
        setLoading(true)
        setError("");

        const data = await deleteCheckIn(habitId, checkInId);

        /*
         * If backend returns updated habit,
         * update it directly.
         */
        if (data.habit) {
          setHabits((prev) =>
            prev.map((habit) =>
              habit.id === habitId ? data.habit : habit
            )
          );
        }

        return data;
      } catch (error) {
        const message =
          error?.response?.data?.message ||
          "Unable to delete check-in.";

        setError(message);
        throw error;
      } finally {
        setLoading(false)
      }
    },
    []
  );

  return {
    habits,
    loading,
    setLoading,
    error,
    clearError,

    handleGetHabits,
    handleGetHabit,
    handleCreateHabit,
    handleUpdateHabit,
    handleDeleteHabit,

    handleCreateCheckIn,
    handleGetCheckInHistory,
    handleDeleteCheckIn,
  };
};