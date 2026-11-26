// src/components/EvidenceTooltip.tsx
import React, { useState } from "react";
import { Info } from "lucide-react";

interface Props {
  content: string; // text shown on hover / click
  children: React.ReactNode;
}

export const Tooltip: React.FC<Props> = ({ content, children }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen(!open);

  return (
    <span className="relative inline-block" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onClick={toggle}>
      {children}
      {open && (
        <div className="absolute z-10 w-64 p-2 mt-1 text-sm bg-white border rounded shadow-lg left-1/2 transform -translate-x-1/2">
          {content}
        </div>
      )}
      <Info size={14} className="inline-block ml-1 text-gray-400 cursor-pointer" />
    </span>
  );
};

export default Tooltip;
