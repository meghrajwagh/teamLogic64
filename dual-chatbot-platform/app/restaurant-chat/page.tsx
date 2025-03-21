"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function RestaurantChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your restaurant menu assistant. How can I help you today? You can ask about our menu items, ingredients, or get recommendations.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input }; 
    setMessages((prev) => [...prev, userMessage]); 

    setIsLoading(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Session expired! Redirecting to login.");
      window.location.href = "/login";
      return;
    }

    // Ensure the mode is properly set
    const mode = "restaurant"; // Hardcode or dynamically get this value

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          mode: mode, // Ensure mode is set correctly
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch chatbot response");
      }

      const botMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, botMessage]); 

    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, there was an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      setInput(""); 
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex items-center">
            <Link href="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Restaurant Menu Assistant</h1>
          </div>

          <div className="mb-4 p-4 h-[500px] overflow-y-auto bg-black rounded-lg shadow">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start max-w-[80%]">
                    {message.role === "assistant" && (
                      <Avatar className="mr-2 mt-0.5">
                        <AvatarFallback>RB</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`rounded-lg px-4 py-2 ${message.role === "user" ? "bg-blue-500 text-black" : "bg-gray-200"}`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-lg px-4 py-2 bg-gray-200">Typing...</div>
                </div>
              )}
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Ask about our menu..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}