import React, { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  Flame,
  Trophy,
  Calendar,
  Check,
  Trash2,
  Edit3,
  Loader2,
  Clock,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useHabit } from "../hook/useHabit";
import StatsCard from "../components/StatsCard";
import EditHabitModal from "../components/EditHabitModal";
import ConfirmModal from "../components/ConfirmModal";
import LoadingSpinner from "../components/LoadingSpinner";

const HabitDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    loading,
    setLoading,
    handleGetHabit,
    handleGetCheckInHistory,
    handleCreateCheckIn,
    handleUpdateHabit,
    handleDeleteHabit,
    handleDeleteCheckIn,
  } = useHabit();

  const [habit, setHabit] = useState(null);
  const [checkIns, setCheckIns] = useState([]);
  const [checkingIn, setCheckingIn] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingCheckInId, setDeletingCheckInId] = useState(null);

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [habitData, checkInData] = await Promise.all([
        handleGetHabit(id),
        handleGetCheckInHistory(id),
      ]);
      setHabit(habitData);
      setCheckIns(checkInData);
    } catch (err) {
      console.error("Failed to load habit:", err);
    } finally {
      setLoading(false);
    }
  }, [id, handleGetHabit, handleGetCheckInHistory, setLoading]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCheckIn = async () => {
    try {
      setCheckingIn(true);
      const today = new Date().toISOString().split("T")[0];
      await handleCreateCheckIn(id, today);
      await loadData();
    } catch (err) {
      console.error("Failed to check in:", err);
    } finally {
      setCheckingIn(false);
    }
  };

  const handleEdit = async (habitData) => {
    try {
      setEditing(true);
      await handleUpdateHabit(id, habitData);
      setShowEditModal(false);
      await loadData();
    } catch (err) {
      console.error("Failed to update habit:", err);
    } finally {
      setEditing(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await handleDeleteHabit(id);
      navigate("/");
    } catch (err) {
      console.error("Failed to delete habit:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleRemoveCheckIn = async (checkInId) => {
    try {
      setDeletingCheckInId(checkInId);
      await handleDeleteCheckIn(id, checkInId);
      await loadData();
    } catch (err) {
      console.error("Failed to remove check-in:", err);
    } finally {
      setDeletingCheckInId(null);
    }
  };

  // Generate last 30 days for the heatmap
  const getLast30Days = () => {
    const days = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split("T")[0]);
    }
    return days;
  };

  const isCheckedIn = (date) => {
    return checkIns.some((ci) => {
      if (!ci?.date) return false;

      const parsedDate = new Date(ci.date);

      if (Number.isNaN(parsedDate.getTime())) {
        console.warn("Invalid check-in date:", ci);
        return false;
      }

      const checkInDate = parsedDate.toISOString().split("T")[0];

      return checkInDate === date;
    });
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return <LoadingSpinner fullPage={false} text="Loading habit details..." />;
  }

  if (!habit) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fadeIn">
        <p className="text-[#6B6B5E] text-sm mb-4">Habit not found</p>
        <button
          onClick={() => navigate("/")}
          className="text-sm font-medium text-[#2F4A3D] hover:text-[#1F3529] transition-colors"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const last30Days = getLast30Days();

  return (
    <div className="animate-fadeIn">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-sm text-[#6B6B5E] hover:text-[#2A2A22] font-medium mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </button>

      {/* Habit Header */}
      <div className="bg-white border border-[#E5E3D8] rounded-2xl p-6 sm:p-8 shadow-sm mb-6 animate-slideUp">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-3 mb-2">
              {habit.color && (
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: habit.color }}
                />
              )}
              <h1 className="text-xl sm:text-2xl font-semibold text-[#1F3529] truncate">
                {habit.name}
              </h1>
            </div>
            {habit.description && (
              <p className="text-sm text-[#6B6B5E] mb-3">{habit.description}</p>
            )}
            <div className="flex items-center gap-4 text-xs text-[#8B8B7A]">
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {habit.frequency === "daily" ? "Daily" : "Weekly"}
              </span>
              <span>
                Created{" "}
                {new Date(habit.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setShowEditModal(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#6B6B5E] hover:bg-[#F0EFEA] transition-colors"
              aria-label="Edit habit"
            >
              <Edit3 size={16} />
            </button>
            <button
              type="button"
              onClick={() => setShowDeleteModal(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#C0392B]/60 hover:bg-[#FBEAE8] hover:text-[#C0392B] transition-colors"
              aria-label="Delete habit"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Check-in button */}
        <div className="mt-6">
          {habit.completedToday ? (
            <div className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#EAF2EC] text-[#2F4A3D] text-sm font-semibold">
              <Check size={18} />
              Completed today
            </div>
          ) : (
            <button
              type="button"
              onClick={handleCheckIn}
              disabled={checkingIn}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2F4A3D] text-white text-sm font-semibold hover:bg-[#1F3529] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {checkingIn ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Checking in...
                </>
              ) : (
                "Check in today"
              )}
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatsCard
          icon={Flame}
          label="Current Streak"
          value={habit.currentStreak || 0}
          suffix={(habit.currentStreak || 0) === 1 ? "day" : "days"}
          delay={100}
        />
        <StatsCard
          icon={Trophy}
          label="Longest Streak"
          value={habit.longestStreak || 0}
          suffix={(habit.longestStreak || 0) === 1 ? "day" : "days"}
          delay={200}
        />
      </div>

      {/* 30-Day Heatmap */}
      <div
        className="bg-white border border-[#E5E3D8] rounded-2xl p-6 shadow-sm mb-6 animate-slideUp"
        style={{ animationDelay: "300ms" }}
      >
        <div className="flex items-center gap-2 mb-5">
          <Calendar size={18} className="text-[#3B5D45]" />
          <h2 className="text-base font-semibold text-[#1F3529]">
            Last 30 Days
          </h2>
        </div>

        <div className="grid grid-cols-10 sm:grid-cols-15 gap-1.5 sm:gap-2">
          {last30Days.map((day) => {
            const checked = isCheckedIn(day);
            const isToday = day === new Date().toISOString().split("T")[0];
            return (
              <div
                key={day}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs transition-all
                  ${
                    checked
                      ? "bg-[#2F4A3D] text-white shadow-sm"
                      : "bg-[#F7F6EF] text-[#A6A695]"
                  }
                  ${isToday ? "ring-2 ring-[#3B5D45]/30 ring-offset-1" : ""}
                `}
                title={`${formatDate(day)} ${checked ? "✓" : ""}`}
              >
                {new Date(day).getDate()}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 mt-4 text-xs text-[#8B8B7A]">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#2F4A3D]" />
            Completed
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-[#F7F6EF]" />
            Missed
          </div>
        </div>
      </div>

      {/* Check-in History */}
      <div
        className="bg-white border border-[#E5E3D8] rounded-2xl p-6 shadow-sm animate-slideUp"
        style={{ animationDelay: "400ms" }}
      >
        <h2 className="text-base font-semibold text-[#1F3529] mb-4">
          Check-in History
        </h2>

        {checkIns.length > 0 ? (
          <div className="space-y-2">
            {checkIns.slice(0, 20).map((ci) => (
              <div
                key={ci.id}
                className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-[#F7F6EF] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EAF2EC] flex items-center justify-center">
                    <Check size={14} className="text-[#2F4A3D]" />
                  </div>

                  <span className="text-sm text-[#2A2A22]">
                    {formatDate(ci.localDate)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveCheckIn(ci.id)}
                  disabled={deletingCheckInId === ci.id}
                  className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-[#C0392B]/50 hover:text-[#C0392B] hover:bg-[#FBEAE8] transition-all disabled:opacity-50"
                  aria-label="Remove check-in"
                >
                  {deletingCheckInId === ci.id ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[#6B6B5E] text-center py-8">
            No check-ins yet. Start by checking in today!
          </p>
        )}
      </div>

      {/* Modals */}
      <EditHabitModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSubmit={handleEdit}
        loading={editing}
        habit={habit}
      />

      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        loading={deleting}
        title="Delete habit?"
        description={`Are you sure you want to delete "${habit.name}"? This will also delete all check-in history. This action cannot be undone.`}
        confirmText="Delete habit"
      />
    </div>
  );
};

export default HabitDetail;
