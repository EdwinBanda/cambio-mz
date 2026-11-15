<script setup>
import { useDemoCurrencies } from '../composables/useDemoCurrencies'
import CurrencyTable from '../components/CurrencyTable.vue'

const { currencies, refreshing, reloadDemo } = useDemoCurrencies()
</script>

<template>
  <div class="page-stack">
    <section class="page-intro"><div><span class="section-kicker">DADOS SINTÉTICOS · DEMONSTRAÇÃO</span><h2>Explore as moedas.</h2><p>Pesquise e ordene valores de exemplo pelo nome ou código.</p></div><button class="refresh-button" :disabled="refreshing" @click="reloadDemo"><i :class="['bi', refreshing ? 'bi-arrow-repeat spinning' : 'bi-arrow-clockwise']"></i> Reiniciar</button></section>
    <CurrencyTable :currencies="currencies" />
  </div>
</template>
