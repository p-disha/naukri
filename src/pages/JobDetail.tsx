// src/pages/JobDetail.tsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppContext";
import { Job, Company, Recruiter } from "../types";
import FreshnessIndicator from "../components/FreshnessIndicator";
import RecruiterCredibilityCard from "../components/RecruiterCredibilityCard";
import ReportModal from "../components/ReportModal";

const JobDetail: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const { state, dispatch } = useAppState();
  const navigate = useNavigate();
  const [reportOpen, setReportOpen] = useState(false);

  const job = state.jobs.find((j) => j.id === jobId) as Job;
  const company = state.companies.find((c) => c.id === job?.companyId) as Company;
  const recruiter = state.recruiters.find((r) => r.id === job?.companyId) as Recruiter; // simplified mapping

  if (!job) return <div className="p-4">Job not found.</div>;

  const handleApply = () => {
    dispatch({ type: "APPLY_JOB", payload: { jobId: job.id } });
    // after apply, navigate to applications dashboard with success toast (simple alert here)
    alert("Your application has been submitted. You can track updates in My Applications.");
    navigate("/applications");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-primary-800">{job.title}</h2>
      <p className="text-sm text-gray-600 mb-1">{company.name} • {job.location}</p>
      <p className="text-sm text-gray-500 mb-2">Experience: {job.experience}</p>
      {job.salary && <p className="text-sm text-gray-500 mb-2">Salary: {job.salary}</p>}
      <p className="text-sm text-gray-500 mb-2">Posted: {new Date(job.postedDate).toLocaleDateString()}</p>

      <FreshnessIndicator state={job.freshness} info={job.freshnessInfo.description} />

      <section className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
      </section>

      <section className="mt-4">
        <RecruiterCredibilityCard company={company} recruiter={recruiter} />
      </section>

      <div className="flex space-x-3 mt-4">
        <button onClick={handleApply} className="bg-primary-600 text-white px-4 py-2 rounded hover:bg-primary-700">
          Apply
        </button>
        <button onClick={() => setReportOpen(true)} className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100">
          Report
        </button>
      </div>

      <ReportModal isOpen={reportOpen} onClose={() => setReportOpen(false)} jobId={job.id} />
    </div>
  );
};

export default JobDetail;
