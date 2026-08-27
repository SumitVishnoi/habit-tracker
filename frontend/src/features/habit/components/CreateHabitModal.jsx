import React, { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";

const initialForm = {
  name: "",
  description: "",
};

const CreateHabitModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  habit = null,
}) => {
  const [form, setForm] = useState(initialForm);
  const [validationError, setValidationError] = useState("");

  const isEditMode = Boolean(habit);

  useEffect(() => {
    if (!isOpen) return;

    setForm({
      name: habit?.name || "",
      description: habit?.description || "",
    });

    setValidationError("");
  }, [isOpen, habit]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name") {
      setValidationError("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) {
      setValidationError("Habit name is required.");
      return;
    }

    await onSubmit({
      name,
      description: form.description.trim(),
    });
  };

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
          w-full max-w-md
          rounded-2xl
          border border-[#E5E3D8]
          bg-[#F8F7F1]
          p-6
          shadow-[0_15px_50px_rgba(31,53,41,0.14)]
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-[#1F3529]">
              {isEditMode ? "Edit habit" : "Create a habit"}
            </h2>

            <p className="mt-1 text-sm text-[#6B6B5E]">
              {isEditMode
                ? "Update the details of your habit."
                : "Add a habit you want to build consistently."}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              flex h-8 w-8 shrink-0
              items-center justify-center
              rounded-lg
              text-[#6B6B5E]
              hover:bg-[#EDECE5]
              hover:text-[#1F3529]
              disabled:opacity-50
            "
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="habit-name"
              className="mb-2 block text-sm font-medium text-[#1F3529]"
            >
              Habit name
            </label>

            <input
              id="habit-name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Drink Water"
              maxLength={100}
              autoFocus
              className="
                w-full rounded-xl
                border border-[#E5E3D8]
                bg-white
                px-4 py-3
                text-sm text-[#1F3529]
                outline-none
                placeholder:text-[#A3A297]
                transition
                focus:border-[#2F4A3D]
                focus:ring-2
                focus:ring-[#2F4A3D]/10
              "
            />

            {validationError && (
              <p className="mt-2 text-sm text-[#C0392B]">
                {validationError}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="habit-description"
              className="mb-2 block text-sm font-medium text-[#1F3529]"
            >
              Description
              <span className="ml-1 font-normal text-[#8A897D]">
                (optional)
              </span>
            </label>

            <textarea
              id="habit-description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Drink at least 3 liters every day"
              rows={3}
              maxLength={300}
              className="
                w-full resize-none rounded-xl
                border border-[#E5E3D8]
                bg-white
                px-4 py-3
                text-sm text-[#1F3529]
                outline-none
                placeholder:text-[#A3A297]
                transition
                focus:border-[#2F4A3D]
                focus:ring-2
                focus:ring-[#2F4A3D]/10
              "
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-end">
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
                transition
                hover:bg-[#F7F6EF]
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="
                flex items-center justify-center gap-2
                rounded-xl
                bg-[#2F4A3D]
                px-5 py-3
                text-sm font-semibold text-white
                transition
                hover:bg-[#1F3529]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading && <Loader2 size={16} className="animate-spin" />}

              {loading
                ? isEditMode
                  ? "Saving..."
                  : "Creating..."
                : isEditMode
                ? "Save changes"
                : "Create habit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateHabitModal;