"use client";

import { useState, useEffect } from "react";
import { Menu, X, HardHat } from "lucide-react";

const links = [
  { label: "Home",         href: "#home" },
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Experience",   href: "#experience" },
  { label: "Projects",     href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Gallery",      href: "#gallery" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = links.map((l) => l.href.slice(1)).reverse();
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-black/85 backdrop-blur-xl border-b border-[#c9a84c]/20 py-3" : "bg-transparent py-5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-full border-2 border-[#c9a84c] flex items-center justify-center bg-[#c9a84c]/10 group-hover:bg-[#c9a84c] transition-all duration-300">
            <HardHat size={18} className="text-[#c9a84c] group-hover:text-black transition-colors" />
          </div>
          <div>
            <div className="font-bold text-sm leading-none text-white">NIYOMUGABO Stiven</div>
            <div className="text-[10px] text-[#c9a84c] tracking-widest uppercase leading-none mt-0.5">Civil Engineer</div>
          </div>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-0.5">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={`px-3 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                active === l.href.slice(1) ? "bg-[#c9a84c] text-black" : "text-gray-300 hover:text-white hover:bg-white/8"
              }`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CV button */}
        <a href="/docs/resume.pdf" target="_blank" className="hidden lg:flex btn-gold text-xs py-2 px-5">
          Download CV
        </a>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-[#c9a84c] p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-black/96 backdrop-blur-xl border-t border-[#c9a84c]/20 px-6 py-6 flex flex-col gap-2">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}
              className={`py-3 px-4 rounded-xl text-sm font-medium transition-all ${
                active === l.href.slice(1) ? "bg-[#c9a84c] text-black" : "text-gray-300 hover:text-[#c9a84c]"
              }`}>
              {l.label}
            </a>
          ))}
          <a href="/docs/resume.pdf" target="_blank" className="btn-gold text-sm mt-3 justify-center">
            Download CV
          </a>
        </div>
      )}
    </nav>
  );
}
