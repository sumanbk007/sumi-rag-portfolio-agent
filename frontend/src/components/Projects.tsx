"use client";

import { useRef } from "react";
import { useInView } from "@/lib/useInView";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "KrispCall Dialer",
    role: "Core Contributor",
    type: "Professional",
    description:
      "Core VoIP calling and SMS product powering KrispCall's web app and Chrome extension. Independently built the Quick SMS and Add Tag features.",
    tech: ["React.js", "TypeScript", "Twilio SDK", "WebSocket"],
    link: "https://krispcall.com",
    highlight: true,
    color: "accent",
    features: [
      "VoIP calling & SMS via Twilio",
      "Quick SMS with templates",
      "Conversation tagging system",
    ],
  },
  {
    number: "02",
    title: "KrispCall Chrome Extension",
    role: "Lead Developer",
    type: "Professional",
    description:
      "Chrome extension embedding the KrispCall dialer into Zoho, Salesforce, MS Teams, and Pipedrive. Click-to-call via auto-populated CRM phone numbers.",
    tech: ["React.js", "TypeScript", "Chrome APIs", "CRM Integrations"],
    link: "https://chrome.google.com",
    highlight: true,
    color: "accent-2",
    features: [
      "Click-to-call from 4 CRMs",
      "Auto-populates phone numbers",
      "Weekly updates, 1-day store approval",
    ],
  },
  {
    number: "03",
    title: "Cramly — Study App",
    role: "Freelance Frontend Developer",
    type: "Freelance",
    description:
      "AI-powered study productivity app. Fixed critical bugs across content processing, quiz generation, flashcard formatting, and subscription enforcement.",
    tech: ["React.js", "JavaScript", "REST APIs", "AI Integration"],
    link: "https://cramly.ai",
    highlight: false,
    features: ["AI quiz generation", "Flashcard system", "Subscription enforcement"],
  },
  {
    number: "04",
    title: "Rental Solutions",
    role: "Freelance Frontend Developer",
    type: "Freelance",
    description:
      "Full-stack vehicle rental management system with admin panel, real-time dashboard analytics, and secure auth with refresh tokens.",
    tech: ["React.js", "Node.js", "Redux Toolkit", "WebSocket", "Chart.js"],
    link: "#",
    highlight: false,
    features: ["Real-time analytics", "Secure token auth", "Chart.js dashboard"],
  },
];

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section id="projects" ref={ref} className="py-24 md:py-32 relative bg-surface-2">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E5E1D8] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E5E1D8] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex items-center gap-3 mb-12 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-mono text-accent text-sm font-medium">04.</span>
          <h2 className="text-2xl md:text-3xl font-bold text-text">Projects</h2>
          <div className="flex-1 h-px bg-[#E5E1D8] max-w-xs" />
        </div>

        {/* Featured */}
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          {projects.filter((p) => p.highlight).map((project, i) => (
            <div
              key={project.number}
              className="group relative p-7 rounded-xl border border-[#E5E1D8] bg-white card-shadow hover:card-shadow-hover hover:border-accent/25 transition-all duration-300 overflow-hidden"
              style={{
                transitionProperty: "opacity, transform, border-color, box-shadow",
                transitionDuration: "700ms",
                transitionDelay: `${i * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {/* Top accent stripe */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 ${project.color === "accent" ? "bg-gradient-to-r from-accent to-accent/30" : "bg-gradient-to-r from-accent-2 to-accent-2/30"}`} />

              <div className="flex items-start justify-between mb-5">
                <span className={`text-4xl font-bold font-mono ${project.color === "accent" ? "text-accent/15" : "text-accent-2/15"} group-hover:opacity-100 transition-opacity`}>
                  {project.number}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-medium ${
                    project.color === "accent"
                      ? "border-accent/20 text-accent bg-accent-light"
                      : "border-accent-2/20 text-accent-2 bg-accent-2-light"
                  }`}>
                    {project.type}
                  </span>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-accent transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <h3 className="text-lg font-bold text-text mb-0.5">{project.title}</h3>
              <p className={`text-xs font-mono mb-3 font-medium ${project.color === "accent" ? "text-accent" : "text-accent-2"}`}>{project.role}</p>
              <p className="text-sm text-subtle leading-relaxed mb-5">{project.description}</p>

              <ul className="space-y-1.5 mb-5">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-2 text-xs text-muted">
                    <span className={project.color === "accent" ? "text-accent" : "text-accent-2"}>▸</span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="text-[11px] font-mono px-2 py-0.5 rounded-lg bg-[#F8F7F4] border border-[#E5E1D8] text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Other projects */}
        <div className="grid sm:grid-cols-2 gap-4">
          {projects.filter((p) => !p.highlight).map((project, i) => (
            <div
              key={project.number}
              className="group p-5 rounded-xl border border-[#E5E1D8] bg-white card-shadow hover:card-shadow-hover hover:border-accent/20 transition-all duration-300"
              style={{
                transitionProperty: "opacity, transform, border-color, box-shadow",
                transitionDuration: "700ms",
                transitionDelay: `${(i + 2) * 100}ms`,
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0)" : "translateY(20px)",
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-2xl font-bold font-mono text-[#E5E1D8] group-hover:text-accent/20 transition-colors">
                  {project.number}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-[#E5E1D8] text-muted bg-[#F8F7F4]">
                    {project.type}
                  </span>
                  {project.link !== "#" && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-accent transition-colors">
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="text-sm font-semibold text-text mb-0.5">{project.title}</h3>
              <p className="text-[11px] font-mono text-accent mb-2 font-medium">{project.role}</p>
              <p className="text-xs text-subtle leading-relaxed mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-[#F8F7F4] border border-[#E5E1D8] text-muted">
                    {t}
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
