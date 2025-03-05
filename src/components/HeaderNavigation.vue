<template>
  <nav class="sticky top-0 bg-white text-black p-4 shadow-md">
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo / Home -->
      <router-link to="/" class="text-xl font-bold">Rently</router-link>

      <!-- Menu Navigasi -->
      <div class="flex space-x-6">
        <router-link to="/" class="hover:text-gray-300">Home</router-link>
        <router-link to="/kendaraan" class="hover:text-gray-300">List Kendaraan</router-link>
      </div>

      <!-- Login / User Dropdown -->
      <div class="relative">
        <template v-if="isLoggedIn">
          <button @click="toggleDropdown" class="flex items-center space-x-2">
            <span class="font-semibold">{{ user.nama_lengkap }}</span>
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden">
            <router-link to="/riwayat-pemesanan" class="block px-4 py-2 hover:bg-gray-200">Riwayat Pemesanan</router-link>
            <button @click="logout" class="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
          </div>
        </template> 

        <template v-else>
          <router-link to="/login" class="hover:text-gray-300">Login</router-link>
          <span class="mx-2">|</span>
          <router-link to="/register" class="hover:text-gray-300">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
      user: JSON.parse(localStorage.getItem('user')) || null
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('access_token');
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      this.user = null;
      this.$router.push('/login');
    }
  }
};
</script>
