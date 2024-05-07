import Logout from "@/components/Logout";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Homepage() {
  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    return redirect("/login");
  }

  return <Logout />;
}
