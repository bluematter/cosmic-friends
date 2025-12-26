"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  VideoCameraIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { Button, Badge, Card } from "@/components/ui";

// Featured character - Adam
const featuredCharacter = {
  id: 3,
  number: "003",
  name: "Adam",
  role: "The Wanderer",
  status: "thinking",
  personality:
    "Space cowboy with grocery store energy. Hunts bounties, collects stories, makes instant ramen at 3am.",
  traits: ["Mysterious", "Laid-back", "Resourceful"],
  color: "accent",
  image: "https://cdn.basedlabs.ai/a2613120-e2b2-11f0-9208-7d39f1ba5bfb.jpg",
};

interface HeroProps {
  videoSrc?: string;
}

export function Hero({ videoSrc }: HeroProps) {
  const character = featuredCharacter;

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
            className="absolute inset-0 w-[100%] h-[100%] object-cover opacity-100 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {/* Light gradient for text readability at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/10 to-background" />
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
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            {/* Stacked Cards Container */}
            <div className="relative w-[260px] h-[380px]">
              {/* Glow effect behind stack */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-500/30 via-cosmic-500/30 to-energy-500/30 rounded-2xl blur-2xl opacity-60" />

              {/* Back card (3rd) */}
              <div className="absolute top-0 left-0 w-full h-full transform translate-x-6 -translate-y-3 rotate-6">
                <div className="w-full h-full rounded-2xl border border-white/10 overflow-hidden bg-background-secondary/80 backdrop-blur-sm">
                  <Image
                    src={character.image || ""}
                    alt="Character"
                    width={260}
                    height={380}
                    className="object-cover object-top w-full h-full opacity-60"
                  />
                </div>
              </div>

              {/* Middle card (2nd) */}
              <div className="absolute top-0 left-0 w-full h-full transform translate-x-3 -translate-y-1.5 rotate-3">
                <div className="w-full h-full rounded-2xl border border-white/10 overflow-hidden bg-background-secondary/80 backdrop-blur-sm">
                  <Image
                    src={character.image || ""}
                    alt="Character"
                    width={260}
                    height={380}
                    className="object-cover object-top w-full h-full opacity-80"
                  />
                </div>
              </div>

              {/* Front card (main) */}
              <div className="absolute top-0 left-0 w-full h-full group">
                <Card
                  variant="glass"
                  padding="none"
                  className="w-full h-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={character.image || ""}
                      alt={character.name}
                      width={260}
                      height={380}
                      className="object-cover object-top w-full h-full"
                      priority
                    />

                    {/* Gradient overlay for text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                    {/* Status badge */}
                    <div className="absolute top-3 left-3">
                      <Badge variant={status.color} size="sm" className="backdrop-blur-sm bg-background/50">
                        {status.pulse && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-current" />
                          </span>
                        )}
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </div>

                    {/* Character number */}
                    <div className="absolute top-3 right-3">
                      <span className="font-mono text-xs text-white/70 backdrop-blur-sm bg-background/30 px-2 py-1 rounded">
                        #{character.number}
                      </span>
                    </div>

                    {/* Character Info at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-white/70">
                          {character.role}
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-bold text-white mb-2">
                        {character.name}
                      </h2>
                      <div className="flex flex-wrap gap-1.5">
                        {character.traits.map((trait) => (
                          <Badge key={trait} variant="outline" size="sm" className="backdrop-blur-sm bg-background/30 border-white/20 text-white text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
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
                { label: "Characters", value: "1" },
                { label: "Treasury", value: "$0" },
                { label: "Holders", value: "0" },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/80 uppercase tracking-wider">
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
