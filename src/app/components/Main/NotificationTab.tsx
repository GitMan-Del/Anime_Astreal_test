"use client";

import { useState } from "react";
import Image from "next/image";

type NotificationProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

function NotificationTab({ isOpen, setIsOpen }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  if (!isOpen) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => setIsOpen(false), 300); // 300ms = durata fadeOut
  };

  const test = [
    {
      title: "Tokyo Ghoul (東京喰種トーキョーグール)",
      cover:
        "https://i.pinimg.com/1200x/67/a4/fd/67a4fd40689419fa11f90d600f37870c.jpg",
      rol: "Updated",
      episodes: "12",
    },
    {
      title: "Akame ga Kill!",
      cover:
        "https://i.pinimg.com/736x/3b/d0/fa/3bd0faafda7cc29ab99a1c5d515a7c41.jpg",
      rol: "Updated",
      episodes: "2",
    },
    {
      title: "Dororo to Hyakkimaru",
      cover:
        "https://i.pinimg.com/1200x/e6/39/61/e63961d3c8fb3579d6c3ea9f0ceb591b.jpg",
      rol: "New Release",
      episodes: "24",
    },
    {
      title: "Dororo to Hyakkimaru",
      cover:
        "https://i.pinimg.com/736x/89/1a/a2/891aa2d613efb419fd7d4e32afc03f97.jpg",
      rol: "New Release",
      episodes: "24",
    },
  ];

  return (
    <>
      <div
        className={`${
          isVisible ? "animate-fadeOut" : "animate-fadeIn"
        }  fixed top-0 right-0 w-full h-screen bg-[#0b0b0d] z-[200] p-5`}
      >
        <div className="flex flex-row gap-4 items-center mb-10">
          <svg
            onClick={handleClose}
            xmlns="http://www.w3.org/2000/svg"
            width="35"
            height="35"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#E0E0E0"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M15 6s-6 4.419-6 6s6 6 6 6"
              color="currentColor"
            />
          </svg>
          <p className="text-xl font-semibold">Notifications</p>
        </div>
        {/* Content */}
        <div className="flex flex-col gap-5 w-full items-start h-full overflow-y-scroll ">
          {test.map((test, index) => (
            <div
              key={index}
              className="flex flex-row max-h-[150px] w-full gap-2"
            >
              <Image
                src={test.cover}
                width={150}
                height={100}
                alt={`cover ${test.title}`}
                className="object-cover h-full rounded-2xl "
              />

              {/* TEXT */}
              <div className="flex flex-col justify-center px-2 gap-2 py-4">
                <p className="test-2xl font-semibold max-w-[10rem]">
                  {test.title}
                </p>
                <p>Episodes: {test.episodes}</p>
                <div className="bg-green-500/10 text-green-500/90 text-center rounded-md font-semibold text-xs p-2 w-fit">
                  <p>{test.rol}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NotificationTab;
