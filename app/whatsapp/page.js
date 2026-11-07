"use client";

import { useState } from "react";
import ContactList from "./components/ContactList";
import ChatWindow from "./components/ChatWindow";

export default function WhatsAppPage() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [mobileChat, setMobileChat] = useState(false);

  async function sendMessage(text) {
    if (!selectedChat || loading) return;

    const contactId = selectedChat.id;

    const userMessage = {
      id: Date.now(),
      text,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    const updatedMessages = [
      ...(messages[contactId] || []),
      userMessage,
    ];

    setMessages((prev) => ({
      ...prev,
      [contactId]: updatedMessages,
    }));

    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: selectedChat.name,
          messages: updatedMessages.slice(-12),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Reply failed");
      }

      const botMessage = {
        id: Date.now() + 1,
        text: data.reply,
        sender: "them",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => ({
        ...prev,
        [contactId]: [
          ...(prev[contactId] || []),
          botMessage,
        ],
      }));

    } catch (error) {
      console.error("Chat error:", error);

      setMessages((prev) => ({
        ...prev,
        [contactId]: [
          ...(prev[contactId] || []),
          {
            id: Date.now() + 2,
            text: "Sorry! Reply nahi aa saka. Please try again.",
            sender: "them",
            time: "Now",
          },
        ],
      }));

    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex h-screen overflow-hidden bg-[#dce1dd] md:p-4">

      <div className="mx-auto flex h-full w-full max-w-[1600px] overflow-hidden bg-white shadow-2xl md:rounded-xl">

        {/* Sidebar */}
        <aside
          className={`${
            mobileChat ? "hidden" : "flex"
          } w-full flex-col border-r border-gray-200 md:flex md:w-[380px]`}
        >

          <header className="flex h-16 shrink-0 items-center justify-between bg-[#f0f2f5] px-5">
            <h1 className="text-xl font-bold text-[#008069]">
              WhatsApp
            </h1>

            <span className="text-xl text-gray-600">
              ⋮
            </span>
          </header>

          <div className="p-3">
            <input
              placeholder="Search or start new chat"
              className="w-full rounded-lg bg-[#f0f2f5] px-4 py-3 text-sm outline-none"
            />
          </div>

          <ContactList
            selectedChat={selectedChat}
            setSelectedChat={(contact) => {
              setSelectedChat(contact);
              setMobileChat(true);
            }}
          />

        </aside>

        {/* Chat Window */}
        <div
          className={`${
            mobileChat ? "flex" : "hidden"
          } flex-1 flex-col md:flex`}
        >

          {selectedChat ? (
            <>
              <button
                onClick={() => setMobileChat(false)}
                className="bg-[#f0f2f5] px-4 py-2 text-left text-sm text-[#008069] md:hidden"
              >
                ← Back to contacts
              </button>

              <ChatWindow
                selectedChat={selectedChat}
                messages={messages[selectedChat.id] || []}
                onSend={sendMessage}
                loading={loading}
              />
            </>
          ) : (
            <div className="hidden flex-1 flex-col items-center justify-center bg-[#f8f9fa] md:flex">
              <div className="mb-5 text-7xl">💬</div>

              <h2 className="text-3xl font-light text-gray-700">
                WhatsApp Web
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                Select a contact to start chatting.
              </p>

              <p className="mt-2 text-xs text-gray-400">
                Powered by Next.js & Gemini AI
              </p>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}