<template>
  <div class="flex flex-col min-h-screen bg-gray-900">
    <HeaderNavigation v-if="!$route.path.startsWith('/admin') && !$route.meta.hideHeader" />

    <main class="flex-1 flex overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script>
import HeaderNavigation from './components/HeaderNavigation.vue';

export default {
  components: {
    HeaderNavigation
  }
};
</script>
