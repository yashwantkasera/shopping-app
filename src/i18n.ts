import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      appName: "PriceMaster Ultra",
      mainTab: "Main",
      quickTab: "Quick",
      totalTab: "Total",
      compareTab: "Compare",
      soloTab: "Solo",
      refWeight: "Reference Weight",
      refPrice: "Reference Price",
      targetWeight: "Target Weight",
      targetPrice: "Target Price",
      pricePerKg: "Price per KG",
      reset: "Reset",
      resetAll: "Reset All",
      kg: "KG",
      g: "Grams",
      calculate: "Calculate",
      results: "Results",
      history: "History",
      totalWeight: "Total Weight",
      totalPrice: "Total Price",
      addItem: "Add Item",
      compareItems: "Compare Items",
      bestValue: "Best Value",
      standardPortions: "Standard Portions",
    }
  },
  hi: {
    translation: {
      appName: "प्राइसमास्टर अल्ट्रा",
      mainTab: "मुख्य",
      quickTab: "त्वरित",
      totalTab: "कुल",
      compareTab: "तुलना",
      soloTab: "सोलो",
      refWeight: "संदर्भ वजन",
      refPrice: "संदर्भ मूल्य",
      targetWeight: "लक्ष्य वजन",
      targetPrice: "लक्ष्य मूल्य",
      pricePerKg: "प्रति किलो मूल्य",
      reset: "रीसेट",
      resetAll: "सब कुछ रीसेट करें",
      kg: "किलो",
      g: "ग्राम",
      calculate: "गणना करें",
      results: "परिणाम",
      history: "इतिहास",
      totalWeight: "कुल वजन",
      totalPrice: "कुल मूल्य",
      addItem: "आइटम जोड़ें",
      compareItems: "आइटम की तुलना करें",
      bestValue: "सबसे अच्छा मूल्य",
      standardPortions: "मानक भाग",
    }
  },
  es: {
    translation: {
      appName: "PriceMaster Ultra",
      mainTab: "Principal",
      quickTab: "Rápido",
      totalTab: "Total",
      compareTab: "Comparar",
      soloTab: "Solo",
      refWeight: "Peso de Referencia",
      refPrice: "Precio de Referencia",
      targetWeight: "Peso Objetivo",
      targetPrice: "Precio Objetivo",
      pricePerKg: "Precio por KG",
      reset: "Reiniciar",
      resetAll: "Reiniciar Todo",
      kg: "KG",
      g: "Gramos",
      calculate: "Calcular",
      results: "Resultados",
      history: "Historial",
      totalWeight: "Peso Total",
      totalPrice: "Precio Total",
      addItem: "Añadir Artículo",
      compareItems: "Comparar Artículos",
      bestValue: "Mejor Valor",
      standardPortions: "Porciones Estándar",
    }
  },
  fr: {
    translation: {
      appName: "PriceMaster Ultra",
      mainTab: "Principal",
      quickTab: "Rapide",
      totalTab: "Total",
      compareTab: "Comparer",
      soloTab: "Solo",
      refWeight: "Poids de Référence",
      refPrice: "Prix de Référence",
      targetWeight: "Poids Cible",
      targetPrice: "Prix Cible",
      pricePerKg: "Prix par KG",
      reset: "Réinitialiser",
      resetAll: "Tout Réinitialiser",
      kg: "KG",
      g: "Grammes",
      calculate: "Calculer",
      results: "Résultats",
      history: "Historique",
      totalWeight: "Poids Total",
      totalPrice: "Prix Total",
      addItem: "Ajouter un Article",
      compareItems: "Comparer les Articles",
      bestValue: "Meilleure Valeur",
      standardPortions: "Portions Standard",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
