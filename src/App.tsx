/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  Divide, 
  ListTodo, 
  Scale, 
  Target, 
  Settings,
  Moon,
  Sun,
  Languages,
  RotateCcw
} from 'lucide-react';
import './i18n';
import { AppProvider, useApp } from './context/AppContext';

// Screens
import MainCalculator from './screens/MainCalculator';
import QuickCalculator from './screens/QuickCalculator';
import TotalItems from './screens/TotalItems';
import Comparison from './screens/Comparison';
import SoloCalc from './screens/SoloCalc';

function AppContent() {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, language, setLanguage } = useApp();
  const [activeTab, setActiveTab] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  const tabs = [
    { id: 0, label: t('mainTab'), icon: Calculator, component: MainCalculator },
    { id: 1, label: t('quickTab'), icon: Divide, component: QuickCalculator },
    { id: 2, label: t('totalTab'), icon: ListTodo, component: TotalItems },
    { id: 3, label: t('compareTab'), icon: Scale, component: Comparison },
    { id: 4, label: t('soloTab'), icon: Target, component: SoloCalc },
  ];

  const handleResetAll = () => {
    if (window.confirm(t('resetAll') + '?')) {
      window.location.reload();
    }
  };

  const toggleLanguage = () => {
    const langs: ('en' | 'hi' | 'es' | 'fr')[] = ['en', 'hi', 'es', 'fr'];
    const currentIndex = langs.indexOf(language);
    const nextIndex = (currentIndex + 1) % langs.length;
    const newLang = langs[nextIndex];
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  const ActiveComponent = tabs[activeTab].component;

  return (
    <div className={`min-h-screen transition-colors duration-500 bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 text-white overflow-hidden flex flex-col`}>
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 left-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 pt-8 pb-4 flex justify-between items-center backdrop-blur-sm">
        <div>
          <h1 className="text-3xl font-black tracking-tighter bg-gradient-to-r from-white via-gold-200 to-gold-400 bg-clip-text text-transparent drop-shadow-lg">
            {t('appName')}
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gold-400/60">Professional Edition</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={toggleLanguage}
            className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all active:scale-90 border border-white/10"
          >
            <Languages size={20} className="text-gold-400" />
          </button>
          <button 
            onClick={handleResetAll}
            className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all active:scale-90 border border-white/10"
          >
            <RotateCcw size={20} className="text-red-400" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 px-6 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
          >
            {ActiveComponent && <ActiveComponent />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="relative z-20 px-4 pb-6 pt-2">
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-2 flex justify-between items-center shadow-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  relative flex flex-col items-center justify-center py-3 px-4 rounded-3xl transition-all duration-300
                  ${isActive ? 'bg-gold-500 text-blue-900 scale-110 shadow-lg shadow-gold-500/30' : 'text-white/40 hover:text-white/60'}
                `}
              >
                <Icon size={24} strokeWidth={isActive ? 3 : 2} />
                {isActive && (
                  <motion.span 
                    layoutId="tabLabel"
                    className="text-[10px] font-black uppercase mt-1 tracking-tighter"
                  >
                    {tab.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 0px;
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}} />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
