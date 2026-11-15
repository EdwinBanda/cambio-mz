<script setup>
defineProps({
  label: String,
  value: String,
  detail: String,
  icon: String,
  tone: { type: String, default: 'green' },
})
</script>

<template>
  <article class="stat-card">
    <div class="stat-top"><span>{{ label }}</span><div :class="['stat-icon', `tone-${tone}`]"><i :class="['bi', icon]"></i></div></div>
    <div class="stat-value">{{ value }}</div>
    <div class="stat-detail">{{ detail }}</div>
  </article>
</template>
