"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Anime } from "@/types/anime";
import { Plus } from "lucide-react";
import { transformAnimeData } from "@/lib/utils/transformAnime";
import LogScreen from "@/app/components/Main/LogScreen";
export default function PlayerPage() {
  const { id } = useParams(); //

  const [anime, setAnime] = useState<Anime | null>(null);

  useEffect(() => {
    if (!id) return;

    // 🔹 Fetch detalii anime bazat pe id
    fetch(`https://api.jikan.moe/v4/anime/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // Aplică transformarea pentru a obține structura Anime cu câmpuri flat (webp_large etc.)
        const transformedAnime = transformAnimeData([data.data])[0];
        setAnime(transformedAnime);
        console.log("Anime transformed:", transformedAnime); // Debug: verifică structura
        console.log("WebP large URL:", transformedAnime.webp_large); // Specific pentru debug imagine
      })
      .catch((err) => console.error("Eroare fetch anime:", err));
  }, [id]);

  if (!anime) {
    return <LogScreen />;
  }

  return (
    <div className="w-full min-h-screen flex flex-col">
      <div className="w-full h-fit bg-amber-800  realtive">
        <div className="absolute top-0 left-0 w-full z-20 flex justify-between items-center p-4">
          <Link href="/home" className="z-30">
            <svg
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
          </Link>
          {/* Search */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="#E0E0E0"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="m16.893 16.92l3.08 3.08m-.889-8.419c0 4.187-3.383 7.581-7.556 7.581c-4.172 0-7.555-3.394-7.555-7.58C3.973 7.393 7.356 4 11.528 4c4.173 0 7.556 3.394 7.556 7.581Z"
            />
          </svg>
        </div>

        <Image
          src={anime.webp_large ?? "/placeholder_test.jpg"}
          width={300}
          height={200}
          alt={anime.title ?? "No Data"}
          className="object-cover w-full h-[17rem]"
        />
      </div>
      <div className="p-6 flex flex-col">
        <div className="w-full flex flex-row justify-between items-center">
          <h1 className="text-2xl font-semibold line-clamp-2">
            {anime.title ?? "".length > 30
              ? `${anime.title?.slice(0, 23)} ...`
              : anime.title}
          </h1>

          <div className="flex flex-row gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="#E0E0E0"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 5v14.586c0 .89 1.077 1.337 1.707.707L12 14l6.293 6.293c.63.63 1.707.184 1.707-.707V5a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2Z"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <path
                fill="#E0E0E0"
                d="m21.707 11.293l-8-8A1 1 0 0 0 12 4v3.545A11.015 11.015 0 0 0 2 18.5V20a1 1 0 0 0 1.784.62a11.456 11.456 0 0 1 7.887-4.049c.05-.006.175-.016.329-.026V20a1 1 0 0 0 1.707.707l8-8a1 1 0 0 0 0-1.414ZM14 17.586V15.5a1 1 0 0 0-1-1c-.255 0-1.296.05-1.562.085a14.005 14.005 0 0 0-7.386 2.948A9.013 9.013 0 0 1 13 9.5a1 1 0 0 0 1-1V6.414L19.586 12Z"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-row items-center gap-3 py-3 ">
          <div className="flex flex-row items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <defs>
               <linearGradient id="halfFill" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="50%" stopColor="#05C149" />
                  <stop offset="50%" stopColor="rgba(5,193,73,0.25)" />
                </linearGradient>
              </defs>
              <path
                fill="url(#halfFill)"
                d="M12 3L9.65 8.76L3.44 9.22L8.2 13.24L6.71 19.28L12 16L17.29 19.28L15.8 13.24L20.56 9.22L14.35 8.76L12 3Z"
              />
            </svg>
            <p className="text-[#05c149] text-2xs">{anime.score}</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="23"
              viewBox="0 0 24 24"
            >
              <path
                fill="#05c149"
                d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
              />
            </svg>
          </div>
          <p className="text-[#E0E0E0]">{anime.year}</p>
          <div className="flex flex-row items-center gap-3">
            <p className="p-2 border border-[#05c149] text-[#05c149] text-xs rounded-md px-3">
              {(anime.rating?.match(/\d+/)?.[0] || "") + "+"}
            </p>
            <p className="p-2 border border-[#05c149] text-[#05c149] text-xs rounded-md px-3 whitespace-nowrap">
              {anime.type}
            </p>
            <p className="p-2 border border-[#05c149] text-[#05c149] text-xs rounded-md px-3">
              Subtitle
            </p>
          </div>
        </div>
        <div className="w-full flex flex-row gap-2 mt-2">
          <button className="w-full px-5 py-2 text-sm bg-[#05c149] text-white rounded-full flex items-center justify-center gap-2 hover:cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M14.581 9.402C16.194 10.718 17 11.375 17 12.5c0 1.125-.806 1.783-2.419 3.098a23.1 23.1 0 0 1-1.292.99c-.356.25-.759.508-1.176.762c-1.609.978-2.413 1.467-3.134.926c-.722-.542-.787-1.675-.918-3.943A32.48 32.48 0 0 1 8 12.5c0-.563.023-1.192.06-1.833c.132-2.267.197-3.401.919-3.943c.721-.541 1.525-.052 3.134.926c.417.254.82.512 1.176.762a23.1 23.1 0 0 1 1.292.99Z"
              />
            </svg>
            Play
          </button>
          <button className="w-full px-5 py-2 text-sm border border-[#05c149] text-[#05c149] rounded-full justify-center flex items-center gap-2 hover:cursor-pointer">
            <Plus color="#05c149" />
            Add to my List
          </button>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <p className="text-[#E0E0E0] text-[14px] font-normal">
            <span className="font-medium">Genre:</span>{" "}
            {anime.genres?.map((g) => g.name).join(", ")}
            {anime.genres && anime.genres.length > 5 && ", ..."}
          </p>
          <p className="text-[#E0E0E0]">
            {anime.synopsis ?? "".length > 100
              ? `${anime.synopsis?.slice(0, 170)} ...`
              : "No data , no synopsis"}
          </p>
        </div>
      </div>
    </div>
  );
}
