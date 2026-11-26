// src/context/AppContext.tsx
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { Job, Company, Recruiter, Application, Interview, Notification, User, ApplicationEvent, NotificationPreferences } from "../types";
import { seedJobs, seedCompanies, seedRecruiters, seedApplications, seedInterviews } from "../mock/data.ts";

// ---------- State ----------
interface State {
  jobs: Job[];
  companies: Company[];
  recruiters: Recruiter[];
  applications: Application[];
  interviews: Interview[];
  notifications: Notification[];
  user: User;
  notificationPreferences: NotificationPreferences;
}

// ---------- Actions ----------
export type Action =
  | { type: "SET_ROLE"; payload: User["role"] }
  | { type: "APPLY_JOB"; payload: { jobId: string } }
  | { type: "ADD_EVENT"; payload: { appId: string; event: ApplicationEvent } }
  | { type: "CREATE_INTERVIEW"; payload: Interview }
  | { type: "UPDATE_INTERVIEW"; payload: Partial<Interview> & { id: string } }
  | { type: "UPDATE_INTERVIEW_CONFIRMATION"; payload: { id: string; seekerConfirmation?: boolean; recruiterConfirmation?: boolean } }
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "SET_NOTIFICATION_PREFERENCES"; payload: NotificationPreferences };

// ---------- Initial State ----------
const initialState: State = {
  jobs: [],
  companies: [],
  recruiters: [],
  applications: [],
  interviews: [],
  notifications: [],
  user: { id: "seeker1", role: "seeker" },
  notificationPreferences: { maxOptionalPerWeek: 3 },
};

// ---------- Reducer ----------
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, user: { ...state.user, role: action.payload } };

    case "APPLY_JOB": {
      const job = state.jobs.find((j) => j.id === action.payload.jobId);
      if (!job) return state;
      const newApp: Application = {
        id: `APP${Date.now()}`,
        jobId: job.id,
        seekerId: state.user.id,
        appliedAt: new Date().toISOString(),
        status: "applied",
        events: [
          {
            type: "applied",
            timestamp: new Date().toISOString(),
            source: "Seeker",
            description: "Application submitted",
          },
        ],
      };
      const notif: Notification = {
        id: `NOTIF${Date.now()}`,
        type: "application_submitted",
        message: `You applied for ${job.title}`,
        link: `/applications/${newApp.id}`,
        createdAt: new Date().toISOString(),
        read: false,
      };
      return {
        ...state,
        applications: [...state.applications, newApp],
        notifications: [notif, ...state.notifications],
      };
    }

    case "ADD_EVENT": {
      const { appId, event } = action.payload;
      const apps = state.applications.map((a) => {
        if (a.id !== appId) return a;
        const newEvents = [...a.events, event];
        return { ...a, status: event.type as Application["status"], events: newEvents };
      });
      return { ...state, applications: apps };
    }

    case "CREATE_INTERVIEW": {
      return { ...state, interviews: [...state.interviews, action.payload] };
    }

    case "UPDATE_INTERVIEW": {
      const { id, ...rest } = action.payload;
      const updated = state.interviews.map((i) => (i.id === id ? { ...i, ...rest } : i));
      return { ...state, interviews: updated };
    }

    case "UPDATE_INTERVIEW_CONFIRMATION": {
      const { id, seekerConfirmation, recruiterConfirmation } = action.payload;
      const updated = state.interviews.map((i) => {
        if (i.id !== id) return i;
        const newInterview = { ...i } as Interview;
        if (seekerConfirmation !== undefined) newInterview.seekerConfirmation = seekerConfirmation;
        if (recruiterConfirmation !== undefined) newInterview.recruiterConfirmation = recruiterConfirmation;
        // Derive status based on confirmations
        if (newInterview.seekerConfirmation && newInterview.recruiterConfirmation) {
          newInterview.status = "confirmed";
        } else if (newInterview.seekerConfirmation || newInterview.recruiterConfirmation) {
          newInterview.status = "pending"; // still waiting for the other side
        }
        return newInterview;
      });
      return { ...state, interviews: updated };
    }

    case "SET_NOTIFICATION_PREFERENCES": {
      return { ...state, notificationPreferences: action.payload };
    }

    case "ADD_NOTIFICATION": {
      const notif = action.payload;
      // optional throttling
      if (notif.optional) {
        const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
        const recentOptional = state.notifications.filter(
          (n) => n.optional && new Date(n.createdAt).getTime() >= weekAgo
        ).length;
        if (recentOptional >= state.notificationPreferences.maxOptionalPerWeek) {
          // skip adding this optional notification
          return state;
        }
      }
      return { ...state, notifications: [notif, ...state.notifications] };
    }

    default:
      return state;
  }
};

// ---------- Context ----------
const AppContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, (init) => {
    const persisted = localStorage.getItem("appState");
    if (persisted) {
      try {
        const parsed = JSON.parse(persisted) as State;
        return { ...init, ...parsed };
      } catch {}
    }
    return {
      ...init,
      jobs: seedJobs,
      companies: seedCompanies,
      recruiters: seedRecruiters,
      applications: seedApplications,
      interviews: seedInterviews,
    };
  });

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};

export const useAppState = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
};
