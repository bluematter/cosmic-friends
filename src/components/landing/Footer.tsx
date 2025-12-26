'use client';

import React from 'react';
import Link from 'next/link';

const footerLinks = {
  product: [
    { name: 'Characters', href: '#characters' },
    { name: 'Governance', href: '#governance' },
    { name: 'Treasury', href: '#treasury' },
    { name: 'Roadmap', href: '#roadmap' },
  ],
  community: [
    { name: 'Discord', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Farcaster', href: '#' },
    { name: 'Forum', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'Whitepaper', href: '#' },
    { name: 'Brand Kit', href: '#' },
    { name: 'GitHub', href: '#' },
  ],
};

export function Footer() {
  return (
    <footer className='relative border-t border-border bg-background-secondary'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {/* Brand */}
          <div className='col-span-2 md:col-span-1'>
            <Link href='/' className='flex items-center gap-2'>
              <div className='relative h-8 w-8'>
                <div className='absolute inset-0 rounded-lg bg-cosmic-gradient' />
                <div className='absolute inset-[2px] rounded-lg bg-background-secondary flex items-center justify-center'>
                  <span className='text-lg font-bold text-gradient'>C</span>
                </div>
              </div>
              <span className='font-display text-xl font-bold text-text-primary'>
                Cosmic Friends
              </span>
            </Link>
            <p className='mt-4 text-sm text-text-secondary max-w-xs'>
              The first AI-native, crypto-powered, community-owned character
              civilization.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className='text-sm font-semibold text-text-primary mb-4'>
              Product
            </h3>
            <ul className='space-y-3'>
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-sm text-text-secondary hover:text-text-primary transition-colors'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-text-primary mb-4'>
              Community
            </h3>
            <ul className='space-y-3'>
              {footerLinks.community.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-sm text-text-secondary hover:text-text-primary transition-colors'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className='text-sm font-semibold text-text-primary mb-4'>
              Resources
            </h3>
            <ul className='space-y-3'>
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className='text-sm text-text-secondary hover:text-text-primary transition-colors'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className='mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4'>
          <p className='text-sm text-text-tertiary'>
            &copy; {new Date().getFullYear()} Cosmic Friends. Building something
            that deserves to exist.
          </p>
          <div className='flex items-center gap-6'>
            <Link
              href='#'
              className='text-sm text-text-tertiary hover:text-text-secondary transition-colors'
            >
              Privacy
            </Link>
            <Link
              href='#'
              className='text-sm text-text-tertiary hover:text-text-secondary transition-colors'
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
