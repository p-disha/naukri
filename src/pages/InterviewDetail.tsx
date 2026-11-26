// src/pages/InterviewDetail.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { useAppState } from "../context/AppContext";
import { Interview } from "../types";
import InterviewDetailsCard from "../components/InterviewDetailsCard";
import AttendanceConfirmation from "../components/AttendanceConfirmation";
import ReconciliationStatus from "../components/ReconciliationStatus";

const InterviewDetail: React.FC = () => {
  const { interviewId } = useParams<{ interviewId: string }>();
  const { state, dispatch } = useAppState();

  const interview = state.interviews.find((i) => i.id === interviewId) as Interview;
  if (!interview) return <div className="p-4">Interview not found.</div>;

  const application = state.applications.find((a) => a.id === interview.applicationId);
  const job = application ? (state.jobs.find((j) => j.id === application.jobId) || state.jobs[0]) : state.jobs[0];
  const company = job ? (state.companies.find((c) => c.id === job.companyId) || state.companies[0]) : state.companies[0];
  const recruiter = state.recruiters.find((r) => r.companyId === company?.id) || state.recruiters[0];

  const isSeeker = state.user.role === "seeker";

  const handleRecruiterMarkAttended = () => {
    dispatch({
      type: "UPDATE_INTERVIEW_CONFIRMATION",
      payload: { id: interview.id, recruiterConfirmation: true },
    });
    const notif = {
      id: `NOTIF${Date.now()}`,
      type: "interview_recruiter_confirmed",
      message: `Recruiter confirmed attendance for interview ${interview.id}`,
      link: `/interview/${interview.id}`,
      createdAt: new Date().toISOString(),
      read: false,
    } as any;
    dispatch({ type: "ADD_NOTIFICATION", payload: notif });
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Interview Details</h2>
      {job && company && recruiter && (
        <InterviewDetailsCard interview={interview} job={job} company={company} recruiter={recruiter} />
      )}
      {isSeeker ? (
        <AttendanceConfirmation interview={interview} />
      ) : (
        <button onClick={handleRecruiterMarkAttended} className="mt-4 bg-primary-600 text-white px-4 py-2 rounded">
          Mark Attended (Recruiter)
        </button>
      )}
      <ReconciliationStatus interview={interview} />
    </div>
  );
};

export default InterviewDetail;
