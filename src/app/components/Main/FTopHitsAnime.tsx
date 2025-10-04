import Image from "next/image";
import { Anime } from "@/types/anime";
import { useRouter } from "next/navigation";

type Props = {
  animeData: Anime[];
};


const TopHitsAnime = ({ animeData }: Props) => {
  const router = useRouter();
  
  const handleClick = (anime: Anime) => {
     router.push(
       `home/animeplayer/${anime?.id}?title=${encodeURIComponent(anime?.title)}&img=${encodeURIComponent(anime.webp_large)}`
     );
   };

  return (
    <div className="flex flex-col gap-3 w-full p-4">
      <div className="flex flex-row justify-between items-center pt-3">
        <h2 className="text-lg text-white font-normal">Top Hits Anime</h2>
        <button className="text-sm text-[#05c149]">See all</button>
      </div>

    {/* ✅ Wrapper scrollabil pe axa X */}
    
     <div className="flex gap-3 overflow-x-auto max-w-full rounded-2xl flex-nowrap scroll-smooth ">
      {animeData.slice(0, 10).map((anime, index) => (
        <div
          onClick={(() => handleClick(anime))}
          key={anime.id}
          className="flex-shrink-0 w-[12rem] h-[16rem] rounded-2xl relative hover:cursor-pointer"
        >
            <div className="absolute bottom-0 left-5 text-4xl font-bold z-30">{` ${index + 1}`}
            </div>
             <div className="bg-gradient-to-t w-full h-full from-0% to-50% from-black/90 to-transparent absolute top-0 right-0 z-20 rounded-2xl"></div>             
              <div className="absolute top-2 left-2 p-2 bg-[#05c149] font-bold z-30 text-xs rounded-xl ">{anime.rating}
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