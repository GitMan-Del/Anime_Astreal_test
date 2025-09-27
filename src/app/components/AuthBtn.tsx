
"use client"
import Image from "next/image"

import { signIn } from "next-auth/react"
// Text props
type AuthBtnProps = {
    text: string
    varianta2: boolean
}


// Btn auth with text props
export default function AuthBtn({text , varianta2 = true}: AuthBtnProps) {
    const is  = varianta2

    return (
        <>
        {is? (
            <button className="bg-[#15161a] border border-[#15161a] rounded-2xl py-3 flex items-center justify-center gap-2 hover:cursor-pointer" 
            onClick={() => signIn("google" , {redirectTo: "/home"})}>{text} 
            <Image src="/Google-logo.png" width={20} height={20} alt="logo"/> 
            Continue with Google</button>
        ) : (
            <button className="bg-[#15161a] border border-[#15161a] rounded-2xl py-4 flex items-center justify-center gap-2 px-5 hover:cursor-pointer" 
            onClick={() => signIn("google" , {redirectTo: "/home"})}>
                <Image src="/Google-logo.png" width={20} height={20} alt="logo" />
            </button>
        )}
         </>
    ) 
}
