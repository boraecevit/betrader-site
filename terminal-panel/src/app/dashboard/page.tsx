import { createClient } from "@/lib/supabase/server";

function toUpperTerminal(text: string) {
  return text.toLocaleUpperCase("tr-TR");
}

function fallbackName(email: string | null) {
  if (!email) return "VIP ÜYE";
  return email.split("@")[0]?.replace(/[._-]/g, " ") || "VIP ÜYE";
}

export default async function DashboardHome() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  let fullName = fallbackName(user?.email ?? null);

  if (user?.email) {
    const { data: vipRow } = await supabase
      .from("vip_members")
      .select("full_name")
      .eq("email", user.email)
      .maybeSingle();

    if (vipRow?.full_name && vipRow.full_name.trim()) {
      fullName = vipRow.full_name.trim();
    }
  }

  return (
    <>
      <section className="panel-card terminal-card">
        <div className="terminal-card-head">
          <div className="terminal-card-meta">
            <span className="terminal-badge">OP-ID: BETrader</span>
          </div>
          <div className="terminal-card-meta">
            <span className="terminal-badge">VER: 2.0.4</span>
          </div>
        </div>
        <h3 className="terminal-title">SAYIN {toUpperTerminal(fullName)}, TERMİNALE HOŞ GELDİNİZ.</h3>
        <p className="terminal-copy">
          Bu alan; piyasa mikroyapısını anlayan, duygularından arınmış ve veriyle
          hareket eden sınırlı sayıda yatırımcı için özel olarak tasarlanmıştır.
          Soldaki menüden BETrader kodlarına, strateji arşivine ve disiplin
          materyallerine erişebilirsiniz.
        </p>
      </section>
      <section className="panel-card terminal-card terminal-signal-card">
        <div className="terminal-card-head">
          <div className="terminal-card-meta">
            <span className="terminal-badge">LOG: SECURE-CONNECTION</span>
          </div>
          <div className="terminal-card-meta">
            <span className="terminal-badge">CHANNEL: CORE-SIGNAL</span>
          </div>
        </div>
        <h3 className="terminal-title">Bugünün Terminal Notu</h3>
        <p className="terminal-signal-line">
          <span className="terminal-signal-dot" aria-hidden="true" />
          <span>Operasyonel prensip: Sermaye korunumu bir tercih değil, sistemin çekirdek protokolüdür.</span>
        </p>
      </section>
    </>
  );
}
