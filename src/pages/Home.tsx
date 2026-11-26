// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useAppState } from "../context/AppContext";
import { 
  Search, 
  FileText, 
  CalendarCheck, 
  Users, 
  BarChart3, 
  Bell, 
  ShieldCheck, 
  ArrowRight 
} from "lucide-react";

const Home: React.FC = () => {
  const { state, dispatch } = useAppState();
  const isRecruiter = state.user.role === "recruiter";

  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 shadow-sm mb-8 text-center sm:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-3">
            <ShieldCheck className="w-4 h-4 text-primary-600" />
            <span>Naukri Capstone: Application Confidence &amp; Interview Bridge</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
            Eliminate Job Uncertainty. <span className="text-primary-600">Close the Hiring Loop.</span>
          </h1>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            From verified active job postings and recruiter credibility badges to transparent status tracking and dual-confirmed interview attendance.
          </p>
        </div>

        {/* Quick Role Switch Indicator Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center min-w-[240px] text-center">
          <span className="text-xs text-gray-500 font-medium mb-1">Current Active Workspace</span>
          <span className={`text-sm font-bold px-3 py-1 rounded-full mb-3 ${
            isRecruiter ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
          }`}>
            {isRecruiter ? "👔 Recruiter / Employer" : "🎯 Job Seeker"}
          </span>
          <button
            onClick={() => dispatch({ type: "SET_ROLE", payload: isRecruiter ? "seeker" : "recruiter" })}
            className="text-xs font-semibold text-primary-600 hover:text-primary-800 underline transition-colors"
          >
            Switch to {isRecruiter ? "Job Seeker View" : "Recruiter View"} →
          </button>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Prototype Navigation &amp; Feature Hub</h2>
          <p className="text-xs text-gray-500">Explore key interactions via the functional icon cards below</p>
        </div>
      </div>

      {/* Grid of Icon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {/* Card 1: Search Jobs */}
        <Link
          to="/search"
          onClick={() => dispatch({ type: "SET_ROLE", payload: "seeker" })}
          className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-primary-400 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 group-hover:bg-primary-600 text-primary-600 group-hover:text-white flex items-center justify-center mb-4 transition-all">
              <Search className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                Search &amp; Discover Jobs
              </h3>
              <span className="text-[10px] bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-semibold border border-green-200">
                Freshness Score
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Browse verified job postings with real-time confidence scores, company trust tags, and recruiter activity signals.
            </p>
          </div>
          <div className="flex items-center text-xs font-semibold text-primary-600 group-hover:translate-x-1 transition-transform">
            <span>Explore Job Listings</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </Link>

        {/* Card 2: My Applications */}
        <Link
          to="/applications"
          onClick={() => dispatch({ type: "SET_ROLE", payload: "seeker" })}
          className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-primary-400 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 group-hover:bg-emerald-600 text-emerald-600 group-hover:text-white flex items-center justify-center mb-4 transition-all">
              <FileText className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                My Applications
              </h3>
              <span className="text-[10px] bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-semibold border border-blue-200">
                {state.applications.length} Active
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Track timeline stages: Applied → Viewed → Shortlisted → Interview Outcome. Eliminates the recruiter black hole.
            </p>
          </div>
          <div className="flex items-center text-xs font-semibold text-emerald-600 group-hover:translate-x-1 transition-transform">
            <span>View Tracker Timeline</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </Link>

        {/* Card 3: Interview Bridge */}
        <Link
          to={state.interviews[0] ? `/interview/${state.interviews[0].id}` : "/applications"}
          className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-indigo-400 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white flex items-center justify-center mb-4 transition-all">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                Interview Bridge &amp; RSVP
              </h3>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-semibold border border-indigo-200">
                Dual Confirm
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Interactive 1-click attendance confirmation for both seekers and recruiters to reduce no-shows and coordinate seamlessly.
            </p>
          </div>
          <div className="flex items-center text-xs font-semibold text-indigo-600 group-hover:translate-x-1 transition-transform">
            <span>Manage Interview Flow</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </Link>

        {/* Card 4: Recruiter Dashboard */}
        <Link
          to="/recruiter"
          onClick={() => dispatch({ type: "SET_ROLE", payload: "recruiter" })}
          className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-purple-400 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-purple-50 group-hover:bg-purple-600 text-purple-600 group-hover:text-white flex items-center justify-center mb-4 transition-all">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                Recruiter Pipeline
              </h3>
              <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full font-semibold border border-purple-200">
                Recruiter View
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Review applicant confidence profiles, schedule interviews with calendar links, and mark candidate attendance.
            </p>
          </div>
          <div className="flex items-center text-xs font-semibold text-purple-600 group-hover:translate-x-1 transition-transform">
            <span>Open Candidate Manager</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </Link>

        {/* Card 5: North-Star KPI Dashboard */}
        <Link
          to="/dashboard"
          onClick={() => dispatch({ type: "SET_ROLE", payload: "recruiter" })}
          className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-amber-600 text-amber-600 group-hover:text-white flex items-center justify-center mb-4 transition-all">
              <BarChart3 className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                North-Star KPI Panel
              </h3>
              <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-semibold border border-amber-200">
                Reconciliation
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Real-time metrics: Dual-confirmed interviews, qualified seekers, pending responses, and dispute reconciliation stats.
            </p>
          </div>
          <div className="flex items-center text-xs font-semibold text-amber-600 group-hover:translate-x-1 transition-transform">
            <span>View Executive Metrics</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </Link>

        {/* Card 6: Notifications & Profile */}
        <Link
          to="/notifications"
          className="group bg-white p-5 rounded-xl border border-gray-200 hover:border-rose-400 hover:shadow-md transition-all flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 group-hover:bg-rose-600 text-rose-600 group-hover:text-white flex items-center justify-center mb-4 transition-all">
              <Bell className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
                Smart Notifications
              </h3>
              <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-semibold border border-rose-200">
                Anti-Spam
              </span>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed mb-4">
              Transaction updates with configurable throttling limits (max optional notifications per week) to prevent alert fatigue.
            </p>
          </div>
          <div className="flex items-center text-xs font-semibold text-rose-600 group-hover:translate-x-1 transition-transform">
            <span>Configure Alerts &amp; Profile</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
