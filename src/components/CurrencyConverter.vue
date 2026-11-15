<script setup>
import { computed, ref, watch } from 'vue'
import { formatNumber } from '../utils/formatters'
import CurrencyPicker from './CurrencyPicker.vue'

const props = defineProps({ currencies: { type: Array, default: () => [] }, compact: Boolean })
const amount = ref('')
const from = ref('MZN')
const to = ref('')
const currencies = computed(() => [{
  code: 'MZN',
  name: 'Metical moçambicano',
  country: 'Moçambique',
  countryCode: 'mz',
  valueMzn: 1,
}, ...props.currencies.filter((currency) => currency.code !== 'MZN')])
watch(currencies, (list) => {
  if (!list.some((item) => item.code === to.value)) to.value = list.find((item) => item.code !== 'MZN')?.code ?? ''
}, { immediate: true })
const sourceCurrency = computed(() => currencies.value.find((item) => item.code === from.value))
const targetCurrency = computed(() => currencies.value.find((item) => item.code === to.value))
const result = computed(() => {
  const numericAmount = Number(String(amount.value).replace(',', '.'))
  if (!Number.isFinite(numericAmount) || numericAmount <= 0 || !sourceCurrency.value || !targetCurrency.value) return null
  return numericAmount * sourceCurrency.value.valueMzn / targetCurrency.value.valueMzn
})

function invert() {
  const previous = from.value
  from.value = to.value
  to.value = previous
}

function clear() {
  amount.value = ''
  from.value = 'MZN'
  to.value = currencies.value.find((item) => item.code !== 'MZN')?.code ?? ''
}
</script>

<template>
  <section class="converter-panel" :class="{ 'compact-converter': compact }">
    <div v-if="!compact" class="panel-heading converter-heading">
      <div><span class="section-kicker">SIMULAÇÃO</span><h2>Faça uma conversão</h2><p>Escolha as moedas e introduza o valor que pretende calcular.</p></div>
      <div class="converter-heading-icon"><i class="bi bi-arrow-left-right"></i></div>
    </div>
    <div v-if="currencies.length < 2" class="converter-unavailable">
      <i class="bi bi-currency-exchange"></i><span>Adicione moedas de exemplo para experimentar o conversor.</span>
    </div>
    <template v-else>
      <div class="conversion-fields">
        <label class="conversion-field"><span>Tenho</span><div class="field-control"><input v-model="amount" type="number" min="0" step="any" placeholder="0,00" aria-label="Valor a converter" /><CurrencyPicker v-model="from" :currencies="currencies" label="Moeda de origem" /></div></label>
        <button class="invert-button" aria-label="Inverter moedas" @click="invert"><i class="bi bi-arrow-down-up"></i></button>
        <label class="conversion-field"><span>Quero receber</span><div class="field-control"><div class="result-value">{{ result === null ? '—' : formatNumber(result) }}</div><CurrencyPicker v-model="to" :currencies="currencies" label="Moeda de destino" /></div></label>
      </div>
      <div v-if="result !== null" class="conversion-summary"><span><i class="bi bi-check-circle-fill"></i> Estimativa calculada</span><button aria-label="Limpar conversão" @click="clear"><i class="bi bi-arrow-counterclockwise"></i> Limpar</button></div>
      <div v-else class="conversion-summary"><span><i class="bi bi-info-circle-fill"></i> Introduza um valor para converter</span><button aria-label="Limpar conversão" @click="clear"><i class="bi bi-arrow-counterclockwise"></i> Limpar</button></div>
      <div class="converter-note"><i class="bi bi-info-circle"></i><span>Demonstração: cada valor representa uma unidade sintética da moeda em meticais, apenas para experimentar a conversão. Não utilizar em transações.</span></div>
    </template>
  </section>
</template>
