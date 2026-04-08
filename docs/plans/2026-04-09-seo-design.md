# SEO Design — Clinic Mediviron Jalan Imbi

**Date:** 2026-04-09
**Objective:** Make the Astro landing page effective for Google search lead generation — targeting both local intent ("clinic near me") and service-specific intent ("ECG test KL", "ultrasound clinic Bukit Bintang").

**Approach:** Technical SEO + content enrichment simultaneously (Approach B).

**Primary conversion goals:** Walk-ins and WhatsApp bookings, both equally.

---

## Section 1 — Technical SEO

### 1. Structured Data (JSON-LD)

Add a `<script type="application/ld+json">` block to `src/layouts/Layout.astro` using the `MedicalClinic` schema type. Include:

- `name`, `address`, `telephone`, `url`
- `openingHoursSpecification` for weekdays, Saturday, Sunday
- `medicalSpecialty` or `availableService` listing General Practice, ECG, Ultrasound
- `geo` coordinates from the existing Google Maps URL in `clinic.ts`

Pull all values from `src/config/clinic.ts` to keep a single source of truth.

### 2. Open Graph + Twitter Meta Tags

Add to `Layout.astro` `<head>`:

- `og:title`, `og:description`, `og:type` (set to `"website"`), `og:url`, `og:image`
- `twitter:card` (set to `"summary_large_image"`)

Use props passed into Layout so each page can override defaults. Defaults fall back to `CLINIC.defaultTitle` and `CLINIC.defaultDescription`.

### 3. Canonical Tags

Add `<link rel="canonical" href={canonicalUrl} />` to `Layout.astro`. Pass the canonical URL as a prop from each page. The 6 nearby pages have similar content structures — canonical tags prevent Google treating them as duplicate content.

### 4. Sitemap + robots.txt

Install `@astrojs/sitemap` (official Astro integration). Configure in `astro.config.mjs` with the production `site` URL. Add a `public/robots.txt` pointing to the generated sitemap. Submit the sitemap URL to Google Search Console after launch.

### 5. Image Alt Text Policy

Every `<img>` must have a descriptive alt attribute. Format: `"[what is shown], [location context]"`. Example: `"Front desk of Clinic Mediviron Jalan Imbi, Kuala Lumpur"`. Document this convention in a code comment inside `Layout.astro`.

### 6. Heading Hierarchy Audit

Each page must have exactly one `<h1>`. Verify `index.astro` — the Hero `<h1>` is correct. Nearby pages use `{h1}` props correctly via `SeoPageLayout.astro`. Subsequent sections use `<h2>`, subsections use `<h3>`.

---

## Section 2 — Content Enrichment

### 1. Testimonials Section

**New component:** `src/components/Testimonials.astro`

- Position: between `<Services />` and `<About />` in `index.astro`
- Display 3–4 patient review cards: first name, 5-star rating, 1–2 sentence quote
- Use placeholder content until real Google reviews are collected
- Add a code comment marking each placeholder for easy replacement
- When real photos/names are available, each card can optionally include a patient photo

### 2. Hero Photo Replacement

Replace the current "Photo Placeholder" dashed box in `src/components/Hero.astro` with a styled operating hours card showing:

- Weekday hours
- Weekend/public holiday hours
- "Walk-ins Welcome" badge

When real clinic photos are ready, swap this card for an `<img>` with:
- Descriptive alt text
- Explicit `width` and `height` attributes (prevents CLS)
- `loading="eager"` (above the fold — do not lazy-load)
- Recommended specs: clinic exterior, front desk, or doctor portrait at minimum 800×600px

### 3. Enriched Service Descriptions

Expand service entries in `src/components/Services.astro` (or `ServiceCard.astro`) from one-liners to 2–3 sentences per service. Each description should:

- State who the service is for
- Explain what to expect
- Include natural keyword usage (e.g., "ECG test in KL", "ultrasound scan Jalan Imbi")

### 4. Per-Page Meta Description Strengthening

Each nearby page should pass a unique `description` that mentions:
- The specific landmark
- At least one service
- A practical detail (walk-ins, open weekends, WhatsApp booking)

Example for `/near-trx`:
> "Family clinic 5 minutes from TRX City. Walk-in GP consultations, ECG, and ultrasound. Open weekends. Book via WhatsApp."

Update each page file in `src/pages/near-*.astro` accordingly.

---

## Section 3 — Google Business Profile (Off-Page SEO)

### Setup Checklist

1. Claim listing at business.google.com
2. Verify via postcard or phone
3. Set business name to exactly "Clinic Mediviron Jalan Imbi" (must match website `<title>`)
4. Categories: "Medical Clinic" (primary), "General Practitioner" (secondary)
5. Fill address, phone, website URL, hours — all must match `clinic.ts` exactly (NAP consistency)
6. Add services: General Practice, ECG, Ultrasound
7. Upload clinic photos: exterior, interior, front desk

### Review Strategy

- After verification, send patients a direct Google review link via WhatsApp
- Target: 10+ reviews in first month
- Pull best review quotes into `Testimonials.astro` on the website
- Reviews mentioning specific services (e.g., "ECG here") reinforce service-specific rankings

### NAP Consistency

Name, Address, Phone must be identical across:
- Google Business Profile
- The website (`clinic.ts`)
- Any directory listings (e.g., Healthigo, DoctorOnCall, etc.)

Mismatches are a local ranking penalty.

---

## Section 4 — Ongoing SEO Maintenance

### Google Search Console

- Connect after launch
- Submit `sitemap.xml` directly in the console
- Check monthly: query impressions, click-through rates, crawl errors
- Look for new keyword opportunities (queries with impressions but low clicks)

### Core Web Vitals

- Run PageSpeed Insights once after launch
- Targets: LCP < 2.5s, CLS < 0.1, FID/INP < 200ms
- Astro's minimal JS output means the site should pass by default
- When real Hero image is added: use `loading="eager"` + explicit dimensions to protect LCP and CLS

### Nearby Pages Growth

The 6 existing nearby pages (`/near-trx`, `/near-pavilion`, etc.) compound local ranking coverage. As the clinic gains visibility, add pages for new relevant landmarks. Each page is low effort — one `.astro` file, a title, a description, and a `landmark`/`distance` prop.

### Review Cadence (Every 2–3 Months)

- Update operating hours in `clinic.ts` and Google Business Profile simultaneously if changed
- Refresh testimonials with newer reviews
- Check Search Console for new keyword opportunities
- Re-run PageSpeed Insights after any major content changes

---

## Files to Create or Modify

| File | Action |
|---|---|
| `src/layouts/Layout.astro` | Add JSON-LD, Open Graph, canonical tag, lang comment |
| `src/components/Hero.astro` | Replace photo placeholder with operating hours card |
| `src/components/Testimonials.astro` | Create new component |
| `src/components/Services.astro` or `ServiceCard.astro` | Enrich service descriptions |
| `src/pages/index.astro` | Add `<Testimonials />` between Services and About |
| `src/pages/near-*.astro` (6 files) | Strengthen meta descriptions |
| `astro.config.mjs` | Add `@astrojs/sitemap` integration + `site` URL |
| `public/robots.txt` | Create with sitemap pointer |

---

## Out of Scope

- Separate service subpages (`/services/ecg`, etc.) — premature at current traffic level
- Paid search / Google Ads — not requested
- Blog / content marketing — not requested
