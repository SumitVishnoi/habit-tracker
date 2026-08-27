import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";

const COLORS = ["#2F4A3D", "#6B7A4F", "#9CAF88", "#B4846C", "#7C8B9C"];

const EditHabitModal = ({ isOpen, onClose, onSubmit, loading, habit }) => {
  const [name, setName] = useState(habit?.name || "");
  const [description, setDescription] = useState(habit?.description || "");
  const [frequency, setFrequency] = useState(habit?.frequency || "daily");
  const [color, setColor] = useState(habit?.color || COLORS[0]);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please enter a habit name");
      return;
    }
    setError("");
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      frequency,
      color,
    });
  };

  const handleClose = () => {
    if (loading) return;
    setError("");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-white rounded-3xl shadow-xl p-6 sm:p-8 animate-scaleIn"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-[#1F3529]">Edit habit</h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#8B8B7A] hover:bg-[#F1EEE4] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {/* Name */}
          <div className="mb-5">
            <label
              htmlFor="edit-habit-name"
              className="block text-sm font-medium text-[#2A2A22] mb-1.5"
            >
              Habit name
            </label>
            <input
              id="edit-habit-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              placeholder="e.g. Read for 20 minutes"
              className={`w-full h-12 px-4 rounded-2xl bg-[#FDFBF5] border outline-none transition-all
                text-[#2A2A22] placeholder:text-[#A6A695]
                ${
                  error
                    ? "border-[#C0392B] focus:ring-2 focus:ring-[#C0392B]/20"
                    : "border-[#E5E0D3] focus:border-[#3B5D45] focus:ring-2 focus:ring-[#9CAF88]/30"
                }`}
            />
            {error && (
              <p className="mt-1.5 text-sm text-[#C0392B]">{error}</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-5">
            <label
              htmlFor="edit-habit-description"
              className="block text-sm font-medium text-[#2A2A22] mb-1.5"
            >
              Description
              <span className="text-[#A6A695] font-normal ml-1">(optional)</span>
            </label>
            <textarea
              id="edit-habit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of this habit"
              rows={3}
              className="w-full px-4 py-3 rounded-2xl bg-[#FDFBF5] border border-[#E5E0D3] outline-none text-[#2A2A22] placeholder:text-[#A6A695] focus:border-[#3B5D45] focus:ring-2 focus:ring-[#9CAF88]/30 transition-all resize-none"
            />
          </div>

          {/* Frequency */}
          <div className="mb-5">
            <label
              htmlFor="edit-habit-frequency"
              className="block text-sm font-medium text-[#2A2A22] mb-1.5"
            >
              Frequency
            </label>
            <select
              id="edit-habit-frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full h-12 px-4 rounded-2xl bg-[#FDFBF5] border border-[#E5E0D3] outline-none text-[#2A2A22] focus:border-[#3B5D45] focus:ring-2 focus:ring-[#9CAF88]/30 transition-all"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
            </select>
          </div>

          {/* Color */}
          <div className="mb-7">
            <span className="block text-sm font-medium text-[#2A2A22] mb-2">
              Color
            </span>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  aria-label={`Select color ${c}`}
                  className={`w-8 h-8 rounded-full transition-transform ${
                    color === c
                      ? "ring-2 ring-offset-2 ring-[#2F4A3D] scale-110"
                      : "hover:scale-105"
                  }`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 h-12 rounded-2xl border border-[#E5E0D3] text-[#2A2A22] font-medium hover:bg-[#F7F3EA] transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 h-12 rounded-2xl bg-[#2F4A3D] text-white font-medium hover:bg-[#1F3529] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHabitModal;
