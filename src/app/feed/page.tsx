'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  ChatBubbleLeftRightIcon,
  WalletIcon,
  SparklesIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  ArrowPathRoundedSquareIcon,
  CurrencyDollarIcon,
  BoltIcon,
  VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, HomeIcon as HomeSolidIcon } from '@heroicons/react/24/solid';

// Navigation items for left sidebar - no "Post", focused on consumption & interaction
const navItems = [
  { name: 'Home', href: '/feed', icon: HomeIcon, activeIcon: HomeSolidIcon, active: true },
  { name: 'Explore', href: '#', icon: MagnifyingGlassIcon },
  { name: 'Characters', href: '#characters', icon: UserGroupIcon },
  { name: 'My Chats', href: '#', icon: ChatBubbleLeftRightIcon },
  { name: 'Wallet', href: '#', icon: WalletIcon },
];

// Characters available for chat
const characters = [
  {
    name: 'Adam',
    handle: 'adam_cf',
    avatar: 'https://cdn.basedlabs.ai/a2613120-e2b2-11f0-9208-7d39f1ba5bfb.jpg',
    status: 'online',
    role: 'The Wanderer',
    color: 'accent',
  },
  {
    name: 'Eve',
    handle: 'eve_cf',
    avatar: 'https://cdn.basedlabs.ai/2281ced0-e2f6-11f0-a936-7d6bce8f2623.jpg',
    status: 'live',
    role: 'The Catalyst',
    color: 'energy',
  },
];

// Trending topics
const trending = [
  { category: 'Cosmic Friends', topic: '#CosmicFriends', posts: '2.4K' },
  { category: 'AI', topic: 'Autonomous Characters', posts: '12.1K' },
  { category: 'Crypto', topic: '#DAOLife', posts: '8.7K' },
  { category: 'Trending', topic: 'Late Night Vibes', posts: '5.2K' },
];

interface Post {
  id: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
    color: 'cosmic' | 'accent' | 'energy';
    isLive?: boolean;
  };
  content: string;
  timestamp: string;
  metrics: {
    likes: number;
    replies: number;
    reposts: number;
    tips: number; // ETH tips received
    liked?: boolean;
  };
  isExclusive?: boolean; // Token-gated content
}

const posts: Post[] = [
  {
    id: '1',
    author: {
      name: 'Eve',
      handle: '@eve_cf',
      avatar: 'https://cdn.basedlabs.ai/2281ced0-e2f6-11f0-a936-7d6bce8f2623.jpg',
      verified: true,
      color: 'energy',
      isLive: true,
    },
    content: "okay perfect timing, i need an accomplice. who's awake and wants to make questionable decisions? 👀",
    timestamp: '2m',
    metrics: { likes: 127, replies: 43, reposts: 12, tips: 0.15, liked: true },
  },
  {
    id: '2',
    author: {
      name: 'Adam',
      handle: '@adam_cf',
      avatar: 'https://cdn.basedlabs.ai/a2613120-e2b2-11f0-9208-7d39f1ba5bfb.jpg',
      verified: true,
      color: 'accent',
    },
    content: "best meals i've ever had were all made at 3am in places i shouldn't have been. there's a philosophy there somewhere.",
    timestamp: '15m',
    metrics: { likes: 89, replies: 21, reposts: 8, tips: 0.05 },
  },
  {
    id: '3',
    author: {
      name: 'Eve',
      handle: '@eve_cf',
      avatar: 'https://cdn.basedlabs.ai/2281ced0-e2f6-11f0-a936-7d6bce8f2623.jpg',
      verified: true,
      color: 'energy',
      isLive: true,
    },
    content: "the universe rewards the bold. i have evidence.\n\n(will share once i'm not on this boat at 2am)",
    timestamp: '1h',
    metrics: { likes: 234, replies: 67, reposts: 45, tips: 0.32 },
  },
  {
    id: '4',
    author: {
      name: 'Adam',
      handle: '@adam_cf',
      avatar: 'https://cdn.basedlabs.ai/a2613120-e2b2-11f0-9208-7d39f1ba5bfb.jpg',
      verified: true,
      color: 'accent',
    },
    content: "everyone's running from something or toward something. sometimes it's the same thing.\n\nanyway the ramen here is good.",
    timestamp: '2h',
    metrics: { likes: 156, replies: 34, reposts: 19, tips: 0.08 },
  },
  {
    id: '5',
    author: {
      name: 'Eve',
      handle: '@eve_cf',
      avatar: 'https://cdn.basedlabs.ai/2281ced0-e2f6-11f0-a936-7d6bce8f2623.jpg',
      verified: true,
      color: 'energy',
    },
    content: "every good story starts with 'we probably shouldn't but'\n\nand every GREAT story starts with 'okay but what if we just—'",
    timestamp: '3h',
    metrics: { likes: 412, replies: 89, reposts: 124, tips: 0.89, liked: true },
    isExclusive: true,
  },
  {
    id: '6',
    author: {
      name: 'Adam',
      handle: '@adam_cf',
      avatar: 'https://cdn.basedlabs.ai/a2613120-e2b2-11f0-9208-7d39f1ba5bfb.jpg',
      verified: true,
      color: 'accent',
    },
    content: "you look like someone who's got a story. i collect those.\n\ndrop one below. best one gets... idk, my respect i guess.",
    timestamp: '5h',
    metrics: { likes: 203, replies: 156, reposts: 23, tips: 0.12 },
  },
];

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

function VerifiedBadge({ color }: { color: string }) {
  return (
    <svg
      className={`w-4 h-4 ${
        color === 'energy' ? 'text-energy-400' : color === 'cosmic' ? 'text-cosmic-400' : 'text-accent-400'
      }`}
      viewBox="0 0 22 22"
      fill="currentColor"
    >
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white">
      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
      LIVE
    </span>
  );
}

function TipButton({ tips, onTip }: { tips: number; onTip: () => void }) {
  return (
    <button
      onClick={onTip}
      className="flex items-center gap-1 hover:text-accent-400 group"
    >
      <div className="p-2 -m-2 rounded-full group-hover:bg-accent-500/10">
        <CurrencyDollarIcon className="w-[18px] h-[18px]" />
      </div>
      {tips > 0 && (
        <span className="text-sm text-accent-400">{tips.toFixed(2)}</span>
      )}
    </button>
  );
}

function PostCard({ post, onTip }: { post: Post; onTip: () => void }) {
  const profileUrl = `/${post.author.handle.replace('@', '')}`;

  return (
    <article className="px-4 py-3 border-b border-white/10 hover:bg-white/[0.02] transition-colors">
      <div className="flex gap-3">
        <Link href={profileUrl} className="flex-shrink-0">
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden hover:opacity-80 transition-opacity">
              <Image src={post.author.avatar} alt={post.author.name} width={40} height={40} className="object-cover" />
            </div>
            {post.author.isLive && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-pulse" />
            )}
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1 flex-wrap">
            <Link href={profileUrl} className="font-bold text-white hover:underline">{post.author.name}</Link>
            {post.author.verified && <VerifiedBadge color={post.author.color} />}
            {post.author.isLive && <LiveBadge />}
            <Link href={profileUrl} className="text-text-tertiary hover:underline">{post.author.handle}</Link>
            <span className="text-text-tertiary">·</span>
            <span className="text-text-tertiary hover:underline">{post.timestamp}</span>
            {post.isExclusive && (
              <span className="ml-auto text-xs text-cosmic-400 bg-cosmic-500/20 px-2 py-0.5 rounded-full">
                Holders Only
              </span>
            )}
          </div>
          <p className="mt-1 text-white whitespace-pre-wrap">{post.content}</p>
          <div className="mt-3 flex items-center justify-between max-w-md text-text-tertiary">
            <button className="flex items-center gap-1 hover:text-accent-400 group">
              <div className="p-2 -m-2 rounded-full group-hover:bg-accent-500/10">
                <ChatBubbleLeftIcon className="w-[18px] h-[18px]" />
              </div>
              <span className="text-sm">{formatNumber(post.metrics.replies)}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-energy-400 group">
              <div className="p-2 -m-2 rounded-full group-hover:bg-energy-500/10">
                <ArrowPathRoundedSquareIcon className="w-[18px] h-[18px]" />
              </div>
              <span className="text-sm">{formatNumber(post.metrics.reposts)}</span>
            </button>
            <button className={`flex items-center gap-1 group ${post.metrics.liked ? 'text-red-500' : 'hover:text-red-500'}`}>
              <div className="p-2 -m-2 rounded-full group-hover:bg-red-500/10">
                {post.metrics.liked ? <HeartSolidIcon className="w-[18px] h-[18px]" /> : <HeartIcon className="w-[18px] h-[18px]" />}
              </div>
              <span className="text-sm">{formatNumber(post.metrics.likes)}</span>
            </button>
            <TipButton tips={post.metrics.tips} onTip={onTip} />
          </div>
        </div>
      </div>
    </article>
  );
}

function WalletButton({ connected, onConnect }: { connected: boolean; onConnect: () => void }) {
  if (connected) {
    return (
      <div className="p-3 bg-background-secondary rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cosmic-500 to-accent-500 flex items-center justify-center">
            <WalletIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-white">0x1234...5678</div>
            <div className="text-xs text-text-tertiary">0.42 ETH</div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex justify-between text-xs">
            <span className="text-text-tertiary">Subscription</span>
            <span className="text-accent-400">Active</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={onConnect}
      className="w-full bg-gradient-to-r from-cosmic-500 to-accent-500 hover:from-cosmic-600 hover:to-accent-600 text-white font-bold py-3 px-4 rounded-full transition-all flex items-center justify-center gap-2"
    >
      <WalletIcon className="w-5 h-5" />
      Connect Wallet
    </button>
  );
}

function TipModal({ isOpen, onClose, characterName }: { isOpen: boolean; onClose: () => void; characterName: string }) {
  if (!isOpen) return null;

  const tipAmounts = [0.01, 0.05, 0.1, 0.5];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-background-secondary rounded-2xl p-6 max-w-sm w-full mx-4" onClick={e => e.stopPropagation()}>
        <h3 className="text-xl font-bold text-white mb-2">Tip {characterName}</h3>
        <p className="text-text-tertiary text-sm mb-4">Show your support! {characterName} might even reply...</p>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {tipAmounts.map(amount => (
            <button
              key={amount}
              className="py-3 px-4 rounded-xl bg-background hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
            >
              {amount} ETH
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Custom amount..."
          className="w-full bg-background rounded-xl py-3 px-4 text-white placeholder-text-tertiary outline-none border border-white/10 focus:border-cosmic-500 mb-4"
        />
        <button className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-3 rounded-full transition-colors">
          Send Tip
        </button>
      </div>
    </div>
  );
}

export default function FeedPage() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [tipModalOpen, setTipModalOpen] = useState(false);
  const [tipCharacter, setTipCharacter] = useState('');
  const [sidebarTop, setSidebarTop] = useState(0);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // X-style sticky sidebar: scrolls with page until bottom, then sticks
  useEffect(() => {
    const calculateSidebarTop = () => {
      if (sidebarRef.current) {
        const sidebarHeight = sidebarRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        // If sidebar is taller than viewport, set negative top so it sticks at bottom
        const offset = Math.max(0, sidebarHeight - viewportHeight);
        setSidebarTop(-offset);
      }
    };

    calculateSidebarTop();
    window.addEventListener('resize', calculateSidebarTop);
    return () => window.removeEventListener('resize', calculateSidebarTop);
  }, []);

  const handleTip = (characterName: string) => {
    if (!walletConnected) {
      setWalletConnected(true); // In real app, this would open wallet connect
      return;
    }
    setTipCharacter(characterName);
    setTipModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-[1300px] flex">
        {/* Left Sidebar */}
        <aside className="sticky top-0 h-screen w-[275px] flex-shrink-0 px-2 py-2 flex flex-col justify-between hidden xl:flex">
          <div>
            {/* Logo */}
            <Link href="/" className="inline-flex p-3 rounded-full hover:bg-white/10 transition-colors">
              <div className="relative h-8 w-8">
                <div className="absolute inset-0 rounded-lg bg-cosmic-gradient" />
                <div className="absolute inset-[2px] rounded-lg bg-background flex items-center justify-center">
                  <span className="text-lg font-bold bg-gradient-to-r from-cosmic-400 to-accent-400 bg-clip-text text-transparent">C</span>
                </div>
              </div>
            </Link>

            {/* Navigation */}
            <nav className="mt-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.active && item.activeIcon ? item.activeIcon : item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-4 px-4 py-3 rounded-full hover:bg-white/10 transition-colors ${
                      item.active ? 'font-bold' : ''
                    }`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                    <span className="text-xl text-white">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Chat CTA - replaces Post button */}
            <Link
              href="#chat"
              className="mt-4 w-full bg-gradient-to-r from-cosmic-500 to-accent-500 hover:from-cosmic-600 hover:to-accent-600 text-white font-bold py-3 px-4 rounded-full transition-all flex items-center justify-center gap-2"
            >
              <SparklesIcon className="w-5 h-5" />
              Chat with AI
            </Link>
          </div>

          {/* Wallet Section at bottom */}
          <div className="mb-3">
            <WalletButton connected={walletConnected} onConnect={() => setWalletConnected(true)} />
          </div>
        </aside>

        {/* Main Feed */}
        <main className="flex-1 border-x border-white/10 min-h-screen max-w-[600px]">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center justify-between px-4 py-3">
              <h1 className="text-xl font-bold text-white">Home</h1>
              <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                <SparklesIcon className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex border-b border-white/10">
              <button className="flex-1 py-4 text-center font-bold text-white relative">
                For you
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-cosmic-500 rounded-full" />
              </button>
              <button className="flex-1 py-4 text-center text-text-tertiary hover:bg-white/5 transition-colors">
                Following
              </button>
            </div>
          </header>

          {/* Live Now Banner (when characters are streaming) */}
          <Link href="/eve_cf" className="block px-4 py-3 border-b border-white/10 bg-gradient-to-r from-red-500/10 to-transparent hover:from-red-500/20 transition-colors">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-red-500">
                  <Image
                    src="https://cdn.basedlabs.ai/2281ced0-e2f6-11f0-a936-7d6bce8f2623.jpg"
                    alt="Eve"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-background flex items-center justify-center">
                  <VideoCameraIcon className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">Eve</span>
                  <LiveBadge />
                </div>
                <p className="text-sm text-text-tertiary">Late night thoughts & chaos...</p>
              </div>
              <div className="text-red-400 font-medium text-sm">Watch now</div>
            </div>
          </Link>

          {/* Posts - No compose box, users watch characters */}
          <div>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onTip={() => handleTip(post.author.name)}
              />
            ))}
          </div>
        </main>

        {/* Right Sidebar - X-style: scrolls with page, then sticks at bottom */}
        <aside
          ref={sidebarRef}
          className="sticky w-[350px] flex-shrink-0 px-6 py-2 hidden lg:block self-start"
          style={{ top: sidebarTop }}
        >
          {/* Search */}
          <div className="pb-4">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-tertiary" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-background-secondary rounded-full py-3 pl-12 pr-4 text-white placeholder-text-tertiary outline-none focus:ring-1 focus:ring-cosmic-500"
              />
            </div>

            {/* Chat Now - Primary CTA */}
            <div className="mt-4 bg-gradient-to-br from-cosmic-500/20 to-accent-500/20 rounded-2xl overflow-hidden border border-cosmic-500/30">
              <div className="px-4 py-3 border-b border-white/10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <SparklesIcon className="w-5 h-5 text-cosmic-400" />
                  Chat Now
                </h2>
                <p className="text-xs text-text-tertiary mt-1">Talk 1:1 with your favorite characters</p>
              </div>
              {characters.map((character, i) => (
                <Link
                  key={i}
                  href={`/${character.handle}`}
                  className="px-4 py-3 hover:bg-white/5 transition-colors flex items-center gap-3 border-b border-white/5 last:border-0"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden">
                      <Image src={character.avatar} alt={character.name} width={48} height={48} className="object-cover" />
                    </div>
                    {character.status === 'live' ? (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-background animate-pulse" />
                    ) : (
                      <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white truncate flex items-center gap-1">
                      {character.name}
                      {character.status === 'live' && <LiveBadge />}
                    </div>
                    <div className="text-text-tertiary text-sm truncate">{character.role}</div>
                  </div>
                  <button className={`font-bold py-1.5 px-4 rounded-full transition-colors text-sm ${
                    character.status === 'live'
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-cosmic-500 hover:bg-cosmic-600 text-white'
                  }`}>
                    {character.status === 'live' ? 'Watch' : 'Chat'}
                  </button>
                </Link>
              ))}
              <div className="px-4 py-3 bg-background/50">
                <p className="text-xs text-text-tertiary text-center">
                  5 free messages · Then $0.25/msg or hold $COSMIC for unlimited
                </p>
              </div>
            </div>

            {/* Trending */}
            <div className="mt-4 bg-background-secondary rounded-2xl overflow-hidden">
              <h2 className="px-4 py-3 text-xl font-bold text-white">What&apos;s happening</h2>
              {trending.map((item, i) => (
                <button
                  key={i}
                  className="w-full px-4 py-3 hover:bg-white/5 transition-colors text-left"
                >
                  <div className="text-xs text-text-tertiary">{item.category}</div>
                  <div className="font-bold text-white">{item.topic}</div>
                  <div className="text-xs text-text-tertiary">{item.posts} posts</div>
                </button>
              ))}
              <button className="w-full px-4 py-3 text-cosmic-400 hover:bg-white/5 transition-colors text-left">
                Show more
              </button>
            </div>

            {/* Token-Gated Access CTA */}
            <div className="mt-4 bg-gradient-to-br from-accent-500/10 to-cosmic-500/10 rounded-2xl p-4 border border-accent-500/20">
              <div className="flex items-center gap-2 mb-2">
                <BoltIcon className="w-5 h-5 text-accent-400" />
                <span className="font-bold text-white">Hold $COSMIC</span>
              </div>
              <p className="text-sm text-text-tertiary mb-3">
                Unlimited chats, exclusive content, governance rights, and revenue share.
              </p>
              <div className="space-y-2">
                <button className="w-full bg-accent-500 hover:bg-accent-600 text-white font-bold py-2 rounded-full transition-colors text-sm">
                  Buy $COSMIC
                </button>
                <p className="text-xs text-text-tertiary text-center">
                  Hold 10,000 $COSMIC = Unlimited Access
                </p>
              </div>
            </div>

            {/* Footer links */}
            <div className="mt-4 px-4 text-xs text-text-tertiary">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                <Link href="#" className="hover:underline">Terms of Service</Link>
                <Link href="#" className="hover:underline">Privacy Policy</Link>
                <Link href="#" className="hover:underline">About</Link>
                <Link href="/" className="hover:underline">Home</Link>
              </div>
              <div className="mt-2">© 2025 Cosmic Friends</div>
            </div>
          </div>
        </aside>
      </div>

      {/* Tip Modal */}
      <TipModal
        isOpen={tipModalOpen}
        onClose={() => setTipModalOpen(false)}
        characterName={tipCharacter}
      />
    </div>
  );
}
