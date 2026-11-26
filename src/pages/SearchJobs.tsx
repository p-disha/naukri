// src/pages/SearchJobs.tsx
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import JobSearchBar from "../components/JobSearchBar";
import JobCard from "../components/JobCard";
import { useAppState } from "../context/AppContext";
import { Job } from "../types";

const SearchJobs: React.FC = () => {
  const { state, dispatch } = useAppState();
  const location = useLocation();
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(state.jobs);

  // Parse query params for filters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const keyword = params.get("q")?.toLowerCase() ?? "";
    const loc = params.get("loc")?.toLowerCase() ?? "";
    const exp = params.get("exp")?.toLowerCase() ?? "";
    const type = params.get("type")?.toLowerCase() ?? "";

    const results = state.jobs.filter((job) => {
      const matchesKeyword =
        job.title.toLowerCase().includes(keyword) ||
        job.description.toLowerCase().includes(keyword);
      const matchesLoc = job.location.toLowerCase().includes(loc);
      const matchesExp = job.experience.toLowerCase().includes(exp);
      const matchesType = type ? job.type.toLowerCase() === type : true;
      return matchesKeyword && matchesLoc && matchesExp && matchesType;
    });
    setFilteredJobs(results);
  }, [location.search, state.jobs]);

  const handleSave = (jobId: string) => {
    // For demo we could toggle a saved flag in localStorage or just show a toast.
    // Here we just dispatch a notification.
    const notif = {
      id: `NOTIF${Date.now()}`,
      type: "job_saved",
      message: `Job saved`,
      link: `/jobs/${jobId}`,
      createdAt: new Date().toISOString(),
      read: false,
    } as any;
    dispatch({ type: "ADD_NOTIFICATION", payload: notif });
  };

  const handleApply = (jobId: string) => {
    dispatch({ type: "APPLY_JOB", payload: { jobId } });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Search Jobs</h2>
      <JobSearchBar />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-4">
        {filteredJobs.map((job) => {
          const company = state.companies.find((c) => c.id === job.companyId) || state.companies[0];
          const recruiter = state.recruiters.find((r) => r.companyId === job.companyId) || state.recruiters[0];
          return (
            <JobCard
              key={job.id}
              job={job}
              company={company}
              recruiter={recruiter}
              onSave={handleSave}
              onApply={handleApply}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchJobs;
