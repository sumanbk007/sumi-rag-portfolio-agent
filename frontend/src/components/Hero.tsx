"use client";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Download, ArrowRight } from "lucide-react";
import TechTicker from "./TechTicker";

const roles = ["Fullstack Developer", "React.js Specialist", "AI Enthusiast"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = roles[roleIndex];
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      const type = () => {
        if (i <= target.length) {
          setDisplayed(target.slice(0, i));
          i++;
          timeout = setTimeout(type, 60);
        } else {
          timeout = setTimeout(() => setTyping(false), 1800);
        }
      };
      type();
    } else {
      let j = target.length;
      const erase = () => {
        if (j >= 0) {
          setDisplayed(target.slice(0, j));
          j--;
          timeout = setTimeout(erase, 35);
        } else {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setTyping(true);
        }
      };
      erase();
    }
    return () => clearTimeout(timeout);
  }, [roleIndex, typing]);

  return (
    <>
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-20 bg-bg overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-accent/6 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-accent-2/5 blur-[100px] pointer-events-none" />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(circle, #C5C0B8 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
        {/* Fade out dot grid at edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #F8F7F4 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6  w-full">
          <div className="max-w-3xl">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 mb-8 px-3 py-1.5 rounded-full border border-accent/30 bg-accent-light">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono text-accent tracking-widest uppercase font-medium">
                Available for new opportunities
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold leading-none tracking-tight mb-3">
              <span className="text-text">Hi, I&apos;m </span>
              <span className="text-gradient">Suman B.K.</span>
            </h1>

            {/* Typewriter */}
            <div className="h-12 md:h-14 flex items-center mb-3">
              <span className="text-2xl md:text-3xl font-mono text-subtle">
                {displayed}
                <span className="inline-block w-[3px] h-6 md:h-8 ml-1 bg-accent animate-blink align-middle rounded-sm" />
              </span>
            </div>

            {/* Description */}
            <p className="text-subtle text-base md:text-lg leading-relaxed max-w-xl mb-4">
              {/* 3+ years shipping production features in SaaS environments.
              Specialised in{" "}
              <span className="text-text font-semibold">React.js, Next.js</span>{" "}
              and <span className="text-text font-semibold">TypeScript</span> —
              building fast, accessible, and delightful interfaces. */}
              3+ years of experience building and shipping production-ready
              features for SaaS products. I specialize in{" "}
              <span className="text-text font-semibold">
                {" "}
                React.js, Next.js, TypeScript{" "}
              </span>
              , and{" "}
              <span className="text-text font-semibold">
                {" "}
                Node.js, Python{" "}
              </span>{" "}
              creating fast, scalable, and user-friendly web applications with a
              strong focus on performance, accessibility, and clean code.
            </p>

            {/* Location */}
            <div className="flex items-center gap-1.5 mb-10">
              <span className="text-sm">📍</span>
              <span className="text-sm font-mono text-muted">
                Kathmandu, Nepal
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-12">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-text text-bg font-medium text-sm rounded-md hover:bg-text/90 transition-colors"
              >
                See my work <ArrowRight size={15} />
              </a>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#E5E1D8] bg-white text-text text-sm rounded-md hover:border-[#C5C0B8] transition-colors shadow-sm"
              >
                <Download size={15} /> Download Resume
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md border border-[#E5E1D8] bg-white flex items-center justify-center text-muted hover:text-text hover:border-[#C5C0B8] transition-all shadow-sm"
                aria-label="GitHub"
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-md border border-[#E5E1D8] bg-white flex items-center justify-center text-muted hover:text-text hover:border-[#C5C0B8] transition-all shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:bksuman1211@gmail.com"
                className="w-9 h-9 rounded-md border border-[#E5E1D8] bg-white flex items-center justify-center text-muted hover:text-text hover:border-[#C5C0B8] transition-all shadow-sm"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
              <div className="h-px w-10 bg-[#E5E1D8]" />
              <span className="text-xs font-mono text-muted">
                +977-9865762489
              </span>
            </div>
          </div>
        </div>
      </section>

      <TechTicker />
    </>
  );
}
