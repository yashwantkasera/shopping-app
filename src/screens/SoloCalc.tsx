import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { RefreshCw, Target, IndianRupee, Weight } from 'lucide-react';
import { calculatePricePerKg, calculateTargetPrice, calculateTargetWeight, formatCurrency } from '../utils/calculations';

export default function SoloCalc() {
  const { t } = useTranslation();
  const [refWeight, setRefWeight] = useState('');
  const [refPrice, setRefPrice] = useState('');
  const [mode, setMode] = useState<'toPrice' | 'toWeight'>('toPrice');
  const [inputVal, setInputVal] = useState('');

  const pricePerKg = useMemo(() => calculatePricePerKg(refWeight, refPrice, 'kg'), [refWeight, refPrice]);

  const result = useMemo(() => {
    if (pricePerKg.isZero() || !inputVal) return null;
    if (mode === 'toPrice') {
      return { type: 'price', value: calculateTargetPrice(pricePerKg, inputVal, 'kg') };
    } else {
      return { type: 'weight', value: calculateTargetWeight(pricePerKg, inputVal) };
    }
  }, [pricePerKg, inputVal, mode]);

  const reset = () => {
    setRefWeight('');
    setRefPrice('');
    setInputVal('');
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white drop-shadow-md">{t('soloTab')}</h2>
        <button 
          onClick={reset}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all active:scale-95"
        >
          <RefreshCw size={20} className="text-white" />
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-blue-100 uppercase">{t('refWeight')} (KG)</label>
            <input
              type="number"
              value={refWeight}
              onChange={e => setRefWeight(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-blue-100 uppercase">{t('refPrice')} (₹)</label>
            <input
              type="number"
              value={refPrice}
              onChange={e => setRefPrice(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50"
            />
          </div>
        </div>

        <div className="flex p-1 bg-white/5 rounded-2xl">
          <button
            onClick={() => setMode('toPrice')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'toPrice' ? 'bg-gold-500 text-blue-900 shadow-lg' : 'text-white/50'}`}
          >
            Weight → Price
          </button>
          <button
            onClick={() => setMode('toWeight')}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${mode === 'toWeight' ? 'bg-gold-500 text-blue-900 shadow-lg' : 'text-white/50'}`}
          >
            Price → Weight
          </button>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-blue-100 uppercase">
            {mode === 'toPrice' ? t('targetWeight') + ' (KG)' : t('targetPrice') + ' (₹)'}
          </label>
          <div className="relative">
            <input
              type="number"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-2xl font-bold text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50"
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
              {mode === 'toPrice' ? <Weight /> : <IndianRupee />}
            </div>
          </div>
        </div>
      </div>

      {result && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-gold-400 to-gold-600 rounded-3xl p-8 text-center shadow-2xl shadow-gold-500/20"
        >
          <p className="text-blue-900/60 font-bold uppercase tracking-widest text-sm mb-2">
            {result.type === 'price' ? t('targetPrice') : t('targetWeight')}
          </p>
          <p className="text-5xl font-black text-blue-900">
            {result.type === 'price' ? formatCurrency(result.value) : `${result.value.toFixed(3)} KG`}
          </p>
        </motion.div>
      )}
    </div>
  );
}
