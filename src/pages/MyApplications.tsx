// src/pages/MyApplications.tsx
import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import ApplicationCard from "../components/ApplicationCard";

const statusFilters = [
  { label: "All", value: "all" },
  { label: "No update yet", value: "applied" },
  { label: "Viewed", value: "viewed" },
  { label: "Shortlisted", value: "shortlisted" },
  { label: "Interview invited", value: "interview_invited" },
  { label: "Closed", value: "closed" },
  { label: "Withdrawn", value: "withdrawn" },
];

const MyApplications: React.FC = () => {
  const { state } = useAppState();
  const [filter, setFilter] = useState("all");

  const applications = state.applications.filter((a) => (filter === "all" ? true : a.status === filter));

  const total = state.applications.length;
  const withUpdates = state.applications.filter((a) => a.events.length > 1).length;
  const invitations = state.applications.filter((a) => a.status === "interview_invited").length;
  const upcoming = state.applications.filter((a) => a.status === "interview_outcome_pending").length;
  const noUpdates = state.applications.filter((a) => a.events.length === 1).length;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Total applications</p>
          <p className="text-xl font-bold">{total}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Applications with updates</p>
          <p className="text-xl font-bold">{withUpdates}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Interview invitations</p>
          <p className="text-xl font-bold">{invitations}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">Upcoming interviews</p>
          <p className="text-xl font-bold">{upcoming}</p>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <p className="text-sm text-gray-500">No recent update</p>
          <p className="text-xl font-bold">{noUpdates}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2 mb-4">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1 rounded text-sm ${filter === f.value ? "bg-primary-600 text-white" : "bg-gray-200 text-gray-800"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {applications.map((app) => {
          const job = state.jobs.find((j) => j.id === app.jobId);
          if (!job) return null;
          const company = state.companies.find((c) => c.id === job.companyId) || state.companies[0];
          return <ApplicationCard key={app.id} app={app} job={job} company={company} />;
        })}
      </div>
    </div>
  );
};

export default MyApplications;
