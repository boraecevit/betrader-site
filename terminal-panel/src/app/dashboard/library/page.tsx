const files = [
  {
    name: "Bora Ecevit - BETrader ALGO & V6 Terminali.pdf",
    type: "Terminal Dokümanı (12 Sayfa)",
    access: "Üye",
    href: "/docs/BETrader-ALGO-V6-Terminali.pdf"
  },
  { name: "İleri Teknik Analiz Çatısı.pdf", type: "PDF Sunum", access: "Üye", href: "#" },
  { name: "Dr. Emmett \"Doc\" Brown Cup Formasyonu.pdf", type: "Formasyon Dokümanı", access: "Üye", href: "#" },
  { name: "Likidite Haritası ve Mikroyapı Notları.pdf", type: "Araştırma Notu", access: "Üye", href: "#" }
];

export default function LibraryPage() {
  return (
    <>
      <section className="panel-card">
        <h3>Strateji Kütüphanesi</h3>
        <p>
          İleri düzey teknik analiz sunumları, özel formasyon dokümanları ve premium
          arşiv içerikleri burada listelenir.
        </p>
      </section>
      <section className="panel-card">
        <ul className="file-list">
          {files.map((file) => (
            <li key={file.name}>
              <div>
                <strong>{file.name}</strong>
                <p style={{ marginTop: 6 }}>{file.type}</p>
              </div>
              <a className="copy-btn" href={file.href} target="_blank" rel="noopener noreferrer">
                {file.access} İndir
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
