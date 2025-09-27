"use client"
import { signOut } from "next-auth/react"
 
export function LogOutbtn() {
  return <button onClick={() => signOut()}>Sign Out</button>
}