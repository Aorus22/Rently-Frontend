<template>
  <div class="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Pilih Metode Pembayaran</h1>

    <div v-if="pemesanan">
      <h2 class="text-lg font-semibold">{{ pemesanan.kendaraan.merek_model }}</h2>
      <p class="text-gray-600">Total Harga: <span class="text-blue-500 font-bold">{{ formatCurrency(pemesanan.total_harga_sewa) }}</span></p>

      <h3 class="text-lg font-semibold mt-4 mb-2">Pilih Metode Pembayaran:</h3>
      <div class="mb-4">
        <label class="block cursor-pointer">
          <input type="radio" v-model="metodePembayaran" value="Transfer Bank" class="mr-2"> Transfer Bank
        </label>
        <label class="block cursor-pointer">
          <input type="radio" v-model="metodePembayaran" value="E-Wallet" class="mr-2"> E-Wallet / QRIS
        </label>
      </div>

      <button
        @click="pilihMetodePembayaran"
        class="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
      >
        Lanjut ke Detail Pembayaran
      </button>
    </div>

    <div v-else class="text-center text-gray-500">Memuat data...</div>
  </div>
</template>

<script>
import { formatCurrency } from '@/custom_utility/utils';
import api from '../plugins/axios'

export default {
  props: ["id"],
  data() {
    return {
      pemesanan: null,
      metodePembayaran: "",
    };
  },
  methods: {
    async fetchDetailPemesanan() {
      try {
        const response = await api.get(`/pemesanan/${this.id}`);
        this.pemesanan = response.data;
      } catch (error) {
        console.error("Gagal mengambil detail pemesanan:", error);
      }
    },
    async pilihMetodePembayaran() {
      if (!this.metodePembayaran) {
        this.$toast.warn("Silakan pilih metode pembayaran terlebih dahulu.");
        return;
      }

      try {
        const response = await api.post(
          `/pemesanan/${this.id}/bayar`,
          { metode_pembayaran: this.metodePembayaran },
        );

        this.$toast.success("Metode pembayaran berhasil dipilih!");
        this.$router.push(`/detail-pembayaran/${response.data.pembayaran_id}`);
      } catch (error) {
        console.error("Gagal memilih metode pembayaran:", error);
      }
    },
    formatCurrency
  },
  mounted() {
    this.fetchDetailPemesanan();
  }
};
</script>
