"use client";

import React, { useEffect, useRef, useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

export default function Contact() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [form, setForm]     = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1800);
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 section-gradient" />
      <div className="relative max-w-7xl mx-auto px-6">

        <div className={`text-center mb-20 transition-all duration-1000 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <span className="text-[#c9a84c] text-xs font-bold uppercase tracking-[0.35em] mb-4 block">Get In Touch</span>
          <h2 className="section-title mb-5">Contact <span className="gold-text">Me</span></h2>
          <div className="gold-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left */}
          <div className={`transition-all duration-1000 delay-200 ${inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}>
            <h3 className="text-2xl font-bold text-white mb-4">Let&apos;s Work Together</h3>
            <p className="text-gray-400 leading-relaxed mb-10 text-sm">
              Available for civil engineering projects, structural design consultations,
              site engineering roles and project management engagements across Rwanda and beyond.
            </p>

            <div className="space-y-5 mb-10">
              {[
                { icon: Phone,  label: "Phone",    val: "+250 788 890 109",      href: "tel:+250788890109",              color: "#c9a84c" },
                { icon: Mail,   label: "Email",    val: "niyomstiven@gmail.com", href: "mailto:niyomstiven@gmail.com",   color: "#e8c97a" },
                { icon: MapPin, label: "Location", val: "Kigali, Kicukiro — Nyanza", href: "#",                         color: "#a07830" },
              ].map((item) => (
                <a key={item.label} href={item.href}
                  className="flex items-center gap-5 group">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center glass gold-border group-hover:bg-[#c9a84c]/10 transition-colors shrink-0">
                    <item.icon size={18} style={{ color: item.color }} />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</div>
                    <div className="text-white font-medium text-sm group-hover:text-[#c9a84c] transition-colors">{item.val}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability */}
            <div className="glass gold-border rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 font-semibold text-sm">Available for Projects</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                Currently working at ARK Design Ltd. Open to structural design consultancy,
                site engineering contracts and collaborative civil engineering projects.
              </p>
            </div>
          </div>

          {/* Right — Form */}
          <div className={`glass gold-border rounded-3xl p-8 transition-all duration-1000 delay-300 ${inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}>
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-14">
                <CheckCircle size={60} className="text-[#c9a84c] mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">Message Sent!</h3>
                <p className="text-gray-400 text-sm">Thank you for reaching out. I will get back to you as soon as possible.</p>
                <button onClick={() => setSent(false)} className="btn-outline mt-6 text-sm">Send Another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1.5">Name</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1.5">Email</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1.5">Subject</label>
                  <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Project inquiry, collaboration..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase tracking-wider block mb-1.5">Message</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell me about your project or how I can help..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-[#c9a84c]/50 transition-colors resize-none" />
                </div>
                <button type="submit" disabled={loading} className="btn-gold w-full justify-center text-sm">
                  {loading
                    ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />Sending...</span>
                    : <span className="flex items-center gap-2"><Send size={15} />Send Message</span>}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
