<script setup>
import { useDemoCurrencies } from '../composables/useDemoCurrencies'
import CurrencyTable from '../components/CurrencyTable.vue'

const { currencies, refreshing, reloadDemo } = useDemoCurrencies()
</script>

<template>
  <div class="page-stack">
    <section class="page-intro"><div><span class="section-kicker">VALORES SINTÉTICOS · DEMONSTRAÇÃO</span><h2>Taxas de câmbio</h2><p>Pesquise moedas ou ordene os valores de referência.</p></div><button class="refresh-button" :disabled="refreshing" @click="reloadDemo"><i :class="['bi', refreshing ? 'bi-arrow-repeat spinning' : 'bi-arrow-clockwise']"></i> Reiniciar</button></section>
    <CurrencyTable :currencies="currencies" />
  </div>
</template>
