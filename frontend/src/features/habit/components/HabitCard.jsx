import React, { useState } from "react";
import {
  MoreVertical,
  Pencil,
  Trash2,
  History,
  Flame,
  Trophy,
  Check,
  Loader2,
} from "lucide-react";

const HabitCard = ({
  habit,
  onCheckIn,
  onViewHistory,
  onEdit,
  onDelete,
  checkingIn = false,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const currentStreak = habit?.currentStreak ?? 0;
  const longestStreak = habit?.longestStreak ?? 0;
  const completedToday = Boolean(habit?.completedToday);

  return (
    <article
      className="
        relative flex h-full flex-col
        rounded-2xl
        border border-[#E5E3D8]
        bg-white
        p-5
        shadow-[0_2px_12px_rgba(31,53,41,0.035)]
        transition-shadow duration-200
        hover:shadow-[0_5px_20px_rgba(31,53,41,0.06)]
      "
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-[#1F3529]">
            {habit.name}
          </h2>

          {habit.description && (
            <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-[#6B6B5E]">
              {habit.description}
            </p>
          )}
        </div>

        {/* Menu */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg
              text-[#6B6B5E]
              transition
              hover:bg-[#F7F6EF]
              hover:text-[#1F3529]
            "
            aria-label="Habit options"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-10 cursor-default"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              />

              <div
                className="
                  absolute right-0 top-9 z-20 w-36
                  overflow-hidden
                  rounded-xl
                  border border-[#E5E3D8]
                  bg-white
                  py-1
                  shadow-[0_8px_25px_rgba(31,53,41,0.10)]
                "
              >
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onEdit?.(habit);
                  }}
                  className="
                    flex w-full items-center gap-2.5
                    px-3.5 py-2.5
                    text-left text-sm text-[#1F3529]
                    hover:bg-[#F7F6EF]
                  "
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onDelete?.(habit);
                  }}
                  className="
                    flex w-full items-center gap-2.5
                    px-3.5 py-2.5
                    text-left text-sm text-[#C0392B]
                    hover:bg-[#FBEAE8]
                  "
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Streaks */}
      <div className="mt-5 flex items-center gap-5">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F6EF] text-[#2F4A3D]">
            <Flame size={16} />
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#8A897D]">
              Current
            </p>
            <p className="text-sm font-semibold text-[#1F3529]">
              {currentStreak} {currentStreak === 1 ? "day" : "days"}
            </p>
          </div>
        </div>

        <div className="h-8 w-px bg-[#E5E3D8]" />

        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F7F6EF] text-[#2F4A3D]">
            <Trophy size={16} />
          </div>

          <div>
            <p className="text-[11px] font-medium uppercase tracking-wide text-[#8A897D]">
              Best
            </p>
            <p className="text-sm font-semibold text-[#1F3529]">
              {longestStreak} {longestStreak === 1 ? "day" : "days"}
            </p>
          </div>
        </div>
      </div>

      {/* Today's action */}
      <div className="mt-5">
        {completedToday ? (
          <div
            className="
              flex items-center justify-center gap-2
              rounded-xl
              border border-[#DCE6DD]
              bg-[#EEF4EE]
              px-4 py-3
              text-sm font-medium
              text-[#2F4A3D]
            "
          >
            <Check size={17} />
            Completed today
          </div>
        ) : (
          <button
            type="button"
            onClick={onCheckIn}
            disabled={checkingIn}
            className="
              flex w-full items-center justify-center gap-2
              rounded-xl
              bg-[#2F4A3D]
              px-4 py-3
              text-sm font-semibold text-white
              transition
              hover:bg-[#1F3529]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {checkingIn ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Checking in...
              </>
            ) : (
              <>
                <Check size={16} />
                Check in today
              </>
            )}
          </button>
        )}
      </div>

      {/* History */}
      <button
        type="button"
        onClick={() => onViewHistory?.(habit)}
        className="
          mt-4 flex items-center justify-center gap-2
          text-sm font-medium
          text-[#6B6B5E]
          transition
          hover:text-[#1F3529]
        "
      >
        <History size={15} />
        View history
      </button>
    </article>
  );
};

export default HabitCard;