// src/pages/Profile.tsx
import React from "react";
import { useAppState } from "../context/AppContext";

const Profile: React.FC = () => {
  const { state } = useAppState();
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Profile</h2>
      <p className="text-gray-700">User ID: {state.user.id}</p>
      <p className="text-gray-700">Role: {state.user.role}</p>
    </div>
  );
};

export default Profile;
