import React from "react";
import { Leaf, Loader2 } from "lucide-react";

const LoadingSpinner = ({ fullPage = true, text = "Loading..." }) => {
  if (fullPage) {
    return (
      <div className="min-h-screen w-full bg-[#F7F3EA] flex flex-col items-center justify-center gap-6 animate-fadeIn">
        {/* Animated logo */}
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-[#2F4A3D] flex items-center justify-center shadow-lg animate-pulse-soft">
            <Leaf size={28} className="text-[#DDE6D0]" />
          </div>
          {/* Rotating ring */}
          <div className="absolute inset-[-4px] rounded-full border-2 border-transparent border-t-[#3B5D45] animate-spin-slow" />
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className="text-lg font-semibold text-[#1F3529] tracking-tight">
            Habitly
          </span>
          <span className="text-sm text-[#6B6B5E]">{text}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-3 py-8 animate-fadeIn">
      <Loader2 size={20} className="text-[#3B5D45] animate-spin" />
      <span className="text-sm text-[#6B6B5E]">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
