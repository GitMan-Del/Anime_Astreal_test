import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"
import argon2 from "argon2"

export async function POST(req: NextRequest , ) {
  try {
    const { email, password, name } = await req.json()


    if (!email || !password) {
      return NextResponse.json(
        { error: "Email și parolă necesare" },
        { status: 400 }
      )
    }

    const lowerEmail = email.toLowerCase()

    // verifică dacă userul există deja
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", lowerEmail)
      .maybeSingle()

    if (existing) {
      return NextResponse.json(
        { error: "Utilizator deja existent" },
        { status: 409 }
      )
    }

    // hash pentru parolă
    const password_hash = await argon2.hash(password)

    // inserează user nou
    const { data, error } = await supabase
      .from("users")
      .insert({
        email: lowerEmail,
        name: name ?? lowerEmail,
        password_hash,
      })
      .select("id")
      .single()

    if (error) {
      console.error(error)
      return NextResponse.json(
        { error: "Eroare la creare cont" },
        { status: 500 }
      )
    }

    return NextResponse.json({ ok: true, id: data.id })
  } catch (e) {
    console.error("Register error:", e)
    return NextResponse.json({ error: "Eroare server" }, { status: 500 })
  }
}
