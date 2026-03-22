import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Decimal } from 'decimal.js';
import { calculatePricePerKg, calculateTargetPrice, formatCurrency } from '../utils/calculations';
import { motion } from 'motion/react';
import { RefreshCw, Weight, IndianRupee } from 'lucide-react';

export default function MainCalculator() {
  const { t } = useTranslation();
  const [refWeight, setRefWeight] = useState('');
  const [refPrice, setRefPrice] = useState('');
  const [refUnit, setRefUnit] = useState<'kg' | 'g'>('kg');
  const [targetWeight, setTargetWeight] = useState('');
  const [targetUnit, setTargetUnit] = useState<'kg' | 'g'>('kg');
  const [targetPrice, setTargetPrice] = useState('');

  const pricePerKg = useMemo(() => calculatePricePerKg(refWeight, refPrice, refUnit), [refWeight, refPrice, refUnit]);

  const standardPortions = [100, 250, 500, 750, 1000];

  const reset = () => {
    setRefWeight('');
    setRefPrice('');
    setTargetWeight('');
    setTargetPrice('');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white drop-shadow-md">{t('mainTab')}</h2>
        <button 
          onClick={reset}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all active:scale-95"
        >
          <RefreshCw size={20} className="text-white" />
        </button>
      </div>

      {/* Reference Inputs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl"
      >
        <div className="space-y-4">
          <div className="relative">
            <label className="text-xs font-semibold text-blue-100 uppercase tracking-wider mb-1 block">{t('refWeight')}</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={refWeight}
                  onChange={(e) => setRefWeight(e.target.value)}
                  placeholder="0.000"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all placeholder:text-white/20"
                />
                <Weight className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
              </div>
              <button 
                onClick={() => setRefUnit(u => u === 'kg' ? 'g' : 'kg')}
                className="px-4 bg-gold-500/80 text-blue-900 font-bold rounded-2xl hover:bg-gold-400 transition-all active:scale-95"
              >
                {refUnit.toUpperCase()}
              </button>
            </div>
          </div>

          <div className="relative">
            <label className="text-xs font-semibold text-blue-100 uppercase tracking-wider mb-1 block">{t('refPrice')}</label>
            <div className="relative">
              <input
                type="number"
                value={refPrice}
                onChange={(e) => setRefPrice(e.target.value)}
                placeholder="0.000"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all placeholder:text-white/20"
              />
              <IndianRupee className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            </div>
          </div>
        </div>

        {!pricePerKg.isZero() && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="mt-6 p-4 bg-gold-500/20 border border-gold-500/30 rounded-2xl text-center"
          >
            <p className="text-gold-200 text-sm font-medium">{t('pricePerKg')}</p>
            <p className="text-3xl font-black text-gold-400">{formatCurrency(pricePerKg)}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Standard Portions */}
      {!pricePerKg.isZero() && (
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-blue-100 uppercase tracking-widest px-2">{t('standardPortions')}</h3>
          <div className="grid grid-cols-1 gap-3">
            {standardPortions.map((g, i) => {
              const price = calculateTargetPrice(pricePerKg, g.toString(), 'g');
              return (
                <motion.div
                  key={g}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex justify-between items-center group hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-300 font-bold">
                      {g < 1000 ? `${g}g` : '1kg'}
                    </div>
                    <span className="text-white/80 font-medium">{g < 1000 ? `${g} Grams` : '1 Kilogram'}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-gold-400">{formatCurrency(price)}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Target Calculation */}
      {!pricePerKg.isZero() && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-6"
        >
          <div className="relative">
            <label className="text-xs font-semibold text-blue-100 uppercase tracking-wider mb-1 block">{t('targetWeight')}</label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={targetWeight}
                  onChange={(e) => {
                    setTargetWeight(e.target.value);
                    setTargetPrice(''); // Clear other calculation
                  }}
                  placeholder="0.000"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all placeholder:text-white/20"
                />
              </div>
              <button 
                onClick={() => setTargetUnit(u => u === 'kg' ? 'g' : 'kg')}
                className="px-4 bg-blue-500/80 text-white font-bold rounded-2xl hover:bg-blue-400 transition-all active:scale-95"
              >
                {targetUnit.toUpperCase()}
              </button>
            </div>
            {targetWeight && (
              <div className="mt-2 text-center">
                <p className="text-blue-200 text-xs font-medium">{t('targetPrice')}</p>
                <p className="text-2xl font-black text-green-400">
                  {formatCurrency(calculateTargetPrice(pricePerKg, targetWeight, targetUnit))}
                </p>
              </div>
            )}
          </div>

          <div className="h-px bg-white/10 w-full" />

          <div className="relative">
            <label className="text-xs font-semibold text-blue-100 uppercase tracking-wider mb-1 block">{t('targetPrice')}</label>
            <div className="relative">
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => {
                  setTargetPrice(e.target.value);
                  setTargetWeight(''); // Clear other calculation
                }}
                placeholder="0.000"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white text-xl focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all placeholder:text-white/20"
              />
              <IndianRupee className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30" size={20} />
            </div>
            {targetPrice && (
              <div className="mt-2 text-center">
                <p className="text-blue-200 text-xs font-medium">{t('targetWeight')}</p>
                <p className="text-2xl font-black text-green-400">
                  {calculateTargetPrice(new Decimal(1).div(pricePerKg), targetPrice, 'kg').toFixed(3)} KG
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
