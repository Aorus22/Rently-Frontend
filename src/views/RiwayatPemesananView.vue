<template>
  <div class="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg flex">
    <!-- Sidebar Tabs -->
    <div class="w-1/4 border-r pr-4">
      <h2 class="text-lg font-semibold mb-4">Riwayat Pemesanan</h2>
      <ul>
        <li
          v-for="tab in tabs"
          :key="tab.status"
          @click="selectedTab = tab.status"
          :class="['cursor-pointer py-2 px-3 rounded-lg', selectedTab === tab.status ? 'bg-blue-500 text-white' : 'hover:bg-gray-200']"
        >
          {{ tab.label }}
        </li>
      </ul>
    </div>

    <!-- Daftar Pemesanan -->
    <div class="w-3/4 pl-6">
      <h1 class="text-2xl font-bold mb-4">{{ getTabLabel() }}</h1>

      <div v-if="filteredPemesanan.length === 0" class="text-gray-500 text-center">
        Tidak ada pemesanan dalam status ini.
      </div>

      <div
        v-for="item in filteredPemesanan"
        :key="item.id"
        class="border-b pb-4 mb-4 cursor-pointer hover:bg-gray-100 p-3 rounded-lg transition"
        @click="goToDetail(item.id)"
      >
        <div class="flex items-center space-x-4">
          <img :src="item.kendaraan.gambar_url" alt="Kendaraan" class="w-24 h-24 object-cover rounded-lg">
          <div>
            <h2 class="text-xl font-semibold">{{ item.kendaraan.merek_model }}</h2>
            <p class="text-gray-600">Tanggal: {{ item.tanggal_mulai }} - {{ item.tanggal_selesai }}</p>
            <p :class="getStatusColor(item.status_pemesanan)">
              {{ item.status_pemesanan }}
            </p>
            <p class="text-blue-500 font-bold">Total: Rp {{ formatHarga(item.total_harga_sewa) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../plugins/axios'

export default {
  data() {
    return {
      pemesanan: [],
      selectedTab: "Semua",
      tabs: [
        { label: "Semua", status: "Semua" },
        { label: "Menunggu Pembayaran", status: "Menunggu Pembayaran" },
        { label: "Menunggu Konfirmasi", status: "Menunggu Konfirmasi" },
        { label: "Dikonfirmasi", status: "Dikonfirmasi" },
        { label: "Sedang dalam Penggunaan", status: "Sedang dalam Penggunaan" },
        { label: "Selesai", status: "Selesai" },
        { label: "Dibatalkan", status: "Dibatalkan" }
      ],
    };
  },
  computed: {
    filteredPemesanan() {
      return this.selectedTab === "Semua"
        ? this.pemesanan
        : this.pemesanan.filter(item => item.status_pemesanan === this.selectedTab);
    }
  },
  methods: {
    async fetchPemesanan() {
      try {
        const token = localStorage.getItem("access_token");
        const response = await api.get("/pemesanan", {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.pemesanan = response.data;
      } catch (error) {
        console.error("Gagal mengambil riwayat pemesanan:", error);
      }
    },
    formatHarga(harga) {
      return new Intl.NumberFormat("id-ID").format(harga);
    },
    getStatusColor(status) {
      return {
        "Menunggu Pembayaran": "text-yellow-500",
        "Menunggu Konfirmasi": "text-orange-500",
        "Dikonfirmasi": "text-green-500",
        "Sedang dalam Penggunaan": "text-blue-500",
        "Selesai": "text-gray-500",
        "Dibatalkan": "text-red-500"
      }[status] || "text-gray-500";
    },
    getTabLabel() {
      return this.tabs.find(tab => tab.status === this.selectedTab)?.label || "Riwayat Pemesanan";
    },
    goToDetail(id) {
      this.$router.push(`/detail-pemesanan/${id}`);
    }
  },
  mounted() {
    this.fetchPemesanan();
  }
};
</script>
