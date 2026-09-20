<script setup lang="ts">
type Beat = {
  id: string
  title: string
  sub: string
  slice: 'trust' | 'consent' | 'rights' | null
}

const beats: Beat[] = [
  {
    id: 'hero',
    title: 'Pass the DPDP question every client asks.',
    sub: 'One front door. Set up in a day, current every day after.',
    slice: null,
  },
  {
    id: 'trust',
    title: 'This is what every client sees.',
    sub: 'Your policies, breach status, and contact — on one public page.',
    slice: 'trust',
  },
  {
    id: 'consent',
    title: 'Every choice, captured and kept.',
    sub: 'A banner that runs itself, with a record behind every consent.',
    slice: 'consent',
  },
  {
    id: 'rights',
    title: 'Requests land here — with an owner and a clock.',
    sub: 'From the first day, every request has an owner.',
    slice: 'rights',
  },
  {
    id: 'merge',
    title: 'Three layers. One front door.',
    sub: 'That’s all you need.',
    slice: null,
  },
]

/** Scroll progress at which each beat after the hero takes over. */
const STOPS = [0.16, 0.36, 0.56, 0.76]

const spine = ref<HTMLElement | null>(null)
const active = ref(0)
const tilt = ref(14)

let pinned = false
let queued = false

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

function measure() {
  const el = spine.value
  if (!el || !pinned) return

  const travel = el.offsetHeight - window.innerHeight
  const p = travel > 0 ? clamp(-el.getBoundingClientRect().top / travel, 0, 1) : 0

  let i = 0
  for (const stop of STOPS) if (p >= stop) i += 1
  active.value = i

  // the one continuous thread: the object settles flatter as you go
  const settle = 1 - Math.pow(1 - clamp(p / 0.8, 0, 1), 3)
  tilt.value = 14 - 8 * settle
}

function onScroll() {
  if (queued) return
  queued = true
  requestAnimationFrame(() => {
    queued = false
    measure()
  })
}

let mqPin: MediaQueryList
let mqMotion: MediaQueryList

function sync() {
  pinned = mqPin.matches && !mqMotion.matches
  if (pinned) {
    measure()
  } else {
    active.value = 0
    tilt.value = 14
  }
}

onMounted(() => {
  mqPin = window.matchMedia('(min-width: 1024px)')
  mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  sync()
  mqPin.addEventListener('change', sync)
  mqMotion.addEventListener('change', sync)
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  mqPin?.removeEventListener('change', sync)
  mqMotion?.removeEventListener('change', sync)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <section ref="spine" class="spine">
    <!-- Pinned: one object, one idea at a time. -->
    <div class="spine-motion">
      <div class="spine-pin">
        <div class="wrap grid grid-cols-12 items-center gap-10">
          <div class="beats col-span-5">
            <div
              v-for="(beat, i) in beats"
              :key="beat.id"
              class="beat"
              :data-on="i === active ? 'true' : 'false'"
            >
              <component
                :is="i === 0 ? 'h1' : 'h2'"
                :class="i === 0 ? 'h-display' : 'h-beat'"
              >
                {{ beat.title }}
              </component>
              <p class="sub">{{ beat.sub }}</p>
              <div v-if="beat.slice === null" class="mt-9">
                <WaitlistButton large />
              </div>
            </div>
          </div>

          <div class="col-span-7">
            <LayerStack :active="active" :tilt="tilt" />
          </div>
        </div>
      </div>
    </div>

    <!--
      No pin, no motion: the same story read straight down. The stack is the
      pinned view's object; here each slice appears once, under its own line,
      so nothing is shown twice.
    -->
    <div class="spine-static">
      <div class="wrap flex min-h-[86vh] flex-col justify-center py-20">
        <h1 class="h-display">{{ beats[0].title }}</h1>
        <p class="sub">{{ beats[0].sub }}</p>
        <div class="mt-9">
          <WaitlistButton large />
        </div>
      </div>

      <div
        v-for="beat in beats.slice(1, 4)"
        :key="beat.id"
        class="wrap border-t py-20 sm:py-24"
        style="border-color: var(--line)"
      >
        <h2 class="h-beat">{{ beat.title }}</h2>
        <p class="sub">{{ beat.sub }}</p>
        <div class="mt-10 max-w-[430px]">
          <SliceTrust v-if="beat.slice === 'trust'" />
          <SliceConsent v-else-if="beat.slice === 'consent'" />
          <SliceRights v-else-if="beat.slice === 'rights'" />
        </div>
      </div>

      <div class="wrap border-t py-20 sm:py-24" style="border-color: var(--line)">
        <h2 class="h-beat">{{ beats[4].title }}</h2>
        <p class="sub">{{ beats[4].sub }}</p>
        <div class="mt-9">
          <WaitlistButton large />
        </div>
      </div>
    </div>
  </section>
</template>
