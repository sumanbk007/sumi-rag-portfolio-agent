"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F8F7F4]/90 backdrop-blur-md border-b border-[#E5E1D8]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-mono text-sm text-accent tracking-widest uppercase font-medium">
          SBK<span className="animate-blink text-accent">_</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-subtle hover:text-text transition-colors duration-200 font-mono tracking-wide"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="mailto:bksuman1211@gmail.com"
          className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-xs font-mono border border-accent text-accent rounded-lg hover:bg-accent hover:text-white transition-all duration-200"
        >
          Hire Me
        </a>

        <button
          className="md:hidden text-subtle hover:text-text"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-[#F8F7F4]/95 backdrop-blur-md border-b border-[#E5E1D8]">
          <ul className="flex flex-col px-6 py-4 gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-subtle hover:text-text transition-colors font-mono"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href="mailto:bksuman1211@gmail.com" className="text-sm font-mono text-accent">
                Hire Me →
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
