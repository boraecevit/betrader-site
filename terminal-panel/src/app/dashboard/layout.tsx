import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/sidebar";
import { StatusBar } from "@/components/status-bar";

export default async function DashboardLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  const { data: vipRow } = await supabase
    .from("vip_members")
    .select("id, is_active, full_name, email")
    .eq("email", user.email ?? "")
    .eq("is_active", true)
    .maybeSingle();

  if (!vipRow) {
    redirect("/?error=unauthorized");
  }

  return (
    <div className="terminal-layout">
      <Sidebar
        fullName={vipRow.full_name ?? null}
        email={(vipRow.email as string | null) ?? user.email ?? null}
      />
      <main className="main-area">
        <StatusBar />
        {children}
      </main>
    </div>
  );
}
