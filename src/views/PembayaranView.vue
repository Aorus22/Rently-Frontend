<template>
  <div class="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Pilih Metode Pembayaran</h1>

    <div v-if="pemesanan">
      <h2 class="text-lg font-semibold">{{ pemesanan.kendaraan.merek_model }}</h2>
      <p class="text-gray-600">Total Harga: <span class="text-blue-500 font-bold">Rp {{ formatHarga(pemesanan.total_harga_sewa) }}</span></p>

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
import axios from "axios";

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
        const token = localStorage.getItem("access_token");
        const response = await axios.get(`http://127.0.0.1:8000/api/pemesanan/${this.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.pemesanan = response.data;
      } catch (error) {
        console.error("Gagal mengambil detail pemesanan:", error);
      }
    },
    async pilihMetodePembayaran() {
      if (!this.metodePembayaran) {
        alert("Silakan pilih metode pembayaran terlebih dahulu.");
        return;
      }

      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.post(
          `http://127.0.0.1:8000/api/pemesanan/${this.id}/bayar`,
          { metode_pembayaran: this.metodePembayaran },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Metode pembayaran berhasil dipilih!");
        this.$router.push(`/detail-pembayaran/${response.data.pembayaran_id}`);
      } catch (error) {
        console.error("Gagal memilih metode pembayaran:", error);
      }
    },
    formatHarga(harga) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(harga);
    },
    formatTanggal(tanggal) {
      if (!tanggal) return "-";
      return new Date(tanggal).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
    }
  },
  mounted() {
    this.fetchDetailPemesanan();
  }
};
</script>
