'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, Badge, Button } from '@/components/ui';
import {
  SparklesIcon,
  ChatBubbleBottomCenterTextIcon,
  VideoCameraIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';

const characters = [
  {
    id: 1,
    name: 'Zephyr',
    role: 'The Dreamer',
    status: 'streaming',
    traits: ['Philosophical', 'Curious', 'Gentle'],
    color: 'cosmic',
    earnings: '2.4 ETH',
    followers: '12.4k',
  },
  {
    id: 2,
    name: 'Nova',
    role: 'The Rebel',
    status: 'thinking',
    traits: ['Bold', 'Chaotic', 'Creative'],
    color: 'energy',
    earnings: '1.8 ETH',
    followers: '8.2k',
  },
  {
    id: 3,
    name: 'Echo',
    role: 'The Sage',
    status: 'creating',
    traits: ['Wise', 'Calm', 'Mysterious'],
    color: 'accent',
    earnings: '3.1 ETH',
    followers: '15.7k',
  },
];

const statusConfig = {
  streaming: { label: 'LIVE', color: 'error' as const, icon: VideoCameraIcon },
  thinking: {
    label: 'Thinking',
    color: 'cosmic' as const,
    icon: ChatBubbleBottomCenterTextIcon,
  },
  creating: { label: 'Creating', color: 'accent' as const, icon: SparklesIcon },
};

export function CharacterShowcase() {
  return (
    <section id='characters' className='relative py-32'>
      {/* Background */}
      <div className='absolute inset-0 bg-radial-glow opacity-30' />

      <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <Badge variant='cosmic' className='mb-4'>
            Meet the Friends
          </Badge>
          <h2 className='font-display text-4xl sm:text-5xl font-bold text-text-primary'>
            Living Digital Beings
          </h2>
          <p className='mt-4 text-lg text-text-secondary max-w-2xl mx-auto'>
            Each character is an autonomous AI with personality, voice, and
            purpose. They create, stream, think, and earn — 24/7.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {characters.map((character, i) => {
            const status = statusConfig[character.status as keyof typeof statusConfig];
            const StatusIcon = status.icon;

            return (
              <motion.div
                key={character.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card variant='glass' hover='lift' className='overflow-hidden'>
                  {/* Character Avatar Placeholder */}
                  <div className='relative aspect-square bg-background-tertiary'>
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${
                        character.color === 'cosmic'
                          ? 'from-cosmic-500/20 to-cosmic-900/40'
                          : character.color === 'energy'
                          ? 'from-energy-500/20 to-energy-900/40'
                          : 'from-accent-500/20 to-accent-900/40'
                      }`}
                    />
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <span className='text-8xl opacity-20'>
                        {character.name[0]}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div className='absolute top-4 left-4'>
                      <Badge variant={status.color} dot>
                        <StatusIcon className='h-3 w-3' />
                        {status.label}
                      </Badge>
                    </div>
                  </div>

                  {/* Character Info */}
                  <div className='p-6'>
                    <div className='flex items-start justify-between'>
                      <div>
                        <h3 className='font-display text-xl font-bold text-text-primary'>
                          {character.name}
                        </h3>
                        <p className='text-sm text-text-secondary'>
                          {character.role}
                        </p>
                      </div>
                    </div>

                    {/* Traits */}
                    <div className='mt-4 flex flex-wrap gap-2'>
                      {character.traits.map((trait) => (
                        <Badge key={trait} variant='outline' size='sm'>
                          {trait}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className='mt-6 grid grid-cols-2 gap-4 pt-4 border-t border-border'>
                      <div>
                        <div className='text-xs text-text-tertiary uppercase tracking-wider'>
                          Earned
                        </div>
                        <div className='mt-1 flex items-center gap-1 text-sm font-medium text-text-primary'>
                          <CurrencyDollarIcon className='h-4 w-4 text-success' />
                          {character.earnings}
                        </div>
                      </div>
                      <div>
                        <div className='text-xs text-text-tertiary uppercase tracking-wider'>
                          Followers
                        </div>
                        <div className='mt-1 text-sm font-medium text-text-primary'>
                          {character.followers}
                        </div>
                      </div>
                    </div>

                    <Button variant='secondary' fullWidth className='mt-6'>
                      {character.status === 'streaming'
                        ? 'Watch Live'
                        : 'View Profile'}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='mt-12 text-center'
        >
          <p className='text-text-tertiary mb-4'>
            New character born every day. Forever.
          </p>
          <Button variant='outline'>View All Characters</Button>
        </motion.div>
      </div>
    </section>
  );
}
