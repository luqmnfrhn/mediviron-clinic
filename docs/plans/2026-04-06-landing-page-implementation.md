# Clinic Mediviron Jalan Imbi — Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a warm, trust-focused clinic landing page with WhatsApp CTA, services, panel section, FAQ, Google Maps, and 6 local SEO subpages using Astro 6 + Tailwind CSS v4.

**Architecture:** Single main landing page (`/`) with all sections stacked vertically for maximum conversion flow, plus 6 separate `/near-[landmark].astro` local SEO pages sharing a common `SeoPageLayout.astro`. All UI is built as reusable Astro components.

**Tech Stack:** Astro 6, Tailwind CSS v4, Google Fonts (Lexend + Source Sans 3), Lucide icons (via inline SVG), no JS frameworks.

**Design System:** See `design-system/clinic-mediviron-jalan-imbi/MASTER.md` for full color/typography/spacing rules.

**Colors:**
- Primary: `#0D9488` (teal)
- Secondary: `#14B8A6`
- CTA: `#F97316` (orange)
- Background: `#F0FDFA`
- Text: `#134E4A`

---

## Task 1: Install Tailwind CSS v4 and configure fonts

**Files:**
- Modify: `astro.config.mjs`
- Modify: `package.json`
- Create: `src/styles/global.css`
- Modify: `src/layouts/Layout.astro`

**Step 1: Install Tailwind CSS v4 for Astro**

```bash
npm install @astrojs/tailwind tailwindcss@next @tailwindcss/vite
```

**Step 2: Update `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Step 3: Create `src/styles/global.css`**

```css
@import "tailwindcss";

@theme {
  --color-primary: #0D9488;
  --color-primary-dark: #0F766E;
  --color-secondary: #14B8A6;
  --color-cta: #F97316;
  --color-cta-dark: #EA6C00;
  --color-bg: #F0FDFA;
  --color-text: #134E4A;
  --color-muted: #4B7C78;
  --font-heading: 'Lexend', sans-serif;
  --font-body: 'Source Sans 3', sans-serif;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg);
  color: var(--color-text);
  font-size: 1rem;
  line-height: 1.6;
}

h1, h2, h3, h4 {
  font-family: var(--font-heading);
}
```

**Step 4: Replace `src/layouts/Layout.astro`**

```astro
---
interface Props {
  title?: string;
  description?: string;
}
const {
  title = 'Clinic Mediviron Jalan Imbi | Family Clinic KL',
  description = 'Trusted family clinic in Jalan Imbi, Kuala Lumpur. General practice, ECG, ultrasound. Walk-ins welcome. Book via WhatsApp.',
} = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="/src/styles/global.css" />
  </head>
  <body>
    <slot />
  </body>
</html>
```

**Step 5: Start dev server to verify Tailwind loads**

```bash
npm run dev
```

Expected: Dev server starts on `http://localhost:4321` with no errors.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: install Tailwind CSS v4 and configure design tokens + Google Fonts"
```

---

## Task 2: Build Header component

**Files:**
- Create: `src/components/Header.astro`

**Step 1: Create `src/components/Header.astro`**

```astro
---
// Sticky navbar with logo + WhatsApp CTA
---
<header class="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-teal-100 shadow-sm">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 font-heading font-semibold text-primary text-lg cursor-pointer">
      <!-- Replace img src with actual logo once provided -->
      <span class="text-xl font-bold" style="color: #0D9488;">Mediviron</span>
      <span class="hidden sm:inline text-sm font-normal text-muted">Jalan Imbi</span>
    </a>

    <!-- Nav links (desktop) -->
    <nav class="hidden md:flex items-center gap-6 text-sm font-medium" style="color: #134E4A;">
      <a href="#services" class="hover:text-primary transition-colors duration-200 cursor-pointer">Services</a>
      <a href="#panel" class="hover:text-primary transition-colors duration-200 cursor-pointer">Panel</a>
      <a href="#faq" class="hover:text-primary transition-colors duration-200 cursor-pointer">FAQ</a>
      <a href="#location" class="hover:text-primary transition-colors duration-200 cursor-pointer">Location</a>
    </nav>

    <!-- WhatsApp CTA -->
    <a
      href="https://wa.me/60XXXXXXXXXX"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-white cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cta motion-reduce:transition-none"
      style="background-color: #25D366;"
      aria-label="Book appointment via WhatsApp"
    >
      <!-- WhatsApp icon -->
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
      <span class="hidden sm:inline">Book Appointment</span>
      <span class="sm:hidden">WhatsApp</span>
    </a>
  </div>
</header>
```

**Step 2: Import Header in `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
---
<Layout>
  <Header />
  <main>
    <!-- sections will go here -->
  </main>
</Layout>
```

**Step 3: Verify in browser**

Open `http://localhost:4321`. Header should be visible, sticky, with WhatsApp button.

**Step 4: Commit**

```bash
git add src/components/Header.astro src/pages/index.astro
git commit -m "feat: add sticky Header with logo and WhatsApp CTA"
```

---

## Task 3: Build Hero section

**Files:**
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create `src/components/Hero.astro`**

```astro
---
// Full-viewport hero with clinic name, tagline, and WhatsApp CTA
---
<section class="min-h-[90vh] flex items-center" style="background: linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 50%, #99F6E4 100%);">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
    <!-- Text -->
    <div>
      <span class="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4" style="background-color: #CCFBF1; color: #0D9488;">
        Walk-ins Welcome
      </span>
      <h1 class="text-4xl sm:text-5xl font-bold leading-tight mb-4" style="font-family: var(--font-heading); color: #134E4A;">
        Your Trusted Family Clinic in Jalan Imbi
      </h1>
      <p class="text-lg mb-8" style="color: #4B7C78; line-height: 1.75;">
        Caring for you and your family with modern facilities, experienced doctors, and a friendly team — right in the heart of KL.
      </p>
      <div class="flex flex-col sm:flex-row gap-4">
        <a
          href="https://wa.me/60XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white text-lg cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400 motion-reduce:transition-none"
          style="background-color: #F97316;"
          aria-label="Book appointment via WhatsApp"
        >
          Book Appointment via WhatsApp
        </a>
        <a
          href="#services"
          class="flex items-center justify-center px-6 py-3 rounded-full font-semibold border-2 cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 motion-reduce:transition-none"
          style="border-color: #0D9488; color: #0D9488;"
        >
          Our Services
        </a>
      </div>
    </div>

    <!-- Illustration placeholder -->
    <div class="hidden md:flex items-center justify-center">
      <div
        class="w-80 h-80 rounded-3xl flex items-center justify-center text-center p-8"
        style="background-color: white; color: #4B7C78; border: 2px dashed #14B8A6;"
      >
        <p class="text-sm">Clinic photo or illustration<br/>(replace with actual image)</p>
      </div>
    </div>
  </div>

  <!-- Scroll indicator -->
  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce motion-reduce:animate-none" aria-hidden="true">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#0D9488" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>
</section>
```

**Step 2: Add Hero to `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
---
<Layout>
  <Header />
  <main>
    <Hero />
  </main>
</Layout>
```

**Step 3: Commit**

```bash
git add src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add Hero section with WhatsApp CTA and gradient background"
```

---

## Task 4: Build Trust Bar

**Files:**
- Create: `src/components/TrustBar.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create `src/components/TrustBar.astro`**

```astro
---
const trustItems = [
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`,
    label: 'Friendly & Experienced Doctors',
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>`,
    label: 'ECG & Ultrasound On-Site',
  },
  {
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    label: 'Walk-ins Welcome',
  },
];
---
<div style="background-color: #0D9488;">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <div class="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12">
      {trustItems.map((item) => (
        <div class="flex items-center gap-2 text-white text-sm font-medium">
          <span style="color: #99F6E4;" set:html={item.icon} />
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  </div>
</div>
```

**Step 2: Add TrustBar to `index.astro` after Hero**

**Step 3: Commit**

```bash
git add src/components/TrustBar.astro src/pages/index.astro
git commit -m "feat: add TrustBar with clinic trust signals"
```

---

## Task 5: Build ServiceCard + Services section

**Files:**
- Create: `src/components/ServiceCard.astro`
- Create: `src/components/Services.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create `src/components/ServiceCard.astro`**

```astro
---
interface Props {
  icon: string;
  title: string;
  description: string;
}
const { icon, title, description } = Astro.props;
---
<div class="bg-white rounded-2xl p-6 shadow-sm border border-teal-100 hover:shadow-md transition-shadow duration-200 flex flex-col gap-4 cursor-default">
  <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background-color: #F0FDFA; color: #0D9488;">
    <span set:html={icon} />
  </div>
  <h3 class="text-xl font-semibold" style="font-family: var(--font-heading); color: #134E4A;">{title}</h3>
  <p class="text-sm leading-relaxed" style="color: #4B7C78;">{description}</p>
  <a
    href="https://wa.me/60XXXXXXXXXX"
    target="_blank"
    rel="noopener noreferrer"
    class="mt-auto text-sm font-semibold cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-teal-500 motion-reduce:transition-none"
    style="color: #0D9488;"
    aria-label={`Ask about ${title} via WhatsApp`}
  >
    Ask via WhatsApp →
  </a>
</div>
```

**Step 2: Create `src/components/Services.astro`**

```astro
---
import ServiceCard from './ServiceCard.astro';

const services = [
  {
    title: 'General Practice',
    description: 'From common illnesses to chronic condition management — our GPs are here for your everyday health needs, including MC, referrals, and health screenings.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`,
  },
  {
    title: 'ECG (Electrocardiogram)',
    description: 'On-site ECG testing for heart health monitoring, pre-employment checks, and management of cardiac conditions — fast results, no referral needed.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12h4l3-9 4 18 3-9h4" /></svg>`,
  },
  {
    title: 'Ultrasound',
    description: 'Safe, non-invasive ultrasound imaging available in-clinic for abdominal, pelvic, and soft tissue assessments by our trained medical team.',
    icon: `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9l-6-6z" /><path stroke-linecap="round" stroke-linejoin="round" d="M9 3v6h6" /></svg>`,
  },
];
---
<section id="services" class="py-20" style="background-color: #F0FDFA;">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold mb-3" style="font-family: var(--font-heading); color: #134E4A;">Our Services</h2>
      <p class="text-lg max-w-xl mx-auto" style="color: #4B7C78;">Modern equipment, experienced doctors, and care you can trust.</p>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      {services.map((service) => <ServiceCard {...service} />)}
    </div>
  </div>
</section>
```

**Step 3: Add Services to `index.astro`**

**Step 4: Commit**

```bash
git add src/components/ServiceCard.astro src/components/Services.astro src/pages/index.astro
git commit -m "feat: add Services section with 3 service cards"
```

---

## Task 6: Build Panel / Insurance section

**Files:**
- Create: `src/components/Panel.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create `src/components/Panel.astro`**

```astro
---
// Placeholder panel companies — replace with actual logos/names
const panels = [
  'Panel A', 'Panel B', 'Panel C', 'Panel D',
  'Panel E', 'Panel F', 'Panel G', 'Panel H',
];
---
<section id="panel" class="py-20 bg-white">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold mb-3" style="font-family: var(--font-heading); color: #134E4A;">Panel & Insurance Accepted</h2>
      <p class="text-lg" style="color: #4B7C78;">We work with major insurance providers and corporate panels.</p>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {panels.map((name) => (
        <div class="flex items-center justify-center h-16 rounded-xl border border-teal-100 bg-teal-50 text-sm font-medium" style="color: #4B7C78;">
          {name}
        </div>
      ))}
    </div>
    <p class="text-center text-sm" style="color: #4B7C78;">
      Don't see your panel?{' '}
      <a
        href="https://wa.me/60XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        class="font-semibold underline cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-teal-500 motion-reduce:transition-none"
        style="color: #0D9488;"
      >
        Contact us to check
      </a>
      .
    </p>
  </div>
</section>
```

**Step 2: Add Panel to `index.astro` after Services**

**Step 3: Commit**

```bash
git add src/components/Panel.astro src/pages/index.astro
git commit -m "feat: add Panel/Insurance section with placeholder company grid"
```

---

## Task 7: Build About / Why Choose Us section

**Files:**
- Create: `src/components/About.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create `src/components/About.astro`**

```astro
---
---
<section class="py-20" style="background-color: #F0FDFA;">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
    <!-- Text -->
    <div>
      <h2 class="text-3xl sm:text-4xl font-bold mb-4" style="font-family: var(--font-heading); color: #134E4A;">Why Choose Us</h2>
      <p class="text-lg mb-6" style="color: #4B7C78; line-height: 1.75;">
        Clinic Mediviron Jalan Imbi is a trusted community clinic serving residents and professionals in the heart of Kuala Lumpur. Our team of experienced doctors is committed to delivering compassionate, personalised care — from routine checkups to specialist diagnostics like ECG and ultrasound.
      </p>
      <ul class="space-y-3 text-sm" style="color: #4B7C78;">
        {[
          'Walk-in and appointment-based consultations',
          'On-site ECG and ultrasound diagnostics',
          'Panel and corporate insurance accepted',
          'Medical certificates (MC) issued same-day',
          'Conveniently located near TRX, Pavilion, and Bukit Bintang',
        ].map((point) => (
          <li class="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#0D9488" stroke-width="2" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>

    <!-- Photo placeholder -->
    <div class="flex items-center justify-center">
      <div
        class="w-full max-w-sm h-72 rounded-3xl flex items-center justify-center text-center p-8"
        style="background-color: white; color: #4B7C78; border: 2px dashed #14B8A6;"
      >
        <p class="text-sm">Clinic interior or team photo<br/>(replace with actual image)</p>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Add About to `index.astro` after Panel**

**Step 3: Commit**

```bash
git add src/components/About.astro src/pages/index.astro
git commit -m "feat: add About/Why Choose Us section"
```

---

## Task 8: Build FAQ accordion

**Files:**
- Create: `src/components/FAQItem.astro`
- Create: `src/components/FAQ.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create `src/components/FAQItem.astro`**

```astro
---
interface Props {
  question: string;
  answer: string;
  id: string;
}
const { question, answer, id } = Astro.props;
---
<details class="group border-b border-teal-100 py-4">
  <summary
    class="flex items-center justify-between cursor-pointer text-base font-semibold list-none"
    style="color: #134E4A;"
    id={`faq-${id}`}
  >
    <span>{question}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 shrink-0 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
      fill="none"
      viewBox="0 0 24 24"
      stroke="#0D9488"
      stroke-width="2"
      aria-hidden="true"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </summary>
  <p class="mt-3 text-sm leading-relaxed" style="color: #4B7C78;">{answer}</p>
</details>
```

**Step 2: Create `src/components/FAQ.astro`**

```astro
---
import FAQItem from './FAQItem.astro';

const faqs = [
  {
    question: 'What are your operating hours?',
    answer: 'We are open Monday to Friday, 8:30am – 6:00pm, and Saturday 8:30am – 1:00pm. Please contact us via WhatsApp to confirm public holiday hours.',
  },
  {
    question: 'Do I need an appointment?',
    answer: 'Walk-ins are welcome! For a shorter wait, you can book an appointment via WhatsApp before coming in.',
  },
  {
    question: 'What panels and insurance do you accept?',
    answer: 'We accept a range of corporate panels and insurance providers. Please check with us via WhatsApp or see the panel list on this page. If your provider is not listed, do contact us — we may still be able to assist.',
  },
  {
    question: 'Can I get a medical certificate (MC) here?',
    answer: 'Yes. MCs are issued same-day after consultation with our doctor.',
  },
  {
    question: 'Do you offer ECG and Ultrasound without a referral?',
    answer: 'Yes. ECG and Ultrasound are available on-site and can be arranged during your visit without a prior referral.',
  },
  {
    question: 'Is parking available nearby?',
    answer: 'Parking is available at several nearby commercial buildings along Jalan Imbi. Street parking may also be available subject to availability.',
  },
  {
    question: 'Where exactly are you located?',
    answer: 'We are located along Jalan Imbi, Kuala Lumpur — close to TRX City, Pavilion KL, and Bukit Bintang. See the map below for exact directions.',
  },
  {
    question: 'How do I contact the clinic?',
    answer: 'The fastest way to reach us is via WhatsApp. You can also call us during operating hours.',
  },
];
---
<section id="faq" class="py-20 bg-white">
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold mb-3" style="font-family: var(--font-heading); color: #134E4A;">Frequently Asked Questions</h2>
      <p class="text-lg" style="color: #4B7C78;">Everything you need to know before your visit.</p>
    </div>
    <div>
      {faqs.map((faq, i) => <FAQItem question={faq.question} answer={faq.answer} id={String(i)} />)}
    </div>
  </div>
</section>
```

**Step 3: Add FAQ to `index.astro`**

**Step 4: Commit**

```bash
git add src/components/FAQItem.astro src/components/FAQ.astro src/pages/index.astro
git commit -m "feat: add FAQ accordion with 8 common questions"
```

---

## Task 9: Build Location & Contact section

**Files:**
- Create: `src/components/Location.astro`
- Modify: `src/pages/index.astro`

**Step 1: Create `src/components/Location.astro`**

```astro
---
---
<section id="location" class="py-20" style="background-color: #F0FDFA;">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-12">
      <h2 class="text-3xl sm:text-4xl font-bold mb-3" style="font-family: var(--font-heading); color: #134E4A;">Find Us</h2>
      <p class="text-lg" style="color: #4B7C78;">Located in the heart of KL, close to TRX, Pavilion, and Bukit Bintang.</p>
    </div>
    <div class="grid md:grid-cols-2 gap-8 items-start">
      <!-- Map -->
      <div class="rounded-2xl overflow-hidden shadow-sm border border-teal-100 h-80 flex items-center justify-center bg-teal-50" style="color: #4B7C78;">
        <!-- Replace this div with actual Google Maps embed iframe -->
        <p class="text-sm text-center px-8">Google Maps embed placeholder<br/>Replace with: &lt;iframe src="YOUR_EMBED_URL" ...&gt;&lt;/iframe&gt;</p>
      </div>

      <!-- Contact details -->
      <div class="flex flex-col gap-6">
        <div>
          <h3 class="text-lg font-semibold mb-1" style="font-family: var(--font-heading); color: #134E4A;">Clinic Mediviron Jalan Imbi</h3>
          <p class="text-sm" style="color: #4B7C78;">
            [Full address placeholder]<br />
            Jalan Imbi, 55100 Kuala Lumpur
          </p>
        </div>

        <div>
          <p class="text-sm font-medium mb-1" style="color: #134E4A;">Operating Hours</p>
          <p class="text-sm" style="color: #4B7C78;">
            Monday – Friday: 8:30am – 6:00pm<br />
            Saturday: 8:30am – 1:00pm<br />
            Sunday & Public Holidays: Closed
          </p>
        </div>

        <div class="flex flex-col gap-3">
          <a
            href="https://wa.me/60XXXXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-green-400 motion-reduce:transition-none"
            style="background-color: #25D366;"
            aria-label="Contact clinic via WhatsApp"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            WhatsApp Us
          </a>
          <a
            href="tel:+60XXXXXXXXX"
            class="flex items-center justify-center px-6 py-3 rounded-full font-semibold border-2 cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 motion-reduce:transition-none"
            style="border-color: #0D9488; color: #0D9488;"
          >
            Call Us
          </a>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Step 2: Add Location to `index.astro`**

**Step 3: Commit**

```bash
git add src/components/Location.astro src/pages/index.astro
git commit -m "feat: add Location & Contact section with map placeholder"
```

---

## Task 10: Build floating WhatsApp button and Footer

**Files:**
- Create: `src/components/WhatsAppButton.astro`
- Create: `src/components/Footer.astro`
- Modify: `src/layouts/Layout.astro`

**Step 1: Create `src/components/WhatsAppButton.astro`**

```astro
---
---
<a
  href="https://wa.me/60XXXXXXXXXX"
  target="_blank"
  rel="noopener noreferrer"
  class="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-lg cursor-pointer transition-transform duration-200 hover:scale-110 focus-visible:ring-4 focus-visible:ring-green-300 focus-visible:ring-offset-2 motion-reduce:transition-none motion-reduce:hover:scale-100"
  style="background-color: #25D366;"
  aria-label="Chat with us on WhatsApp"
>
  <svg xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>
```

**Step 2: Create `src/components/Footer.astro`**

```astro
---
const seoLinks = [
  { href: '/near-trx', label: 'Clinic Near TRX' },
  { href: '/near-pavilion', label: 'Clinic Near Pavilion' },
  { href: '/near-klcc', label: 'Clinic Near KLCC' },
  { href: '/near-bukit-bintang', label: 'Clinic Near Bukit Bintang' },
  { href: '/near-berjaya-times-square', label: 'Clinic Near Berjaya Times Square' },
  { href: '/near-jalan-imbi', label: 'Clinic on Jalan Imbi' },
];
---
<footer class="py-12 border-t border-teal-100" style="background-color: #134E4A; color: #CCFBF1;">
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-8">
    <div>
      <h3 class="font-semibold text-white mb-2" style="font-family: var(--font-heading);">Clinic Mediviron Jalan Imbi</h3>
      <p class="text-sm" style="color: #99F6E4;">[Address placeholder]<br/>Jalan Imbi, 55100 Kuala Lumpur</p>
    </div>
    <div>
      <h3 class="font-semibold text-white mb-2" style="font-family: var(--font-heading);">Nearby Areas</h3>
      <ul class="space-y-1 text-sm">
        {seoLinks.map((link) => (
          <li>
            <a href={link.href} class="hover:text-white transition-colors duration-200 cursor-pointer focus-visible:ring-1 focus-visible:ring-teal-300" style="color: #99F6E4;">{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
    <div>
      <h3 class="font-semibold text-white mb-2" style="font-family: var(--font-heading);">Contact</h3>
      <p class="text-sm" style="color: #99F6E4;">
        WhatsApp: +60X-XXXX XXXX<br/>
        Mon–Fri: 8:30am – 6:00pm<br/>
        Sat: 8:30am – 1:00pm
      </p>
    </div>
  </div>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-teal-700 text-xs text-center" style="color: #5EEAD4;">
    © {new Date().getFullYear()} Clinic Mediviron Jalan Imbi. All rights reserved.
  </div>
</footer>
```

**Step 3: Add WhatsAppButton and Footer to `Layout.astro`**

In `Layout.astro`, inside `<body>` after `<slot />`:

```astro
import WhatsAppButton from '../components/WhatsAppButton.astro';
import Footer from '../components/Footer.astro';
```

And add `<WhatsAppButton />` and `<Footer />` after `<slot />`.

**Step 4: Commit**

```bash
git add src/components/WhatsAppButton.astro src/components/Footer.astro src/layouts/Layout.astro
git commit -m "feat: add floating WhatsApp button and Footer with SEO links"
```

---

## Task 11: Build SeoPageLayout and 6 local SEO pages

**Files:**
- Create: `src/layouts/SeoPageLayout.astro`
- Create: `src/pages/near-trx.astro`
- Create: `src/pages/near-pavilion.astro`
- Create: `src/pages/near-klcc.astro`
- Create: `src/pages/near-bukit-bintang.astro`
- Create: `src/pages/near-berjaya-times-square.astro`
- Create: `src/pages/near-jalan-imbi.astro`

**Step 1: Create `src/layouts/SeoPageLayout.astro`**

```astro
---
import Layout from './Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import WhatsAppButton from '../components/WhatsAppButton.astro';
import Services from '../components/Services.astro';
import Location from '../components/Location.astro';
import FAQItem from '../components/FAQItem.astro';

interface Props {
  title: string;
  description: string;
  h1: string;
  landmark: string;
  distance: string;
}
const { title, description, h1, landmark, distance } = Astro.props;

const miniFaqs = [
  { question: 'Do I need an appointment?', answer: 'Walk-ins are welcome. You can also book via WhatsApp.' },
  { question: 'How far is the clinic from ' + landmark + '?', answer: distance },
  { question: 'What services are available?', answer: 'General Practice, ECG, and Ultrasound are all available on-site.' },
];
---
<Layout title={title} description={description}>
  <Header />
  <main>
    <!-- Hero banner for SEO page -->
    <section class="py-16" style="background: linear-gradient(135deg, #F0FDFA, #CCFBF1);">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h1 class="text-3xl sm:text-4xl font-bold mb-4" style="font-family: var(--font-heading); color: #134E4A;">{h1}</h1>
        <p class="text-lg mb-6" style="color: #4B7C78;">
          Clinic Mediviron Jalan Imbi is your nearest trusted family clinic, just {distance} from {landmark}. Walk-ins welcome — or book via WhatsApp.
        </p>
        <a
          href="https://wa.me/60XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-400 motion-reduce:transition-none"
          style="background-color: #F97316;"
        >
          Book via WhatsApp
        </a>
      </div>
    </section>

    <Services />
    <Location />

    <!-- Mini FAQ -->
    <section class="py-12 bg-white">
      <div class="max-w-2xl mx-auto px-4 sm:px-6">
        <h2 class="text-2xl font-bold mb-6 text-center" style="font-family: var(--font-heading); color: #134E4A;">Common Questions</h2>
        {miniFaqs.map((faq, i) => <FAQItem question={faq.question} answer={faq.answer} id={`seo-${i}`} />)}
      </div>
    </section>

    <!-- Internal links -->
    <section class="py-8" style="background-color: #F0FDFA;">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <p class="text-sm mb-4" style="color: #4B7C78;">Looking for a clinic near another area?</p>
        <div class="flex flex-wrap justify-center gap-3 text-sm">
          <a href="/near-trx" class="px-3 py-1 rounded-full border cursor-pointer hover:bg-teal-50 transition-colors duration-200" style="border-color: #0D9488; color: #0D9488;">Near TRX</a>
          <a href="/near-pavilion" class="px-3 py-1 rounded-full border cursor-pointer hover:bg-teal-50 transition-colors duration-200" style="border-color: #0D9488; color: #0D9488;">Near Pavilion</a>
          <a href="/near-klcc" class="px-3 py-1 rounded-full border cursor-pointer hover:bg-teal-50 transition-colors duration-200" style="border-color: #0D9488; color: #0D9488;">Near KLCC</a>
          <a href="/near-bukit-bintang" class="px-3 py-1 rounded-full border cursor-pointer hover:bg-teal-50 transition-colors duration-200" style="border-color: #0D9488; color: #0D9488;">Near Bukit Bintang</a>
          <a href="/near-berjaya-times-square" class="px-3 py-1 rounded-full border cursor-pointer hover:bg-teal-50 transition-colors duration-200" style="border-color: #0D9488; color: #0D9488;">Near Berjaya Times Square</a>
          <a href="/near-jalan-imbi" class="px-3 py-1 rounded-full border cursor-pointer hover:bg-teal-50 transition-colors duration-200" style="border-color: #0D9488; color: #0D9488;">Jalan Imbi</a>
        </div>
      </div>
    </section>
  </main>
  <Footer />
  <WhatsAppButton />
</Layout>
```

**Step 2: Create all 6 SEO pages**

`src/pages/near-trx.astro`:
```astro
---
import SeoPageLayout from '../layouts/SeoPageLayout.astro';
---
<SeoPageLayout
  title="Clinic Near TRX City KL | Clinic Mediviron Jalan Imbi"
  description="Looking for a clinic near TRX City Kuala Lumpur? Clinic Mediviron Jalan Imbi is just minutes away. General practice, ECG, ultrasound. Walk-ins welcome."
  h1="Clinic Near TRX City | Clinic Mediviron Jalan Imbi"
  landmark="TRX City"
  distance="a short 5-minute walk"
/>
```

`src/pages/near-pavilion.astro`:
```astro
---
import SeoPageLayout from '../layouts/SeoPageLayout.astro';
---
<SeoPageLayout
  title="Clinic Near Pavilion KL | Clinic Mediviron Jalan Imbi"
  description="Need a clinic near Pavilion Kuala Lumpur? Clinic Mediviron Jalan Imbi is nearby on Jalan Imbi. GP, ECG, ultrasound. Walk-ins welcome."
  h1="Clinic Near Pavilion KL | Clinic Mediviron Jalan Imbi"
  landmark="Pavilion KL"
  distance="approximately 5 minutes away"
/>
```

`src/pages/near-klcc.astro`:
```astro
---
import SeoPageLayout from '../layouts/SeoPageLayout.astro';
---
<SeoPageLayout
  title="Clinic Near KLCC | Clinic Mediviron Jalan Imbi"
  description="Searching for a clinic near KLCC or Petronas Towers? Visit Clinic Mediviron on Jalan Imbi. Trusted GP, ECG, and ultrasound services."
  h1="Clinic Near KLCC | Clinic Mediviron Jalan Imbi"
  landmark="KLCC"
  distance="approximately 10 minutes away"
/>
```

`src/pages/near-bukit-bintang.astro`:
```astro
---
import SeoPageLayout from '../layouts/SeoPageLayout.astro';
---
<SeoPageLayout
  title="Clinic Near Bukit Bintang KL | Clinic Mediviron Jalan Imbi"
  description="Looking for a clinic near Bukit Bintang? Clinic Mediviron Jalan Imbi is your nearest trusted family clinic. Walk-ins welcome."
  h1="Clinic Near Bukit Bintang | Clinic Mediviron Jalan Imbi"
  landmark="Bukit Bintang"
  distance="a short walk away"
/>
```

`src/pages/near-berjaya-times-square.astro`:
```astro
---
import SeoPageLayout from '../layouts/SeoPageLayout.astro';
---
<SeoPageLayout
  title="Clinic Near Berjaya Times Square KL | Clinic Mediviron Jalan Imbi"
  description="Need a clinic near Berjaya Times Square? Clinic Mediviron on Jalan Imbi offers GP, ECG, and ultrasound. Walk-ins welcome."
  h1="Clinic Near Berjaya Times Square | Clinic Mediviron Jalan Imbi"
  landmark="Berjaya Times Square"
  distance="just minutes away"
/>
```

`src/pages/near-jalan-imbi.astro`:
```astro
---
import SeoPageLayout from '../layouts/SeoPageLayout.astro';
---
<SeoPageLayout
  title="Clinic on Jalan Imbi KL | Clinic Mediviron"
  description="Clinic Mediviron is located directly on Jalan Imbi, Kuala Lumpur. Trusted family GP clinic with ECG and ultrasound on-site. Walk-ins welcome."
  h1="Clinic on Jalan Imbi | Clinic Mediviron"
  landmark="Jalan Imbi"
  distance="right on Jalan Imbi"
/>
```

**Step 3: Verify all 6 pages load in browser**

Navigate to `/near-trx`, `/near-pavilion`, etc. Each should render with unique H1.

**Step 4: Commit**

```bash
git add src/layouts/SeoPageLayout.astro src/pages/near-*.astro
git commit -m "feat: add SeoPageLayout and 6 local SEO pages"
```

---

## Task 12: Final wiring — complete index.astro

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Replace `src/pages/index.astro` with full wired page**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Hero from '../components/Hero.astro';
import TrustBar from '../components/TrustBar.astro';
import Services from '../components/Services.astro';
import Panel from '../components/Panel.astro';
import About from '../components/About.astro';
import FAQ from '../components/FAQ.astro';
import Location from '../components/Location.astro';
import Footer from '../components/Footer.astro';
import WhatsAppButton from '../components/WhatsAppButton.astro';
---
<Layout>
  <Header />
  <main>
    <Hero />
    <TrustBar />
    <Services />
    <Panel />
    <About />
    <FAQ />
    <Location />
  </main>
  <Footer />
  <WhatsAppButton />
</Layout>
```

**Step 2: Do a full review pass in the browser**

Check: 375px mobile, 768px tablet, 1280px desktop. Verify all sections render, WhatsApp button floats, footer links work.

**Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: wire up complete landing page with all sections"
```

---

## Placeholders to Replace After Implementation

| Item | Location |
|---|---|
| WhatsApp number | All `wa.me/60XXXXXXXXXX` links |
| Phone number | `Header.astro`, `Location.astro`, `Footer.astro` |
| Full address | `Location.astro`, `Footer.astro` |
| Google Maps embed URL | `Location.astro` iframe |
| Panel company names/logos | `Panel.astro` |
| Clinic logo file | `Header.astro` `<img>` tag + `public/logo.png` |
| Hero + About photos | `Hero.astro`, `About.astro` placeholder divs |
| Distance values for SEO pages | Each `near-*.astro` `distance` prop |
