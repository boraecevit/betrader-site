import type { LibraryPresentation } from "./library-browser";
import { LibraryBrowser } from "./library-browser";

export const metadata = {
  title: "Strateji Kütüphanesi"
};

const presentations: LibraryPresentation[] = [
  {
    id: "betrader-algo-v6",
    title: "Bora Ecevit — BETrader ALGO & V6 Terminali",
    type: "Terminal dokümanı (12 sayfa)",
    src: "/docs/BETrader-ALGO-V6-Terminali.pdf"
  },
  {
    id: "ileri-teknik",
    title: "İleri Teknik Analiz Çatısı",
    type: "PDF sunum",
    src: null
  },
  {
    id: "doc-brown-cup",
    title: "Dr. Emmett \"Doc\" Brown Cup Formasyonu",
    type: "Formasyon dokümanı",
    src: null
  },
  {
    id: "likidite-haritasi",
    title: "Likidite Haritası ve Mikroyapı Notları",
    type: "Araştırma notu",
    src: null
  }
];

export default function LibraryPage() {
  return (
    <>
      <section className="panel-card">
        <h3>Strateji Kütüphanesi</h3>
        <p>
          İleri düzey teknik analiz sunumları, özel formasyon dokümanları ve premium arşiv
          içerikleri burada listelenir. Sunumlar sayfa içinde açılır; dosyaları{" "}
          <code>terminal-panel/public/docs/</code> klasörüne koyup aşağıdaki listeyi
          güncellemeniz yeterlidir.
        </p>
      </section>
      <LibraryBrowser presentations={presentations} />
    </>
  );
}
