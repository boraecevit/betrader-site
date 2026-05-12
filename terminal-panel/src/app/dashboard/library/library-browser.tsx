"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

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

  const viewerAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canShow || !viewerAnchorRef.current) return;
    const el = viewerAnchorRef.current;
    const t = window.setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
    return () => window.clearTimeout(t);
  }, [activeId, canShow]);

  return (
    <div className={canShow ? "library-browser-layout library-browser-layout--split" : "library-browser-layout"}>
      <section className="panel-card library-list-panel">
        <ul className="file-list library-file-list">
          {presentations.map((item) => {
            const isActive = item.id === activeId;
            const disabled = !item.src;
            return (
              <li key={item.id} className={isActive ? "library-file-row active" : "library-file-row"}>
                <div>
                  <strong>{item.title}</strong>
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
        <div ref={viewerAnchorRef} className="library-viewer-wrap">
          <section className="panel-card library-viewer-card" aria-live="polite">
            {isExternalViewerUrl(canShow) ? (
              <>
                <div className="library-viewer-head">
                  <h3 className="library-viewer-title">{active?.title}</h3>
                </div>
                <div className="library-viewer-shell">
                  <iframe
                    title={active?.title ?? "Sunum"}
                    src={canShow}
                    className="library-viewer-frame"
                  />
                </div>
              </>
            ) : (
              <div className="library-viewer-shell library-viewer-shell--pdf">
                <LibraryPdfViewer src={canShow} title={active?.title ?? "Sunum"} />
              </div>
            )}
          </section>
        </div>
      ) : (
        <section className="panel-card library-empty-viewer">
          <p>Görüntülenecek sunum seçin veya PDF dosyasını <code>public/docs/</code> altına ekleyip listeyi güncelleyin.</p>
        </section>
      )}
    </div>
  );
}
