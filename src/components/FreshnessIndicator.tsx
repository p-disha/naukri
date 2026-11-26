// src/components/FreshnessIndicator.tsx
import React from "react";
import { FreshnessState } from "../types";
import { Tooltip } from "./EvidenceTooltip";
import { CheckCircle, HelpCircle, XCircle } from "lucide-react";

interface Props {
  state: FreshnessState;
  info: string; // tooltip text
}

const FreshnessIndicator: React.FC<Props> = ({ state, info }) => {
  let label = "";
  let color = "text-gray-500";
  let Icon = HelpCircle;

  switch (state) {
    case "confirmed":
      label = "Active status confirmed";
      color = "text-success";
      Icon = CheckCircle;
      break;
    case "not_confirmed":
      label = "Activity not recently confirmed";
      color = "text-warning";
      Icon = HelpCircle;
      break;
    case "closed":
      label = "Position closed";
      color = "text-danger";
      Icon = XCircle;
      break;
  }

  return (
    <Tooltip content={info}>
      <span className={`inline-flex items-center space-x-1 ${color} text-sm`}>
        <Icon size={16} />
        <span>{label}</span>
      </span>
    </Tooltip>
  );
};

export default FreshnessIndicator;
