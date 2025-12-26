"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  VideoCameraIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Button, Badge, Card } from "@/components/ui";

// Featured characters - will be dynamic later
const featuredCharacters = [
  {
    id: 1,
    number: "001",
    name: "Zephyr",
    role: "The Dreamer",
    status: "streaming",
    personality:
      "Philosophical wanderer who speaks in riddles and sees beauty in chaos.",
    traits: ["Philosophical", "Curious", "Gentle"],
    color: "cosmic",
    image: null, // Will be actual image/video later
  },
  {
    id: 2,
    number: "002",
    name: "Nova",
    role: "The Rebel",
    status: "creating",
    personality:
      "Chaotic creator who breaks rules and makes art from destruction.",
    traits: ["Bold", "Chaotic", "Creative"],
    color: "energy",
    image: null,
  },
  {
    id: 3,
    number: "003",
    name: "Echo",
    role: "The Sage",
    status: "thinking",
    personality:
      "Ancient wisdom keeper who remembers everything the universe forgets.",
    traits: ["Wise", "Calm", "Mysterious"],
    color: "accent",
    image: null,
  },
];

interface HeroProps {
  videoSrc?: string;
}

export function Hero({ videoSrc }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const character = featuredCharacters[currentIndex];

  const nextCharacter = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredCharacters.length);
  };

  const prevCharacter = () => {
    setCurrentIndex(
      (prev) =>
        (prev - 1 + featuredCharacters.length) % featuredCharacters.length
    );
  };

  // Auto-rotate every 8 seconds
  useEffect(() => {
    const timer = setInterval(nextCharacter, 8000);
    return () => clearInterval(timer);
  }, []);

  const statusConfig = {
    streaming: {
      label: "LIVE NOW",
      color: "error" as const,
      icon: VideoCameraIcon,
      pulse: true,
    },
    creating: {
      label: "Creating",
      color: "accent" as const,
      icon: SparklesIcon,
      pulse: false,
    },
    thinking: {
      label: "Thinking",
      color: "cosmic" as const,
      icon: SparklesIcon,
      pulse: false,
    },
  };

  const status = statusConfig[character.status as keyof typeof statusConfig];
  const StatusIcon = status.icon;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* Video Background */}
      {videoSrc && (
        <>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Light gradient for text readability at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </>
      )}

      {/* Fallback gradient background (shows when no video) */}
      {!videoSrc && (
        <>
          <div className="absolute inset-0 bg-mesh-gradient opacity-100" />
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-cosmic-500/20 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent-500/15 rounded-full blur-[150px]" />
        </>
      )}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Featured Character */}
          <motion.div
            key={character.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <Card
              variant="glass"
              padding="none"
              className="overflow-hidden relative group"
            >
              {/* Character Image/Placeholder */}
              <div className="relative aspect-square">
                {/* Gradient background based on character color */}
                <div
                  className={`absolute inset-0 ${
                    character.color === "cosmic"
                      ? "bg-gradient-to-br from-cosmic-600/40 via-cosmic-800/60 to-background"
                      : character.color === "energy"
                      ? "bg-gradient-to-br from-energy-600/40 via-energy-800/60 to-background"
                      : "bg-gradient-to-br from-accent-600/40 via-accent-800/60 to-background"
                  }`}
                />

                {/* Animated glow effect */}
                <div
                  className={`absolute inset-0 opacity-50 ${
                    character.color === "cosmic"
                      ? "bg-radial-glow"
                      : character.color === "energy"
                      ? "bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.2)_0%,transparent_70%)]"
                      : "bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.2)_0%,transparent_70%)]"
                  }`}
                />

                {/* Placeholder character initial - replace with actual art */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`text-[200px] font-display font-bold opacity-20 ${
                      character.color === "cosmic"
                        ? "text-cosmic-300"
                        : character.color === "energy"
                        ? "text-energy-300"
                        : "text-accent-300"
                    }`}
                  >
                    {character.name[0]}
                  </span>
                </div>

                {/* Status badge */}
                <div className="absolute top-4 left-4">
                  <Badge variant={status.color} size="lg">
                    {status.pulse && (
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
                      </span>
                    )}
                    <StatusIcon className="h-4 w-4" />
                    {status.label}
                  </Badge>
                </div>

                {/* Character number */}
                <div className="absolute top-4 right-4">
                  <span className="font-mono text-sm text-text-tertiary">
                    #{character.number}
                  </span>
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={prevCharacter}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80"
                >
                  <ArrowLeftIcon className="h-5 w-5 text-text-primary" />
                </button>
                <button
                  onClick={nextCharacter}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/50 backdrop-blur-sm border border-border opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background/80"
                >
                  <ArrowRightIcon className="h-5 w-5 text-text-primary" />
                </button>
              </div>

              {/* Character Info */}
              <div className="p-6 bg-background-secondary/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-display text-2xl font-bold text-text-primary">
                    {character.name}
                  </h2>
                  <span className="text-sm text-text-secondary">
                    {character.role}
                  </span>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  {character.personality}
                </p>
                <div className="flex flex-wrap gap-2">
                  {character.traits.map((trait) => (
                    <Badge key={trait} variant="outline" size="sm">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Character dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {featuredCharacters.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-cosmic-500 w-6"
                      : "bg-border hover:bg-border-strong"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* Right: Copy + CTA */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="cosmic" size="lg" className="mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cosmic-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cosmic-400" />
                </span>
                One Friend, Every Day, Forever
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
            >
              Meet the Cosmic Friends
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-white max-w-lg mx-auto lg:mx-0"
            >
              Autonomous AI characters that live on-chain. They think, create,
              stream, and earn — governed by you.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Button
                size="lg"
                rightIcon={<ArrowRightIcon className="h-5 w-5" />}
              >
                Join the Universe
              </Button>
              <Button variant="secondary" size="lg">
                View All Characters
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-12 grid grid-cols-3 gap-6"
            >
              {[
                { label: "Characters", value: "∞" },
                { label: "Treasury", value: "$0" },
                { label: "Holders", value: "0" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-gradient">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-tertiary uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
