"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

const LibraryPdfViewer = dynamic(
  () => import("./library-pdf-viewer").then((mod) => mod.LibraryPdfViewer),
  {
    ssr: false,
    loading: () => <p className="library-pdf-loading">Önizleyici yükleniyor…</p>
  }
);

function isExternalViewerUrl(src: string) {
  return src.startsWith("http://") || src.startsWith("https://");
}

export type LibraryPresentation = {
  id: string;
  title: string;
  type: string;
  /** Same-origin path (/docs/...) or a trusted embed URL (e.g. Google Slides /embed) */
  src: string | null;
};

type LibraryBrowserProps = {
  presentations: LibraryPresentation[];
};

export function LibraryBrowser({ presentations }: LibraryBrowserProps) {
  const firstViewable = useMemo(
    () => presentations.find((p) => p.src) ?? null,
    [presentations]
  );
  const [activeId, setActiveId] = useState<string | null>(firstViewable?.id ?? null);

  const active = presentations.find((p) => p.id === activeId) ?? null;
  const canShow = active?.src ?? null;

  return (
    <>
      <section className="panel-card">
        <ul className="file-list library-file-list">
          {presentations.map((item) => {
            const isActive = item.id === activeId;
            const disabled = !item.src;
            return (
              <li key={item.id} className={isActive ? "library-file-row active" : "library-file-row"}>
                <div>
                  <strong>{item.title}</strong>
                  <p style={{ marginTop: 6 }}>{item.type}</p>
                </div>
                <button
                  type="button"
                  className="copy-btn library-view-btn"
                  disabled={disabled}
                  aria-pressed={isActive}
                  aria-disabled={disabled}
                  onClick={() => setActiveId(item.id)}
                >
                  {disabled ? "Yakında" : isActive ? "Gösteriliyor" : "Görüntüle"}
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      {canShow ? (
        <section className="panel-card library-viewer-card" aria-live="polite">
          <div className="library-viewer-head">
            <h3 className="library-viewer-title">{active?.title}</h3>
            <p className="library-viewer-note">
              {isExternalViewerUrl(canShow)
                ? "Harici gömülü sunum: indirme ve yazdırma seçenekleri sağlayıcıya bağlıdır."
                : "Sunum PDF.js ile gösterilir; tarayıcının yerleşik PDF indir çubuğu kullanılmaz. (İleri düzey kullanıcılar ağ sekmesinden dosyaya erişmeye çalışabilir.)"}
            </p>
          </div>
          <div className="library-viewer-shell">
            {isExternalViewerUrl(canShow) ? (
              <iframe
                title={active?.title ?? "Sunum"}
                src={canShow}
                className="library-viewer-frame"
              />
            ) : (
              <LibraryPdfViewer src={canShow} title={active?.title ?? "Sunum"} />
            )}
          </div>
        </section>
      ) : (
        <section className="panel-card library-empty-viewer">
          <p>Görüntülenecek sunum seçin veya PDF dosyasını <code>public/docs/</code> altına ekleyip listeyi güncelleyin.</p>
        </section>
      )}
    </>
  );
}
