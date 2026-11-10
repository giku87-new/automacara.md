/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Phone,
  Check,
  Copy,
  Clock,
  ShieldCheck,
  FileText,
  ChevronRight,
  MessageCircle,
  MapPin,
  Calculator,
  Send,
  X,
  Sparkles,
  Zap
} from 'lucide-react';

export default function App() {
  const [copiedNumber, setCopiedNumber] = useState<string | null>(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [calcWeight, setCalcWeight] = useState<number>(5);
  const [calcRadius, setCalcRadius] = useState<number>(15);
  const [quoteSubmitted, setQuoteSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    workType: 'Montaj structuri',
    weight: 'Până în 5 tone',
  });

  const handleCopyPhone = (number: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(number);
    setCopiedNumber(number);
    setTimeout(() => setCopiedNumber(null), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSubmitted(true);
    setTimeout(() => {
      setShowQuoteModal(false);
      setQuoteSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        location: '',
        workType: 'Montaj structuri',
        weight: 'Până în 5 tone',
      });
    }, 2500);
  };

  // WhatsApp quick link generator
  const getWhatsAppLink = (message: string = 'Bună ziua! Doresc informații pentru închirierea automacaralei de 25T.') => {
    return `https://wa.me/37369547396?text=${encodeURIComponent(message)}`;
  };

  // Calculate crane feasibility
  const isFeasible = calcWeight <= 25 && calcRadius <= 32;
  const recommendedConfig =
    calcWeight > 18
      ? 'Rază redusă (< 8m) - Balast maxim montat'
      : calcWeight > 8
      ? 'Rază medie (8 - 18m) - Braț extins standard'
      : 'Rază extinsă (până la 32m) - Braț + extensie Jib';

  return (
    <div className="min-h-screen bg-[#060e20] text-slate-100 antialiased flex flex-col items-center justify-start relative overflow-x-hidden">
      {/* Subtle blueprint / grid background on larger displays */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]"></div>

      {/* Copy notification toast */}
      {copiedNumber && (
        <div className="fixed top-4 z-50 bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg shadow-xl text-xs flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
          <span>Numărul {copiedNumber} a fost copiat în clipboard!</span>
        </div>
      )}

      {/* Central Mobile/Desktop Centered Container */}
      <div className="w-full max-w-[440px] min-h-screen flex flex-col bg-[#0b1326] shadow-2xl relative border-x border-slate-800/60 pb-28">

        {/* Top Navigation Bar / Header */}
        <header className="sticky top-0 z-40 bg-[#0b1326]/95 backdrop-blur-md border-b border-slate-800/80 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {/* Official Brand Logo */}
            <div className="h-10 px-2.5 bg-white rounded-lg border border-amber-400/40 flex items-center justify-center shadow-md">
              <img
                src="/assets/aistudio/image_47aca923.png"
                alt="LiberCons Prim Logo"
                className="h-6 w-auto object-contain"
              />
            </div>
            <div>
              <span className="block font-black text-xs tracking-wider uppercase text-white leading-none">
                AUTOMACARA.MD
              </span>
              <span className="text-[10px] font-semibold text-amber-400 tracking-wide">
                Chișinău • Moldova
              </span>
            </div>
          </div>

          {/* Quick Status / 24/7 Phone Direct Badge */}
          <div className="flex items-center gap-1.5">
            <a
              href="tel:069547396"
              className="flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/40 hover:bg-amber-400/20 transition-colors px-2.5 py-1.5 rounded-md text-amber-400 font-bold text-xs"
              title="Apelează acum dispeceratul 24/7"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>24 / 7</span>
            </a>

            {/* Quick WhatsApp button */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-md bg-emerald-500/10 border border-emerald-500/40 hover:bg-emerald-500/20 text-emerald-400 flex items-center justify-center transition-colors"
              title="Trimite poze / coordonate pe WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </header>

        {/* Main Content Stream */}
        <main className="flex-1 px-4 py-4 space-y-4">

          {/* Status Banner */}
          <div className="bg-[#131b2e] border border-slate-700/60 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="font-semibold tracking-wide uppercase text-[11px] text-slate-200">
                DISPECERAT CHIȘINĂU ACTIV
              </span>
            </div>
            <span className="text-[#eab308] font-bold text-[11px] tracking-wide flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#eab308]" />
              SOSIRE ~45 MIN
            </span>
          </div>

          {/* Main Business Card (Carte Poștală Hero) */}
          <div className="relative bg-gradient-to-b from-[#131b2e] to-[#162036] rounded-2xl p-5 border border-amber-400/25 glow-gold overflow-hidden">
            {/* Header: Official Logo & Equipment Badge */}
            <div className="flex items-center justify-between mb-3 gap-2">
              <div className="bg-white rounded-xl py-2 px-3.5 shadow-lg border border-amber-400/40 flex items-center">
                <img
                  src="/assets/aistudio/image_47aca923.png"
                  alt="LiberCons Prim Logo"
                  className="h-10 sm:h-11 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="bg-[#eab308] text-black font-extrabold text-[11px] px-2.5 py-1 rounded shadow uppercase tracking-wider shrink-0">
                  XCMG 25T
                </span>
                <span className="text-[9px] font-extrabold text-amber-400 tracking-widest uppercase">
                  CHIȘINĂU
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs mb-3">
              <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">
                SERVICII AUTOMACARĂ CHIȘINĂU
              </span>
              <span className="text-slate-400 font-medium text-[10px]">
                REPUBLICA MOLDOVA
              </span>
            </div>

            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-4">
              <ShieldCheck className="w-3.5 h-3.5 text-[#eab308] shrink-0" />
              <span>Flotă proprie licențiată • automacara.md</span>
            </div>

            {/* Official Motto Container */}
            <div className="bg-[#060e20]/90 rounded-xl p-3.5 border border-slate-700/80 mb-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-[#eab308] flex items-center justify-center font-black text-xl shrink-0">
                ”
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">
                  MOTTO OFICIAL
                </div>
                <div className="text-sm font-extrabold text-amber-300 leading-snug">
                  „RIDICĂM CU GRIJĂ. CONSTRUIM CU ÎNCREDERE”
                </div>
              </div>
            </div>

            {/* Primary Call to Action Button */}
            <div className="space-y-2">
              <a
                href="tel:069547396"
                className="w-full bg-[#eab308] hover:bg-[#ca8a04] active:scale-[0.99] transition-all text-slate-950 rounded-xl p-3.5 flex items-center justify-between shadow-xl group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-black/15 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-slate-950 fill-current" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-slate-900/80 leading-tight">
                      COMANDĂ AUTOMACARĂ NON-STOP
                    </span>
                    <span className="text-xl font-black tracking-tight text-slate-950 leading-none">
                      069 547 396
                    </span>
                  </div>
                </div>
                <div className="bg-black/15 rounded-lg px-3 py-2 text-xs font-black uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>SUNĂ</span>
                  <ChevronRight className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </a>

              {/* Quick actions line: Copy number & WhatsApp */}
              <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
                <button
                  type="button"
                  onClick={(e) => handleCopyPhone('069547396', e)}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 py-1"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copiază 069 547 396</span>
                </button>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1 py-1"
                >
                  <MessageCircle className="w-3 h-3 text-emerald-400" />
                  <span>Scrie pe WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Quick Guarantee Badges */}
            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-700/50 text-[10px] font-semibold text-slate-300">
              <div className="flex items-center gap-1.5 justify-center text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#eab308] shrink-0" />
                <span>Operator autorizat</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center text-center">
                <FileText className="w-3.5 h-3.5 text-[#eab308] shrink-0" />
                <span>Factură fiscală</span>
              </div>
              <div className="flex items-center gap-1.5 justify-center text-center">
                <Zap className="w-3.5 h-3.5 text-[#eab308] shrink-0" />
                <span>Sosire ~45 min</span>
              </div>
            </div>
          </div>

          {/* Crane Hero Showcase Image */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-[#131b2e] shadow-xl">
            <div className="relative h-56 w-full overflow-hidden bg-slate-900">
              <img
                src="https://lh3.googleusercontent.com/aida/ALJJyrB8R3sIbnwgBbs_xAttvWzotYNrkWmpB94Z0rxNBt4trN5iQvOUu6w2XRg6JYRFz4Av2BhjYqHsZAty2ZW7TWxfUFnpWk-J8TBdAo2k0EFuhM1LW8xJg-0275hZcR6alVaNXsnGDzILHgEhBZP-0ZksFhREAjlgCTmFh7tYIemZSPK_ouTZdCsaj1bSS8h0XIknzJEvVGTczyPvJQ3Y1jHjEtREGv8ZR1-isJ7UaWzR"
                alt="Automacara XCMG 25 tone la lucru pe șantier în Chișinău"
                className="w-full h-full object-cover object-center"
                onError={(e) => {
                  // Fallback to high resolution industrial crane image
                  const target = e.currentTarget;
                  if (!target.dataset.fallback) {
                    target.dataset.fallback = 'true';
                    target.src =
                      'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=1200&q=80';
                  }
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1326] via-[#0b1326]/40 to-transparent"></div>

              {/* Top Badge */}
              <div className="absolute top-3 left-3 bg-[#060e20]/80 backdrop-blur-md border border-white/10 rounded-lg px-2.5 py-1 text-[10px] font-bold text-slate-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>UTILAJ DE ÎNALTĂ PRECIZIE • FLOTĂ ACTIVĂ CHIȘINĂU</span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#eab308] animate-ping"></span>
                  <span className="font-extrabold text-white uppercase tracking-wider text-[11px]">
                    XCMG 25 TONE LA DATORIE
                  </span>
                </div>
                <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded">
                  GATA DE INTERVENȚIE
                </span>
              </div>
            </div>

            {/* Quick interactive action bar below hero photo */}
            <div className="p-2.5 bg-[#0b1326] border-t border-slate-800 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setShowCalculator(!showCalculator)}
                className="text-amber-400 font-bold hover:text-amber-300 flex items-center gap-1.5 transition-colors px-2 py-1 rounded bg-[#131b2e] border border-amber-400/30 text-[11px]"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>{showCalculator ? 'Ascunde Calculator' : 'Calculator Sarcină / Înălțime'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowQuoteModal(true)}
                className="text-slate-200 hover:text-white flex items-center gap-1 font-semibold text-[11px] bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700"
              >
                <span>Cere Ofertă Scrisă</span>
                <ChevronRight className="w-3 h-3 text-[#eab308]" />
              </button>
            </div>
          </div>

          {/* Optional Interactive Feasibility Calculator */}
          {showCalculator && (
            <div className="bg-[#162036] rounded-2xl p-4 border border-amber-400/30 space-y-3.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold tracking-widest text-[#eab308] uppercase">
                    CALCULATOR RAPID PE ȘANTIER
                  </span>
                  <h3 className="text-sm font-black text-white uppercase">
                    Verificare Compatibilitate XCMG 25T
                  </h3>
                </div>
                <button
                  onClick={() => setShowCalculator(false)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Weight Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Greutate încărcătură:</span>
                  <span className="text-amber-400 font-bold">{calcWeight} Tone</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  value={calcWeight}
                  onChange={(e) => setCalcWeight(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-700 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>1 Tonă</span>
                  <span>12 Tone</span>
                  <span>25 Tone (Max)</span>
                </div>
              </div>

              {/* Height / Radius Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Rază / Înălțime estimată:</span>
                  <span className="text-amber-400 font-bold">{calcRadius} Metri</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="40"
                  value={calcRadius}
                  onChange={(e) => setCalcRadius(Number(e.target.value))}
                  className="w-full accent-amber-400 bg-slate-700 h-2 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>3 m</span>
                  <span>20 m</span>
                  <span>40+ m (Braț + Jib)</span>
                </div>
              </div>

              {/* Result box */}
              <div
                className={`p-3 rounded-xl border text-xs ${
                  isFeasible
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                    : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>
                    {isFeasible
                      ? 'Compatibil 100% cu macaraua noastră!'
                      : 'Necesară evaluare tehnică la fața locului'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Configurație: <strong className="text-white">{recommendedConfig}</strong>. Sunați
                  dispeceratul pentru confirmarea razei de calare.
                </p>
                <a
                  href={`tel:069547396`}
                  className="mt-2 inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-bold text-xs px-3 py-1.5 rounded-lg hover:bg-amber-500 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 fill-current" />
                  <span>Rezervă pentru lucrare ({calcWeight}t la {calcRadius}m)</span>
                </a>
              </div>
            </div>
          )}

          {/* Parametri Tehnici Utilaj Section */}
          <div className="bg-[#162036] rounded-2xl p-4 border border-slate-700/70 shadow-lg space-y-3.5">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-[#eab308] uppercase">
                PARAMETRI TEHNICI UTILAJ
              </span>
              <h2 className="text-lg font-black text-white uppercase tracking-tight">
                PERFORMANȚĂ <span className="text-[#eab308]">XCMG 25 TONE</span>
              </h2>
            </div>

            {/* 2x2 Grid Specs */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Card 1 */}
              <div className="bg-[#131b2e] rounded-xl p-3 border border-slate-700/60 hover:border-amber-400/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#eab308] text-xs font-bold uppercase mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  <span>CAPACITATE</span>
                </div>
                <div className="text-xl font-black text-white">
                  25 <span className="text-amber-400 font-bold text-sm">Tone</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Sarcină maximă la cârlig</div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#131b2e] rounded-xl p-3 border border-slate-700/60 hover:border-amber-400/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#eab308] text-xs font-bold uppercase mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7l4-4m0 0l4 4m-4-4v18"
                    />
                  </svg>
                  <span>BRAȚ TELESCOPIC</span>
                </div>
                <div className="text-xl font-black text-white">
                  40-48 <span className="text-amber-400 font-bold text-sm">m</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Cu extensie (jib)</div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#131b2e] rounded-xl p-3 border border-slate-700/60 hover:border-amber-400/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#eab308] text-xs font-bold uppercase mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>MANEVRABILITATE</span>
                </div>
                <div className="text-xl font-black text-white">360°</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Rotație continuă ghidată</div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#131b2e] rounded-xl p-3 border border-slate-700/60 hover:border-amber-400/40 transition-colors">
                <div className="flex items-center gap-1.5 text-[#eab308] text-xs font-bold uppercase mb-1">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>ECHIPAJ</span>
                </div>
                <div className="text-xl font-black text-white">INCLUS</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Operator autorizat ISCIR</div>
              </div>
            </div>

            {/* Extra Technical Details */}
            <div className="bg-[#131b2e]/80 rounded-xl p-3 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between items-center py-0.5 border-b border-slate-800/80">
                <span className="text-slate-400">Masa totală utilaj (chassis)</span>
                <span className="font-bold text-slate-200">25.000 kg</span>
              </div>
              <div className="flex justify-between items-center py-0.5 border-b border-slate-800/80">
                <span className="text-slate-400">Sistem de calare & stabilizare</span>
                <span className="font-bold text-slate-200">Hidraulic H-Type</span>
              </div>
              <div className="flex justify-between items-center py-0.5">
                <span className="text-slate-400">Monitorizare computerizată sarcină</span>
                <span className="font-bold text-amber-400">Senzori Hirschmann LMI</span>
              </div>
            </div>
          </div>

          {/* Gama de Servicii de Ridicare Section */}
          <div className="bg-[#162036] rounded-2xl p-4 border border-slate-700/70 shadow-lg space-y-3.5">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-[#eab308] uppercase">
                CAPABILITĂȚI OPERAȚIONALE
              </span>
              <h2 className="text-lg font-black text-white uppercase tracking-tight">
                GAMA DE SERVICII DE <span className="text-[#eab308]">RIDICARE</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Executăm manevre de complexitate înaltă cu automacaragii calificați și utilaje de
                clasă industrială.
              </p>
            </div>

            {/* Service Cards List */}
            <div className="space-y-2.5">
              {/* Service 1 */}
              <div className="bg-[#131b2e] p-3.5 rounded-xl border border-slate-700/60 flex items-start gap-3 hover:border-amber-400/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-[#eab308] text-slate-950 flex items-center justify-center shrink-0 font-bold shadow">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white leading-tight uppercase">
                    Montaj Structuri Metalice & Prefabricate
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Poziționare de precizie pentru grinzi de beton, piloni, ferme industriale, panouri
                    sandwich și acoperișuri de hale.
                  </p>
                </div>
              </div>

              {/* Service 2 */}
              <div className="bg-[#131b2e] p-3.5 rounded-xl border border-slate-700/60 flex items-start gap-3 hover:border-amber-400/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-amber-400 border border-amber-400/30 flex items-center justify-center shrink-0 font-bold shadow">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-2m-4-1v8m0 0l3-3m-3 3L9 8m-5 5h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293h3.172a1 1 0 00.707-.293l2.414-2.414a1 1 0 01.707-.293H20"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white leading-tight uppercase">
                    Descărcare / Încărcare Tiruri & Containere
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Manevrare containere maritime, module prefabricate de birou, rezervoare metalice
                    și paleți cu materiale grele.
                  </p>
                </div>
              </div>

              {/* Service 3 */}
              <div className="bg-[#131b2e] p-3.5 rounded-xl border border-slate-700/60 flex items-start gap-3 hover:border-amber-400/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-amber-400 border border-amber-400/30 flex items-center justify-center shrink-0 font-bold shadow">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white leading-tight uppercase">
                    Ridicare Materiale la Înălțime
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Alimentarea etajelor superioare cu cărămidă, fier beton, sticlă fațadă, utilaje
                    HVAC și echipamente grele de șantier.
                  </p>
                </div>
              </div>

              {/* Service 4 */}
              <div className="bg-[#131b2e] p-3.5 rounded-xl border border-slate-700/60 flex items-start gap-3 hover:border-amber-400/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-slate-800 text-amber-400 border border-amber-400/30 flex items-center justify-center shrink-0 font-bold shadow">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-white leading-tight uppercase">
                    Relocări Utilaje Industriale
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    Mutare strunguri, generatoare de mare putere, transformatoare electrice și linii
                    de producție în spații strâmte.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Zone de Acoperire & Avantaje Chișinău & Moldova */}
          <div className="bg-[#131b2e] rounded-2xl p-4 border border-slate-700/60 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
              <MapPin className="w-4 h-4" />
              <span>Arie de Acoperire Rapidă</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Intervenim prompt în toate sectoarele din Chișinău: <strong>Botanica, Buiucani, Centru, Ciocana, Rîșcani, Poșta Veche</strong> și suburbii (Ialoveni, Strășeni, Cricova, Sîngera, Bubuieci), precum și pe întreg teritoriul Republicii Moldova.
            </p>
          </div>

          {/* Legal & Company Footer Information */}
          <footer className="pt-4 pb-4 text-center text-xs text-slate-400 space-y-2.5">
            <div className="flex justify-center mb-1">
              <div className="bg-white rounded-xl px-3.5 py-1.5 border border-slate-700/80 shadow-md inline-flex items-center">
                <img
                  src="/assets/aistudio/image_47aca923.png"
                  alt="LiberCons Prim Logo"
                  className="h-6 w-auto object-contain"
                />
              </div>
            </div>
            <div className="font-extrabold text-slate-200 tracking-wider uppercase text-[11px]">
              LIBERCONSPRIM SRL • CHIȘINĂU, MOLDOVA
            </div>
            <div className="text-[11px] text-slate-400 flex flex-wrap justify-center items-center gap-2">
              <a
                href="mailto:contact@automacara.md"
                className="hover:text-amber-400 transition-colors underline decoration-slate-600 underline-offset-2"
              >
                contact@automacara.md
              </a>
              <span>•</span>
              <span>Servicii automacara în Moldova</span>
            </div>
            <div className="text-[10px] text-slate-500 pt-1">
              © {new Date().getFullYear()} LiberConsPrim. Toate drepturile rezervate.
            </div>
          </footer>
        </main>

        {/* Fixed Bottom Dual-Call Bar (Telefon Principal & Secundar) */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[440px] bg-[#0b1326]/95 backdrop-blur-md border-t border-slate-700/80 p-3 z-50 flex items-center gap-2.5 shadow-2xl">
          {/* Secundar Call Button (069 497 778) */}
          <a
            href="tel:069497778"
            className="flex-1 bg-[#131b2e] border border-slate-700 hover:bg-slate-800 active:scale-[0.98] transition-all rounded-xl py-3 px-2 flex items-center justify-center gap-2 text-white font-bold text-xs shadow-md"
            title="Apelează numărul secundar 069 497 778"
          >
            <Phone className="w-4 h-4 text-[#eab308] fill-current" />
            <span className="tracking-wide">069 497 778</span>
          </a>

          {/* Principal Call Button (069 547 396) */}
          <a
            href="tel:069547396"
            className="flex-1 bg-[#eab308] hover:bg-[#ca8a04] active:scale-[0.98] transition-all rounded-xl py-3 px-2 flex items-center justify-center gap-2 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20"
            title="Apelează numărul principal 069 547 396"
          >
            <Phone className="w-4 h-4 fill-current" />
            <span className="tracking-wide">069 547 396</span>
          </a>
        </div>
      </div>

      {/* Quote / Request Callback Modal */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#162036] border border-amber-400/40 rounded-2xl w-full max-w-sm p-5 shadow-2xl relative">
            <button
              onClick={() => setShowQuoteModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {quoteSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 bg-emerald-500/20 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h3 className="text-lg font-black text-white uppercase">Cerere Trimisă!</h3>
                <p className="text-xs text-slate-300">
                  Dispeceratul LiberConsPrim vă va contacta în câteva minute la numărul indicat.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-3.5">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="bg-white rounded-lg px-2.5 py-1 inline-flex items-center shadow-sm">
                      <img
                        src="/assets/aistudio/image_47aca923.png"
                        alt="LiberCons Prim Logo"
                        className="h-5 w-auto object-contain"
                      />
                    </div>
                    <span className="text-[10px] font-black tracking-widest text-[#eab308] uppercase">
                      SOLICITARE OFERTĂ
                    </span>
                  </div>
                  <h3 className="text-base font-black text-white uppercase">
                    Comandă Rapidă Automacara
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Lăsați numărul și vă sunăm imediat pentru confirmare.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">Numele dvs. / Compania</label>
                  <input
                    type="text"
                    required
                    placeholder="ex: Ion Popescu / Constructor SRL"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0b1326] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">Număr de Telefon</label>
                  <input
                    type="tel"
                    required
                    placeholder="069 XXX XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#0b1326] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">Locație Lucrare</label>
                  <input
                    type="text"
                    placeholder="ex: Chișinău, str. Uzinelor"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#0b1326] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-300">Tip Manevră</label>
                  <select
                    value={formData.workType}
                    onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                    className="w-full bg-[#0b1326] border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Montaj structuri">Montaj structuri metalice / prefabricate</option>
                    <option value="Descărcare tir / container">Descărcare container / tir</option>
                    <option value="Ridicare materiale etaj">Ridicare materiale la înălțime</option>
                    <option value="Relocare utilaj greu">Relocare utilaje industriale</option>
                    <option value="Altă manevră">Alt tip de manevră</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Trimite Solicitarea</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
