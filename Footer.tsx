import { Phone, Mail, MapPin, Clock, ArrowUp, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Tab } from '../types';

interface FooterProps {
  setActiveTab: (tab: Tab) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1f2c1c] text-emerald-100/80 border-t border-emerald-950/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Farm Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🌾</span>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Horeb Animal Farm
                </h2>
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Nyakabirizi, Bushenyi
                </p>
              </div>
            </div>
            <p className="text-sm text-emerald-100/70 leading-relaxed">
              Uganda's model livestock farm specialized in premium Flemish Giant rabbits, Large White pigs, and high-producing ISA Brown layer hens. Promoting agricultural excellence and ethical farming.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="p-2 bg-emerald-900/40 hover:bg-emerald-800 text-amber-400 hover:text-white rounded-lg transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-emerald-900/40 hover:bg-emerald-800 text-amber-400 hover:text-white rounded-lg transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-emerald-900/40 hover:bg-emerald-800 text-amber-400 hover:text-white rounded-lg transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-emerald-900/40 hover:bg-emerald-800 text-amber-400 hover:text-white rounded-lg transition-colors duration-200"
                aria-label="Youtube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-900 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleTabClick('home')}
                  className="hover:text-amber-400 hover:translate-x-1 transition-all duration-200 focus:outline-none"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('gallery')}
                  className="hover:text-amber-400 hover:translate-x-1 transition-all duration-200 focus:outline-none"
                >
                  Livestock Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('about')}
                  className="hover:text-amber-400 hover:translate-x-1 transition-all duration-200 focus:outline-none"
                >
                  Our Story & Milestones
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('services')}
                  className="hover:text-amber-400 hover:translate-x-1 transition-all duration-200 focus:outline-none"
                >
                  Manure & Training Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabClick('contact')}
                  className="hover:text-amber-400 hover:translate-x-1 transition-all duration-200 focus:outline-none"
                >
                  Contact & Book Tour
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-900 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <a href="tel:+256760478737" className="hover:text-white block font-medium">
                    +256 760 478 737
                  </a>
                  <a href="tel:+256757959467" className="hover:text-white block font-medium text-emerald-100/60">
                    +256 757 959 467
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a href="mailto:horebanimalfarm@gmail.com" className="hover:text-white break-all">
                  horebanimalfarm@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-emerald-100/70">
                  400m Off Mbarara-Kasese Road, Nyakabirizi, Bushenyi District, Uganda
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Hours & Back to Top */}
          <div className="space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-900 pb-2">
                Visiting Hours
              </h3>
              <ul className="space-y-2 text-sm mt-3">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Mon - Sat: 8:00 AM - 6:00 PM</span>
                </li>
                <li className="flex items-center gap-2 pl-6 text-emerald-100/60 text-xs">
                  <span>Sunday: By appointment only</span>
                </li>
              </ul>
            </div>
            
            <button
              onClick={scrollToTop}
              className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-amber-400 hover:text-white border border-emerald-800/80 hover:border-amber-400/50 bg-emerald-950/40 hover:bg-emerald-900/60 py-2.5 px-4 rounded-xl transition-all duration-300 w-full focus:outline-none group shadow-inner"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-4.5 h-4.5 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 pt-8 border-t border-emerald-950/50 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-100/50">
          <p>© 2026 Horeb Animal Farm. All rights reserved. Elevating farming knowledge and breeding excellence.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span className="hover:text-amber-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-amber-400 cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
