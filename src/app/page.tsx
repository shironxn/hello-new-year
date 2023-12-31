"use client";
import Fireworks from "@/components/fireworks";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "next-themes"
import wish from "@/lib/wish.json"

interface DateTime {
  currentYear: number;
  nextYear: number;
  timeLeft: number;
}

interface MessageList {
  incomplete: string[];
  complete: string[];
}

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(theme);

  const calculateTime = (): DateTime => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const nextYear = currentYear + 1;
    const newYear = new Date(`January 1, ${nextYear} 00:00:00`).getTime();
    const timeLeft = newYear - now.getTime();

    return { currentYear, nextYear, timeLeft };
  };

  const { currentYear, nextYear, timeLeft } = calculateTime();

  
  const messages: MessageList = {
    incomplete: [
      "New Year's Countdown",
      `Goodbye ${currentYear}`,
      
    ],
    complete: [
      `Happy New Year ${nextYear}`,
    ],
  };
  
  wish.forEach(element => {
    messages.complete.push(element)
  });


  const { incomplete, complete } = messages;
  const [message, setMessage] = useState(incomplete);
  const [showFireworks, setShowFireworks] = useState(false);

  const handleCountdownComplete = () => {
    setMessage(complete);
    setShowFireworks(true);

    setCurrentTheme(theme)
    setTheme("dark")

    setTimeout(() => {
      setShowFireworks(false);
      setTheme(currentTheme || "system")
    }, 5000); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center w-screen">
      {showFireworks && (
        <div className="absolute z-2 w-screen">
          <Fireworks />
        </div>
      )}
      
      <div className="relative z-1">
        <h1 className="md:text-xl text-xl mb-4">
          <Typewriter
            words={message}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={1000}
          />
        </h1>
      </div>

      {!showFireworks && (
        <div className="font-bold md:text-6xl text-4xl">
          <Countdown
            date={Date.now() + timeLeft}
            onComplete={handleCountdownComplete}
          />
        </div>
      )}
    </div>
  );
}
