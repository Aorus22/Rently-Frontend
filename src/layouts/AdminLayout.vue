<template>
  <div class="flex h-screen w-screen">
    <Sidenav />

    <div class="flex-1 max-h-screen ml-64 bg-gray-100">
      <div class="overflow-auto h-full">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Sidenav from '../components/admin/SidebarNavigation.vue';

export default {
  components: {
    Sidenav
  }
};
</script>
