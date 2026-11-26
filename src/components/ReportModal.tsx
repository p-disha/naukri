// src/components/ReportModal.tsx
import React, { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAppState } from "../context/AppContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  jobId: string;
}

const categories = [
  "Request for payment or registration fee",
  "Suspicious external link",
  "Impersonation",
  "Misleading job information",
  "Other",
];

const ReportModal: React.FC<Props> = ({ isOpen, onClose, jobId }) => {
  const { dispatch } = useAppState();
  const [category, setCategory] = useState<string>(categories[0]);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app we'd send to backend. Here just add a notification.
    const notif = {
      id: `NOTIF${Date.now()}`,
      type: "job_reported",
      message: `Report submitted for job ${jobId}`,
      link: `/jobs/${jobId}`,
      createdAt: new Date().toISOString(),
      read: false,
    } as any;
    dispatch({ type: "ADD_NOTIFICATION", payload: notif });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose} className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" aria-hidden="true" />
          </Transition.Child>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="bg-white rounded max-w-md mx-auto p-6 relative z-20">
              {submitted ? (
                <div className="text-center">
                  <p className="text-green-600 font-medium">Report submitted. Thank you!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Dialog.Title className="text-lg font-medium mb-4">Report this job</Dialog.Title>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full border rounded p-2"
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Optional description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full border rounded p-2"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
                      Cancel
                    </button>
                    <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded">
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ReportModal;
