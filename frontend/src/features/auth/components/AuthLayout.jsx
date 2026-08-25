import React from "react";
import { Leaf } from "lucide-react";
import AuthBrandPanel from "./AuthBrandPanel";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#F7F3EA] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch animate-fadeIn">
        {/* Brand panel - hidden on mobile */}
        <AuthBrandPanel />

        {/* Form panel */}
        <div className="w-full flex flex-col justify-center bg-white rounded-3xl shadow-[0_4px_24px_rgba(47,74,61,0.08)] border border-[#EFEAE0] p-8 sm:p-10 lg:p-12">
          {/* Mobile-only logo */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-full bg-[#2F4A3D] flex items-center justify-center">
              <Leaf size={18} className="text-[#DDE6D0]" />
            </div>
            <span className="text-lg font-semibold text-[#2A2A22]">
              Habitly
            </span>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;