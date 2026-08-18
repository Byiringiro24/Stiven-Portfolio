"use client";

import React, { useEffect, useRef, useState } from "react";
import { MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const categories = ["All", "Structural", "Site", "Masonry"];

const projects = [
  {
    title: "ISOOKO TOWN VILLAGE",
    cat: "Structural",
    img: "/photos/projects/project_1.jpeg",
    location: "Gasabo, Kinyinya — Kagugu Cell",
    company: "ARK Design Ltd",
    role: "Structural Designer",
    year: "2025",
    status: "In Design",
    desc: "Large-scale residential town village project. Responsible for full structural design of multiple residential units within the complex.",
    tags: ["Protastructure", "Structural Design", "Residential"],
  },
  {
    title: "URBAIN APARTMENT",
    cat: "Structural",
    img: "/photos/projects/project_2.jpeg",
    location: "Kicukiro — Kagarama",
    company: "ARK Design Ltd",
    role: "Structural Designer",
    year: "2025",
    status: "Constructed",
    desc: "Urban apartment building structural design. Prepared complete structural calculations, drawings and specifications.",
    tags: ["Structural Design", "Apartment", "AutoCAD"],
  },
  {
    title: "Guest House — Bugesera",
    cat: "Site",
    img: "/photos/projects/project_3.jpeg",
    location: "Bugesera, Mayange",
    company: "ARK Design Ltd",
    role: "Project Manager",
    year: "2024",
    status: "Completed",
    desc: "Managed full construction of a guest house. Handled labour engagement, materials acquisition, payroll preparation, supervision and timeline monitoring.",
    tags: ["Project Management", "Guest House", "Site Supervision"],
  },
  {
    title: "G+1 + Basement — Nyarurama",
    cat: "Site",
    img: "/photos/projects/project_4.jpeg",
    location: "Kicukiro, Gatenga — Nyarurama, Nyabikenke",
    company: "ARK Design Ltd",
    role: "Site Engineer",
    year: "2025",
    status: "In Progress",
    desc: "Site engineering for a G+1 residential house with basement. Building setting-out, daily work monitoring, payroll and labour management.",
    tags: ["Site Engineering", "G+1", "Basement"],
  },
  {
    title: "G+1 — Rebero, Kabeza",
    cat: "Site",
    img: "/photos/projects/project_5.jpeg",
    location: "Kicukiro, Gatenga — Rebero, Kabeza",
    company: "ARK Design Ltd",
    role: "Site Engineer",
    year: "2025",
    status: "In Progress",
    desc: "Site engineer on G+1 residential house. Responsibilities cover setting-out, labour engagement, daily monitoring and wages administration.",
    tags: ["Site Engineering", "G+1", "Residential"],
  },
  {
    title: "Single-storey House — Jabana",
    cat: "Site",
    img: "/photos/projects/project_6.jpeg",
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
    img: "/photos/projects/project_7.jpeg",
    location: "Kicukiro, Kanombe — Rubirizi Busanza",
    company: "Decent Engineering Construction Ltd",
    role: "Site & Structural Engineer (Intern)",
    year: "2024",
    status: "Completed",
    desc: "Redesigned structural drawings, prepared working drawings on site, quantity surveying (BBS, material calculations), project schedule preparation and concrete supervision.",
    tags: ["Structural Design", "QS", "BBS", "Internship"],
  },
  {
    title: "Amahoro Stadium",
    cat: "Masonry",
    img: "/photos/projects/project_8.jpeg",
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
    img: "/photos/projects/project_9.jpeg",
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

          {/* Filter */}
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

              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image src={p.img} alt={p.title} fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110" sizes="(max-width:768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                {/* Status badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ color: statusColor[p.status] || "#c9a84c", background: (statusColor[p.status] || "#c9a84c") + "20" }}>
                    {p.status}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="text-xs font-semibold text-white bg-black/60 px-2.5 py-1 rounded-full">{p.year}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="text-[#c9a84c] text-xs font-bold uppercase tracking-wider mb-1">{p.role}</div>
                <h3 className="text-white font-bold text-base mb-1 group-hover:text-[#c9a84c] transition-colors leading-snug">{p.title}</h3>
                <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                  <MapPin size={11} /> {p.location}
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
