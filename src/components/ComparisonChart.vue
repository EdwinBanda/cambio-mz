<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Chart from 'chart.js/auto'
import { formatNumber } from '../utils/formatters'

const props = defineProps({ currencies: { type: Array, default: () => [] }, compact: Boolean })
const canvas = ref(null)
let chart
const ranked = computed(() => props.currencies.slice().sort((a, b) => b.valueMzn - a.valueMzn).slice(0, props.compact ? 6 : 12))

function renderChart() {
  if (!canvas.value) return
  chart?.destroy()
  chart = new Chart(canvas.value, {
    type: 'bar',
    data: {
      labels: ranked.value.map((item) => item.code),
      datasets: [{
        data: ranked.value.map((item) => item.valueMzn),
        backgroundColor: 'rgba(36, 79, 123, .78)',
        borderRadius: 2,
        borderSkipped: false,
        barThickness: 25,
      }],
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 200 },
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (context) => ` ${formatNumber(context.parsed.x)} MZN · exemplo` } },
      },
      scales: {
        x: { beginAtZero: true, grid: { color: '#e8edf2', drawBorder: false }, border: { display: false }, ticks: { color: '#748398', font: { family: 'Inter' } } },
        y: { grid: { display: false }, border: { display: false }, ticks: { color: '#40546b', font: { family: 'Inter', weight: 600 } } },
      },
    },
  })
}

onMounted(renderChart)
watch(ranked, renderChart, { deep: true })
onBeforeUnmount(() => chart?.destroy())
</script>

<template>
  <section class="chart-panel">
    <div class="panel-heading chart-heading">
      <div><span class="section-kicker">VALORES SINTÉTICOS</span><h2>Comparação de valores</h2><p>Valor de uma unidade de cada moeda, em MZN.</p></div>
      <span class="chart-legend"><i></i> Valor de exemplo</span>
    </div>
    <div v-if="!ranked.length" class="chart-empty"><i class="bi bi-bar-chart"></i><span>Sem valores disponíveis para comparar.</span></div>
    <div v-else class="chart-canvas-wrap" :class="{ 'compact-chart': compact }"><canvas ref="canvas" aria-label="Gráfico de comparação dos valores de demonstração" role="img"></canvas></div>
    <div class="chart-disclaimer"><i class="bi bi-info-circle"></i> Dados sintéticos apenas para demonstração; não representam taxas reais nem histórico de mercado.</div>
  </section>
</template>
