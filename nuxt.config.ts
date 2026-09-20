export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts'],
  typescript: { strict: true },

  fonts: {
    families: [
      { name: 'Geist', provider: 'google', weights: [400, 500] },
      { name: 'Geist Mono', provider: 'google', weights: [400, 500] },
    ],
    defaults: { subsets: ['latin'] },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Sentinel — the front door of DPDP',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'One public front door for DPDP: trust center, consent, and data requests. Set up in a day, current every day after.',
        },
        { name: 'theme-color', content: '#FFFFFF' },
        { property: 'og:title', content: 'Sentinel — the front door of DPDP' },
        {
          property: 'og:description',
          content: 'Pass the DPDP question every client asks. One front door.',
        },
        { property: 'og:type', content: 'website' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      script: [
        {
          src: 'https://dpdp-prod.vercel.app/sdk/v1/s.js',
          'data-org': 'd94c503e-f36d-48bb-b34b-8fc1413cdccb',
          async: true,
        },
      ],
    },
  },
})
