import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Play, Award, CheckCircle2, Volume2, ShieldCheck, HelpCircle } from 'lucide-react';
import { Tab } from '../types';

interface HomeViewProps {
  setActiveTab: (tab: Tab) => void;
  setPreselectedFarm: (farm: string) => void;
}

export default function HomeView({ setActiveTab, setPreselectedFarm }: HomeViewProps) {
  // Carousel state
  const carouselImages = [
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjP6ybIyTOav295uSvarPBNHKisP2OTdx_VLyU2qI9dA&s=10",
      title: "Flemish Giant Rabbits",
      desc: "Our prized Flemish Giant breeding stock, boasting excellent health, robust genetics, and calm temperaments."
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHl02Ves-ug5hYtplqE50-CEEdOSHjdhWw2Fc6f-EPNA&s=10",
      title: "Large White Pigs",
      desc: "Fast growing, exceptionally fertile, and feed-efficient lines raised in hygienic and comfortable pens."
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVLaWF2ti3pPJppogbiR0OMD228Gkv5kDCHdMvpPBkUQ&s=10",
      title: "ISA Brown Egg Layers",
      desc: "Our high-producing layer birds providing fresh, large, rich golden-yolk eggs daily to the local community."
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQex7W7bLcMEltODy3FnIwQC30bjAEPMF_E06Umc_gi8Q&s=10",
      title: "Sustainable Feeds & Care",
      desc: "Formulated balanced nutrition designed specifically for our animals' optimal growth and welfare."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto rotate carousel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, carouselImages.length]);

  // Web Audio API Synthesizer for animal sounds (outstanding interactive touch!)
  const playAnimalSound = (animal: 'rabbit' | 'hen' | 'pig') => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      const now = ctx.currentTime;
      
      if (animal === 'rabbit') {
        // Soft double thumping sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(80, now);
        osc.frequency.exponentialRampToValueAtTime(10, now + 0.15);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        
        osc.start(now);
        osc.stop(now + 0.15);
        
        // Second thump
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(80, now + 0.2);
        osc2.frequency.exponentialRampToValueAtTime(10, now + 0.35);
        gain2.gain.setValueAtTime(0.5, now + 0.2);
        gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        
        osc2.start(now + 0.2);
        osc2.stop(now + 0.35);
        
      } else if (animal === 'hen') {
        // Clucking sounds (quick frequency pitch modulations)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(350, now);
        osc.frequency.linearRampToValueAtTime(550, now + 0.05);
        osc.frequency.linearRampToValueAtTime(250, now + 0.15);
        
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        
        osc.start(now);
        osc.stop(now + 0.15);
        
        // Repeat clucks
        const delayTimes = [0.12, 0.24];
        delayTimes.forEach((delay, idx) => {
          const oscSeq = ctx.createOscillator();
          const gainSeq = ctx.createGain();
          oscSeq.connect(gainSeq);
          gainSeq.connect(ctx.destination);
          oscSeq.type = 'triangle';
          oscSeq.frequency.setValueAtTime(320 + idx * 30, now + delay);
          oscSeq.frequency.linearRampToValueAtTime(500, now + delay + 0.04);
          oscSeq.frequency.linearRampToValueAtTime(220, now + delay + 0.1);
          gainSeq.gain.setValueAtTime(0.25, now + delay);
          gainSeq.gain.exponentialRampToValueAtTime(0.01, now + delay + 0.1);
          
          oscSeq.start(now + delay);
          oscSeq.stop(now + delay + 0.1);
        });
        
      } else if (animal === 'pig') {
        // Low grunt / snort sound using noise and saw wave
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(120, now);
        osc.frequency.exponentialRampToValueAtTime(45, now + 0.25);
        
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        
        osc.start(now);
        osc.stop(now + 0.25);
        
        // Second low grunt
        const oscPig2 = ctx.createOscillator();
        const gainPig2 = ctx.createGain();
        oscPig2.connect(gainPig2);
        gainPig2.connect(ctx.destination);
        oscPig2.type = 'sawtooth';
        oscPig2.frequency.setValueAtTime(110, now + 0.2);
        oscPig2.frequency.exponentialRampToValueAtTime(40, now + 0.45);
        gainPig2.gain.setValueAtTime(0.3, now + 0.2);
        gainPig2.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
        
        oscPig2.start(now + 0.2);
        oscPig2.stop(now + 0.45);
      }
    } catch (e) {
      console.warn("Audio Context is blocked or not supported on this browser context yet.");
    }
  };

  const handleFarmCardClick = (farmId: string) => {
    setPreselectedFarm(farmId);
    setActiveTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Soundboard state
  const [activeFact, setActiveFact] = useState<string | null>('rabbit');

  const funFacts = {
    rabbit: {
      title: "Flemish Giant Rabbits",
      soundName: "Play Soft Foot Thump",
      text: "The largest rabbit breed in the world! They can grow up to 8kg+ (size of a small dog) and have an incredibly calm, docile demeanor. Rabbits express pure joy by doing high-speed mid-air twists, a happy dance known as a 'binky'!",
      stat: "🐇 Max weight: 10kg"
    },
    hen: {
      title: "ISA Brown Layer Birds",
      soundName: "Play Clucking Sound",
      text: "Renowned globally for their supreme egg laying capabilities. Our ISA Browns are highly adaptable, stress-resistant, and can produce over 300 rich, brown, hard-shelled eggs in their first productive year with balanced nutrients.",
      stat: "🥚 ~300 Eggs/Year"
    },
    pig: {
      title: "Large White Pigs",
      soundName: "Play Low Grunt",
      text: "Famous for their outstanding fertility, premium lean meat yields, and excellent maternal instincts. They have large upright ears, robust health, and grow exceptionally fast when provided with balanced feed rations.",
      stat: "🐖 Fast Growth Rate"
    }
  };

  const farmCards = [
    {
      id: 'rabbit',
      name: "Flemish Giant Rabbits",
      desc: "World's largest rabbit breed. Docile, healthy, and premium genetic strains optimized for breeding and livestock foundation.",
      icon: "🐇",
      badge: "Highly Popular",
      color: "from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5",
      border: "border-amber-500/30 dark:border-amber-500/20"
    },
    {
      id: 'poultry',
      name: "Layer Poultry birds",
      desc: "Premium ISA Brown and Bovans Brown layers. Excellent egg laying frequency, healthy development, and full disease immunizations.",
      icon: "🐔",
      badge: "Constant Demand",
      color: "from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5",
      border: "border-emerald-500/30 dark:border-emerald-500/20"
    },
    {
      id: 'pig',
      name: "Large White Pigs",
      desc: "Superior growth rates, premium high-fertility maternal lines, and well-managed feed-to-weight conversions.",
      icon: "🐖",
      badge: "High Profitability",
      color: "from-pink-500/10 to-rose-500/10 dark:from-pink-500/5 dark:to-rose-500/5",
      border: "border-pink-500/30 dark:border-pink-500/20"
    },
    {
      id: 'vet',
      name: "Veterinary Team",
      desc: "On-site diagnostic care, disease protection plans, and full artificial insemination services managed by Dr. Ebenezar Mukwano.",
      icon: "🩺",
      badge: "Specialist Support",
      color: "from-blue-500/10 to-sky-500/10 dark:from-blue-500/5 dark:to-sky-500/5",
      border: "border-blue-500/30 dark:border-blue-500/20"
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-emerald-50/20 to-amber-100/40 dark:from-[#0d110b] dark:via-[#161a12]/30 dark:to-[#1a2015] pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-amber-200/10 dark:border-emerald-950/10">
        <div className="absolute inset-0 bg-radial-at-t from-emerald-700/5 via-transparent to-transparent opacity-70" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-800/10 dark:bg-emerald-400/10 border border-emerald-800/20 dark:border-emerald-400/20 text-emerald-900 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Nyakabirizi's Premier Livestock Model</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-950 dark:text-amber-50 leading-[1.1] tracking-tight">
                Pure Breeding Heritage from <span className="text-emerald-800 dark:text-emerald-400 underline decoration-wavy decoration-amber-600 dark:decoration-amber-500 decoration-2 underline-offset-4">Bushenyi</span>
              </h1>
              <p className="text-base sm:text-lg text-amber-950/70 dark:text-amber-100/60 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Welcome to Horeb Animal Farm, Western Uganda's ultimate hub for elite genetics. We specialize in Flemish Giant rabbits, ISA Brown egg layers, Large White pigs, and expert veterinary guidance to guarantee your farm's success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                <button
                  id="heroCtaPrimary"
                  onClick={() => setActiveTab('contact')}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-800 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-amber-50 font-bold px-8 py-4 rounded-2xl shadow-lg shadow-emerald-900/10 hover:shadow-xl hover:shadow-emerald-900/20 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none"
                >
                  <span>Plan Your Visit</span>
                  <ArrowRight className="w-5 h-5 text-amber-100" />
                </button>
                <button
                  id="heroCtaSecondary"
                  onClick={() => setActiveTab('services')}
                  className="flex items-center justify-center gap-2 bg-white hover:bg-amber-50/80 dark:bg-emerald-950/25 dark:hover:bg-emerald-950/55 text-amber-950 dark:text-amber-100 font-bold px-8 py-4 rounded-2xl border border-amber-200 dark:border-emerald-950 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none"
                >
                  <span>Our Custom Services</span>
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 max-w-md mx-auto lg:mx-0">
                <div className="p-4 bg-white/40 dark:bg-[#1a2016]/40 rounded-2xl border border-amber-200/20 dark:border-emerald-950/25 backdrop-blur-sm text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">18+</div>
                  <div className="text-xs font-semibold text-amber-950/60 dark:text-amber-100/40 uppercase tracking-wider mt-0.5">Years Stable</div>
                </div>
                <div className="p-4 bg-white/40 dark:bg-[#1a2016]/40 rounded-2xl border border-amber-200/20 dark:border-emerald-950/25 backdrop-blur-sm text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-amber-700 dark:text-amber-500">300+</div>
                  <div className="text-xs font-semibold text-amber-950/60 dark:text-amber-100/40 uppercase tracking-wider mt-0.5">Live Stock</div>
                </div>
                <div className="p-4 bg-white/40 dark:bg-[#1a2016]/40 rounded-2xl border border-amber-200/20 dark:border-emerald-950/25 backdrop-blur-sm text-center lg:text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 dark:text-emerald-400">500+</div>
                  <div className="text-xs font-semibold text-amber-950/60 dark:text-amber-100/40 uppercase tracking-wider mt-0.5">Farmers Served</div>
                </div>
              </div>
            </div>

            {/* Hero Image / Scenic Placeholder */}
            <div className="lg:col-span-5 relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-800 to-amber-700 rounded-[2.5rem] blur opacity-25" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white dark:border-[#1a2016] bg-emerald-900/10">
                <img
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800"
                  alt="Horeb Farm scenery"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">Horeb Scenery</p>
                    <h3 className="text-lg font-bold">Nyakabirizi Farm Compound</h3>
                    <p className="text-xs text-white/70">A clean, bio-secure layout ensuring healthy animal development</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Specialized Farms (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-100 dark:bg-emerald-950/40 text-amber-800 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Explore Our Specializations
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-950 dark:text-amber-50">
            Our Premium Farm Sections
          </h2>
          <p className="text-sm sm:text-base text-amber-950/60 dark:text-amber-100/50">
            Click any section below to express interest. We'll automatically prepare your inquiry form details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {farmCards.map((card) => (
            <motion.button
              key={card.id}
              onClick={() => handleFarmCardClick(card.id)}
              className={`p-6 text-left rounded-3xl border ${card.border} bg-gradient-to-br ${card.color} flex flex-col justify-between hover:shadow-xl hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 focus:outline-none relative overflow-hidden group h-full`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 dark:bg-white/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500" />
              
              <div className="space-y-4 relative z-10">
                <div className="text-4xl">{card.icon}</div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                    {card.badge}
                  </span>
                  <h3 className="text-xl font-bold text-amber-950 dark:text-amber-50 mt-1">
                    {card.name}
                  </h3>
                </div>
                <p className="text-xs text-amber-950/60 dark:text-amber-100/50 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-400 group-hover:gap-2.5 transition-all duration-200 pt-4 border-t border-amber-900/5 dark:border-white/5 w-full">
                <span>Inquire details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* 3. Dynamic Carousel Section */}
      <section className="bg-amber-100/20 dark:bg-[#161a12]/30 py-12 border-y border-amber-200/10 dark:border-emerald-950/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Carousel Content Left */}
            <div className="lg:col-span-4 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
                Visual Highlight
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 dark:text-amber-50 leading-tight">
                Our Animals in Active Motion
              </h2>
              <p className="text-xs sm:text-sm text-amber-950/60 dark:text-amber-100/50 leading-relaxed font-medium">
                Take a glance at some of our actual breeding stock photographed directly in their natural habitats here in Bushenyi. We prioritize bio-safety, ventilation, and strict feed hygiene.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <button
                  id="playPauseCarousel"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                    isPlaying
                      ? 'bg-emerald-800/10 dark:bg-emerald-400/10 text-emerald-900 dark:text-emerald-400'
                      : 'bg-amber-700/10 text-amber-800'
                  }`}
                >
                  <Play className={`w-3.5 h-3.5 ${isPlaying ? 'animate-pulse' : ''}`} />
                  <span>{isPlaying ? 'Auto Rotating' : 'Slide Paused'}</span>
                </button>
              </div>
            </div>

            {/* Slide Right */}
            <div className="lg:col-span-8 relative">
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg bg-emerald-950/10 border border-amber-200/10 dark:border-emerald-950/10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={carouselImages[currentIndex].url}
                      alt={carouselImages[currentIndex].title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/30 to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                      <h3 className="text-lg sm:text-2xl font-extrabold text-amber-400">
                        {carouselImages[currentIndex].title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/80 max-w-xl mt-1 leading-relaxed">
                        {carouselImages[currentIndex].desc}
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Dot selectors */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/45 backdrop-blur-sm px-3 py-1.5 rounded-full z-10">
                  {carouselImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsPlaying(false);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentIndex ? 'bg-amber-400 scale-125' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Soundboard & Fun Facts (Outstanding element) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-800/10 to-amber-700/5 dark:from-[#131b10] dark:to-[#1a1711] border border-emerald-800/20 dark:border-emerald-950/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left intro */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/30 px-3 py-1 rounded-full">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Audio Soundboard & Facts</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-950 dark:text-amber-50">
                Interactive Animal Corner
              </h2>
              <p className="text-xs sm:text-sm text-amber-950/60 dark:text-amber-100/50 leading-relaxed font-medium">
                Discover awesome educational facts about our farm. Tap any animal icon on the right to trigger synthesized sounds generated directly by your browser's audio nodes!
              </p>
              <div className="p-4 bg-white/50 dark:bg-emerald-950/20 border border-amber-200/20 dark:border-emerald-950/20 rounded-2xl flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-emerald-800 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-amber-950 dark:text-amber-200">Browser Audio Activated</h4>
                  <p className="text-[11px] text-amber-950/60 dark:text-amber-100/40">These clean, organic digital tones simulate thumps, clucks, and grunts safely using the Web Audio API.</p>
                </div>
              </div>
            </div>

            {/* Right Interactive Selection */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex justify-center sm:justify-start gap-2 border-b border-amber-900/10 dark:border-white/10 pb-2">
                {(['rabbit', 'hen', 'pig'] as const).map((animal) => (
                  <button
                    key={animal}
                    onClick={() => {
                      setActiveFact(animal);
                      playAnimalSound(animal);
                    }}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer focus:outline-none ${
                      activeFact === animal
                        ? 'bg-emerald-800 text-amber-50 shadow-md'
                        : 'bg-white/60 dark:bg-[#1a2016]/40 hover:bg-white dark:hover:bg-[#1a2016]/80 text-amber-950 dark:text-amber-200'
                    }`}
                  >
                    <span>{animal === 'rabbit' ? '🐇 Rabbits' : animal === 'hen' ? '🐔 Layers' : '🐖 Pigs'}</span>
                    <Volume2 className="w-3.5 h-3.5 opacity-60" />
                  </button>
                ))}
              </div>

              {/* Fact Card Display */}
              <AnimatePresence mode="wait">
                {activeFact && (
                  <motion.div
                    key={activeFact}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="p-5 sm:p-6 bg-white dark:bg-[#1c2217] rounded-2xl border border-amber-200/25 dark:border-emerald-950/25 shadow-sm space-y-4"
                  >
                    <div className="flex justify-between items-center flex-wrap gap-2">
                      <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400">
                        {funFacts[activeFact as keyof typeof funFacts].title}
                      </h3>
                      <span className="px-3 py-1 bg-amber-100/60 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 text-xs font-bold rounded-lg">
                        {funFacts[activeFact as keyof typeof funFacts].stat}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-amber-950/70 dark:text-amber-100/60 leading-relaxed font-medium">
                      {funFacts[activeFact as keyof typeof funFacts].text}
                    </p>

                    <button
                      onClick={() => playAnimalSound(activeFact as any)}
                      className="flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 bg-amber-50 dark:bg-amber-950/10 px-3 py-2 rounded-lg"
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{funFacts[activeFact as keyof typeof funFacts].soundName}</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Trust Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-[#1a2016]/40 rounded-3xl border border-amber-200/10 dark:border-emerald-950/20 text-center md:text-left space-y-3">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-700 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-amber-950 dark:text-amber-50">Proven Genetics</h3>
            <p className="text-xs text-amber-950/60 dark:text-amber-100/50 leading-relaxed">
              We import and select premium bloodlines, helping local farmers avoid stunted growth rates and lay-frequency collapses.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#1a2016]/40 rounded-3xl border border-amber-200/10 dark:border-emerald-950/20 text-center md:text-left space-y-3">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-amber-950 dark:text-amber-50">Strict Bio-Security</h3>
            <p className="text-xs text-amber-950/60 dark:text-amber-100/50 leading-relaxed">
              Our farm complies with premium veterinary checkups. Visitors are sanitized and guided professionally to protect livestock safety.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-[#1a2016]/40 rounded-3xl border border-amber-200/10 dark:border-emerald-950/20 text-center md:text-left space-y-3">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-800 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-amber-950 dark:text-amber-50">Ongoing Mentorship</h3>
            <p className="text-xs text-amber-950/60 dark:text-amber-100/50 leading-relaxed">
              We do not just sell animals. We provide continuous chat assistance, diagnostic guides, and housing construction support.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
