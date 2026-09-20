<template>
  <footer class="border-t" style="border-color: var(--line)">
    <div
      class="wrap flex flex-col gap-10 py-14 sm:flex-row sm:items-center sm:justify-between"
    >
      <div>
        <p class="text-[1.0625rem] font-medium tracking-tightest">Sentinel</p>
        <p class="mt-2 text-[0.875rem] text-muted">
          The front door of DPDP, for Indian teams.
        </p>
      </div>

      <div class="flex items-center gap-8">
        <a
          href="mailto:hello@sentinel.co.in"
          class="text-[0.875rem] text-muted transition-colors hover:text-ink"
        >
          hello@sentinel.co.in
        </a>
        <WaitlistButton />
      </div>
    </div>
  </footer>
</template>
