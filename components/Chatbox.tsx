"use client";

import { useState } from "react";

const Chatbox = () => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);

    setInput("");

    // Simulating AI response
    setTimeout(() => {
      const botResponse = { text: "Hello! How can I help you?", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  return (
    <div className="chatbox border p-4 rounded-lg bg-gray-100">
      <h2 className="text-lg font-bold">AI Chatbot</h2>
      <div className="messages h-48 overflow-y-auto border p-2 bg-white rounded-md mt-2">
        {messages.map((msg, index) => (
          <div key={index} className={`p-2 my-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
            <span className={`px-3 py-1 rounded-md ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input 
          type="text" 
          className="flex-1 p-2 border rounded-md" 
          placeholder="Type a message..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="ml-2 px-4 py-2 bg-green-500 text-white rounded-md" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;
