"use client";


import { ArrowLeftIcon , Mail , Lock, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AuthBtn from "../components/AuthBtn";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"

export default function Login () {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      console.error("Login failed:", res.error)
    } else {
      router.push("/home")
    }
  }

    return(
        <div className="w-full h-[100dvh] flex justify-center items-center p-5 ">
            <Link href="/oauth" className="z-30">
                 <ArrowLeftIcon size={25} className="absolute top-10 left-5"/>
              </Link>
            <div className="w-full h-full flex-col flex items-center justify-center">
                <div className="w-full h-fit flex items-center justify-center">
                     <Image src="/logo.svg" alt="logo" width={100} height={100} className="object-contain rounded-2xl mb-10" />
                </div>
                <h1 className="text-3xl font-bold text-white text-center mb-5">Login to Your Account</h1>

                <form onSubmit={handleSubmit}  className="w-full flex flex-col gap-4 items-center">
                        <label className=" flex flex-row gap-4 items-center w-full bg-[#15161a] rounded-xl px-5 py-3 active:bg-none">
                        <Mail color="#9e9e9e" size={20}/>
                        <input
                         onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        type="text"
                        placeholder="Email"
                        name="email"
                        className="bg-[#15161a] w-full focus:ring-0 focus:outline-none"/>
                        </label>
                        <label className=" flex flex-row gap-4 items-center w-full bg-[#15161a] rounded-xl px-5 py-3 active:bg-none">
                        <Lock color="#9e9e9e" size={20}/>
                        <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="text" 
                        placeholder="Password" 
                        name="password"
                    
                     
                        className="bg-[#15161a] w-full  focus:ring-0 focus:outline-none"/>
                        <Eye color="#9e9e9e" size={20}/>
                        </label>
               <button
               
               type="submit"
               className="mt-5 w-full rounded-full text-sm bg-[#E50914]   text-white py-4 hover:cursor-pointer">Sign-up</button>
              
                </form>

                    
                <p className="mt-5 text-[#E50914]">Forgot password?</p>
                <div className="w-full h-fit flex flex-row gap-3 items-center justify-center my-5">
                    <hr className="border-2 border-[#15161a]/50 w-[50%] rounded-full h-[1px]" />
                    <p className="whitespace-nowrap">or continue with</p>
                    <hr className="border-2 border-[#15161a]/50 rounded-full w-[50%] h-[1px]" />
                </div>
                <div className="w-fit h-fit flex flex-row gap-10">
                <button className="bg-[#15161a] border border-[#15161a] rounded-2xl py-4 flex items-center justify-center gap-2 px-5">
                    <Image src="/Facebook_logo.png" width={20} height={20} alt="logo" />
                    </button>
               
                 <AuthBtn text=" " varianta2={false}/>

                <button className="bg-[#15161a] border border-[#15161a] rounded-2xl py-4 flex items-center justify-center gap-2 px-5">
                    <Image src="/Apple-logo.png" width={20} height={20} alt="logo" /></button>
                </div>
                 <p className="text-sm mt-8">Don&apos;t have and account?{" "}  
                    <span className="text-[#E50914]">    
                         <Link href="/signup">Sign up</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}