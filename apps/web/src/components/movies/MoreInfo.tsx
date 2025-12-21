"use client";

import React from "react";

interface MoreInfoProps {
  content: string;
}

const MoreInfo: React.FC<MoreInfoProps> = ({ content }) => {
  return (
    <div className="px-6 py-12">
      <div className="bg-[#46444430] rounded-[40px] p-10 border border-[#46444450]">
        <h2 className="text-[2.25rem] font-medium text-[#FAAA47] mb-6">More Info</h2>
        <p className="text-[#CAC1C1] text-xl leading-relaxed">
          {content}
        </p>
      </div>
    </div>
  );
};

export default MoreInfo;
