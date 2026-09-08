"use client";

import { useRef, useState } from "react";
import { useInView } from "@/lib/useInView";
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react";

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("bksuman1211@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 relative bg-bg">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E5E1D8] to-transparent" />

      {/* Soft background blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-6">
        <div
          className={`flex items-center gap-3 mb-12 transition-all duration-700 ${
            inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-mono text-accent text-sm font-medium">05.</span>
          <h2 className="text-2xl md:text-3xl font-bold text-text">
            Get In Touch
          </h2>
          <div className="flex-1 h-px bg-[#E5E1D8] max-w-xs" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div
            className={`transition-all duration-700 delay-100 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <p className="text-subtle text-base leading-relaxed mb-8 max-w-md">
              I&apos;m currently open to new opportunities — full-time roles,
              freelance contracts, or interesting projects. If you&apos;d like
              to work together, just reach out.
            </p>

            <div className="space-y-3 mb-10">
              <button
                onClick={copyEmail}
                className="flex items-center gap-3 group w-full text-left"
              >
                <div className="w-10 h-10 rounded-xl border border-[#E5E1D8] bg-white card-shadow flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent-light transition-all">
                  <Mail
                    size={15}
                    className="text-muted group-hover:text-accent transition-colors"
                  />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted mb-0.5">
                    Email (click to copy)
                  </div>
                  <div className="text-sm font-medium text-text group-hover:text-accent transition-colors">
                    {copied ? "Copied! ✓" : "bksuman1211@gmail.com"}
                  </div>
                </div>
              </button>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-[#E5E1D8] bg-white card-shadow flex items-center justify-center">
                  <Phone size={15} className="text-muted" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted mb-0.5">
                    Phone
                  </div>
                  <div className="text-sm font-medium text-text">
                    +977-9865762489
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl border border-[#E5E1D8] bg-white card-shadow flex items-center justify-center">
                  <MapPin size={15} className="text-muted" />
                </div>
                <div>
                  <div className="text-xs font-mono text-muted mb-0.5">
                    Location
                  </div>
                  <div className="text-sm font-medium text-text">
                    Kathmandu, Nepal
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <a
                href="https://github.com/sumanbk007"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E1D8] bg-white rounded-xl text-subtle hover:text-accent hover:border-accent/30 hover:bg-accent-light text-sm font-mono transition-all card-shadow"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 border border-[#E5E1D8] bg-white rounded-xl text-subtle hover:text-accent-2 hover:border-accent-2/30 hover:bg-accent-2-light text-sm font-mono transition-all card-shadow"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Right: CTA card */}
          <div
            className={`transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="p-8 rounded-2xl border-gradient bg-white card-shadow relative overflow-hidden">
              {/* Decorative blob inside card */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/8 blur-[50px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-accent-2/6 blur-[50px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-accent-light border border-accent/20 flex items-center justify-center mb-6">
                  <Send size={20} className="text-accent" />
                </div>

                <h3 className="text-xl font-bold text-text mb-2">
                  Let&apos;s build something great
                </h3>
                <p className="text-subtle text-sm leading-relaxed mb-8">
                  Whether you have a product to build, a team to join, or an
                  idea to explore — I&apos;m all ears. Drop me an email and
                  I&apos;ll reply within 24 hours.
                </p>

                <a
                  href="mailto:bksuman1211@gmail.com"
                  className="inline-flex items-center gap-2 w-full justify-center px-6 py-3.5 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-accent/90 transition-all shadow-sm hover:shadow-md hover:shadow-accent/20"
                >
                  <Mail size={15} />
                  Send me an email
                </a>

                <div className="mt-4 text-center">
                  <span className="text-xs font-mono text-muted">
                    Usually responds in &lt; 24 hrs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
