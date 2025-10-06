"use client";

import { Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import AuthBtn from "../components/Main/AuthBtn";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (session) {
      router.push("/home");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Completează toate câmpurile.");
      return;
    }

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      if (res.error.includes("CredentialsSignin")) {
        toast.error("Email sau parolă incorectă.");
      } else if (res.error.includes("User already exists")) {
        toast.error("Acest cont există deja. Încearcă să te autentifici.");
      } else {
        toast.error("A apărut o eroare neașteptată. Încearcă din nou.");
      }
    } else {
      toast.success("Autentificare reușită! Redirectare...");
      router.push("/home");
    }
  };

  return (
    <div className="w-full h-[100dvh] flex justify-center flex-col p-5">
      <Link href="/" className="z-30">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="#E0E0E0"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 6s-6 4.419-6 6s6 6 6 6"
            color="currentColor"
          />
        </svg>
      </Link>

      <div className="w-full h-full flex flex-col items-center justify-center">
        {/* Logo */}
        <div className="w-full h-fit flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="logo"
            priority
            width={100}
            height={100}
            className="object-contain rounded-2xl mb-10"
          />
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-5">
          Login to Your Account
        </h1>

        {/* Form */}
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="text"
              placeholder="Email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              required
              minLength={8}
              className="bg-[#15161a] w-full focus:ring-0 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <Eye color="#9e9e9e" size={20} />
            </button>
          </label>

          {/* Submit */}
          <button
            type="submit"
            className="mt-5 w-full rounded-full text-sm bg-[#05c149] text-white py-4 hover:cursor-pointer"
          >
            Sign-up
          </button>
        </form>

        {/* Forgot password */}
        <p className="mt-5 text-[#05c149]">Forgot password?</p>

        {/* Divider */}
        <div className="w-full h-fit flex flex-row gap-3 items-center justify-center my-5">
          <hr className="border-2 border-[#15161a]/50 w-[50%] rounded-full h-[1px]" />
          <p className="whitespace-nowrap">or continue with</p>
          <hr className="border-2 border-[#15161a]/50 rounded-full w-[50%] h-[1px]" />
        </div>

        {/* Social Buttons */}
        <div className="w-fit h-fit flex flex-row gap-10">
          <button className="bg-[#15161a] border border-[#15161a] rounded-2xl py-4 flex items-center justify-center gap-2 px-5">
            <Image src="/Facebook_logo.png" width={20} height={20} alt="logo" />
          </button>

          <AuthBtn text=" " varianta2={false} />

          <button className="bg-[#15161a] border border-[#15161a] rounded-2xl py-4 flex items-center justify-center gap-2 px-5">
            <Image src="/Apple-logo.png" width={20} height={20} alt="logo" />
          </button>
        </div>

        {/* Sign up redirect */}
        <p className="text-sm mt-8">
          Don&apos;t have an account?{" "}
          <span className="text-[#05c149]">
            <Link href="/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}
