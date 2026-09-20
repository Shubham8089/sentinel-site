# Sentinel — landing page

Marketing site for Sentinel, the front door of DPDP for Indian SMBs: a public trust
center, consent, and a rights portal.

Everything shown on the page is a mock component. The real product is not imported here.

## Stack

- Nuxt 3 + TypeScript
- Tailwind (`@nuxtjs/tailwindcss`), tokens in `assets/css/tailwind.css`
- Geist / Geist Mono via `@nuxt/fonts`
- Lenis for smooth scroll; the pinned spine is a small scroll listener in
  `components/ScrollSpine.vue` (no animation library)
- Waitlist is a Tally embed mounted on demand in `components/WaitlistModal.vue`

## The spine

`ScrollSpine.vue` is the whole story: a hero beat, three layer beats, and a merge.
On desktop with motion allowed it pins and lifts one layer at a time. Below 1024px, or
under `prefers-reduced-motion`, the pin is off and the same beats read straight down —
that switch lives in CSS, so it survives without JavaScript.

## Local

```bash
npm install
npm run dev
```

## Deploy

Vercel, zero config.
