import { LoginTerminalBar } from "@/components/login-terminal-bar";
import { ArrowRight, Lock, MessageCircle } from "lucide-react";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = params.error === "auth";
  const isUnauthorized = params.error === "unauthorized";

  return (
    <main className="auth-shell">
      <section className="login-card">
        <div className="login-card-head">
          <LoginTerminalBar />
        </div>

        <h1 className="login-title">SİSTEM KİMLİK DOĞRULAMA</h1>
        <p className="login-lede">
          Bu ağ; yüksek hassasiyetli stratejik analizlerin ve veri odaklı finansal modellerin
          paylaşıldığı,{" "}
          <strong className="login-lede-strong">İzole edilmiş kapalı devre bir ekosistemdir</strong>.
          {" "}Giriş protokolü, yalnızca <span className="login-lede-name">Bora Ecevit</span>{" "}
          tarafından bizzat yetkilendirilmiş{" "}
          <span className="login-lede-privileged">İmtiyazlı Kullanıcıların</span> erişimine mahsustur.
        </p>

        <form action="/auth/login" method="post" className="login-form">
          <label className="login-field">
            <span>E-posta</span>
            <input type="email" name="email" required autoComplete="email" />
          </label>
          <label className="login-field">
            <span>Şifre</span>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
            />
          </label>
          <button className="login-submit" type="submit">
            <Lock size={16} strokeWidth={2.25} aria-hidden className="login-submit-icon" />
            <span>Sisteme Bağlan</span>
            <ArrowRight size={16} strokeWidth={2.25} aria-hidden className="login-submit-icon" />
          </button>
        </form>

        {hasError && (
          <p className="login-error" role="alert">
            Giriş bilgileri geçersiz. Lütfen tekrar deneyin.
          </p>
        )}
        {isUnauthorized && (
          <p className="login-error" role="alert">
            Hesabınız sisteme tanımlı değil. Erişim için yönetici ile iletişime geçin.
          </p>
        )}

        <div className="login-contact-footer">
          <p className="login-contact-note">
            <span className="login-contact-em">Terminal aktivasyonu</span>{" "}
            <span className="login-contact-dim">ve</span>{" "}
            <span className="login-contact-em">İmtiyazlı erişim</span>{" "}
            <span className="login-contact-dim">talepleri için lütfen</span>{" "}
            <span className="login-contact-office">Strateji Ofisi</span>{" "}
            <span className="login-contact-dim">ile WhatsApp üzerinden iletişime geçin.</span>
          </p>
          <div className="login-contact-actions">
            <a
              href="https://wa.me/905472991993"
              target="_blank"
              rel="noopener noreferrer"
              className="login-contact-pillar"
              aria-label="WhatsApp ile iletişim"
            >
              <MessageCircle size={20} strokeWidth={1.75} aria-hidden className="login-contact-pillar-icon" />
              <span className="login-contact-pillar-label">WHATSAPP</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
