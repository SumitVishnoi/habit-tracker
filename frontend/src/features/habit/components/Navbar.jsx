import React, { useState } from "react";
import { Leaf, LogOut, Menu, X, User } from "lucide-react";
import { useAuth } from "../../auth/hook/useAuth";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onToggleSidebar, sidebarOpen }) => {
  const { user, handleLogout } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const onLogout = async () => {
    try {
      await handleLogout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="sticky top-0 z-40 w-full glass border-b border-[#E5E0D3]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Mobile menu toggle */}
          <div className="flex items-center gap-3">
            {/* Mobile menu button */}
            <button
              type="button"
              onClick={onToggleSidebar}
              className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center text-[#6B6B5E] hover:bg-[#F0EFEA] transition-colors"
              aria-label={sidebarOpen ? "Close menu" : "Open menu"}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#2F4A3D] flex items-center justify-center shadow-sm">
                <Leaf size={16} className="text-[#DDE6D0]" />
              </div>
              <span className="text-lg font-semibold text-[#2A2A22] tracking-tight hidden sm:block">
                Habitly
              </span>
            </div>
          </div>

          {/* Center: Greeting */}
          <div className="hidden md:block">
            <p className="text-sm text-[#6B6B5E]">
              {getGreeting()},{" "}
              <span className="font-semibold text-[#1F3529]">
                {user?.name?.split(" ")[0] || "there"}
              </span>
            </p>
          </div>

          {/* Right: Avatar + Logout */}
          <div className="flex items-center gap-2">
            {/* Profile avatar */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-9 h-9 rounded-full bg-gradient-to-br from-[#DDE6D0] to-[#B9CBA6] flex items-center justify-center text-[#2F4A3D] font-semibold text-xs shadow-sm hover:shadow-md transition-all"
                aria-label="Profile menu"
              >
                {getInitials(user?.name)}
              </button>

              {/* Dropdown */}
              {showProfileMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-lg border border-[#E5E0D3] py-2 z-20 animate-scaleIn origin-top-right">
                    <div className="px-4 py-3 border-b border-[#F0EFEA]">
                      <p className="text-sm font-semibold text-[#1F3529] truncate">
                        {user?.name}
                      </p>
                      <p className="text-xs text-[#6B6B5E] truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate("/settings");
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#2A2A22] hover:bg-[#F7F3EA] transition-colors"
                    >
                      <User size={16} className="text-[#6B6B5E]" />
                      Settings
                    </button>
                    <button
                      type="button"
                      onClick={onLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#C0392B] hover:bg-[#FBEAE8] transition-colors"
                    >
                      <LogOut size={16} />
                      Log out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
