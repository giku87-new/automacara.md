import fs from 'node:fs';
import path from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.tsx';
import { BLOG_ARTICLES, UI_CONTENT } from '../src/content.ts';

const distDir = path.resolve(process.cwd(), 'dist');
const templatePath = path.join(distDir, 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('dist/index.html not found. Run vite build first.');
  process.exit(1);
}

const baseTemplate = fs.readFileSync(templatePath, 'utf-8');

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildPageHtml(opts: {
  lang: 'ro' | 'ru';
  title: string;
  description: string;
  canonicalUrl: string;
  appHtml: string;
  extraSchemaJson?: string;
}): string {
  let html = baseTemplate;

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${opts.lang}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(opts.title)}</title>`);
  html = html.replace(
    /<meta name="title" content="[^"]*" \/>/,
    `<meta name="title" content="${escapeHtml(opts.title)}" />`
  );
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(opts.description)}" />`
  );
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${opts.canonicalUrl}" />`
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${opts.canonicalUrl}" />`
  );
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(opts.title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(opts.description)}" />`
  );
  html = html.replace(
    /<meta name="twitter:url" content="[^"]*" \/>/,
    `<meta name="twitter:url" content="${opts.canonicalUrl}" />`
  );
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escapeHtml(opts.title)}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escapeHtml(opts.description)}" />`
  );

  if (opts.lang === 'ru') {
    html = html.replace(
      /<meta property="og:locale" content="ro_MD" \/>/,
      `<meta property="og:locale" content="ru_MD" />`
    );
  }

  if (opts.extraSchemaJson) {
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${opts.extraSchemaJson}</script>\n  </head>`
    );
  }

  html = html.replace('<div id="root"></div>', `<div id="root">${opts.appHtml}</div>`);
  return html;
}

// 1. Pre-render Romanian Homepage (/)
const roHtml = renderToString(React.createElement(App, { initialLang: 'ro', initialArticleSlug: null }));
const roOut = buildPageHtml({
  lang: 'ro',
  title: UI_CONTENT.ro.metaTitle,
  description: UI_CONTENT.ro.metaDesc,
  canonicalUrl: 'https://automacara.md/',
  appHtml: roHtml
});
fs.writeFileSync(path.join(distDir, 'index.html'), roOut, 'utf-8');

// 2. Pre-render Russian Homepage (/ru/)
const ruDir = path.join(distDir, 'ru');
fs.mkdirSync(ruDir, { recursive: true });
const ruHtml = renderToString(React.createElement(App, { initialLang: 'ru', initialArticleSlug: null }));
const ruOut = buildPageHtml({
  lang: 'ru',
  title: UI_CONTENT.ru.metaTitle,
  description: UI_CONTENT.ru.metaDesc,
  canonicalUrl: 'https://automacara.md/ru/',
  appHtml: ruHtml
});
fs.writeFileSync(path.join(ruDir, 'index.html'), ruOut, 'utf-8');

// 3. Pre-render Dedicated Blog Articles (/blog/<slug>/)
for (const article of BLOG_ARTICLES) {
  const articleDir = path.join(distDir, 'blog', article.slug);
  fs.mkdirSync(articleDir, { recursive: true });
  const articleAppHtml = renderToString(
    React.createElement(App, { initialLang: 'ro', initialArticleSlug: article.slug })
  );
  const canonicalUrl = `https://automacara.md/blog/${article.slug}/`;
  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.titleRo,
    description: article.metaDescRo,
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    mainEntityOfPage: canonicalUrl,
    image: 'https://automacara.md/crane-hero.jpg',
    author: {
      '@type': 'Organization',
      name: 'S.R.L. „LIBERCONS PRIM”',
      url: 'https://automacara.md/'
    },
    publisher: {
      '@type': 'Organization',
      name: 'S.R.L. „LIBERCONS PRIM”',
      logo: {
        '@type': 'ImageObject',
        url: 'https://automacara.md/logo.png'
      }
    }
  });

  const articleOut = buildPageHtml({
    lang: 'ro',
    title: `${article.titleRo} | automacara.md`,
    description: article.metaDescRo,
    canonicalUrl,
    appHtml: articleAppHtml,
    extraSchemaJson: articleSchema
  });
  fs.writeFileSync(path.join(articleDir, 'index.html'), articleOut, 'utf-8');
}

console.log(
  JSON.stringify({
    message: 'Static pre-rendering complete',
    routes: [
      '/',
      '/ru/',
      ...BLOG_ARTICLES.map((a) => `/blog/${a.slug}/`)
    ]
  })
);
