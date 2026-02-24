/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, DollarSign, TrendingUp, AlertCircle, CheckCircle2, Loader2, Sparkles, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { analyzeProducts } from './services/geminiService';
import { AnalysisResult } from './types';

export default function App() {
  const [category, setCategory] = useState('');
  const [budget, setBudget] = useState('');
  const [language, setLanguage] = useState<'en' | 'my'>('en');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !budget) return;

    setLoading(true);
    setLoadingStep(0);
    setError(null);
    setResult(null);

    const stepInterval = setInterval(() => {
      setLoadingStep(prev => (prev + 1) % 4);
    }, 3500);

    try {
      const data = await analyzeProducts({ category, budget, language });
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
      clearInterval(stepInterval);
    }
  };

  const t = {
    en: {
      title: "ValueAnalyst",
      subtitle: "Scientific Methodology",
      heroTitle: "Find the Best",
      heroHighlight: "Price-to-Performance",
      heroDesc: "Our AI uses real-time market data and scientific evaluation to recommend products that give you the absolute best return on your investment.",
      catLabel: "Product Category",
      catPlaceholder: "e.g. Mechanical Keyboards",
      budgetLabel: "Your Budget",
      budgetPlaceholder: "e.g. Under $150",
      btnStart: "Start Analysis",
      btnLoading: "Analyzing Market...",
      marketOverview: "Market Overview",
      rank: "Rank",
      valueProp: "Value Proposition",
      keySpecs: "Key Specs",
      compromises: "Compromises",
      finalVerdict: "Final Verdict",
      ready: "Ready for Analysis",
      readyDesc: "Enter a category and budget above to see the best value products on the market today.",
      powered: "Powered by Gemini 3 Flash & Real-Time Google Search Grounding",
      loadingSteps: [
        "Searching latest market data...",
        "Identifying key performance metrics...",
        "Calculating price-to-performance scores...",
        "Finalizing expert recommendations..."
      ]
    },
    my: {
      title: "တန်ဖိုးဆန်းစစ်သူ",
      subtitle: "သိပ္ပံနည်းကျ ဆန်းစစ်မှု",
      heroTitle: "အကောင်းဆုံး",
      heroHighlight: "ဈေးနှုန်းနှင့် စွမ်းဆောင်ရည်",
      heroDesc: "ကျွန်ုပ်တို့၏ AI သည် လက်ရှိဈေးကွက်အချက်အလက်များနှင့် သိပ္ပံနည်းကျ အကဲဖြတ်မှုများကို အသုံးပြု၍ သင့်အတွက် အကျိုးအမြတ်အများဆုံးရရှိမည့် ထုတ်ကုန်များကို အကြံပြုပေးပါသည်။",
      catLabel: "ထုတ်ကုန်အမျိုးအစား",
      catPlaceholder: "ဥပမာ - ကီးဘုတ်များ",
      budgetLabel: "သင့်ဘတ်ဂျက်",
      budgetPlaceholder: "ဥပမာ - ၁၅၀ ဒေါ်လာအောက်",
      btnStart: "ဆန်းစစ်မှုစတင်ရန်",
      btnLoading: "ဆန်းစစ်နေသည်...",
      marketOverview: "ဈေးကွက်အခြေအနေ",
      rank: "အဆင့်",
      valueProp: "တန်ဖိုးရှိပုံ",
      keySpecs: "အဓိကအချက်အလက်များ",
      compromises: "အားနည်းချက်များ",
      finalVerdict: "နောက်ဆုံးသုံးသပ်ချက်",
      ready: "ဆန်းစစ်ရန် အဆင်သင့်ဖြစ်ပါပြီ",
      readyDesc: "ယနေ့ဈေးကွက်တွင် အကောင်းဆုံးတန်ဖိုးရှိသော ထုတ်ကုန်များကို ကြည့်ရှုရန် အထက်တွင် အမျိုးအစားနှင့် ဘတ်ဂျက်ကို ထည့်သွင်းပါ။",
      powered: "Gemini 3 Flash နှင့် Real-Time Google Search Grounding တို့ဖြင့် ပံ့ပိုးထားပါသည်",
      loadingSteps: [
        "နောက်ဆုံးပေါ် ဈေးကွက်အချက်အလက်များကို ရှာဖွေနေသည်...",
        "အဓိက စွမ်းဆောင်ရည် အချက်အလက်များကို ခွဲခြားနေသည်...",
        "ဈေးနှုန်းနှင့် စွမ်းဆောင်ရည် ရမှတ်များကို တွက်ချက်နေသည်...",
        "ကျွမ်းကျင်သူ အကြံပြုချက်များကို အချောသတ်နေသည်..."
      ]
    }
  }[language];

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-xl tracking-tight">{t.title}<span className="text-indigo-600">.ai</span></h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === 'en' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('my')}
                className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${language === 'my' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                MY
              </button>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-sm font-medium text-slate-500">
              <Sparkles className="w-4 h-4" /> {t.subtitle}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight"
          >
            {t.heroTitle} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{t.heroHighlight}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            {t.heroDesc}
          </motion.p>
        </div>

        {/* Search Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl shadow-indigo-500/5 border border-slate-200 p-6 mb-12"
        >
          <form onSubmit={handleAnalyze} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">{t.catLabel}</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder={t.catPlaceholder}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
            <div className="relative">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 ml-1">{t.budgetLabel}</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  placeholder={t.budgetPlaceholder}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  required
                />
              </div>
            </div>
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-indigo-600/20 flex flex-col items-center justify-center gap-1 group overflow-hidden"
              >
                {loading ? (
                  <div className="flex flex-col items-center">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm">{t.btnLoading}</span>
                    </div>
                    <motion.span 
                      key={loadingStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[10px] font-medium text-indigo-100/80 whitespace-nowrap"
                    >
                      {t.loadingSteps[loadingStep]}
                    </motion.span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    {t.btnStart}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* Category Overview */}
              <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-2xl">
                <h3 className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">{t.marketOverview}</h3>
                <p className="text-lg font-medium text-slate-800 leading-relaxed italic">
                  "{result.categoryOverview}"
                </p>
              </div>

              {/* Recommendations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {result.recommendations.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <span className="bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                          {t.rank} #{idx + 1}
                        </span>
                        <span className="text-lg font-bold text-indigo-600">{item.price}</span>
                      </div>
                      <h4 className="text-xl font-bold text-slate-900 mb-3">{item.name}</h4>
                      
                      <div className="mb-6">
                        <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{t.valueProp}</h5>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.why}</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h5 className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-2">{t.keySpecs}</h5>
                          <ul className="space-y-1.5">
                            {item.specs.map((spec, i) => (
                              <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                                {spec}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-2">{t.compromises}</h5>
                          <ul className="space-y-1.5">
                            {item.cons.map((con, i) => (
                              <li key={i} className="text-xs text-slate-500 flex items-start gap-2 italic">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Final Verdict */}
              <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3">{t.finalVerdict}</h3>
                  <p className="text-2xl font-semibold leading-tight">
                    {result.finalVerdict}
                  </p>
                </div>
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State / Instructions */}
        {!result && !loading && (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
            <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-400">{t.ready}</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto mt-1">
              {t.readyDesc}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-8 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-widest">
          {t.powered}
        </p>
      </footer>
    </div>
  );
}
