"use client";

import { useState } from "react";
import { Send } from "lucide-react";

// Hardcoded transaction data (same as used in Home.jsx and TransactionHistory.jsx)
const hardcodedTransactions = [
  {
    id: "txn_001",
    name: "Grocery Store Purchase",
    amount: 45.23,
    status: "Completed",
    date: "2025-04-15",
    channel: "Debit Card",
    category: "Groceries",
  },
  {
    id: "txn_002",
    name: "Online Subscription",
    amount: 12.99,
    status: "Completed",
    date: "2025-04-14",
    channel: "Online",
    category: "Entertainment",
  },
  {
    id: "txn_003",
    name: "Utility Bill Payment",
    amount: 75.00,
    status: "Pending",
    date: "2025-04-13",
    channel: "ACH",
    category: "Utilities",
  },
  {
    id: "txn_004",
    name: "Coffee Shop",
    amount: 5.50,
    status: "Completed",
    date: "2025-04-12",
    channel: "Debit Card",
    category: "Dining",
  },
  {
    id: "txn_005",
    name: "Gas Station",
    amount: 30.00,
    status: "Completed",
    date: "2025-04-11",
    channel: "Debit Card",
    category: "Transportation",
  },
];

const Chatbox = () => {
  const [messages, setMessages] = useState<{ text: string; sender: "user" | "bot" }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { text: input, sender: "user" };
    setMessages([...messages, userMessage]);
    setInput("");

    // Process the message and generate a bot response
    setTimeout(() => {
      const botResponse = processMessage(userMessage.text);
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    }, 1000);
  };

  const processMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; // 0-based index
    const currentYear = currentDate.getFullYear(); // 2025

    // Helper function to calculate spending for a given category
    const calculateSpending = (category: string) => {
      return hardcodedTransactions
        .filter((txn) => {
          const txnDate = new Date(txn.date);
          return (
            txn.category.toLowerCase() === category.toLowerCase() &&
            txnDate.getMonth() + 1 === currentMonth &&
            txnDate.getFullYear() === currentYear &&
            txn.status === "Completed"
          );
        })
        .reduce((total, txn) => total + txn.amount, 0);
    };

    // Check for specific spending queries
    if (lowerMessage.includes("how much did i spend on online subscription this month")) {
      const spending = calculateSpending("Entertainment");
      return {
        text: spending > 0
          ? `You spent $${spending.toFixed(2)} on Online Subscriptions this month (April 2025).`
          : "You haven't spent any money on Online Subscriptions this month based on the available data.",
        sender: "bot",
      };
    }

    if (lowerMessage.includes("how much did i spend on gas this month")) {
      const spending = calculateSpending("Transportation");
      return {
        text: spending > 0
          ? `You spent $${spending.toFixed(2)} on gas this month (April 2025).`
          : "You haven't spent any money on gas this month based on the available data.",
        sender: "bot",
      };
    }

    if (lowerMessage.includes("how much did i spend on grocery this month")) {
      const spending = calculateSpending("Groceries");
      return {
        text: spending > 0
          ? `You spent $${spending.toFixed(2)} on groceries this month (April 2025).`
          : "You haven't spent any money on groceries this month based on the available data.",
        sender: "bot",
      };
    }

    if (lowerMessage.includes("how much did i spend on coffee this month")) {
      const spending = calculateSpending("Dining"); // Assuming "Coffee Shop" falls under "Dining"
      return {
        text: spending > 0
          ? `You spent $${spending.toFixed(2)} on coffee this month (April 2025).`
          : "You haven't spent any money on coffee this month based on the available data.",
        sender: "bot",
      };
    }

    // Default response for other messages
    return {
      text: "Hello! How can I assist you? I can help with questions like 'How much did I spend on [category] this month?' (e.g., Online Subscription, gas, grocery, coffee).",
      sender: "bot",
    };
  };

  return (
    <div className="chatbox border p-5 rounded-2xl bg-gradient-to-r from-green-300 to-blue-300 shadow-xl text-black w-[700px] mx-auto w-full">
      <h2 className="text-xl font-bold text-center mb-3">💬 AI Chatbot</h2>

      <div className="messages h-60 overflow-y-auto border p-4 bg-white rounded-xl shadow-inner space-y-3">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <span className={`px-4 py-2 rounded-lg text-sm shadow-md transition-opacity duration-300 ${
              msg.sender === "user" ? "bg-green-500 text-black" : "bg-green-200 text-black"
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
          className="ml-3 px-5 py-3 bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-black rounded-xl flex items-center gap-2 shadow-lg transition-all text-lg" 
          onClick={sendMessage}
        >
          <Send size={20} /> Send
        </button>
      </div>
    </div>
  );
};

export default Chatbox;