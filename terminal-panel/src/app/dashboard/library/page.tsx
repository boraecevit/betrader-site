import { LibraryBrowser } from "./library-browser";
import { libraryPresentations } from "./library-presentations";

export const metadata = {
  title: "Strateji Kütüphanesi"
};

export default function LibraryPage() {
  return (
    <>
      <section className="panel-card">
        <h3>Strateji Kütüphanesi</h3>
        <p>
          İleri düzey teknik analiz sunumları, özel formasyon dokümanları ve premium arşiv içerikleri burada
          listelenir.
        </p>
      </section>
      <LibraryBrowser presentations={libraryPresentations} />
    </>
  );
}
