<template>
  <div class="w-full max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-lg">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-medium text-gray-800 flex items-center">
        <router-link :to="`/detail-pemesanan/${pembayaran?.pemesanan_id}`">
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
        </router-link>
        <CreditCardIcon class="w-6 h-6 mr-2 text-green-600" />
        Detail Pembayaran
      </h1>
      <span :class="getStatusColor(pembayaran?.status_pembayaran)" class="flex items-center text-sm">
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

    <div v-else class="space-y-4">
      <!-- Vehicle Info -->
      <div v-if="pemesanan.status_pembayaran === 'Belum Dibayar' || pembayaran.status_pembayaran === 'Pending'" class="bg-gray-50 p-6 rounded-xl">
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
                {{ formatCurrency(pemesanan.kendaraan.harga_sewa_per_periode) }}/hari
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
                {{ formatCurrency(pemesanan.total_harga_sewa) }}
              </p>
            </div>
          </div>
        </div>

        <!-- E-Wallet Section -->
        <div v-if="pembayaran.metode_pembayaran === 'E-Wallet'" class="bg-green-50 p-6 rounded-xl text-center">
          <h3 class="text-lg font-medium text-gray-800 mb-4 flex items-center justify-center">
            <QrCodeIcon class="w-5 h-5 mr-2 text-green-600" />
            Pembayaran QRIS
          </h3>
          <QrcodeVue
            value="INV-20250424001|150000"
            :size="192"
            class="mx-auto border-2 border-gray-200 rounded-lg p-4 bg-white"
          />
          <p class="mt-4 text-sm text-gray-500">Scan QR code menggunakan aplikasi e-wallet Anda</p>
        </div>
      </div>

      <!-- Payment Details -->
      <div v-if="pembayaran.status_pembayaran === 'Lunas'" class="bg-green-50 p-6 rounded-xl">
        <h3 class="text-lg font-medium text-gray-800 mb-4 flex items-center">
          <CheckCircleIcon class="w-5 h-5 mr-2 text-green-600" />
          Informasi Pembayaran
        </h3>

        <div class="space-y-3 text-sm">
          <div class="flex items-center">
            <span class="w-40 text-gray-500">ID</span>
            <span class="font-medium">{{ pembayaran.id }}</span>
          </div>
          <div class="flex items-center">
            <span class="w-40 text-gray-500">Metode Pembayaran</span>
            <span class="font-medium">{{ pembayaran.metode_pembayaran }}</span>
          </div>
          <div class="flex items-center">
            <span class="w-40 text-gray-500">Jumlah Pembayaran</span>
            <span class="font-medium">{{ formatCurrency(pembayaran.jumlah_pembayaran) }}</span>
          </div>
          <div class="flex items-center">
            <span class="w-40 text-gray-500">Tanggal Pembayaran</span>
            <span class="font-medium">{{ formatDate(pembayaran.tanggal_pembayaran) }}</span>
          </div>
        </div>
      </div>

      <!-- Upload Section -->
      <div v-if="!pembayaran.bukti_pembayaran"
          class="bg-white p-6 rounded-xl border border-gray-200">
        <div class="space-y-4">
          <label class="block text-sm font-medium text-gray-700">
            <span class="flex items-center">
              <ArrowUpTrayIcon class="w-4 h-4 mr-1 text-gray-600" />
              Upload Bukti Transfer
            </span>
            <input
              type="file"
              accept="image/*"
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
import { formatCurrency, formatDate } from '@/custom_utility/utils'
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
import { ArrowLeftIcon } from 'lucide-vue-next'
import QrcodeVue from 'qrcode.vue'

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
    ArrowPathIcon,
    ArrowLeftIcon,
    QrcodeVue
  },
  data() {
    return {
      pemesanan: null,
      pembayaran: null,
      buktiPembayaran: null,
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
        if (error.response) {
          this.$router.replace('/404')
        }
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
    getStatusColor(status) {
      return (
        {
          'Belum Dibayar': 'text-gray-600',
          'Pending': 'text-yellow-500',
          'Lunas': 'text-green-500',
          'Belum Lunas': 'text-red-500',
        }[status] || 'text-gray-500'
      )
    },
    formatCurrency, formatDate
  },
  mounted() {
    this.fetchDetailPembayaran()
  },
}
</script>
