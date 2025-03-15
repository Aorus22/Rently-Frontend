<template>
  <div class="flex h-screen w-screen">

    <Sidenav />
    <div class="flex-1 h-full p-6 bg-gray-100">
      <router-view />
    </div>
  </div>
</template>

<script>
import Sidenav from './Sidenav.vue';

export default {
  components: {
    Sidenav
  }
};
</script>
