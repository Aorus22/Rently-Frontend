<template>
  <aside class="w-64 bg-gray-800 text-white p-6 flex flex-col h-screen">
    <h2 class="text-xl font-bold mb-6">Admin Panel</h2>

    <nav class="flex-1">
      <router-link to="/admin/dashboard" class="block py-2 px-4 hover:bg-gray-700 rounded">
        🏠 Home
      </router-link>
      <router-link to="/admin/manage_kendaraan" class="block py-2 px-4 hover:bg-gray-700 rounded">
        🚗 Manage Kendaraan
      </router-link>
      <router-link to="/admin/manage_pelanggan" class="block py-2 px-4 hover:bg-gray-700 rounded">
        🫃 Manage Pelanggan
      </router-link>
    </nav>

    <button @click="logout" class="mt-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      🔒 Logout
    </button>
  </aside>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("admin_access_token");
      localStorage.removeItem("admin_token_type");
      localStorage.removeItem("admin");
      this.$router.push("/admin/login");
    }
  }
};
</script>
