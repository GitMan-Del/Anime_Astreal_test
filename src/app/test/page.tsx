"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import LogScreen from "../components/LogScreen"

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
    <div>
        <input type="text" readOnly disabled={true} value={session?.user?.email ?? "" } />
    </div>
  )
}
