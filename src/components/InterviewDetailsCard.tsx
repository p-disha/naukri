// src/components/InterviewDetailsCard.tsx
import React from "react";
import { Interview, Job, Company, Recruiter } from "../types";

interface Props {
  interview: Interview;
  job: Job;
  company: Company;
  recruiter: Recruiter;
}

const statusColors: Record<string, string> = {
  pending: "bg-warning-200 text-warning-800",
  confirmed: "bg-success-200 text-success-800",
  disputed: "bg-danger-200 text-danger-800",
};

const InterviewDetailsCard: React.FC<Props> = ({ interview, job, company, recruiter }) => {
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <h3 className="text-xl font-semibold mb-2">Interview for {job.title}</h3>
      <p className="text-sm text-gray-600">{company.name} – {recruiter.name}</p>
      <p className="text-sm mt-2">
        <span className="font-medium">When:</span> {new Date(interview.scheduledAt).toLocaleString()}
      </p>
      <p className="text-sm mt-1">
        <span className="font-medium">Mode:</span> {interview.mode}
      </p>
      <p className="text-sm mt-1">
        <span className="font-medium">Link:</span>{" "}
        <a href={interview.link} target="_blank" rel="noopener noreferrer" className="text-primary-600 underline">
          Join Interview
        </a>
      </p>
      <p className="text-sm mt-2">
        <span className="font-medium">Status:</span>{" "}
        <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[interview.status] ?? "bg-gray-200 text-gray-800"}`}>
          {interview.status.replace("_", " ")}
        </span>
      </p>
    </div>
  );
};

export default InterviewDetailsCard;
