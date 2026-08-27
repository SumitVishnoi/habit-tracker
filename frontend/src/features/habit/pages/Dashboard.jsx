import React, { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Flame,
  Check,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useHabit } from "../hook/useHabit";
import HabitCard from "../components/HabitCard";
import CreateHabitModal from "../components/CreateHabitModal";
import DeleteHabitModal from "../components/DeleteHabitModal";

const SkeletonCard = () => {
  return (
    <div
      className="
        rounded-2xl
        border border-[#E5E3D8]
        bg-white
        p-5
        animate-pulse
      "
    >
      <div className="flex items-start justify-between">
        <div className="w-full">
          <div className="h-5 w-36 rounded-lg bg-[#EDECE5]" />
          <div className="mt-3 h-4 w-52 rounded-lg bg-[#F1F0E9]" />
        </div>

        <div className="h-8 w-8 rounded-lg bg-[#EDECE5]" />
      </div>

      <div className="mt-6 flex gap-5">
        <div className="h-10 w-28 rounded-lg bg-[#F1F0E9]" />
        <div className="h-10 w-28 rounded-lg bg-[#F1F0E9]" />
      </div>

      <div className="mt-6 h-11 w-full rounded-xl bg-[#EDECE5]" />

      <div className="mx-auto mt-4 h-4 w-24 rounded bg-[#F1F0E9]" />
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();

  const {
    habits = [],
    loading,
    error,
    handleGetHabits,
    handleCreateHabit,
    handleUpdateHabit,
    handleDeleteHabit,
    handleCreateCheckIn,
  } = useHabit();

  const [modalMode, setModalMode] = useState(null);
  const [selectedHabit, setSelectedHabit] = useState(null);

  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [checkingInId, setCheckingInId] = useState(null);

  const loadHabits = useCallback(async () => {
    await handleGetHabits();
  }, [handleGetHabits]);

  useEffect(() => {
    loadHabits()
  }, [loadHabits]);

  /*
   * ---------------------------------------
   * Create / Edit
   * ---------------------------------------
   */

  const openCreateModal = () => {
    setSelectedHabit(null);
    setModalMode("create");
  };

  const openEditModal = (habit) => {
    setSelectedHabit(habit);
    setModalMode("edit");
  };

  const closeHabitModal = () => {
    if (creating || updating) return;

    setModalMode(null);
    setSelectedHabit(null);
  };

  const handleHabitSubmit = async (habitData) => {
    try {
      if (modalMode === "edit" && selectedHabit) {
        setUpdating(true);

        await handleUpdateHabit(
          selectedHabit.id,
          habitData
        );

        // await loadHabits();
      } else {
        setCreating(true);

        await handleCreateHabit(habitData);

        // await loadHabits();
      }

      setModalMode(null);
      setSelectedHabit(null);
    } catch (err) {
      // useHabit owns API error state.
      // Keep modal open so user doesn't lose entered data.
      console.error("Habit mutation failed:", err);
    } finally {
      setCreating(false);
      setUpdating(false);
    }
  };

  /*
   * ---------------------------------------
   * Delete
   * ---------------------------------------
   */

  const openDeleteModal = (habit) => {
    setSelectedHabit(habit);
    setModalMode("delete");
  };

  const closeDeleteModal = () => {
    if (deleting) return;

    setModalMode(null);
    setSelectedHabit(null);
  };

  const handleDelete = async () => {
    if (!selectedHabit) return;

    try {
      setDeleting(true);

      await handleDeleteHabit(selectedHabit.id);

      // await loadHabits();

      setModalMode(null);
      setSelectedHabit(null);
    } catch (err) {
      console.error("Failed to delete habit:", err);
    } finally {
      setDeleting(false);
    }
  };

  /*
   * ---------------------------------------
   * Check In
   * ---------------------------------------
   */

  const handleHabitCheckIn = async (habitId) => {
    try {
      setCheckingInId(habitId);
      await handleCreateCheckIn(habitId);

      // await loadHabits();
    } catch (err) {
      console.error("Failed to check in:", err);
    } finally {
      setCheckingInId(null);
    }
  };

  /*
   * ---------------------------------------
   * History
   * ---------------------------------------
   */

  const handleViewHistory = (habit) => {
    navigate(`/habits/${habit.id}`);
  };

  /*
   * ---------------------------------------
   * Derived UI-only value
   * ---------------------------------------
   */

  const completedToday = habits.filter(
    (habit) => habit.completedToday
  ).length;

  /*
   * ---------------------------------------
   * Render
   * ---------------------------------------
   */

  return (
    <main className="min-h-screen bg-[#F8F7F1]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* --------------------------------
            Header
        --------------------------------- */}
        <header className="mb-8 sm:mb-10">
          <div
            className="
              flex flex-col gap-5
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>
              <h1
                className="
                  text-3xl
                  font-semibold
                  tracking-tight
                  text-[#1F3529]
                  sm:text-4xl
                "
              >
                Your habits
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#6B6B5E] sm:text-base">
                Keep building consistency, one day at a time.
              </p>
            </div>

            <button
              type="button"
              onClick={openCreateModal}
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#2F4A3D]
                px-5 py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#1F3529]
                sm:w-auto
              "
            >
              <Plus size={17} />
              New habit
            </button>
          </div>
        </header>

        {/* --------------------------------
            Error
        --------------------------------- */}
        {error && (
          <div
            role="alert"
            className="
              mb-7
              flex items-start gap-3
              rounded-2xl
              border border-[#E8B4AC]
              bg-[#FBEAE8]
              px-4 py-3.5
              text-sm
              text-[#C0392B]
            "
          >
            <AlertCircle size={18} className="mt-0.5 shrink-0" />

            <div>
              <p className="font-medium">
                Unable to load your habits.
              </p>

              <p className="mt-0.5 opacity-90">
                {typeof error === "string"
                  ? error
                  : error?.message || "Something went wrong."}
              </p>
            </div>
          </div>
        )}

        {/* --------------------------------
            Subtle today's progress
        --------------------------------- */}
        {!loading && habits.length > 0 && (
          <div
            className="
              mb-7
              flex items-center justify-between
              rounded-xl
              border border-[#E5E3D8]
              bg-[#F7F6EF]
              px-4 py-3.5
              sm:px-5
            "
          >
            <div className="flex items-center gap-2.5">
              <div
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  bg-white
                  text-[#2F4A3D]
                "
              >
                <Check size={16} />
              </div>

              <span className="text-sm font-medium text-[#1F3529]">
                Today's progress
              </span>
            </div>

            <span className="text-sm font-semibold text-[#2F4A3D]">
              {completedToday} of {habits.length}
            </span>
          </div>
        )}

        {/* --------------------------------
            Loading
        --------------------------------- */}
        {loading && habits.length === 0 && (
          <section
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </section>
        )}

        {/* --------------------------------
            Empty
        --------------------------------- */}
        {!loading && habits.length === 0 && !error && (
          <section
            className="
              flex
              min-h-[380px]
              items-center
              justify-center
              rounded-2xl
              border border-[#E5E3D8]
              bg-white
              px-6
              py-12
              text-center
            "
          >
            <div className="max-w-sm">
              <div
                className="
                  mx-auto
                  flex h-12 w-12
                  items-center justify-center
                  rounded-xl
                  bg-[#F7F6EF]
                  text-[#2F4A3D]
                "
              >
                <Flame size={21} />
              </div>

              <h2 className="mt-5 text-lg font-semibold text-[#1F3529]">
                No habits yet
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#6B6B5E]">
                Create your first habit and start building your streak.
              </p>

              <button
                type="button"
                onClick={openCreateModal}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#2F4A3D]
                  px-5 py-3
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-[#1F3529]
                "
              >
                <Plus size={17} />
                Create your first habit
              </button>
            </div>
          </section>
        )}

        {/* --------------------------------
            Habit Grid
        --------------------------------- */}
        {!loading && habits.length > 0 && (
          <section
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                onCheckIn={() =>
                  handleHabitCheckIn(habit.id)
                }
                onViewHistory={handleViewHistory}
                onEdit={openEditModal}
                onDelete={openDeleteModal}
                checkingIn={checkingInId === habit.id}
              />
            ))}
          </section>
        )}
      </div>

      {/* --------------------------------
          Create / Edit Modal
      --------------------------------- */}
      <CreateHabitModal
        isOpen={
          modalMode === "create" ||
          modalMode === "edit"
        }
        habit={
          modalMode === "edit"
            ? selectedHabit
            : null
        }
        onClose={closeHabitModal}
        onSubmit={handleHabitSubmit}
        loading={creating || updating}
      />

      {/* --------------------------------
          Delete Modal
      --------------------------------- */}
      <DeleteHabitModal
        isOpen={modalMode === "delete"}
        habit={selectedHabit}
        onClose={closeDeleteModal}
        onConfirm={handleDelete}
        loading={deleting}
      />
    </main>
  );
};

export default Dashboard;
