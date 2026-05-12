"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";

import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DOCUMENT_OPTIONS = Object.freeze({ withCredentials: false as const });

type LibraryPdfViewerProps = {
  src: string;
  title: string;
};

function readViewportContentWidth(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const style = getComputedStyle(el);
  const pad =
    (parseFloat(style.paddingLeft) || 0) + (parseFloat(style.paddingRight) || 0);
  return Math.max(240, Math.floor(rect.width - pad));
}

export function LibraryPdfViewer({ src, title }: LibraryPdfViewerProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  /** 1 = tam genişlik sığdırma; zoom butonları bunu çarpar */
  const [zoom, setZoom] = useState(1);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  useEffect(() => {
    const path = src.startsWith("http") ? src : `${window.location.origin}${src}`;
    setFileUrl(path);
    setPageNumber(1);
    setNumPages(0);
    setLoadError(null);
    setZoom(1);
  }, [src]);

  const measureViewport = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const w = readViewportContentWidth(el);
    setViewportWidth((prev) => (prev === w ? prev : w));
  }, []);

  useLayoutEffect(() => {
    measureViewport();
  }, [measureViewport, fileUrl]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => measureViewport());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measureViewport]);

  const onDocumentLoadSuccess = useCallback(({ numPages: n }: { numPages: number }) => {
    setNumPages(n);
    setLoadError(null);
  }, []);

  const goPrev = useCallback(() => {
    setPageNumber((p) => Math.max(1, p - 1));
  }, []);

  const goNext = useCallback(() => {
    setPageNumber((p) => (numPages ? Math.min(numPages, p + 1) : p));
  }, [numPages]);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(1.75, Math.round((z + 0.1) * 10) / 10));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(0.65, Math.round((z - 0.1) * 10) / 10));
  }, []);

  const pageRenderWidth =
    viewportWidth > 0 ? Math.round(viewportWidth * zoom) : 0;

  if (!fileUrl) {
    return <p className="library-pdf-loading">Hazırlanıyor…</p>;
  }

  return (
    <div
      className="library-pdf-root"
      onContextMenu={(e) => e.preventDefault()}
      role="presentation"
    >
      <div className="library-pdf-toolbar" role="toolbar" aria-label="Sunum kontrolleri">
        <div className="library-pdf-toolbar-group">
          <button
            type="button"
            className="library-pdf-tool"
            onClick={goPrev}
            disabled={pageNumber <= 1}
            aria-label="Önceki sayfa"
          >
            <ChevronLeft size={18} strokeWidth={2} aria-hidden />
          </button>
          <span className="library-pdf-page-label" aria-live="polite">
            Sayfa {numPages ? pageNumber : "—"} / {numPages || "—"}
          </span>
          <button
            type="button"
            className="library-pdf-tool"
            onClick={goNext}
            disabled={!numPages || pageNumber >= numPages}
            aria-label="Sonraki sayfa"
          >
            <ChevronRight size={18} strokeWidth={2} aria-hidden />
          </button>
        </div>
        <div className="library-pdf-toolbar-group">
          <button type="button" className="library-pdf-tool" onClick={zoomOut} aria-label="Uzaklaştır">
            <ZoomOut size={18} strokeWidth={2} aria-hidden />
          </button>
          <span className="library-pdf-zoom-label">{Math.round(zoom * 100)}%</span>
          <button type="button" className="library-pdf-tool" onClick={zoomIn} aria-label="Yakınlaştır">
            <ZoomIn size={18} strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>

      <div className="library-pdf-scroll" aria-label={title}>
        <div ref={viewportRef} className="library-pdf-viewport">
          {loadError ? (
            <p className="library-pdf-error" role="alert">
              {loadError}
            </p>
          ) : (
            <Document
              key={fileUrl}
              className="library-pdf-document"
              file={fileUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={(err) => setLoadError(err.message || "PDF yüklenemedi.")}
              loading={<p className="library-pdf-loading">Sunum yükleniyor…</p>}
              error={<p className="library-pdf-error">Sunum açılamadı.</p>}
              options={DOCUMENT_OPTIONS}
            >
              {numPages > 0 && pageRenderWidth > 0 ? (
                <Page
                  key={`${fileUrl}-p${pageNumber}-z${zoom}`}
                  pageNumber={pageNumber}
                  width={pageRenderWidth}
                  scale={1}
                  renderTextLayer={false}
                  renderAnnotationLayer
                  className="library-pdf-page"
                />
              ) : null}
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}
