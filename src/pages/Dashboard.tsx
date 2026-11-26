// src/pages/Dashboard.tsx
import React from "react";
import NorthStarPanel from "../components/NorthStarPanel";

const Dashboard: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Recruiter Dashboard</h2>
      <NorthStarPanel />
      <p className="text-gray-600">Use the navigation bar to manage candidates, interviews, and more.</p>
    </div>
  );
};

export default Dashboard;
