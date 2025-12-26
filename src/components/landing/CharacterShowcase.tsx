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
                <div className='relative group max-w-lg mx-auto'>
                  {/* Glow effect behind card */}
                  <div className='absolute -inset-1 bg-gradient-to-r from-accent-500/20 via-cosmic-500/20 to-accent-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity' />

                  <Card variant='glass' padding='none' className='relative overflow-hidden rounded-2xl border border-white/10'>
                    <div className='flex flex-col sm:flex-row'>
                      {/* Character Image */}
                      <div className='relative w-full sm:w-40 md:w-48 flex-shrink-0 max-h-[280px] overflow-hidden'>
                        {character.image ? (
                          <Image
                            src={character.image}
                            alt={character.name}
                            width={192}
                            height={280}
                            className='object-cover object-top w-full h-full'
                          />
                        ) : (
                          <div className='aspect-[2/3] relative'>
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
                          </div>
                        )}

                        {/* Status Badge */}
                        <div className='absolute top-3 left-3'>
                          <Badge variant={status.color} size='sm' className='backdrop-blur-sm bg-background/50'>
                            <StatusIcon className='h-3 w-3' />
                            {status.label}
                          </Badge>
                        </div>
                      </div>

                      {/* Character Info - side panel */}
                      <div className='p-5 flex flex-col justify-center bg-background-secondary/50 backdrop-blur-sm flex-1'>
                        <div className='flex items-center gap-2 mb-1'>
                          <span className='text-xs text-text-secondary'>
                            {character.role}
                          </span>
                        </div>
                        <h3 className='font-display text-2xl font-bold text-text-primary mb-2'>
                          {character.name}
                        </h3>

                        {/* Traits */}
                        <div className='flex flex-wrap gap-2 mb-4'>
                          {character.traits.map((trait) => (
                            <Badge key={trait} variant='outline' size='sm'>
                              {trait}
                            </Badge>
                          ))}
                        </div>

                        {/* Stats */}
                        <div className='grid grid-cols-2 gap-4 pt-4 border-t border-border'>
                          <div>
                            <div className='text-xs text-text-tertiary uppercase tracking-wider'>
                              Earned
                            </div>
                            <div className='mt-1 flex items-center gap-1 text-sm font-medium text-text-primary'>
                              <CurrencyDollarIcon className='h-4 w-4 text-accent-400' />
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

                        <Button variant='secondary' fullWidth className='mt-4'>
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
