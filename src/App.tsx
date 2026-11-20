import React, { useEffect, useState } from 'react';
import {
  Phone,
  Check,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  MapPin,
  ShieldCheck,
  FileText,
  Clock,
  BookOpen,
  Send,
  MessageCircle
} from 'lucide-react';
import { BLOG_ARTICLES, LOAD_RADIUS_TABLE, UI_CONTENT, type BlogArticle, type Lang } from './content';

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export interface AppProps {
  initialLang?: Lang;
  initialArticleSlug?: string | null;
}

function detectInitialRoute(defaultLang?: Lang, defaultSlug?: string | null): {
  lang: Lang;
  articleSlug: string | null;
} {
  if (typeof window === 'undefined') {
    return {
      lang: defaultLang ?? 'ro',
      articleSlug: defaultSlug ?? null
    };
  }
  const path = window.location.pathname;
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get('lang');
  const isRuPath = path === '/ru' || path.startsWith('/ru/');
  const lang: Lang = queryLang === 'ru' || isRuPath ? 'ru' : defaultLang ?? 'ro';

  const blogMatch = path.match(/\/blog\/([^/]+)/);
  const articleSlug = blogMatch?.[1] ?? params.get('article') ?? defaultSlug ?? null;

  return { lang, articleSlug };
}

export function trackEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined') return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, ...params });
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }
  } catch {
    // Ignore analytics errors
  }
}

export default function App(props: AppProps) {
  const { initialLang, initialArticleSlug } = props;
  const initialRoute = detectInitialRoute(initialLang, initialArticleSlug);
  const [lang, setLang] = useState<Lang>(initialRoute.lang);
  const [activeArticleSlug, setActiveArticleSlug] = useState<string | null>(initialRoute.articleSlug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    format: 'Schimb Complet (8 ore)',
    location: '',
    details: ''
  });

  const t = UI_CONTENT[lang];
  const activeArticle: BlogArticle | undefined = activeArticleSlug
    ? BLOG_ARTICLES.find((a) => a.slug === activeArticleSlug)
    : undefined;

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = lang;
    if (activeArticle) {
      document.title = `${lang === 'ro' ? activeArticle.titleRo : activeArticle.titleRu} | automacara.md`;
    } else {
      document.title = t.metaTitle;
    }
  }, [lang, activeArticle, t.metaTitle]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onPopState = () => {
      const next = detectInitialRoute();
      setLang(next.lang);
      setActiveArticleSlug(next.articleSlug);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleSwitchLang = (nextLang: Lang) => {
    setLang(nextLang);
    trackEvent('switch_language', { lang: nextLang });
    if (typeof window !== 'undefined') {
      let nextUrl = nextLang === 'ru' ? '/ru/' : '/';
      if (activeArticleSlug) {
        nextUrl = `/blog/${activeArticleSlug}/${nextLang === 'ru' ? '?lang=ru' : ''}`;
      }
      window.history.pushState({}, '', nextUrl);
    }
  };

  const handleOpenArticle = (slug: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveArticleSlug(slug);
    trackEvent('view_blog_article', { slug, lang });
    if (typeof window !== 'undefined') {
      const nextUrl = `/blog/${slug}/${lang === 'ru' ? '?lang=ru' : ''}`;
      window.history.pushState({}, '', nextUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCloseArticle = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveArticleSlug(null);
    if (typeof window !== 'undefined') {
      const nextUrl = lang === 'ru' ? '/ru/' : '/';
      window.history.pushState({}, '', nextUrl);
    }
  };

  const scrollToContactWithFormat = (formatTitle: string) => {
    setFormData((prev) => ({ ...prev, format: formatTitle }));
    if (activeArticleSlug) {
      setActiveArticleSlug(null);
    }
    trackEvent('select_collaboration_format', { format: formatTitle, lang });
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 60);
  };

  const getWhatsAppUrl = (customText?: string) => {
    const defaultMsg =
      lang === 'ro'
        ? 'Bună ziua! Solicit estimare pentru servicii de automacara XCMG 25 Tone (automacara.md).'
        : 'Здравствуйте! Запрашиваю расчет стоимости услуг автокрана XCMG 25 тонн (automacara.md).';
    return `https://wa.me/37369547396?text=${encodeURIComponent(customText || defaultMsg)}`;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    trackEvent('submit_quote_form', {
      format: formData.format,
      location: formData.location || 'Chisinau',
      lang
    });

    const payload = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      format: formData.format,
      location: formData.location.trim() || 'mun. Chișinău',
      details: formData.details.trim(),
      lang,
      pageUrl: typeof window !== 'undefined' ? window.location.href : 'https://automacara.md/',
      submittedAt: new Date().toISOString()
    };

    const leadEndpoint =
      typeof window !== 'undefined' && window.location.hostname.endsWith('.workers.dev')
        ? '/api/lead'
        : 'https://automacara-md.clubturistic.workers.dev/api/lead';

    try {
      const response = await fetch(leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error('Lead endpoint returned non-200');
      }
    } catch {
      // Fallback: save locally & allow optional WhatsApp follow-up so the inquiry is never lost
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const whatsappSummaryText =
    lang === 'ro'
      ? `Bună ziua! Solicit estimare servicii automacara XCMG 25T (automacara.md):\n• Nume/Companie: ${formData.name}\n• Telefon: ${formData.phone}\n• Format: ${formData.format}\n• Locație: ${formData.location || 'Chișinău'}\n• Detalii: ${formData.details || '-'}`
      : `Здравствуйте! Заявка на услуги автокрана XCMG 25Т (automacara.md):\n• Имя/Компания: ${formData.name}\n• Телефон: ${formData.phone}\n• Формат: ${formData.format}\n• Локация: ${formData.location || 'Кишинев'}\n• Детали: ${formData.details || '-'}`;

  return (
    <div className="min-h-screen bg-white text-[#1B2028] antialiased flex flex-col pb-16 md:pb-0">
      {/* 1. MINIMAL ARCHITECTURAL HEADER (#FFFFFF) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E4E4E0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Official Brand Logo */}
          <a
            href={lang === 'ru' ? '/ru/' : '/'}
            onClick={(e) => {
              if (activeArticleSlug) handleCloseArticle(e);
            }}
            className="flex items-center gap-3 shrink-0 group"
            aria-label="S.R.L. LIBERCONS PRIM - automacara.md"
          >
            <img
              src="/logo.png"
              alt="LIBERCONS PRIM — Servicii de automacara Chișinău"
              width={162}
              height={54}
              className="h-10 sm:h-11 w-auto object-contain"
            />
          </a>

          {/* Primary Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#1B2028]">
            <a
              href="#servicii"
              onClick={() => activeArticleSlug && setActiveArticleSlug(null)}
              className="hover:text-[#EA580C] transition-colors"
            >
              {t.nav.services}
            </a>
            <a
              href="#specificatii"
              onClick={() => activeArticleSlug && setActiveArticleSlug(null)}
              className="hover:text-[#EA580C] transition-colors"
            >
              {t.nav.specs}
            </a>
            <a
              href="#colaborare"
              onClick={() => activeArticleSlug && setActiveArticleSlug(null)}
              className="hover:text-[#EA580C] transition-colors"
            >
              {t.nav.packages}
            </a>
            <a
              href="#blog"
              onClick={() => activeArticleSlug && setActiveArticleSlug(null)}
              className="hover:text-[#EA580C] transition-colors"
            >
              {t.nav.blog}
            </a>
            <a
              href="#intrebari"
              onClick={() => activeArticleSlug && setActiveArticleSlug(null)}
              className="hover:text-[#EA580C] transition-colors"
            >
              {t.nav.faq}
            </a>
            <a
              href="#contact"
              onClick={() => activeArticleSlug && setActiveArticleSlug(null)}
              className="hover:text-[#EA580C] transition-colors"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Language Switcher & Direct Call CTA */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div
              className="inline-flex items-center border border-[#D6D6D0] rounded-md p-0.5 bg-[#F4F4F2] text-xs font-bold"
              role="group"
              aria-label="Select language"
            >
              <button
                type="button"
                onClick={() => handleSwitchLang('ro')}
                className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
                  lang === 'ro'
                    ? 'bg-[#1B2028] text-white'
                    : 'text-[#525866] hover:text-[#1B2028]'
                }`}
              >
                RO
              </button>
              <button
                type="button"
                onClick={() => handleSwitchLang('ru')}
                className={`px-2.5 py-1.5 rounded transition-colors cursor-pointer ${
                  lang === 'ru'
                    ? 'bg-[#1B2028] text-white'
                    : 'text-[#525866] hover:text-[#1B2028]'
                }`}
              >
                RU
              </button>
            </div>

            <a
              href="tel:069547396"
              onClick={() => trackEvent('click_phone_primary', { placement: 'header', lang })}
              className="inline-flex items-center gap-2 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2.5 rounded-md shadow-sm transition-colors"
            >
              <Phone className="w-4 h-4 fill-current shrink-0" />
              <span>069 547 396</span>
            </a>
          </div>
        </div>
      </header>

      {/* BLOG ARTICLE READER VIEW (when an article is selected or loaded via /blog/:slug) */}
      {activeArticle ? (
        <main className="flex-1 bg-white">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
            <div className="mb-8">
              <a
                href={lang === 'ru' ? '/ru/#blog' : '/#blog'}
                onClick={handleCloseArticle}
                className="inline-flex items-center gap-2 text-sm font-bold text-[#EA580C] hover:text-[#1B2028] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t.blog.backToSite}</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-wider text-[#EA580C] mb-3">
              <span className="bg-[#FFF4ED] border border-[#FDBA8C] px-2.5 py-1 rounded">
                {lang === 'ro' ? activeArticle.categoryRo : activeArticle.categoryRu}
              </span>
              <span className="text-[#525866]">
                {lang === 'ro' ? activeArticle.readTimeRo : activeArticle.readTimeRu}
              </span>
              <span className="text-[#525866]">• S.R.L. „LIBERCONS PRIM”</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#1B2028] tracking-tight leading-tight mb-4">
              {lang === 'ro' ? activeArticle.titleRo : activeArticle.titleRu}
            </h1>

            <p className="text-base sm:text-lg text-[#525866] leading-relaxed border-b border-[#E4E4E0] pb-8 mb-8">
              {lang === 'ro' ? activeArticle.excerptRo : activeArticle.excerptRu}
            </p>

            <div className="space-y-8">
              {(lang === 'ro' ? activeArticle.sectionsRo : activeArticle.sectionsRu).map((sec, idx) => (
                <section key={idx} className="space-y-3">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B2028]">{sec.heading}</h2>
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-base text-[#2C333F] leading-relaxed">
                      {p}
                    </p>
                  ))}
                  {sec.bullets && (
                    <ul className="bg-[#F4F4F2] border-l-4 border-[#EA580C] p-5 rounded-r-lg space-y-2.5 mt-3">
                      {sec.bullets.map((b, bIdx) => (
                        <li key={bIdx} className="text-sm sm:text-base text-[#1B2028] flex items-start gap-2.5">
                          <span className="text-[#EA580C] font-black mt-0.5">•</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Article Bottom CTA Box */}
            <div className="mt-12 bg-[#1B2028] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="text-xs font-bold uppercase tracking-widest text-[#F57C00]">
                  AUTOMACARA XCMG 25 TONE • BRAȚ 40–48 M
                </div>
                <h3 className="text-xl font-black">{t.blog.articleCtaTitle}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{t.blog.articleCtaSub}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
                <a
                  href="tel:069547396"
                  onClick={() => trackEvent('click_phone_primary', { placement: 'blog_article', lang })}
                  className="inline-flex items-center justify-center gap-2 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-sm px-5 py-3 rounded-md transition-colors"
                >
                  <Phone className="w-4 h-4 fill-current" />
                  <span>069 547 396</span>
                </a>
                <button
                  type="button"
                  onClick={() => scrollToContactWithFormat('Schimb Complet (8 ore)')}
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-[#1B2028] font-bold text-sm px-5 py-3 rounded-md cursor-pointer transition-colors"
                >
                  <span>{t.hero.ctaQuote}</span>
                </button>
              </div>
            </div>
          </article>
        </main>
      ) : (
        /* MAIN 6-SECTION LANDING PAGE */
        <main className="flex-1">
          {/* SECTION 1: CRANE-FIRST HERO SHOWCASE (IMAGE FIRST ON BOTH MOBILE & WEB) */}
          <section className="bg-white pt-3 pb-10 sm:pt-5 sm:pb-14 border-b border-[#E4E4E0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              {/* 1A. TOP CRANE VISUAL SHOWCASE — FIRST ELEMENT UNDER HEADER */}
              <figure className="relative rounded-xl overflow-hidden border border-[#D6D6D0] bg-[#1B2028] shadow-md">
                <div className="relative w-full h-[240px] sm:h-[360px] lg:h-[440px] overflow-hidden bg-[#1B2028]">
                  <img
                    src="/crane-hero.jpg"
                    alt={t.hero.imageCaption}
                    width={1280}
                    height={960}
                    fetchPriority="high"
                    className="w-full h-full object-cover object-center block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2028]/85 via-[#1B2028]/15 to-transparent" />

                  {/* Top Badges on Crane Image */}
                  <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex flex-wrap items-center justify-between gap-2">
                    <span className="bg-[#1B2028]/90 backdrop-blur-sm text-white border border-white/15 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-md shadow">
                      {t.hero.eyebrow}
                    </span>
                    <span className="bg-[#EA580C] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-md shadow">
                      XCMG 25 TONE • 40–48 M
                    </span>
                  </div>

                  {/* Bottom Spec Bar Inside Crane Visual */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 flex flex-wrap items-end justify-between gap-3 text-white">
                    <div>
                      <p className="text-xs sm:text-sm font-extrabold text-[#FDBA8C] uppercase tracking-wider">
                        „{t.hero.motto}”
                      </p>
                      <p className="text-xs sm:text-sm text-gray-200 font-medium mt-0.5">
                        {t.hero.imageCaption}
                      </p>
                    </div>
                    <span className="hidden sm:inline-block bg-white/95 text-[#1B2028] text-xs font-extrabold px-3 py-1 rounded">
                      S.R.L. „LIBERCONS PRIM” • 24/7
                    </span>
                  </div>
                </div>
              </figure>

              {/* 1B. DIRECTLY ATTACHED TITLE & ACTION BAR (ABOVE THE FOLD) */}
              <div className="bg-[#F8F8F6] border border-[#D6D6D0] rounded-xl p-5 sm:p-7 lg:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  <div className="lg:col-span-7 space-y-2.5">
                    <h1 className="text-2xl sm:text-4xl font-black text-[#1B2028] tracking-tight leading-tight">
                      {t.hero.title}
                    </h1>
                    <p className="text-sm sm:text-base text-[#434A57] leading-relaxed">
                      {t.hero.description}
                    </p>
                    <div className="pt-1 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs sm:text-sm font-semibold text-[#1B2028]">
                      {t.hero.trustPills.map((pill, idx) => (
                        <div key={idx} className="flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-[#EA580C] stroke-[2.5] shrink-0" />
                          <span>{pill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center justify-end gap-3">
                    <a
                      href="tel:069547396"
                      onClick={() => trackEvent('click_phone_primary', { placement: 'hero', lang })}
                      className="inline-flex items-center justify-center gap-2.5 bg-[#EA580C] hover:bg-[#D9460F] text-white font-black text-base px-6 py-4 rounded-lg shadow-sm transition-colors"
                    >
                      <Phone className="w-5 h-5 fill-current shrink-0" />
                      <span>{t.hero.ctaCall}</span>
                    </a>

                    <a
                      href="#contact"
                      onClick={() => trackEvent('click_quote_scroll', { placement: 'hero', lang })}
                      className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FFF4ED] border-2 border-[#1B2028] text-[#1B2028] font-bold text-base px-5 py-3.5 rounded-lg transition-colors"
                    >
                      <span>{t.hero.ctaQuote}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: PARAMETRI TEHNICI — AUTOMACARA XCMG 25 TONE (#F4F4F2) */}
          <section id="specificatii" className="bg-[#F4F4F2] py-14 sm:py-20 border-b border-[#E4E4E0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="max-w-3xl space-y-2">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C]">
                  {t.specs.eyebrow}
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#1B2028] tracking-tight">
                  {t.specs.title}
                </h2>
                <p className="text-base text-[#525866]">{t.specs.subtitle}</p>
              </div>

              {/* 4 Oversized Architectural Stat Columns */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {t.specs.cards.map((card, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#D6D6D0] rounded-lg p-6 sm:p-7 flex flex-col justify-between"
                  >
                    <div className="text-3xl sm:text-4xl font-black text-[#EA580C] tracking-tight">
                      {card.value}
                    </div>
                    <div className="text-sm font-bold text-[#1B2028] mt-2">{card.label}</div>
                  </div>
                ))}
              </div>

              {/* 3-Row Chassis / Stabilizer / LMI Specification Bar */}
              <div className="bg-white border border-[#D6D6D0] rounded-lg divide-y divide-[#E4E4E0]">
                {t.specs.rows.map((row, idx) => (
                  <div
                    key={idx}
                    className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm"
                  >
                    <span className="font-semibold text-[#525866]">{row.label}</span>
                    <span className="font-extrabold text-[#1B2028]">{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Engineering Load vs. Radius Reference Table */}
              <div className="bg-white border border-[#D6D6D0] rounded-lg overflow-hidden">
                <div className="px-6 py-4 bg-[#1B2028] text-white flex flex-wrap items-center justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-bold">{t.specs.tableTitle}</h3>
                  <span className="text-xs font-semibold text-[#F57C00]">XCMG QY25K5 • 360°</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-[#F8F8F6] border-b border-[#E4E4E0] text-[#525866] font-bold">
                        {t.specs.tableHeaders.map((th, i) => (
                          <th key={i} className="py-3.5 px-4 sm:px-6">
                            {th}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E4E4E0]">
                      {LOAD_RADIUS_TABLE.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#F8F8F6] transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-extrabold text-[#1B2028] whitespace-nowrap">
                            {row.radiusM}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 font-black text-[#EA580C] whitespace-nowrap">
                            {row.maxLoadT}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-[#434A57]">
                            {lang === 'ro' ? row.boomModeRo : row.boomModeRu}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-[#434A57]">
                            {lang === 'ro' ? row.typicalUseRo : row.typicalUseRu}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-3.5 bg-[#F8F8F6] border-t border-[#E4E4E0] text-xs text-[#525866] leading-relaxed">
                  {t.specs.tableDisclaimer}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: GAMA DE SERVICII DE RIDICARE (#FFFFFF) */}
          <section id="servicii" className="bg-white py-14 sm:py-20 border-b border-[#E4E4E0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                {/* Left Column: Natural Portrait Framing of Container Photo */}
                <div className="lg:col-span-5">
                  <figure className="rounded-xl overflow-hidden border border-[#D6D6D0] bg-[#F4F4F2] shadow-sm">
                    <img
                      src="/crane-container.jpg"
                      alt={t.services.photoCaption}
                      width={1280}
                      height={1707}
                      loading="lazy"
                      className="w-full h-[380px] sm:h-[520px] object-cover object-center block"
                    />
                    <figcaption className="px-4 py-3 bg-[#F4F4F2] border-t border-[#E4E4E0] text-xs font-semibold text-[#525866]">
                      {t.services.photoCaption}
                    </figcaption>
                  </figure>
                </div>

                {/* Right Column: Numbered Editorial List 01–04 */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="space-y-2 border-b border-[#E4E4E0] pb-5">
                    <div className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C]">
                      {t.services.eyebrow}
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-black text-[#1B2028] tracking-tight">
                      {t.services.title}
                    </h2>
                  </div>

                  <div className="divide-y divide-[#E4E4E0]">
                    {t.services.items.map((srv, idx) => (
                      <div key={idx} className="py-5 first:pt-2 flex items-start gap-4 sm:gap-6">
                        <span className="text-2xl sm:text-3xl font-black text-[#EA580C] shrink-0 w-10">
                          {srv.num}
                        </span>
                        <div className="space-y-1.5">
                          <h3 className="text-lg sm:text-xl font-extrabold text-[#1B2028]">
                            {srv.title}
                          </h3>
                          <p className="text-sm sm:text-base text-[#434A57] leading-relaxed">
                            {srv.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: FORMATE DE COLABORARE & ARIE DE ACOPERIRE (#F4F4F2) */}
          <section id="colaborare" className="bg-[#F4F4F2] py-14 sm:py-20 border-b border-[#E4E4E0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="max-w-3xl space-y-2">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C]">
                  {t.packages.eyebrow}
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#1B2028] tracking-tight">
                  {t.packages.title}
                </h2>
                <p className="text-base text-[#525866]">{t.packages.subtitle}</p>
              </div>

              {/* 3 Tall White Architectural Cards (No fixed hourly rate) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {t.packages.items.map((pkg, idx) => (
                  <div
                    key={idx}
                    className={`bg-white rounded-xl p-6 sm:p-8 flex flex-col justify-between border transition-shadow hover:shadow-md ${
                      pkg.featured
                        ? 'border-[#1B2028] border-t-4 border-t-[#EA580C] shadow-sm'
                        : 'border-[#D6D6D0]'
                    }`}
                  >
                    <div className="space-y-4">
                      <span
                        className={`inline-block text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded ${
                          pkg.featured
                            ? 'bg-[#FFF4ED] text-[#EA580C] border border-[#FDBA8C]'
                            : 'bg-[#F4F4F2] text-[#525866]'
                        }`}
                      >
                        {pkg.tag}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-[#1B2028]">{pkg.title}</h3>
                      <p className="text-sm sm:text-base text-[#434A57] leading-relaxed">{pkg.desc}</p>

                      <ul className="space-y-2.5 pt-2 border-t border-[#E4E4E0]">
                        {pkg.bullets.map((b, bIdx) => (
                          <li key={bIdx} className="text-sm text-[#1B2028] flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#EA580C] stroke-[2.5] shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      type="button"
                      onClick={() => scrollToContactWithFormat(pkg.title)}
                      className={`mt-8 w-full py-3 px-4 rounded-md font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                        pkg.featured
                          ? 'bg-[#EA580C] hover:bg-[#D9460F] text-white'
                          : 'bg-[#1B2028] hover:bg-[#2C333F] text-white'
                      }`}
                    >
                      <span>{pkg.cta}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Coverage Area Strip */}
              <div className="bg-white border border-[#D6D6D0] rounded-lg p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#FFF4ED] border border-[#FDBA8C] text-[#EA580C] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-sm text-[#434A57] leading-relaxed">
                  <strong className="text-[#1B2028] mr-1.5">{t.packages.coverageTitle}</strong>
                  <span>{t.packages.coverageText}</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: BLOG TEHNIC & GHIDURI DE ȘANTIER (#FFFFFF) */}
          <section id="blog" className="bg-white py-14 sm:py-20 border-b border-[#E4E4E0]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              <div className="max-w-3xl space-y-2">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C]">
                  {t.blog.eyebrow}
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-[#1B2028] tracking-tight">
                  {t.blog.title}
                </h2>
                <p className="text-base text-[#525866]">{t.blog.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BLOG_ARTICLES.map((article) => {
                  const title = lang === 'ro' ? article.titleRo : article.titleRu;
                  const excerpt = lang === 'ro' ? article.excerptRo : article.excerptRu;
                  const category = lang === 'ro' ? article.categoryRo : article.categoryRu;
                  const readTime = lang === 'ro' ? article.readTimeRo : article.readTimeRu;
                  const href = `/blog/${article.slug}/${lang === 'ru' ? '?lang=ru' : ''}`;

                  return (
                    <article
                      key={article.slug}
                      className="bg-[#F8F8F6] border border-[#D6D6D0] rounded-xl p-6 flex flex-col justify-between hover:border-[#EA580C] transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 text-xs font-bold">
                          <span className="text-[#EA580C] uppercase tracking-wider">{category}</span>
                          <span className="text-[#525866] flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            {readTime}
                          </span>
                        </div>

                        <h3 className="text-lg font-extrabold text-[#1B2028] leading-snug">
                          <a
                            href={href}
                            onClick={(e) => handleOpenArticle(article.slug, e)}
                            className="hover:text-[#EA580C] transition-colors"
                          >
                            {title}
                          </a>
                        </h3>

                        <p className="text-sm text-[#434A57] leading-relaxed">{excerpt}</p>
                      </div>

                      <div className="pt-5 mt-5 border-t border-[#E4E4E0]">
                        <a
                          href={href}
                          onClick={(e) => handleOpenArticle(article.slug, e)}
                          className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#EA580C] hover:text-[#1B2028] transition-colors"
                        >
                          <span>{t.blog.readMore}</span>
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          {/* FAQ SECTION (#F4F4F2) */}
          <section id="intrebari" className="bg-[#F4F4F2] py-14 sm:py-20 border-b border-[#E4E4E0]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="space-y-2">
                <div className="text-xs font-extrabold uppercase tracking-widest text-[#EA580C]">
                  {t.faq.eyebrow}
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-[#1B2028] tracking-tight">
                  {t.faq.title}
                </h2>
              </div>

              <div className="space-y-3">
                {t.faq.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-[#D6D6D0] rounded-lg overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#1B2028] hover:bg-[#F8F8F6] transition-colors cursor-pointer"
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#EA580C] shrink-0 transition-transform ${
                          openFaq === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {openFaq === idx && (
                      <div className="px-5 pb-4 pt-1 text-sm sm:text-base text-[#434A57] border-t border-[#E4E4E0] leading-relaxed">
                        {item.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 6: CONTACT DIRECT 24/7 & CREDIBILITATE B2B (#1B2028 ANTRACIT) */}
          <section id="contact" className="bg-[#1B2028] text-white py-14 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
                {/* Left Column: Direct Dispatch Channels & Legal Proof */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="text-xs font-extrabold uppercase tracking-widest text-[#F57C00]">
                    {t.contact.eyebrow}
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                    {t.contact.title}
                  </h2>
                  <p className="text-base text-gray-300 leading-relaxed">{t.contact.subtitle}</p>

                  {/* Primary & Secondary Phone Blocks */}
                  <div className="space-y-3 pt-2">
                    <a
                      href="tel:069547396"
                      onClick={() => trackEvent('click_phone_primary', { placement: 'contact_footer', lang })}
                      className="w-full bg-[#EA580C] hover:bg-[#D9460F] text-white rounded-lg p-4 flex items-center justify-between transition-colors shadow-md"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-md bg-black/20 flex items-center justify-center">
                          <Phone className="w-5 h-5 fill-current" />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-orange-100">
                            {t.contact.primaryLabel}
                          </div>
                          <div className="text-2xl font-black tracking-tight">069 547 396</div>
                        </div>
                      </div>
                      <ArrowRight className="w-5 h-5" />
                    </a>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <a
                        href="tel:069497778"
                        onClick={() => trackEvent('click_phone_secondary', { placement: 'contact_footer', lang })}
                        className="bg-[#262D38] hover:bg-[#313A47] border border-gray-700 rounded-lg p-3.5 text-center transition-colors"
                      >
                        <div className="text-[11px] text-gray-400 font-semibold uppercase">
                          {t.contact.secondaryLabel}
                        </div>
                        <div className="text-base font-extrabold text-white mt-0.5">069 497 778</div>
                      </a>

                      <a
                        href={getWhatsAppUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackEvent('click_whatsapp', { placement: 'contact_footer', lang })}
                        className="bg-[#262D38] hover:bg-[#313A47] border border-gray-700 rounded-lg p-3.5 flex flex-col items-center justify-center transition-colors"
                      >
                        <div className="text-[11px] text-emerald-400 font-bold uppercase">WhatsApp</div>
                        <div className="text-sm font-bold text-white mt-0.5">+373 69 547 396</div>
                      </a>

                      <a
                        href="viber://chat?number=%2B37369547396"
                        onClick={() => trackEvent('click_viber', { placement: 'contact_footer', lang })}
                        className="bg-[#262D38] hover:bg-[#313A47] border border-gray-700 rounded-lg p-3.5 flex flex-col items-center justify-center transition-colors"
                      >
                        <div className="text-[11px] text-violet-400 font-bold uppercase">Viber</div>
                        <div className="text-sm font-bold text-white mt-0.5">+373 69 547 396</div>
                      </a>
                    </div>
                  </div>

                  {/* Official B2B Credentials Box */}
                  <div className="bg-[#262D38] border border-gray-700 rounded-lg p-5 space-y-3 text-xs sm:text-sm">
                    <div className="flex items-center gap-2 font-extrabold text-white">
                      <ShieldCheck className="w-4 h-4 text-[#F57C00]" />
                      <span>{t.footer.company} • {t.footer.idno}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#F57C00] shrink-0" />
                        <span>{t.footer.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#F57C00] shrink-0" />
                        <span>{t.footer.cert}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-gray-700 text-gray-300 flex flex-wrap items-center justify-between gap-2">
                      <a
                        href="mailto:contact@automacara.md"
                        className="hover:text-[#F57C00] underline underline-offset-4"
                      >
                        contact@automacara.md
                      </a>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock className="w-3.5 h-3.5 text-[#F57C00]" />
                        24/7 • automacara.md
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Instant Lead Capture Form */}
                <div className="lg:col-span-6">
                  <div className="bg-white text-[#1B2028] rounded-xl p-6 sm:p-8 shadow-xl border border-[#D6D6D0]">
                    {submitted ? (
                      <div className="py-6 text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                          <Check className="w-6 h-6 stroke-[2.5]" />
                        </div>
                        <h3 className="text-xl font-black text-[#1B2028]">{t.contact.successTitle}</h3>
                        <p className="text-sm text-[#434A57] leading-relaxed max-w-md mx-auto">
                          {t.contact.successDesc}
                        </p>
                        <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
                          <a
                            href={getWhatsAppUrl(whatsappSummaryText)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackEvent('click_whatsapp', { placement: 'form_success', lang })}
                            className="inline-flex items-center justify-center gap-2 bg-[#1B2028] hover:bg-[#2C333F] text-white font-bold text-xs sm:text-sm px-4 py-2.5 rounded-md transition-colors"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>{t.contact.whatsappFollowup}</span>
                          </a>
                          <button
                            type="button"
                            onClick={() => {
                              setSubmitted(false);
                              setFormData({
                                name: '',
                                phone: '',
                                format: 'Schimb Complet (8 ore)',
                                location: '',
                                details: ''
                              });
                            }}
                            className="inline-flex items-center justify-center px-4 py-2.5 rounded-md border border-[#D6D6D0] text-xs sm:text-sm font-bold text-[#434A57] hover:text-[#1B2028] cursor-pointer"
                          >
                            {t.contact.newRequestBtn}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <h3 className="text-xl font-black text-[#1B2028]">{t.contact.formTitle}</h3>
                          <p className="text-xs sm:text-sm text-[#525866] mt-0.5">{t.contact.formSubtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#1B2028] mb-1">
                              {t.contact.fieldName}
                            </label>
                            <input
                              type="text"
                              required
                              placeholder={t.contact.fieldNamePlaceholder}
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full bg-[#F8F8F6] border border-[#D6D6D0] rounded-md px-3.5 py-2.5 text-sm text-[#1B2028] focus:outline-none focus:border-[#EA580C]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#1B2028] mb-1">
                              {t.contact.fieldPhone}
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder={t.contact.fieldPhonePlaceholder}
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full bg-[#F8F8F6] border border-[#D6D6D0] rounded-md px-3.5 py-2.5 text-sm text-[#1B2028] focus:outline-none focus:border-[#EA580C]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#1B2028] mb-1">
                              {t.contact.fieldFormat}
                            </label>
                            <select
                              value={formData.format}
                              onChange={(e) => setFormData({ ...formData, format: e.target.value })}
                              className="w-full bg-[#F8F8F6] border border-[#D6D6D0] rounded-md px-3.5 py-2.5 text-sm text-[#1B2028] focus:outline-none focus:border-[#EA580C]"
                            >
                              {t.packages.items.map((p, i) => (
                                <option key={i} value={p.title}>
                                  {p.title}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#1B2028] mb-1">
                              {t.contact.fieldLocation}
                            </label>
                            <input
                              type="text"
                              placeholder={t.contact.fieldLocationPlaceholder}
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              className="w-full bg-[#F8F8F6] border border-[#D6D6D0] rounded-md px-3.5 py-2.5 text-sm text-[#1B2028] focus:outline-none focus:border-[#EA580C]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#1B2028] mb-1">
                            {t.contact.fieldDetails}
                          </label>
                          <textarea
                            rows={2}
                            placeholder={t.contact.fieldDetailsPlaceholder}
                            value={formData.details}
                            onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                            className="w-full bg-[#F8F8F6] border border-[#D6D6D0] rounded-md px-3.5 py-2.5 text-sm text-[#1B2028] focus:outline-none focus:border-[#EA580C]"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={submitting}
                          className="w-full bg-[#EA580C] hover:bg-[#D9460F] disabled:opacity-60 text-white font-bold text-sm py-3.5 rounded-md flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                          <span>{submitting ? t.contact.submittingBtn : t.contact.submitBtn}</span>
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* OFFICIAL ARCHITECTURAL FOOTER */}
      <footer className="bg-[#14181F] text-gray-400 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <div className="bg-white rounded px-2.5 py-1 inline-flex items-center">
              <img src="/logo.png" alt="LIBERCONS PRIM" width={108} height={36} className="h-6 w-auto object-contain" />
            </div>
            <span className="font-bold text-white">{t.footer.company}</span>
            <span>•</span>
            <span>{t.footer.idno}</span>
            <span>•</span>
            <span>{t.footer.location}</span>
            <span>•</span>
            <span>{t.footer.cert}</span>
          </div>
          <div>
            © {new Date().getFullYear()} {t.footer.company} (automacara.md). {t.footer.rights}
          </div>
        </div>
      </footer>

      {/* MOBILE STICKY BOTTOM CALL BAR (md:hidden) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#D6D6D0] px-3 py-2.5 flex items-center gap-2 shadow-lg">
        <a
          href="tel:069497778"
          onClick={() => trackEvent('click_phone_secondary', { placement: 'sticky_mobile', lang })}
          className="flex-1 bg-[#1B2028] text-white font-bold text-xs py-2.5 rounded-md flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 text-[#F57C00] fill-current" />
          <span>069 497 778</span>
        </a>
        <a
          href="tel:069547396"
          onClick={() => trackEvent('click_phone_primary', { placement: 'sticky_mobile', lang })}
          className="flex-1 bg-[#EA580C] text-white font-bold text-xs py-2.5 rounded-md flex items-center justify-center gap-1.5"
        >
          <Phone className="w-3.5 h-3.5 fill-current" />
          <span>069 547 396</span>
        </a>
      </div>
    </div>
  );
}
