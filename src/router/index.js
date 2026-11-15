import { createRouter, createWebHashHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Converter from '../views/Converter.vue'
import Rates from '../views/Rates.vue'
import Comparison from '../views/Comparison.vue'
import About from '../views/About.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'dashboard', component: Dashboard, meta: { title: 'Início', eyebrow: 'Ferramentas de câmbio · Demonstração' } },
    { path: '/conversor', name: 'converter', component: Converter, meta: { title: 'Conversor', eyebrow: 'Faça as contas com confiança' } },
    { path: '/taxas', name: 'rates', component: Rates, meta: { title: 'Taxas de câmbio', eyebrow: 'Informação clara, decisão segura' } },
    { path: '/comparacao', name: 'comparison', component: Comparison, meta: { title: 'Comparação', eyebrow: 'Todas as moedas, lado a lado' } },
    { path: '/sobre', name: 'about', component: About, meta: { title: 'Sobre o Cambio-MZ', eyebrow: 'Câmbio com clareza' } },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
