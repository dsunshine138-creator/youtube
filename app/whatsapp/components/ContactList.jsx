"use client";

const contacts = [
  { id: 1, name: "Ahmed Khan", avatar: "AK", color: "bg-blue-500", message: "Assalam o Alaikum!" },
  { id: 2, name: "Hamza Ali", avatar: "HA", color: "bg-purple-500", message: "Kya haal hai bhai?" },
  { id: 3, name: "Usman Malik", avatar: "UM", color: "bg-orange-500", message: "University aa rahe ho?" },
  { id: 4, name: "Bilal Ahmed", avatar: "BA", color: "bg-green-600", message: "Football khelenge?" },
  { id: 5, name: "Hassan Raza", avatar: "HR", color: "bg-pink-500", message: "Project complete hua?" },
  { id: 6, name: "Zain Abbas", avatar: "ZA", color: "bg-cyan-600", message: "Kya kar rahe ho?" },
  { id: 7, name: "Abdullah", avatar: "AB", color: "bg-red-500", message: "Assignment bhej dena." },
  { id: 8, name: "Ayesha Noor", avatar: "AN", color: "bg-rose-500", message: "Hello! How are you?" },
  { id: 9, name: "Fatima Khan", avatar: "FK", color: "bg-indigo-500", message: "Kal milte hain!" },
  { id: 10, name: "Hania Malik", avatar: "HM", color: "bg-amber-500", message: "Kya scene hai?" },
  { id: 11, name: "Sara Ahmed", avatar: "SA", color: "bg-violet-500", message: "Good morning!" },
  { id: 12, name: "Ali Hassan", avatar: "AH", color: "bg-teal-500", message: "Welcome bro!" },
  { id: 13, name: "Gemini AI", avatar: "✦", color: "bg-gradient-to-br from-blue-500 to-purple-600", message: "Ask me anything!" },
];

export default function ContactList({ selectedChat, setSelectedChat }) {
  return (
    <div className="flex-1 overflow-y-auto">

      {contacts.map((contact) => (
        <button
          key={contact.id}
          onClick={() => setSelectedChat(contact)}
          className={`flex w-full items-center gap-3 border-b border-gray-100 p-4 text-left transition hover:bg-gray-100 ${
            selectedChat?.id === contact.id ? "bg-gray-100" : ""
          }`}
        >

          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${contact.color} font-bold text-white`}
          >
            {contact.avatar}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-gray-800">
              {contact.name}
            </h3>

            <p className="truncate text-sm text-gray-500">
              {contact.message}
            </p>
          </div>

        </button>
      ))}

    </div>
  );
}