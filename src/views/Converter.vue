<script setup>
import { useDemoCurrencies } from '../composables/useDemoCurrencies'
import CurrencyConverter from '../components/CurrencyConverter.vue'

const { currencies } = useDemoCurrencies()
</script>

<template>
  <div class="page-stack">
    <section class="page-intro"><div><span class="section-kicker">MODO DEMONSTRAÇÃO · VALORES SINTÉTICOS</span><h2>Experimente o conversor.</h2><p>Escolha as moedas, introduza um valor e explore os controlos da interface.</p></div><div class="intro-icon"><i class="bi bi-arrow-left-right"></i></div></section>
    <CurrencyConverter :currencies="currencies" />
    <section class="assumption-panel">
      <div class="assumption-icon"><i class="bi bi-lightbulb"></i></div>
      <div><h3>Sobre os valores de demonstração</h3><p>As moedas e os valores apresentados são sintéticos e servem apenas para explorar o formulário e testar a conversão. O cálculo usa o metical como referência e não representa taxas atuais, taxas de compra ou venda, cotações garantidas ou ofertas de transação.</p></div>
    </section>
  </div>
</template>
