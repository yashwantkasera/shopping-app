import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { RefreshCw, Delete } from 'lucide-react';

export default function QuickCalculator() {
  const { t } = useTranslation();
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');

  const handleNumber = (n: string) => {
    setDisplay(prev => prev === '0' ? n : prev + n);
  };

  const handleOperator = (op: string) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const fullEq = equation + display;
      // Simple eval for quick calc (safe enough for basic math)
      // In production, use a math parser
      const result = eval(fullEq.replace('×', '*').replace('÷', '/'));
      setDisplay(result.toString());
      setEquation('');
    } catch (e) {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setEquation('');
  };

  const backspace = () => {
    setDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
  };

  const buttons = [
    ['C', '÷', '×', '⌫'],
    ['7', '8', '9', '-'],
    ['4', '5', '6', '+'],
    ['1', '2', '3', '='],
    ['0', '.', '00', '']
  ];

  return (
    <div className="h-full flex flex-col space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white drop-shadow-md">{t('quickTab')}</h2>
        <button 
          onClick={clear}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all active:scale-95"
        >
          <RefreshCw size={20} className="text-white" />
        </button>
      </div>

      <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex-1 flex flex-col justify-end items-end overflow-hidden">
        <div className="text-blue-200/50 text-xl font-medium h-8">{equation}</div>
        <div className="text-white text-6xl font-bold break-all text-right">{display}</div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.flat().map((btn, i) => {
          if (!btn) return <div key={i} />;
          
          const isOperator = ['÷', '×', '-', '+', '='].includes(btn);
          const isAction = ['C', '⌫'].includes(btn);
          
          return (
            <motion.button
              key={i}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (btn === '=') calculate();
                else if (btn === 'C') clear();
                else if (btn === '⌫') backspace();
                else if (isOperator) handleOperator(btn);
                else handleNumber(btn);
              }}
              className={`
                h-16 rounded-2xl text-xl font-bold transition-all shadow-lg
                ${btn === '=' ? 'bg-gold-500 text-blue-900 col-span-1' : ''}
                ${isOperator && btn !== '=' ? 'bg-blue-500/30 text-blue-200 border border-blue-500/30' : ''}
                ${isAction ? 'bg-red-500/30 text-red-200 border border-red-500/30' : ''}
                ${!isOperator && !isAction ? 'bg-white/10 text-white border border-white/10' : ''}
                hover:brightness-125 active:brightness-90
              `}
            >
              {btn === '⌫' ? <Delete className="mx-auto" size={24} /> : btn}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
