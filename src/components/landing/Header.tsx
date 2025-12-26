'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'About', href: '#about' },
  { name: 'Characters', href: '#characters' },
  { name: 'How It Works', href: '#flywheel' },
  { name: 'Governance', href: '#governance' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border'
          : 'bg-transparent'
      )}
    >
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <Link href='/' className='flex items-center gap-2'>
            <div className='relative h-8 w-8'>
              <div className='absolute inset-0 rounded-lg bg-cosmic-gradient animate-pulse-glow' />
              <div className='absolute inset-[2px] rounded-lg bg-background flex items-center justify-center'>
                <span className='text-lg font-bold text-gradient'>C</span>
              </div>
            </div>
            <span className='font-display text-xl font-bold text-text-primary'>
              Cosmic Friends
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex md:items-center md:gap-1'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className='px-4 py-2 text-sm text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-background-hover'
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className='hidden md:flex md:items-center md:gap-3'>
            <Button variant='ghost' size='sm'>
              Docs
            </Button>
            <Button size='sm'>Enter App</Button>
          </div>

          {/* Mobile menu button */}
          <button
            type='button'
            className='md:hidden p-2 text-text-secondary hover:text-text-primary'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XMarkIcon className='h-6 w-6' />
            ) : (
              <Bars3Icon className='h-6 w-6' />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='md:hidden bg-background-secondary border-b border-border overflow-hidden'
          >
            <div className='px-4 py-4 space-y-2'>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className='block px-4 py-3 text-text-secondary hover:text-text-primary hover:bg-background-hover rounded-lg transition-colors'
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className='pt-4 flex flex-col gap-2'>
                <Button variant='secondary' fullWidth>
                  Docs
                </Button>
                <Button fullWidth>Enter App</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
