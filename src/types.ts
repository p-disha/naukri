// src/types.ts
/**
 * Central type definitions for the Naukri Confidence & Interview Bridge prototype.
 * These types are imported throughout the app (components, context, pages).
 */

export type FreshnessState = "confirmed" | "not_confirmed" | "closed";

export interface FreshnessInfo {
  description: string;
  source?: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  experience: string;
  salary?: string;
  postedDate: string;
  companyId: string;
  freshness: FreshnessState;
  freshnessInfo: FreshnessInfo;
  type: string; // e.g., "Full-time", "Contract"
}

export interface Company {
  id: string;
  name: string;
  website?: string;
  logoUrl?: string;
  credibilityInfo?: string;
}

export interface Recruiter {
  id: string;
  name: string;
  companyId: string;
  profileUrl?: string;
  credibilityInfo?: string;
}

export type ApplicationStatus =
  | "applied"
  | "viewed"
  | "shortlisted"
  | "interview_invited"
  | "interview_outcome_pending"
  | "closed"
  | "withdrawn";

export interface ApplicationEvent {
  type: ApplicationStatus; // reuse status as event type
  timestamp: string;
  source: string; // "Seeker" or "Recruiter"
  description: string;
}

export interface Application {
  id: string;
  jobId: string;
  seekerId: string;
  appliedAt: string;
  status: ApplicationStatus;
  events: ApplicationEvent[];
}

export type InterviewStatus = "pending" | "confirmed" | "disputed";

export interface Interview {
  id: string;
  applicationId: string;
  scheduledAt: string; // ISO string
  mode: string; // e.g., "Video Call"
  link: string; // URL to join
  status: InterviewStatus;
  seekerConfirmation?: boolean;
  recruiterConfirmation?: boolean;
}

export interface Notification {
  id: string;
  type: string; // arbitrary string identifier
  message: string;
  link: string; // route to navigate when clicked
  createdAt: string;
  read: boolean;
  // optional flag to identify optional (non‑transactional) notifications
  optional?: boolean;
}

export interface NotificationPreferences {
  maxOptionalPerWeek: number;
}

export interface User {
  id: string;
  role: "seeker" | "recruiter";
}

export interface State {
  jobs: Job[];
  companies: Company[];
  recruiters: Recruiter[];
  applications: Application[];
  interviews: Interview[];
  notifications: Notification[];
  user: User;
  notificationPreferences: NotificationPreferences;
}

export type Action =
  | { type: "SET_ROLE"; payload: User["role"] }
  | { type: "APPLY_JOB"; payload: { jobId: string } }
  | { type: "ADD_EVENT"; payload: { appId: string; event: ApplicationEvent } }
  | { type: "CREATE_INTERVIEW"; payload: Interview }
  | { type: "UPDATE_INTERVIEW"; payload: Partial<Interview> & { id: string } }
  | { type: "UPDATE_INTERVIEW_CONFIRMATION"; payload: { id: string; seekerConfirmation?: boolean; recruiterConfirmation?: boolean } }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "SET_NOTIFICATION_PREFERENCES"; payload: NotificationPreferences };
