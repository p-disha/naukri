// src/components/RecruiterCredibilityCard.tsx
import React from "react";
import { Company, Recruiter } from "../types";
import { Building2, UserCheck, ShieldCheck, ExternalLink } from "lucide-react";

interface Props {
  company: Company;
  recruiter: Recruiter;
}

const RecruiterCredibilityCard: React.FC<Props> = ({ company, recruiter }) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-xs">
      <div className="flex items-center space-x-2 mb-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600" />
        <h4 className="text-base font-bold text-gray-900">Credibility &amp; Trust Transparency</h4>
      </div>

      <div className="space-y-3">
        {/* Company Row */}
        <div className="flex items-start justify-between p-2.5 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{company.name}</p>
              <p className="text-xs text-gray-500">{company.credibilityInfo || "Verified Employer Entity"}</p>
            </div>
          </div>
          {company.website && (
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-primary-600 hover:text-primary-800 flex items-center space-x-1"
            >
              <span>Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Recruiter Row */}
        <div className="flex items-start justify-between p-2.5 bg-white rounded-lg border border-gray-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{recruiter.name}</p>
              <p className="text-xs text-gray-500">{recruiter.credibilityInfo || "Active Hiring Partner • Fast Responder"}</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
            Verified Partner
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecruiterCredibilityCard;
