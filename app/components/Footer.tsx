"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-black border-t border-[#c9a84c]/15 py-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#c9a84c]/3 to-transparent pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full border-2 border-[#c9a84c] flex items-center justify-center bg-[#c9a84c]/10">
              <span className="text-[#c9a84c] font-black text-lg">S</span>
            </div>
            <div>
              <div className="font-bold text-white text-sm">NIYOMUGABO Stiven</div>
              <div className="text-xs text-[#c9a84c] tracking-widest uppercase">Civil & Geotechnical Engineer</div>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-5 text-xs text-gray-400">
            {["home","about","skills","experience","projects","certificates","gallery","contact"].map((l) => (
              <a key={l} href={`#${l}`} className="capitalize hover:text-[#c9a84c] transition-colors">{l}</a>
            ))}
          </nav>

          {/* Contact quick */}
          <div className="flex flex-col items-end gap-1 text-xs text-gray-500">
            <span>📞 +250 788 890 109</span>
            <span>📧 niyomstiven@gmail.com</span>
            <span>📍 Kigali, Rwanda</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <span>© {year} NIYOMUGABO Stiven. All rights reserved.</span>
          <span>BSc Civil Engineer · IER Member · ARK Design Ltd</span>
          <a href="/docs/resume.pdf" target="_blank" className="text-[#c9a84c] hover:underline">Download CV</a>
        </div>
      </div>
    </footer>
  );
}
