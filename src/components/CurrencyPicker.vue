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

const flagArtwork = {
  mz: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><path fill="#18864b" d="M0 0h24v5H0z"/><path fill="#fff" d="M0 5h24v1H0z"/><path fill="#111" d="M0 6h24v4H0z"/><path fill="#fff" d="M0 10h24v1H0z"/><path fill="#ed2929" d="M0 11h24v5H0z"/><path fill="#ed2929" d="m0 0 10 8-10 8z"/><path fill="#f8d116" d="m5 4 .8 2.4h2.5L6.3 7.9l.8 2.4L5 8.8l-2.1 1.5.8-2.4-2-1.5h2.5z"/></svg>',
  us: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><path fill="#fff" d="M0 0h24v16H0z"/><path fill="#b22234" d="M0 0h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24v1.23H0zm0 2.46h24V16H0z"/><path fill="#3c3b6e" d="M0 0h10.5v8.62H0z"/><path fill="#fff" d="m2 1  .3.7h.7l-.6.4.2.7-.6-.4-.6.4.2-.7-.6-.4h.7zM5 1l.3.7H6l-.6.4.2.7-.6-.4-.6.4.2-.7-.6-.4h.7zM8 1l.3.7H9l-.6.4.2.7-.6-.4-.6.4.2-.7-.6-.4h.7zM3.5 3l.3.7h.7l-.6.4.2.7-.6-.4-.6.4.2-.7-.6-.4h.7zM6.5 3l.3.7h.7l-.6.4.2.7-.6-.4-.6.4.2-.7-.6-.4h.7zM2 5l.3.7h.7l-.6.4.2.7-.6-.4-.6.4.2-.7-.6-.4h.7zM5 5l.3.7H6l-.6.4.2.7-.6-.4-.6.4.2-.7-.6-.4h.7zM8 5l.3.7H9l-.6.4.2.7-.6-.4-.6.4.2-.7-.6-.4h.7z"/></svg>',
  eu: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><path fill="#003399" d="M0 0h24v16H0z"/><g fill="#ffcc00"><circle cx="12" cy="3.3" r=".8"/><circle cx="15.1" cy="4.3" r=".8"/><circle cx="16.5" cy="7.5" r=".8"/><circle cx="15.1" cy="10.7" r=".8"/><circle cx="12" cy="11.7" r=".8"/><circle cx="8.9" cy="10.7" r=".8"/><circle cx="7.5" cy="7.5" r=".8"/><circle cx="8.9" cy="4.3" r=".8"/></g></svg>',
  za: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><path fill="#de3831" d="M0 0h24v7H8z"/><path fill="#fff" d="M0 0h24v2H0zM0 14h24v2H0z"/><path fill="#002395" d="M0 9h24v7H8z"/><path fill="#ffb81c" d="M0 0 11 8 0 16v-3l7-5-7-5z"/><path fill="#007a4d" d="M0 2 9 8 0 14H0v-3l5-3-5-3z"/><path fill="#fff" d="M0 4 6 8 0 12v-2l3-2-3-2z"/><path fill="#007a4d" d="M0 5 4.5 8 0 11z"/></svg>',
  gb: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><path fill="#012169" d="M0 0h24v16H0z"/><path stroke="#fff" stroke-width="4" d="m0 0 24 16M24 0 0 16"/><path stroke="#c8102e" stroke-width="1.5" d="m0 0 24 16M24 0 0 16"/><path stroke="#fff" stroke-width="6" d="M12 0v16M0 8h24"/><path stroke="#c8102e" stroke-width="3" d="M12 0v16M0 8h24"/></svg>',
  bw: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><path fill="#75aadb" d="M0 0h24v16H0z"/><path fill="#fff" d="M0 6h24v4H0z"/><path fill="#111" d="M0 7h24v2H0z"/></svg>',
  tz: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><path fill="#1eb53a" d="M0 0h24v16H0z"/><path fill="#00a3dd" d="M0 16 24 0v16z"/><path fill="#fcd116" d="m0 13 19.5-13H24L4.5 16H0zm19.5 3L24 13v3z"/><path fill="#111" d="m0 14.5L21.8 0H24L2.2 16H0z"/></svg>',
  ke: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><path fill="#fff" d="M0 0h24v16H0z"/><path fill="#111" d="M0 0h24v4H0z"/><path fill="#bb0000" d="M0 5h24v6H0z"/><path fill="#006600" d="M0 12h24v4H0z"/><path fill="#fff" d="M0 4h24v1H0zm0 6h24v1H0z"/><path fill="#111" stroke="#fff" stroke-width=".6" d="m12 4 2.6 4-2.6 4-2.6-4z"/><path fill="#bb0000" d="m12 5.2 1.5 2.8-1.5 2.8-1.5-2.8z"/></svg>',
  cn: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><path fill="#de2910" d="M0 0h24v16H0z"/><path fill="#ffde00" d="m5 2 .8 2.3h2.4l-2 1.4.8 2.3L5 6.6 3 8l.8-2.3-2-1.4h2.4z"/><circle fill="#ffde00" cx="10.5" cy="2.5" r=".65"/><circle fill="#ffde00" cx="12" cy="4.4" r=".65"/><circle fill="#ffde00" cx="12" cy="6.8" r=".65"/><circle fill="#ffde00" cx="10.5" cy="8.6" r=".65"/></svg>',
  default: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 16"><path fill="#f3f5f4" d="M0 0h24v16H0z"/><circle cx="12" cy="8" r="5" fill="none" stroke="#718078" stroke-width="1.5"/><path fill="#718078" d="M7 7h10v2H7zm4-4h2v10h-2z"/></svg>',
}

function flagImage(countryCode) {
  const artwork = flagArtwork[countryCode?.toLowerCase()] ?? flagArtwork.default
  return `data:image/svg+xml,${encodeURIComponent(artwork)}`
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
      <img
        v-if="selectedCurrency?.countryCode"
        class="country-flag"
        :src="flagImage(selectedCurrency.countryCode)"
        alt=""
        aria-hidden="true"
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
          :src="flagImage(currency.countryCode)"
          alt=""
          aria-hidden="true"
        />
        <span class="picker-option-copy"><strong>{{ currency.country }}</strong><small>{{ currency.name }}</small></span>
        <span class="picker-option-code">{{ currency.code }}</span>
      </button>
    </div>
  </div>
</template>
