<script setup lang="ts">
const { isOpen, close } = useWaitlist()
const { $lenis } = useNuxtApp()

const panel = ref<HTMLElement | null>(null)
let returnFocus: HTMLElement | null = null

const TALLY_SRC = 'https://tally.so/widgets/embed.js'

/** Tally's own loader, kept verbatim in behaviour. */
function loadTallyEmbeds() {
  const d = document
  const v = () => {
    const T = (window as unknown as { Tally?: { loadEmbeds: () => void } }).Tally
    if (typeof T !== 'undefined') {
      T.loadEmbeds()
    } else {
      d.querySelectorAll<HTMLIFrameElement>(
        'iframe[data-tally-src]:not([src])',
      ).forEach((e) => {
        e.src = e.dataset.tallySrc as string
      })
    }
  }

  if (typeof (window as unknown as { Tally?: unknown }).Tally !== 'undefined') {
    v()
  } else if (d.querySelector(`script[src="${TALLY_SRC}"]`) == null) {
    const s = d.createElement('script')
    s.src = TALLY_SRC
    s.onload = v
    s.onerror = v
    d.body.appendChild(s)
  } else {
    v()
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(isOpen, async (open) => {
  if (open) {
    returnFocus = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    $lenis?.stop()
    document.addEventListener('keydown', onKeydown)
    await nextTick()
    panel.value?.focus()
    loadTallyEmbeds()
  } else {
    document.body.style.overflow = ''
    $lenis?.start()
    document.removeEventListener('keydown', onKeydown)
    returnFocus?.focus()
    returnFocus = null
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="isOpen"
          class="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
        >
          <div
            class="modal-backdrop absolute inset-0"
            @click="close"
          />

          <div
            ref="panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-title"
            tabindex="-1"
            class="relative w-full max-w-md rounded-t-2xl bg-bg p-6 shadow-2xl sm:rounded-2xl sm:p-8"
            style="border: 1px solid var(--line)"
          >
            <div class="flex items-start justify-between gap-6">
              <div>
                <h2 id="waitlist-title" class="text-xl font-medium">
                  Join the waitlist
                </h2>
                <p class="mt-1.5 text-[0.9375rem] text-muted">
                  We will write when there is a spot.
                </p>
              </div>
              <button
                type="button"
                class="-mr-1 -mt-1 rounded-full p-2 text-muted transition-colors hover:text-ink"
                aria-label="Close"
                @click="close"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M4 4l8 8M12 4l-8 8"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </button>
            </div>

            <div class="mt-5">
              <iframe
                data-tally-src="https://tally.so/embed/QKG4NX?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
                loading="lazy"
                width="100%"
                height="282"
                frameborder="0"
                title="Join the waitlist"
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s var(--ease);
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
