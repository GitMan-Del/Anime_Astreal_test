import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AuthBtn from "../components/AuthBtn";

export default function Oauth_Page () {
    return(
        <div className="w-full h-[100dvh] flex justify-center items-center p-5">
            <Link href="/" className="z-30">
                 <ArrowLeftIcon size={25} className="absolute top-10 left-5"/>
              </Link>
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

                    <Link href="/" className="w-full mt-5">
                 <button className="w-full rounded-full text-sm bg-[#E50914]   text-white py-4 hover:cursor-pointer">Sign in with password</button>
                 </Link>
                <p className="text-sm mt-8">Dont&apos;t have and account?{" "}  
                    <span className="text-[#E50914]">    
                         <Link href="/signup">Sign up</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}