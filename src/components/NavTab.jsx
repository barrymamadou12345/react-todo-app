import React from 'react'

export const NavTab = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { label: "Toutes", value: "all" },
    { label: " En attentes", value: "non_demarré" },
    { label: "En cours", value: "active" },
    { label: "Terminées", value: "completed" },
    { label: "Archivées", value: "archived" },
  ];

  return (
    <div className="flex gap-2 w-[43%] relative max-xl:w-[60%] bg-gray-200 rounded-lg max-lg:w-[70%] max-md:w-[96%] justify-center py-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`px-4 py-2 rounded-lg hover:bg-bl hover:text-blc font-sans font-semibold max-sm:text-xs max-sm:px-2 ${activeTab === tab.value ? "bg-bl text-white" : "bg-gray-200 text-black"}`}
          onClick={() => setActiveTab(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
