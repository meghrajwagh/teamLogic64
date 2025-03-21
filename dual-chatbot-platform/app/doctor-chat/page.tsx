"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Calendar } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Message = {
  role: "user" | "assistant"
  content: string
}

type Appointment = {
  doctor: string
  date: string
  time: string
  confirmed: boolean
}

export default function DoctorChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm your doctor appointment assistant. How can I help you today? You can book, reschedule, or cancel appointments.",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input }; // Store user message
    setMessages((prev) => [...prev, userMessage]); // Show user message in UI

    setIsLoading(true);
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Session expired! Redirecting to login.");
      window.location.href = "/login";
      return;
    }

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          mode: "appointment",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch chatbot response");
      }

      const botMessage = { role: "assistant", content: data.response };
      setMessages((prev) => [...prev, botMessage]); // Show bot response in UI

    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "I'm sorry, there was an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
      setInput(""); // Clear input field after sending
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
            <h1 className="text-2xl font-bold">Doctor Appointment Assistant</h1>
          </div>
          <Card className="mb-4">
            <CardContent className="p-4 h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="flex items-start max-w-[80%]">
                      {message.role === "assistant" && (
                        <Avatar className="mr-2 mt-0.5">
                          <AvatarFallback>DB</AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg px-4 py-2 ${message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="rounded-lg px-4 py-2 bg-muted">Typing...</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder="Ask about doctors or book an appointment..."
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
  )
}