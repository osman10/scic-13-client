"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { IoLogoFacebook } from "react-icons/io";

type LoginProps = {
  redirect?: string;
};



const Login = ({ redirect = "/" }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await authClient.signIn.email(
        {
          email,
          password,
          callbackURL: redirect,
          rememberMe: false,
        },
        {
          onRequest: () => setLoading(true),

          onSuccess: () => {
            setLoading(false);
            alert("Login successful");
          },

          onError: (ctx) => {
            setLoading(false);
            alert(ctx.error?.message ?? "Login failed");
          },
        }
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: redirect,
    });
  };
// Facebook signin
const handleFacebookSignIn = async () => {
  try {
    await authClient.signIn.social({
      provider: "facebook",
      callbackURL: redirect,
    });
  } catch (error) {
    console.error("Facebook login error:", error);
    alert("Facebook login failed");
  }
};

  return (
    <div className="min-h-screen grid lg:grid-cols-2 pt-25">
      {/* Left Side */}
      <div className="hidden lg:block bg-[#174B4B] p-12 text-white">
        <div className="sticky top-32">
          <div className="max-w-lg">
            <h2 className="text-5xl font-serif leading-tight mt-10">
              "Every journey begins with a single step—and a great story."
            </h2>

            <p className="mt-6 text-gray-300">
              Welcome back to your travel community.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center bg-[#F7F2E8] px-6 py-10">
        <div className="w-full max-w-md">
          <h1 className="text-center text-4xl font-bold text-[#173F43]">
            Welcome Back
          </h1>

          <p className="mt-2 text-center text-gray-600">
            Sign in to continue exploring amazing travel experiences.
          </p>

          <button
            type="button"
            onClick={handleFacebookSignIn}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <IoLogoFacebook />
            Continue with Facebook
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white py-3 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            <FcGoogle />
            Continue with Google
          </button>

          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-[#174B4B] focus:ring-2 focus:ring-[#174B4B]"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none transition focus:border-[#174B4B] focus:ring-2 focus:ring-[#174B4B]"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#174B4B] py-3 font-semibold text-white transition hover:bg-[#123d3d] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-[#174B4B] hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;