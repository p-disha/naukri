// src/components/RecruiterCandidateCard.tsx
import React from "react";
import { Application, Job, Company, Recruiter } from "../types";
import { useAppState } from "../context/AppContext";

interface Props {
  app: Application;
  job: Job;
  company: Company;
  recruiter: Recruiter;
}

const RecruiterCandidateCard: React.FC<Props> = ({ app, job, company, recruiter }) => {
  const { dispatch } = useAppState();

  const addEvent = (type: Application["status"], description: string) => {
    const event = {
      type,
      timestamp: new Date().toISOString(),
      source: "Recruiter",
      description,
    };
    dispatch({ type: "ADD_EVENT", payload: { appId: app.id, event } });
    // also add a notification for seeker
    const notif = {
      id: `NOTIF${Date.now()}`,
      type: `recruiter_${type}`,
      message: `${description} for ${job.title}`,
      link: `/applications/${app.id}`,
      createdAt: new Date().toISOString(),
      read: false,
    } as any;
    dispatch({ type: "ADD_NOTIFICATION", payload: notif });
  };

  const handleView = () => addEvent("viewed", "Application viewed by recruiter");
  const handleShortlist = () => addEvent("shortlisted", "Candidate shortlisted");
  const handleInvite = () => {
    // create interview record
    const interviewId = `INT${Date.now()}`;
    const interview = {
      id: interviewId,
      applicationId: app.id,
      scheduledAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // +2 days
      mode: "Video Call",
      link: "https://meet.example.com/" + interviewId,
      status: "pending",
    } as any;
    dispatch({ type: "CREATE_INTERVIEW", payload: interview });
    addEvent("interview_invited", "Interview invitation sent");
  };
  const handleClose = () => addEvent("closed", "Position closed by recruiter");
  const handleMarkAttended = () => {
    // For simplicity we just add an event indicating outcome pending
    addEvent("interview_outcome_pending", "Interview marked attended (recruiter side)");
  };

  return (
    <div className="border rounded p-3 mb-2 bg-white shadow-sm">
      <h4 className="font-medium">{job.title} – {company.name}</h4>
      <p className="text-sm text-gray-600">Recruiter: {recruiter.name} • Applied on {new Date(app.appliedAt).toLocaleDateString()}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <button onClick={handleView} className="px-2 py-1 bg-gray-200 rounded text-xs">Mark Viewed</button>
        <button onClick={handleShortlist} className="px-2 py-1 bg-success-200 rounded text-xs">Shortlist</button>
        <button onClick={handleInvite} className="px-2 py-1 bg-primary-200 rounded text-xs">Invite Interview</button>
        <button onClick={handleClose} className="px-2 py-1 bg-danger-200 rounded text-xs">Close Position</button>
        <button onClick={handleMarkAttended} className="px-2 py-1 bg-success-200 rounded text-xs">Mark Attended</button>
      </div>
    </div>
  );
};

export default RecruiterCandidateCard;
