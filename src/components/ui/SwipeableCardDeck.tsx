'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  PanInfo,
} from 'framer-motion';
import { Badge, Card } from '@/components/ui';
import { VideoCameraIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface Character {
  id: number;
  number: string;
  name: string;
  role: string;
  status: 'streaming' | 'creating' | 'thinking';
  traits: string[];
  color: string;
  image: string;
}

interface SwipeableCardDeckProps {
  characters: Character[];
  onSwipe?: (direction: 'left' | 'right', character: Character) => void;
}

const statusConfig = {
  streaming: {
    label: 'LIVE NOW',
    color: 'error' as const,
    icon: VideoCameraIcon,
    pulse: true,
  },
  creating: {
    label: 'Creating',
    color: 'accent' as const,
    icon: SparklesIcon,
    pulse: false,
  },
  thinking: {
    label: 'Thinking',
    color: 'cosmic' as const,
    icon: SparklesIcon,
    pulse: false,
  },
};

// Individual swipeable card
function SwipeableCard({
  character,
  isTop,
  stackIndex,
  onSwipeComplete,
}: {
  character: Character;
  isTop: boolean;
  stackIndex: number;
  onSwipeComplete: (direction: 'left' | 'right') => void;
}) {
  const x = useMotionValue(0);
  const controls = useAnimation();

  // Map x position to rotation (-15deg to 15deg)
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);

  // Map x position to opacity for indicators
  const leftIndicatorOpacity = useTransform(x, [-100, 0], [1, 0]);
  const rightIndicatorOpacity = useTransform(x, [0, 100], [0, 1]);

  // Stack transform for cards behind - more visible offset
  const stackRotation = stackIndex * 6;
  const stackTranslateX = stackIndex * 12;
  const stackTranslateY = stackIndex * -4;
  const stackOpacity = 1 - stackIndex * 0.2;
  const stackScale = 1 - stackIndex * 0.05;

  const handleDragEnd = async (_: unknown, info: PanInfo) => {
    const threshold = 100;
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    // If swiped far enough or with enough velocity
    if (Math.abs(offset) > threshold || Math.abs(velocity) > 500) {
      const direction = offset > 0 ? 'right' : 'left';
      // Animate card off screen
      await controls.start({
        x: direction === 'right' ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.3 },
      });
      onSwipeComplete(direction);
    } else {
      // Spring back to center
      controls.start({
        x: 0,
        transition: { type: 'spring', stiffness: 500, damping: 30 },
      });
    }
  };

  const status = statusConfig[character.status];
  const StatusIcon = status.icon;

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full cursor-grab active:cursor-grabbing touch-none"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : stackRotation,
        translateX: isTop ? 0 : stackTranslateX,
        translateY: isTop ? 0 : stackTranslateY,
        scale: isTop ? 1 : stackScale,
        zIndex: 10 - stackIndex,
      }}
      animate={controls}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={false}
    >
      <Card
        variant="glass"
        padding="none"
        className="w-full h-full overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
        style={{ opacity: stackOpacity }}
      >
        <div className="relative w-full h-full">
          <Image
            src={character.image}
            alt={character.name}
            width={360}
            height={470}
            className="object-cover object-top w-full h-full"
            priority={isTop}
          />

          {/* Gradient overlay for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

          {/* Swipe indicators (only on top card) */}
          {isTop && (
            <>
              <motion.div
                className="absolute top-1/2 left-4 -translate-y-1/2 px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm"
                style={{ opacity: leftIndicatorOpacity }}
              >
                <span className="text-white text-lg">←</span>
              </motion.div>
              <motion.div
                className="absolute top-1/2 right-4 -translate-y-1/2 px-3 py-2 rounded-full bg-white/20 backdrop-blur-sm"
                style={{ opacity: rightIndicatorOpacity }}
              >
                <span className="text-white text-lg">→</span>
              </motion.div>
            </>
          )}

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <Badge
              variant={status.color}
              size="sm"
              className="backdrop-blur-sm bg-background/50"
            >
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
              <span className="text-xs text-white/70">{character.role}</span>
            </div>
            <h2 className="font-display text-xl font-bold text-white mb-2">
              {character.name}
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {character.traits.map((trait) => (
                <Badge
                  key={trait}
                  variant="outline"
                  size="sm"
                  className="backdrop-blur-sm bg-background/30 border-white/20 text-white text-xs"
                >
                  {trait}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function SwipeableCardDeck({
  characters,
  onSwipe,
}: SwipeableCardDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeComplete = (direction: 'left' | 'right') => {
    const currentCharacter = characters[currentIndex];
    onSwipe?.(direction, currentCharacter);

    // Cycle to next character
    setCurrentIndex((prev) => (prev + 1) % characters.length);
  };

  // Get visible cards (current + 2 behind for stack effect)
  const visibleCards = [];
  for (let i = 0; i < Math.min(3, characters.length); i++) {
    const index = (currentIndex + i) % characters.length;
    visibleCards.push({ character: characters[index], stackIndex: i });
  }

  return (
    <div className="relative w-[320px] h-[420px] sm:w-[360px] sm:h-[470px]">
      {/* Glow effect behind stack */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-500/30 via-cosmic-500/30 to-energy-500/30 rounded-2xl blur-3xl opacity-70" />

      {/* Render cards in reverse order so top card is last (on top of z-index) */}
      {visibleCards.reverse().map(({ character, stackIndex }) => (
        <SwipeableCard
          key={`${character.id}-${currentIndex}`}
          character={character}
          isTop={stackIndex === 0}
          stackIndex={stackIndex}
          onSwipeComplete={handleSwipeComplete}
        />
      ))}

      {/* Swipe hint */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/50 flex items-center gap-2">
        <span>←</span>
        <span>Swipe to explore</span>
        <span>→</span>
      </div>
    </div>
  );
}
