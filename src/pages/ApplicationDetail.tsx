// src/pages/ApplicationDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useAppState } from "../context/AppContext";
import { Application } from "../types";

const ApplicationDetail: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const { state } = useAppState();

  const app = state.applications.find((a) => a.id === appId) as Application;
  if (!app) return <div className="p-4">Application not found.</div>;

  const job = state.jobs.find((j) => j.id === app.jobId) || state.jobs[0];
  const company = state.companies.find((c) => c.id === job.companyId) || state.companies[0];

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2">{job.title} – Application Details</h2>
      <p className="text-sm text-gray-600 mb-2">{company.name} • {job.location}</p>
      <p className="text-sm text-gray-500 mb-2">Applied on {new Date(app.appliedAt).toLocaleDateString()}</p>
      <p className="text-sm text-gray-500 mb-4">Current status: <span className="font-medium">{app.status.replace("_", " ")}</span></p>
      <h3 className="text-lg font-semibold mb-2">Timeline</h3>
      <ul className="border-l-2 border-primary-200 pl-4 space-y-4">
        {app.events.map((e, idx) => (
          <li key={idx} className="relative">
            <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary-600 rounded-full" />
            <p className="text-sm text-gray-700">
              <span className="font-medium">{e.type.replace("_", " ")}</span> – {e.description}
              <br />
              <span className="text-xs text-gray-500">{new Date(e.timestamp).toLocaleString()}</span>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationDetail;
