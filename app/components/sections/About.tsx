"use client";

import React, { useEffect, useRef, useState } from "react";
import { GraduationCap, HardHat, BookOpen, Globe } from "lucide-react";

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const education = [
  {
    icon: GraduationCap,
    period: "2021 – 2025",
    title: "BSc (Hons) Civil Engineering: Geotechnical Engineering",
    org: "University of Rwanda — College of Science & Technology",
    color: "#c9a84c",
  },
  {
    icon: BookOpen,
    period: "2017 – 2019",
    title: "Rwanda Advanced Certificate (PCM)",
    org: "GS St Joseph Kabgayi",
    color: "#e8c97a",
  },
];

const languages = ["Kinyarwanda (Native)", "English (Proficient)"];
const hobbies   = ["📖 Reading", "✍️ Writing", "🎵 Singing"];

export default function About() {
  const ref   = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-[0.35em] mb-4 block">Who I Am</span>
          <h2 className="section-title mb-5">About <span className="gold-text">Me</span></h2>
          <div className="gold-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT — Summary + hobbies/languages */}
          <div className={`transition-all duration-1000 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <div className="glass gold-border rounded-3xl p-8 mb-8">
              <div className="flex items-center gap-3 mb-5">
                <HardHat className="text-[#c9a84c]" size={24} />
                <h3 className="text-lg font-bold text-white">Professional Summary</h3>
              </div>
              <p className="text-gray-300 leading-relaxed text-[15px]">
                Result-oriented Graduate Civil Engineer with a proven track record in{" "}
                <span className="text-[#c9a84c] font-semibold">structural design</span>,{" "}
                <span className="text-[#c9a84c] font-semibold">site engineering</span>, and{" "}
                <span className="text-[#c9a84c] font-semibold">project management</span>. Demonstrates a
                unique blend of practical field experience — ranging from masonry to site engineering — and
                technical proficiency in Protastructure and AutoCAD. Adept at managing complex residential
                and commercial projects from foundation layout to final execution, ensuring structural
                integrity and cost-efficiency.
              </p>
            </div>

            {/* Languages */}
            <div className="glass gold-border rounded-2xl p-6 mb-5">
              <div className="flex items-center gap-2 mb-4">
                <Globe size={18} className="text-[#c9a84c]" />
                <span className="font-semibold text-white text-sm uppercase tracking-wider">Languages</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {languages.map((l) => (
                  <span key={l} className="tag">{l}</span>
                ))}
              </div>
            </div>

            {/* Hobbies */}
            <div className="glass gold-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[#c9a84c] text-base">✨</span>
                <span className="font-semibold text-white text-sm uppercase tracking-wider">Hobbies</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {hobbies.map((h) => (
                  <span key={h} className="tag">{h}</span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Education timeline */}
          <div className={`transition-all duration-1000 delay-400 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            <h3 className="font-bold text-white text-lg mb-8 flex items-center gap-3">
              <span className="w-6 h-[2px] bg-[#c9a84c]" />
              Education
            </h3>

            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#c9a84c] via-[#c9a84c]/40 to-transparent" />
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <div key={i}
                    className={`relative pl-16 transition-all duration-700 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                    style={{ transitionDelay: `${i * 200 + 500}ms` }}>
                    <div className="absolute left-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: edu.color + "18", border: `2px solid ${edu.color}` }}>
                      <edu.icon size={18} style={{ color: edu.color }} />
                    </div>
                    <div className="glass gold-border rounded-2xl p-5">
                      <span className="text-xs font-bold uppercase tracking-wider" style={{ color: edu.color }}>{edu.period}</span>
                      <h4 className="text-white font-semibold mt-1 mb-1 text-[15px] leading-snug">{edu.title}</h4>
                      <p className="text-gray-400 text-sm">{edu.org}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact card */}
            <div className={`mt-10 glass gold-border-strong rounded-2xl p-6 transition-all duration-700 delay-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-4">Contact Details</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-[#c9a84c] text-base">📞</span> +250 788 890 109
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-[#c9a84c] text-base">📧</span> niyomstiven@gmail.com
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-[#c9a84c] text-base">📍</span> Kigali, Kicukiro — Nyanza
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
