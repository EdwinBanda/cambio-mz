<script setup>
import { useDemoCurrencies } from '../composables/useDemoCurrencies'
import ComparisonChart from '../components/ComparisonChart.vue'

const { currencies } = useDemoCurrencies()
</script>

<template>
  <div class="page-stack">
    <section class="page-intro"><div><span class="section-kicker">COMPARAÇÃO · DEMONSTRAÇÃO</span><h2>Uma visão de conjunto.</h2><p>Compare valores de exemplo para explorar o gráfico e a interface.</p></div><div class="intro-icon"><i class="bi bi-bar-chart-line"></i></div></section>
    <ComparisonChart :currencies="currencies" />
    <section class="assumption-panel history-note"><div class="assumption-icon"><i class="bi bi-info-circle"></i></div><div><h3>Valores apenas para demonstração</h3><p>Os valores deste gráfico são sintéticos e não representam taxas reais nem uma série histórica de mercado.</p></div></section>
  </div>
</template>
