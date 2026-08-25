import React from "react";
import { Loader2 } from "lucide-react";

const AuthButton = ({
  children,
  loading = false,
  loadingText = "Loading...",
  disabled = false,
  type = "submit",
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`w-full h-12 rounded-2xl font-medium text-white flex items-center justify-center gap-2
        transition-all duration-200 shadow-sm
        ${
          disabled || loading
            ? "bg-[#3B5D45]/50 cursor-not-allowed"
            : "bg-[#2F4A3D] hover:bg-[#3B5D45] active:bg-[#1F3529] hover:shadow-md active:scale-[0.98]"
        }
      `}
    >
      {loading ? (
        <>
          <Loader2 size={18} className="animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default AuthButton;