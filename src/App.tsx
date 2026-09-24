/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ReactNode, useEffect, useState } from 'react';
import {
  ArrowRight,
  Clock,
  Menu,
  X,
  Sparkles,
  CheckCircle2,
  Building2,
  Flame,
  Globe,
  Share2,
  TrendingUp,
  Layers,
  Send,
  ArrowUpRight,
  Pause,
  Play,
  LayoutGrid,
  Radio,
} from 'lucide-react';
import { Shader, ChromaFlow, FilmGrain, FlutedGlass, Swirl } from 'shaders/react';

// Error boundary for WebGL canvas
interface ErrorBoundaryProps {
  fallback?: ReactNode;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SafeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Shader rendering error caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

// Authentic Original Brand Masala Logo (Exact Stacked Layout from Logo3.png)
function OriginalBrandMasalaLogo({
  variant = 'dark',
  size = 'default',
}: {
  variant?: 'dark' | 'card';
  size?: 'small' | 'default' | 'large';
}) {
  if (variant === 'card') {
    // Exact replica of the user's uploaded Logo3.png on crisp white badge
    return (
      <div className="inline-flex flex-col items-start bg-white text-black px-3.5 py-2.5 rounded-xl shadow-lg select-none border border-white/20">
        <div className="font-black text-[18px] sm:text-[21px] leading-[0.9] tracking-[-0.04em] text-black">
          brand
        </div>
        <div className="font-black text-[18px] sm:text-[21px] leading-[0.9] tracking-[-0.04em] text-[#FBAF18] flex items-baseline">
          masala<span className="text-[#FF4438] ml-0.5 text-[22px] leading-none">.</span>
        </div>
        <div className="text-[6.5px] sm:text-[7.5px] font-bold tracking-[0.22em] uppercase text-black mt-1 whitespace-nowrap">
          A BRAND CONSULTANCY FIRM
        </div>
      </div>
    );
  }

  // Dark background version matching the exact vertical stacking from Logo3.png
  const sizes = {
    small: {
      brand: 'text-[14px] sm:text-[15px]',
      tag: 'text-[5.5px] sm:text-[6px] tracking-[0.22em]',
      dot: 'text-[16px] -ml-0.5',
    },
    default: {
      brand: 'text-[18px] sm:text-[20px]',
      tag: 'text-[7px] tracking-[0.24em]',
      dot: 'text-[22px] -ml-0.5',
    },
    large: {
      brand: 'text-[28px] sm:text-[34px]',
      tag: 'text-[9.5px] tracking-[0.26em]',
      dot: 'text-[36px] -ml-0.5',
    },
  }[size];

  return (
    <div className="inline-flex flex-col items-start select-none">
      <div className={`font-black ${sizes.brand} leading-[0.9] tracking-[-0.04em] text-white`}>
        brand
      </div>
      <div className={`font-black ${sizes.brand} leading-[0.9] tracking-[-0.04em] text-[#FBAF18] flex items-baseline`}>
        masala<span className={`text-[#FF4438] ${sizes.dot} leading-none`}>.</span>
      </div>
      <div className={`${sizes.tag} font-bold uppercase text-zinc-400 mt-1 whitespace-nowrap`}>
        A BRAND CONSULTANCY FIRM
      </div>
    </div>
  );
}

export default function App() {
  const [londonTime, setLondonTime] = useState<string>('12:00');
  const [mumbaiTime, setMumbaiTime] = useState<string>('17:30');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [strategyModalOpen, setStrategyModalOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<string[]>(['Branding & Identity']);
  const [marqueePaused, setMarqueePaused] = useState<boolean>(false);
  const [marqueeSpeed, setMarqueeSpeed] = useState<'normal' | 'fast' | 'slow'>('normal');
  const [rosterViewMode, setRosterViewMode] = useState<'marquee' | 'grid'>('marquee');
  const [hoveredClient, setHoveredClient] = useState<string | null>(null);

  useEffect(() => {
    const updateTimes = () => {
      try {
        const london = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/London',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        setLondonTime(london);

        const mumbai = new Intl.DateTimeFormat('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date());
        setMumbaiTime(mumbai);
      } catch {
        const now = new Date();
        const hh = String(now.getUTCHours()).padStart(2, '0');
        const mm = String(now.getUTCMinutes()).padStart(2, '0');
        setLondonTime(`${hh}:${mm}`);
        setMumbaiTime(`${hh}:${mm}`);
      }
    };

    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#who-we-are' },
    { label: 'Capabilities', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Clients', href: '#clients' },
    { label: 'Leadership', href: '#leadership' },
  ];

  // 8 Disciplines from Slide 3 - Short, crisp & minimal
  const servicesList = [
    {
      id: '01',
      name: 'Digital Marketing',
      desc: 'Performance campaigns, multi-channel lead funnels & acquisition engines.',
      icon: TrendingUp,
    },
    {
      id: '02',
      name: 'Social Media',
      desc: 'High-impact visual storytelling, organic scaling & audience obsession.',
      icon: Share2,
    },
    {
      id: '03',
      name: 'Branding & Identity',
      desc: 'Positioning, design systems, architectural signage & luxury packaging.',
      icon: Sparkles,
    },
    {
      id: '04',
      name: 'Web Development',
      desc: 'Interactive 3D showcases, bespoke platforms & high-converting architectures.',
      icon: Globe,
    },
    {
      id: '05',
      name: 'Performance Media',
      desc: 'Data-driven paid social, search scaling & algorithmic revenue growth.',
      icon: Flame,
    },
    {
      id: '06',
      name: 'UGC Content',
      desc: 'High-retention creator production, native hooks & viral reel formats.',
      icon: Sparkles,
    },
    {
      id: '07',
      name: 'Search Authority',
      desc: 'Technical infrastructure, organic ranking & category keyword supremacy.',
      icon: Layers,
    },
    {
      id: '08',
      name: 'App Development',
      desc: 'Native mobile ecosystems, private client portals & custom software.',
      icon: Building2,
    },
  ];

  // Featured Work - Clean editorial cards
  const projects = [
    {
      title: 'SOHO Residences',
      category: 'website',
      client: 'SOHO Luxury Residences',
      summary: 'Interactive 3D web experience for skyline high-rise living.',
      video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4',
      aspect: 'aspect-[16/10]',
      tag: 'Web & 3D',
    },
    {
      title: 'KULTURE',
      category: 'social',
      client: 'Kulture Woodcraft',
      summary: 'Textures that Tempt & Patterns with Purpose visual campaigns.',
      video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4',
      aspect: 'aspect-[16/10]',
      tag: 'Social Direction',
    },
    {
      title: 'Tata Motors',
      category: 'social',
      client: 'Tata Motors Passenger Vehicles',
      summary: 'National digital launch suite for Altroz, Punch & Safari.',
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85',
      aspect: 'aspect-[16/10]',
      tag: 'Automotive Media',
    },
    {
      title: 'Rawpchic Living',
      category: 'social',
      client: 'Rawpchic Esthetique',
      summary: 'Artisanal furniture silhouettes and architectural interior stories.',
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85',
      aspect: 'aspect-[16/10]',
      tag: 'Brand & Social',
    },
    {
      title: 'Detailing Daddy & Turtle Wax',
      category: 'social',
      client: 'Detailing Daddy',
      summary: 'Graphene coating & self-healing PPF performance video ads.',
      video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4',
      aspect: 'aspect-[16/10]',
      tag: 'Paid Social',
    },
    {
      title: 'Jain Radhakrishna Bliss',
      category: 'print',
      client: 'Jain Constructions',
      summary: '40-floor residential launch campaign & national newspaper spreads.',
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85',
      aspect: 'aspect-[16/10]',
      tag: 'Print & Identity',
    },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Client roster data categorized with industry sector & strategic engagement
  interface RosterClientItem {
    id: string;
    name: string;
    sector: string;
    scope: string;
    tag: string;
  }

  const clientRosterRow1: RosterClientItem[] = [
    { id: 'mb', name: 'Mercedes-Benz', sector: 'Luxury Automotive', scope: 'Brand Activation & Regional Experience', tag: 'Global Tier-1' },
    { id: 'tata', name: 'Tata Motors', sector: 'Mobility & Automotive', scope: 'Altroz, Punch & Safari Launch Suite', tag: 'Enterprise' },
    { id: 'ather', name: 'Ather Energy', sector: 'Clean EV Mobility', scope: 'Multi-Channel Acquisition Strategy', tag: 'EV Pioneer' },
    { id: 'turtle', name: 'Turtle Wax', sector: 'Global Car Care', scope: 'National Graphene PPF Campaign', tag: 'Worldwide' },
    { id: 'daddy', name: 'Detailing Daddy', sector: 'Auto Protection & PPF', scope: 'Paid Video Funnels & Social Engine', tag: 'Performance' },
    { id: 'rawpchic', name: 'Rawpchic Esthetique', sector: 'Artisanal Living', scope: 'Spatial Identity & Editorial Direction', tag: 'Luxury Living' },
    { id: 'ceramic', name: 'Ceramic Pro', sector: 'Surface Nanotech', scope: 'B2B Positioning & Franchise Scale', tag: 'Nanotech' },
    { id: 'soho', name: 'SOHO', sector: 'Experiential Hospitality', scope: 'Flagship Venue Launch & Visual Arts', tag: 'Hospitality' },
    { id: 'kulture', name: 'Kulture', sector: 'Urban Streetwear', scope: 'DTC Brand Strategy & Capsule Drops', tag: 'Streetwear' },
  ];

  const clientRosterRow2: RosterClientItem[] = [
    { id: 'jains', name: 'Jains Bliss', sector: 'Luxury High-Rise', scope: '40-Floor Architectural Launch Suite', tag: 'Residential' },
    { id: 'svc', name: 'SVC Realty', sector: 'Urban Infrastructure', scope: 'Developer Rebrand & Capital Systems', tag: 'Commercial' },
    { id: 'altossa', name: 'Altossa', sector: 'Contemporary Living', scope: 'Visual Identity & E-Commerce Flagship', tag: 'Direct-to-Consumer' },
    { id: 'cla', name: 'CLA Architects', sector: 'Spatial Architecture', scope: 'Portfolio Monograph & Digital Experience', tag: 'Architecture' },
    { id: 'oppein', name: 'Oppein Living', sector: 'Modular Living Systems', scope: 'Luxury Showroom Performance Engine', tag: 'Global Brand' },
    { id: 'trilight', name: 'Trilight', sector: 'Skyline Residences', scope: 'Omni-Channel Real Estate Media Suite', tag: 'Ultra-Luxury' },
    { id: 'mtc', name: 'Spaces by MTC', sector: 'Bespoke Environments', scope: 'Brand Film & Aesthetic Direction', tag: 'Interior Studio' },
    { id: 'vnr', name: 'VNR Dairy', sector: 'Organic FMCG Agri', scope: 'Packaging Architecture & Distribution', tag: 'FMCG' },
    { id: 'roch', name: 'Roch Café', sector: 'Artisanal Roastery', scope: 'Retail Concept & Experiential Menu', tag: 'F&B Lifestyle' },
  ];

  const allClients = [...clientRosterRow1, ...clientRosterRow2];

  const toggleServiceSelection = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName)
        ? prev.filter((s) => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setStrategyModalOpen(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-200 antialiased font-normal selection:bg-[#FBAF18] selection:text-black">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO (Dark luxury theme, original stacked logo, short tagline) */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#09090B]">
        {/* Animated Amber & Obsidian Shader Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden opacity-85">
          <SafeErrorBoundary
            fallback={
              <div className="w-full h-full bg-gradient-to-tr from-[#ff7a00]/10 via-transparent to-[#f59e0b]/10" />
            }
          >
            <Shader className="w-full h-full">
              <Swirl colorA="#08080a" colorB="#15161e" detail={1.6} />
              <ChromaFlow
                baseColor="#08080a"
                downColor="#ff7a00"
                leftColor="#ff9e00"
                rightColor="#ff4b3a"
                upColor="#ffb300"
                momentum={12}
                radius={3.5}
              />
              <FlutedGlass
                aberration={0.55}
                angle={30}
                frequency={8}
                highlight={0.14}
                highlightSoftness={0}
                lightAngle={-90}
                refraction={3.8}
                shape="rounded"
                softness={1}
                speed={0.15}
              />
              <FilmGrain strength={0.04} />
            </Shader>
          </SafeErrorBoundary>
        </div>

        {/* Ambient Dark Glows */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#FBAF18]/10 rounded-full blur-[140px] pointer-events-none z-10" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#FF4632]/8 rounded-full blur-[160px] pointer-events-none z-10" />

        {/* Minimal Pill Navbar */}
        <header className="relative z-20 w-full max-w-[1320px] mx-auto p-3 sm:p-4">
          <nav className="bg-[#111218]/90 backdrop-blur-xl border border-white/[0.08] rounded-full px-3.5 py-2 flex items-center justify-between shadow-2xl">
            {/* Original Stacked Logo in Navbar */}
            <a href="#" className="flex items-center pl-1" aria-label="Brand Masala Home">
              <OriginalBrandMasalaLogo size="small" variant="dark" />
            </a>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[12.5px] text-zinc-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right Desktop Controls */}
            <div className="hidden md:flex items-center gap-4 pr-0.5">
              {/* Dual Live Clocks */}
              <div className="flex items-center gap-2 text-[11px] text-zinc-400 bg-white/[0.03] border border-white/[0.06] rounded-full px-3 py-1 font-mono">
                <Clock size={11} className="text-[#FBAF18]" />
                <span>{mumbaiTime} BOM</span>
                <span className="text-zinc-600">·</span>
                <span>{londonTime} LON</span>
              </div>

              {/* Consultation CTA */}
              <button
                type="button"
                onClick={() => setStrategyModalOpen(true)}
                className="bg-white hover:bg-[#FBAF18] text-black text-[12px] font-bold rounded-full pl-4 pr-1.5 py-1.5 flex items-center gap-2.5 group cursor-pointer transition-all duration-200"
              >
                <span>Book a call</span>
                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:-rotate-45">
                  <ArrowRight size={11} />
                </span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-8 h-8 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-300"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
              </button>
            </div>
          </nav>
        </header>

        {/* Mobile Menu Modal */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-end p-4 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div
              className="bg-[#12131A] border border-white/10 rounded-2xl p-6 flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <OriginalBrandMasalaLogo size="small" variant="dark" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-zinc-300"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex flex-col gap-3.5">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-zinc-200 hover:text-[#FBAF18]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setStrategyModalOpen(true);
                }}
                className="w-full bg-[#FBAF18] text-black font-semibold text-xs py-2.5 rounded-full mt-2"
              >
                Book a Strategy Call
              </button>
            </div>
          </div>
        )}

        <div className="flex-1" />

        {/* Hero Bottom Zone - Clean, bold & uncluttered */}
        <div className="relative z-20 w-full max-w-[1320px] mx-auto px-5 sm:px-8 pb-12 sm:pb-16">
          {/* Minimal Tag */}
          <div className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] px-3 py-1 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4438]" />
            <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-zinc-400">
              Brand Consultancy Firm
            </span>
          </div>

          {/* SHORT & CATCHY TAGLINE: "Bold brands. Built to dominate." */}
          <h1 className="text-[clamp(2.2rem,5.5vw,3.6rem)] font-extrabold leading-[1.05] tracking-[-0.035em] text-white max-w-3xl">
            Bold brands.
            <br />
            Built to dominate.
          </h1>

          {/* Catchy, concise sub-kicker */}
          <p className="mt-3 text-zinc-400 text-xs sm:text-[13.5px] max-w-lg leading-relaxed">
            Strategic brand positioning, viral social media, and high-conversion digital engines for category leaders.
          </p>

          {/* Action triggers */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={() => setStrategyModalOpen(true)}
              className="bg-[#FBAF18] hover:bg-[#e09c12] text-black text-[12.5px] font-bold rounded-full pl-5 pr-2 py-2 flex items-center gap-2.5 transition-all cursor-pointer shadow-lg shadow-[#FBAF18]/15"
            >
              <span>Start a project</span>
              <span className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                <ArrowRight size={12} />
              </span>
            </button>

            <a
              href="#work"
              className="text-xs text-zinc-300 hover:text-white px-4 py-2 rounded-full border border-white/10 hover:border-white/20 transition-colors"
            >
              View Selected Work
            </a>

            <span className="hidden sm:inline-block text-[11px] text-zinc-500 font-mono ml-2">
              / 35+ Marquee Clients
            </span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 2: WHO WE ARE (Minimal text, concise 2-column layout)             */}
      {/* ========================================================================= */}
      <section id="who-we-are" className="border-t border-white/[0.06] py-16 sm:py-24 bg-[#0A0A0D]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
          <div className="flex items-center gap-2 mb-8">
            <span className="text-[10px] font-mono text-[#FBAF18] font-bold">01</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
              Who We Are
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column: Short editorial manifesto */}
            <div className="lg:col-span-7 flex flex-col gap-5">
              <h2 className="text-xl sm:text-2xl lg:text-[1.85rem] font-medium text-white tracking-tight leading-snug">
                Built on the belief that every brand deserves a unique story and an unstoppable presence.
              </h2>
              <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed">
                From branding and social media to digital campaigns and performance marketing, we blend creativity with strategy to deliver measurable growth. Our approach builds trust, engagement, and enduring commercial value.
              </p>

              {/* Minimal metrics */}
              <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/[0.06] mt-2">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">35+</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5 font-medium">
                    Marquee Brands
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">8</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5 font-medium">
                    Disciplines
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">100M+</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500 mt-0.5 font-medium">
                    Audience Reach
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-xl overflow-hidden border border-white/[0.08] aspect-[4/3] bg-[#12131B]">
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85"
                  alt="Brand Masala creative strategy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                  <span className="text-[11px] text-zinc-300 font-medium">
                    Strategy · Design · Performance
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 3: SERVICES (Minimal 8 disciplines, small typography, uncluttered) */}
      {/* ========================================================================= */}
      <section id="services" className="border-t border-white/[0.06] py-16 sm:py-24 bg-[#08080B]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#FBAF18] font-bold">02</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                Our Services
              </span>
            </div>
            <span className="text-[11px] text-zinc-500 font-mono">08 Disciplines</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-[1.85rem] font-medium text-white tracking-tight mb-10">
            Strategic Capabilities
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {servicesList.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="p-5 rounded-xl bg-[#101117] border border-white/[0.06] hover:border-[#FBAF18]/40 transition-colors flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono text-[#FBAF18]">
                        {'{' + service.id + '}'}
                      </span>
                      <Icon size={15} className="text-zinc-500 group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1.5">
                      {service.name}
                    </h3>
                    <p className="text-[12px] text-zinc-400 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 4: OUR WORK (Minimal 16:10 cards, video & image showcases)        */}
      {/* ========================================================================= */}
      <section id="work" className="border-t border-white/[0.06] py-16 sm:py-24 bg-[#0A0A0E]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-[#FBAF18] font-bold">03</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                  Portfolio
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-[1.85rem] font-medium text-white tracking-tight">
                Featured Work
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.06] rounded-full self-start sm:self-auto">
              {[
                { id: 'all', label: 'All' },
                { id: 'social', label: 'Social' },
                { id: 'website', label: 'Web' },
                { id: 'print', label: 'Print' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3 py-1 text-[11px] font-medium rounded-full transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#FBAF18] text-black font-semibold'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Column Work Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {filteredProjects.map((item) => (
              <div key={item.title} className="group flex flex-col">
                <div className={`${item.aspect} rounded-xl overflow-hidden bg-[#12131A] border border-white/[0.08] relative shadow-lg`}>
                  {item.video ? (
                    <video
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  )}

                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-medium bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-zinc-300 border border-white/10">
                      {item.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 rounded-full bg-[#FBAF18] text-black flex items-center justify-center">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-baseline justify-between">
                  <h3 className="text-sm sm:text-[15px] font-semibold text-white group-hover:text-[#FBAF18] transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {item.client}
                  </span>
                </div>
                <p className="text-[12px] text-zinc-400 mt-0.5">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 5: CLIENTS (Kinetic Infinite Stream & Interactive Roster)         */}
      {/* ========================================================================= */}
      <section id="clients" className="border-t border-white/[0.06] py-16 sm:py-24 bg-[#08080B] relative overflow-hidden">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono text-[#FBAF18] font-bold">04</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
                  Client Roster
                </span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 ml-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  KINETIC STREAM
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl lg:text-[1.85rem] font-medium text-white tracking-tight">
                Trusted by Category Leaders
              </h2>
              <p className="text-[12px] text-zinc-400 mt-1 max-w-lg">
                18 enterprise accounts across automotive, luxury living, and architecture. Continuous strategic execution.
              </p>
            </div>

            {/* Interactive controls */}
            <div className="flex items-center gap-2 self-start md:self-auto bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-xl">
              {/* View switcher */}
              <div className="flex items-center bg-black/40 rounded-lg p-0.5 border border-white/[0.05]">
                <button
                  type="button"
                  onClick={() => setRosterViewMode('marquee')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    rosterViewMode === 'marquee'
                      ? 'bg-[#FBAF18] text-black font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Kinetic Stream View"
                >
                  <Radio size={12} />
                  <span>Stream</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRosterViewMode('grid')}
                  className={`px-2.5 py-1 text-[11px] font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    rosterViewMode === 'grid'
                      ? 'bg-[#FBAF18] text-black font-semibold shadow-sm'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                  title="Grid View"
                >
                  <LayoutGrid size={12} />
                  <span>Grid</span>
                </button>
              </div>

              {/* Marquee Play/Pause */}
              {rosterViewMode === 'marquee' && (
                <>
                  <button
                    type="button"
                    onClick={() => setMarqueePaused((p) => !p)}
                    className="px-2.5 py-1 text-[11px] rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] text-zinc-300 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                    title={marqueePaused ? 'Resume scroll' : 'Pause scroll'}
                  >
                    {marqueePaused ? <Play size={11} className="text-[#FBAF18]" /> : <Pause size={11} />}
                    <span className="font-mono text-[10px]">{marqueePaused ? 'Play' : 'Pause'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMarqueeSpeed((s) => (s === 'normal' ? 'fast' : 'normal'))}
                    className={`px-2 py-1 text-[10px] font-mono rounded-lg border transition-colors cursor-pointer ${
                      marqueeSpeed === 'fast'
                        ? 'bg-[#FBAF18]/20 border-[#FBAF18]/40 text-[#FBAF18] font-bold'
                        : 'bg-white/[0.04] border-white/[0.06] text-zinc-400 hover:text-white'
                    }`}
                    title="Toggle speed"
                  >
                    {marqueeSpeed === 'fast' ? '1.8x' : '1.0x'}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Animated Stream or Expanded Grid */}
        {rosterViewMode === 'marquee' ? (
          <div className="relative w-full overflow-hidden py-3">
            {/* Left & Right gradient fade masks */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#08080B] via-[#08080B]/90 to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#08080B] via-[#08080B]/90 to-transparent z-20" />

            {/* TRACK 1: Leftward Infinite Stream */}
            <div
              className={`animate-marquee-left flex gap-3.5 mb-3.5 ${
                marqueeSpeed === 'fast' ? 'marquee-fast' : ''
              } ${marqueePaused ? 'animate-marquee-paused' : ''}`}
            >
              {[...clientRosterRow1, ...clientRosterRow1, ...clientRosterRow1].map((client, idx) => (
                <div
                  key={`r1-${client.id}-${idx}`}
                  onMouseEnter={() => setHoveredClient(client.name)}
                  onMouseLeave={() => setHoveredClient(null)}
                  className="group flex-shrink-0 flex items-center gap-3.5 px-4 py-2.5 rounded-xl bg-[#101118]/90 border border-white/[0.07] hover:border-[#FBAF18]/60 hover:bg-[#151724] transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-[#FBAF18]/60 group-hover:bg-[#FBAF18] group-hover:scale-125 transition-transform" />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] sm:text-[13px] font-semibold text-zinc-200 group-hover:text-white tracking-tight whitespace-nowrap">
                        {client.name}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider group-hover:text-[#FBAF18] transition-colors whitespace-nowrap">
                        / {client.sector}
                      </span>
                    </div>
                    <span className="text-[10.5px] text-zinc-400 group-hover:text-zinc-300 truncate max-w-[220px] transition-colors">
                      {client.scope}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* TRACK 2: Rightward Infinite Stream */}
            <div
              className={`animate-marquee-right flex gap-3.5 ${
                marqueeSpeed === 'fast' ? 'marquee-fast' : ''
              } ${marqueePaused ? 'animate-marquee-paused' : ''}`}
            >
              {[...clientRosterRow2, ...clientRosterRow2, ...clientRosterRow2].map((client, idx) => (
                <div
                  key={`r2-${client.id}-${idx}`}
                  onMouseEnter={() => setHoveredClient(client.name)}
                  onMouseLeave={() => setHoveredClient(null)}
                  className="group flex-shrink-0 flex items-center gap-3.5 px-4 py-2.5 rounded-xl bg-[#101118]/90 border border-white/[0.07] hover:border-[#FBAF18]/60 hover:bg-[#151724] transition-all duration-300 cursor-pointer shadow-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-[#FBAF18]/60 group-hover:bg-[#FBAF18] group-hover:scale-125 transition-transform" />
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-[12.5px] sm:text-[13px] font-semibold text-zinc-200 group-hover:text-white tracking-tight whitespace-nowrap">
                        {client.name}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-wider group-hover:text-[#FBAF18] transition-colors whitespace-nowrap">
                        / {client.sector}
                      </span>
                    </div>
                    <span className="text-[10.5px] text-zinc-400 group-hover:text-zinc-300 truncate max-w-[220px] transition-colors">
                      {client.scope}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* EXPANDED GRID VIEW */
          <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {allClients.map((client) => (
                <div
                  key={`grid-${client.id}`}
                  className="p-3.5 rounded-xl bg-[#101118] border border-white/[0.06] hover:border-[#FBAF18]/50 transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[9px] font-mono text-[#FBAF18] uppercase">
                        {client.tag}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 group-hover:bg-[#FBAF18] transition-colors" />
                    </div>
                    <h3 className="text-xs sm:text-[13px] font-semibold text-white group-hover:text-[#FBAF18] transition-colors">
                      {client.name}
                    </h3>
                    <p className="text-[10px] text-zinc-400 mt-1 line-clamp-2">
                      {client.scope}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/[0.04]">
                    <span className="text-[9px] font-mono text-zinc-400 truncate block">
                      {client.sector}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Inspection / Active Indicator Footer */}
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 mt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between py-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.05] text-[11px] text-zinc-400 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[#FBAF18] font-bold">18 Client Brands</span>
              <span className="text-zinc-600">·</span>
              <span>
                {hoveredClient
                  ? `Inspecting: ${hoveredClient} (Hover to pause stream)`
                  : 'Hover over any brand card to pause motion and inspect engagement scope'}
              </span>
            </div>
            <div className="flex items-center gap-4 text-[10.5px] font-mono text-zinc-400">
              <span>Auto · 35s Loop</span>
              <span>Smooth CSS Interpolation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: LEADERSHIP (From Slide 30 - Quiet luxury)                      */}
      {/* ========================================================================= */}
      <section id="leadership" className="border-t border-white/[0.06] py-16 sm:py-24 bg-[#0A0A0E]">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-mono text-[#FBAF18] font-bold">05</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-medium">
              Leadership
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 flex flex-col gap-4">
              <h2 className="text-xl sm:text-2xl font-medium text-white tracking-tight">
                Kamaljeet Singh
              </h2>
              <p className="text-[11px] text-[#FBAF18] font-mono -mt-2">
                Founder & Principal Strategist
              </p>

              <blockquote className="text-sm sm:text-base text-zinc-300 italic border-l-2 border-[#FBAF18] pl-4 py-1 leading-relaxed">
                &ldquo;Driven by creativity, powered by strategy, and focused on results. Building brands that don't just compete—but lead.&rdquo;
              </blockquote>

              <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed max-w-xl">
                Leading Brand Masala with focus on creating bold, strategic marketing solutions that help businesses stand out and achieve measurable, category-defining growth.
              </p>
            </div>

            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#FBAF18]/20 border border-[#FBAF18]/40 flex items-center justify-center font-bold text-[#FBAF18] text-sm">
                  KS
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Brand Masala</div>
                  <div className="text-[11px] text-zinc-500">Consultancy & Growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOOTER (With Original Stacked Logo)                                       */}
      {/* ========================================================================= */}
      <footer className="border-t border-white/[0.08] py-10 bg-[#070709] text-zinc-500 text-xs">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <OriginalBrandMasalaLogo size="small" variant="dark" />
            <span className="text-[11px] text-zinc-500 border-l border-white/10 pl-3">
              A Brand Consultancy Firm
            </span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-zinc-400">
            <a href="#who-we-are" className="hover:text-white transition-colors">Overview</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#work" className="hover:text-white transition-colors">Work</a>
            <button
              type="button"
              onClick={() => setStrategyModalOpen(true)}
              className="text-[#FBAF18] hover:underline cursor-pointer"
            >
              Start a Project
            </button>
          </div>

          <div className="text-[11px] text-zinc-600">
            &copy; {new Date().getFullYear()} Brand Masala.
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* STRATEGY MODAL                                                            */}
      {/* ========================================================================= */}
      {strategyModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setStrategyModalOpen(false)}
        >
          <div
            className="bg-[#111218] border border-white/15 rounded-2xl p-6 sm:p-7 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setStrategyModalOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/[0.06] hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X size={15} />
            </button>

            {formSubmitted ? (
              <div className="py-8 text-center flex flex-col items-center">
                <CheckCircle2 size={28} className="text-[#FBAF18] mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Inquiry Sent</h3>
                <p className="text-zinc-400 text-xs">
                  We will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div>
                <OriginalBrandMasalaLogo size="small" variant="dark" />
                <h3 className="text-base font-semibold text-white mt-3">Book a Strategy Call</h3>
                <p className="text-zinc-400 text-xs mb-4">
                  Tell us about your brand vision for Q1 2026.
                </p>

                <form onSubmit={handleConsultationSubmit} className="flex flex-col gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      className="w-full bg-[#181922] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FBAF18]"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Work Email"
                      className="w-full bg-[#181922] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FBAF18]"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Company / Brand"
                      className="w-full bg-[#181922] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FBAF18]"
                    />
                  </div>

                  <div className="flex flex-wrap gap-1.5 py-1">
                    {['Branding', 'Social Media', 'Web Dev', 'Performance'].map((s) => {
                      const isSel = selectedServices.includes(s);
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => toggleServiceSelection(s)}
                          className={`text-[11px] px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                            isSel
                              ? 'bg-[#FBAF18] text-black border-[#FBAF18] font-semibold'
                              : 'bg-white/[0.04] border-white/10 text-zinc-400 hover:text-white'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    <textarea
                      rows={2}
                      placeholder="Brief goals or timeline..."
                      className="w-full bg-[#181922] border border-white/10 rounded-lg px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FBAF18] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#FBAF18] hover:bg-[#e09c12] text-black font-bold text-xs py-2.5 rounded-full flex items-center justify-center gap-1.5 transition-colors cursor-pointer mt-1"
                  >
                    <span>Submit Inquiry</span>
                    <Send size={12} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
