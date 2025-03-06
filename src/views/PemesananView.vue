<template>
  <div class="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Pesan Kendaraan</h1>

    <!-- Info Kendaraan -->
    <div class="flex items-center space-x-4 mb-6">
      <img :src="kendaraan.gambar_url" alt="Kendaraan" class="w-32 h-32 object-cover rounded-lg">
      <div>
        <h2 class="text-xl font-semibold">{{ kendaraan.merek_model }}</h2>
        <p class="text-gray-600">Kategori: {{ kendaraan.kategori_kendaraan }}</p>
        <p class="text-blue-500 font-bold">Rp {{ formatHarga(kendaraan.harga_sewa_per_periode) }} / hari</p>
      </div>
    </div>

    <!-- Form Pemesanan -->
    <form @submit.prevent="submitPemesanan">
      <div class="mb-4">
        <label class="block font-medium text-gray-700">Tanggal Mulai</label>
        <input type="date" v-model="tanggal_mulai" class="w-full p-2 border border-gray-300 rounded">
      </div>

      <div class="mb-4">
        <label class="block font-medium text-gray-700">Durasi (Hari)</label>
        <input type="number" v-model="durasi" min="1" class="w-full p-2 border border-gray-300 rounded">
      </div>

      <button
        type="submit"
        class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Konfirmasi Pesanan
      </button>
    </form>
  </div>
</template>

<script>
import api from '../plugins/axios'

export default {
  data() {
    return {
      kendaraan: {},
      tanggal_mulai: '',
      durasi: 1,
    };
  },
  methods: {
    async fetchKendaraan() {
      try {
        const response = await api.get(`/kendaraan/${this.$route.params.id}`);
        this.kendaraan = response.data;
      } catch (error) {
        console.error("Gagal mengambil data kendaraan:", error);
      }
    },
    async submitPemesanan() {
      try {
        const token = localStorage.getItem('access_token');

        await api.post(
          '/pemesanan',
          {
            kendaraan_id: this.kendaraan.id,
            tanggal_mulai: this.tanggal_mulai,
            durasi: this.durasi,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        alert('Pemesanan berhasil!');
        this.$router.push('/riwayat-pemesanan');
      } catch (error) {
        console.error("Gagal melakukan pemesanan:", error);
        alert('Terjadi kesalahan saat memproses pemesanan.');
      }
    },
    formatHarga(harga) {
      return new Intl.NumberFormat('id-ID').format(harga);
    }
  },
  mounted() {
    this.fetchKendaraan();
  }
};
</script>
