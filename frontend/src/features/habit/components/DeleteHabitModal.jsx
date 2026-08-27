import React from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";

const DeleteHabitModal = ({
  isOpen,
  habit,
  onClose,
  onConfirm,
  loading = false,
}) => {
  if (!isOpen || !habit) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-[#1F3529]/20
        px-4
        backdrop-blur-[2px]
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onClose();
        }
      }}
    >
      <div
        className="
          w-full max-w-sm
          rounded-2xl
          border border-[#E5E3D8]
          bg-[#F8F7F1]
          p-6
          shadow-[0_15px_50px_rgba(31,53,41,0.14)]
        "
      >
        <div className="flex items-start justify-between">
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl
              bg-[#FBEAE8]
              text-[#C0392B]
            "
          >
            <AlertTriangle size={19} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg
              text-[#6B6B5E]
              hover:bg-[#EDECE5]
            "
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5">
          <h2 className="text-lg font-semibold text-[#1F3529]">
            Delete "{habit.name}"?
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#6B6B5E]">
            This will permanently delete the habit and its check-in history.
            This action cannot be undone.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              rounded-xl
              border border-[#E5E3D8]
              bg-white
              px-5 py-3
              text-sm font-semibold
              text-[#1F3529]
              hover:bg-[#F7F6EF]
              disabled:opacity-50
            "
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="
              flex items-center justify-center gap-2
              rounded-xl
              bg-[#C0392B]
              px-5 py-3
              text-sm font-semibold text-white
              transition
              hover:bg-[#A93226]
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            {loading ? "Deleting..." : "Delete habit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteHabitModal;