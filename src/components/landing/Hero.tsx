"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { Button, Badge, SwipeableCardDeck } from "@/components/ui";

// Characters for the swipeable deck
const characters = [
  {
    id: 3,
    number: "003",
    name: "Adam",
    role: "The Wanderer",
    status: "thinking" as const,
    traits: ["Mysterious", "Laid-back", "Resourceful"],
    color: "accent",
    image: "https://cdn.basedlabs.ai/a2613120-e2b2-11f0-9208-7d39f1ba5bfb.jpg",
  },
  {
    id: 4,
    number: "004",
    name: "Eve",
    role: "The Catalyst",
    status: "streaming" as const,
    traits: ["Magnetic", "Unpredictable", "Alive"],
    color: "energy",
    image: "https://cdn.basedlabs.ai/2281ced0-e2f6-11f0-a936-7d6bce8f2623.jpg",
  },
];

interface HeroProps {
  videoSrc?: string;
}

export function Hero({ videoSrc }: HeroProps) {
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
          <div className="absolute inset-0 bg-gradient-to-t from-background/25 via-background/50 to-background" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/25 via-background/90 to-background" />
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-center -ml-12">
          {/* Left: Swipeable Character Cards */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 flex justify-center lg:justify-end lg:mr-16"
          >
            <SwipeableCardDeck characters={characters} />
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
                { label: "Characters", value: "2" },
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
