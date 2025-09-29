import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth" 
import Image from "next/image"
import { Bell, PlayCircle, Plus, Search } from "lucide-react"
import NavBar from "../components/NavBar"
// import { LogOutbtn } from "../components/LogOutbtn"


export default async function TestPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/")
  }


  // Covers TEST 
  const Top_Hits_Anime = [
    "https://i.pinimg.com/736x/fe/cd/d0/fecdd0db6e4c0b5d648aa63f58082d77.jpg",
    "https://i.pinimg.com/1200x/a4/d1/58/a4d15849e80640fbabd848ef13e3a9eb.jpg",
    "https://i.pinimg.com/1200x/5e/af/3c/5eaf3c6435abf357b399ab4cba7f8bd9.jpg",
    "https://i.pinimg.com/736x/4c/32/2b/4c322b1dfe6b42185cb3c8f62d8772e7.jpg",
  ]

  const New_R = [
    "https://i.pinimg.com/1200x/0f/ef/d4/0fefd4037ba098b63d10bd7ad88a5447.jpg",
    "https://i.pinimg.com/736x/46/b3/d8/46b3d838bc25585ad92c3b51199ca490.jpg",
    "https://i.pinimg.com/736x/98/8e/1b/988e1b67ce865c4b518db7c2a9fcc586.jpg",
  ]

  return (
    <div className="flex items-start h-screen w-full flex-col relative">
      <NavBar/>
      <div className="w-full min-h-[300px] relative flex-col gap-2 flex items-start justify-between z-10 p-3" >
        <div className="z-50 inset-0 flex flex-row justify-between items-center w-full p-4">
          <Image src="/logo.svg" alt="logo" width={25} height={25} className="" />
          <div className="flex flex-row gap-5">
            <Search size={25} />
            <Bell />
          </div>
         </div>
        <Image src="/placeholder_test.png" alt="a" fill className="w-full h-full object-cover " />
        <div className="bg-gradient-to-t w-full h-full from-0% to-50% from-black/90 to-transparent absolute top-0 right-0 z-20"></div>
        <div className="flex-col gap-2 inset-0 z-30 p-2">
        <h1 className="text-white text-2xl font-medium">Demon Slayer: Kimetsu ...</h1>
        <p className="text-white/90 text-sm">Action , Shounen , Martial Art , Adventure , ...</p>
        <div className="flex flex-row gap-3">
          <button
            className="mt-5 w-fit px-5 rounded-full text-sm bg-[#05c149] text-white py-2 hover:cursor-pointer flex flex-row gap-3 items-center"
          >
            <PlayCircle size={20} />
            Play
          </button>
          <button
            className="mt-5 w-fit px-8 rounded-full text-sm bg-transparent border-2 text-white py-2 hover:cursor-pointer flex flex-row gap-3"
          >
            <Plus size={20} />
            My List
          </button>
        </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-3">
        <div className="flex flex-row justify-between items-center px-6 pt-3">
          <h2 className="text-lg text-white font-normal">Top Hits Anime</h2>
          <p className="text-sm text-[#05c149]">See all</p>
        </div>
        
        <div className="w-full flex flex-row gap-3 h-full overflow-scroll relative pl-6 p-1">
        { Top_Hits_Anime.map((src, index) => (
            <div className="h-fit relative z-20" key={index}>
            <Image
            src={src}
            alt={`covers  ${index + 1}`}
            width={200}
            height={250}
            className="rounded-2xl min-w-[200px] h-[250px] object-cover z-10" />
            <div className="absolute bottom-0 left-5 text-6xl font-bold z-30">{` ${index + 1}`}
            </div>     
            <div className="absolute top-5 left-5 p-2 bg-[#05c149] rounded-sm font-bold z-30 text-xs">{` ${index +  5 + 0.8 }`}
            </div>     
             <div className="bg-gradient-to-t w-full h-full from-0% to-50% from-black/90 to-transparent absolute top-0 right-0 z-20 rounded-b-[15px]"></div>             
            </div>
          ))}
        </div>
      </div>

      {/* New Episodes Releases  */}
      <div className="flex flex-col w-full gap-3">
        <div className="flex flex-row justify-between items-center px-6 pt-3">
          <h2 className="text-lg text-white font-normal">New Episodes Releases</h2>
          <p className="text-sm text-[#05c149]">See all</p>
        </div>
        
        <div className="w-full flex flex-row gap-3 h-full overflow-scroll relative pl-6 p-1">
        { New_R.map((src, index) => (
            <div className="h-fit relative z-20" key={index}>
            <Image
            src={src}
            alt={`covers  ${index + 1}`}
            width={200}
            height={250}
            className="rounded-2xl min-w-[200px] h-[250px] object-cover z-10" />   
            <div className="absolute top-5 left-5 p-2 bg-[#05c149] rounded-sm font-bold z-30 text-xs">{` ${index +  5 + 0.8 }`}
            </div>     
             <div className="bg-gradient-to-t w-full h-full from-0% to-50% from-black/90 to-transparent absolute top-0 right-0 z-20 rounded-b-[15px]"></div>             
            </div>
          ))}
        </div>

      </div>



      {/* <LogOutbtn /> */}
    </div>
  )
}
