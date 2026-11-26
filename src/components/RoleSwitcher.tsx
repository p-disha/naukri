// src/components/RoleSwitcher.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppState } from "../context/AppContext";
import { UserCheck, Briefcase } from "lucide-react";

const RoleSwitcher: React.FC = () => {
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const location = useLocation();

  const isSeeker = state.user.role === "seeker";

  const handleToggle = () => {
    const nextRole = isSeeker ? "recruiter" : "seeker";
    dispatch({ type: "SET_ROLE", payload: nextRole });

    // Intelligently transition routes if on role-specific views
    if (nextRole === "recruiter") {
      if (location.pathname === "/" || location.pathname === "/search" || location.pathname === "/applications") {
        navigate("/recruiter");
      }
    } else {
      if (location.pathname === "/recruiter" || location.pathname === "/dashboard") {
        navigate("/search");
      }
    }
  };

  return (
    <div className="flex items-center bg-gray-100 p-0.5 rounded-lg border border-gray-200">
      <button
        type="button"
        onClick={() => {
          if (!isSeeker) handleToggle();
        }}
        className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
          isSeeker
            ? "bg-white text-primary-700 shadow-xs border border-gray-200"
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        <UserCheck className="w-3.5 h-3.5" />
        <span>Seeker</span>
      </button>

      <button
        type="button"
        onClick={() => {
          if (isSeeker) handleToggle();
        }}
        className={`flex items-center space-x-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
          !isSeeker
            ? "bg-purple-600 text-white shadow-xs"
            : "text-gray-500 hover:text-gray-800"
        }`}
      >
        <Briefcase className="w-3.5 h-3.5" />
        <span>Recruiter</span>
      </button>
    </div>
  );
};

export default RoleSwitcher;
