import React from "react";
import { LayoutDashboard, Target, BarChart3, Settings, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm lg:hidden animate-fadeIn"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 bg-white border-r border-[#E5E0D3]/60 transform transition-transform duration-300 ease-out
          lg:translate-x-0 lg:static lg:h-auto lg:min-h-[calc(100vh-4rem)]
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Mobile close button */}
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden self-end mb-2 w-8 h-8 rounded-lg flex items-center justify-center text-[#6B6B5E] hover:bg-[#F0EFEA] transition-colors"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#EAF2EC] text-[#2F4A3D] shadow-sm"
                      : "text-[#6B6B5E] hover:bg-[#F7F3EA] hover:text-[#2A2A22]"
                  }`
                }
              >
                <item.icon size={18} />
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Bottom decorative */}
          <div className="mt-auto pt-6">
            <div className="px-4 py-4 rounded-2xl bg-gradient-to-br from-[#DDE6D0]/40 to-[#CBD9BA]/30 border border-[#B9CBA6]/20">
              <p className="text-xs font-semibold text-[#3B5D45] mb-1">
                Stay consistent
              </p>
              <p className="text-xs text-[#6B6B5E] leading-relaxed">
                Small daily improvements lead to remarkable results.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
