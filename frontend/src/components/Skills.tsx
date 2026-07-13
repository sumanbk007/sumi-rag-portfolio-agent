"use client";

import { useRef } from "react";
import { useInView } from "@/lib/useInView";

const sections = [
  {
    category: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
    ],
  },
  {
    category: "Design Systems",
    items: [
      "Tailwind CSS",
      "Ant Design",
      "Styled Components",
      "Component Architecture",
      "Design Tokens",
    ],
  },
  {
    category: "State & Data",
    items: [
      "Apollo Client",
      "TanStack Query",
      "Redux Toolkit",
      "Zustand",
      "Context API",
      "Axios",
      "WebSockets",
    ],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "Python", "FastAPI", "REST APIs"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB"],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "GitHub",
      "Docker",
      "Postman",
      "Linux",
      "Jira",
      "Chrome DevTools",
    ],
  },
];

export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 md:py-32 relative bg-[#F1EFE9]"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E5E1D8] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Heading — same pattern as Experience */}
        <div
          className={`flex items-center gap-3 mb-12 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-mono text-accent text-sm font-medium">02.</span>
          <h2 className="text-2xl md:text-3xl font-bold text-text">Skills</h2>
          <div className="flex-1 h-px bg-[#E5E1D8] max-w-xs" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map((section, i) => (
            <div
              key={section.category}
              className="bg-white border border-[#E5E1D8] rounded-xl p-5 flex flex-col gap-4 hover:border-[#C5C0B8] transition-colors duration-150"
              style={{
                transitionProperty: "opacity, transform, border-color",
                transitionDuration: "700ms",
                transitionDelay: `${i * 60}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(16px)",
              }}
            >
              <span className="text-[11px] font-mono text-[#A09C93] uppercase tracking-widest">
                {section.category}
              </span>
              <div className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm text-[#1A1917] bg-[#F8F7F4] border border-[#E5E1D8] px-3 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
