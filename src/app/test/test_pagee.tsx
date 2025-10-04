"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeftIcon, Bell, MoreHorizontal, PlayCircle, Plus, Search } from "lucide-react"
import NavBar from "../components/NavBar"
import { useState , useEffect } from "react"
import { LogOutbtn } from "../components/Main/LogOutbtn"
import { useSession } from "next-auth/react"
import LogScreen from "../components/Main/LogScreen"

export default function TestPage() {
   const { data: session, status } = useSession()
   const router = useRouter()
    // Notification Slider
   const [ is , set] = useState(false);
   const [ isOpen , setIsOpen] = useState(false)
  
    useEffect(() => {
      if (status !== "loading" && !session) {
        router.push("/")
      }
    }, [session, status, router])
  
    if (status === "loading") {
      return <LogScreen/>
    }
  
    if (!session) {
      return null
    }

  // Covers TEST PlaceHolders
  const Top_Hits_Anime = [
    "https://i.pinimg.com/736x/fe/cd/d0/fecdd0db6e4c0b5d648aa63f58082d77.jpg",
    "https://i.pinimg.com/1200x/a4/d1/58/a4d15849e80640fbabd848ef13e3a9eb.jpg",
    "https://i.pinimg.com/1200x/5e/af/3c/5eaf3c6435abf357b399ab4cba7f8bd9.jpg",
    "https://i.pinimg.com/736x/4c/32/2b/4c322b1dfe6b42185cb3c8f62d8772e7.jpg",
  ]

  // New Episodes Releases PlaceHolders  
  const New_R = [
    "https://i.pinimg.com/1200x/0f/ef/d4/0fefd4037ba098b63d10bd7ad88a5447.jpg",
    "https://i.pinimg.com/736x/46/b3/d8/46b3d838bc25585ad92c3b51199ca490.jpg",
    "https://i.pinimg.com/736x/98/8e/1b/988e1b67ce865c4b518db7c2a9fcc586.jpg",
  ]

 const Notifications = [
  {
    src: "https://i.pinimg.com/736x/b0/13/74/b01374fc3ec47a79e777d2199d206c8f.jpg",
    title: "Haikyuu!!: Karasuno vs Shiratorizawa",
    role: "Updated"
  },
  {
    src: "https://i.pinimg.com/736x/b0/13/74/b01374fc3ec47a79e777d2199d206c8f.jpg",
    title: "Haikyuu!!: Karasuno vs Shiratorizawa",
    role: "Updated"
  },
  {
    src: "https://i.pinimg.com/1200x/e6/39/61/e63961d3c8fb3579d6c3ea9f0ceb591b.jpg",
    title: "Dororo to Hyakkimaru",
    role: "New Release"
  },
  {
    src: "https://i.pinimg.com/736x/3b/d0/fa/3bd0faafda7cc29ab99a1c5d515a7c41.jpg",
    title: "Akame ga Kill!",
    role: "New Release"
  },
  {
    src: "https://i.pinimg.com/1200x/67/a4/fd/67a4fd40689419fa11f90d600f37870c.jpg",
    title: "Tokyo Ghoul (東京喰種トーキョーグール)",
    role: "Updated"
  },
  {
    src: "https://i.pinimg.com/736x/6f/e7/ce/6fe7ce69d70e42c66cd61952dce6058e.jpg",
    title: "WIND BREAKER",
    role: "Updated"
  },
  {
    src: "https://i.pinimg.com/736x/7d/8a/2d/7d8a2dc3d604bf93fc903f24916269ed.jpg",
    title: "The Rising of the Shield Hero: Sea...",
    role: "New Release"
  }
];


  return (
    <>

    {isOpen && (
          <div className="w-full h-full top-0 right-0 fixed z-[2000] bg-[#0b0b0d]">
             <div className="flex flex-row justify-between p-3 items-center">
                    <div className="flex flex-row gap-3 items-center">
                      <ArrowLeftIcon onClick={(() => setIsOpen(prev => !prev))} size={25} className="hover:cursor-pointer"/>
                      <p className="text-2xl font-bold">Notifications</p>
                    </div>
                   <button className="w-8 h-8 rounded-full bg-transparent border flex justify-center items-center">
                    <Search />
                    </button>
                  </div>
          <div className="w-full flex flex-col gap-3 h-full overflow-scroll relative pl-6 p-1">
            { Top_Hits_Anime.map((src, index) => (
                <div className="h-fit relative z-20" key={index}>
                <Image
                src={src}
                alt={`covers  ${index + 1}`}
                width={200}
                height={250}
                className="rounded-2xl min-w-[150px] h-[250px] object-cover relative z-10" />
                <div className="absolute bottom-0 left-5 text-4xl font-bold z-30">{` ${index + 1}`}
                </div>     
                <div className="absolute top-5 left-3 p-2 bg-[#05c149] rounded-sm font-bold z-30 text-xs">{` ${index +  5 + 0.8 }`}
                </div>     
                <div className="bg-gradient-to-t w-full h-full from-0% to-50% from-black/90 to-transparent absolute top-0 right-0 z-20 rounded-b-[15px]"></div>             
                </div>
            ))}
            </div>
        </div>
    )}


    <div className={`flex items-start h-screen w-full flex-col relative`}>
     {is && (
    <div className="fixed overflow-scroll w-full h-screen top-0 right-0 z-[300] bg-[#0b0b0d] p-3">
      <div className="flex flex-row justify-between p-3 items-center">
        <div className="flex flex-row gap-3 items-center">
          <ArrowLeftIcon  onClick={(() => set(prev => !prev))}  size={25} className="hover:cursor-pointer"/>
          <p className="text-2xl font-bold">Notifications</p>
        </div>
        <button className="w-8 h-8 rounded-full bg-transparent border flex justify-center items-center">
        <MoreHorizontal />
        </button>
      </div>
    {Notifications.map((Notifications, index) => (
      <div key={index} className="w-full flex flex-row justify-between z-[1000000]">
        <div className="flex w-full  flex-row gap-5 mt-5">
        <Image
            src={Notifications.src}
            alt={`covers  ${index + 1}`}
            width={200}
            height={250}
            className="rounded-2xl w-[300px] h-[150px] object-cover z-10" />
            <div className="flex flex-row justify-between w-full">

          <div className="flex flex-col justify-around p-1 items-start">
            <h2 className="text-lg font-semibold max-w-[150px]">{Notifications.title}</h2>
            <p className="text-2xs text-[#E0E0E0]">Episodes: 1028</p>
            <div className="bg-green-500/10 text-green-500/50 text-center rounded-2xl font-semibold text-xs p-2 w-fit">
              <p className="text-2xs">{Notifications.role}</p>
            </div>
          </div>
          <p className="text-xs mt-5 text-[#E0E0E0]">{`${index + 1}/12/2024 `}</p>
            </div>
        </div>  
      </div>
    ))}
    </div>
     )}

      <NavBar/> 
       <LogOutbtn />
      <div className="w-full min-h-[400px] relative flex-col gap-2 flex items-start justify-between z-10 p-3" >
        <div className="z-50 inset-0 flex flex-row justify-between items-center w-full p-4">
          <Image src="/logo.svg" alt="logo" width={25} height={25} className="" />
          <div className="flex flex-row gap-5">
            <Search size={25} />
            <Bell onClick={(() => set(prev => !prev))} className="hover:cursor-pointer"/>
          </div>
         </div>
        <Image src="/placeholder_test.png" alt="a" fill className="w-full h-full object-cover " />
        <div className="bg-gradient-to-t w-full h-full from-0% to-50% from-black/90 to-transparent absolute top-0 right-0 z-20"></div>
        <div className="flex-col gap-2 inset-0 z-30 p-2 mt-3">
        <h1 className="text-white text-2xl font-bold">Demon Slayer: Kimetsu..</h1>
        <p className="text-white/90 text-2xs">Action , Shounen , Martial Art , Adventure</p>
        <div className="flex flex-row gap-3">
          <button
            className="mt-5 w-fit px-3 rounded-full text-sm bg-[#05c149] text-white py-2 hover:cursor-pointer flex flex-row gap-2 items-center"
          >
            <PlayCircle size={15} />
            Play
          </button>
          <button
            className="mt-5 w-fit px-7 rounded-full text-sm bg-transparent border-2 text-white py-2 hover:cursor-pointer flex flex-row gap-2 items-center"
          >
            <Plus size={15} />
            My List
          </button>
        </div>
        </div>
      </div>

      <div className="flex flex-col w-full gap-3">
        <div className="flex flex-row justify-between items-center px-6 pt-3">
          <h2 className="text-lg text-white font-normal">Top Hits Anime</h2>
          <button onClick={(() => setIsOpen(prev => !prev))} className="text-sm text-[#05c149]">See all</button>
        </div>
        
        <div className="w-full flex flex-row gap-3 h-full overflow-scroll relative pl-6 p-1">
        { Top_Hits_Anime.map((src, index) => (
            <div className="h-fit relative z-20" key={index}>
            <Image
            src={src}
            alt={`covers  ${index + 1}`}
            width={200}
            height={250}
            className="rounded-2xl min-w-[150px] h-[200px] object-cover z-10" />
            <div className="absolute bottom-0 left-5 text-4xl font-bold z-30">{` ${index + 1}`}
            </div>     
            <div className="absolute top-5 left-3 p-2 bg-[#05c149] rounded-sm font-bold z-30 text-xs">{` ${index +  5 + 0.8 }`}
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
            className="rounded-2xl min-w-[150px] h-[200px] object-cover z-10" />   
            <div className="absolute top-5 left-5 p-2 bg-[#05c149] rounded-sm font-bold z-30 text-xs">{` ${index +  6 + 0.5 }`}
            </div>     
             <div className="bg-gradient-to-t w-full h-full from-0% to-50% from-black/90 to-transparent absolute top-0 right-0 z-20 rounded-b-[15px]"></div>             
            </div>
          ))}
        </div>

        
        <div className="w-full h-[100px] p-3">
       </div>
      </div>
    </div>  
  </>
  )
}
