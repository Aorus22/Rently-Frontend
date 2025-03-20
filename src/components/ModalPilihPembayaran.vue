<template>
  <div
    v-if="show"
    class="h-screen w-screen fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-bold mb-4 text-gray-800 text-center">Pilih Metode Pembayaran</h2>

      <div v-if="pemesanan">
        <div class="text-center">
          <h3 class="text-lg font-bold text-green-700 uppercase tracking-wide">
            Total
          </h3>
        </div>

        <div class="w-full max-w-72 mx-auto border-2 border-green-600 text-green-600 font-light py-2 rounded-md flex justify-center mt-2">
          <p class="text-green-600 font-bold text-lg">{{ formatHarga(pemesanan.total_harga_sewa) }}</p>
        </div>

        <h3 class="text-lg font-semibold mt-4 mb-3 text-gray-700">Metode Pembayaran:</h3>
        <div class="flex gap-4">
          <div
            @click="metodePembayaran = 'Transfer Bank'"
            :class="{
              'border-green-500 bg-green-50': metodePembayaran === 'Transfer Bank',
              'border-gray-300 bg-gray-50': metodePembayaran !== 'Transfer Bank'
            }"
            class="w-1/2 p-4 border rounded-lg flex flex-col items-center cursor-pointer hover:border-green-500 transition-all"
          >
            <BanknoteIcon class="w-12 h-12 text-green-500 mb-2" />
            <span class="text-gray-700 font-medium text-sm">Transfer Bank</span>
          </div>

          <div
            @click="metodePembayaran = 'E-Wallet'"
            :class="{
              'border-green-500 bg-green-50': metodePembayaran === 'E-Wallet',
              'border-gray-300 bg-gray-50': metodePembayaran !== 'E-Wallet'
            }"
            class="w-1/2 p-4 border rounded-lg flex flex-col items-center cursor-pointer hover:border-green-500 transition-all"
          >
            <QrCodeIcon class="w-12 h-12 text-green-500 mb-2" />
            <span class="text-gray-700 font-medium text-sm">E-Wallet / QRIS</span>
          </div>
        </div>

        <button
          @click="pilihMetodePembayaran"
          class="mt-6 w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all font-medium shadow-md"
        >
          Lanjutkan Pembayaran
        </button>
      </div>

      <div v-else class="text-center text-gray-500 py-4">Memuat data...</div>

      <button
        @click="$emit('close')"
        class="mt-4 w-full text-gray-500 hover:bg-gray-100 py-2 rounded-lg transition-all text-center font-medium"
      >
        Batal
      </button>
    </div>
  </div>
</template>

<script>
import api from "../plugins/axios";
import { BanknoteIcon, QrCodeIcon } from "lucide-vue-next";

export default {
  props: {
    show: Boolean,
    pemesanan: Object,
  },
  components: {
    BanknoteIcon,
    QrCodeIcon,
  },
  data() {
    return {
      metodePembayaran: "",
    };
  },
  methods: {
    formatHarga(harga) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(harga);
    },
    async pilihMetodePembayaran() {
      if (!this.metodePembayaran) {
        alert("Silakan pilih metode pembayaran terlebih dahulu.");
        return;
      }

      let loader = this.$loading.show({
        isFullPage: true,
      });

      try {
        const token = localStorage.getItem("access_token");
        const response = await api.post(
          `/pemesanan/${this.pemesanan.id}/bayar`,
          { metode_pembayaran: this.metodePembayaran },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        alert("Metode pembayaran berhasil dipilih!");
        this.$emit("close");
        this.$router.push(`/detail-pembayaran/${response.data.pembayaran_id}`);
      } catch (error) {
        console.error("Gagal memilih metode pembayaran:", error);
      } finally {
        loader.hide();
      }
    },
  },
};
</script>
