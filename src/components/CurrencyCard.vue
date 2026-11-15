<script setup>
import { formatNumber } from '../utils/formatters'

defineProps({
  currency: { type: Object, required: true },
  featured: Boolean,
  rank: Number,
})
</script>

<template>
  <article class="currency-card" :class="{ featured }">
    <div class="currency-card-top">
      <div class="currency-symbol">{{ currency.code.slice(0, 1) }}</div>
      <span class="currency-code">{{ currency.code }}</span>
      <span v-if="rank" class="currency-rank">#{{ rank }}</span>
    </div>
    <h3>{{ currency.name }}</h3>
    <div class="currency-rate">{{ formatNumber(currency.valueMzn) }} <small>MZN</small></div>
    <div class="currency-card-bottom"><span>Exemplo · 1 {{ currency.code }}</span><i class="bi bi-arrow-up-right"></i></div>
  </article>
</template>
