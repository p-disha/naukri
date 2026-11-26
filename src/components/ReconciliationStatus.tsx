// src/components/ReconciliationStatus.tsx
import React from "react";
import { Interview } from "../types";

interface Props {
  interview: Interview;
}

const ReconciliationStatus: React.FC<Props> = ({ interview }) => {
  const { seekerConfirmation, recruiterConfirmation, status } = interview;

  let message = "Awaiting confirmation...";
  let color = "bg-warning-200 text-warning-800";

  if (seekerConfirmation && recruiterConfirmation) {
    message = "Both parties confirmed – interview attended";
    color = "bg-success-200 text-success-800";
  } else if (seekerConfirmation || recruiterConfirmation) {
    const awaiting = seekerConfirmation ? "recruiter" : "seeker";
    message = `Awaiting ${awaiting} confirmation`;
    color = "bg-warning-200 text-warning-800";
  } else if (status === "disputed") {
    message = "Attendance outcome disputed";
    color = "bg-danger-200 text-danger-800";
  }

  return (
    <div className={`mt-4 p-2 rounded ${color}`}>
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
};

export default ReconciliationStatus;
