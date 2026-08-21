"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

/* ── Sliding image carousel per project card ── */
function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const [idx, setIdx] = useState(0);

  // Auto-slide every 3s
  useEffect(() => {
    if (images.length <= 1) return;
    const iv = setInterval(() => setIdx((i) => (i + 1) % images.length), 3000);
    return () => clearInterval(iv);
  }, [images.length]);

  const prev = useCallback(() => setIdx((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % images.length), [images.length]);

  return (
    <div className="relative h-52 overflow-hidden bg-black/40">
      {images.map((img, i) => (
        <div key={img}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === idx ? 1 : 0 }}>
          <Image src={img} alt={`${title} ${i + 1}`} fill
            className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
        </div>
      ))}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

      {/* Arrows — only if multiple images */}
      {images.length > 1 && (
        <>
          <button onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 border border-[#c9a84c]/40 flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all z-10">
            <ChevronLeft size={14} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 border border-[#c9a84c]/40 flex items-center justify-center text-[#c9a84c] hover:bg-[#c9a84c] hover:text-black transition-all z-10">
            <ChevronRight size={14} />
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }}
                className="rounded-full transition-all duration-300"
                style={{ width: i === idx ? "16px" : "6px", height: "6px",
                  background: i === idx ? "#c9a84c" : "rgba(255,255,255,0.4)" }} />
            ))}
          </div>

          {/* Counter */}
          <div className="absolute bottom-3 right-3 text-[10px] text-gray-300 bg-black/50 px-2 py-0.5 rounded-full z-10">
            {idx + 1}/{images.length}
          </div>
        </>
      )}
    </div>
  );
}

/* ── Project data with real named images ── */
const categories = ["All", "Structural", "Site", "Masonry"];

const projects = [
  {
    title: "ISOOKO TOWN VILLAGE",
    cat: "Structural",
    images: [
      "/photos/projects/isooko_1.jpeg",
      "/photos/projects/isooko_2.jpeg",
    ],
    location: "Gasabo, Kinyinya — Kagugu Cell",
    company: "ARK Design Ltd",
    role: "Structural Designer",
    year: "2025",
    status: "In Design",
    desc: "Large-scale residential town village project. Full structural design of multiple residential units — calculations, drawings and specifications.",
    tags: ["Protastructure", "Structural Design", "Residential"],
  },
  {
    title: "URBAIN APARTMENT",
    cat: "Structural",
    images: [
      "/photos/projects/urban_1.jpeg",
      "/photos/projects/urban_2.jpeg",
      "/photos/projects/urban_3.jpeg",
    ],
    location: "Kicukiro — Kagarama",
    company: "ARK Design Ltd",
    role: "Structural Designer",
    year: "2025",
    status: "Constructed",
    desc: "Urban apartment building structural design. Prepared complete structural calculations, drawings and specifications.",
    tags: ["Structural Design", "Apartment", "AutoCAD"],
  },
  {
    title: "G+1 + Basement — Nyarurama",
    cat: "Site",
    images: [
      "/photos/projects/nyarurama_1.jpeg",
      "/photos/projects/nyabikenke_1.jpeg",
      "/photos/projects/nyabikenke_2.jpeg",
    ],
    location: "Kicukiro, Gatenga — Nyarurama, Nyabikenke",
    company: "ARK Design Ltd",
    role: "Site Engineer",
    year: "2025",
    status: "In Progress",
    desc: "Site engineering for a G+1 residential house with basement. Building setting-out, daily work monitoring, payroll and labour management.",
    tags: ["Site Engineering", "G+1", "Basement"],
  },
  {
    title: "Guest House — Bugesera",
    cat: "Site",
    images: [
      "/photos/projects/guesthouse_1.jpeg",
      "/photos/projects/guesthouse_2.jpeg",
    ],
    location: "Bugesera, Mayange",
    company: "ARK Design Ltd",
    role: "Project Manager",
    year: "2024",
    status: "Completed",
    desc: "Managed full construction of a guest house. Labour engagement, materials acquisition, payroll preparation, supervision and timeline monitoring.",
    tags: ["Project Management", "Guest House", "Site Supervision"],
  },
  {
    title: "G+1 — Rebero, Kabeza",
    cat: "Site",
    images: [
      "/photos/site/WhatsApp_Image_2026-08-17_at_17.29.33.jpeg",
      "/photos/site/WhatsApp_Image_2026-08-17_at_17.29.34.jpeg",
    ],
    location: "Kicukiro, Gatenga — Rebero, Kabeza",
    company: "ARK Design Ltd",
    role: "Site Engineer",
    year: "2025",
    status: "In Progress",
    desc: "Site engineer on G+1 residential house. Setting-out, labour engagement, daily monitoring and wages administration.",
    tags: ["Site Engineering", "G+1", "Residential"],
  },
  {
    title: "Single-storey House — Jabana",
    cat: "Site",
    images: [
      "/photos/site/WhatsApp_Image_2026-08-17_at_18.02.47.jpeg",
      "/photos/site/WhatsApp_Image_2026-08-17_at_18.02.56.jpeg",
    ],
    location: "Gasabo, Jabana — Ngiryi-Gasharu",
    company: "ARK Design Ltd",
    role: "Site Engineer",
    year: "2025",
    status: "In Progress",
    desc: "Site engineering for a single-storey residential house. Full site supervision including setting-out, labour and daily work monitoring.",
    tags: ["Site Engineering", "Single-storey", "Residential"],
  },
  {
    title: "G+2 Residential — Kanombe",
    cat: "Structural",
    images: [
      "/photos/site/WhatsApp_Image_2026-08-17_at_18.16.06.jpeg",
      "/photos/site/WhatsApp_Image_2026-08-17_at_18.16.06_1_.jpeg",
      "/photos/site/WhatsApp_Image_2026-08-17_at_18.16.06_2_.jpeg",
    ],
    location: "Kicukiro, Kanombe — Rubirizi Busanza",
    company: "Decent Engineering Construction Ltd",
    role: "Site & Structural Engineer (Intern)",
    year: "2024",
    status: "Completed",
    desc: "Redesigned structural drawings, prepared working drawings on site, quantity surveying (BBS, material calculations), project schedule and concrete supervision.",
    tags: ["Structural Design", "QS", "BBS", "Internship"],
  },
  {
    title: "Amahoro Stadium",
    cat: "Masonry",
    images: [
      "/photos/site/WhatsApp_Image_2026-08-17_at_19.38.00.jpeg",
      "/photos/site/WhatsApp_Image_2026-08-17_at_19.38.00_1_.jpeg",
    ],
    location: "Kigali, Rwanda",
    company: "Various",
    role: "Professional Mason",
    year: "2019–2023",
    status: "Completed",
    desc: "Contributed as a professional bricklayer on Rwanda's landmark Amahoro Stadium mega-project — one of the most significant construction works in Kigali.",
    tags: ["Masonry", "Stadium", "Mega-Project"],
  },
  {
    title: "Rubavu Technical School",
    cat: "Masonry",
    images: [
      "/photos/site/WhatsApp_Image_2026-08-17_at_18.17.17.jpeg",
      "/photos/site/WhatsApp_Image_2026-08-17_at_18.17.17_1_.jpeg",
    ],
    location: "Rubavu, Rwanda",
    company: "Various",
    role: "Professional Mason",
    year: "2019–2023",
    status: "Completed",
    desc: "Bricklaying and masonry works on institutional school building — walls, finishes and structural masonry elements.",
    tags: ["Masonry", "School", "Institutional"],
  },
];

const statusColor: Record<string, string> = {
  "In Progress": "#f59e0b",
  "In Design":   "#3b82f6",
  "Completed":   "#22c55e",
  "Constructed": "#22c55e",
};

export default function Projects() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.cat === active);

  return (
    <section id="projects" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      <div className="relative max-w-7xl mx-auto px-6">

        <div className={`text-center mb-16 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-[0.35em] mb-4 block">Portfolio</span>
          <h2 className="section-title mb-5">Featured <span className="gold-text">Projects</span></h2>
          <div className="gold-divider mb-12" />

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((c) => (
              <button key={c} onClick={() => setActive(c)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  active === c ? "bg-[#c9a84c] text-black" : "glass gold-border text-gray-300 hover:text-[#c9a84c]"
                }`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <div key={p.title}
              className={`group glass gold-border rounded-3xl overflow-hidden card-hover transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
              }`}
              style={{ transitionDelay: `${(i % 6) * 100}ms` }}>

              {/* Sliding image carousel */}
              <div className="relative">
                <ImageSlider images={p.images} title={p.title} />
                {/* Status badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ color: statusColor[p.status] || "#c9a84c", background: (statusColor[p.status] || "#c9a84c") + "22" }}>
                    {p.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="text-xs font-semibold text-white bg-black/60 px-2.5 py-1 rounded-full">{p.year}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-1">{p.role}</div>
                <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#c9a84c] transition-colors leading-snug">{p.title}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                  <MapPin size={11} className="shrink-0" /> {p.location}
                </div>
                <p className="text-gray-400 text-xs leading-relaxed mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {p.tags.map((t) => <span key={t} className="tag text-[10px]">{t}</span>)}
                </div>
                <p className="text-[11px] text-gray-600 font-medium">{p.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
