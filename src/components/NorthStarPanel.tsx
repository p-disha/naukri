// src/components/NorthStarPanel.tsx
import React from "react";
import { useAppState } from "../context/AppContext";

const NorthStarPanel: React.FC = () => {
  const { state } = useAppState();
  const interviews = state.interviews;

  const qualifiedSeekers = interviews.filter((i) => i.status === "confirmed").length;
  const dualConfirmed = qualifiedSeekers; // same as qualified in this simplified model
  const pending = interviews.filter((i) => i.status === "pending").length;
  const disputed = interviews.filter((i) => i.status === "disputed").length;

  const panelItem = (label: string, value: number, color: string) => (
    <div className="flex-1 p-4 border rounded bg-white shadow-sm mr-2">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );

  return (
    <div className="flex space-x-2 mb-4">
      {panelItem("Qualified Seekers", qualifiedSeekers, "text-success-600")}
      {panelItem("Dual‑Confirmed Interviews", dualConfirmed, "text-primary-600")}
      {panelItem("Pending Reconciliation", pending, "text-warning-600")}
      {panelItem("Disputed Outcomes", disputed, "text-danger-600")}
    </div>
  );
};

export default NorthStarPanel;
