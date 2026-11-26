// src/components/JobSearchBar.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JobSearchBar: React.FC = () => {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [type, setType] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (keyword) query.set("q", keyword);
    if (location) query.set("loc", location);
    if (experience) query.set("exp", experience);
    if (type) query.set("type", type);
    navigate({ pathname: "/search", search: query.toString() });
  };

  return (
    <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
      <input
        type="text"
        placeholder="Job title, skills, company"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <input
        type="text"
        placeholder="Experience (e.g., 3-5 years)"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border rounded px-2 py-1"
      >
        <option value="">All Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </select>
      <button
        type="submit"
        className="bg-primary-600 text-white rounded px-4 py-2 md:col-span-4"
      >
        Search
      </button>
    </form>
  );
};

export default JobSearchBar;
