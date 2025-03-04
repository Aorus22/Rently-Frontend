<template>
  <div class="flex-1 p-6">
    <div v-if="loading" class="text-center text-gray-500">Memuat detail kendaraan...</div>

    <div v-else-if="kendaraan" class="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <img :src="kendaraan.gambar_url" alt="Kendaraan" class="w-full h-60 object-cover rounded-lg">

      <h1 class="text-2xl font-bold text-gray-800 mt-4">{{ kendaraan.merek_model }}</h1>
      <p class="text-gray-600">Kategori: {{ kendaraan.kategori_kendaraan }}</p>
      <p class="text-gray-600">Lokasi: {{ kendaraan.lokasi_kendaraan }}</p>
      <p class="text-gray-600">Tahun Produksi: {{ kendaraan.tahun_produksi }}</p>
      <p class="text-blue-500 font-bold mt-2">Rp {{ formatHarga(kendaraan.harga_sewa_per_periode) }} / hari</p>

      <button
        class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="goToPemesanan"
      >
        Pesan Sekarang
      </button>
    </div>

    <div v-else class="text-center text-red-500">Kendaraan tidak ditemukan.</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      kendaraan: null,
      loading: true
    };
  },
  methods: {
    async fetchDetail() {
      const id = this.$route.params.id;
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/kendaraan/${id}`);
        this.kendaraan = response.data;
      } catch (error) {
        console.error("Gagal mengambil detail kendaraan:", error);
      } finally {
        this.loading = false;
      }
    },
    formatHarga(harga) {
      return new Intl.NumberFormat('id-ID').format(harga);
    },
    goToPemesanan() {
      this.$router.push(`/kendaraan/${this.kendaraan.id}/pesan`);
    }
  },
  mounted() {
    this.fetchDetail();
  }
};
</script>
