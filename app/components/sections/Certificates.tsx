"use client";

import React, { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const certs = [
  {
    icon: "🏆",
    title: "Graduate Engineer Membership",
    org: "Institute of Engineering Rwanda (IER)",
    year: "2026",
    color: "#c9a84c",
    doc: "/docs/certificate.pdf",
    desc: "Officially recognized as a Graduate Engineer Member of the IER — the professional engineering body of Rwanda.",
    featured: true,
  },
  {
    icon: "🎓",
    title: "BSc (Hons) Civil Engineering: Geotechnical Engineering",
    org: "University of Rwanda — College of Science & Technology",
    year: "2025",
    color: "#e8c97a",
    doc: "/docs/resume.pdf",
    desc: "Four-year honours degree specialising in geotechnical engineering, structural design and civil infrastructure.",
    featured: false,
  },
  {
    icon: "📜",
    title: "Protastructure Certification",
    org: "NZIZA GLOBAL",
    year: "2024",
    color: "#c9a84c",
    doc: "#",
    desc: "Certified user of Protastructure software for structural analysis and design of reinforced concrete and steel structures.",
    featured: false,
  },
  {
    icon: "📋",
    title: "Rwanda Advanced Certificate (PCM)",
    org: "GS St Joseph Kabgayi",
    year: "2019",
    color: "#a07830",
    doc: "#",
    desc: "Advanced secondary education certificate in Physics, Chemistry and Mathematics — foundation for engineering studies.",
    featured: false,
  },
];

export default function Certificates() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section id="certificates" ref={ref} className="relative py-32 overflow-hidden bg-[#0d0d0d]">
      <div className="absolute inset-0 section-gradient" />
      <div className="relative max-w-7xl mx-auto px-6">

        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-[0.35em] mb-4 block">Achievements</span>
          <h2 className="section-title mb-5">Certificates & <span className="gold-text">Credentials</span></h2>
          <div className="gold-divider" />
        </div>

        {/* Featured */}
        <div className={`mb-12 transition-all duration-1000 delay-200 ${inView ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
          <div className="relative glass gold-border-strong rounded-3xl p-8 md:p-12 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#c9a84c]/5 rounded-full -translate-y-36 translate-x-36" />
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-[#c9a84c]/5 rounded-full translate-y-28 -translate-x-28" />
            <div className="relative flex flex-col md:flex-row items-start md:items-center gap-8">
              <span className="text-7xl">🏆</span>
              <div className="flex-1">
                <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-widest">Featured Credential</span>
                <h3 className="text-2xl md:text-3xl font-black text-white mt-2 mb-3 leading-tight">
                  IER Graduate Engineer Member
                </h3>
                <p className="text-gray-400 leading-relaxed max-w-2xl text-sm">
                  Recognised as a Graduate Engineer Member of the{" "}
                  <span className="text-[#c9a84c] font-semibold">Institute of Engineering Rwanda (IER)</span> in 2026.
                  This credential confirms professional competence and ethical standing in civil engineering practice in Rwanda.
                </p>
              </div>
              <a href="/docs/certificate.pdf" target="_blank" className="btn-gold shrink-0 text-sm">
                <ExternalLink size={15} /> View Certificate
              </a>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certs.map((c, i) => (
            <div key={c.title}
              className={`group glass gold-border rounded-2xl p-6 card-hover transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">{c.icon}</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ color: c.color, background: c.color + "18" }}>{c.year}</span>
              </div>
              <h3 className="font-bold text-white text-sm mb-1 group-hover:text-[#c9a84c] transition-colors leading-snug">{c.title}</h3>
              <p className="text-xs font-semibold mb-3" style={{ color: c.color }}>{c.org}</p>
              <p className="text-gray-500 text-xs leading-relaxed mb-4">{c.desc}</p>
              {c.doc !== "#" && (
                <a href={c.doc} target="_blank"
                  className="flex items-center gap-1.5 text-xs font-semibold transition-colors hover:underline"
                  style={{ color: c.color }}>
                  <ExternalLink size={11} /> View Document
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
