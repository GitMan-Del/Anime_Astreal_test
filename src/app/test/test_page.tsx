"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import LogScreen from "../components/LogScreen"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

export default function ProfileSet_Up() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status !== "loading" && !session) {
      router.push("/")  // redirect doar pe client
    }
  }, [session, status, router])

  if (status === "loading") {
    return <LogScreen/>
  }

  if (!session) {
    return null // nu afișăm nimic până se face redirect
  }

  return (
    // <div>
    //     <input type="text" readOnly disabled={true} value={session?.user?.email ?? "" } />
    // </div>

    <>
    <div className="w-full h-[100dvh] p-3 flex flex-col items-center gap-4">
       <Link href="/oauth" className="z-30 flex flex-row gap-5 items-center py-5 ">
          <ArrowLeftIcon size={25} /> 
          <h1 className="text-2xl text-white font-medium">Choose your interest</h1>
        </Link>

      <div className="flex flex-col justify-between items-center w-full h-full gap-5"> 
      <form action="" className="w-full flex flex-col gap-4">
      <Image src="/no_profile.png" alt="profile_picture" width={120} height={120} className="rounded-full" />
        <label className="flex flex-col gap-4 w-full bg-[#15161a] rounded-xl px-5 py-3">
            <input
              type="text"
              placeholder="FullName"
              name="full_name"
              className="bg-[#15161a] w-full focus:ring-0 focus:outline-none"
            />
          </label>
            <label className="flex flex-col gap-4  w-full bg-[#15161a] rounded-xl px-5 py-3">
            <input
              type="text"
              placeholder="NickName"
              name="nick_name"
              className="bg-[#15161a] w-full focus:ring-0 focus:outline-none"
              />
          </label>
            <label className="flex flex-col gap-4 w-full bg-[#15161a] rounded-xl px-5 py-3">
                <input className="text-[#4a4141]" type="text" readOnly disabled={true} value={session?.user?.email ?? "" } />
            </label>
            <label className="flex flex-col gap-4 w-full bg-[#15161a] rounded-xl px-5 py-3">
            <input
              type="text"
              placeholder="Gender"
              name="gender"
              className="bg-[#15161a] w-full focus:ring-0 focus:outline-none"
              />
          </label>
            <label className="flex flex-col gap-4 items-center w-full bg-[#15161a] rounded-xl px-5 py-3">
            <input
              type="tel"
              placeholder="Phone Number"
              name="phone_number"
              className="bg-[#15161a] w-full focus:ring-0 focus:outline-none"
              />
          </label>
      </form>

       <div className="w-full flex flex-row gap-3 items-start">
            <button className="px-5 py-3 bg-gray-500 rounded-2xl w-full">Skip</button>
            <button className="px-5 py-3 bg-[#05c149] rounded-2xl w-full">Continue</button>
          </div>
      </div>
    </div>
    </>
  )
}
