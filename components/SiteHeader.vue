<template>
  <header
    class="site-header sticky top-0 z-40 border-b backdrop-blur-sm"
    style="border-color: var(--line)"
  >
    <div class="wrap flex h-16 items-center justify-between">
      <NuxtLink to="/" class="text-[1.0625rem] font-medium tracking-tightest">
        Sentinel
      </NuxtLink>
      <WaitlistButton />
    </div>
  </header>
</template>
