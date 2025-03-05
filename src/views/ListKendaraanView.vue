<template>
  <div class="flex-1 p-6">
    <div v-if="kendaraan.length === 0" class="text-center text-gray-500">
      Tidak ada kendaraan tersedia.
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div
        v-for="item in kendaraan"
        :key="item.id"
        class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
        @click="goToDetail(item.id)"
      >
        <img :src="item.gambar_url" alt="Kendaraan" class="w-full h-40 object-cover">

        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-800">{{ item.merek_model }}</h2>
          <p class="text-gray-600">Lokasi: {{ item.lokasi_kendaraan }}</p>
          <p class="text-blue-500 font-bold mt-2">Rp {{ formatHarga(item.harga_sewa_per_periode) }} / hari</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      kendaraan: []
    };
  },
  methods: {
    async fetchKendaraan() {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/kendaraan`);
        this.kendaraan = response.data;
      } catch (error) {
        console.error("Gagal mengambil data kendaraan:", error);
      }
    },
    formatHarga(harga) {
      return new Intl.NumberFormat('id-ID').format(harga);
    },
    goToDetail(id) {
      this.$router.push(`/kendaraan/${id}`);
    }
  },
  mounted() {
    this.fetchKendaraan();
  }
};
</script>

<style>
body {
  background-color: #f8f9fa;
}
</style>
