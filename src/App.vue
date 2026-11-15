<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppSidebar from './components/AppSidebar.vue'
import AppNavbar from './components/AppNavbar.vue'
import AppFooter from './components/AppFooter.vue'

const route = useRoute()
const menuOpen = ref(false)
watch(() => route.fullPath, () => { menuOpen.value = false })
</script>

<template>
  <div class="app-shell">
    <AppSidebar :open="menuOpen" @close="menuOpen = false" />
    <div class="app-main">
      <AppNavbar :title="route.meta.title" :eyebrow="route.meta.eyebrow" @toggle-menu="menuOpen = !menuOpen" />
      <main class="page-content">
        <RouterView />
      </main>
      <AppFooter />
    </div>
    <button v-if="menuOpen" class="sidebar-backdrop" aria-label="Fechar menu" @click="menuOpen = false"></button>
  </div>
</template>
