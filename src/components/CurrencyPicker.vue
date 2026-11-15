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
      <img
        v-if="selectedCurrency?.countryCode"
        class="country-flag"
        :src="`https://flagsapi.com/${selectedCurrency.countryCode.toUpperCase()}/flat/64.png`"
        :alt="`Bandeira de ${selectedCurrency.country}`"
        width="24"
        height="18"
        loading="lazy"
        @error="$event.target.hidden = true"
      />
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
        <img
          class="country-flag"
          :src="`https://flagsapi.com/${currency.countryCode.toUpperCase()}/flat/64.png`"
          :alt="`Bandeira de ${currency.country}`"
          width="24"
          height="18"
          loading="lazy"
          @error="$event.target.hidden = true"
        />
        <span class="picker-option-copy"><strong>{{ currency.country }}</strong><small>{{ currency.name }}</small></span>
        <span class="picker-option-code">{{ currency.code }}</span>
      </button>
    </div>
  </div>
</template>
