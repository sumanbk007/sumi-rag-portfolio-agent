"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot, User } from "lucide-react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const SUGGESTED_QUESTIONS = [
  "What's Suman's experience with React?",
  "Tell me about the KrispCall projects",
  "What are Suman's key skills?",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Sumi, Suman's portfolio assistant. Ask me anything about his skills, experience, or projects.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      if (!res.ok) throw new Error("Request failed");

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.answer },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I couldn't reach the server. Please make sure the backend is running and try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-white flex items-center justify-center shadow-lg hover:bg-accent/90 hover:scale-105 transition-all duration-200"
        aria-label="Toggle chat"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] sm:w-96 h-[32rem] bg-white border border-[#E5E1D8] rounded-2xl card-shadow-hover flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E5E1D8] bg-[#FAFAF8]">
            <div className="w-9 h-9 rounded-full bg-accent-light border border-accent/20 flex items-center justify-center">
              <Bot size={16} className="text-accent" />
            </div>
            <div>
              <div className="text-sm font-semibold text-text">Sumi</div>
              <div className="text-xs font-mono text-muted">
                Ask about Suman&apos;s work
              </div>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={13} className="text-accent" />
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-3.5 py-2.5 rounded-xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-accent text-white rounded-br-sm"
                      : "bg-[#F1EFE9] text-text rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-[#F1EFE9] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={13} className="text-subtle" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-accent-light flex items-center justify-center flex-shrink-0">
                  <Bot size={13} className="text-accent" />
                </div>
                <div className="px-3.5 py-2.5 rounded-xl bg-[#F1EFE9] flex items-center gap-1.5">
                  <Loader2 size={14} className="animate-spin text-muted" />
                  <span className="text-xs text-muted font-mono">
                    thinking...
                  </span>
                </div>
              </div>
            )}

            {/* Suggested questions, shown only at start */}
            {messages.length === 1 && !loading && (
              <div className="flex flex-col gap-2 pt-2">
                {SUGGESTED_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendMessage(q)}
                    className="text-left text-xs font-mono px-3 py-2 rounded-lg border border-[#E5E1D8] text-subtle hover:border-accent/30 hover:text-accent hover:bg-accent-light transition-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 p-3 border-t border-[#E5E1D8]"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              disabled={loading}
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-[#E5E1D8] bg-[#FAFAF8] text-sm text-text placeholder:text-muted focus:outline-none focus:border-accent/40 transition-colors disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-lg bg-accent text-white flex items-center justify-center hover:bg-accent/90 disabled:opacity-40 disabled:hover:bg-accent transition-all flex-shrink-0"
              aria-label="Send"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
