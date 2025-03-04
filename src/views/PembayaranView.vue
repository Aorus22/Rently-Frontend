<template>
  <div class="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Pembayaran</h1>

    <div v-if="pemesanan">
      <!-- Info Pembayaran -->
      <div class="border-b pb-4 mb-4">
        <h2 class="text-lg font-semibold">{{ pemesanan.kendaraan.merek_model }}</h2>
        <p class="text-gray-600">Total Harga: <span class="text-blue-500 font-bold">Rp {{ formatHarga(pemesanan.total_harga_sewa) }}</span></p>
        <p class="text-red-500">Batas Pembayaran: {{ formatTanggal(pemesanan.batas_pembayaran) }}</p>
      </div>

      <!-- Pilih Metode Pembayaran -->
      <h3 class="text-lg font-semibold mb-2">Pilih Metode Pembayaran:</h3>
      <div class="mb-4">
        <label class="block cursor-pointer">
          <input type="radio" v-model="metodePembayaran" value="transfer" class="mr-2"> Transfer Bank
        </label>
        <label class="block cursor-pointer">
          <input type="radio" v-model="metodePembayaran" value="ewallet" class="mr-2"> E-Wallet / QRIS
        </label>
      </div>

      <!-- Jika Transfer Bank -->
      <div v-if="metodePembayaran === 'transfer'" class="p-4 bg-gray-100 rounded-lg">
        <h4 class="text-md font-semibold mb-2">Transfer ke Rekening:</h4>
        <p class="text-gray-700">Bank: <strong>BNI</strong></p>
        <p class="text-gray-700">Nomor Rekening: <strong>1234-5678-9101</strong></p>
        <p class="text-gray-700">Atas Nama: <strong>PT Rental Kendaraan</strong></p>

        <!-- Upload Bukti Pembayaran -->
        <div class="mt-4">
          <label class="block mb-2 text-gray-700">Upload Bukti Pembayaran:</label>
          <input type="file" @change="handleFileUpload" class="border rounded-lg p-2 w-full">
        </div>
      </div>

      <!-- Jika QRIS -->
      <div v-if="metodePembayaran === 'ewallet'" class="p-4 bg-gray-100 rounded-lg text-center">
        <h4 class="text-md font-semibold mb-2">Scan QR Code untuk Pembayaran:</h4>
        <img src="https://www.berkabarnews.com/foto_berita/3IMG_20210228_175025.jpg" alt="QR Code" class="mx-auto w-40 h-40">
      </div>

      <!-- Tombol Bayar -->
      <button
        @click="konfirmasiPembayaran"
        class="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
        :disabled="metodePembayaran === 'transfer' && !buktiPembayaran"
      >
        Konfirmasi Pembayaran
      </button>
    </div>

    <div v-else class="text-center text-gray-500">
      Memuat data...
    </div>
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
      buktiPembayaran: null,
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
    formatHarga(harga) {
      return new Intl.NumberFormat("id-ID").format(harga);
    },
    formatTanggal(tanggal) {
      return new Date(tanggal).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
    },
    handleFileUpload(event) {
      this.buktiPembayaran = event.target.files[0];
    },
    async konfirmasiPembayaran() {
      if (this.metodePembayaran === "transfer" && !this.buktiPembayaran) {
        alert("Harap upload bukti pembayaran terlebih dahulu.");
        return;
      }

      const formData = new FormData();
      formData.append("metode_pembayaran", this.metodePembayaran);
      if (this.metodePembayaran === "transfer") {
        formData.append("bukti_pembayaran", this.buktiPembayaran);
      }

      try {
        const token = localStorage.getItem("access_token");
        await axios.post(`http://127.0.0.1:8000/api/pemesanan/${this.id}/bayar`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        });

        alert("Pembayaran berhasil dikonfirmasi!");
        this.$router.push("/riwayat-pemesanan"); // Kembali ke riwayat pemesanan
      } catch (error) {
        console.error("Gagal mengonfirmasi pembayaran:", error);
      }
    }
  },
  mounted() {
    this.fetchDetailPemesanan();
  }
};
</script>
