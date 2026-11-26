// src/mock/data.ts

import { Job, Company, Recruiter, Application, Interview } from "../types";

// Simple seed data for demonstration purposes
export const seedJobs: Job[] = [
  {
    id: "job-1",
    title: "Frontend Engineer",
    description: "Build modern UI using React and TypeScript.",
    location: "Bangalore, India",
    experience: "2-4 years",
    salary: "₹8-12 LPA",
    postedDate: new Date().toISOString(),
    companyId: "comp-1",
    freshness: "confirmed",
    freshnessInfo: { description: "Verified by recruiter" },
    type: "Full-time",
  },
  {
    id: "job-2",
    title: "Backend Engineer",
    description: "Design and implement REST APIs.",
    location: "Remote",
    experience: "3-5 years",
    salary: "₹10-15 LPA",
    postedDate: new Date().toISOString(),
    companyId: "comp-2",
    freshness: "not_confirmed",
    freshnessInfo: { description: "Pending verification" },
    type: "Full-time",
  },
];

export const seedCompanies: Company[] = [
  { id: "comp-1", name: "TechSoft", website: "https://techsoft.example.com", logoUrl: "", credibilityInfo: "Gold partner" },
  { id: "comp-2", name: "DataWorks", website: "https://dataworks.example.com", logoUrl: "", credibilityInfo: "Verified" },
];

export const seedRecruiters: Recruiter[] = [
  { id: "rec-1", name: "Anita Patel", companyId: "comp-1", profileUrl: "", credibilityInfo: "Top recruiter" },
  { id: "rec-2", name: "Rahul Singh", companyId: "comp-2", profileUrl: "", credibilityInfo: "Verified recruiter" },
];

export const seedApplications: Application[] = [
  {
    id: "app-1",
    jobId: "job-1",
    seekerId: "seeker-1",
    appliedAt: new Date().toISOString(),
    status: "applied",
    events: [],
  },
];

export const seedInterviews: Interview[] = [];
