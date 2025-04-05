<template>
  <div class="flex flex-col min-h-screen bg-WHITE">
    <HeaderNavigation v-if="!$route.path.startsWith('/admin') && !$route.meta.hideHeader" />
    <main class="flex-1 mt-10">
      <router-view />
    </main>
    <Footer v-if="!$route.path.startsWith('/admin')" class="mt-10"/>
  </div>
</template>

<script>
import HeaderNavigation from './components/HeaderNavigation.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    HeaderNavigation,
    Footer
  }
};
</script>
