// src/pages/Notifications.tsx
import React, { useState } from "react";
import { useAppState } from "../context/AppContext";
import { Notification } from "../types";

const Notifications: React.FC = () => {
  const { state, dispatch } = useAppState();
  const [maxPerWeek, setMaxPerWeek] = useState(state.notificationPreferences.maxOptionalPerWeek);

  const markRead = (id: string) => {
    // Simplified: replace first notification with read flag (real app would have UPDATE_NOTIFICATION)
    const notif = state.notifications.find((n) => n.id === id);
    if (!notif) return;
    const updated = { ...notif, read: true };
    dispatch({ type: "ADD_NOTIFICATION", payload: updated }); // using ADD_NOTIFICATION as a quick hack
  };

  const handlePrefSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_NOTIFICATION_PREFERENCES", payload: { maxOptionalPerWeek: Number(maxPerWeek) } });
    alert("Preferences saved");
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
      {state.notifications.length === 0 ? (
        <p className="text-gray-600">No notifications.</p>
      ) : (
        <ul className="space-y-2 mb-6">
          {state.notifications.map((n: Notification) => (
            <li
              key={n.id}
              className={`p-3 rounded border ${n.read ? "bg-gray-100" : "bg-white"}`}
            >
              <a href={n.link} className="font-medium text-primary-600">
                {n.message}
              </a>
              <span className="text-xs text-gray-500 block mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </span>
              {!n.read && (
                <button
                  onClick={() => markRead(n.id)}
                  className="mt-1 text-sm text-blue-600 underline"
                >
                  Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <section className="border p-4 rounded">
        <h3 className="text-lg font-medium mb-2">Notification Preferences</h3>
        <form onSubmit={handlePrefSave} className="flex items-center space-x-2">
          <label className="text-sm">Max optional notifications per week:</label>
          <input
            type="number"
            min={0}
            value={maxPerWeek}
            onChange={(e) => setMaxPerWeek(Number(e.target.value))}
            className="border rounded px-2 py-1 w-16"
          />
          <button type="submit" className="bg-primary-600 text-white px-3 py-1 rounded">
            Save
          </button>
        </form>
      </section>
    </div>
  );
};

export default Notifications;
