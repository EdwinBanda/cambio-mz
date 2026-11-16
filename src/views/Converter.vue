<script setup>
import { useDemoCurrencies } from '../composables/useDemoCurrencies'
import CurrencyConverter from '../components/CurrencyConverter.vue'

const { currencies } = useDemoCurrencies()
</script>

<template>
  <div class="page-stack">
    <section class="page-intro"><div><span class="section-kicker">VALORES SINTÉTICOS · DEMONSTRAÇÃO</span><h2>Conversor de moedas</h2><p>Introduza um valor e selecione as moedas de origem e destino.</p></div><div class="intro-icon"><i class="bi bi-arrow-left-right"></i></div></section>
    <CurrencyConverter :currencies="currencies" allow-email />
    <section class="assumption-panel">
      <div class="assumption-icon"><i class="bi bi-lightbulb"></i></div>
      <div><h3>Sobre os valores de demonstração</h3><p>As moedas e os valores apresentados são sintéticos e servem apenas para explorar o formulário e testar a conversão. O cálculo usa o metical como referência e não representa taxas atuais, taxas de compra ou venda, cotações garantidas ou ofertas de transação.</p></div>
    </section>
  </div>
</template>
