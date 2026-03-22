import { Decimal } from 'decimal.js';

// Configure Decimal for 3 decimal precision and high capacity
Decimal.set({ precision: 40, rounding: Decimal.ROUND_HALF_UP });

export const formatCurrency = (value: Decimal | number | string, locale: string = 'en-IN') => {
  const val = new Decimal(value);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(val.toNumber());
};

export const formatWeight = (value: Decimal | number | string, unit: 'kg' | 'g' = 'kg') => {
  const val = new Decimal(value);
  return `${val.toFixed(3)} ${unit}`;
};

export const calculatePricePerKg = (refWeight: string, refPrice: string, unit: 'kg' | 'g'): Decimal => {
  if (!refWeight || !refPrice || parseFloat(refWeight) === 0) return new Decimal(0);
  
  const weight = new Decimal(refWeight);
  const price = new Decimal(refPrice);
  
  // If unit is grams, convert weight to KG first
  const weightInKg = unit === 'g' ? weight.div(1000) : weight;
  
  return price.div(weightInKg);
};

export const calculateTargetPrice = (pricePerKg: Decimal, targetWeight: string, targetUnit: 'kg' | 'g'): Decimal => {
  if (!targetWeight) return new Decimal(0);
  const weight = new Decimal(targetWeight);
  const weightInKg = targetUnit === 'g' ? weight.div(1000) : weight;
  return pricePerKg.mul(weightInKg);
};

export const calculateTargetWeight = (pricePerKg: Decimal, targetPrice: string): Decimal => {
  if (!targetPrice || pricePerKg.isZero()) return new Decimal(0);
  const price = new Decimal(targetPrice);
  return price.div(pricePerKg);
};
