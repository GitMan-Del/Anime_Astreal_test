import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"
import { supabase } from "./supabaseClient"
import Credentials from "next-auth/providers/credentials"
import argon2 from "argon2"
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
   Credentials({
     name: "Credentials",
     credentials: {
       email: { label: "Email", type: "email" },
       password: { label: "Password", type: "password" }
     },
    async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null
        const { data: user, error } = await supabase
          .from("users")
          .select("id, email, name, password_hash")
          .eq("email", credentials.email.toLowerCase())
          .maybeSingle()

        if (error || !user) return null

        const valid = await argon2.verify(user.password_hash, credentials.password)
        if (!valid) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name ?? user.email
        }
      }
    })
  ],

    session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 zile
    updateAge: 24 * 60 * 60,   // reînnoiește tokenul la max. 1 zi
  },


  secret: process.env.AUTH_SECRET,

  callbacks: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({ token, account, profile }: { token: JWT; account?: any; profile?: any }) {
      if (account?.provider === "google" && profile?.email) {
        const email = (profile.email as string).toLowerCase()
        const name = (profile.name as string) ?? email

        // verifică dacă userul există
        const { data: existing } = await supabase
          .from("users")
          .select("id")
          .eq("email", email)
          .maybeSingle()

        if (!existing) {
          const { data: inserted } = await supabase
            .from("users")
            .insert({ email, name })
            .select("id")
            .single()
          if (inserted?.id) token.id = inserted.id
        } else {
          token.id = existing.id
        }
      }
      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token?.id) {
        session.user.id = token.id
      }
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler }
