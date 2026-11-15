<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useDemoCurrencies } from '../composables/useDemoCurrencies'
import { formatNumber } from '../utils/formatters'
import CurrencyConverter from '../components/CurrencyConverter.vue'
import ComparisonChart from '../components/ComparisonChart.vue'
import CurrencyTable from '../components/CurrencyTable.vue'

const { currencies, hasCurrencies } = useDemoCurrencies()
const ranked = computed(() => currencies.value.slice().sort((a, b) => b.valueMzn - a.valueMzn))
</script>

<template>
  <div class="page-stack">
    <section class="dashboard-intro">
      <div class="intro-overline"><span></span> CÂMBIO, SEM COMPLICAÇÃO</div>
      <h2>O seu dinheiro.<br /><em>Outra perspetiva.</em></h2>
      <div class="intro-bottom">
        <p>Faça uma simulação, compare moedas e explore a interface com tranquilidade.</p>
        <span class="sample-notice"><i class="bi bi-info-circle"></i> Valores fictícios para demonstração</span>
      </div>
    </section>

    <template v-if="hasCurrencies">
      <section class="dashboard-converter">
        <div class="dashboard-section-heading">
          <div><span class="section-kicker">CONVERSOR</span><h3>Quanto quer converter?</h3></div>
          <RouterLink to="/conversor" class="text-link">Abrir conversor <i class="bi bi-arrow-up-right"></i></RouterLink>
        </div>
        <CurrencyConverter compact :currencies="currencies" />
      </section>

      <section class="dashboard-data-grid">
        <ComparisonChart compact :currencies="currencies" />
        <section class="currency-list-panel">
          <div class="dashboard-section-heading">
            <div><span class="section-kicker">MOEDAS</span><h3>Valores de referência</h3></div>
            <RouterLink to="/taxas" class="text-link">Ver todas <i class="bi bi-arrow-up-right"></i></RouterLink>
          </div>
          <div class="currency-list">
            <div v-for="currency in ranked.slice(0, 5)" :key="currency.code" class="currency-list-row">
              <span class="list-currency-code">{{ currency.code }}</span>
              <span class="list-currency-name">{{ currency.name }}</span>
              <strong>{{ formatNumber(currency.valueMzn) }} <small>MZN</small></strong>
            </div>
          </div>
          <p class="list-footnote">* Dados sintéticos, apenas para demonstração.</p>
        </section>
      </section>
    </template>
  </div>
</template>
