// src/components/ApplicationCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Application, Job, Company } from "../types";

interface Props {
  app: Application;
  job: Job;
  company: Company;
}

const statusColors: Record<string, string> = {
  applied: "bg-gray-200 text-gray-800",
  viewed: "bg-primary-100 text-primary-800",
  shortlisted: "bg-success-100 text-success-800",
  interview_invited: "bg-warning-100 text-warning-800",
  interview_outcome_pending: "bg-warning-100 text-warning-800",
  closed: "bg-danger-100 text-danger-800",
  withdrawn: "bg-gray-200 text-gray-800",
};

const ApplicationCard: React.FC<Props> = ({ app, job, company }) => {
  return (
    <Link to={`/applications/${app.id}`} className="block border rounded p-4 hover:shadow-sm mb-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">{job.title}</h3>
          <p className="text-sm text-gray-600">{company.name} • {job.location}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs ${statusColors[app.status] ?? "bg-gray-100"}`}> {app.status.replace("_", " ")} </span>
      </div>
      <p className="text-sm text-gray-500 mt-1">Applied on {new Date(app.appliedAt).toLocaleDateString()}</p>
    </Link>
  );
};

export default ApplicationCard;
