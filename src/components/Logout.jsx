"use client";
import { useRouter } from "next/navigation";
import { createClient } from "../utils/supabase/client";

export default function Logout() {
  const router = useRouter();
  const handleClick = async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signOut();

    if (error) {
      alert("Sign out failed");
    } else {
      router.push("/login");
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center bg-red-500 text-white px-2 py-2 rounded hover:bg-red-600"
    >
      <p className="pr-2">Logout</p>
      <img
        src="data:image/png;base64,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"
        className="w-6 h-6"
      />
    </button>
  );
}
