// src/components/Navbar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import { useAppState } from "../context/AppContext";
import RoleSwitcher from "./RoleSwitcher";
import { Search, FileText, Bell, Users, BarChart3, Home } from "lucide-react";

const Navbar: React.FC = () => {
  const { state } = useAppState();
  const isRecruiter = state.user.role === "recruiter";
  const unreadCount = state.notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm" style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "64px" }}>
          
          {/* Left: Brand Identity */}
          <div className="flex items-center space-x-3" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <NavLink to="/" className="flex items-center space-x-2.5 text-decoration-none" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm" style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "#2563eb", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                N
              </div>
              <div className="flex flex-col text-left" style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
                <span className="text-base font-extrabold text-gray-900 tracking-tight" style={{ color: "#111827", fontWeight: 800, fontSize: "16px", lineHeight: "1.2" }}>
                  naukri<span className="text-blue-600" style={{ color: "#2563eb" }}>bridge</span>
                </span>
                <span className="text-[10px] font-semibold tracking-wide text-gray-500 uppercase" style={{ fontSize: "10px", color: "#6b7280" }}>
                  {isRecruiter ? "Recruiter Portal" : "Confidence Platform"}
                </span>
              </div>
            </NavLink>
          </div>

          {/* Center: Icon Nav Cards / Tabs */}
          <nav className="flex items-center space-x-2" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-gray-100 text-gray-900 shadow-xs border border-gray-200"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
              style={{ textDecoration: "none" }}
            >
              <Home className="w-4 h-4 text-gray-500" />
              <span>Overview</span>
            </NavLink>

            {!isRecruiter ? (
              <>
                <NavLink
                  to="/search"
                  className={({ isActive }) =>
                    `flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-xs border border-blue-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`
                  }
                  style={{ textDecoration: "none" }}
                >
                  <Search className="w-4 h-4 text-blue-600" />
                  <span>Search Jobs</span>
                </NavLink>

                <NavLink
                  to="/applications"
                  className={({ isActive }) =>
                    `flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-xs border border-blue-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`
                  }
                  style={{ textDecoration: "none" }}
                >
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>My Applications</span>
                  {state.applications.length > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-blue-200 text-blue-800 font-bold">
                      {state.applications.length}
                    </span>
                  )}
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to="/recruiter"
                  className={({ isActive }) =>
                    `flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-purple-50 text-purple-700 shadow-xs border border-purple-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`
                  }
                  style={{ textDecoration: "none" }}
                >
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>Candidate Pipeline</span>
                </NavLink>

                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-purple-50 text-purple-700 shadow-xs border border-purple-200"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`
                  }
                  style={{ textDecoration: "none" }}
                >
                  <BarChart3 className="w-4 h-4 text-purple-600" />
                  <span>North-Star KPI</span>
                </NavLink>
              </>
            )}
          </nav>

          {/* Right: Role Switcher & Utilities */}
          <div className="flex items-center space-x-3" style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <RoleSwitcher />

            <div className="flex items-center space-x-1 pl-2 border-l border-gray-200" style={{ display: "flex", alignItems: "center", gap: "6px", borderLeft: "1px solid #e5e7eb", paddingLeft: "8px" }}>
              <NavLink
                to="/notifications"
                className={({ isActive }) =>
                  `relative p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors ${
                    isActive ? "bg-gray-100 text-gray-900" : ""
                  }`
                }
                title="Notifications"
                style={{ position: "relative" }}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span
                    className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center"
                    style={{ position: "absolute", top: "2px", right: "2px", width: "16px", height: "16px", borderRadius: "50%", backgroundColor: "#ef4444", color: "white", fontSize: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {unreadCount}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/profile"
                className="flex items-center space-x-1.5 px-2 py-1 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                title="Profile"
                style={{ display: "flex", alignItems: "center", gap: "6px", textDecoration: "none" }}
              >
                <div
                  className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 font-bold flex items-center justify-center text-[11px]"
                  style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {isRecruiter ? "R" : "S"}
                </div>
              </NavLink>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
