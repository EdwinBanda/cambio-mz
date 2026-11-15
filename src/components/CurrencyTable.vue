<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { formatNumber } from '../utils/formatters'

const props = defineProps({ currencies: { type: Array, default: () => [] } })
const route = useRoute()
const router = useRouter()
const search = ref(typeof route.query.q === 'string' ? route.query.q : '')
const direction = ref('desc')

watch(() => route.query.q, (value) => { search.value = typeof value === 'string' ? value : '' })
watch(search, (value) => {
  const query = { ...route.query }
  if (value.trim()) query.q = value.trim()
  else delete query.q
  router.replace({ query })
})

const filteredCurrencies = computed(() => {
  const term = search.value.trim().toLocaleLowerCase('pt')
  return props.currencies
    .filter((currency) => !term || currency.code.toLowerCase().includes(term) || currency.name.toLocaleLowerCase('pt').includes(term))
    .slice()
    .sort((a, b) => direction.value === 'asc' ? a.valueMzn - b.valueMzn : b.valueMzn - a.valueMzn)
})
</script>

<template>
  <section class="table-panel">
    <div class="panel-heading table-heading">
      <div><span class="section-kicker">DADOS SINTÉTICOS · DEMONSTRAÇÃO</span><h2>Moedas para explorar</h2><p>Valores de exemplo para testar a interface e o conversor.</p></div>
      <div class="table-controls">
        <label class="table-search"><i class="bi bi-search"></i><input v-model="search" placeholder="Pesquisar moeda..." aria-label="Pesquisar moeda" /></label>
        <button class="sort-button" :aria-label="direction === 'desc' ? 'Ordenar crescente' : 'Ordenar decrescente'" @click="direction = direction === 'desc' ? 'asc' : 'desc'">
          <i class="bi bi-sort-down"></i><span>{{ direction === 'desc' ? 'Maior valor' : 'Menor valor' }}</span>
        </button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table currency-table">
        <thead><tr><th>MOEDA</th><th>CÓDIGO</th><th class="text-end">VALOR DE EXEMPLO</th><th></th></tr></thead>
        <tbody>
          <tr v-for="currency in filteredCurrencies" :key="currency.code">
            <td><div class="table-currency"><div class="currency-mini">{{ currency.code.slice(0, 1) }}</div><strong>{{ currency.name }}</strong></div></td>
            <td><span class="table-code">{{ currency.code }}</span></td>
            <td class="text-end"><strong class="table-rate">{{ formatNumber(currency.valueMzn) }}</strong><span class="table-unit"> MZN</span></td>
            <td class="text-end"><i class="bi bi-chevron-right table-arrow"></i></td>
          </tr>
          <tr v-if="filteredCurrencies.length === 0"><td colspan="4" class="empty-row"><i class="bi bi-search"></i><strong>Nenhuma moeda encontrada</strong><span>Ajuste a pesquisa e tente novamente.</span></td></tr>
        </tbody>
      </table>
    </div>
    <div class="table-footnote"><i class="bi bi-info-circle"></i> Valores sintéticos, sem ligação a taxas de mercado ou instituições financeiras. Não utilizar em transações.</div>
  </section>
</template>
