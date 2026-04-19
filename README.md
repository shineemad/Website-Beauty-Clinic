# JGLOW Premium Website

Website resmi JGLOW dengan pendekatan luxury editorial: clean, refined, dan motion yang elegan.

## Ringkasan

Project ini dibangun untuk menghadirkan pengalaman digital premium untuk klinik kecantikan JGLOW.
Fokus utamanya adalah tipografi yang kuat, whitespace yang lega, serta interaksi halus berbasis GSAP.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- GSAP (Timeline, ScrollTrigger, TextPlugin)
- Lenis (smooth scrolling)
- SplitType (text effect)

## Design Direction

- Luxury editorial (muted, refined, intentional)
- Serif display + sans body
- Spacing longgar dan ritme visual yang konsisten
- Motion lambat dan terukur (tanpa efek bouncy)

## Design Tokens

Token utama yang digunakan:

- `--color-canvas`: `#FCFAF8`
- `--color-charcoal`: `#1A1A1A`
- `--color-gold`: `#D5B97D`
- `--color-rose`: `#DDBEBB`
- `--color-text-muted`: `#8A8279`

## Struktur Folder

```text
app/
  globals.css
  layout.tsx
  page.tsx

components/
  BookingOverlay.tsx
  CustomCursor.tsx
  GlobalMotion.tsx
  MagneticButton.tsx
  Navigation.tsx
  Preloader.tsx
  SVGElements.tsx
  sections/
    Hero.tsx
    Philosophy.tsx
    Treatments.tsx
    Products.tsx
    HallOfTrust.tsx
    FooterSection.tsx

lib/
  animations.ts
```

## Fitur Utama

- Preloader untuk first impression premium
- Custom cursor global (`cursor: none`)
- Smooth scrolling dengan Lenis
- Scroll-based animation dengan GSAP
- Navigasi sticky dengan active section state
- Section modular (Hero, Philosophy, Treatments, Products, Hall of Trust, Footer)

## Menjalankan Project

### 1) Install dependency

```bash
npm install
```

### 2) Jalankan development server

```bash
npm run dev
```

### 3) Build production

```bash
npm run build
```

### 4) Jalankan hasil build

```bash
npm run start
```

## Scripts

- `npm run dev` : Jalankan mode development
- `npm run build` : Build production Next.js
- `npm run start` : Serve hasil build production

## Catatan Development

- Gunakan komponen section agar layout tetap modular.
- Simpan utilitas animasi di `lib/animations.ts` agar easing/timing konsisten.
- Hindari menambah warna baru di luar token tanpa kebutuhan desain yang kuat.
- Prioritaskan aksesibilitas: fokus state, struktur heading, dan semantic HTML.

## Deployment

Project siap dideploy ke platform yang mendukung Next.js (contoh: Vercel).

Alur standar:

1. Push ke repository Git
2. Hubungkan repository ke platform deployment
3. Set build command: `npm run build`
4. Set start command: `npm run start` (jika perlu mode custom hosting)

## License

Private project for JGLOW.
