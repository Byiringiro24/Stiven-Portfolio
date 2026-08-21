"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// All 67 real images from the workspace folder
const ALL_IMAGES: string[] = Array.from({ length: 67 }, (_, i) => `/photos/gallery/g${i + 1}.jpeg`);

// Split into 3 rows for alternating scroll directions
const ROW1 = ALL_IMAGES.slice(0, 23);   // g1  – g23
const ROW2 = ALL_IMAGES.slice(23, 45);  // g24 – g45
const ROW3 = ALL_IMAGES.slice(45);      // g46 – g67

function ImageThumb({ img, onClick }: { img: string; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative w-64 h-44 shrink-0 rounded-xl overflow-hidden cursor-pointer group gold-border"
    >
      <Image
        src={img}
        alt="Project photo"
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="256px"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
        <ZoomIn size={24} className="text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}

export default function Gallery() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = useCallback(
    () => setLightbox((i) => i !== null ? (i - 1 + ALL_IMAGES.length) % ALL_IMAGES.length : null),
    []
  );
  const next = useCallback(
    () => setLightbox((i) => i !== null ? (i + 1) % ALL_IMAGES.length : null),
    []
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  return (
    <section id="gallery" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 section-gradient" />

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-[0.35em] mb-4 block">Site Photos</span>
          <h2 className="section-title mb-5">Project <span className="gold-text">Gallery</span></h2>
          <div className="gold-divider mb-5" />
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Real photos from construction sites, structural works and engineering projects across Rwanda.
            Click any image to view full-size.
          </p>
          <p className="text-[#c9a84c] text-xs mt-2 font-medium">{ALL_IMAGES.length} photos</p>
        </div>
      </div>

      {/* ── Row 1: scroll LEFT ── */}
      <div className="overflow-hidden mb-3">
        <div
          className="flex gap-3 w-max"
          style={{ animation: "marquee 45s linear infinite" }}
        >
          {[...ROW1, ...ROW1].map((img, i) => (
            <ImageThumb
              key={`r1-${i}`}
              img={img}
              onClick={() => setLightbox(i % ROW1.length)}
            />
          ))}
        </div>
      </div>

      {/* ── Row 2: scroll RIGHT ── */}
      <div className="overflow-hidden mb-3">
        <div
          className="flex gap-3 w-max"
          style={{ animation: "marquee 55s linear infinite reverse" }}
        >
          {[...ROW2, ...ROW2].map((img, i) => (
            <ImageThumb
              key={`r2-${i}`}
              img={img}
              onClick={() => setLightbox((i % ROW2.length) + ROW1.length)}
            />
          ))}
        </div>
      </div>

      {/* ── Row 3: scroll LEFT slow ── */}
      <div className="overflow-hidden">
        <div
          className="flex gap-3 w-max"
          style={{ animation: "marquee 65s linear infinite" }}
        >
          {[...ROW3, ...ROW3].map((img, i) => (
            <ImageThumb
              key={`r3-${i}`}
              img={img}
              onClick={() => setLightbox((i % ROW3.length) + ROW1.length + ROW2.length)}
            />
          ))}
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/96 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            style={{ maxHeight: "90vh", aspectRatio: "16/10" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={ALL_IMAGES[lightbox]}
              alt="Gallery photo"
              fill
              className="object-contain rounded-2xl"
              sizes="90vw"
            />

            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-10 h-10 bg-black/60 border border-[#c9a84c]/40 rounded-full flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all"
            >
              <X size={18} />
            </button>

            {/* Prev */}
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 border border-[#c9a84c]/40 rounded-full flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Next */}
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 border border-[#c9a84c]/40 rounded-full flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all"
            >
              <ChevronRight size={20} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-gray-300 text-xs bg-black/60 px-4 py-1.5 rounded-full">
              {lightbox + 1} / {ALL_IMAGES.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
