"use client";

import Image from "next/image";
import { Anime } from "@/types/anime";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { transformAnimeData } from "@/lib/utils/transformAnime";
import { supabase } from "@/lib/supabaseClient";
import LogScreen from "./LogScreen";

const TopHitsAnime = () => {
  
  
  const router = useRouter();
  const [animeData, setAnimeData] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleClick = (anime: Anime) => {
    router.push(`/home/animeplayer/${anime.id}`); 
  };

  useEffect(() => {
    const fetchAllAnime = async () => {
      try {
        const { data: dbData, error } = await supabase
          .from("anime")
          .select("mal_id");

        if (error) {
          console.error("Eroare Supabase:", error.message, error.code);
          setError(error.message);
          return;
        }

        if (!dbData || dbData.length === 0) return;

        const malIds = dbData.map((item) => item.mal_id);

        const fetches = malIds.map(async (id) => {
          const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
          const json = await res.json();
          return json.data;
        });

        const animeFromAPI = await Promise.all(fetches);

        setAnimeData(transformAnimeData(animeFromAPI));
      } catch (err) {
        console.error("Eroare neașteptată:", err);
        setError("Eroare la fetch anime-uri");
      }
    };

    fetchAllAnime();
  }, []);

 
  if (error) {
    return <LogScreen />
  }

  if (!animeData) {
    return <LogScreen />
  }


  return (
    <div className="flex flex-col gap-3 w-full p-4">
      <div className="flex flex-row justify-between items-center pt-3">
        <h2 className="text-lg text-white font-normal">Top Hits Anime</h2>
        <button className="text-sm text-[#05c149]">See all</button>
      </div>

      {/* ✅ Wrapper scrollabil pe axa X */}

      <div className="flex gap-3 overflow-x-scroll max-w-full rounded-2xl flex-nowrap scroll-smooth ">
        {animeData.slice(0, 10).map((anime, index) => (
          <div
            onClick={() => handleClick(anime)}
            key={anime.id}
            className="flex-shrink-0 w-[12rem] h-fit rounded-2xl relative hover:cursor-pointer overflow-hidden"
          >
            <div className="absolute bottom-0 left-5 text-4xl font-bold z-30">
              {` ${index + 1}`}
            </div>
            <div className="bg-gradient-to-t w-full h-full from-0% to-50% from-black/90 to-transparent absolute top-0 right-0 z-20 rounded-2xl"></div>
            <div className="absolute top-2 left-2 p-2 bg-[#05c149] font-bold z-30 text-xs rounded-xl ">
              {anime.score}
            </div>
            <div>
              <Image
                src={anime.webp_large}
                alt={`cover ${anime.title}`}
                width={250}
                height={200}
                className="object-cover w-[15rem] h-[16rem] rounded-2xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopHitsAnime;
