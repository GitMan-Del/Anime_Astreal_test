"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect , useState} from 'react';

export default function Welcome() {

    const [loading , setLoading] = useState(true);

    useEffect(() => {
        const HendlerLog = () => {
            const timer = setTimeout(() => setLoading(false), 2000)
            return () => clearTimeout(timer)
        }

        if( document.readyState === "complete") {
            HendlerLog(); 
                window.addEventListener("load" , HendlerLog)
         } else {
                window.addEventListener("load" , HendlerLog)
            }

        return () => {
            window.removeEventListener("load" , HendlerLog)
    }; });
    return(
      <>
        {loading ? (
            <div className="w-full h-[100dvh] flex bg-[#181A20] flex-col justify-center items-center">
                     <Image src="/logo.svg" alt="lll" width={150} height={150} className="object-contain rounded-2xl mb-10 animate-spin" />
                <p>Loading...</p>
            </div>
        ) :
        <div className="w-full h-[100dvh] flex flex-col items-end justify-center ">
            <Image src="/BgWelcomePage.png" alt="bg" fill className="w-full h-full object-cover z-10" unoptimized priority/>
            <div className="w-full h-full bg-gradient-to-t from-1% to-90% from-[#1b1c1e] to-[#1b1c1e]/0 z-20 absolute bottom-0"></div>
            <div className="w-full h-fit p-5 flex flex-col justify-center items-center gap-4 z-30 absolute bottom-0">
                <h1 className="text-4xl font-bold text-white text-center">Welcome to <br /> Anime Astral 👋</h1>
                <p className="text-sm text-white text-center w-[85%]">The best streaming anime app of the century to entertain you every day</p>
                <div className="flex gap-1 w-fit">
                <div className="w-[34px] rounded h-2 bg-[#E50914]"></div>
                <div className="w-[10px] rounded-full h-[10px] bg-[#E0E0E0]"></div>
                <div className="w-[10px] rounded-full h-[10px] bg-[#E0E0E0]"></div>
                </div>
                <Link href="/oauth" className="w-full">
                <button className="w-full rounded-full text-sm bg-[#E50914] shadow-md shadow-[#E50914]/50 text-white py-4 hover:cursor-pointer">Get Started</button>
                </Link>
            </div>
        </div>
        }
      </>
    );
}