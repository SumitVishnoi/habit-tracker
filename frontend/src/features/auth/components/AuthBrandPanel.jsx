import React from "react";
import { Leaf, Sprout } from "lucide-react";

const AuthBrandPanel = () => {
  return (
    <div className="relative hidden lg:flex flex-col justify-between w-full h-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#DDE6D0] via-[#CBD9BA] to-[#B9CBA6] p-10 xl:p-14">
      {/* decorative dots */}
      <div className="absolute top-10 right-10 w-2 h-2 rounded-full bg-[#3B5D45]/20" />
      <div className="absolute top-24 right-20 w-3 h-3 rounded-full bg-[#3B5D45]/15" />
      <div className="absolute bottom-16 left-10 w-2.5 h-2.5 rounded-full bg-[#3B5D45]/20" />
      <div className="absolute bottom-40 right-16 w-1.5 h-1.5 rounded-full bg-[#3B5D45]/25" />

      {/* soft glow */}
      <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -top-16 -left-16 w-56 h-56 rounded-full bg-white/10 blur-3xl" />

      {/* logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#2F4A3D] flex items-center justify-center shadow-md">
          <Leaf size={22} className="text-[#DDE6D0]" />
        </div>
        <span className="text-xl font-semibold text-[#2A2A22] tracking-tight">
          Habitly
        </span>
      </div>

      {/* headline */}
      <div className="relative z-10 max-w-sm">
        <h2 className="text-3xl xl:text-4xl font-semibold text-[#1F3529] leading-tight mb-4">
          Small habits,
          <br />
          big changes.
        </h2>
        <p className="text-[#3F4A38] text-base leading-relaxed">
          Track your habits, stay consistent and become your best self.
        </p>
      </div>

      {/* illustration */}
      <div className="relative z-10 flex items-end gap-4 mt-10">
        <div className="w-14 h-14 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-sm animate-[sway_4s_ease-in-out_infinite]">
          <Sprout size={26} className="text-[#3B5D45]" />
        </div>
        <div className="w-20 h-20 rounded-3xl bg-white/40 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <Leaf size={34} className="text-[#2F4A3D]" />
        </div>
        <div className="w-10 h-10 rounded-xl bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <Leaf size={18} className="text-[#6B7A4F]" />
        </div>
      </div>
    </div>
  );
};

export default AuthBrandPanel;