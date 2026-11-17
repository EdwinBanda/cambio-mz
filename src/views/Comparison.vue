<script setup>
import { useDemoCurrencies } from '../composables/useDemoCurrencies'
import ComparisonChart from '../components/ComparisonChart.vue'

const { currencies } = useDemoCurrencies()
</script>

<template>
  <div class="page-stack">
    <section class="page-intro"><div><span class="section-kicker">VALORES SINTÉTICOS · DEMONSTRAÇÃO</span><h2>Comparação de moedas</h2><p>Compare o valor de cada moeda em meticais.</p></div><div class="intro-icon"><i class="bi bi-bar-chart-line"></i></div></section>
    <ComparisonChart :currencies="currencies" />
  </div>
</template>
