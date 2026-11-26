// src/components/AttendanceConfirmation.tsx
import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import { Interview } from "../types";

interface Props {
  interview: Interview;
}

const AttendanceConfirmation: React.FC<Props> = ({ interview }) => {
  const { dispatch } = useAppState();
  const [choice, setChoice] = useState<string>("attend");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update interview confirmation based on choice
    const seekerConfirmation = choice === "attend";
    dispatch({
      type: "UPDATE_INTERVIEW_CONFIRMATION",
      payload: { id: interview.id, seekerConfirmation },
    });
    // Add a notification for recruiter (optional = false)
    const notif = {
      id: `NOTIF${Date.now()}`,
      type: "interview_seeker_confirmed",
      message: `Seeker ${seekerConfirmation ? "confirmed" : "declined"} attendance for interview ${interview.id}`,
      link: `/interview/${interview.id}`,
      createdAt: new Date().toISOString(),
      read: false,
    } as any;
    dispatch({ type: "ADD_NOTIFICATION", payload: notif });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <p className="font-medium mb-2">Will you attend the interview?</p>
      <div className="flex flex-col space-y-2 mb-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="attendance"
            value="attend"
            checked={choice === "attend"}
            onChange={() => setChoice("attend")}
            className="mr-2"
          />
          Yes, I will attend
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="attendance"
            value="decline"
            checked={choice === "decline"}
            onChange={() => setChoice("decline")}
            className="mr-2"
          />
          No, I cannot attend
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="attendance"
            value="reschedule"
            checked={choice === "reschedule"}
            onChange={() => setChoice("reschedule")}
            className="mr-2"
          />
          Need to reschedule
        </label>
        <label className="flex items-center">
          <input
            type="radio"
            name="attendance"
            value="cancel"
            checked={choice === "cancel"}
            onChange={() => setChoice("cancel")}
            className="mr-2"
          />
          Cancel participation
        </label>
      </div>
      <button type="submit" className="bg-primary-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default AttendanceConfirmation;
