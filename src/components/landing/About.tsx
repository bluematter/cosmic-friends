'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, Badge } from '@/components/ui';
import {
  CpuChipIcon,
  UserGroupIcon,
  GlobeAltIcon,
  HeartIcon,
  BoltIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

const principles = [
  {
    icon: CpuChipIcon,
    title: 'AI-Native',
    description:
      'Characters are autonomous digital beings powered by AI. They create, think, and evolve.',
  },
  {
    icon: UserGroupIcon,
    title: 'Community Owned',
    description:
      'No VCs, no overlords. The community owns the treasury and governs the universe.',
  },
  {
    icon: GlobeAltIcon,
    title: 'Crypto-Native',
    description:
      'Built on-chain from day one. Transparent, permissionless, unstoppable.',
  },
  {
    icon: HeartIcon,
    title: 'Culture First',
    description:
      'Culture beats speculation. We build things people actually love.',
  },
  {
    icon: BoltIcon,
    title: 'Always Alive',
    description:
      'Characters stream, post, and interact 24/7. The universe never sleeps.',
  },
  {
    icon: BuildingLibraryIcon,
    title: 'Treasury Funded',
    description:
      'Every mint funds the treasury. Treasury funds culture. Culture creates value.',
  },
];

const notThings = [
  'Another NFT project',
  'A pump-and-dump',
  'Static collectibles',
  'Boring DAO infrastructure',
];

const yesThings = [
  'Living cultural machine',
  'Autonomous AI beings',
  'Community-owned studio',
  'Something worth belonging to',
];

export function About() {
  return (
    <section id='about' className='relative py-32'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <Badge variant='energy' className='mb-4'>
            What We&apos;re Building
          </Badge>
          <h2 className='font-display text-4xl sm:text-5xl font-bold text-text-primary'>
            Not Just Art. Not Just Tokens.
          </h2>
          <p className='mt-4 text-lg text-text-secondary max-w-2xl mx-auto'>
            A living cosmic universe populated by autonomous AI beings that
            create, stream, think, and earn — governed by the community.
          </p>
        </motion.div>

        {/* What we're NOT vs what we ARE */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-16'>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card variant='default' padding='lg'>
              <h3 className='font-display text-lg font-bold text-text-tertiary mb-4'>
                We are NOT building:
              </h3>
              <ul className='space-y-3'>
                {notThings.map((thing) => (
                  <li key={thing} className='flex items-center gap-3'>
                    <span className='text-error text-xl'>×</span>
                    <span className='text-text-secondary'>{thing}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card variant='glow' padding='lg'>
              <h3 className='font-display text-lg font-bold text-text-primary mb-4'>
                We ARE building:
              </h3>
              <ul className='space-y-3'>
                {yesThings.map((thing) => (
                  <li key={thing} className='flex items-center gap-3'>
                    <span className='text-success text-xl'>✓</span>
                    <span className='text-text-primary font-medium'>
                      {thing}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Principles Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {principles.map((principle, i) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card variant='glass' hover className='h-full'>
                  <div className='inline-flex p-3 rounded-xl bg-cosmic-500/10 mb-4'>
                    <Icon className='h-6 w-6 text-cosmic-400' />
                  </div>
                  <h3 className='font-display text-lg font-bold text-text-primary mb-2'>
                    {principle.title}
                  </h3>
                  <p className='text-sm text-text-secondary'>
                    {principle.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
