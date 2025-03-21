"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Utensils, Calendar, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Convert token existence to boolean
  }, []);

  const handleNavigation = (path: string) => {
    if (!isLoggedIn) {
      alert("Please log in first to access this feature.");
      return;
    }
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">

          <div className="relative w-full flex items-center justify-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight absolute left-1/2 transform -translate-x-1/2">
              AI Assistant Hub
            </h1>

            <Link href="/login">
              <button className="absolute right-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                Login
              </button>
            </Link>

          </div>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the AI assistant that fits your current needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Restaurant Assistant */}
          <Card className="border-2 hover:border-primary hover:shadow-lg transition-all">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Utensils className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Restaurant Menu Assistant</CardTitle>
              <CardDescription>Browse restaurant menus, get recommendations, and learn about dishes</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="space-y-2 text-left mx-auto max-w-xs">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Explore menu items and daily specials</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Get ingredient information and dietary details</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Receive personalized food recommendations</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full group" 
                onClick={() => handleNavigation("/restaurant-chat")}
              >
                Start Exploring
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>

          {/* Doctor Assistant */}
          <Card className="border-2 hover:border-primary hover:shadow-lg transition-all">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Doctor Appointment Assistant</CardTitle>
              <CardDescription>Schedule medical appointments and get healthcare information</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <ul className="space-y-2 text-left mx-auto max-w-xs">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Book appointments with available doctors</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Reschedule or cancel existing appointments</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Get basic healthcare information and guidance</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full group" 
                onClick={() => handleNavigation("/doctor-chat")}
              >
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}