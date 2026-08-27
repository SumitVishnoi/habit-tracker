import React from "react";

const StatsCard = ({ icon: Icon, label, value, suffix, delay = 0 }) => {
  return (
    <div
      className="bg-white border border-[#E5E3D8] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-slideUp"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-2.5 text-[#6B6B5E] mb-3">
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-[#F0EFEA] flex items-center justify-center">
            <Icon size={18} className="text-[#3B5D45]" />
          </div>
        )}
        <span className="text-xs font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="text-2xl sm:text-3xl font-bold text-[#1F3529] tracking-tight">
        {value}
        {suffix && (
          <span className="text-sm font-normal text-[#6B6B5E] ml-1">
            {suffix}
          </span>
        )}
      </p>
    </div>
  );
};

export default StatsCard;
