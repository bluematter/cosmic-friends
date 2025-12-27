'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  BuildingLibraryIcon,
  WalletIcon,
  ChartPieIcon,
  CalculatorIcon,
  SparklesIcon,
  AdjustmentsHorizontalIcon,
  BoltIcon,
  CpuChipIcon,
  ArrowTrendingUpIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/24/outline';

// Default values - easily tweakable
const DEFAULT_VALUES = {
  // Token Distribution (percentages, must sum to 100)
  founderAllocation: 15,
  treasuryAllocation: 35,
  communityAllocation: 10,
  liquidityAllocation: 10,
  publicSaleAllocation: 30,

  // Token Details
  totalSupply: 1_000_000_000,
  tokenHolderThreshold: 10000, // tokens needed for unlimited access

  // Vesting
  founderVestingYears: 3,

  // Revenue Splits (percentages)
  chatCharacterSplit: 50,
  chatTreasurySplit: 30,
  chatProtocolSplit: 20,

  tipCharacterSplit: 70,
  tipTreasurySplit: 20,
  tipProtocolSplit: 10,

  // Daily Auction splits (Nouns-style)
  auctionTreasurySplit: 80,
  auctionFounderSplit: 20,

  // Custom character creation splits
  customCharTreasurySplit: 50,
  customCharFounderSplit: 50,

  // Pricing
  chatPriceUSD: 0.25,
  avgTipUSD: 5,
  ethPrice: 3500,

  // Daily Auction (Nouns-style - 1 character/day = 365/year)
  avgDailyAuctionETH: 0.5, // Average winning bid

  // Custom Character Creation
  customCharacterFeeETH: 0.25, // Fee to create your own character
  customCharactersPerMonth: 20, // Users creating custom characters

  // User Funnel (percentages)
  monthlyActiveUsers: 10000,
  pctFreeOnly: 40, // Just browse, use 5 free messages
  pctPayPerMessage: 35, // Pay $0.25/msg
  pctTokenHolders: 25, // Hold $COSMIC, unlimited access

  // Engagement
  chatsPerPayingUser: 30, // Pay-per-message users
  chatsPerHolder: 100, // Token holders chat more (it's free for them)
  tipsPerUserPerMonth: 2,

  // Operating Costs
  costPerMessage: 0.02, // LLM API cost
  monthlyInfraCost: 500, // Servers, etc.

  // Founder needs
  founderMonthlyNeed: 20000,
};

function formatNumber(num: number): string {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(2) + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(2) + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
  return num.toLocaleString();
}

function formatUSD(num: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num);
}

function Slider({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  suffix = '%',
  description,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  suffix?: string;
  description?: string;
}) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-text-secondary">{label}</label>
        <span className="text-sm font-bold text-white">{value.toLocaleString()}{suffix}</span>
      </div>
      {description && <p className="text-xs text-text-tertiary mb-2">{description}</p>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-background rounded-lg appearance-none cursor-pointer slider"
      />
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  prefix = '',
  suffix = '',
  description,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  description?: string;
}) {
  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-text-secondary block mb-1">{label}</label>
      {description && <p className="text-xs text-text-tertiary mb-2">{description}</p>}
      <div className="flex items-center gap-2">
        {prefix && <span className="text-text-tertiary">{prefix}</span>}
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="flex-1 bg-background border border-white/10 rounded-lg px-3 py-2 text-white text-right focus:outline-none focus:border-cosmic-500"
        />
        {suffix && <span className="text-text-tertiary">{suffix}</span>}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  subValue,
  color = 'cosmic'
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  subValue?: string;
  color?: 'cosmic' | 'accent' | 'energy' | 'green' | 'red' | 'blue';
}) {
  const colorClasses = {
    cosmic: 'from-cosmic-500/20 to-cosmic-900/20 border-cosmic-500/30',
    accent: 'from-accent-500/20 to-accent-900/20 border-accent-500/30',
    energy: 'from-energy-500/20 to-energy-900/20 border-energy-500/30',
    green: 'from-green-500/20 to-green-900/20 border-green-500/30',
    red: 'from-red-500/20 to-red-900/20 border-red-500/30',
    blue: 'from-blue-500/20 to-blue-900/20 border-blue-500/30',
  };
  const iconColors = {
    cosmic: 'text-cosmic-400',
    accent: 'text-accent-400',
    energy: 'text-energy-400',
    green: 'text-green-400',
    red: 'text-red-400',
    blue: 'text-blue-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl border p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-5 h-5 ${iconColors[color]}`} />
        <span className="text-sm text-text-secondary">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {subValue && <div className="text-xs text-text-tertiary mt-1">{subValue}</div>}
    </div>
  );
}

function AllocationBar({
  allocations
}: {
  allocations: { label: string; value: number; color: string }[]
}) {
  return (
    <div className="space-y-2">
      <div className="h-8 rounded-lg overflow-hidden flex">
        {allocations.map((item, i) => (
          <div
            key={i}
            className={`${item.color} flex items-center justify-center text-xs font-medium text-white`}
            style={{ width: `${item.value}%` }}
          >
            {item.value >= 10 && `${item.value}%`}
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-3">
        {allocations.map((item, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded ${item.color}`} />
            <span className="text-xs text-text-secondary">{item.label}: {item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <div className="group relative inline-block ml-1">
      <QuestionMarkCircleIcon className="w-4 h-4 text-text-tertiary inline cursor-help" />
      <div className="hidden group-hover:block absolute z-10 w-64 p-2 bg-background-secondary border border-white/20 rounded-lg text-xs text-text-secondary -left-28 top-6">
        {text}
      </div>
    </div>
  );
}

export default function TokenomicsPage() {
  const [values, setValues] = useState(DEFAULT_VALUES);

  const updateValue = (key: keyof typeof DEFAULT_VALUES, value: number) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  // Calculated values
  const calculations = useMemo(() => {
    const {
      founderAllocation, treasuryAllocation, totalSupply, founderVestingYears,
      chatCharacterSplit, chatTreasurySplit, chatProtocolSplit,
      tipCharacterSplit, tipTreasurySplit, tipProtocolSplit,
      auctionTreasurySplit, auctionFounderSplit,
      customCharTreasurySplit, customCharFounderSplit,
      chatPriceUSD, avgTipUSD, ethPrice,
      avgDailyAuctionETH, customCharacterFeeETH, customCharactersPerMonth,
      monthlyActiveUsers, pctFreeOnly, pctPayPerMessage, pctTokenHolders,
      chatsPerPayingUser, chatsPerHolder, tipsPerUserPerMonth,
      costPerMessage, monthlyInfraCost,
      founderMonthlyNeed,
    } = values;

    // User segments
    const freeUsers = Math.floor(monthlyActiveUsers * (pctFreeOnly / 100));
    const payingUsers = Math.floor(monthlyActiveUsers * (pctPayPerMessage / 100));
    const holderUsers = Math.floor(monthlyActiveUsers * (pctTokenHolders / 100));

    // Token values
    const founderTokens = totalSupply * (founderAllocation / 100);
    const treasuryTokens = totalSupply * (treasuryAllocation / 100);
    const founderTokensPerMonth = founderTokens / (founderVestingYears * 12);

    // Message volumes
    const freeMessages = freeUsers * 5; // 5 free trial messages
    const paidMessages = payingUsers * chatsPerPayingUser;
    const holderMessages = holderUsers * chatsPerHolder;
    const totalMessages = freeMessages + paidMessages + holderMessages;

    // Revenue from chat (only pay-per-message users generate chat revenue)
    const monthlyChatRevenue = paidMessages * chatPriceUSD;

    // Tips (all users can tip)
    const monthlyTips = monthlyActiveUsers * tipsPerUserPerMonth;
    const monthlyTipRevenue = monthlyTips * avgTipUSD;

    // Daily Auctions (Nouns-style: ~30 auctions/month)
    const auctionsPerMonth = 30;
    const monthlyAuctionRevenue = auctionsPerMonth * avgDailyAuctionETH * ethPrice;

    // Custom Character Creation
    const monthlyCustomCharRevenue = customCharactersPerMonth * customCharacterFeeETH * ethPrice;

    const totalMonthlyRevenue = monthlyChatRevenue + monthlyTipRevenue + monthlyAuctionRevenue + monthlyCustomCharRevenue;

    // Operating costs
    const llmCosts = totalMessages * costPerMessage;
    const totalOperatingCosts = llmCosts + monthlyInfraCost;
    const netRevenue = totalMonthlyRevenue - totalOperatingCosts;
    const profitMargin = totalMonthlyRevenue > 0 ? (netRevenue / totalMonthlyRevenue) * 100 : 0;

    // Revenue splits
    const founderFromChat = monthlyChatRevenue * (chatProtocolSplit / 100);
    const founderFromTips = monthlyTipRevenue * (tipProtocolSplit / 100);
    const founderFromAuctions = monthlyAuctionRevenue * (auctionFounderSplit / 100);
    const founderFromCustomChar = monthlyCustomCharRevenue * (customCharFounderSplit / 100);
    const founderMonthlyRevenue = founderFromChat + founderFromTips + founderFromAuctions + founderFromCustomChar;

    const treasuryFromChat = monthlyChatRevenue * (chatTreasurySplit / 100);
    const treasuryFromTips = monthlyTipRevenue * (tipTreasurySplit / 100);
    const treasuryFromAuctions = monthlyAuctionRevenue * (auctionTreasurySplit / 100);
    const treasuryFromCustomChar = monthlyCustomCharRevenue * (customCharTreasurySplit / 100);
    const treasuryMonthlyRevenue = treasuryFromChat + treasuryFromTips + treasuryFromAuctions + treasuryFromCustomChar;

    const characterFromChat = monthlyChatRevenue * (chatCharacterSplit / 100);
    const characterFromTips = monthlyTipRevenue * (tipCharacterSplit / 100);
    const characterMonthlyRevenue = characterFromChat + characterFromTips;

    // Users needed to hit founder goal (from paying users only)
    const revenuePerPayingUser = (chatsPerPayingUser * chatPriceUSD * (chatProtocolSplit / 100)) +
                          (tipsPerUserPerMonth * avgTipUSD * (tipProtocolSplit / 100));
    const payingUsersNeededForGoal = Math.ceil(founderMonthlyNeed / revenuePerPayingUser);
    const totalUsersNeededForGoal = Math.ceil(payingUsersNeededForGoal / (pctPayPerMessage / 100));

    // Founder meets goal?
    const founderMeetsGoal = founderMonthlyRevenue >= founderMonthlyNeed;
    const founderGap = founderMonthlyNeed - founderMonthlyRevenue;

    return {
      // User segments
      freeUsers,
      payingUsers,
      holderUsers,
      // Tokens
      founderTokens,
      treasuryTokens,
      founderTokensPerMonth,
      // Messages
      freeMessages,
      paidMessages,
      holderMessages,
      totalMessages,
      // Revenue
      monthlyChatRevenue,
      monthlyTipRevenue,
      monthlyAuctionRevenue,
      monthlyCustomCharRevenue,
      totalMonthlyRevenue,
      // Costs
      llmCosts,
      totalOperatingCosts,
      netRevenue,
      profitMargin,
      // Splits
      founderMonthlyRevenue,
      treasuryMonthlyRevenue,
      characterMonthlyRevenue,
      founderFromChat,
      founderFromTips,
      founderFromAuctions,
      founderFromCustomChar,
      // Goals
      payingUsersNeededForGoal,
      totalUsersNeededForGoal,
      founderMeetsGoal,
      founderGap,
      revenuePerPayingUser,
    };
  }, [values]);

  const tokenAllocations = [
    { label: 'Founder', value: values.founderAllocation, color: 'bg-cosmic-500' },
    { label: 'Treasury', value: values.treasuryAllocation, color: 'bg-accent-500' },
    { label: 'Community', value: values.communityAllocation, color: 'bg-energy-500' },
    { label: 'Liquidity', value: values.liquidityAllocation, color: 'bg-blue-500' },
    { label: 'Public Sale', value: values.publicSaleAllocation, color: 'bg-green-500' },
  ];

  const userFunnelTotal = values.pctFreeOnly + values.pctPayPerMessage + values.pctTokenHolders;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-2 -m-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeftIcon className="w-5 h-5 text-white" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2">
                <ChartPieIcon className="w-6 h-6 text-cosmic-400" />
                Tokenomics Calculator
              </h1>
              <p className="text-sm text-text-tertiary">Interactive model - adjust values to see projections</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setValues(DEFAULT_VALUES)}
              className="px-4 py-2 text-sm text-text-secondary hover:text-white transition-colors"
            >
              Reset to Defaults
            </button>
            <Link
              href="/"
              className="px-4 py-2 bg-cosmic-500 hover:bg-cosmic-600 text-white font-medium rounded-lg transition-colors"
            >
              Back to Site
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* How It Works - Quick Summary */}
        <section className="mb-8 bg-gradient-to-r from-cosmic-500/10 to-accent-500/10 rounded-2xl border border-cosmic-500/20 p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <BoltIcon className="w-5 h-5 text-cosmic-400" />
            How Cosmic Friends Makes Money
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-background/50 rounded-xl p-4">
              <div className="text-2xl mb-2">1</div>
              <div className="font-medium text-white mb-1">Character Auctions</div>
              <div className="text-text-tertiary">Genesis drops → eventual Nouns-style daily auctions</div>
            </div>
            <div className="bg-background/50 rounded-xl p-4">
              <div className="text-2xl mb-2">2</div>
              <div className="font-medium text-white mb-1">Chat with AI</div>
              <div className="text-text-tertiary">$0.25/msg OR hold $COSMIC for unlimited</div>
            </div>
            <div className="bg-background/50 rounded-xl p-4">
              <div className="text-2xl mb-2">3</div>
              <div className="font-medium text-white mb-1">Tips</div>
              <div className="text-text-tertiary">Tip characters on posts & streams</div>
            </div>
            <div className="bg-background/50 rounded-xl p-4">
              <div className="text-2xl mb-2">4</div>
              <div className="font-medium text-white mb-1">Custom Characters</div>
              <div className="text-text-tertiary">Pay a fee to create your own character</div>
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-cosmic-400" />
            Key Projections
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCard
              icon={CurrencyDollarIcon}
              label="Gross Revenue"
              value={formatUSD(calculations.totalMonthlyRevenue)}
              subValue={`${formatNumber(values.monthlyActiveUsers)} users`}
              color="cosmic"
            />
            <StatCard
              icon={CpuChipIcon}
              label="Operating Costs"
              value={formatUSD(calculations.totalOperatingCosts)}
              subValue={`${calculations.profitMargin.toFixed(0)}% margin`}
              color="red"
            />
            <StatCard
              icon={WalletIcon}
              label="Founder Revenue"
              value={formatUSD(calculations.founderMonthlyRevenue)}
              subValue={calculations.founderMeetsGoal ? '✓ Meets goal' : `${formatUSD(calculations.founderGap)} short`}
              color={calculations.founderMeetsGoal ? 'green' : 'red'}
            />
            <StatCard
              icon={BuildingLibraryIcon}
              label="Treasury Revenue"
              value={formatUSD(calculations.treasuryMonthlyRevenue)}
              subValue="For culture & grants"
              color="accent"
            />
            <StatCard
              icon={UserGroupIcon}
              label="Users Needed"
              value={formatNumber(calculations.totalUsersNeededForGoal)}
              subValue={`To hit ${formatUSD(values.founderMonthlyNeed)}/mo`}
              color="energy"
            />
          </div>
        </section>

        {/* User Funnel - CRITICAL FOR UNDERSTANDING */}
        <section className="mb-8">
          <div className="bg-background-secondary rounded-2xl p-6 border border-white/10">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <UserGroupIcon className="w-5 h-5 text-energy-400" />
              User Funnel
              <InfoTooltip text="Not all users pay per message. Token holders get unlimited chat, so they don't generate per-message revenue. This breakdown shows where revenue actually comes from." />
            </h3>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-background rounded-xl p-4 border border-white/5">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-text-secondary">Free Users</span>
                  <span className="text-lg font-bold text-white">{values.pctFreeOnly}%</span>
                </div>
                <div className="text-2xl font-bold text-text-tertiary mb-1">{formatNumber(calculations.freeUsers)}</div>
                <div className="text-xs text-text-tertiary">5 free messages, then prompted to pay/buy tokens</div>
                <div className="mt-2 text-xs text-red-400">Revenue: $0 (trial users)</div>
              </div>

              <div className="bg-background rounded-xl p-4 border border-green-500/30">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-text-secondary">Pay-Per-Message</span>
                  <span className="text-lg font-bold text-green-400">{values.pctPayPerMessage}%</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{formatNumber(calculations.payingUsers)}</div>
                <div className="text-xs text-text-tertiary">{values.chatsPerPayingUser} messages/mo × ${values.chatPriceUSD}</div>
                <div className="mt-2 text-xs text-green-400">Revenue: {formatUSD(calculations.monthlyChatRevenue)}</div>
              </div>

              <div className="bg-background rounded-xl p-4 border border-cosmic-500/30">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-text-secondary">$COSMIC Holders</span>
                  <span className="text-lg font-bold text-cosmic-400">{values.pctTokenHolders}%</span>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{formatNumber(calculations.holderUsers)}</div>
                <div className="text-xs text-text-tertiary">{values.chatsPerHolder} messages/mo (unlimited)</div>
                <div className="mt-2 text-xs text-cosmic-400">Chat: $0 (but bought tokens!)</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Slider
                label="Free Users"
                value={values.pctFreeOnly}
                onChange={(v) => updateValue('pctFreeOnly', v)}
                suffix="%"
              />
              <Slider
                label="Pay-Per-Message"
                value={values.pctPayPerMessage}
                onChange={(v) => updateValue('pctPayPerMessage', v)}
                suffix="%"
              />
              <Slider
                label="Token Holders"
                value={values.pctTokenHolders}
                onChange={(v) => updateValue('pctTokenHolders', v)}
                suffix="%"
              />
            </div>
            <div className={`text-sm mt-2 ${userFunnelTotal === 100 ? 'text-green-400' : 'text-red-400'}`}>
              Total: {userFunnelTotal}% {userFunnelTotal !== 100 && '(must equal 100%)'}
            </div>
          </div>
        </section>

        {/* Token Utility - Why $COSMIC Has Value */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-cosmic-500/10 to-purple-500/10 rounded-2xl p-6 border border-cosmic-500/20">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <ArrowTrendingUpIcon className="w-5 h-5 text-cosmic-400" />
              Why $COSMIC Has Value
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-background/50 rounded-xl p-4">
                <CheckCircleIcon className="w-6 h-6 text-green-400 mb-2" />
                <div className="font-medium text-white mb-1">Access Utility</div>
                <div className="text-sm text-text-tertiary">
                  Hold {formatNumber(values.tokenHolderThreshold)}+ tokens = unlimited chat with all characters. Saves money vs pay-per-message.
                </div>
              </div>

              <div className="bg-background/50 rounded-xl p-4">
                <CheckCircleIcon className="w-6 h-6 text-green-400 mb-2" />
                <div className="font-medium text-white mb-1">Governance</div>
                <div className="text-sm text-text-tertiary">
                  Vote on character personalities, content direction, treasury spending. Your voice matters.
                </div>
              </div>

              <div className="bg-background/50 rounded-xl p-4">
                <CheckCircleIcon className="w-6 h-6 text-green-400 mb-2" />
                <div className="font-medium text-white mb-1">Treasury Backing</div>
                <div className="text-sm text-text-tertiary">
                  35% of tokens back the treasury. Revenue flows in, creating real asset backing.
                </div>
              </div>

              <div className="bg-background/50 rounded-xl p-4">
                <CheckCircleIcon className="w-6 h-6 text-green-400 mb-2" />
                <div className="font-medium text-white mb-1">Buy Pressure</div>
                <div className="text-sm text-text-tertiary">
                  New users buy tokens for access. Growing user base = growing demand for $COSMIC.
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-background/50 rounded-xl">
              <div className="text-sm text-text-secondary mb-2">Token Holder Math:</div>
              <div className="text-sm text-white">
                If a user sends {values.chatsPerHolder} messages/month at ${values.chatPriceUSD}/msg = <span className="text-green-400">${(values.chatsPerHolder * values.chatPriceUSD).toFixed(0)}/month</span>
              </div>
              <div className="text-sm text-text-tertiary mt-1">
                Holding {formatNumber(values.tokenHolderThreshold)} $COSMIC for unlimited access is a better deal if they chat regularly.
              </div>
            </div>
          </div>
        </section>

        {/* Character Ownership & Minting Roadmap */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-energy-500/10 to-accent-500/10 rounded-2xl p-6 border border-energy-500/20">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <SparklesIcon className="w-5 h-5 text-energy-400" />
              Character Minting Roadmap
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Phase 1 */}
              <div className="bg-background/50 rounded-xl p-5 border border-green-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-2 py-1 bg-green-500/20 rounded text-xs font-medium text-green-400">PHASE 1 - LAUNCH</div>
                </div>
                <h4 className="font-medium text-white mb-2">Genesis Characters</h4>
                <ul className="text-sm text-text-tertiary space-y-2">
                  <li>• 10-20 curated, high-quality AI characters</li>
                  <li>• Genesis auctions for early collectors</li>
                  <li>• Custom character creation (pay fee)</li>
                  <li>• Focus on character quality over quantity</li>
                </ul>
              </div>

              {/* Phase 2 */}
              <div className="bg-background/50 rounded-xl p-5 border border-cosmic-500/30">
                <div className="flex items-center gap-2 mb-3">
                  <div className="px-2 py-1 bg-cosmic-500/20 rounded text-xs font-medium text-cosmic-400">PHASE 2 - SCALE</div>
                </div>
                <h4 className="font-medium text-white mb-2">Daily Auctions (Nouns-style)</h4>
                <ul className="text-sm text-text-tertiary space-y-2">
                  <li>• 1 new character minted & auctioned daily</li>
                  <li>• 365 characters/year, perpetual expansion</li>
                  <li>• Auction proceeds → Treasury (80%) + Founder (20%)</li>
                  <li>• Activated once demand & community proven</li>
                </ul>
              </div>
            </div>

            {/* What Ownership Means */}
            <div className="bg-background/50 rounded-xl p-5">
              <h4 className="font-medium text-white mb-3">What Does &quot;Owning&quot; a Character Mean?</h4>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-energy-400 font-medium mb-1">Revenue Share</div>
                  <div className="text-text-tertiary">Earn % of your character&apos;s tips and chat revenue</div>
                </div>
                <div>
                  <div className="text-energy-400 font-medium mb-1">Creative Influence</div>
                  <div className="text-text-tertiary">Shape personality, content style, and story direction</div>
                </div>
                <div>
                  <div className="text-energy-400 font-medium mb-1">Governance Weight</div>
                  <div className="text-text-tertiary">Character NFT = voting power in the DAO</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Inputs */}
          <div className="lg:col-span-1 space-y-6">
            {/* Token Distribution */}
            <div className="bg-background-secondary rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <ChartPieIcon className="w-5 h-5 text-cosmic-400" />
                Token Distribution
              </h3>
              <Slider
                label="Founder/Team"
                value={values.founderAllocation}
                onChange={(v) => updateValue('founderAllocation', v)}
                description="Vested over time"
              />
              <Slider
                label="Treasury (DAO)"
                value={values.treasuryAllocation}
                onChange={(v) => updateValue('treasuryAllocation', v)}
                description="Community-governed"
              />
              <Slider
                label="Community/Airdrop"
                value={values.communityAllocation}
                onChange={(v) => updateValue('communityAllocation', v)}
              />
              <Slider
                label="Liquidity Pool"
                value={values.liquidityAllocation}
                onChange={(v) => updateValue('liquidityAllocation', v)}
              />
              <Slider
                label="Public Sale"
                value={values.publicSaleAllocation}
                onChange={(v) => updateValue('publicSaleAllocation', v)}
              />
              <div className={`text-sm mt-2 ${
                tokenAllocations.reduce((a, b) => a + b.value, 0) === 100
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}>
                Total: {tokenAllocations.reduce((a, b) => a + b.value, 0)}%
                {tokenAllocations.reduce((a, b) => a + b.value, 0) !== 100 && ' (must equal 100%)'}
              </div>
            </div>

            {/* Operating Costs */}
            <div className="bg-background-secondary rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CpuChipIcon className="w-5 h-5 text-red-400" />
                Operating Costs
              </h3>
              <NumberInput
                label="LLM Cost per Message"
                value={values.costPerMessage}
                onChange={(v) => updateValue('costPerMessage', v)}
                prefix="$"
                step={0.01}
                min={0.001}
                max={0.5}
                description="GPT-4: ~$0.03, GPT-3.5: ~$0.002, Claude: ~$0.02"
              />
              <NumberInput
                label="Monthly Infrastructure"
                value={values.monthlyInfraCost}
                onChange={(v) => updateValue('monthlyInfraCost', v)}
                prefix="$"
                step={100}
                min={0}
                max={10000}
                description="Servers, databases, etc."
              />
              <div className="mt-4 p-3 bg-background rounded-lg text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-text-secondary">Total Messages</span>
                  <span className="text-white">{formatNumber(calculations.totalMessages)}/mo</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-text-secondary">LLM Costs</span>
                  <span className="text-red-400">{formatUSD(calculations.llmCosts)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Costs</span>
                  <span className="text-red-400 font-bold">{formatUSD(calculations.totalOperatingCosts)}</span>
                </div>
              </div>
            </div>

            {/* Revenue Splits */}
            <div className="bg-background-secondary rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <AdjustmentsHorizontalIcon className="w-5 h-5 text-accent-400" />
                Revenue Splits
              </h3>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-white mb-2">Chat Revenue</h4>
                <Slider label="→ Character" value={values.chatCharacterSplit} onChange={(v) => updateValue('chatCharacterSplit', v)} />
                <Slider label="→ Treasury" value={values.chatTreasurySplit} onChange={(v) => updateValue('chatTreasurySplit', v)} />
                <Slider label="→ Protocol (You)" value={values.chatProtocolSplit} onChange={(v) => updateValue('chatProtocolSplit', v)} />
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-white mb-2">Tip Revenue</h4>
                <Slider label="→ Character" value={values.tipCharacterSplit} onChange={(v) => updateValue('tipCharacterSplit', v)} />
                <Slider label="→ Treasury" value={values.tipTreasurySplit} onChange={(v) => updateValue('tipTreasurySplit', v)} />
                <Slider label="→ Protocol (You)" value={values.tipProtocolSplit} onChange={(v) => updateValue('tipProtocolSplit', v)} />
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-white mb-2">Daily Auction Revenue</h4>
                <Slider label="→ Treasury" value={values.auctionTreasurySplit} onChange={(v) => updateValue('auctionTreasurySplit', v)} />
                <Slider label="→ Founder" value={values.auctionFounderSplit} onChange={(v) => updateValue('auctionFounderSplit', v)} />
              </div>

              <div>
                <h4 className="text-sm font-medium text-white mb-2">Custom Character Revenue</h4>
                <Slider label="→ Treasury" value={values.customCharTreasurySplit} onChange={(v) => updateValue('customCharTreasurySplit', v)} />
                <Slider label="→ Founder" value={values.customCharFounderSplit} onChange={(v) => updateValue('customCharFounderSplit', v)} />
              </div>
            </div>
          </div>

          {/* Middle: Pricing & Volume */}
          <div className="lg:col-span-1 space-y-6">
            {/* Pricing */}
            <div className="bg-background-secondary rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CurrencyDollarIcon className="w-5 h-5 text-energy-400" />
                Pricing
              </h3>
              <NumberInput
                label="Chat Price"
                value={values.chatPriceUSD}
                onChange={(v) => updateValue('chatPriceUSD', v)}
                prefix="$"
                suffix="per message"
                step={0.05}
                min={0.01}
                max={5}
              />
              <NumberInput
                label="Token Holder Threshold"
                value={values.tokenHolderThreshold}
                onChange={(v) => updateValue('tokenHolderThreshold', v)}
                suffix="$COSMIC"
                step={1000}
                min={1000}
                max={100000}
                description="Hold this many = unlimited chat"
              />
              <NumberInput
                label="Average Tip"
                value={values.avgTipUSD}
                onChange={(v) => updateValue('avgTipUSD', v)}
                prefix="$"
                step={1}
                min={1}
                max={100}
              />
              <NumberInput
                label="ETH Price (USD)"
                value={values.ethPrice}
                onChange={(v) => updateValue('ethPrice', v)}
                prefix="$"
                step={100}
                min={1000}
                max={10000}
              />
            </div>

            {/* Daily Auctions & Custom Characters */}
            <div className="bg-gradient-to-br from-energy-500/10 to-accent-500/10 rounded-2xl p-6 border border-energy-500/20">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <SparklesIcon className="w-5 h-5 text-energy-400" />
                Character Minting
                <span className="text-xs font-normal text-cosmic-400 ml-2">(Phase 2 - At Scale)</span>
              </h3>
              <p className="text-xs text-text-tertiary mb-4">Future state: Nouns-style daily auctions once community is proven. See roadmap above.</p>
              <NumberInput
                label="Avg Daily Auction Bid"
                value={values.avgDailyAuctionETH}
                onChange={(v) => updateValue('avgDailyAuctionETH', v)}
                suffix="ETH"
                step={0.1}
                min={0.01}
                max={10}
                description="Phase 2: Average winning bid per daily auction"
              />
              <NumberInput
                label="Custom Character Fee"
                value={values.customCharacterFeeETH}
                onChange={(v) => updateValue('customCharacterFeeETH', v)}
                suffix="ETH"
                step={0.05}
                min={0.01}
                max={5}
                description="Fee to create your own character"
              />
              <NumberInput
                label="Custom Chars Created/Mo"
                value={values.customCharactersPerMonth}
                onChange={(v) => updateValue('customCharactersPerMonth', v)}
                step={5}
                min={0}
                max={200}
              />
              <div className="mt-4 p-3 bg-background/50 rounded-lg text-sm">
                <div className="flex justify-between mb-1">
                  <span className="text-text-secondary">Auction Revenue/Mo</span>
                  <span className="text-energy-400">{formatUSD(calculations.monthlyAuctionRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Custom Char Revenue/Mo</span>
                  <span className="text-accent-400">{formatUSD(calculations.monthlyCustomCharRevenue)}</span>
                </div>
              </div>
            </div>

            {/* Volume Projections */}
            <div className="bg-background-secondary rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <UserGroupIcon className="w-5 h-5 text-green-400" />
                Volume Projections
              </h3>
              <NumberInput
                label="Monthly Active Users"
                value={values.monthlyActiveUsers}
                onChange={(v) => updateValue('monthlyActiveUsers', v)}
                step={1000}
                min={100}
                max={1000000}
              />
              <NumberInput
                label="Chats per Paying User/Mo"
                value={values.chatsPerPayingUser}
                onChange={(v) => updateValue('chatsPerPayingUser', v)}
                step={5}
                min={1}
                max={200}
                description="Pay-per-message users"
              />
              <NumberInput
                label="Chats per Holder/Mo"
                value={values.chatsPerHolder}
                onChange={(v) => updateValue('chatsPerHolder', v)}
                step={10}
                min={1}
                max={500}
                description="Token holders (unlimited)"
              />
              <NumberInput
                label="Tips per User/Month"
                value={values.tipsPerUserPerMonth}
                onChange={(v) => updateValue('tipsPerUserPerMonth', v)}
                step={1}
                min={0}
                max={50}
              />
            </div>

            {/* Founder Goal */}
            <div className="bg-background-secondary rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <CalculatorIcon className="w-5 h-5 text-cosmic-400" />
                Founder Goal
              </h3>
              <NumberInput
                label="Monthly Income Need"
                value={values.founderMonthlyNeed}
                onChange={(v) => updateValue('founderMonthlyNeed', v)}
                prefix="$"
                step={1000}
                min={1000}
                max={100000}
                description="Your target monthly income"
              />
              <NumberInput
                label="Vesting Period"
                value={values.founderVestingYears}
                onChange={(v) => updateValue('founderVestingYears', v)}
                suffix="years"
                step={1}
                min={1}
                max={5}
              />
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-1 space-y-6">
            {/* Token Allocation Visual */}
            <div className="bg-background-secondary rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Token Allocation</h3>
              <AllocationBar allocations={tokenAllocations} />
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Total Supply</span>
                  <span className="text-white font-medium">{formatNumber(values.totalSupply)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Your Tokens</span>
                  <span className="text-white font-medium">{formatNumber(calculations.founderTokens)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Tokens/Month (vested)</span>
                  <span className="text-white font-medium">{formatNumber(calculations.founderTokensPerMonth)}</span>
                </div>
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="bg-background-secondary rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Monthly Revenue Breakdown</h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">Chat Revenue</span>
                    <span className="text-white">{formatUSD(calculations.monthlyChatRevenue)}</span>
                  </div>
                  <div className="text-xs text-text-tertiary">
                    {formatNumber(calculations.paidMessages)} paid messages × ${values.chatPriceUSD}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">Tip Revenue</span>
                    <span className="text-white">{formatUSD(calculations.monthlyTipRevenue)}</span>
                  </div>
                  <div className="text-xs text-text-tertiary">
                    {formatNumber(values.monthlyActiveUsers * values.tipsPerUserPerMonth)} tips × ${values.avgTipUSD} avg
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">Auction Revenue</span>
                    <span className="text-white">{formatUSD(calculations.monthlyAuctionRevenue)}</span>
                  </div>
                  <div className="text-xs text-text-tertiary">
                    ~30 auctions × {values.avgDailyAuctionETH} ETH avg
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-text-secondary">Custom Char Revenue</span>
                    <span className="text-white">{formatUSD(calculations.monthlyCustomCharRevenue)}</span>
                  </div>
                  <div className="text-xs text-text-tertiary">
                    {values.customCharactersPerMonth} creations × {values.customCharacterFeeETH} ETH
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Gross Revenue</span>
                    <span className="text-white">{formatUSD(calculations.totalMonthlyRevenue)}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-red-400">- Operating Costs</span>
                    <span className="text-red-400">{formatUSD(calculations.totalOperatingCosts)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold pt-2 border-t border-white/10">
                    <span className="text-white">Net Revenue</span>
                    <span className="text-cosmic-400">{formatUSD(calculations.netRevenue)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Take - Founder Revenue */}
            <div className={`rounded-2xl p-6 border ${
              calculations.founderMeetsGoal
                ? 'bg-green-500/10 border-green-500/30'
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <h3 className="text-lg font-bold text-white mb-2">
                {calculations.founderMeetsGoal ? '✓ You Hit Your Goal!' : '✗ Gap to Goal'}
              </h3>
              <p className="text-xs text-text-tertiary mb-4">
                Founder revenue comes from protocol fees on each revenue stream
              </p>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">From Chat ({values.chatProtocolSplit}%)</span>
                  <span className="text-white">{formatUSD(calculations.founderFromChat)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">From Tips ({values.tipProtocolSplit}%)</span>
                  <span className="text-white">{formatUSD(calculations.founderFromTips)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">From Auctions ({values.auctionFounderSplit}%)</span>
                  <span className="text-white">{formatUSD(calculations.founderFromAuctions)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">From Custom Chars ({values.customCharFounderSplit}%)</span>
                  <span className="text-white">{formatUSD(calculations.founderFromCustomChar)}</span>
                </div>
                <div className="pt-3 border-t border-white/20">
                  <div className="flex justify-between font-bold">
                    <span className="text-white">Your Monthly Total</span>
                    <span className={calculations.founderMeetsGoal ? 'text-green-400' : 'text-red-400'}>
                      {formatUSD(calculations.founderMonthlyRevenue)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-text-tertiary">Your Goal</span>
                    <span className="text-text-tertiary">{formatUSD(values.founderMonthlyNeed)}</span>
                  </div>
                </div>

                {!calculations.founderMeetsGoal && (
                  <div className="mt-4 p-3 bg-background/50 rounded-lg">
                    <p className="text-sm text-text-secondary">
                      Need <strong className="text-white">{formatNumber(calculations.totalUsersNeededForGoal)} total users</strong> ({formatNumber(calculations.payingUsersNeededForGoal)} paying) at current rates.
                    </p>
                    <p className="text-xs text-text-tertiary mt-1">
                      Each paying user generates ~{formatUSD(calculations.revenuePerPayingUser)}/mo for you
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Annual Projections */}
            <div className="bg-background-secondary rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-bold text-white mb-4">Annual Projections</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Your Annual Revenue</span>
                  <span className="text-white font-medium">{formatUSD(calculations.founderMonthlyRevenue * 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Treasury Annual</span>
                  <span className="text-white font-medium">{formatUSD(calculations.treasuryMonthlyRevenue * 12)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Characters Annual</span>
                  <span className="text-white font-medium">{formatUSD(calculations.characterMonthlyRevenue * 12)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10">
                  <span className="text-text-secondary">Total Annual (Net)</span>
                  <span className="text-cosmic-400 font-bold">{formatUSD(calculations.netRevenue * 12)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-8 p-4 bg-background-secondary rounded-xl border border-white/10 text-center">
          <p className="text-sm text-text-tertiary">
            This is a projection tool. Actual results depend on user adoption, market conditions, and execution.
            <br />
            <span className="text-text-secondary">All revenue splits are configurable. Adjust to find the right balance.</span>
          </p>
        </div>
      </main>

      {/* Custom slider styles */}
      <style jsx global>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          cursor: pointer;
          border: 2px solid white;
        }
        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b5cf6, #6366f1);
          cursor: pointer;
          border: 2px solid white;
        }
      `}</style>
    </div>
  );
}
