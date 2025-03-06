<template>
  <div class="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h1 class="text-2xl font-bold mb-4">Detail Pembayaran</h1>

    <div v-if="pembayaran && pemesanan">
      <h2 class="text-lg font-semibold">{{ pemesanan.kendaraan.merek_model }}</h2>
      <p class="text-gray-600">
        Total Harga:
        <span class="text-blue-500 font-bold">{{ formatHarga(pemesanan.total_harga_sewa) }}</span>
      </p>
      <p class="text-gray-600">
        Metode Pembayaran: <span class="font-bold">{{ pembayaran.metode_pembayaran }}</span>
      </p>

      <!-- Status Pembayaran -->
      <p class="mt-2 text-lg font-semibold" :class="getStatusColor(pembayaran.status_pembayaran)">
        Status: {{ pembayaran.status_pembayaran }}
      </p>

      <!-- Jika Transfer Bank -->
      <div
        v-if="pembayaran.metode_pembayaran === 'Transfer Bank'"
        class="p-4 bg-gray-100 rounded-lg"
      >
        <h4 class="text-md font-semibold mb-2">Transfer ke Rekening:</h4>
        <p class="text-gray-700">Bank: <strong>BNI</strong></p>
        <p class="text-gray-700">Nomor Rekening: <strong>1234-5678-9101</strong></p>
        <p class="text-gray-700">Atas Nama: <strong>PT Rental Kendaraan</strong></p>

        <!-- Jika belum ada bukti pembayaran, tampilkan form upload -->
        <div v-if="!pembayaran.bukti_pembayaran" class="mt-4">
          <label class="block mb-2 text-gray-700">Upload Bukti Pembayaran:</label>
          <input type="file" @change="handleFileUpload" class="border rounded-lg p-2 w-full" />
          <button
            @click="uploadBukti"
            class="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
            :disabled="!buktiPembayaran"
          >
            Konfirmasi Pembayaran
          </button>
        </div>

        <!-- Jika QRIS -->
        <div
          v-if="pembayaran.metode_pembayaran === 'E-Wallet'"
          class="p-4 bg-gray-100 rounded-lg text-center"
        >
          <h4 class="text-md font-semibold mb-2">Scan QR Code untuk Pembayaran:</h4>
          <img :src="qrCodeUrl" alt="QR Code" class="mx-auto w-40 h-40" />
        </div>

        <!-- Jika bukti pembayaran sudah ada, tampilkan -->
        <div v-else class="mt-4">
          <h4 class="text-md font-semibold mb-2">Bukti Pembayaran:</h4>
          <img
            :src="pembayaran.bukti_pembayaran"
            alt="Bukti Pembayaran"
            class="w-40 h-40 object-cover rounded-lg"
          />
        </div>
      </div>
    </div>

    <div v-else class="text-center text-gray-500">Memuat data...</div>
  </div>
</template>

<script>
import api from '../plugins/axios'

export default {
  props: ['id'],
  data() {
    return {
      pemesanan: null,
      pembayaran: null,
      buktiPembayaran: null,
      qrCodeUrl: 'https://www.berkabarnews.com/foto_berita/3IMG_20210228_175025.jpg',
    }
  },
  methods: {
    async fetchDetailPembayaran() {
      try {
        const token = localStorage.getItem('access_token')
        const response = await api.get(`/pembayaran/${this.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.pembayaran = response.data.pembayaran
        this.pemesanan = response.data.pemesanan
      } catch (error) {
        console.error('Gagal mengambil detail pembayaran:', error)
      }
    },
    handleFileUpload(event) {
      this.buktiPembayaran = event.target.files[0]
    },
    async uploadBukti() {
      const formData = new FormData()
      formData.append('bukti_pembayaran', this.buktiPembayaran)

      try {
        const token = localStorage.getItem('access_token')
        await api.post(`/pembayaran/${this.id}/upload-bukti`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        })

        alert('Bukti pembayaran berhasil diunggah!')
        this.fetchDetailPembayaran() // Refresh data setelah upload
      } catch (error) {
        console.error('Gagal mengunggah bukti pembayaran:', error)
      }
    },
    formatHarga(harga) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(harga)
    },
    getStatusColor(status) {
      return (
        {
          Pending: 'text-yellow-500',
          'Menunggu Konfirmasi': 'text-orange-500',
          Dibayar: 'text-green-500',
          Ditolak: 'text-red-500',
        }[status] || 'text-gray-500'
      )
    },
  },
  mounted() {
    this.fetchDetailPembayaran()
  },
}
</script>
