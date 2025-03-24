<template>
  <div class="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-medium text-gray-800 flex items-center">
        <CreditCardIcon class="w-6 h-6 mr-2 text-green-600" />
        Detail Pembayaran
      </h1>
      <span :class="getStatusColor(pembayaran?.status_pembayaran)" class="flex items-center text-sm">
        <component :is="statusIcons[pembayaran?.status_pembayaran]" class="w-4 h-4 mr-1" />
        {{ pembayaran?.status_pembayaran }}
      </span>
    </div>

    <!-- Loading State -->
    <div v-if="!pembayaran" class="text-center py-8">
      <div class="flex flex-col items-center justify-center space-y-2">
        <ArrowPathIcon class="w-8 h-8 text-green-600 animate-spin" />
        <span class="text-gray-600">Memuat data pembayaran...</span>
      </div>
    </div>

    <div v-else class="space-y-8">
      <!-- Vehicle Info -->
      <div class="bg-gray-50 p-6 rounded-xl">
        <div class="flex items-start gap-4">
          <img
            :src="pemesanan.kendaraan.gambar_url"
            alt="Kendaraan"
            class="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
          />
          <div class="flex-1">
            <h2 class="text-lg font-medium text-gray-800">{{ pemesanan.kendaraan.merek_model }}</h2>
            <div class="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
              <div class="flex items-center">
                <TagIcon class="w-4 h-4 mr-2 text-green-600" />
                {{ pemesanan.kendaraan.kategori_kendaraan }}
              </div>
              <div class="flex items-center">
                <CurrencyDollarIcon class="w-4 h-4 mr-2 text-green-600" />
                {{ formatHarga(pemesanan.total_harga_sewa) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Method Details -->
      <div v-if="pembayaran.status_pembayaran === 'Belum Dibayar'" class="space-y-6">
        <!-- Bank Transfer Instructions -->
        <div v-if="pembayaran.metode_pembayaran === 'Transfer Bank'" class="bg-green-50 p-6 rounded-xl">
          <h3 class="text-lg font-medium text-gray-800 mb-4 flex items-center">
            <BanknotesIcon class="w-5 h-5 mr-2 text-green-600" />
            Instruksi Transfer Bank
          </h3>

          <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="space-y-2">
              <div class="flex items-center">
                <span class="w-24 text-gray-500">Bank Tujuan</span>
                <span class="font-medium">BNI</span>
              </div>
              <div class="flex items-center">
                <span class="w-24 text-gray-500">Nomor Rekening</span>
                <span class="font-mono">1234 5678 9012</span>
              </div>
              <div class="flex items-center">
                <span class="w-24 text-gray-500">Atas Nama</span>
                <span class="font-medium">PT Rental Mobil Jaya</span>
              </div>
            </div>

            <div class="border-l pl-4">
              <p class="text-gray-500 mb-2">Total Transfer:</p>
              <p class="text-2xl font-bold text-green-600">
                {{ formatHarga(pembayaran.jumlah_pembayaran) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Upload Section -->
        <div v-if="pembayaran.metode_pembayaran === 'Transfer Bank' && !pembayaran.bukti_pembayaran"
            class="bg-white p-6 rounded-xl border border-gray-200">
          <div class="space-y-4">
            <label class="block text-sm font-medium text-gray-700">
              <span class="flex items-center">
                <ArrowUpTrayIcon class="w-4 h-4 mr-1 text-gray-600" />
                Upload Bukti Transfer
              </span>
              <input
                type="file"
                @change="handleFileUpload"
                class="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </label>
            <button
              @click="uploadBukti"
              :disabled="!buktiPembayaran"
              class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <CheckCircleIcon class="w-5 h-5 mr-2" />
              Konfirmasi Pembayaran
            </button>
          </div>
        </div>

        <!-- E-Wallet Section -->
        <div v-if="pembayaran.metode_pembayaran === 'E-Wallet'" class="bg-green-50 p-6 rounded-xl text-center">
          <h3 class="text-lg font-medium text-gray-800 mb-4 flex items-center justify-center">
            <QrCodeIcon class="w-5 h-5 mr-2 text-green-600" />
            Pembayaran QRIS
          </h3>
          <img
            :src="qrCodeUrl"
            alt="QR Code"
            class="mx-auto w-48 h-48 object-contain border-2 border-gray-200 rounded-lg p-4 bg-white"
          />
          <p class="mt-4 text-sm text-gray-500">Scan QR code menggunakan aplikasi e-wallet Anda</p>
        </div>
      </div>

        <!-- Uploaded Proof -->
        <div v-if="pembayaran.bukti_pembayaran" class="bg-white p-6 rounded-xl border border-gray-200">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Bukti Pembayaran:</h4>
          <img
            :src="pembayaran.bukti_pembayaran"
            alt="Bukti Transfer"
            class="w-64 h-64 object-contain border-2 border-dashed border-gray-200 rounded-lg p-2"
          />
        </div>

    </div>
  </div>
</template>

<script>
import api from '../plugins/axios'
import {
  CreditCardIcon,
  BanknotesIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  QrCodeIcon,
  CurrencyDollarIcon,
  TagIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

export default {
  props: ['id'],
  components: {
    CreditCardIcon,
    BanknotesIcon,
    ArrowUpTrayIcon,
    CheckCircleIcon,
    QrCodeIcon,
    CurrencyDollarIcon,
    TagIcon,
    ArrowPathIcon
  },
  data() {
    return {
      pemesanan: null,
      pembayaran: null,
      buktiPembayaran: null,
      qrCodeUrl: 'https://www.berkabarnews.com/foto_berita/3IMG_20210228_175025.jpg',
      statusIcons: {
        'Pending': 'ClockIcon',
        'Menunggu Konfirmasi': 'ShieldCheckIcon',
        'Dibayar': 'CheckCircleIcon',
        'Ditolak': 'XCircleIcon'
      }
    }
  },
  methods: {
    async fetchDetailPembayaran() {
      try {
        const response = await api.get(`/pembayaran/${this.id}`)
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

      let loader = this.$loading.show({
        isFullPage: true,
      });
      try {
        await api.post(`/pembayaran/${this.id}/upload-bukti`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })

        this.$toast.success('Bukti pembayaran berhasil diunggah!')
        this.fetchDetailPembayaran()
      } catch (error) {
        console.error('Gagal mengunggah bukti pembayaran:', error)
      } finally {
        loader.hide();
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
