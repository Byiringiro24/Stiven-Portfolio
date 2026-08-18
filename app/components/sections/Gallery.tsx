"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

// All site photos
const SITE_IMAGES: string[] = Array.from({ length: 57 }, (_, i) => `/photos/projects/project_${i + 1}.jpeg`);

export default function Gallery() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const prev = useCallback(() => setLightbox((i) => i !== null ? (i - 1 + SITE_IMAGES.length) % SITE_IMAGES.length : null), []);
  const next = useCallback(() => setLightbox((i) => i !== null ? (i + 1) % SITE_IMAGES.length : null), []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     setLightbox(null);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [lightbox, prev, next]);

  const row1 = SITE_IMAGES.slice(0, 19);
  const row2 = SITE_IMAGES.slice(19, 38);
  const row3 = SITE_IMAGES.slice(38);

  return (
    <section id="gallery" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 section-gradient" />

      {/* Header */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-[0.35em] mb-4 block">Site Photos</span>
          <h2 className="section-title mb-5">Project <span className="gold-text">Gallery</span></h2>
          <div className="gold-divider mb-4" />
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Real photos from construction sites, structural works and engineering projects across Rwanda.
            Click any image to view full-size.
          </p>
        </div>
      </div>

      {/* Row 1 → left */}
      <div className="overflow-hidden mb-3">
        <div className="marquee-track flex gap-3 w-max" style={{ animationDuration: "40s" }}>
          {[...row1, ...row1].map((img, i) => (
            <ImageThumb key={i} img={img} onClick={() => setLightbox(i % row1.length)} />
          ))}
        </div>
      </div>

      {/* Row 2 → right */}
      <div className="overflow-hidden mb-3">
        <div className="flex gap-3 w-max" style={{ animation: "marquee 50s linear infinite reverse" }}>
          {[...row2, ...row2].map((img, i) => (
            <ImageThumb key={i} img={img} onClick={() => setLightbox((i % row2.length) + 19)} />
          ))}
        </div>
      </div>

      {/* Row 3 → left slow */}
      <div className="overflow-hidden">
        <div className="marquee-track flex gap-3 w-max" style={{ animationDuration: "60s" }}>
          {[...row3, ...row3].map((img, i) => (
            <ImageThumb key={i} img={img} onClick={() => setLightbox((i % row3.length) + 38)} />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div className="fixed inset-0 z-50 bg-black/96 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <div className="relative max-w-5xl w-full" style={{ maxHeight: "90vh", aspectRatio: "16/10" }}
            onClick={(e) => e.stopPropagation()}>
            <Image src={SITE_IMAGES[lightbox]} alt="Site photo" fill
              className="object-contain rounded-2xl" sizes="90vw" />
            <button onClick={() => setLightbox(null)}
              className="absolute top-3 right-3 w-10 h-10 bg-black/60 border border-[#c9a84c]/30 rounded-full flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all">
              <X size={18} />
            </button>
            <button onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 border border-[#c9a84c]/30 rounded-full flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all">
              <ChevronLeft size={20} />
            </button>
            <button onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-black/60 border border-[#c9a84c]/30 rounded-full flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all">
              <ChevronRight size={20} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-gray-400 text-xs bg-black/50 px-3 py-1 rounded-full">
              {lightbox + 1} / {SITE_IMAGES.length}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ImageThumb({ img, onClick }: { img: string; onClick: () => void }) {
  return (
    <div onClick={onClick}
      className="relative w-60 h-40 shrink-0 rounded-xl overflow-hidden cursor-pointer group gold-border">
      <Image src={img} alt="Project photo" fill
        className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="240px" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all flex items-center justify-center">
        <ZoomIn size={22} className="text-[#c9a84c] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </div>
  );
}
