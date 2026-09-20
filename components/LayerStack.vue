<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    /** 0 = at rest, 1–3 = that layer is forward, 4 = merged */
    active?: number
    tilt?: number
  }>(),
  { active: 0, tilt: 14 },
)

const merged = computed(() => props.active === 4)

function stateFor(layer: number) {
  if (props.active === 0 || merged.value) return 'rest'
  return props.active === layer ? 'on' : 'off'
}
</script>

<template>
  <!-- Decorative: every claim it makes is carried by the copy beside it. -->
  <div
    class="stack"
    aria-hidden="true"
    :data-merged="merged ? 'true' : 'false'"
    :style="{ '--tilt': `${tilt}deg` }"
  >
    <div class="plane plane--trust" :data-state="stateFor(1)">
      <SliceTrust />
    </div>
    <div class="plane plane--consent" :data-state="stateFor(2)">
      <SliceConsent />
    </div>
    <div class="plane plane--rights" :data-state="stateFor(3)">
      <SliceRights />
    </div>
  </div>
</template>
