'use client';

import React from 'react';
import Image from 'next/image';
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
    id: 3,
    name: 'Adam',
    role: 'The Wanderer',
    status: 'thinking',
    traits: ['Mysterious', 'Laid-back', 'Resourceful'],
    color: 'accent',
    earnings: '0 ETH',
    followers: '0',
    image: 'https://cdn.basedlabs.ai/a2613120-e2b2-11f0-9208-7d39f1ba5bfb.jpg',
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
                className='md:col-start-2'
              >
                <div className='relative group max-w-sm mx-auto'>
                  {/* Glow effect behind card */}
                  <div className='absolute -inset-2 bg-gradient-to-r from-accent-500/20 via-cosmic-500/20 to-accent-500/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity' />

                  <Card variant='glass' padding='none' className='relative overflow-hidden rounded-2xl border border-white/10'>
                    {/* Character Image - fills card */}
                    <div className='relative aspect-[3/4]'>
                      {character.image ? (
                        <Image
                          src={character.image}
                          alt={character.name}
                          fill
                          className='object-cover object-top'
                        />
                      ) : (
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${
                            character.color === 'cosmic'
                              ? 'from-cosmic-500/20 to-cosmic-900/40'
                              : character.color === 'energy'
                              ? 'from-energy-500/20 to-energy-900/40'
                              : 'from-accent-500/20 to-accent-900/40'
                          }`}
                        />
                      )}

                      {/* Gradient overlay for text */}
                      <div className='absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent' />

                      {/* Status Badge */}
                      <div className='absolute top-4 left-4'>
                        <Badge variant={status.color} size='sm' className='backdrop-blur-sm bg-background/50'>
                          <StatusIcon className='h-3 w-3' />
                          {status.label}
                        </Badge>
                      </div>

                      {/* Character Info - overlaid at bottom */}
                      <div className='absolute bottom-0 left-0 right-0 p-5'>
                        <span className='text-sm text-white/70'>
                          {character.role}
                        </span>
                        <h3 className='font-display text-2xl font-bold text-white mb-3'>
                          {character.name}
                        </h3>

                        {/* Traits */}
                        <div className='flex flex-wrap gap-2 mb-4'>
                          {character.traits.map((trait) => (
                            <Badge key={trait} variant='outline' size='sm' className='backdrop-blur-sm bg-background/30 border-white/20 text-white'>
                              {trait}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className='grid grid-cols-2 gap-4 pt-4 border-t border-white/10 mb-4'>
                          <div>
                            <div className='text-xs text-white/50 uppercase tracking-wider'>
                              Earned
                            </div>
                            <div className='mt-1 flex items-center gap-1 text-sm font-medium text-white'>
                              <CurrencyDollarIcon className='h-4 w-4 text-accent-400' />
                              {character.earnings}
                            </div>
                          </div>
                          <div>
                            <div className='text-xs text-white/50 uppercase tracking-wider'>
                              Followers
                            </div>
                            <div className='mt-1 text-sm font-medium text-white'>
                              {character.followers}
                            </div>
                          </div>
                        </div>

                        <Button variant='secondary' fullWidth className='backdrop-blur-sm'>
                          {character.status === 'streaming'
                            ? 'Watch Live'
                            : 'View Profile'}
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
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
