import { PropsWithChildren, ReactNode } from "react";

export interface ServiceSectionProps {
  title: string;
  icon?: ReactNode;
}

export default function ServiceSection(props: PropsWithChildren<ServiceSectionProps>) {
  return (
    <div className="py-2">
      {/* Section Header */}
      <div className="flex items-center space-x-2 px-4 mb-2 py-2 bg-[#0093DD]">
        <div className="flex flex-col space-y-1">
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </div>
        <h2 className="text-base font-bold text-white uppercase tracking-wide">
          {props.title}
        </h2>
        <div className="flex-grow h-px bg-white ml-4"></div>
      </div>

      {/* Scrollable Cards */}
      <div className="flex space-x-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
        {props.children}
      </div>
    </div>
  );
}
