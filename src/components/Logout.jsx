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

  return <button onClick={handleClick}>Logout</button>;
}
