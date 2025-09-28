"use client";

import { ArrowLeftIcon , Mail , Lock , Repeat, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AuthBtn from "../components/AuthBtn";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Eroare necunoscuta");
        return;
      }

      setSuccess(true);
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Eroare de retea");
    }

      // redirect catre login
    router.push("/login");
  }
    return(
        <div className="w-full h-[100dvh] flex justify-center flex-col  p-5">
            <Link href="/" className="z-30">
                 <ArrowLeftIcon size={25} className=""/>
              </Link>
            <div className="w-full h-full flex-col flex items-center justify-center">
                <div className="w-full h-fit flex items-center justify-center">
                     <Image src="/logo.svg" alt="lll" width={100} height={100} className="object-contain rounded-2xl mb-10" />
                </div>
                <h1 className="text-3xl font-bold text-white text-center mb-5">Create Your Account</h1>
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 items-center">
                    <label
                        className=" flex flex-row gap-4 items-center w-full bg-[#15161a] rounded-xl px-5 py-3 active:bg-none">
                        <Mail color="#9e9e9e" size={20}/>
                        <input 
                        type="text" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}  
                        placeholder="Email" 
                        required
                        pattern=".{4,}@.{1,}" // cel puțin 4 caractere + @
                        name="email" 
                        className="bg-[#15161a] w-full focus:ring-0 focus:outline-none"/>
                    </label>

                    <label 
                        className=" flex flex-row gap-4 items-center w-full bg-[#15161a] rounded-xl px-5 py-3 active:bg-none">
                        <Lock color="#9e9e9e" size={20}/>
                        <input
                        type="text"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        name="password" 
                        className="bg-[#15161a] w-full  focus:ring-0 focus:outline-none"/>
                        <Eye color="#9e9e9e" size={20}/>
                    </label>

                    <label 
                        className=" flex flex-row gap-4 items-center w-full bg-[#15161a] rounded-xl px-5 py-3 active:bg-none">
                        <Repeat color="#9e9e9e" size={20}/>
                        <input 
                        type="text" 
                        required
                        
                        placeholder="Repet password"
                        name="repet password"
                        className="bg-[#15161a] w-full focus:ring-0 focus:outline-none"/>
                    </label>

                    <button 
                    disabled={success}
                    type="submit"
                    className={`${success ? "bg-gray-400 cursor-not-allowed" : ''} ${error? "" : ""} mt-5 w-full rounded-full text-sm bg-[#E50914]  text-white py-4 hover:cursor-pointer`}>
                        {success ? "Wait a sec" : "Sign-up"}
                    </button>
                </form>


                <div className="w-full h-fit flex flex-row gap-3 items-center justify-center my-5">
                    <hr className="border-2 border-[#31343b]/50 w-[50%] rounded-full h-[1px]" />
                    <p className="whitespace-nowrap">or continue with</p>
                    <hr className="border-2 border-[#31343b]/50 rounded-full w-[50%] h-[1px]" />
                </div>
                <div className="w-fit h-fit flex flex-row gap-10">
                <button className="bg-[#15161a]  rounded-2xl py-4 flex items-center justify-center gap-2 px-5">
                <Image src="/Facebook_logo.png" width={20} height={20} alt="logo" />
                </button>

                <AuthBtn text="" varianta2={false} />
                <button className="bg-[#15161a]  rounded-2xl py-4 flex items-center justify-center gap-2 px-5">
                    <Image src="/Apple-logo.png" width={20} height={20} alt="logo" /></button>
                </div>
                 <p className="text-sm mt-8">Already have and account?{" "}  
                    <span className="text-[#E50914]">
                         <Link href="/login">Sign in</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}