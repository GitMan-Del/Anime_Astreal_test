import { NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseServer"
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

     // 1. Verifică dacă există deja user cu email-ul
    const { data: existingUser, error: selectError } = await supabaseAdmin
      .from("profile_user")
      .select("id")
      .eq("id", email) // dacă folosești email ca PK
      .maybeSingle();

    if (selectError) {
      console.error("Select error:", selectError.message);
    }

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash pentru parolă
    const password_hash = await argon2.hash(password)

    // inserează user nou
    const { data, error } = await supabaseAdmin
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
