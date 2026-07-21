import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Eye, ShieldCheck, Heart, ArrowRight, UserCheck, CalendarDays, Award } from 'lucide-react';
import { TimelineItem, TeamMember } from '../types';

export default function AboutView() {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);

  const timelineItems: TimelineItem[] = [
    {
      year: '2008',
      title: 'Humble Farm Foundation',
      description: 'Horeb Animal Farm is established with a small flock of 100 layer poultry birds in Nyakabirizi, Bushenyi.',
      icon: '🐣',
      details: 'Founded by the Musoke family, the early operations focused entirely on providing premium farm-fresh eggs to local schools and households in Western Uganda, establishing a reputation for hygiene and promptness.'
    },
    {
      year: '2015',
      title: 'Poultry Expansion',
      description: 'Expanded chicken cages, upgraded feeding infrastructure, and increased layer bird capacity significantly.',
      icon: '🐔',
      details: 'Due to soaring demand, a second large-scale poultry shelter was built, bringing in ISA Brown breeds and introducing highly automated vaccine schedules.'
    },
    {
      year: '2018',
      title: 'Pig Unit Launch',
      description: 'Introduced Large White pigs to expand biological diversity and soil fertilization.',
      icon: '🐖',
      details: 'Purchased prime parental breeding stock. The unit integrated bio-digestion and became a key supply line for elite piglets for regional farmers.'
    },
    {
      year: '2019',
      title: 'Strategic Pandemic Focus',
      description: 'Shifted focus on pork production and structural study to navigate global logistics freezes.',
      icon: '🧪',
      details: 'With movement curbs, the family focused intensively on local feed formulations, breeding protocols, and optimizing veterinary guidelines on-site.'
    },
    {
      year: '2021',
      title: 'Full Section Restoration',
      description: 'Re-activated all sections in full phase, expanding agricultural advisory and hands-on farm tours.',
      icon: '🌾',
      details: 'Upgraded bio-security protocols and established formalized study visits for high school students and young graduate farmers.'
    },
    {
      year: '2025',
      title: 'Flemish Giant Rabbits',
      description: 'Introduced world-class Flemish Giant rabbits to revolutionize micro-livestock farming.',
      icon: '🐇',
      details: 'Imported specialized large-ear giant rabbits, aiming to build a high-yielding meat and companion rabbit hub to serve Western Uganda.'
    },
    {
      year: '2026',
      title: 'Commercial Rabbit Hub',
      description: 'Currently expanding rabbit cages and bulk breeding facilities to meet extreme local demand.',
      icon: '✨',
      details: 'Building customized cages with computerized drip drinkers, optimizing feeding schedules, and establishing a regional giant rabbit network.'
    }
  ];

  const team: TeamMember[] = [
    {
      name: 'Pr Peter Musoke',
      role: 'Founder & Senior Manager',
      description: 'With over 20 years of hands-on experience in livestock farm planning and operations management. Leading Horeb with vision, faith, and ethical determination.',
      icon: '💼'
    },
    {
      name: 'Dr Ebenezar Mukwano',
      role: 'Resident Veterinarian Specialist',
      description: 'Expert in clinical medicine, vaccine programs, artificial insemination, and pedigree rabbit care. On call 24/7 to ensure bio-safety across all sections.',
      icon: '🩺'
    },
    {
      name: 'Marion Musoke',
      role: 'Co-Founder & Operations Lead',
      description: 'Supervises daily operations, custom feed recipes, and coordinate study visits for school students and agribusiness partners.',
      icon: '🌾'
    }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Header */}
      <section className="bg-gradient-to-br from-emerald-800 to-emerald-950 text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-at-b from-amber-500/20 via-transparent to-transparent opacity-80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 max-w-3xl mx-auto"
          >
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-emerald-900/60 px-4 py-1.5 rounded-full border border-emerald-800">
              Our Legacy Since 2008
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Growing with Purpose, Farming with Heart
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/80 max-w-2xl mx-auto leading-relaxed">
              We started with just 100 layer hens. Today, we are Nyakabirizi's model agricultural center — committed to quality livestock, eco-safety, and community prosperity.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 max-w-xl mx-auto">
              <div className="p-4 bg-emerald-900/40 rounded-2xl border border-emerald-800">
                <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400">2008</span>
                <span className="text-xs text-emerald-200/80 uppercase font-semibold">Established</span>
              </div>
              <div className="p-4 bg-emerald-900/40 rounded-2xl border border-emerald-800">
                <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400">300+</span>
                <span className="text-xs text-emerald-200/80 uppercase font-semibold">Active Animals</span>
              </div>
              <div className="p-4 bg-emerald-900/40 rounded-2xl border border-emerald-800 col-span-2 sm:col-span-1">
                <span className="block text-2xl sm:text-3xl font-extrabold text-amber-400">100%</span>
                <span className="text-xs text-emerald-200/80 uppercase font-semibold">Bio-Secure</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Detailed Story Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400">
              The Journey
            </span>
            <h2 className="text-3xl font-extrabold text-amber-950 dark:text-amber-50">
              From Humble Beginnings to Regional Impact
            </h2>
            <p className="text-xs sm:text-sm text-amber-950/70 dark:text-amber-100/60 leading-relaxed font-medium">
              Horeb Animal Farm was founded on the gentle hills of Nyakabirizi, Bushenyi District, with a clear conviction: that ethical, scientific, and sustainable farming is the key to local empowerment.
            </p>
            <p className="text-xs sm:text-sm text-amber-950/70 dark:text-amber-100/60 leading-relaxed font-medium">
              Over the last 18 years, we have diligently tested feed combinations, selected top-performing genetics, and optimized sanitary systems. Our layer birds, Large White pigs, and Flemish Giant rabbits are proof of this rigorous focus.
            </p>
            <p className="text-xs sm:text-sm text-amber-950/70 dark:text-amber-100/60 leading-relaxed font-medium">
              Today, Horeb is not just a livestock supplier; it is a lively training and advisory base where students, smallholders, and urban investors learn structural cage design, waste bio-recycling, and medical precautions.
            </p>
            <div className="pt-2">
              <div className="border-l-4 border-amber-700 pl-4 py-1 italic font-semibold text-amber-900 dark:text-amber-400">
                "We don't just multiply livestock; we elevate farming standards."
              </div>
              <div className="text-xs font-bold text-amber-950/60 dark:text-amber-100/40 mt-1 pl-4">
                — The Musoke Family
              </div>
            </div>
          </div>

          {/* Styled Double Image Bento */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4">
            <div className="col-span-8 rounded-3xl overflow-hidden aspect-[4/3] shadow-md bg-emerald-900/10 border border-amber-200/10">
              <img
                src="https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=800"
                alt="Flemish rabbit"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="col-span-4 rounded-3xl overflow-hidden aspect-square self-end shadow-md bg-pink-900/10 border border-amber-200/10">
              <img
                src="https://images.unsplash.com/photo-1604848698030-c434ba08eca1?auto=format&fit=crop&q=80&w=600"
                alt="Piglet"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="col-span-12 rounded-3xl overflow-hidden aspect-[16/7] shadow-md bg-teal-900/10 border border-amber-200/10">
              <img
                src="https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=1200"
                alt="Poultry hens"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Mission, Vision & Values Bento */}
      <section className="bg-amber-100/20 dark:bg-[#161a12]/30 py-12 border-y border-amber-200/10 dark:border-emerald-950/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mission */}
            <div className="p-6 bg-white dark:bg-[#1a2016]/40 rounded-3xl border border-amber-200/10 dark:border-emerald-950/20 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-800/10 dark:bg-emerald-400/10 text-emerald-900 dark:text-emerald-400 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-amber-950 dark:text-amber-50">Our Mission</h3>
              <p className="text-xs sm:text-sm text-amber-950/60 dark:text-amber-100/50 leading-relaxed font-medium">
                To provide prime, ethically raised breeding stocks, coupled with affordable advisory services, that boost the output of rural and urban smallholders alike.
              </p>
            </div>

            {/* Vision */}
            <div className="p-6 bg-white dark:bg-[#1a2016]/40 rounded-3xl border border-amber-200/10 dark:border-emerald-950/20 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-700/10 text-amber-700 flex items-center justify-center">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-amber-950 dark:text-amber-50">Our Vision</h3>
              <p className="text-xs sm:text-sm text-amber-950/60 dark:text-amber-100/50 leading-relaxed font-medium">
                To build Bushenyi into Western Uganda's primary base for giant rabbits and premium breeding models, establishing Horeb as a household name for purity and transparency.
              </p>
            </div>

            {/* Core Values */}
            <div className="p-6 bg-white dark:bg-[#1a2016]/40 rounded-3xl border border-amber-200/10 dark:border-emerald-950/20 shadow-sm space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-800/10 dark:bg-emerald-400/10 text-emerald-900 dark:text-emerald-400 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-amber-950 dark:text-amber-50">Core Values</h3>
              <ul className="text-xs sm:text-sm text-amber-950/60 dark:text-amber-100/50 space-y-2 font-medium">
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" />
                  <span>Absolute genetic transparency</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" />
                  <span>Uncompromising animal welfare</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" />
                  <span>Eco-conscious manure re-cycling</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-800 dark:text-emerald-400" />
                  <span>Empowerment of youth and students</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Timeline Section (Expandable Milestones) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/30 px-3 py-1 rounded-full">
            Historical Milestones
          </span>
          <h2 className="text-3xl font-extrabold text-amber-950 dark:text-amber-50">
            The Horeb Timeline Journey
          </h2>
          <p className="text-xs sm:text-sm text-amber-950/60 dark:text-amber-100/50">
            Click any milestone year below to reveal full detailed background logs.
          </p>
        </div>

        {/* Milestone Container */}
        <div className="relative border-l-2 border-emerald-800/30 dark:border-emerald-500/20 pl-6 sm:pl-8 ml-4 sm:ml-6 space-y-8">
          {timelineItems.map((item, idx) => (
            <div key={item.year} className="relative group">
              {/* Dot Indicator */}
              <div
                className={`absolute -left-[35px] sm:-left-[43px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                  selectedMilestone === idx
                    ? 'bg-amber-700 border-amber-600 scale-125 shadow-md shadow-amber-900/20'
                    : 'bg-white dark:bg-[#121610] border-emerald-800/40 dark:border-emerald-500/30'
                }`}
              >
                <span className="text-[10px]">{item.icon}</span>
              </div>

              {/* Milestone Details Block */}
              <div
                onClick={() => setSelectedMilestone(selectedMilestone === idx ? null : idx)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left ${
                  selectedMilestone === idx
                    ? 'bg-white dark:bg-[#1a2016]/80 border-amber-700/50 shadow-md shadow-amber-900/5'
                    : 'bg-white/40 dark:bg-[#1a2016]/20 border-amber-200/10 hover:bg-white dark:hover:bg-[#1a2016]/40 hover:border-amber-200/35'
                }`}
              >
                <div className="flex justify-between items-start flex-wrap gap-2">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-emerald-800/10 dark:bg-emerald-400/10 border border-emerald-800/20 dark:border-emerald-400/20 rounded text-emerald-800 dark:text-emerald-400 text-xs font-bold">
                      {item.year}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-amber-950 dark:text-amber-50 mt-1">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs text-amber-700 font-semibold uppercase tracking-widest bg-amber-50 dark:bg-amber-950/10 px-2 py-1 rounded">
                    {selectedMilestone === idx ? 'Close log' : 'Read details'}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-amber-950/60 dark:text-amber-100/50 mt-2 font-medium">
                  {item.description}
                </p>

                {/* Animated Log Expansion */}
                <AnimatePresence>
                  {selectedMilestone === idx && item.details && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-amber-950/70 dark:text-amber-100/60 leading-relaxed font-medium mt-4 pt-4 border-t border-amber-900/5 dark:border-white/5 italic">
                        {item.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Meet the Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/30 px-3 py-1 rounded-full">
            The Experts
          </span>
          <h2 className="text-3xl font-extrabold text-amber-950 dark:text-amber-50">
            The Heart Behind Horeb Farm
          </h2>
          <p className="text-xs sm:text-sm text-amber-950/60 dark:text-amber-100/50">
            Dedicated breeders, medical specialists, and administrative caretakers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className="p-6 bg-white dark:bg-[#1a2016]/40 rounded-3xl border border-amber-200/10 dark:border-emerald-950/20 shadow-sm flex flex-col items-center text-center space-y-4 group hover:shadow-md transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-800/10 to-amber-700/10 rounded-full flex items-center justify-center text-3xl shadow-inner group-hover:scale-105 transition-transform duration-300">
                <span>{member.icon}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-950 dark:text-amber-50 group-hover:text-emerald-800 dark:group-hover:text-emerald-400 transition-colors">
                  {member.name}
                </h3>
                <span className="inline-block px-3 py-0.5 bg-amber-100 dark:bg-amber-950/30 text-amber-800 dark:text-amber-400 text-[10px] font-extrabold uppercase tracking-widest rounded-full mt-1">
                  {member.role}
                </span>
              </div>
              <p className="text-xs text-amber-950/60 dark:text-amber-100/50 leading-relaxed font-medium">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
