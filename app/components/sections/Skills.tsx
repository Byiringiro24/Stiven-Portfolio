"use client";

import React, { useEffect, useRef, useState } from "react";

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const skillGroups = [
  {
    cat: "Professional Skills",
    icon: "🏗️",
    color: "#c9a84c",
    items: [
      { name: "Structural Design",                      pct: 90 },
      { name: "Site Engineering",                       pct: 92 },
      { name: "Project Management",                     pct: 85 },
      { name: "Quantity Surveying",                     pct: 82 },
      { name: "Geotechnical Investigation & Lab Testing", pct: 88 },
    ],
  },
  {
    cat: "Civil Engineering Software",
    icon: "💻",
    color: "#e8c97a",
    items: [
      { name: "Protastructure (Certified – NZIZA GLOBAL)", pct: 88 },
      { name: "AutoCAD (Drafting)",                        pct: 90 },
      { name: "ArchiCAD",                                  pct: 75 },
      { name: "Microsoft Excel",                           pct: 85 },
      { name: "Microsoft Project",                         pct: 80 },
    ],
  },
  {
    cat: "Field Equipment & Testing",
    icon: "🔬",
    color: "#a07830",
    items: [
      { name: "Dumpy Level (Site Levelling)",  pct: 90 },
      { name: "Laser Level (Surveying)",       pct: 88 },
      { name: "Cone Penetration Test",         pct: 85 },
      { name: "Direct Shear Test",             pct: 83 },
      { name: "Sieve Analysis (Wet & Dry)",    pct: 87 },
    ],
  },
];

const labTests = [
  "Cone Penetration Test",
  "Direct Shear Test",
  "Sieve Analysis (Wet & Dry)",
  "Proctor Test",
  "Slump Test",
  "Geotechnical Investigation Report",
  "BBS Preparation",
  "Foundation Layout",
  "Concrete Grade Verification",
  "Materials Inspection",
];

function SkillBar({ name, pct, color, animate }: { name: string; pct: number; color: string; animate: boolean }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-gray-300 text-sm">{name}</span>
        <span className="text-xs font-bold" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all ease-out"
          style={{
            width: animate ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}bb)`,
            boxShadow: animate ? `0 0 8px ${color}55` : "none",
            transitionDuration: "1.6s",
          }} />
      </div>
    </div>
  );
}

export default function Skills() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section id="skills" ref={ref} className="relative py-32 overflow-hidden bg-[#0d0d0d]">
      <div className="absolute inset-0 section-gradient" />
      <div className="relative max-w-7xl mx-auto px-6">

        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-[0.35em] mb-4 block">Expertise</span>
          <h2 className="section-title mb-5">Professional <span className="gold-text">Skills</span></h2>
          <div className="gold-divider" />
        </div>

        {/* Skill bars grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {skillGroups.map((grp, gi) => (
            <div key={grp.cat}
              className={`glass gold-border rounded-3xl p-7 card-hover transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${gi * 150}ms` }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{grp.icon}</span>
                <h3 className="font-bold text-base" style={{ color: grp.color }}>{grp.cat}</h3>
              </div>
              {grp.items.map((s) => (
                <SkillBar key={s.name} name={s.name} pct={s.pct} color={grp.color} animate={inView} />
              ))}
            </div>
          ))}
        </div>

        {/* Lab tests / competencies marquee */}
        <div>
          <p className="text-center text-gray-500 text-xs uppercase tracking-[0.3em] mb-8">Core Competencies</p>
          <div className="overflow-hidden relative">
            <div className="marquee-track flex gap-4 w-max">
              {[...labTests, ...labTests].map((t, i) => (
                <div key={i}
                  className="glass gold-border rounded-full px-5 py-2.5 text-sm font-medium text-gray-300 hover:text-[#c9a84c] transition-colors whitespace-nowrap cursor-default">
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
