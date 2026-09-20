<script setup lang="ts">
withDefaults(defineProps<{ large?: boolean }>(), { large: false })

const { open } = useWaitlist()
</script>

<template>
  <button type="button" class="cta" :class="{ 'cta-lg': large }" @click="open">
    Join the waitlist
  </button>
</template>
