import React from "react";

interface ResponseCardProps {
  ip?: string;
  location?: {
    city: string;
    country: string;
  };
  timezone?: string;
  isp?: string;
}

export function ResponseCard({
  ip,
  location,
  timezone,
  isp,
}: ResponseCardProps) {
  return (
    <div className="flex flex-wrap justify-center bg-[#ffffff] rounded-lg p-15">
      <div className="w-[90%] md:w-80 md:h-32 lg:w-900 lg:h-120 flex flex-col justify-center items-center space-y-3 p-5">
        <span className="font-rubik text-[18px] text-[#969696]">
          IP Address
        </span>
        <span className="font-rubik text-[28px]">{ip}</span>
      </div>
      <div className="w-[90%] md:w-80 md:h-32 lg:w-900 lg:h-120 flex flex-col justify-center items-center space-y-3 p-5">
        <span className="font-rubik text-[18px] text-[#969696]">Location</span>
        <span className="font-rubik text-[28px]">
          {location?.city && location?.country
            ? `${location.city}, ${location.country}`
            : ""}
        </span>
      </div>
      <div className="w-[90%] md:w-80 md:h-32 lg:w-900 lg:h-120 flex flex-col justify-center items-center space-y-3 p-5">
        <span className="font-rubik text-[18px] text-[#969696]">Timezone</span>
        <span className="font-rubik text-[28px]">{timezone}</span>
      </div>
      <div className="w-[90%] md:w-80 md:h-32 lg:w-900 lg:h-120 flex flex-col justify-center items-center space-y-3 p-5">
        <span className="font-rubik text-[18px] text-[#969696]">ISP</span>
        <span className="font-rubik text-[28px]">{isp}</span>
      </div>
    </div>
  );
}
