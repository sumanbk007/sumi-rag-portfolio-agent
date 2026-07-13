"use client";

import { useRef } from "react";
import { useInView } from "@/lib/useInView";

const stats = [
  { value: "3+", label: "Years Experience" },
  { value: "2", label: "Companies" },
  { value: "4+", label: "Projects Shipped" },
  { value: "∞", label: "Cups of Coffee" },
];

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 relative bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex items-center gap-3 mb-12 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-mono text-accent text-sm font-medium">01.</span>
          <h2 className="text-2xl md:text-3xl font-bold text-text">About Me</h2>
          <div className="flex-1 h-px bg-[#E5E1D8] max-w-xs" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div
            className={`space-y-4 transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-subtle leading-relaxed">
              I&apos;m a mid-level Frontend Engineer based in{" "}
              <span className="text-text font-medium">Kathmandu, Nepal</span>,
              specialising in building production-grade web apps with{" "}
              <span className="text-accent font-medium">React.js</span>,{" "}
              <span className="text-accent font-medium">Next.js</span>, and{" "}
              <span className="text-accent font-medium">TypeScript</span>.
            </p>
            <p className="text-subtle leading-relaxed">
              Over 3+ years, I&apos;ve independently led complex integrations,
              optimised frontend performance, and collaborated across design,
              backend, and product teams — most recently at{" "}
              <span className="text-text font-semibold">KrispCall</span>, where
              I built their Chrome Extension and Integration Platform.
            </p>
            <p className="text-subtle leading-relaxed">
              I care deeply about code quality, developer experience, and
              shipping features that actually work in production.
            </p>

            <div className="pt-4 flex flex-wrap gap-2">
              {[
                "React.js",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Apollo Client",
                "Redux Toolkit",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[#E5E1D8] text-subtle bg-white card-shadow"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-6 rounded-xl border border-[#E5E1D8] bg-white card-shadow hover:card-shadow-hover hover:border-accent/20 transition-all duration-300 group"
                >
                  <div className="text-3xl font-bold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-mono text-muted uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-5 rounded-xl border border-[#E5E1D8] bg-white card-shadow">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-accent-light border border-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🎓</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-text">
                    BSc. CSIT
                  </div>
                  <div className="text-xs text-subtle mt-0.5 leading-relaxed">
                    Madan Bhandari Memorial College, Tribhuvan University
                  </div>
                  <div className="text-xs font-mono text-muted mt-1">
                    2018 – 2023
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
