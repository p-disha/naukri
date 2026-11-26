// src/components/JobCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Job, Company, Recruiter } from "../types";
import FreshnessIndicator from "./FreshnessIndicator";
import { Heart } from "lucide-react";

interface Props {
  job: Job;
  company: Company;
  recruiter: Recruiter;
  onSave?: (jobId: string) => void;
  onApply?: (jobId: string) => void;
}

const JobCard: React.FC<Props> = ({ job, company, recruiter, onSave, onApply }) => {
  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSave && onSave(job.id);
  };

  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    onApply && onApply(job.id);
  };

  return (
    <Link to={`/jobs/${job.id}`} className="block bg-white rounded-lg shadow card p-4 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-medium text-primary-800">{job.title}</h3>
        <button onClick={handleSave} aria-label="Save job" className="text-gray-400 hover:text-primary-600">
          <Heart size={20} />
        </button>
      </div>
      <p className="text-sm text-gray-600">{company.name} • {recruiter.name} • {job.location}</p>
      <p className="text-sm text-gray-500 mt-1">Experience: {job.experience}</p>
      {job.salary && <p className="text-sm text-gray-500">Salary: {job.salary}</p>}
      <p className="text-sm text-gray-400 mt-2 line-clamp-2">{job.description}</p>
      <div className="flex justify-between items-center mt-3">
        <FreshnessIndicator state={job.freshness} info={job.freshnessInfo.description} />
        <button onClick={handleApply} className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700">
          Apply
        </button>
      </div>
    </Link>
  );
};

export default JobCard;
