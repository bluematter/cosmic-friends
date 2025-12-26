import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Cosmic Friends | AI-Native Character Civilization',
  description:
    'A perpetual, on-chain, community-owned AI character studio. Build culture, own characters, shape the universe.',
  keywords: [
    'AI characters',
    'NFT',
    'DAO',
    'crypto',
    'autonomous AI',
    'web3',
    'community owned',
  ],
  openGraph: {
    title: 'Cosmic Friends | AI-Native Character Civilization',
    description:
      'A perpetual, on-chain, community-owned AI character studio. Build culture, own characters, shape the universe.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cosmic Friends',
    description: 'The first crypto-native AI civilization',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
