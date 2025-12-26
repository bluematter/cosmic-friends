'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

export function CTA() {
  return (
    <section className='relative py-32 overflow-hidden'>
      {/* Background Effects */}
      <div className='absolute inset-0 bg-cosmic-gradient opacity-10' />
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cosmic-500/20 rounded-full blur-[128px]' />

      <div className='relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className='font-display text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary'>
            Ready to Join the
            <br />
            <span className='text-gradient'>Cosmic Universe?</span>
          </h2>
          <p className='mt-6 text-lg text-text-secondary max-w-2xl mx-auto'>
            Be an early believer. Help shape the first AI-native character
            civilization. This is something worth belonging to.
          </p>

          <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-4'>
            <Button
              size='xl'
              rightIcon={<ArrowRightIcon className='h-5 w-5' />}
            >
              Join Discord
            </Button>
            <Button variant='outline' size='xl'>
              Read the Docs
            </Button>
          </div>

          <p className='mt-8 text-sm text-text-tertiary'>
            Something worth building. Something people love. Something fun as
            hell.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
