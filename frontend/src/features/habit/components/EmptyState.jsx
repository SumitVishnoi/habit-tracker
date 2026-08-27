import React from "react";
import { Sprout, Plus } from "lucide-react";

const EmptyState = ({
  icon: Icon = Sprout,
  title = "No habits yet",
  description = "Start building better habits today. Create your first habit and begin your journey.",
  buttonText = "Create your first habit",
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4 animate-fadeIn">
      {/* Decorative illustration */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#DDE6D0] via-[#CBD9BA] to-[#B9CBA6] flex items-center justify-center shadow-sm animate-float">
          {React.createElement(Icon, {
            size: 40,
            className: "text-[#2F4A3D]",
          })}
        </div>
        {/* Decorative dots */}
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#9CAF88]/30" />
        <div className="absolute -bottom-1 -left-3 w-3 h-3 rounded-full bg-[#3B5D45]/20" />
        <div className="absolute top-1/2 -right-6 w-2 h-2 rounded-full bg-[#B9CBA6]/40" />
      </div>

      <h3 className="text-xl sm:text-2xl font-semibold text-[#1F3529] mb-2 text-center">
        {title}
      </h3>

      <p className="text-sm sm:text-base text-[#6B6B5E] text-center max-w-sm mb-8 leading-relaxed">
        {description}
      </p>

      {onAction && (
        <button
          type="button"
          onClick={onAction}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#2F4A3D] text-white font-medium text-sm
            hover:bg-[#3B5D45] active:bg-[#1F3529] active:scale-[0.98]
            shadow-sm hover:shadow-md transition-all duration-200"
        >
          <Plus size={18} />
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
