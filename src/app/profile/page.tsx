"use client"

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const interests = [
  "Action", "Drama", "Comedy", "Ecchi", "Adventure", "Mecha",
  "Romance", "Science", "Muzic", "School", "Seinen", "Shoujo",
  "Fantasy", "Mystary", "Vampire", "Isekai", "Shounen",
  "Television", "Superheros", "Magic", "Game", "Slice of Life"
];

export default function ProfilePage() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(item => item !== interest)
        : [...prev, interest]
    );
  };

  const isSelected = (interest: string) => selectedInterests.includes(interest);

  return (
    <div className="w-full h-[100dvh]">
      <div className="p-3 flex flex-col items-left justify-between h-full">
       {/* First div */}
       <div>
        <Link href="/oauth" className="z-30 flex flex-row gap-5 items-center py-5 ">
          <ArrowLeftIcon size={25} />
          <h1 className="text-2xl text-white font-medium">Choose your interest</h1>
        </Link>
        <p className="text-[#E0E0E0] mb-4">
          Choose your interests and get the best anime recommendations.
          Don&apos;t worry, you can always change it later.
        </p>
       </div>


       <div className="flex flex-wrap w-full gap-4 max-w-md  ">
          {interests.map((interest) => (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`px-5 py-2 rounded-2xl transition-all w-fit whitespace-nowrap text-center text-md ${
                isSelected(interest)
                  ? "bg-[#f0131f] text-white border-none"
                  : "text-[#f0131f] border border-[#f0131f] bg-transparent"
              }`}
            >
              {interest}
            </button>
          ))}
        </div>


          <div className="w-full flex flex-row gap-3 items-start">
            <button className="px-5 py-3 bg-gray-500 rounded-2xl w-full">Skip</button>
            <button className="px-5 py-3 bg-[#E50914] rounded-2xl w-full">Continue</button>
          </div>

      </div>
    </div>
  );
}
