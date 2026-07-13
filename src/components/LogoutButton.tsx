"use client";

import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import { authClient } from "@/lib/auth-client";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="flex w-full items-center justify-center gap-2 rounded-full bg-red-500 py-2 px-2.5 font-semibold text-white transition-all duration-300 hover:bg-red-600 hover:shadow-lg active:scale-95"
    >
      <LuLogOut />
      Logout
    </button>
  );
};

export default LogoutButton;