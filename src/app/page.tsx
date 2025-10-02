"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect , useState} from 'react';
import AuthBtn from "./components/AuthBtn";
import { ArrowLeftIcon } from "lucide-react";
import LogScreen from "./components/LogScreen";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Welcome() {
    // loading Screen sistem based on the page loading.
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
    const [oAuth , isOauth] = useState(false);
    const { data: session, status } = useSession()
       const router = useRouter()

        if(status === "loading") {
            return null
        }
        if (session) {
          router.push("/home")
        }
        
    return(
        // Page loading screen
      <>
        {loading ? (
            <LogScreen/>
        ) :
        // The Welcome page
        <div className={`${oAuth ? "hidden" : ""} w-full h-[100dvh] flex flex-col items-end justify-center `}>
            <Image src="/BgWelcomePage.png" alt="bg" fill className="w-full h-full object-cover z-10" unoptimized priority/>
            <div className="w-full h-full bg-gradient-to-t from-1% to-50% from-[#1b1c1e] to-[#1b1c1e]/0 z-20 absolute bottom-0"></div>
            <div className="w-full h-fit p-5 flex flex-col justify-center items-center gap-4 z-30 absolute bottom-0">
                <h1 className="text-4xl font-bold text-white text-center">Welcome to <br /> Anime Astral 👋</h1>
                <p className="text-sm text-white text-center w-[85%]">The best streaming anime app of the century to entertain you every day</p>
                <div className="flex gap-1 w-fit">
                <div className="w-[34px] rounded h-2 bg-[#15161a]"></div>
                <div className="w-[10px] rounded-full h-[10px] bg-[#32343b]"></div>
                <div className="w-[10px] rounded-full h-[10px] bg-[#32343b]"></div>
                </div>
                <button
                // Set the oAuth page oAuth
                onClick={(() => isOauth((prev => !prev)))}
                className="w-full rounded-full text-sm bg-[#05c149] shadow-md shadow-[#05c149]/50 text-white py-4 hover:cursor-pointer">Get Started</button>
            </div>
        </div>
        }
        {oAuth &&
        (
        <div className="w-full h-[100dvh] flex justify-center items-center p-5">
            <button onClick={(() => isOauth(prev => !prev ))} className="z-30 hover:cursor-pointer">
                <ArrowLeftIcon size={25} className="absolute top-10 left-5"/>
            </button>
            <div className="w-full h-full flex-col flex items-center justify-center">
                <div className="w-full h-fit">
                 <Image src="/Finall.png" alt="lll" width={300} height={300} className="w-full h-full object-contain" />
                </div>
                 <h1 className="text-3xl font-bold text-white text-center mb-5">Let&apos;s you in</h1>
                    <div className="w-full h-fit flex flex-col gap-5">
                        <button className="bg-[#15161a] border border-[#15161a] rounded-2xl py-3 flex items-center justify-center gap-2">
                        <Image src="/Facebook_logo.png" width={20} height={20} alt="logo" />
                            Continue with Facebook</button>
                        <AuthBtn text=" " varianta2={true} />
                        <button className="bg-[#15161a] border border-[#15161a] rounded-2xl py-3 flex items-center justify-center gap-2">
                        <Image src="/Apple-logo.png" width={20} height={20} alt="logo" />
                            Continue with Apple</button>
                    </div>
                    <div className="w-full h-fit flex flex-row gap-3 items-center justify-center mt-5">
                        <hr className="border-2 border-[#15161a]/50 w-[50%] rounded-full" />
                            <p>or</p>
                        <hr className="border-2 border-[#15161a]/50 rounded-full w-[50%]" />
                    </div>
                    <Link href="/login" className="w-full mt-5">
                        <button className="w-full rounded-full text-sm bg-[#05c149]   text-white py-4 hover:cursor-pointer">Sign in with password</button>
                    </Link>
                 <p className="text-sm mt-8">Dont&apos;t have and account?{" "}  
                    <span className="text-[#05c149]">
                        <Link href="/signup">Sign up</Link>
                    </span>
                </p>
            </div>
        </div>
        )}
      </>
    );
}