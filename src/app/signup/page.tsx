"use client";

import { ArrowLeftIcon, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AuthBtn from "../components/Main/AuthBtn";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (session) router.push("/home");
  }, [session, status, router]);

  if (status === "loading") return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password || !repeatPassword) {
      toast.error("Te rugăm să completezi toate câmpurile.");
      return;
    }

    if (password !== repeatPassword) {
      toast.error("Parolele nu coincid!");
      return;
    }

    toast.loading("Se creează contul...");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      toast.dismiss();

      if (!res.ok) {
        if (data.error?.toLowerCase().includes("exists")) {
          toast.error("Acest email este deja folosit.");
        } else {
          toast.error(data.error || "A apărut o eroare neașteptată.");
        }
        return;
      }

      toast.success("Cont creat cu succes! Redirecționare...");
      setEmail("");
      setPassword("");
      setRepeatPassword("");

      setTimeout(() => router.push("/login"), 1500);
    } catch (err) {
      toast.dismiss();
      toast.error("Eroare de rețea. Încearcă din nou.");
    }
  }

  return (
    <div className="w-full h-[100dvh] flex justify-center flex-col p-5">
      <Link href="/" className="z-30">
        <ArrowLeftIcon size={25} />
      </Link>

      <div className="w-full h-full flex-col flex items-center justify-center">
        <div className="w-full h-fit flex items-center justify-center">
          <Image
            src="/logo.svg"
            priority
            alt="logo"
            width={100}
            height={100}
            className="object-contain rounded-2xl mb-10"
          />
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-5">
          Create Your Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-4 items-center"
        >
          {/* Email */}
          <label className="flex flex-row gap-4 items-center w-full bg-[#15161a] rounded-xl px-5 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 24 24"
              fill="#9e9e9e"
            >
              <g fill="none" stroke="#9e9e9e" strokeWidth="1.5">
                <rect width="18.5" height="17" x="2.682" y="3.5" rx="4" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.729 7.59l7.205 4.13a3.956 3.956 0 0 0 3.975 0l7.225-4.13"
                />
              </g>
            </svg>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              pattern=".{4,}@.{1,}"
              name="email"
              className="bg-[#15161a] w-full text-white focus:ring-0 focus:outline-none"
            />
          </label>

          {/* Password */}
          <label className="flex flex-row gap-4 items-center w-full bg-[#15161a] rounded-xl px-5 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
            >
              <path
                fill="#9e9e9e"
                d="M17 10.25h-.25V8a4.75 4.75 0 0 0-9.5 0v2.25H7A2.75 2.75 0 0 0 4.25 13v5A2.75 2.75 0 0 0 7 20.75h10A2.75 2.75 0 0 0 19.75 18v-5A2.75 2.75 0 0 0 17 10.25ZM8.75 8a3.25 3.25 0 0 1 6.5 0v2.25h-6.5Zm9.5 10A1.25 1.25 0 0 1 17 19.25H7A1.25 1.25 0 0 1 5.75 18v-5A1.25 1.25 0 0 1 7 11.75h10A1.25 1.25 0 0 1 18.25 13Z"
              />
            </svg>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              required
              minLength={8}
              className="bg-[#15161a] w-full text-white focus:ring-0 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye color="#9e9e9e" size={20} />
            </button>
          </label>

          {/* 🟩 Repeat Password input */}
          <label className="flex flex-row gap-4 items-center w-full bg-[#15161a] rounded-xl px-5 py-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 20 20"
              fill="#9e9e9e"
            >
              <g fill="#9e9e9e" fillRule="evenodd" clipRule="evenodd">
                <path d="M14.519 2.749a.75.75 0 0 1 1.052.13l1.547 1.982a.75.75 0 1 1-1.183.923L14.39 3.8a.75.75 0 0 1 .13-1.052Z" />
                <path d="M16.983 4.727a.75.75 0 0 0-1.052.14l-1.546 2.017a.75.75 0 1 0 1.19.912l1.547-2.017a.75.75 0 0 0-.14-1.052Z" />
                <path d="M2.48 9.323a5 5 0 0 1 5-5h7.86a1 1 0 1 1 0 2H7.48a3 3 0 0 0-3 3v1a1 1 0 1 1-2 0v-1Zm3.008 7.928a.75.75 0 0 1-1.053-.13L2.89 15.14a.75.75 0 1 1 1.182-.923L5.619 16.2a.75.75 0 0 1-.13 1.052Z" />
                <path d="M3.024 15.273a.75.75 0 0 0 1.051-.14l1.547-2.017a.75.75 0 0 0-1.19-.912L2.884 14.22a.75.75 0 0 0 .139 1.052Z" />
                <path d="M17.526 10.677a5 5 0 0 1-5 5h-7.86a1 1 0 1 1 0-2h7.86a3 3 0 0 0 3-3v-1a1 1 0 1 1 2 0v1Z" />
              </g>
            </svg>

            <input
              type={showPassword ? "text" : "password"} // ✅ folosește aceeași stare
              value={repeatPassword}
              placeholder="Repeat password"
              onChange={(e) => setRepeatPassword(e.target.value)}
              name="repeatPassword"
              required
              className="bg-[#15161a] w-full text-white focus:ring-0 focus:outline-none"
            />
          </label>

          <button
            type="submit"
            className="mt-5 w-full rounded-full text-sm bg-[#05c149] text-white py-4 hover:cursor-pointer"
          >
            Sign up
          </button>
        </form>

        <div className="w-full h-fit flex flex-row gap-3 items-center justify-center my-5">
          <hr className="border-2 border-[#31343b]/50 w-[50%] rounded-full h-[1px]" />
          <p className="whitespace-nowrap">or continue with</p>
          <hr className="border-2 border-[#31343b]/50 rounded-full w-[50%] h-[1px]" />
        </div>

        <div className="w-fit h-fit flex flex-row gap-10">
          <button className="bg-[#15161a] rounded-2xl py-4 flex items-center justify-center gap-2 px-5">
            <Image src="/Facebook_logo.png" width={20} height={20} alt="logo" />
          </button>

          <AuthBtn text="" varianta2={false} />

          <button className="bg-[#15161a] rounded-2xl py-4 flex items-center justify-center gap-2 px-5">
            <Image src="/Apple-logo.png" width={20} height={20} alt="logo" />
          </button>
        </div>

        <p className="text-sm mt-8">
          Already have an account?{" "}
          <Link className="text-[#05c149]" href="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
