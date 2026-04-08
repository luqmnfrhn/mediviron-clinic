# SEO Implementation Plan — Clinic Mediviron Jalan Imbi

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the Astro landing page technically sound for Google search and enriched with trust-building content to convert both walk-in and WhatsApp leads.

**Architecture:** All SEO metadata lives in `Layout.astro` (single source of truth via `clinic.ts`). Content enrichment adds a `Testimonials.astro` component and replaces the Hero photo placeholder. Sitemap and robots.txt are added via Astro's official integration.

**Tech Stack:** Astro 6, Tailwind CSS v4, `@astrojs/sitemap`, JSON-LD (schema.org MedicalClinic)

---

## Task 1: Install and configure @astrojs/sitemap

**Files:**
- Modify: `astro.config.mjs`
- Create: `public/robots.txt`

**Step 1: Install the integration**

```bash
npx astro add sitemap
```

Accept all prompts. This auto-updates `astro.config.mjs`.

**Step 2: Add the `site` URL to the config**

Open `astro.config.mjs` and ensure it looks like this:

```js
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mediviron-imbi.com', // replace with actual production URL
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

> Note: Replace `https://mediviron-imbi.com` with the actual deployed domain. The sitemap will not generate correctly without a `site` value.

**Step 3: Create `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://mediviron-imbi.com/sitemap-index.xml
```

> Replace the domain to match `site` in `astro.config.mjs`.

**Step 4: Build and verify sitemap exists**

```bash
npm run build
ls dist/sitemap*.xml
```

Expected: `dist/sitemap-index.xml` and `dist/sitemap-0.xml` are present.

**Step 5: Commit**

```bash
git add astro.config.mjs public/robots.txt package.json package-lock.json
git commit -m "feat: add sitemap integration and robots.txt"
```

---

## Task 2: Add JSON-LD structured data to Layout.astro

**Files:**
- Modify: `src/layouts/Layout.astro`
- Reference: `src/config/clinic.ts` (read-only — do not modify)

**Context:** `clinic.ts` exports a `CLINIC` const with name, address, phone, hours, and a Google Maps embed URL. The geo coordinates are `3.1454703968299547` (lat) and `101.71305477753576` (lng) — extracted from the Maps embed URL already in the file.

**Step 1: Open `src/layouts/Layout.astro` and update the Props interface**

Add `canonicalUrl` as an optional prop:

```astro
---
import '../styles/global.css';
import { CLINIC } from '../config/clinic';

interface Props {
  title?: string;
  description?: string;
  canonicalUrl?: string;
}

const {
  title = CLINIC.defaultTitle,
  description = CLINIC.defaultDescription,
  canonicalUrl,
} = Astro.props;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "name": CLINIC.name,
  "url": "https://mediviron-imbi.com", // replace with actual domain
  "telephone": CLINIC.phone,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": CLINIC.address,
    "addressLocality": CLINIC.city,
    "postalCode": CLINIC.postcode,
    "addressRegion": CLINIC.state,
    "addressCountry": "MY"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 3.1454703968299547,
    "longitude": 101.71305477753576
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:30",
      "closes": "20:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "16:30"
    }
  ],
  "availableService": [
    { "@type": "MedicalProcedure", "name": "General Practice" },
    { "@type": "MedicalProcedure", "name": "ECG (Electrocardiogram)" },
    { "@type": "MedicalProcedure", "name": "Ultrasound Imaging" }
  ]
};
---
```

**Step 2: Update the `<head>` block**

Replace the existing `<head>` with:

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content={description} />
  <meta name="generator" content={Astro.generator} />
  <title>{title}</title>

  <!-- Canonical -->
  {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

  <!-- Twitter -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />

  <!-- Structured Data -->
  <script type="application/ld+json" set:html={JSON.stringify(structuredData)} />

  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png" />

  <!-- Fonts
       Alt text convention: every <img> must use descriptive alt text.
       Format: "[what is shown], [location context]"
       Example: alt="Front desk of Clinic Mediviron Jalan Imbi, Kuala Lumpur"
  -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
  <link
    href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap"
    rel="stylesheet"
  />
</head>
```

**Step 3: Verify the build has no errors**

```bash
npm run build
```

Expected: No errors. The `dist/` folder builds successfully.

**Step 4: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "feat: add JSON-LD structured data, Open Graph, and canonical tag support"
```

---

## Task 3: Add canonical URLs to all pages

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/pages/near-trx.astro`
- Modify: `src/pages/near-pavilion.astro`
- Modify: `src/pages/near-klcc.astro`
- Modify: `src/pages/near-bukit-bintang.astro`
- Modify: `src/pages/near-berjaya-times-square.astro`
- Modify: `src/pages/near-jalan-imbi.astro`
- Modify: `src/layouts/SeoPageLayout.astro`

**Context:** `Layout.astro` now accepts an optional `canonicalUrl` prop. Pages must pass their own absolute URL. `SeoPageLayout.astro` wraps the 6 nearby pages — add a `canonicalUrl` prop there and pass it through.

**Step 1: Update `src/pages/index.astro`**

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import About from '../components/About.astro';
import FAQ from '../components/FAQ.astro';
import Footer from '../components/Footer.astro';
import Hero from '../components/Hero.astro';
import Location from '../components/Location.astro';
import WhatsAppButton from '../components/WhatsAppButton.astro';
import Panel from '../components/Panel.astro';
import Services from '../components/Services.astro';
import Testimonials from '../components/Testimonials.astro';
import TrustBar from '../components/TrustBar.astro';
---

<Layout canonicalUrl="https://mediviron-imbi.com/">
  <Header />
  <main>
    <Hero />
    <TrustBar />
    <Services />
    <Testimonials />
    <Panel />
    <About />
    <FAQ />
    <Location />
  </main>
  <Footer />
  <WhatsAppButton />
</Layout>
```

> Note: `<Testimonials />` is added between Services and Panel. It will be created in Task 4.

**Step 2: Update `src/layouts/SeoPageLayout.astro` to accept and pass `canonicalUrl`**

Add `canonicalUrl` to the Props interface and pass it to `<Layout>`:

```astro
interface Props {
  title: string;
  description: string;
  h1: string;
  landmark: string;
  distance: string;
  canonicalUrl: string;
}

const { title, description, h1, landmark, distance, canonicalUrl } = Astro.props;
```

Then update the Layout call at the top of the template:

```astro
<Layout title={title} description={description} canonicalUrl={canonicalUrl}>
```

**Step 3: Update each nearby page to pass its canonical URL**

`src/pages/near-trx.astro`:
```astro
---
import SeoPageLayout from '../layouts/SeoPageLayout.astro';
---
<SeoPageLayout
  title="Clinic Near TRX City KL | Clinic Mediviron Jalan Imbi"
  description="Family clinic 5 minutes from TRX City. Walk-in GP consultations, ECG, and ultrasound. Open weekends. Book via WhatsApp."
  h1="Clinic Near TRX City | Clinic Mediviron Jalan Imbi"
  landmark="TRX City"
  distance="a short 5-minute walk"
  canonicalUrl="https://mediviron-imbi.com/near-trx"
/>
```

`src/pages/near-pavilion.astro`:
```astro
<SeoPageLayout
  title="Clinic Near Pavilion KL | Clinic Mediviron Jalan Imbi"
  description="GP clinic minutes from Pavilion KL. Walk-ins welcome, ECG and ultrasound on-site. Open weekends. Book via WhatsApp."
  h1="Clinic Near Pavilion KL | Clinic Mediviron Jalan Imbi"
  landmark="Pavilion KL"
  distance="a short walk away"
  canonicalUrl="https://mediviron-imbi.com/near-pavilion"
/>
```

`src/pages/near-klcc.astro`:
```astro
<SeoPageLayout
  title="Clinic Near KLCC | Clinic Mediviron Jalan Imbi"
  description="Trusted family clinic near KLCC and Petronas Towers. GP, ECG, ultrasound. Walk-ins welcome, open weekends. Book via WhatsApp."
  h1="Clinic Near KLCC | Clinic Mediviron Jalan Imbi"
  landmark="KLCC"
  distance="a short drive away"
  canonicalUrl="https://mediviron-imbi.com/near-klcc"
/>
```

`src/pages/near-bukit-bintang.astro`:
```astro
<SeoPageLayout
  title="Clinic Near Bukit Bintang KL | Clinic Mediviron Jalan Imbi"
  description="Family clinic near Bukit Bintang. Walk-in GP, ECG test, and ultrasound scan in KL. Open weekends. Book via WhatsApp."
  h1="Clinic Near Bukit Bintang | Clinic Mediviron Jalan Imbi"
  landmark="Bukit Bintang"
  distance="a short walk away"
  canonicalUrl="https://mediviron-imbi.com/near-bukit-bintang"
/>
```

`src/pages/near-berjaya-times-square.astro`:
```astro
<SeoPageLayout
  title="Clinic Near Berjaya Times Square KL | Clinic Mediviron Jalan Imbi"
  description="GP clinic near Berjaya Times Square KL. Walk-in consultations, ECG, and ultrasound. Open weekends. Book via WhatsApp."
  h1="Clinic Near Berjaya Times Square | Clinic Mediviron Jalan Imbi"
  landmark="Berjaya Times Square"
  distance="a short walk away"
  canonicalUrl="https://mediviron-imbi.com/near-berjaya-times-square"
/>
```

`src/pages/near-jalan-imbi.astro`:
```astro
<SeoPageLayout
  title="Clinic in Jalan Imbi KL | Clinic Mediviron Jalan Imbi"
  description="Family clinic on Jalan Imbi, Kuala Lumpur. Walk-in GP consultations, ECG test, and ultrasound. Open weekends. Book via WhatsApp."
  h1="Clinic in Jalan Imbi | Clinic Mediviron Jalan Imbi"
  landmark="Jalan Imbi"
  distance="right here"
  canonicalUrl="https://mediviron-imbi.com/near-jalan-imbi"
/>
```

**Step 4: Build and verify no errors**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add src/pages/ src/layouts/SeoPageLayout.astro
git commit -m "feat: add canonical URLs and strengthen meta descriptions on all pages"
```

---

## Task 4: Create Testimonials component

**Files:**
- Create: `src/components/Testimonials.astro`

**Context:** This component displays 3–4 patient review cards. Content is placeholder until real Google reviews are collected. Each card: first name, 5-star rating SVG, and a short quote. Position in `index.astro` is already set in Task 3 (between Services and Panel).

**Step 1: Create `src/components/Testimonials.astro`**

```astro
---
// PLACEHOLDER CONTENT — replace with real Google reviews once collected.
// To get reviews: send patients your Google Business Profile review link via WhatsApp.
// Each review: { name: string, quote: string } — keep quotes to 1–2 sentences.
const reviews = [
  {
    name: 'Aisha R.',
    quote: 'Very friendly doctors and staff. I walked in without an appointment and was seen quickly. Highly recommend for anyone near Jalan Imbi.',
  },
  {
    name: 'Daniel T.',
    quote: 'Got my ECG done here — fast, professional, and no need to go to a hospital. Great clinic for working adults in KL.',
  },
  {
    name: 'Priya M.',
    quote: 'Clean clinic, short wait times, and the doctor took time to explain everything properly. Will definitely come back.',
  },
  {
    name: 'Jason L.',
    quote: 'Convenient location near TRX. Went in for a general check-up and the whole experience was smooth from start to finish.',
  },
];

const stars = Array(5).fill(null);
---

<section class="bg-teal-50 py-20">
  <div class="section-shell">
    <div class="mx-auto max-w-2xl text-center">
      <p class="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Patient Reviews</p>
      <h2 class="mt-3 text-3xl font-bold text-text sm:text-4xl">What our patients say</h2>
    </div>
    <div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {reviews.map((review) => (
        <article class="flex flex-col rounded-[1.75rem] border border-teal-100 bg-white p-6 shadow-(--shadow-card)">
          <div class="flex gap-1" aria-label="5 out of 5 stars">
            {stars.map(() => (
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <blockquote class="mt-4 flex-1 text-base leading-7 text-muted">
            <p>"{review.quote}"</p>
          </blockquote>
          <p class="mt-4 text-sm font-semibold text-text">{review.name}</p>
        </article>
      ))}
    </div>
  </div>
</section>
```

**Step 2: Build and check visually**

```bash
npm run dev
```

Open `http://localhost:4321` and scroll to the Testimonials section. Verify 4 cards render between Services and Panel.

**Step 3: Commit**

```bash
git add src/components/Testimonials.astro
git commit -m "feat: add Testimonials component with placeholder patient reviews"
```

---

## Task 5: Replace Hero photo placeholder with operating hours card

**Files:**
- Modify: `src/components/Hero.astro`
- Reference: `src/config/clinic.ts` (read-only)

**Context:** The Hero's right column has a `"Photo Placeholder"` dashed box. Replace it with a styled card showing operating hours and walk-in availability. When real clinic photos are available, the photo should replace the entire card — specs: 800×600px minimum, JPG/WebP, showing clinic exterior, front desk, or doctor portrait.

**Step 1: Update the right column in `src/components/Hero.astro`**

Find this block (the dashed placeholder div) and replace it:

```astro
<!-- Replace this entire inner div when real photo is available.
     Photo specs: 800×600px minimum, WebP preferred.
     Use: alt="Front desk of Clinic Mediviron Jalan Imbi, Kuala Lumpur"
     Add: loading="eager" width="800" height="600" to prevent CLS.
-->
<div class="rounded-4xl bg-white/85 p-6 shadow-(--shadow-card) ring-1 ring-teal-100 backdrop-blur">
  <div class="rounded-3xl bg-[linear-gradient(180deg,rgba(240,253,250,0.9),white)] p-8">
    <div class="mb-6 flex items-center gap-3">
      <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <p class="font-semibold text-text">Operating Hours</p>
    </div>
    <ul class="space-y-3 text-sm text-muted">
      <li class="flex items-start justify-between gap-4">
        <span class="font-medium text-text">Mon – Fri</span>
        <span>8:30am – 8:30pm</span>
      </li>
      <li class="flex items-start justify-between gap-4">
        <span class="font-medium text-text">Saturday</span>
        <span>9:00am – 4:30pm</span>
      </li>
      <li class="flex items-start justify-between gap-4">
        <span class="font-medium text-text">Sun & Public Holidays</span>
        <span>9:00am – 4:30pm</span>
      </li>
    </ul>
    <div class="mt-6 flex items-center gap-2 rounded-2xl bg-teal-700 px-4 py-3 text-sm font-semibold text-white">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
      Walk-ins Welcome — No Appointment Needed
    </div>
  </div>
</div>
```

**Step 2: Verify visually**

```bash
npm run dev
```

Open `http://localhost:4321`. The Hero right column should show the operating hours card on desktop (hidden on mobile — `hidden md:block` wrapper is unchanged).

**Step 3: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: replace Hero photo placeholder with operating hours card"
```

---

## Task 6: Enrich service descriptions in Services.astro

**Files:**
- Modify: `src/components/Services.astro`

**Context:** Current descriptions are 1–2 sentences. Expand each to 2–3 sentences that state who the service is for and include natural keyword usage. Do not touch `ServiceCard.astro`.

**Step 1: Update the `services` array in `src/components/Services.astro`**

```js
const services = [
  {
    title: 'General Practice',
    description:
      'Our GP clinic in Jalan Imbi handles everyday illnesses, chronic condition follow-ups, medical certificates, and referrals. Whether you are a working professional near TRX or a family in the Bukit Bintang area, walk-ins are welcome any day of the week. We also support preventive health checks and panel insurance claims.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />`,
  },
  {
    title: 'ECG (Electrocardiogram)',
    description:
      'Get your ECG test done in Kuala Lumpur without visiting a hospital. Our on-site electrocardiogram service is fast, comfortable, and suitable for heart health assessments, employment medicals, and pre-operative checks. Results are reviewed by our doctor on the same visit.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3 12h4l3-9 4 18 3-9h4" />`,
  },
  {
    title: 'Ultrasound',
    description:
      'Our in-clinic ultrasound scan service in Jalan Imbi offers convenient, non-invasive imaging for abdominal, pelvic, and soft tissue assessments. Skip the hospital referral queue — our doctor reviews your scan on the same day and discusses results with you directly.',
    icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M8 7h8M8 11h5m-5 4h8m3 4H5a2 2 0 01-2-2V7a2 2 0 012-2h9l5 5v7a2 2 0 01-2 2z" />`,
  },
];
```

**Step 2: Build and verify**

```bash
npm run build
```

No errors expected. Visually check on `npm run dev` that each service card shows the full description without overflow.

**Step 3: Commit**

```bash
git add src/components/Services.astro
git commit -m "feat: enrich service descriptions with keyword-rich, benefit-focused copy"
```

---

## Task 7: Final build verification

**Step 1: Run full build**

```bash
npm run build
```

Expected: No errors. `dist/` contains `sitemap-index.xml`, `robots.txt`, and all HTML pages.

**Step 2: Check sitemap includes all pages**

```bash
cat dist/sitemap-0.xml
```

Expected: All 7 URLs present (`/`, `/near-trx`, `/near-pavilion`, `/near-klcc`, `/near-bukit-bintang`, `/near-berjaya-times-square`, `/near-jalan-imbi`).

**Step 3: Validate structured data**

Copy the source HTML of the built `dist/index.html` and paste into [schema.org validator](https://validator.schema.org/) or Google's Rich Results Test. Expected: `MedicalClinic` entity detected with no errors.

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: final SEO implementation — all tasks complete"
```

---

## Post-Launch Checklist (Manual — Outside Codebase)

These are done after deploying to production:

- [ ] Submit `https://yourdomain.com/sitemap-index.xml` to Google Search Console
- [ ] Create and verify Google Business Profile at business.google.com
- [ ] Set business name exactly: "Clinic Mediviron Jalan Imbi"
- [ ] Match hours, address, phone to `clinic.ts` exactly
- [ ] Upload clinic photos to Google Business Profile (exterior, interior, front desk)
- [ ] Send review link to first patients via WhatsApp — target 10+ reviews in first month
- [ ] Run PageSpeed Insights on the live URL — target LCP < 2.5s, CLS < 0.1
- [ ] Replace placeholder testimonials in `Testimonials.astro` with real patient quotes once collected
- [ ] When real clinic photo is ready: replace Hero hours card with `<img>` (800×600px min, WebP, `loading="eager"`, descriptive alt text)
