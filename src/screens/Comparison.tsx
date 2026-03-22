import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, RefreshCw, Scale, Trophy } from 'lucide-react';
import { Decimal } from 'decimal.js';
import { calculatePricePerKg, formatCurrency } from '../utils/calculations';

interface CompareItem {
  id: string;
  name: string;
  weight: string;
  price: string;
}

export default function Comparison() {
  const { t } = useTranslation();
  const [items, setItems] = useState<CompareItem[]>([]);
  const [newItem, setNewItem] = useState({ name: '', weight: '', price: '' });

  const analyzedItems = useMemo(() => {
    const processed = items.map(item => ({
      ...item,
      pricePerKg: calculatePricePerKg(item.weight, item.price, 'kg')
    }));
    
    if (processed.length < 2) return processed;
    
    const minPricePerKg = Decimal.min(...processed.map(p => p.pricePerKg));
    return processed.map(p => ({
      ...p,
      isBest: p.pricePerKg.equals(minPricePerKg)
    })).sort((a, b) => a.pricePerKg.comparedTo(b.pricePerKg));
  }, [items]);

  const addItem = () => {
    if (!newItem.weight || !newItem.price) return;
    setItems(prev => [...prev, { ...newItem, id: Date.now().toString(), name: newItem.name || `Item ${prev.length + 1}` }]);
    setNewItem({ name: '', weight: '', price: '' });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const reset = () => {
    setItems([]);
    setNewItem({ name: '', weight: '', price: '' });
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white drop-shadow-md">{t('compareTab')}</h2>
        <button 
          onClick={reset}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all active:scale-95"
        >
          <RefreshCw size={20} className="text-white" />
        </button>
      </div>

      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
        <input
          type="text"
          placeholder="Item Name (e.g. Brand A)"
          value={newItem.name}
          onChange={e => setNewItem(prev => ({ ...prev, name: e.target.value }))}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
        />
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Weight (KG)"
            value={newItem.weight}
            onChange={e => setNewItem(prev => ({ ...prev, weight: e.target.value }))}
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={newItem.price}
            onChange={e => setNewItem(prev => ({ ...prev, price: e.target.value }))}
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-400/50 transition-all"
          />
        </div>
        <button
          onClick={addItem}
          className="w-full bg-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-400 transition-all active:scale-95 shadow-lg"
        >
          <Plus size={20} /> {t('addItem')}
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {analyzedItems.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`
                relative overflow-hidden rounded-3xl p-5 border transition-all
                ${item.isBest ? 'bg-gold-500/20 border-gold-500/50 shadow-gold-500/20 shadow-xl' : 'bg-white/5 border-white/10'}
              `}
            >
              {item.isBest && (
                <div className="absolute top-0 right-0 bg-gold-500 text-blue-900 px-4 py-1 rounded-bl-2xl text-xs font-black uppercase flex items-center gap-1">
                  <Trophy size={12} /> {t('bestValue')}
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white">{item.name}</h3>
                  <p className="text-white/50 text-sm">{item.weight} KG @ {formatCurrency(item.price)}</p>
                </div>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-white/30 hover:text-red-400 transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/40 text-xs uppercase font-bold tracking-widest">{t('pricePerKg')}</p>
                  <p className={`text-2xl font-black ${item.isBest ? 'text-gold-400' : 'text-white'}`}>
                    {formatCurrency(item.pricePerKg)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/20">
                  <Scale size={24} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
