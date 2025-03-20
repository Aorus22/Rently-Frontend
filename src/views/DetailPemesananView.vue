<template>
  <div class="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-medium text-gray-800 flex items-center">
        <DocumentTextIcon class="w-6 h-6 mr-2 text-green-600" />
        Detail Pemesanan
      </h1>
      <span :class="getStatusColor(pemesanan?.status_pemesanan)" class="flex items-center text-sm">
        <component :is="statusIcons[pemesanan?.status_pemesanan]" class="w-4 h-4 mr-1" />
        {{ pemesanan?.status_pemesanan }}
      </span>
    </div>

    <div v-if="!pemesanan" class="text-center py-8">
      <div class="flex flex-col items-center justify-center space-y-2">
        <ArrowPathIcon class="w-8 h-8 text-green-600 animate-spin" />
        <span class="text-gray-600">Memuat data pemesanan...</span>
      </div>
    </div>

    <div v-else class="space-y-8">
      <!-- Informasi Kendaraan -->
      <div class="flex flex-col md:flex-row gap-6">
        <img
          :src="pemesanan.kendaraan.gambar_url"
          alt="Kendaraan"
          class="w-full md:w-1/3 h-56 object-cover rounded-xl shadow-sm"
        />
        <div class="flex-1 space-y-3">
          <h2 class="text-xl font-medium text-gray-800">{{ pemesanan.kendaraan.merek_model }}</h2>
          <div class="grid grid-cols-2 gap-3 text-sm text-gray-600">
            <div class="flex items-center">
              <TagIcon class="w-4 h-4 mr-2 text-green-600" />
              {{ pemesanan.kendaraan.kategori_kendaraan }}
            </div>
            <div class="flex items-center">
              <MapPinIcon class="w-4 h-4 mr-2 text-green-600" />
              {{ pemesanan.kendaraan.lokasi_garasi.kota }}
            </div>
            <div class="flex items-center">
              <Cog6ToothIcon class="w-4 h-4 mr-2 text-green-600" />
              {{ pemesanan.kendaraan.jenis_transmisi }}
            </div>
            <div class="flex items-center">
              <UserGroupIcon class="w-4 h-4 mr-2 text-green-600" />
              {{ pemesanan.kendaraan.kapasitas_kursi }} Kursi
            </div>
          </div>
        </div>
      </div>

      <!-- Detail Penyewaan -->
      <div class="bg-gray-50 p-6 rounded-xl space-y-4">
        <h2 class="text-lg font-medium text-gray-800 flex items-center">
          <CalendarIcon class="w-5 h-5 mr-2 text-green-600" />
          Periode Sewa
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm text-gray-500">Mulai Sewa</p>
              <p class="font-medium text-gray-700">{{ pemesanan.tanggal_mulai }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm text-gray-500">Akhir Sewa</p>
              <p class="font-medium text-gray-700">{{ pemesanan.tanggal_selesai }}</p>
            </div>
          </div>
          <div class="col-span-full pt-4 border-t">
            <div class="flex justify-between items-center">
              <p class="text-lg font-medium text-gray-800">Total Pembayaran</p>
              <p class="text-2xl font-bold text-green-600">
                Rp{{ formatHarga(pemesanan.total_harga_sewa) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Daftar Pembayaran -->
      <div class="space-y-4">
        <h2 class="text-lg font-medium text-gray-800 flex items-center">
          <CreditCardIcon class="w-5 h-5 mr-2 text-green-600" />
          Riwayat Pembayaran
        </h2>

        <div v-if="pembayaranList.length === 0" class="text-center py-4 bg-gray-50 rounded-xl">
          <p class="text-gray-500">Belum ada riwayat pembayaran</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="pembayaran in pembayaranList"
            :key="pembayaran.id"
            @click="goToDetailPembayaran(pembayaran.id)"
            class="group p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">{{ pembayaran.metode_pembayaran }}</p>
                <p class="text-lg font-medium text-gray-800">
                  Rp{{ formatHarga(pembayaran.jumlah_pembayaran) }}
                </p>
              </div>
              <div class="flex items-center space-x-2">
                <span :class="getStatusColor(pembayaran.status_pembayaran)" class="text-sm">
                  {{ pembayaran.status_pembayaran }}
                </span>
                <ChevronRightIcon class="w-4 h-4 text-gray-400 group-hover:text-green-600" />
              </div>
            </div>
            <div v-if="pembayaran.bukti_pembayaran" class="mt-3">
              <img
                :src="pembayaran.bukti_pembayaran"
                alt="Bukti Pembayaran"
                class="w-24 h-24 object-cover rounded-lg border"
              />
            </div>
          </div>
        </div>
      </div>

        <!-- Tombol Bayar -->
        <div v-if="pemesanan.status_pemesanan === 'Menunggu Pembayaran'" class="pt-6">
          <button
            @click="showModalPilihPembayaran = true"
            class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl
                  flex items-center justify-center transition-all"
          >
            <ArrowRightCircleIcon class="w-5 h-5 mr-2" />
            Lanjutkan Pembayaran
          </button>
        </div>

      </div>
    </div>

    <ModalPilihPembayaran
      :show="showModalPilihPembayaran"
      :pemesanan="pemesanan"
      @close="showModalPilihPembayaran = false"
    />

</template>

<script>
import api from '../plugins/axios'
import {
  DocumentTextIcon,
  CalendarIcon,
  CreditCardIcon,
  ChevronRightIcon,
  ArrowRightCircleIcon,
  TagIcon,
  MapPinIcon,
  Cog6ToothIcon,
  UserGroupIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'
import ModalPilihPembayaran from "@/components/ModalPilihPembayaran.vue";

export default {
  components: {
    DocumentTextIcon,
    CalendarIcon,
    CreditCardIcon,
    ChevronRightIcon,
    ArrowRightCircleIcon,
    TagIcon,
    MapPinIcon,
    Cog6ToothIcon,
    UserGroupIcon,
    ArrowPathIcon,
    ModalPilihPembayaran
  },
  data() {
    return {
      pemesanan: null,
      pembayaranList: [],
      statusIcons: {
        'Menunggu Pembayaran': 'ClockIcon',
        'Dikonfirmasi': 'CheckCircleIcon',
        'Sedang dalam Penggunaan': 'TruckIcon',
        'Selesai': 'CheckBadgeIcon',
        'Dibatalkan': 'XCircleIcon'
      },
      showModalPilihPembayaran: false,
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
        this.fetchPembayaran()
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
      return {
        'Menunggu Pembayaran': 'text-yellow-600',
        'Dikonfirmasi': 'text-green-600',
        'Sedang dalam Penggunaan': 'text-blue-600',
        'Selesai': 'text-gray-500',
        'Dibatalkan': 'text-red-600'
      }[status] || 'text-gray-500'
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
