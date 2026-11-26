// src/pages/RecruiterDashboard.tsx
import React from "react";
import { useAppState } from "../context/AppContext";
import RecruiterCandidateCard from "../components/RecruiterCandidateCard";
import { Job, Company, Recruiter } from "../types";

const RecruiterDashboard: React.FC = () => {
  const { state } = useAppState();

  // Show only applications where the logged‑in user is a recruiter (simplified check)
  const recruiterId = state.user.role === "recruiter" ? state.user.id : null;
  if (!recruiterId) {
    return <p className="p-4 text-gray-600">Switch to Recruiter role to view this dashboard.</p>;
  }

  // For demo, show all applications (in a real app we would filter by recruiter’s jobs)
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recruiter Dashboard</h2>
      <div className="space-y-4">
        {state.applications.map((app) => {
          const job = state.jobs.find((j) => j.id === app.jobId) as Job;
          const company = state.companies.find((c) => c.id === job.companyId) as Company;
          const recruiter = state.recruiters.find((r) => r.id === job.companyId) as Recruiter; // simplified
          return (
            <RecruiterCandidateCard
              key={app.id}
              app={app}
              job={job}
              company={company}
              recruiter={recruiter}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecruiterDashboard;
