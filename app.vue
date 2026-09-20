<template>
  <div>
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
    >
      Skip to content
    </a>

    <div data-sentinel="notice"></div>

    <SiteHeader />

    <main id="main">
      <ScrollSpine />
      <ProofLine />
      <PricingLine />
    </main>

    <div data-sentinel="policy" data-slug="privacy-policy"></div>

    <SiteFooter />
    <WaitlistModal />
  </div>
</template>
