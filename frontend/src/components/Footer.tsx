import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-[#E5E1D8] bg-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-mono text-sm text-accent tracking-widest uppercase font-medium">
              SBK<span className="text-accent">_</span>
            </span>
            <span className="text-xs font-mono text-muted">
              © {year} Suman B.K. All rights reserved.
            </span>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-6">
            {["About", "Skills", "Experience", "Projects", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-xs font-mono text-muted hover:text-accent transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-[#E5E1D8] bg-white flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all card-shadow"
              aria-label="GitHub"
            >
              <Github size={14} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg border border-[#E5E1D8] bg-white flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all card-shadow"
              aria-label="LinkedIn"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="mailto:bksuman1211@gmail.com"
              className="w-8 h-8 rounded-lg border border-[#E5E1D8] bg-white flex items-center justify-center text-muted hover:text-accent hover:border-accent/30 transition-all card-shadow"
              aria-label="Email"
            >
              <Mail size={14} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#E5E1D8]/60 flex justify-center">
          <span className="text-xs font-mono text-muted/60">
            Kathmandu, Nepal 🇳🇵
          </span>
        </div>
      </div>
    </footer>
  );
}
