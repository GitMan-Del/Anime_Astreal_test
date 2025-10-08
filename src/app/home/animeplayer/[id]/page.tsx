"use client";
import { useParams } from "next/navigation";
import { useState, useEffect , useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";

import { Anime } from "@/types/anime";
import { transformAnimeData } from "@/lib/utils/transformAnime";
import LogScreen from "@/app/components/Main/LogScreen";
import { supabase } from "@/lib/supabaseClient";

// Tipuri pentru entități
type DBEntities = {
  Anime: {
    id: number;
    mal_id: number;
    title?: string;
    cover?: string;
    created_at?: string;
  };
  Season: {
    id: number;
    anime_id: number;
    season_number: number;
    title?: string;
    created_at?: string;
  };
  Episode: {
    id: number;
    anime_id: number;
    season_id: number | null;
    episode_number: number;
    title?: string;
    thumbnail?: string;
    duration?: number;
    air_date?: string;
  };
  Source: {
    id: number;
    episode_id: number;
    source_url: string;
    quality?: string;
    type?: string;
    language?: string;
    priority?: number;
  };
};

export default function PlayerPage() {
  const { id } = useParams();
  const [anime, setAnime] = useState<Anime | null>(null);
  const [animeDB, setAnimeDB] = useState<DBEntities["Anime"] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [seasons, setSeasons] = useState<DBEntities["Season"][]>([]);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);
  const [episodes, setEpisodes] = useState<DBEntities["Episode"][]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [sources, setSources] = useState<DBEntities["Source"][]>([]);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // 1️⃣ Fetch anime din Supabase după mal_id
  useEffect(() => {
    if (!id) return;

    async function fetchAnimeFromDB() {
      try {
        const { data, error } = await supabase
          .from("anime")
          .select("*")
          .eq("mal_id", parseInt(id as string))
          .maybeSingle();

        if (error) throw error;
        if (!data) {
          setError("Anime-ul nu a fost găsit în baza de date.");
          return;
        }

        setAnimeDB(data);
      } catch (err) {
        console.error("Eroare Supabase:", err);
        setError("Eroare la conectarea cu baza de date.");
      }
    }

    fetchAnimeFromDB();
  }, [id]);

  // 2️⃣ Fetch date anime din Jikan API
  useEffect(() => {
    if (!id) return;

    async function fetchAnimeJikan() {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
        const json = await res.json();
        if (json.data) {
          const transformed = transformAnimeData([json.data])[0];
          setAnime(transformed);
        }
      } catch (err) {
        console.error("Eroare Jikan API:", err);
        setError("Eroare la încărcarea datelor anime.");
      }
    }

    fetchAnimeJikan();
  }, [id]);

  // 3️⃣ Fetch sezoane după anime_id
  useEffect(() => {
    if (!animeDB) return;

    async function fetchSeasons() {
      try {
        const { data, error } = await supabase
          .from("seasons")
          .select("*")
          .eq("anime_id", animeDB?.id)
          .order("season_number", { ascending: true });

        if (error) throw error;
        if (data && data.length > 0) {
          setSeasons(data);
          setSelectedSeason(data[0].id); // selectăm primul sezon
        }
      } catch (err) {
        console.error("Eroare la fetch sezoane:", err);
        setError("Eroare la încărcarea sezoanelor.");
      }
    }

    fetchSeasons();
  }, [animeDB]);

  // 4️⃣ Fetch episoade după season_id
  useEffect(() => {
    if (!selectedSeason) return;

    async function fetchEpisodes() {
      try {
        const { data, error } = await supabase
          .from("episodes")
          .select("*")
          .eq("season_id", selectedSeason)
          .order("episode_number", { ascending: true });

        if (error) throw error;
        if (data) {
          setEpisodes(data);
          setSelectedEpisode(data[0]?.id ?? null);
        }
      } catch (err) {
        console.error("Eroare la fetch episoade:", err);
        setError("Eroare la încărcarea episoadelor.");
      }
    }

    fetchEpisodes();
  }, [selectedSeason]);


  // 5️⃣ Fetch surse video din DB
  useEffect(() => {
    if (!selectedEpisode) return;

    async function fetchSources() {
      try {
        const { data, error } = await supabase
          .from("episode_sources")
          .select("*")
          .eq("episode_id", selectedEpisode)
          .order("priority", { ascending: true });

        if (error) throw error;
        setSources(data ?? []);
      } catch (err) {
        console.error("Eroare la fetch surse:", err);
        setError("Eroare la încărcarea surselor episodului.");
      }
    }

    fetchSources();
  }, [selectedEpisode]);

  // 6️⃣ Handle video playback (auto-play)
  useEffect(() => {
    const handleVideo = () => {
      const video = videoRef.current;
      if (!video) return;

      video.play().catch((err) => {
        console.warn("Nu pot reda video-ul automat:", err);
      });
    };

    handleVideo();

    return () => {
      if (videoRef.current) videoRef.current.pause();
    };
  }, [sources]);

  if (error) return <div>Eroare: {error}</div>;
  if (!anime || !animeDB) return <LogScreen />;


  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full h-fit realtive">
        <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-4">
          <Link href="/home" className="z-30">
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" >
              <path fill="none" stroke="#E0E0E0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 6s-6 4.419-6 6s6 6 6 6" color="currentColor" />
            </svg>
          </Link> {/* Search */}
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" >
            <path fill="none" stroke="#E0E0E0" strokeLinecap="round"
              strokeLinejoin="round" strokeWidth="1.5"
              d="m16.893 16.92l3.08 3.08m-.889-8.419c0 4.187-3.383 7.581-7.556 7.581c-4.172 0-7.555-3.394-7.555-7.58C3.973 7.393 7.356 4 11.528 4c4.173 0 7.556 3.394 7.556 7.581Z" />
          </svg>
        </div>

        <div className="flex flex-col items-center justify-center w-full">
      {sources.length > 0 ? (
        <iframe
          src={sources[0].source_url}
          allowFullScreen
          className="w-full h-[13rem] border-0"
        />
      ) : (
        <Image
          src={animeDB.cover ?? anime.webp_large}
          alt={anime.title ?? "No Data"}
          width={400}
          height={250}
          className="rounded-lg object-cover w-full h-[13rem]"
        />
      )}
    </div>

      </div>
      <div className="p-6 flex flex-col">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-2xl font-semibold line-clamp-2">
          {anime.title && anime.title.length > 30
          ? `${anime.title.slice(0, 23)} ...`
          : anime.title}
          </h1> <div className="flex flex-row gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" >
              <path fill="none" stroke="#E0E0E0" strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2" d="M4 5v14.586c0 .89 1.077 1.337 1.707.707L12 14l6.293 6.293c.63.63 1.707.184 1.707-.707V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z" /> </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" >
              <path fill="#E0E0E0" d="m21.707 11.293l-8-8A1 1 0 0 0 12 4v3.545A11.015 11.015 0 0 0 2 18.5V20a1 1 0 0 0 1.784.62a11.456 11.456 0 0 1 7.887-4.049c.05-.006.175-.016.329-.026V20a1 1 0 0 0 1.707.707l8-8a1 1 0 0 0 0-1.414ZM14 17.586V15.5a1 1 0 0 0-1-1c-.255 0-1.296.05-1.562.085a14.005 14.005 0 0 0-7.386 2.948A9.013 9.013 0 0 1 13 9.5a1 1 0 0 0 1-1V6.414L19.586 12Z" /> </svg>
          </div>
        </div>
        <div className="flex flex-row items-center gap-3 py-3 ">
          <div className="flex flex-row items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" >
              <defs> <linearGradient id="halfFill" x1="0" x2="1" y1="0" y2="0"> <stop offset="50%"
                stopColor="#05C149" /> <stop offset="50%" stopColor="rgba(5,193,73,0.25)" />
              </linearGradient> </defs>
              <path fill="url(#halfFill)" d="M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16L17.29 19.28L15.8 13.24L20.56 9.22L14.35 8.76L12 3Z" />
            </svg>
            <p className="text-[#05c149] text-2xs">{anime.score}</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" >
              <path fill="#05c149"
                d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z" />
            </svg> </div>
          <p className="text-[#E0E0E0]">{anime.year}</p>
          <div className="flex flex-row items-center gap-3">
            <p className="p-2 border border-[#05c149] text-[#05c149] text-xs rounded-md px-3">
              {(anime.rating?.match(/\d+/)?.[0] || "") + "+"} </p>
            <p className="p-2 border border-[#05c149] text-[#05c149] text-xs rounded-md px-3 whitespace-nowrap"> {anime.type} </p>
            <p className="p-2 border border-[#05c149] text-[#05c149] text-xs rounded-md px-3"> Subtitle </p> </div>
        </div>
        <div className="w-full flex flex-row gap-2 mt-2">
          <button className="w-full px-5 py-2 text-sm bg-[#05c149] text-white rounded-full flex items-center justify-center gap-2 hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" >
              <path fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.581 9.402C16.194 10.718 17 11.375 17 12.5c0 1.125-.806 1.783-2.419 3.098a23.1 23.1 0 0 1-1.292.99c-.356.25-.759.508-1.176.762c-1.609.978-2.413 1.467-3.134.926c-.722-.542-.787-1.675-.918-3.943A32.48 32.48 0 0 1 8 12.5c0-.563.023-1.192.06-1.833c.132-2.267.197-3.401.919-3.943c.721-.541 1.525-.052 3.134.926c.417.254.82.512 1.176.762a23.1 23.1 0 0 1 1.292.99Z" />
            </svg> Play
          </button>
          <button className="w-full px-5 py-2 text-sm border border-[#05c149] text-[#05c149] rounded-full justify-center flex items-center gap-2 hover:cursor-pointer">
            <Plus color="#05c149" /> Add to my List </button>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <p className="text-[#E0E0E0] text-[14px] font-normal">
            <span className="font-medium">Genre:</span>{" "}
            {anime.genres?.map((g) => g.name).join(", ")}
            {anime.genres && anime.genres.length > 5 && ", ..."}
          </p>
          <p className="text-[#E0E0E0]">
            {anime.synopsis && anime.synopsis.length > 100
              ? `${anime.synopsis.slice(0, 170)} ...`
              : anime.synopsis ?? "No data , no synopsis"}
          </p>
        </div>
      </div>

      <div className="w-full h-fit p-6">
       
        <div className="flex gap-3 mt-2 flex-row justify-between items-center">
        <p className="font-semibold">Episodes</p>
          {seasons.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSeason(s.id)}
              className={`text-[#05c149] text-sm`}
            >
              Sezonul {s.season_number}
            </button>
          ))}
        </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
        {episodes.map((ep) => (
          <div
            key={ep.id}
            onClick={() => setSelectedEpisode(ep.id)}
            className="relative cursor-pointer w-[190px] h-[150px] rounded-lg overflow-hidden transition"
          >
            <Image
              src={ep.thumbnail ?? "/placeholder_test.png"}
              alt={ep.title ?? ""}
              fill
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 w-full p-2">
            <div className="bg-gradient-to-t w-full h-full from-0% to-50% from-black to-transparent absolute top-0 right-0 z-20"></div>
              <p className="text-gray-200 text-sm z-40">Episodul {ep.episode_number}</p>
            </div>
          </div>
        ))}
      </div>

      </div>
    </div>
  );
}