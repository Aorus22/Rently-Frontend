<template>
  <div class="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-6">Detail Pemesanan</h1>

    <div v-if="!pemesanan" class="text-center text-gray-500">Memuat data...</div>

    <div v-else>
      <!-- Informasi Kendaraan -->
      <div class="flex space-x-6">
        <img
          :src="pemesanan.kendaraan.gambar_url"
          alt="Kendaraan"
          class="w-1/3 h-48 object-cover rounded-lg"
        />
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
        <p>
          Tanggal Mulai: <strong>{{ pemesanan.tanggal_mulai }}</strong>
        </p>
        <p>
          Tanggal Selesai: <strong>{{ pemesanan.tanggal_selesai }}</strong>
        </p>
        <p>
          Total Harga:
          <strong class="text-blue-500">Rp {{ formatHarga(pemesanan.total_harga_sewa) }}</strong>
        </p>
        <p :class="getStatusColor(pemesanan.status_pemesanan)">
          Status: <strong>{{ pemesanan.status_pemesanan }}</strong>
        </p>
      </div>

      <!-- Daftar Pembayaran Terkait (Box Card Klikable) -->
      <div class="mt-6">
        <h2 class="text-lg font-semibold mb-3">Riwayat Pembayaran</h2>
        <div v-if="pembayaranList.length === 0" class="text-gray-500">Belum ada pembayaran.</div>
        <div
          v-for="pembayaran in pembayaranList"
          :key="pembayaran.id"
          @click="goToDetailPembayaran(pembayaran.id)"
          class="cursor-pointer p-4 mb-3 bg-white border rounded-lg shadow-md hover:shadow-lg transition"
        >
          <div class="flex justify-between items-center">
            <div>
              <p class="text-sm text-gray-500">{{ pembayaran.metode_pembayaran }}</p>
              <p class="text-lg font-semibold">
                Rp {{ formatHarga(pembayaran.jumlah_pembayaran) }}
              </p>
            </div>
            <div :class="getStatusColor(pembayaran.status_pembayaran)">
              <strong>{{ pembayaran.status_pembayaran }}</strong>
            </div>
          </div>
          <div v-if="pembayaran.bukti_pembayaran" class="mt-2">
            <img
              :src="pembayaran.bukti_pembayaran"
              alt="Bukti Pembayaran"
              class="w-20 h-20 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>

      <!-- Tombol Bayar Jika Statusnya Pending -->
      <div class="mt-6" v-if="pemesanan.status_pemesanan === 'Menunggu Pembayaran'">
        <button
          @click="bayar"
          class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Bayar Sekarang
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../plugins/axios'

export default {
  data() {
    return {
      pemesanan: null,
      pembayaranList: [],
    }
  },
  methods: {
    async fetchDetailPemesanan() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await api.get(`/pemesanan/${this.$route.params.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.pemesanan = response.data
        this.fetchPembayaran() // Ambil pembayaran terkait
      } catch (error) {
        console.error('Gagal mengambil detail pemesanan:', error)
      }
    },
    async fetchPembayaran() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await api.get(
          `/pemesanan/${this.$route.params.id}/pembayaran`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        this.pembayaranList = response.data
      } catch (error) {
        console.error('Gagal mengambil pembayaran:', error)
      }
    },
    formatHarga(harga) {
      return new Intl.NumberFormat('id-ID').format(harga)
    },
    getStatusColor(status) {
      return (
        {
          Pending: 'text-yellow-500',
          'Menunggu Pembayaran': 'text-orange-500',
          Dibayar: 'text-green-500',
          Ditolak: 'text-red-500',
        }[status] || 'text-gray-500'
      )
    },
    bayar() {
      this.$router.push(`/detail-pemesanan/${this.pemesanan.id}/bayar`)
    },
    goToDetailPembayaran(id) {
      this.$router.push(`/detail-pembayaran/${id}`)
    },
  },
  mounted() {
    this.fetchDetailPemesanan()
  },
}
</script>
