type LoginPageProps = {
  searchParams: Promise<{ error?: string; reason?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const hasError = params.error === "auth";
  const isUnauthorized = params.error === "unauthorized";
  const reason = params.reason;

  return (
    <main className="auth-shell">
      <section className="login-card">
        <h1>Üye Girişi</h1>
        <p>
          Yalnızca yetkilendirilmiş kullanıcılar sisteme bağlanabilir. Kayıt olma
          seçeneği bulunmaz.
        </p>
        <form action="/auth/login" method="post">
          <label className="field">
            <span>E-posta</span>
            <input type="email" name="email" required />
          </label>
          <label className="field">
            <span>Şifre</span>
            <input type="password" name="password" required />
          </label>
          <button className="submit-btn" type="submit">
            Sisteme Bağlan
          </button>
        </form>
        {hasError && (
          <p style={{ color: "#fca5a5", marginTop: 12 }}>
            Giriş bilgileri geçersiz. Lütfen tekrar deneyin.
          </p>
        )}
        {hasError && reason && (
          <p style={{ color: "#fbbf24", marginTop: 8, fontSize: 13 }}>
            Teknik detay: {reason}
          </p>
        )}
        {isUnauthorized && (
          <p style={{ color: "#fca5a5", marginTop: 12 }}>
            Hesabınız sisteme tanımlı değil. Erişim için yönetici ile iletişime geçin.
          </p>
        )}
      </section>
    </main>
  );
}
