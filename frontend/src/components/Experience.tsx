"use client";

import { useRef, useState } from "react";
import { useInView } from "@/lib/useInView";
import { ChevronDown, ChevronUp } from "lucide-react";

const experiences = [
  {
    title: "Software Engineer",
    company: "Dalfin AI",
    companyDesc: "AI-Powered No-Code Application Builder",
    period: "Jan 2026 – Present",
    current: true,
    tech: [
      "React.js",
      "TypeScript",
      "JavaScript",
      "REST APIs",
      "Component Architecture",
    ],
    bullets: [
      "Building the core builder UI for an AI-powered, no-code application platform — enabling users to visually construct software through a real-time, drag-and-drop interface.",
      "Developed the style and properties editor, allowing users to modify component styling and props with instant, real-time UI preview updates.",
      "Implemented drag-and-drop functionality for placing, reordering, and configuring UI elements directly on the canvas.",
      "Led the development of a membership management module for a client project, owning the feature end-to-end from requirements through delivery.",
      "Collaborated closely with backend engineers and product stakeholders in an Agile environment to scope, build, and ship features iteratively.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "KrispCall",
    companyDesc: "Cloud VoIP & Communication SaaS",
    period: "May 2024 – Dec 2025",
    current: false,
    tech: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Ant Design",
      "Apollo Client",
      "WebSocket",
      "Styled Components",
      "Twilio SDK",
    ],
    bullets: [
      "Designed and built a shared component library and design system adopted across the KrispCall web app and Chrome extension, cutting UI inconsistencies and reducing new feature build time across the team.",
      "Owned the full frontend of the Integration Platform — a multi-CRM connector (Zoho, Salesforce, MS Teams, Pipedrive) — from architecture through delivery, handling complex async data flows and real-time UI state.",
      "Built the KrispCall Dialer UI — a VoIP calling and SMS interface powered by the Twilio SDK — used by thousands of users daily across the web app and Chrome extension.",
      "Reduced redundant API calls by 35% by designing a client-side caching strategy with Apollo Client, directly improving responsiveness in high-frequency workflows.",
    ],
  },
  {
    title: "Frontend Developer",
    company: "Yeti Tech Pvt. Ltd",
    companyDesc: null,
    period: "Sept 2023 – April 2024",
    current: false,
    tech: [
      "React.js",
      "Axios",
      "Styled Components",
      "Ant Design",
      "Redux Toolkit",
      "WebSocket",
    ],
    bullets: [
      "Built the full frontend for an HRMS platform from scratch — covering leave management, user roles, admin workflows, and a WebSocket-driven real-time notification system across all user sessions.",
      "Delivered a real-time café billing and inventory management system with live stock tracking via WebSockets, providing sub-second UI updates across all connected clients.",
      "Architected data-fetching and rendering patterns for data-heavy dashboard interfaces, eliminating visible lag on large datasets.",
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 md:py-32 relative bg-bg"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E5E1D8] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex items-center gap-3 mb-12 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-mono text-accent text-sm font-medium">03.</span>
          <h2 className="text-2xl md:text-3xl font-bold text-text">
            Experience
          </h2>
          <div className="flex-1 h-px bg-[#E5E1D8] max-w-xs" />
        </div>

        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[#E5E1D8] hidden md:block" />

          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className="relative"
                style={{
                  transitionProperty: "opacity, transform",
                  transitionDuration: "700ms",
                  transitionDelay: `${i * 100}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className="absolute left-2 top-6 w-4 h-4 rounded-full border-2 border-accent bg-bg hidden md:flex items-center justify-center">
                  {exp.current && (
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  )}
                </div>

                <div
                  className="md:ml-12 border border-[#E5E1D8] rounded-xl bg-white card-shadow hover:card-shadow-hover hover:border-accent/25 transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                >
                  <div className="p-5 md:p-6 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-text">
                          {exp.title}
                        </h3>
                        {exp.current && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-light text-accent border border-accent/20 font-medium">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm text-accent font-semibold">
                          {exp.company}
                        </span>
                        {exp.companyDesc && (
                          <span className="text-xs text-muted">
                            — {exp.companyDesc}
                          </span>
                        )}
                        <span className="text-xs font-mono text-muted">
                          {exp.period}
                        </span>
                      </div>
                    </div>
                    <button className="text-muted hover:text-accent transition-colors flex-shrink-0 mt-0.5">
                      {expanded === i ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </button>
                  </div>

                  {expanded === i && (
                    <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-[#E5E1D8] bg-[#FAFAF8]">
                      <ul className="mt-4 space-y-2.5">
                        {exp.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="flex gap-3 text-sm text-subtle leading-relaxed"
                          >
                            <span className="text-accent mt-1.5 flex-shrink-0 text-xs">
                              ▸
                            </span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="text-xs font-mono px-2.5 py-1 rounded-lg border border-[#E5E1D8] text-muted bg-white"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
