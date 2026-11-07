"use client";

import React, { useState, useRef, useEffect } from "react";

export default function Page() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      text: input.trim(),
    };

    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.slice(-10),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: `Error: ${error.message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const newChat = () => {
    setMessages([]);
    setInput("");
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#212121] text-white">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-[270px] flex-col border-r border-white/10 bg-[#171717] p-3 transition-transform duration-300 md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8 flex items-center justify-between px-2 py-2">
          <h1 className="text-xl font-bold">
            ChatGPT <span className="text-gray-400">Clone</span>
          </h1>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 text-gray-400 hover:bg-white/10 md:hidden"
          >
            ✕
          </button>
        </div>

        <button
          onClick={newChat}
          className="flex items-center gap-3 rounded-xl border border-white/20 px-4 py-3 text-sm hover:bg-white/10"
        >
          <span className="text-xl">＋</span>
          New Chat
        </button>

        <div className="mt-8">
          <p className="mb-3 px-3 text-xs font-semibold uppercase text-gray-500">
            Your Chat
          </p>

          {messages.length > 0 ? (
            <div className="truncate rounded-lg bg-white/10 px-3 py-3 text-sm">
              {messages[0].text}
            </div>
          ) : (
            <p className="px-3 text-sm text-gray-500">
              Your conversations will appear here.
            </p>
          )}
        </div>

        <div className="mt-auto border-t border-white/10 pt-4">
          <div className="flex items-center gap-3 rounded-xl p-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700 font-bold">
              A
            </div>

            <div>
              <p className="text-sm font-medium">faham</p>
              <p className="text-xs text-gray-500">Gemini AI</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 hover:bg-white/10 md:hidden"
            >
              ☰
            </button>

            <h2 className="text-lg font-semibold">ChatGPT</h2>

            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">
              Gemini 3.8 Flash
            </span>
          </div>

          <button
            onClick={newChat}
            className="rounded-lg px-3 py-2 text-sm text-gray-300 hover:bg-white/10"
          >
            + New Chat
          </button>
        </header>

        {/* Messages */}
        <section className="flex-1 overflow-y-auto px-4 py-6 md:px-10">

          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">

              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-3xl">
                ✦
              </div>

              <h1 className="mb-3 text-3xl font-semibold md:text-4xl">
                What can I help with?
              </h1>

              <p className="max-w-md text-sm leading-6 text-gray-400">
                Ask me anything. I can help you with coding,
                learning, ideas and much more.
              </p>

              <div className="mt-10 grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  {
                    title: "Learn JavaScript",
                    desc: "Explain JavaScript in simple words.",
                  },
                  {
                    title: "Build a Website",
                    desc: "Help me create a modern website.",
                  },
                  {
                    title: "Write Some Code",
                    desc: "Generate clean and useful code.",
                  },
                  {
                    title: "Explore Ideas",
                    desc: "Give me creative project ideas.",
                  },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(item.desc)}
                    className="rounded-2xl border border-white/10 p-4 text-left transition hover:border-white/30 hover:bg-white/5"
                  >
                    <h3 className="mb-1 text-sm font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-xs text-gray-400">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-7">

              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${
                    message.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700">
                      ✦
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-7 md:max-w-[80%] ${
                      message.role === "user"
                        ? "bg-[#303030] text-white"
                        : "text-gray-100"
                    }`}
                  >
                    {message.text}
                  </div>

                  {message.role === "user" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-600 text-sm font-bold">
                      F
                    </div>
                  )}
                </div>
              ))}

              {/* Loading Animation */}
              {loading && (
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-700">
                    ✦
                  </div>

                  <div className="flex items-center gap-2 rounded-xl bg-white/5 px-4 py-4">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
                    <span className="ml-2 text-xs text-gray-400">
                      Gemini is thinking...
                    </span>
                  </div>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          )}
        </section>

        {/* Input */}
        <div className="shrink-0 px-3 pb-5 pt-2 md:px-8">
          <div className="mx-auto max-w-3xl">

            <div className="flex items-end gap-3 rounded-3xl border border-white/15 bg-[#303030] p-3 shadow-xl focus-within:border-white/30">

              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Message Gemini..."
                rows={1}
                className="max-h-40 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-gray-500"
              />

              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl font-bold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
              >
                ↑
              </button>

            </div>

            <p className="mt-3 text-center text-[11px] text-gray-500">
              AI can make mistakes. Check important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  )