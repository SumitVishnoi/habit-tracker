import React from "react";
import { User, Mail, Globe2, LogOut, Leaf } from "lucide-react";
import { useAuth } from "../../auth/hook/useAuth";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      await handleLogout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="animate-fadeIn max-w-2xl">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1F3529] mb-1">
          Settings
        </h1>
        <p className="text-sm sm:text-base text-[#6B6B5E]">
          Manage your account and preferences.
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white border border-[#E5E3D8] rounded-2xl p-6 sm:p-8 shadow-sm mb-6 animate-slideUp">
        <h2 className="text-base font-semibold text-[#1F3529] mb-6">
          Profile
        </h2>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#DDE6D0] via-[#CBD9BA] to-[#B9CBA6] flex items-center justify-center shadow-sm">
            <span className="text-xl font-bold text-[#2F4A3D]">
              {user?.name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2) || "U"}
            </span>
          </div>
          <div>
            <p className="text-lg font-semibold text-[#1F3529]">
              {user?.name || "User"}
            </p>
            <p className="text-sm text-[#6B6B5E]">
              Member since{" "}
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "recently"}
            </p>
          </div>
        </div>

        {/* Info Fields */}
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#2A2A22] mb-1.5">
              Full name
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B9A7C] pointer-events-none"
              />
              <input
                type="text"
                value={user?.name || ""}
                readOnly
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[#FDFBF5] border border-[#E5E0D3] text-[#2A2A22] text-sm outline-none cursor-default"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-[#2A2A22] mb-1.5">
              Email address
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B9A7C] pointer-events-none"
              />
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[#FDFBF5] border border-[#E5E0D3] text-[#2A2A22] text-sm outline-none cursor-default"
              />
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-sm font-medium text-[#2A2A22] mb-1.5">
              Timezone
            </label>
            <div className="relative">
              <Globe2
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8B9A7C] pointer-events-none"
              />
              <input
                type="text"
                value={user?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone}
                readOnly
                className="w-full h-12 pl-11 pr-4 rounded-2xl bg-[#FDFBF5] border border-[#E5E0D3] text-[#2A2A22] text-sm outline-none cursor-default"
              />
            </div>
            <p className="mt-1.5 text-xs text-[#6B6B5E]">
              Used to determine your local habit days and streaks.
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div
        className="bg-white border border-[#E5E3D8] rounded-2xl p-6 sm:p-8 shadow-sm mb-6 animate-slideUp"
        style={{ animationDelay: "100ms" }}
      >
        <h2 className="text-base font-semibold text-[#1F3529] mb-4">
          About Habitly
        </h2>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#2F4A3D] flex items-center justify-center">
            <Leaf size={18} className="text-[#DDE6D0]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#1F3529]">Habitly</p>
            <p className="text-xs text-[#6B6B5E]">Version 1.0.0</p>
          </div>
        </div>
        <p className="text-sm text-[#6B6B5E] leading-relaxed">
          Track your habits, stay consistent, and become your best self.
          Small habits lead to big changes.
        </p>
      </div>

      {/* Danger Zone */}
      <div
        className="bg-white border border-[#E8B4AC]/40 rounded-2xl p-6 sm:p-8 shadow-sm animate-slideUp"
        style={{ animationDelay: "200ms" }}
      >
        <h2 className="text-base font-semibold text-[#C0392B] mb-2">
          Danger Zone
        </h2>
        <p className="text-sm text-[#6B6B5E] mb-6">
          Log out of your account on this device.
        </p>
        <button
          type="button"
          onClick={onLogout}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-[#E8B4AC] text-[#C0392B] text-sm font-medium
            hover:bg-[#FBEAE8] active:scale-[0.98] transition-all duration-200"
        >
          <LogOut size={16} />
          Log out
        </button>
      </div>
    </div>
  );
};

export default Settings;
