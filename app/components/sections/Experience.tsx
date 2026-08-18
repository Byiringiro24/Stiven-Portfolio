"use client";

import React, { useEffect, useRef, useState } from "react";
import { Briefcase, HardHat, ClipboardList, Building2 } from "lucide-react";

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

const experiences = [
  {
    company: "ARK Design Ltd",
    period: "2024 – Present",
    location: "Kigali, Rwanda",
    icon: Building2,
    color: "#c9a84c",
    current: true,
    roles: [
      {
        title: "Structural Engineer",
        period: "January 2025 – Present",
        icon: HardHat,
        bullets: [
          "Structural designer on ISOOKO TOWN VILLAGE — residential complex to be constructed in Gasabo, Kinyinya Sector, Kagugu Cell.",
          "Designed URBAIN APARTMENT constructed in Kicukiro-Kagarama.",
          "Prepared complete structural drawings, calculations and specifications.",
        ],
      },
      {
        title: "Project Manager",
        period: "July – August 2024",
        icon: ClipboardList,
        bullets: [
          "Managed a guest house construction project at Bugesera, Mayange.",
          "Responsibilities: labour engagement, materials acquisition, payroll preparation, wages payment, project supervising and timeline monitoring.",
        ],
      },
      {
        title: "Site Engineer",
        period: "August 2025 – Present",
        icon: HardHat,
        bullets: [
          "Site engineer on three concurrent residential projects:",
          "— G+1 with basement at Kicukiro, Gatenga, Nyarurama, Nyabikenke",
          "— G+1 at Kicukiro, Gatenga, Rebero, Kabeza",
          "— Single-storey house at Gasabo, Jabana, Ngiryi-Gasharu",
          "Responsibilities: building setting-out, labour engagement, daily work monitoring, payroll preparation and wages payment.",
        ],
      },
    ],
  },
  {
    company: "Decent Engineering Construction Ltd",
    period: "September – November 2024",
    location: "Kicukiro, Kanombe, Rubirizi Busanza",
    icon: Briefcase,
    color: "#e8c97a",
    current: false,
    roles: [
      {
        title: "Internship — Site & Structural Engineer",
        period: "Sept 2024 – Nov 2024",
        icon: HardHat,
        bullets: [
          "Site and structural engineer on a G+2 residential house in Kicukiro, Kanombe, Rubirizi Busanza.",
          "Redesigned structural drawings and prepared complete working drawings for the site.",
          "Quantity surveying: material calculations, BBS preparation for steel-fixing and cutting lengths.",
          "Prepared full project schedule from foundation to completion.",
          "Sourced qualified materials — gravels at Ntarama Quarry and Kinyinya bricks.",
          "Concrete pouring supervision: monitoring grade and mix proportions at the concrete mixer.",
        ],
      },
    ],
  },
  {
    company: "Professional Mason",
    period: "2019 – 2023",
    location: "Various sites, Rwanda",
    icon: HardHat,
    color: "#a07830",
    current: false,
    roles: [
      {
        title: "Bricklayer / Mason",
        period: "2019 – 2023",
        icon: HardHat,
        bullets: [
          "Rubavu Technical School — bricklaying works.",
          "GS Cyahafi, Nyarugenge (Nyamirambo Adventist School) — masonry.",
          "Amahoro Stadium mega-project — bricklayer (one of Rwanda's landmark projects).",
          "Numerous residential and institutional projects across the country.",
        ],
      },
    ],
  },
];

export default function Experience() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section id="experience" ref={ref} className="relative py-32 overflow-hidden bg-[#0d0d0d]">
      <div className="absolute inset-0 section-gradient" />
      <div className="relative max-w-7xl mx-auto px-6">

        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-[0.35em] mb-4 block">Career</span>
          <h2 className="section-title mb-5">Work <span className="gold-text">Experience</span></h2>
          <div className="gold-divider" />
        </div>

        <div className="space-y-12">
          {experiences.map((exp, ei) => (
            <div key={exp.company}
              className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
              style={{ transitionDelay: `${ei * 150}ms` }}>

              {/* Company header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: exp.color + "18", border: `2px solid ${exp.color}` }}>
                  <exp.icon size={22} style={{ color: exp.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="text-white font-bold text-xl">{exp.company}</h3>
                    {exp.current && (
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/15 text-green-400 border border-green-500/30">
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-0.5">{exp.period} · {exp.location}</p>
                </div>
              </div>

              {/* Roles */}
              <div className="ml-4 pl-10 border-l-2 border-[#c9a84c]/20 space-y-6">
                {exp.roles.map((role, ri) => (
                  <div key={ri} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-[2.85rem] top-1 w-3 h-3 rounded-full border-2 border-[#c9a84c] bg-[#0a0a0a]" />

                    <div className="glass gold-border rounded-2xl p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-2">
                          <role.icon size={16} style={{ color: exp.color }} />
                          <span className="font-bold text-white text-base">{role.title}</span>
                        </div>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ color: exp.color, background: exp.color + "15" }}>
                          {role.period}
                        </span>
                      </div>
                      <ul className="space-y-2">
                        {role.bullets.map((b, bi) => (
                          <li key={bi} className="flex gap-3 text-sm text-gray-400 leading-relaxed">
                            <span className="text-[#c9a84c] shrink-0 mt-0.5">▸</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
