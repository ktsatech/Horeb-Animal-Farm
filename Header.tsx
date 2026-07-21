import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon, Menu, X, Calendar, MapPin } from 'lucide-react';
import { Tab } from '../types';

interface HeaderProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Header({ activeTab, setActiveTab, darkMode, setDarkMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { id: Tab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="mainHeader"
      className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${
        isScrolled
          ? 'bg-amber-50/90 dark:bg-[#121610]/95 shadow-md border-b border-amber-200/20 dark:border-emerald-950/20 py-2'
          : 'bg-amber-50/95 dark:bg-[#121610]/95 border-b border-amber-200/10 dark:border-emerald-950/10 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group"
            id="logoButton"
          >
            <div className="p-2.5 bg-emerald-700 text-amber-50 rounded-2xl group-hover:scale-105 transition-transform duration-300 shadow-sm shadow-emerald-900/10">
              <span className="text-2xl font-bold">🌾</span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-800 via-amber-700 to-emerald-600 dark:from-emerald-400 dark:via-amber-400 dark:to-emerald-300 bg-clip-text text-transparent">
                Horeb Animal Farm
              </h1>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-amber-800/80 dark:text-amber-400/80">
                <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                <span>Nyakabirizi, Bushenyi • Uganda</span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => handleTabClick(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 relative focus:outline-none ${
                  activeTab === item.id
                    ? 'text-emerald-900 dark:text-amber-100'
                    : 'text-amber-900/70 dark:text-amber-200/60 hover:text-emerald-800 dark:hover:text-amber-200'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                {activeTab === item.id && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-emerald-800/10 dark:bg-amber-400/10 border border-emerald-800/20 dark:border-amber-400/20 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              id="themeToggleButton"
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-amber-200/60 dark:border-emerald-950/60 bg-amber-100/40 dark:bg-[#1a2016]/40 text-amber-900 dark:text-amber-200 hover:scale-105 transition-all duration-200 cursor-pointer focus:outline-none shadow-sm"
              aria-label="Toggle dark mode"
            >
              <AnimatePresence mode="wait" initial={false}>
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Sun className="w-5 h-5 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Moon className="w-5 h-5 text-emerald-950" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* CTA Button */}
            <button
              id="headerCtaButton"
              onClick={() => handleTabClick('contact')}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-amber-50 font-bold px-5 py-2.5 rounded-full text-sm shadow-md shadow-amber-900/10 hover:shadow-lg hover:shadow-amber-900/20 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none"
            >
              <Calendar className="w-4 h-4 text-amber-100" />
              <span>Book a Visit</span>
            </button>
          </div>

          {/* Mobile Hamburg & Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="themeToggleButtonMobile"
              onClick={toggleTheme}
              className="p-2 rounded-full border border-amber-200/40 dark:border-emerald-950/40 bg-amber-100/40 dark:bg-[#1a2016]/40 text-amber-900 dark:text-amber-200 focus:outline-none"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-emerald-950" />}
            </button>

            <button
              id="mobileMenuToggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full border border-amber-200/40 dark:border-emerald-950/40 bg-amber-100/40 dark:bg-[#1a2016]/40 text-amber-900 dark:text-amber-200 focus:outline-none hover:bg-amber-100/60"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobileMenuDrawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-amber-50/98 dark:bg-[#121610]/98 border-t border-amber-200/20 dark:border-emerald-950/20"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 flex flex-col items-stretch">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleTabClick(item.id)}
                  className={`px-4 py-3 rounded-2xl text-base font-bold text-left transition-all duration-200 focus:outline-none ${
                    activeTab === item.id
                      ? 'bg-emerald-800 text-amber-50'
                      : 'text-amber-950/70 dark:text-amber-200/70 hover:bg-amber-100/50 dark:hover:bg-[#1d2419]/50 hover:text-emerald-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-3 border-t border-amber-200/20 dark:border-emerald-950/20">
                <button
                  id="mobileCtaButton"
                  onClick={() => handleTabClick('contact')}
                  className="w-full flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-600 text-amber-50 font-bold px-5 py-3 rounded-2xl shadow-md"
                >
                  <Calendar className="w-4 h-4 text-amber-100" />
                  <span>Book a Visit</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
