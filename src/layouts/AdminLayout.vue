<template>
  <Sidenav />

  <div class="admin flex-1 md:ml-64 ml-0 overflow-auto mt-20 md:mt-0 p-4 md:p-12">
    <router-view />
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
