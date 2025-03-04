<template>
  <div class="flex-1 flex flex-col items-center justify-center bg-gray-900 text-white">
    <div class="bg-gray-900 shadow-lg rounded-xl p-10 max-w-lg text-center border border-gray-700">
      <h1 class="text-4xl font-bold text-white">🚗 Selamat Datang di <span class="text-gray-300">Rently</span></h1>
      <p class="text-lg text-gray-400 mt-3">Sewa kendaraan dengan mudah, cepat, dan harga terjangkau.</p>

      <router-link to="/kendaraan"
        class="mt-6 inline-block px-6 py-3 text-lg font-semibold text-black bg-white rounded-full shadow-md hover:bg-gray-300 transition-all duration-300 transform hover:scale-105">
        Lihat Kendaraan 🚘
      </router-link>
    </div>

    <footer class="absolute bottom-5 text-gray-500 text-sm">
      &copy; 2024 Rently. All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: "DashboardView",
};
</script>
