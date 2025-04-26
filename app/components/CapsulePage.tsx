"use client";

import React, { useState } from "react";
import CapsuleCard from "./CapsuleCard";
import { useRouter } from "next/navigation";

type CapsuleStatus = "public" | "sent" | "received";

// Placeholder capsule data matching the CapsuleCard props
const placeholderCapsules = Array.from({ length: 30 }, (_, i) => ({
  name: `Surprise Capsule ${i + 1}`,
  description: "A special memory waiting to be discovered",
  timeCreated: `March ${Math.floor(Math.random() * 30) + 1}th, 2025 ${Math.floor(Math.random() * 12) + 1}:${Math.floor(Math.random() * 59) + 1}pm`,
  unveilTime: `${Math.floor(Math.random() * 10)} days, ${Math.floor(Math.random() * 23)} hours, ${Math.floor(Math.random() * 59)} minutes`,
  capsuleLink: "#",
  status: (["sent", "public", "received"] as const)[
    Math.floor(Math.random() * 3)
  ] as CapsuleStatus,
  imageSrc: "/images/capsuleCardImg.jpeg",
}));

const CapsulsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<CapsuleStatus>("sent");
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const router = useRouter();

  const filteredCapsules = placeholderCapsules.filter(
    (capsule) => capsule.status === activeTab,
  );

  const renderTabs = () => {
    const tabs: CapsuleStatus[] = ["public", "sent", "received"];
    return (
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`
              px-4 py-2 capitalize border-b
              ${
                activeTab === tab
                  ? "border-b-2 border-green-500 text-green-500"
                  : "text-gray-500"
              }
            `}
            onClick={() => setActiveTab(tab)}
          >
            {tab} Capsules
          </button>
        ))}
      </div>
    );
  };

  const renderPagination = () => {
    return (
      <div className="flex justify-end gap-12 items-center mt-8 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm">Items per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
            className="border rounded text-sm p-4"
          >
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
          </select>
        </div>
        <div className="text-gray-500 text-sm">1 of 5</div>
      </div>
    );
  };

  return (
    <div className="mx-auto px:12 md:mx-9">
      <div className="flex justify-between my-12">
        {renderTabs()}
        <button
          className="bg-gradient-to-r from-[#37945E] to-[#34D399] text-white px-4 py-2 rounded font-bold"
          onClick={() => router.push("/capsules/create-capsule")}
        >
          Create New Capsule
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {filteredCapsules.slice(0, itemsPerPage).map((capsule, index) => (
          <CapsuleCard
            key={index}
            name={capsule.name}
            description={capsule.description}
            timeCreated={capsule.timeCreated}
            unveilTime={capsule.unveilTime}
            capsuleLink={capsule.capsuleLink}
            status={capsule.status}
            imageSrc={capsule.imageSrc}
          />
        ))}
      </div>

      {renderPagination()}
    </div>
  );
};

export default CapsulsPage;
