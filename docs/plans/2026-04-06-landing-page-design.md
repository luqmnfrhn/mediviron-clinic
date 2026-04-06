# Landing Page Design — Clinic Mediviron Jalan Imbi

**Date:** 2026-04-06
**Objective:** Increase user retention and customer trust for both new and existing patients.

---

## Goals

- Serve new patients (discovery via Google) and existing patients (rebooking, info) equally
- Build trust through warm, approachable design
- Drive WhatsApp conversions as the primary CTA
- Rank for local SEO queries near TRX and surrounding landmarks

---

## Tech Stack

| Concern | Choice |
|---|---|
| Framework | Astro 6 |
| Styling | Tailwind CSS v4 |
| Components | Hand-crafted Astro components |
| Fonts | Playfair Display (headings) + Inter (body) |

## Color Palette

| Role | Value |
|---|---|
| Primary (clinic blue) | `#1E6FBF` |
| Accent warm (amber) | `#F5A623` |
| Background | `#FAFAF8` |
| Text | `#1A1A2E` |

---

## Site Architecture — Approach A

One main landing page (`/`) with all trust-building content stacked vertically, plus 6 separate local SEO subpages.

```
/                          → Main landing page
/near-trx                  → Local SEO — TRX City
/near-pavilion             → Local SEO — Pavilion KL
/near-klcc                 → Local SEO — KLCC / Petronas Towers
/near-bukit-bintang        → Local SEO — Bukit Bintang
/near-berjaya-times-square → Local SEO — Berjaya Times Square
/near-jalan-imbi           → Local SEO — Jalan Imbi area
```

---

## Shared Components

| Component | Purpose |
|---|---|
| `Header.astro` | Logo + nav links |
| `Footer.astro` | Address, links, copyright |
| `WhatsAppButton.astro` | Floating fixed bottom-right CTA |
| `ServiceCard.astro` | Reusable service card (icon, title, description) |
| `FAQItem.astro` | Accordion FAQ item |
| `SeoPageLayout.astro` | Shared layout for all 6 local SEO pages |

---

## Main Landing Page — Section Order

### 1. Hero
- Full-viewport, warm gradient background
- Clinic logo top-left in navbar
- H1: "Your Trusted Family Clinic in Jalan Imbi"
- Subheading: short tagline about accessibility and care
- Primary CTA: "Book Appointment via WhatsApp" button
- Subtle scroll-down indicator

### 2. Trust Bar
- Thin strip, 3 icons + short labels:
  - "Friendly & Experienced Doctors"
  - "ECG & Ultrasound On-Site"
  - "Walk-ins Welcome"

### 3. Services
- 3 cards: General Practice, ECG, Ultrasound
- Each card: icon, title, 2–3 line description, WhatsApp CTA link

### 4. Panel / Insurance
- Section title: "Panel & Insurance Accepted"
- Grid of panel company logos/names (placeholders for now)
- Short note: "Don't see your panel? Contact us to check."

### 5. Why Choose Us / About
- 2-column: clinic story/values paragraph (left) + warm photo placeholder (right)
- Emphasis on community GP, experienced doctors, modern equipment

### 6. FAQ
- Accordion-style, 6–8 questions covering:
  - Operating hours
  - Walk-in policy
  - Insurance / panel
  - What to bring for first visit
  - ECG and Ultrasound availability
  - Parking

### 7. Location & Contact
- Google Maps embed (placeholder iframe)
- Clinic address, phone number (placeholder)
- WhatsApp CTA button
- Side-by-side on desktop, stacked on mobile

### 8. Floating WhatsApp Button
- Fixed bottom-right, visible on all pages and all scroll positions

---

## Local SEO Pages (×6)

Each page uses `SeoPageLayout.astro` and contains:

- **Unique H1** — e.g. "Clinic Near TRX | Clinic Mediviron Jalan Imbi"
- **Unique `<title>` and `<meta description>`** for Google indexing
- **Intro paragraph** — 2–3 sentences mentioning the landmark name and approximate distance/walking time
- **Reused sections** — Services summary, WhatsApp CTA, Map embed, 3-question FAQ snippet
- **Internal links** — back to main page and to other SEO pages

### Pages

| Route | H1 Target |
|---|---|
| `/near-trx` | Clinic Near TRX City |
| `/near-pavilion` | Clinic Near Pavilion KL |
| `/near-klcc` | Clinic Near KLCC |
| `/near-bukit-bintang` | Clinic Near Bukit Bintang |
| `/near-berjaya-times-square` | Clinic Near Berjaya Times Square |
| `/near-jalan-imbi` | Clinic on Jalan Imbi |

---

## Placeholders to Replace Later

- Clinic WhatsApp number
- Google Maps embed URL
- Clinic phone number and full address
- Panel / insurance company names and logos
- Clinic photos (hero, about section)
- Logo file (blue logo to be added to `public/`)
