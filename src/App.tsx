// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SearchJobs from "./pages/SearchJobs";
import JobDetail from "./pages/JobDetail";
import MyApplications from "./pages/MyApplications";
import ApplicationDetail from "./pages/ApplicationDetail";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import Dashboard from "./pages/Dashboard";
import InterviewDetail from "./pages/InterviewDetail";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchJobs />} />
            <Route path="/jobs/:jobId" element={<JobDetail />} />
            <Route path="/applications" element={<MyApplications />} />
            <Route path="/applications/:appId" element={<ApplicationDetail />} />
            <Route path="/recruiter" element={<RecruiterDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interview/:interviewId" element={<InterviewDetail />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            {/* Fallback to home for unknown routes */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
