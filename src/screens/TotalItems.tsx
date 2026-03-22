import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, RefreshCw, ShoppingCart } from 'lucide-react';
import { Decimal } from 'decimal.js';
import { formatCurrency } from '../utils/calculations';

interface Item {
  id: string;
  name: string;
  weight: string;
  price: string;
}

export default function TotalItems() {
  const { t } = useTranslation();
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({ name: '', weight: '', price: '' });

  const totals = useMemo(() => {
    return items.reduce((acc, item) => ({
      weight: acc.weight.plus(new Decimal(item.weight || 0)),
      price: acc.price.plus(new Decimal(item.price || 0))
    }), { weight: new Decimal(0), price: new Decimal(0) });
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
        <h2 className="text-2xl font-bold text-white drop-shadow-md">{t('totalTab')}</h2>
        <button 
          onClick={reset}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full hover:bg-white/30 transition-all active:scale-95"
        >
          <RefreshCw size={20} className="text-white" />
        </button>
      </div>

      {/* Add Item Form */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl space-y-4">
        <input
          type="text"
          placeholder="Item Name (Optional)"
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
          className="w-full bg-gold-500 text-blue-900 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gold-400 transition-all active:scale-95 shadow-lg"
        >
          <Plus size={20} /> {t('addItem')}
        </button>
      </div>

      {/* Totals Summary */}
      {items.length > 0 && (
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-2xl p-4 text-center">
            <p className="text-blue-200 text-xs uppercase font-bold">{t('totalWeight')}</p>
            <p className="text-xl font-black text-white">{totals.weight.toFixed(3)} KG</p>
          </div>
          <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-4 text-center">
            <p className="text-green-200 text-xs uppercase font-bold">{t('totalPrice')}</p>
            <p className="text-xl font-black text-white">{formatCurrency(totals.price)}</p>
          </div>
        </motion.div>
      )}

      {/* Items List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex justify-between items-center group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/50">
                  <ShoppingCart size={18} />
                </div>
                <div>
                  <p className="text-white font-bold">{item.name}</p>
                  <p className="text-white/50 text-xs">{item.weight} KG @ {formatCurrency(item.price)}</p>
                </div>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-all"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
