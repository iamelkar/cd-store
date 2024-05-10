"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/router";

export default function CartButton() {
  return (
    <div className="flex items-center text-white px-2 py-2 rounded hover:bg-blue-600">
      <a href="/cart/page">
        <img
          src="https://cdn-icons-png.flaticon.com/512/60/60992.png"
          className="w-10 h-10"
        />
      </a>
    </div>
  );
}
