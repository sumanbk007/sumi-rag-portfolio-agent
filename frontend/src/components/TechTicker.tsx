const techs = [
  { name: "React.js", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind CSS", icon: "🌊" },
  { name: "Apollo Client", icon: "◉" },
  { name: "Node.js", icon: "⬡" },
  { name: "FastAPI", icon: "⚡" },
  { name: "Python", icon: "🐍" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "MongoDB", icon: "🍃" },
  { name: "WebSockets", icon: "⇄" },
  { name: "Redux Toolkit", icon: "⟲" },
  { name: "Docker", icon: "🐳" },
  { name: "Git", icon: "⎇" },
  { name: "Ant Design", icon: "◆" },
  { name: "Twilio SDK", icon: "📞" },
  { name: "TanStack Query", icon: "♾" },
  { name: "Zustand", icon: "◈" },
];

export default function TechTicker() {
  const items = [...techs, ...techs];

  return (
    <div className="max-w-6xl mx-auto px-6 bg-[#F8F7F4] py-5 select-none relative">
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #F8F7F4, transparent)",
        }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #F8F7F4, transparent)" }}
      />

      <div className="overflow-hidden">
        <div className="flex w-max animate-ticker">
          {items.map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-2 mx-2 px-4 py-2 rounded-full bg-white shadow-sm whitespace-nowrap"
            >
              <span className="text-sm leading-none">{tech.icon}</span>
              <span className="text-sm font-mono text-[#1A1917]">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
