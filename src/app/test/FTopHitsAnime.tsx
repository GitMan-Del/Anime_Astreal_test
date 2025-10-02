import Image from "next/image";
import { Anime } from "@/types/anime";

type Props = {
  animeData: Anime[];
};


  // const Top_Hits_Anime = [
  //   "https://i.pinimg.com/736x/fe/cd/d0/fecdd0db6e4c0b5d648aa63f58082d77.jpg",
  //   "https://i.pinimg.com/1200x/a4/d1/58/a4d15849e80640fbabd848ef13e3a9eb.jpg",
  //   "https://i.pinimg.com/1200x/5e/af/3c/5eaf3c6435abf357b399ab4cba7f8bd9.jpg",
  //   "https://i.pinimg.com/736x/4c/32/2b/4c322b1dfe6b42185cb3c8f62d8772e7.jpg",
  // ]


const TopHitsAnime = ({ animeData }: Props) => {
  return (
    <div className="flex flex-col gap-3 w-full p-4">
      <div className="flex flex-row justify-between items-center pt-3">
        <h2 className="text-lg text-white font-normal">Top Hits Anime</h2>
        <button className="text-sm text-[#05c149]">See all</button>
      </div>

    {/* ✅ Wrapper scrollabil pe axa X */}
    
     <div className="flex gap-3 overflow-x-scroll max-w-full rounded-2xl ">
      {animeData.slice(0, 5).map((anime, index) => (
        <div
          key={anime.id}
          className=" h-[15rem] w-[12rem] rounded-2xl relative"
        >
            <div className="absolute bottom-0 left-5 text-4xl font-bold z-30">{` ${index + 1}`}
            </div>
             {/* <div className="bg-gradient-to-t w-full h-full from-0% to-50% from-black/90 to-transparent absolute top-0 right-0 z-20 rounded-2xl"></div>              */}
              <div className="absolute top-10 left-5 p-3 bg-[#05c149] font-bold z-30 text-xs rounded-xl ">{anime.rating}
              </div>
              <div>
           
                <Image
                  src={anime.cover_large}
                  alt={`cover ${anime.title}`}
                  width={250}
                  height={200}
                  className="object-contain size-full rounded-2xl"
                  />
              
                </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default TopHitsAnime;
