<script setup>
import { computed, ref, watch } from 'vue'
import emailjs from '@emailjs/browser'
import { formatDate, formatNumber } from '../utils/formatters'
import CurrencyPicker from './CurrencyPicker.vue'

const props = defineProps({ currencies: { type: Array, default: () => [] }, compact: Boolean, allowEmail: Boolean })
const email = ref('')
const sending = ref(false)
const emailMessage = ref('')
const emailStatus = ref('')
const conversionDate = ref(new Date())
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

watch([amount, from, to, result], () => {
  conversionDate.value = new Date()
  emailMessage.value = ''
  emailStatus.value = ''
}, { flush: 'sync' })
watch(email, () => { emailMessage.value = ''; emailStatus.value = '' }, { flush: 'sync' })

async function sendResult() {
  if (sending.value || !props.allowEmail || props.compact || result.value === null || !Number.isFinite(result.value)) return
  const recipient = email.value.trim()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
    emailStatus.value = 'error'
    emailMessage.value = 'Introduza um endereço de e-mail válido.'
    return
  }
  // Capture the conversion before awaiting the request; editing remains available.
  const parameters = {
    to_email: recipient,
    amount: formatNumber(Number(String(amount.value).replace(',', '.'))),
    from_currency: from.value,
    to_currency: to.value,
    result: formatNumber(result.value),
    rate: formatNumber(sourceCurrency.value.valueMzn / targetCurrency.value.valueMzn, 6),
    date: formatDate(conversionDate.value),
  }
  sending.value = true
  emailStatus.value = ''
  emailMessage.value = ''
  try {
    await emailjs.send('service_zuufgtd', 'template_y5nxxf5', parameters, { publicKey: 'XNC1Vu7aKvXPMaLgT' })
    emailStatus.value = 'success'
    emailMessage.value = `Resultado enviado para ${recipient}.`
  } catch {
    emailStatus.value = 'error'
    emailMessage.value = 'Não foi possível enviar o e-mail. Tente novamente.'
  } finally {
    sending.value = false
  }
}

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
      <form v-if="allowEmail && !compact && result !== null && Number.isFinite(result)" class="conversion-email" novalidate @submit.prevent="sendResult">
        <h3>Enviar resultado por e-mail</h3>
        <p>Envie esta simulação com valores demonstrativos para o seu e-mail.</p>
        <div class="conversion-email-fields">
          <label><span>Endereço de e-mail</span><input v-model="email" type="email" autocomplete="email" required placeholder="nome@exemplo.com" :aria-invalid="emailStatus === 'error' ? 'true' : undefined" /></label>
          <button type="submit" :disabled="sending"><i class="bi bi-envelope"></i> {{ sending ? 'A enviar…' : 'Enviar resultado' }}</button>
        </div>
        <p v-if="emailMessage" class="conversion-email-message" :class="emailStatus" :role="emailStatus === 'error' ? 'alert' : 'status'">{{ emailMessage }}</p>
      </form>
    </template>
  </section>
</template>

<style scoped>
.conversion-email { margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--line); }
.conversion-email h3 { margin: 0 0 6px; font-size: 16px; font-weight: 700; color: var(--ink); }
.conversion-email p { margin: 0 0 14px; font-size: 13px; color: var(--muted); }
.conversion-email-fields { display: flex; align-items: flex-end; gap: 12px; }
.conversion-email-fields label { flex: 1; min-width: 0; font-size: 12px; color: var(--muted); }
.conversion-email-fields label span { display: block; margin-bottom: 6px; }
.conversion-email-fields input { width: 100%; height: 42px; padding: 0 12px; border: 1px solid var(--line); border-radius: 8px; background: #fff; color: var(--ink); font: inherit; }
.conversion-email-fields input:focus { outline: 2px solid var(--green); outline-offset: 2px; }
.conversion-email-fields button { min-height: 42px; padding: 10px 16px; border: 0; border-radius: 8px; background: var(--green); color: #fff; font-size: 13px; font-weight: 600; }
.conversion-email-fields button:hover { background: var(--green-dark); }
.conversion-email-fields button:disabled { opacity: .65; cursor: wait; }
.conversion-email .conversion-email-message { margin: 12px 0 0; overflow-wrap: anywhere; }
.conversion-email-message.success { color: #17684c; }
.conversion-email-message.error { color: #bd443a; }
@media (max-width: 600px) {
  .conversion-email-fields { flex-direction: column; align-items: stretch; }
}
</style>
