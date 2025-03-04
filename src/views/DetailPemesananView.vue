<template>
  <div class="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-6">Detail Pemesanan</h1>

    <div v-if="!pemesanan" class="text-center text-gray-500">Memuat data...</div>

    <div v-else>
      <!-- Informasi Kendaraan -->
      <div class="flex space-x-6">
        <img :src="pemesanan.kendaraan.gambar_url" alt="Kendaraan" class="w-1/3 h-48 object-cover rounded-lg">
        <div class="w-2/3">
          <h2 class="text-xl font-semibold">{{ pemesanan.kendaraan.merek_model }}</h2>
          <p class="text-gray-600">Kategori: {{ pemesanan.kendaraan.kategori_kendaraan }}</p>
          <p class="text-gray-600">Lokasi: {{ pemesanan.kendaraan.lokasi_kendaraan }}</p>
          <p class="text-gray-600">Transmisi: {{ pemesanan.kendaraan.jenis_transmisi }}</p>
          <p class="text-gray-600">Kapasitas: {{ pemesanan.kendaraan.kapasitas_kursi }} kursi</p>
        </div>
      </div>

      <!-- Detail Pemesanan -->
      <div class="mt-6 p-4 bg-gray-100 rounded-lg">
        <h2 class="text-lg font-semibold">Detail Penyewaan</h2>
        <p>Tanggal Mulai: <strong>{{ pemesanan.tanggal_mulai }}</strong></p>
        <p>Tanggal Selesai: <strong>{{ pemesanan.tanggal_selesai }}</strong></p>
        <p>Total Harga: <strong class="text-blue-500">Rp {{ formatHarga(pemesanan.total_harga_sewa) }}</strong></p>
        <p :class="getStatusColor(pemesanan.status_pemesanan)">
          Status: <strong>{{ pemesanan.status_pemesanan }}</strong>
        </p>
      </div>

      <!-- Tombol Bayar Jika Statusnya Pending -->
      <div class="mt-6" v-if="pemesanan.status_pemesanan === 'Menunggu Pembayaran'">
        <button @click="bayar" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Bayar Sekarang
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pemesanan: null
    };
  },
  methods: {
    async fetchDetailPemesanan() {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`http://127.0.0.1:8000/api/pemesanan/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.pemesanan = response.data;
      } catch (error) {
        console.error("Gagal mengambil detail pemesanan:", error);
      }
    },
    formatHarga(harga) {
      return new Intl.NumberFormat("id-ID").format(harga);
    },
    getStatusColor(status) {
      return {
        "Pending": "text-yellow-500",
        "Menunggu Konfirmasi": "text-orange-500",
        "Dikonfirmasi": "text-green-500",
        "Sedang dalam Penggunaan": "text-blue-500",
        "Selesai": "text-gray-500",
        "Dibatalkan": "text-red-500"
      }[status] || "text-gray-500";
    },
    bayar() {
      this.$router.push(`/detail-pemesanan/${this.pemesanan.id}/bayar`);
    }
  },
  mounted() {
    this.fetchDetailPemesanan();
  }
};
</script>
