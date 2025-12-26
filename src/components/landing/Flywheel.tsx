'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, Badge } from '@/components/ui';
import {
  SparklesIcon,
  BanknotesIcon,
  PaintBrushIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    number: '01',
    title: 'Character is Born',
    description:
      'A new Cosmic Friend is minted on-chain with unique personality, voice, and visual identity.',
    icon: SparklesIcon,
    color: 'cosmic',
  },
  {
    number: '02',
    title: 'Treasury Grows',
    description:
      'Mint proceeds flow directly to the community treasury, building a war chest for culture.',
    icon: BanknotesIcon,
    color: 'accent',
  },
  {
    number: '03',
    title: 'Culture is Funded',
    description:
      'Treasury funds creative grants, worldbuilding, events, and experiences that push the universe forward.',
    icon: PaintBrushIcon,
    color: 'energy',
  },
  {
    number: '04',
    title: 'Attention Compounds',
    description:
      'Characters create content, stream, interact — generating attention and emotional connection.',
    icon: EyeIcon,
    color: 'cosmic',
  },
  {
    number: '05',
    title: 'Value Grows',
    description:
      'Culture creates value. Value attracts more participants. The network effect kicks in.',
    icon: ArrowTrendingUpIcon,
    color: 'accent',
  },
  {
    number: '06',
    title: 'Repeat Forever',
    description:
      'The cycle continues. New characters. New culture. New value. Perpetually.',
    icon: ArrowPathIcon,
    color: 'energy',
  },
];

export function Flywheel() {
  return (
    <section id='flywheel' className='relative py-32 overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 bg-background-secondary' />
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-cosmic-500/5 rounded-full blur-[128px]' />

      <div className='relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <Badge variant='accent' className='mb-4'>
            The Flywheel
          </Badge>
          <h2 className='font-display text-4xl sm:text-5xl font-bold text-text-primary'>
            How It Works
          </h2>
          <p className='mt-4 text-lg text-text-secondary max-w-2xl mx-auto'>
            A perpetual cultural machine. Money follows culture. Culture follows
            story. Story follows characters. Characters live here.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card
                  variant='default'
                  hover
                  className='h-full relative overflow-hidden'
                >
                  {/* Step number */}
                  <div className='absolute top-4 right-4 font-display text-6xl font-bold text-border'>
                    {step.number}
                  </div>

                  <div className='relative'>
                    {/* Icon */}
                    <div
                      className={`inline-flex p-3 rounded-xl mb-4 ${
                        step.color === 'cosmic'
                          ? 'bg-cosmic-500/10'
                          : step.color === 'accent'
                          ? 'bg-accent-500/10'
                          : 'bg-energy-500/10'
                      }`}
                    >
                      <Icon
                        className={`h-6 w-6 ${
                          step.color === 'cosmic'
                            ? 'text-cosmic-400'
                            : step.color === 'accent'
                            ? 'text-accent-400'
                            : 'text-energy-400'
                        }`}
                      />
                    </div>

                    <h3 className='font-display text-xl font-bold text-text-primary mb-2'>
                      {step.title}
                    </h3>
                    <p className='text-text-secondary'>{step.description}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Core Thesis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='mt-16'
        >
          <Card variant='gradient' padding='lg' className='text-center'>
            <blockquote className='font-display text-2xl sm:text-3xl font-bold text-text-primary'>
              &ldquo;Money follows culture.
              <br />
              Culture follows story.
              <br />
              Story follows characters.
              <br />
              <span className='text-gradient'>Characters live here.</span>&rdquo;
            </blockquote>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
