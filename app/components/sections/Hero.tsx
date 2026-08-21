"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Download, Mail, MapPin, Phone } from "lucide-react";

const roles = [
  "Civil Engineer",
  "Structural Designer",
  "Site Engineer",
  "Geotechnical Specialist",
  "Project Manager",
  "Quantity Surveyor",
];

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 50 }).map((_, i) => (
        <div key={i} className="absolute rounded-full"
          style={{
            width:  Math.random() * 3 + 1 + "px",
            height: Math.random() * 3 + 1 + "px",
            background: `rgba(201,168,76,${Math.random() * 0.5 + 0.1})`,
            left: Math.random() * 100 + "%",
            top:  Math.random() * 100 + "%",
            animation: `float ${Math.random() * 6 + 4}s ease-in-out infinite`,
            animationDelay: Math.random() * 6 + "s",
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  const [roleIdx,   setRoleIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting,  setDeleting]  = useState(false);
  const [counts,    setCounts]    = useState({ projects: 0, years: 0, buildings: 0 });

  /* Typing */
  useEffect(() => {
    const role = roles[roleIdx];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < role.length)
      t = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 75);
    else if (!deleting && displayed.length === role.length)
      t = setTimeout(() => setDeleting(true), 2400);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    else { setDeleting(false); setRoleIdx((roleIdx + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, roleIdx]);

  /* Count-up */
  useEffect(() => {
    const targets = { projects: 6, years: 5, buildings: 10 };
    let step = 0;
    const iv = setInterval(() => {
      step++;
      const p = Math.min(step / 60, 1);
      setCounts({ projects: Math.round(targets.projects * p), years: Math.round(targets.years * p), buildings: Math.round(targets.buildings * p) });
      if (step >= 60) clearInterval(iv);
    }, 35);
    return () => clearInterval(iv);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      <div className="absolute inset-0 hero-gradient" />
      <Particles />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: "linear-gradient(#c9a84c 1px,transparent 1px),linear-gradient(90deg,#c9a84c 1px,transparent 1px)", backgroundSize: "80px 80px" }} />

      {/* Spinning rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] rounded-full border border-[#c9a84c]/10 spin-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] rounded-full border border-[#c9a84c]/05"
        style={{ animation: "spin-slow 16s linear infinite reverse" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 grid lg:grid-cols-2 gap-16 items-center">

        {/* ── LEFT ── */}
        <div>
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[#c9a84c] text-sm font-medium">Currently at ARK Design Ltd</span>
          </div>

          {/* Name */}
          <h1 className="font-black mb-3"
            style={{ fontSize: "clamp(2.4rem,6vw,4.2rem)", lineHeight: 1.05, fontFamily: "'Space Grotesk',sans-serif" }}>
            NIYOMUGABO{" "}
            <span className="gold-text">Stiven</span>
          </h1>

          {/* Typing role */}
          <div className="text-xl md:text-2xl font-semibold text-gray-300 mb-5 h-9 flex items-center gap-1">
            <span>{displayed}</span>
            <span className="cursor-blink text-[#c9a84c]">|</span>
          </div>

          <p className="text-gray-400 text-base leading-relaxed mb-6 max-w-lg">
            BSc (Hons) Civil Engineering — Geotechnical Engineering specialist with hands-on
            experience in <span className="text-[#c9a84c] font-medium">structural design</span>,{" "}
            <span className="text-[#c9a84c] font-medium">site engineering</span> and{" "}
            <span className="text-[#c9a84c] font-medium">project management</span> across
            residential and commercial projects in Rwanda.
          </p>

          {/* Quick contact */}
          <div className="flex flex-col gap-2 mb-8 text-sm text-gray-400">
            <div className="flex items-center gap-2"><MapPin size={14} className="text-[#c9a84c]" /> Kigali, Kicukiro — Nyanza</div>
            <div className="flex items-center gap-2"><Phone  size={14} className="text-[#c9a84c]" /> +250 788 890 109</div>
            <div className="flex items-center gap-2"><Mail   size={14} className="text-[#c9a84c]" /> niyomstiven@gmail.com</div>
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 mb-12">
            <a href="#projects"     className="btn-gold text-sm">View Projects <ChevronDown size={16} /></a>
            <a href="/docs/resume.pdf" target="_blank" className="btn-outline text-sm"><Download size={16} /> Download CV</a>
            <a href="#contact"      className="btn-outline text-sm"><Mail size={16} /> Contact Me</a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: count(counts.projects), suffix: "+", label: "Projects" },
              { val: count(counts.years),    suffix: " yrs", label: "Experience" },
              { val: count(counts.buildings),suffix: "+", label: "Buildings" },
            ].map((s) => (
              <div key={s.label} className="glass gold-border rounded-2xl py-4 text-center">
                <div className="text-2xl font-black gold-text">{s.val}{s.suffix}</div>
                <div className="text-gray-500 text-xs uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — Photo ── */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Dashed orbit */}
            <svg className="absolute -inset-8 w-[calc(100%+4rem)] h-[calc(100%+4rem)] spin-slow" viewBox="0 0 400 400">
              <circle cx="200" cy="200" r="185" fill="none" stroke="#c9a84c" strokeWidth="1" strokeDasharray="10 8" opacity="0.35" />
            </svg>

            {/* Photo */}
            <div className="relative w-72 h-72 md:w-88 md:h-88 rounded-full overflow-hidden border-4 border-[#c9a84c]/50 float-anim"
              style={{ boxShadow: "0 0 60px rgba(201,168,76,0.25),0 0 120px rgba(201,168,76,0.08)", width: "22rem", height: "22rem" }}>
              <img src="/photos/profile/stiven.jpeg" alt="NIYOMUGABO Stiven"
                className="w-full h-full object-cover object-top" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#c9a84c]/15 to-transparent" />
            </div>

            {/* Badge — ARK Design */}
            <div className="absolute -bottom-4 -left-6 glass gold-border rounded-2xl px-4 py-3 float-anim" style={{ animationDelay: "0.8s" }}>
              <div className="text-[#c9a84c] font-bold text-sm">🏗️ ARK Design Ltd</div>
              <div className="text-gray-400 text-xs">Civil Engineer</div>
            </div>

            {/* Badge — IER */}
            <div className="absolute -top-3 -right-6 glass gold-border rounded-2xl px-4 py-3 float-anim" style={{ animationDelay: "1.6s" }}>
              <div className="text-[#c9a84c] font-bold text-sm">🎓 IER Member</div>
              <div className="text-gray-400 text-xs">2026 · Rwanda</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 text-xs">
        <span className="uppercase tracking-widest text-[10px]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#c9a84c] to-transparent animate-bounce" />
      </div>
    </section>
  );
}

function count(n: number) { return n; }
