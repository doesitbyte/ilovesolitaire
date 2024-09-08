"use client";

import { useState } from "react";

interface TabProps {
  tabs?: string[];
  onTabChange?: (index: number) => void;
  activeTabDefault?: number;
}

export default function Tabs({
  tabs,
  onTabChange,
  activeTabDefault,
}: TabProps) {
  const [activeTab, setActiveTab] = useState(activeTabDefault || 0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    if (onTabChange) {
      onTabChange(index);
    }
  };

  return (
    <div className="w-full mx-auto bg-white">
      <div className="flex border-b border-gray-200">
        {Array.isArray(tabs) &&
          tabs.map((tab, index) => (
            <button
              key={index}
              className={`flex-1 py-2 px-4 text-center transition-colors duration-200 ${
                activeTab === index
                  ? "border-b-2 border-primary text-primary font-medium"
                  : "bg-gray-200 text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab}
            </button>
          ))}
      </div>
    </div>
  );
}
