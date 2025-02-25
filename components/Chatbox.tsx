"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const Chatbox = () => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    setInput("");

    // Simulated AI response
    setTimeout(() => {
      const botResponse = { text: "Hello! How can I assist you?", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <div className="chatbox border p-5 rounded-2xl bg-gradient-to-r from-green-300 to-blue-300 shadow-xl text-white w-[700px] mx-auto w-full">
      <h2 className="text-xl font-bold text-center mb-3">💬 AI Chatbot</h2>

      <div className="messages h-60 overflow-y-auto border p-4 bg-white rounded-xl shadow-inner space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <span className={`px-4 py-2 rounded-lg text-sm shadow-md transition-opacity duration-300 ${
              msg.sender === "user" ? "bg-green-500 text-white" : "bg-green-200 text-black"
            }`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center bg-white rounded-xl p-3 shadow-md">
        <input 
          type="text" 
          className="flex-1 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-black text-lg" 
          placeholder="Type a message..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button 
          className="ml-3 px-5 py-3 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white rounded-xl flex items-center gap-2 shadow-lg transition-all text-lg" 
          onClick={sendMessage}
        >
          <Send size={20} /> Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;

