import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth" 
import { LogOutbtn } from "../components/LogOutbtn"


export default async function TestPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Salut, {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
      <LogOutbtn />
    </div>
  )
}
