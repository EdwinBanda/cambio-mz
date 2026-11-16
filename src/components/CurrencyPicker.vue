<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps({
  currencies: { type: Array, required: true },
  modelValue: { type: String, required: true },
  label: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue'])
const root = ref(null)
const open = ref(false)
const selectedCurrency = computed(() => props.currencies.find((currency) => currency.code === props.modelValue))

function flagEmoji(countryCode) {
  if (!/^[a-z]{2}$/i.test(countryCode ?? '')) return '🌐'
  return String.fromCodePoint(...countryCode.toUpperCase().split('').map((letter) => 127397 + letter.charCodeAt(0)))
}

function chooseCurrency(currency) {
  emit('update:modelValue', currency.code)
  open.value = false
}

function closeOnOutsideClick(event) {
  if (!root.value?.contains(event.target)) open.value = false
}

onMounted(() => document.addEventListener('pointerdown', closeOnOutsideClick))
onBeforeUnmount(() => document.removeEventListener('pointerdown', closeOnOutsideClick))
</script>

<template>
  <div ref="root" class="currency-picker">
    <button
      class="currency-picker-trigger"
      type="button"
      :aria-label="`${label}: ${selectedCurrency?.country ?? 'Selecionar país'}`"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="open = !open"
    >
      <span
        v-if="selectedCurrency?.countryCode"
        class="country-flag"
        role="img"
        :aria-label="`Bandeira de ${selectedCurrency.country}`"
      >{{ flagEmoji(selectedCurrency.countryCode) }}</span>
      <span class="picker-selected-code">{{ selectedCurrency?.code ?? '—' }}</span>
      <i class="bi bi-chevron-down picker-chevron"></i>
    </button>
    <div v-if="open" class="currency-picker-menu" role="listbox" :aria-label="label">
      <button
        v-for="currency in currencies"
        :key="currency.code"
        class="currency-picker-option"
        :class="{ 'is-selected': currency.code === modelValue }"
        type="button"
        role="option"
        :aria-selected="currency.code === modelValue"
        @click="chooseCurrency(currency)"
      >
        <span
          class="country-flag"
          role="img"
          :aria-label="`Bandeira de ${currency.country}`"
        >{{ flagEmoji(currency.countryCode) }}</span>
        <span class="picker-option-copy"><strong>{{ currency.country }}</strong><small>{{ currency.name }}</small></span>
        <span class="picker-option-code">{{ currency.code }}</span>
      </button>
    </div>
  </div>
</template>
