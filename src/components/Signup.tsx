"use client";

import Link from "next/link";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const uploadImage = async (imageFile: File) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error("Image upload failed");
    }

    return data.data.url;
  };

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage(image);

      await authClient.signUp.email(
        {
          name,
          email,
          password,
          image: imageUrl,
          callbackURL: "/login",
        },
        {
          onSuccess: () => {
            setLoading(false);
            toast.success("Signup Success");
          },

          onError: (ctx) => {
            setLoading(false);
            toast.error(ctx.error?.message ?? "Signup failed");
          },
        }
      );
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 pt-25">
      <div className="hidden lg:block bg-[#174B4B] p-12 text-white">
        <div className="sticky top-32">
          <div className="max-w-lg">
            <h2 className="text-5xl font-serif leading-tight mt-10">
              "The best trips don't come from guidebooks. They come from a
              stranger you now call a friend."
            </h2>

            <p className="mt-6 text-gray-300">
              — Traveller field notes
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center bg-[#F7F2E8] px-6 py-10">
        <div className="w-full max-w-md">
          <h1 className="text-center text-4xl font-bold text-[#173F43]">
            Create your account
          </h1>

          <p className="mt-2 text-center text-gray-600">
            Join to book and host handpicked travel experiences.
          </p>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex items-center gap-2 justify-center mt-4 w-full rounded-full border border-gray-300 bg-white py-3 font-medium text-gray-700 hover:bg-gray-100"
          >
            <FcGoogle />
            Continue with Google
          </button>

          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-gray-300" />
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:border-[#174B4B] focus:ring-2 focus:ring-[#174B4B]"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:border-[#174B4B] focus:ring-2 focus:ring-[#174B4B]"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              minLength={8}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-500 outline-none focus:border-[#174B4B] focus:ring-2 focus:ring-[#174B4B]"
            />
            
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              required
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-500 file:mr-4 file:rounded-lg file:border-0 file:bg-[#174B4B] file:px-4 file:py-2 file:text-white file:cursor-pointer hover:file:bg-[#123d3d]"
            />

            <button
              disabled={loading}
              className="w-full rounded-full bg-[#174B4B] py-3 text-white font-semibold disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-[#174B4B]"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;