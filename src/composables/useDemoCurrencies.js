import { computed, onMounted, ref } from 'vue'
import { demoCurrencies } from '../data/demoCurrencies'

const currencies = ref(demoCurrencies)
const refreshedAt = ref(null)
const refreshing = ref(false)

export function useDemoCurrencies() {
  const hasCurrencies = computed(() => currencies.value.length > 0)

  async function reloadDemo() {
    refreshing.value = true
    await new Promise((resolve) => setTimeout(resolve, 250))
    refreshedAt.value = new Date()
    refreshing.value = false
  }

  onMounted(() => { refreshedAt.value ??= new Date() })

  return { currencies, refreshedAt, refreshing, hasCurrencies, reloadDemo }
}
