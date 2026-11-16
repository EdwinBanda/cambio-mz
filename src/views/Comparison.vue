<script setup>
import { useDemoCurrencies } from '../composables/useDemoCurrencies'
import ComparisonChart from '../components/ComparisonChart.vue'

const { currencies } = useDemoCurrencies()
</script>

<template>
  <div class="page-stack">
    <section class="page-intro"><div><span class="section-kicker">VALORES SINTÉTICOS · DEMONSTRAÇÃO</span><h2>Comparação de moedas</h2><p>Compare o valor de cada moeda em meticais.</p></div><div class="intro-icon"><i class="bi bi-bar-chart-line"></i></div></section>
    <ComparisonChart :currencies="currencies" />
    <section class="assumption-panel history-note"><div class="assumption-icon"><i class="bi bi-info-circle"></i></div><div><h3>Valores apenas para demonstração</h3><p>Os valores deste gráfico são sintéticos e não representam taxas reais nem uma série histórica de mercado.</p></div></section>
  </div>
</template>
