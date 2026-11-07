"use client";

import { useState, useEffect, useRef } from "react";

export default function ChatWindow({
  selectedChat,
  messages,
  onSend,
  loading,
}) {
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!input.trim() || loading) return;

    onSend(input.trim());
    setInput("");
  }

  if (!selectedChat) {
    return (
      <section className="hidden flex-1 items-center justify-center bg-[#f8f9fa] md:flex">
        <div className="text-center">
          <div className="mb-5 text-7xl">💬</div>
          <h2 className="text-3xl font-light text-gray-700">
            WhatsApp Web
          </h2>
          <p className="mt-3 text-sm text-gray-500">
            Select a contact to start chatting.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col bg-[#efeae2]">

      {/* Header */}
      <header className="flex h-[65px] items-center gap-3 bg-[#f0f2f5] px-5 shadow-sm">

        <div className={`flex h-11 w-11 items-center justify-center rounded-full ${selectedChat.color} font-bold text-white`}>
          {selectedChat.avatar}
        </div>

        <div>
          <h2 className="font-semibold text-gray-800">
            {selectedChat.name}
          </h2>

          <p className="text-xs text-gray-500">
            {loading ? "typing..." : selectedChat.id === 13 ? "Gemini AI Assistant" : "Online"}
          </p>
        </div>

      </header>

      {/* Messages */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-5">

        <div className="mx-auto mb-3 rounded-lg bg-[#fff3c4] px-4 py-2 text-center text-xs text-gray-600 shadow-sm">
          🔒 This is an AI-powered demo conversation.
        </div>

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "me"
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] rounded-xl px-4 py-2 shadow-sm ${
                message.sender === "me"
                  ? "rounded-tr-none bg-[#d9fdd3]"
                  : "rounded-tl-none bg-white"
              }`}
            >
              <p className="whitespace-pre-wrap break-words text-sm text-gray-800">
                {message.text}
              </p>

              <div className="mt-1 text-right text-[10px] text-gray-500">
                {message.time}
                {message.sender === "me" && (
                  <span className="ml-1 text-blue-500">✓✓</span>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="w-fit rounded-xl bg-white px-4 py-3 text-sm text-gray-500 shadow-sm">
            Typing...
          </div>
        )}

        <div ref={bottomRef} />

      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-3 bg-[#f0f2f5] p-3"
      >

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="min-w-0 flex-1 rounded-lg bg-white px-4 py-3 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-[#00a884]"
        />

        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#008069] text-xl text-white transition hover:bg-[#006b58] disabled:opacity-50"
        >
          ➤
        </button>

      </form>

    </section>
  );
}