import React from "react";
import { AlertTriangle, Loader2, X } from "lucide-react";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  variant = "danger",
}) => {
  if (!isOpen) return null;

  const isWarning = variant === "warning";

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-3xl shadow-xl p-6 sm:p-8 animate-scaleIn"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isWarning ? "bg-[#FFF4D6]" : "bg-[#FBEAE8]"}`}>
            <AlertTriangle size={20} className={isWarning ? "text-[#B7791F]" : "text-[#C0392B]"} />
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-full text-[#8B8B7A] hover:bg-[#F1EEE4] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <h2 className="text-lg font-semibold text-[#1F3529] mb-2">
          {title}
        </h2>
        <p className="text-sm text-[#6B6B5E] mb-6 leading-relaxed">
          {description}
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="flex-1 h-11 rounded-2xl border border-[#E5E0D3] text-[#2A2A22] font-medium text-sm hover:bg-[#F7F3EA] transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 h-11 rounded-2xl text-white font-medium text-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 ${isWarning ? "bg-[#B7791F] hover:bg-[#996515]" : "bg-[#C0392B] hover:bg-[#A93226]"}`}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Deleting...
              </>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
