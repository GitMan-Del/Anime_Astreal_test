"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Bell, PlayCircle, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import LogScreen from "../components/LogScreen";
import FTopHitsAnime from "../test/FTopHitsAnime";
import { transformAnimeData } from "@/lib/utils/transformAnime";
import { Anime, JikanRawAnime } from "@/types/anime";
import NavBar from "../components/NavBar";

type Props = {
  animeData: Anime[];
};


export default function TestPage( animeData: Props ) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [animeData2, setAnimeData] = useState<Anime[]>([]);
  
  useEffect(() => {
    const fetchAnime = async () => {
      const res = await fetch("https://api.jikan.moe/v4/top/anime?sfw");
      const json = await res.json();
      const raw: JikanRawAnime[] = json.data;
      setAnimeData(transformAnimeData(raw));
    };

    fetchAnime();
  }, []);



  

  useEffect(() => {
    if (status !== "loading" && !session) router.push("/");
  }, [session, status, router]);

  if (status === "loading") return <LogScreen />;
  if (!session) return null;



  return (
    <div className="flex flex-col min-h-screen w-full bg-transparent">
      {/* ✅ Navigation */}
      <NavBar />

      {/* ✅ Hero Section */}
      <div className="w-full min-h-[20rem] relative flex flex-col justify-end px-4 pb-6">
        {/* 🔲 Imagine fundal */}
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
            <Search size={24} />
            <Bell size={24} className="cursor-pointer" />
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
          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 text-sm bg-[#05c149] text-white rounded-full flex items-center gap-2 hover:cursor-pointer">
              <PlayCircle size={16} />
              Play
            </button>
            <button className="px-5 py-2 text-sm border-2 border-white text-white rounded-full flex items-center gap-2 hover:cursor-pointer">
              <Plus size={16} />
              My List
            </button>
          </div>
        </div>
      </div>  

      {/* ✅ Scrollable anime list */}
      
        <FTopHitsAnime animeData={animeData2} />
        

      {/* ✅ Secțiune de test */}
      <div className="w-full h-[100px] p-3 z-50"></div>
    </div>
  );
}
