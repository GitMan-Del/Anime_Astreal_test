"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import {   Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LogScreen from "../components/Main/LogScreen";
import FTopHitsAnime from "../components/Main/FTopHitsAnime";
import { transformAnimeData } from "@/lib/utils/transformAnime";
import { Anime, JikanRawAnime } from "@/types/anime";
import NavBar from "../components/NavBar";



export default function TestPage( ) {
  
// API LOGIC
  const { data: session, status } = useSession();
  const router = useRouter();
  const [animeData2, setAnimeData] = useState<Anime[]>([]);
  // Notification TAB
  const [isNotifications , setNotifications] = useState(false);
  const test = [
    {
      title: "Tokyo Ghoul (東京喰種トーキョーグール)",
      cover: "https://i.pinimg.com/1200x/67/a4/fd/67a4fd40689419fa11f90d600f37870c.jpg",
      rol: "Updated",
      episodes: "12",
    },
    {
      title: "Akame ga Kill!",
      cover: "https://i.pinimg.com/736x/3b/d0/fa/3bd0faafda7cc29ab99a1c5d515a7c41.jpg",
      rol: "Updated",
      episodes: "2",
    },
    {
      title: "Dororo to Hyakkimaru",
      cover: "https://i.pinimg.com/1200x/e6/39/61/e63961d3c8fb3579d6c3ea9f0ceb591b.jpg",
      rol: "New Release",
      episodes: "24",
    },
    {
      title: "Dororo to Hyakkimaru",
      cover: "https://i.pinimg.com/736x/89/1a/a2/891aa2d613efb419fd7d4e32afc03f97.jpg",
      rol: "New Release",
      episodes: "24",
    },
  ]

  useEffect(() => {
    const fetchAnime = async () => {
      const res = await fetch("https://api.jikan.moe/v4/top/anime?sfw");
      const json = await res.json();
      const raw: JikanRawAnime[] = json.data;
      setAnimeData(transformAnimeData(raw));
    };

    fetchAnime();
  }, []);

  // Auth LOGIC
  useEffect(() => {
    if (status !== "loading" && !session) router.push("/");
  }, [session, status, router]);

  if (status === "loading") return <LogScreen />;
  if (!session) return null;

  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent">
      <NavBar />

      {/* Hero Section */}
      <div className="w-full min-h-[20rem] relative flex flex-col justify-end px-4 pb-6">
        {/* Imagine fundal */}
        <Image
          src="https://i.pinimg.com/736x/2e/24/0c/2e240caa1bc0781b3ee8f8f47e76b499.jpg"
          alt="hero"
          fill
          className="object-cover w-full h-full"
        />

        {/* 🔲 Gradient negru peste imagine */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent z-10" />

        {/* 🔲 Logo și iconițe */}
        <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-4">
          <Image src="/logo.svg" alt="logo" width={25} height={25} />
          <div className="flex gap-4">
            {/* Search */}
           <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="#E0E0E0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m16.893 16.92l3.08 3.08m-.889-8.419c0 4.187-3.383 7.581-7.556 7.581c-4.172 0-7.555-3.394-7.555-7.58C3.973 7.393 7.356 4 11.528 4c4.173 0 7.556 3.394 7.556 7.581Z"/></svg>
            {/* Bell */}
            <svg  onClick={(() => setNotifications(prev => !prev))}
            className="hover:cursor-pointer transition-all duration-200 hover:scale-105 hover:rotate-1"
            xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="#E0E0E0"><g fill="none" stroke="#E0E0E0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M11.962 17.986h6.81a1.555 1.555 0 0 0 1.512-2.175c-.36-1.088-1.795-2.393-1.795-3.677c0-2.85 0-3.6-1.404-5.276a5.025 5.025 0 0 0-1.653-1.283l-.783-.38a1.089 1.089 0 0 1-.511-.73a2.023 2.023 0 0 0-2.176-1.707a2.023 2.023 0 0 0-2.12 1.707a1.089 1.089 0 0 1-.567.73l-.783.38A5.025 5.025 0 0 0 6.84 6.858c-1.403 1.676-1.403 2.426-1.403 5.276c0 1.284-1.37 2.458-1.73 3.611c-.217.697-.337 2.241 1.48 2.241z"/><path d="M15.225 17.986a3.198 3.198 0 0 1-3.263 3.263A3.195 3.195 0 0 1 8.7 17.986"/></g></svg>
          </div>
        </div>

        {/* 🔲 Text și butoane */}
        <div className="z-30 relative">
          <h1 className="text-white text-2xl font-bold">
            Jujutsu Kaisen
          </h1>
          <p className="text-white/90 text-xs mt-1">
            Acțiune, Supranatural, Horror, Fantasy, Shounen
          </p>
          <div className="flex gap-4 mt-4">
            <button className="px-5 py-2 text-sm bg-[#05c149] text-white rounded-full flex items-center gap-2 hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.581 9.402C16.194 10.718 17 11.375 17 12.5c0 1.125-.806 1.783-2.419 3.098a23.1 23.1 0 0 1-1.292.99c-.356.25-.759.508-1.176.762c-1.609.978-2.413 1.467-3.134.926c-.722-.542-.787-1.675-.918-3.943A32.48 32.48 0 0 1 8 12.5c0-.563.023-1.192.06-1.833c.132-2.267.197-3.401.919-3.943c.721-.541 1.525-.052 3.134.926c.417.254.82.512 1.176.762a23.1 23.1 0 0 1 1.292.99Z"/></svg>
              Play
            </button>
            <button className="px-5 py-2 text-sm border-2 border-white text-white rounded-full flex items-center gap-2 hover:cursor-pointer">
              <Plus size={16} />
              My List
            </button>
          </div>
        </div>
      </div>  
      
      <FTopHitsAnime animeData={animeData2} />
      <FTopHitsAnime animeData={animeData2} />
      <FTopHitsAnime animeData={animeData2} />
        
      {isNotifications && (
        <div className="animate-fadeIn fixed top-0 right-0 w-full h-screen bg-[#0b0b0d] z-[200] p-5">
            <div className="flex flex-row gap-4 items-center mb-10">
               <svg 
               onClick={(() => setNotifications(prev => !prev))}
               xmlns="http://www.w3.org/2000/svg"
               width="35"height="35"  viewBox="0 0 24 24"><path fill="none" stroke="#E0E0E0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 6s-6 4.419-6 6s6 6 6 6" color="currentColor"/></svg>
              <p className="text-xl font-semibold">Notifications</p>
            </div>
          {/* Content */}
             <div className="flex flex-col gap-5 w-full items-start h-full overflow-y-scroll ">
              {test.map(( test , index) => (
              <div key={index} className="flex flex-row max-h-[150px] w-full gap-2">
                <Image
                src={test.cover}
                width={150}
                height={100}
                alt={`cover ${test.title}`}
                className="object-cover rounded-2xl h-full"/> 

              {/* TEXT */}
                <div className="flex flex-col justify-center px-2 gap-2 py-4">
                  <p className="test-2xl font-semibold max-w-[10rem]">{test.title}</p>
                  <p>Episodes: {test.episodes}</p>
                  <div className="bg-green-500/10 text-green-500/90 text-center rounded-md font-semibold text-xs p-2 w-fit">
                  <p>{test.rol}</p>
                  </div>
                </div>
              </div>
              ))}
             </div>
        </div>
      )}
      {/* Secțiune de test */}
      <div className="w-full h-[100px] p-3 z-50"></div>
    </div>
  );
}
