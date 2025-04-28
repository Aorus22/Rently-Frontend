<template>
  <div class="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
    <!-- Header -->
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-medium text-gray-800 flex items-center">
        <router-link to="/riwayat-pemesanan">
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
        </router-link>
        <DocumentTextIcon class="w-6 h-6 mr-2 text-green-600" />
        Detail Pemesanan
      </h1>
      <div :class="getStatusColor(pemesanan?.status_pemesanan)" class="flex text-right items-center text-sm gap-2">
        <span class="text-right">{{ pemesanan?.status_pemesanan }}</span>
        <component :is="statusIcons[pemesanan?.status_pemesanan]" class="w-4 h-4 mr-1" />
      </div>
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
        <div class="flex-1 p-6">
          <h2 class="text-xl font-medium text-gray-800">{{ pemesanan.kendaraan.merek_model }}</h2>

          <div class="mt-2 inline-block bg-gray-100 rounded-lg px-3 py-1">
            <p class="font-bold text-gray-800 text-center tracking-wider">{{ pemesanan.kendaraan.nomor_polisi }}</p>
          </div>

          <div class="grid grid-cols-2 gap-3 text-sm text-gray-600 mt-4">
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
              <p class="font-medium text-gray-700">{{ formatDate(pemesanan.tanggal_mulai) }}</p>
            </div>
          </div>
          <div class="flex items-center">
            <div class="flex-1">
              <p class="text-sm text-gray-500">Akhir Sewa</p>
              <p class="font-medium text-gray-700">{{ formatDate(pemesanan.tanggal_selesai) }}</p>
            </div>
          </div>
          <div class="col-span-full pt-4 border-t">
            <div class="flex justify-between items-center">
              <p class="text-lg font-medium text-gray-800">Total Pembayaran</p>
              <p class="text-2xl font-bold text-green-600">
                {{ formatCurrency(pemesanan.total_harga_sewa) }}
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

        <div v-if="pemesanan?.pembayaran?.length === 0" class="text-center py-4 bg-gray-50 rounded-xl">
          <p class="text-gray-500">Belum ada riwayat pembayaran</p>
        </div>

        <div v-else class="space-y-3">
          <div
            v-for="pembayaran in pemesanan?.pembayaran"
            :key="pembayaran.id"
            @click="goToDetailPembayaran(pembayaran.id)"
            class="group p-4 bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-500">{{ pembayaran.metode_pembayaran }}</p>
                <p class="text-lg font-medium text-gray-800">
                  {{ formatCurrency(pembayaran.jumlah_pembayaran) }}
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

      <!-- Informasi Kontrak Sewa -->
      <div class="space-y-4">
        <h2 class="text-lg font-medium text-gray-800 flex items-center">
          <DocumentTextIcon class="w-5 h-5 mr-2 text-green-600" />
          Informasi Kontrak Sewa
        </h2>
        <div v-if="!pemesanan?.kontrak_sewa" class="text-center py-4 bg-gray-50 rounded-xl">
          <p class="text-gray-500">Belum ada kontrak sewa</p>
        </div>
        <div v-else class="p-4 bg-gray-50 rounded-xl space-y-3">
          <div class="flex justify-between items-center">
            <p class="text-sm text-gray-600">Status Kontrak</p>
            <span :class="getStatusColor(pemesanan.kontrak_sewa.status_kontrak)" class="text-sm">
              {{ pemesanan.kontrak_sewa.status_kontrak }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <p class="text-sm text-gray-600">Dokumen Kontrak</p>
            <span
              @click="downloadKontrak"
              class="text-green-600 hover:text-green-800 cursor-pointer flex items-center"
            >
              <ArrowDownTrayIcon class="w-4 h-4 mr-1" />
              Download
            </span>
          </div>
        </div>
      </div>

      <!-- Tombol Bayar -->
      <div v-if="pemesanan.status_pemesanan === 'Menunggu Pembayaran'" class="pt-6 space-y-4">
        <button
          @click="handleBayarSekarang()"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-xl
                flex items-center justify-center transition-all"
        >
          <ArrowRightCircleIcon class="w-5 h-5 mr-2" />
          Bayar Sekarang
        </button>
        <button
          @click="showCancelModal = true"
          class="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl
                flex items-center justify-center transition-all"
        >
          <XCircleIcon class="w-5 h-5 mr-2" />
          Batalkan Pemesanan
        </button>
      </div>

      <!-- Tombol Ambil Kendaraan -->
      <div v-if="pemesanan.status_pemesanan === 'Dikonfirmasi'" class="pt-6">
        <button
          @click="showModalMaps = true"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl
                flex items-center justify-center transition-all"
        >
          <TruckIcon class="w-5 h-5 mr-2" />
          Ambil Kendaraan
        </button>
      </div>

      </div>
    </div>

    <!-- Modal Pembatalan -->
    <DynamicModal
      :show="showCancelModal"
      title="Konfirmasi Pembatalan"
      description="Apakah Anda yakin ingin membatalkan pemesanan ini? Tindakan ini tidak dapat dibatalkan."
      confirmText="Ya, Batalkan"
      confirmVariant="destructive"
      @close="showCancelModal = false"
      @confirm="confirmCancelPemesanan"
    />

    <!-- Modal Pilih Pembayaran  -->
    <ModalPilihPembayaran
      :show="showModalPilihPembayaran"
      :pemesanan="pemesanan"
      @close="showModalPilihPembayaran = false"
    />

    <!-- Modal Google Maps -->
    <GoogleMaps
      :show="showModalMaps"
      :latitude="pemesanan?.kendaraan?.lokasi_garasi?.latitude || 0"
      :longitude="pemesanan?.kendaraan?.lokasi_garasi?.longitude || 0"
      @close="showModalMaps = false"
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
  ArrowPathIcon,
  TruckIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
  WalletIcon
} from '@heroicons/vue/24/outline'
import ModalPilihPembayaran from "@/components/ModalPilihPembayaran.vue";
import GoogleMaps from '@/components/GoogleMaps.vue';
import DynamicModal from '@/components/DynamicModal.vue';
import { downloadFile, formatCurrency, formatDate } from '@/custom_utility/utils';
import { ArrowLeftIcon } from 'lucide-vue-next';

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
    TruckIcon,
    ArrowDownTrayIcon,
    ArrowLeftIcon,
    XCircleIcon,
    ClockIcon,
    ShieldCheckIcon,
    WalletIcon,
    CheckCircleIcon,
    ModalPilihPembayaran,
    GoogleMaps,
    DynamicModal,
  },
  data() {
    return {
      pemesanan: null,
      statusIcons: {
        'Menunggu Pembayaran': 'WalletIcon',
        "Menunggu Konfirmasi": 'ShieldCheckIcon',
        'Dikonfirmasi': 'CheckCircleIcon',
        'Sedang dalam Penggunaan': 'TruckIcon',
        'Selesai': 'CheckCircleIcon',
        'Dibatalkan': 'XCircleIcon'
      },
      showModalPilihPembayaran: false,
      showModalMaps: false,
      showCancelModal: false
    }
  },
  methods: {
    async fetchDetailPemesanan() {
      try {
        const response = await api.get(`/pemesanan/${this.$route.params.id}`)
        this.pemesanan = response.data
      } catch (error) {
        console.error('Gagal mengambil detail pemesanan:', error)
        if (error.response) {
          this.$router.replace('/404')
        }
      }
    },
    getStatusColor(status) {
      return {
        "Menunggu Pembayaran": "text-yellow-600",
        "Menunggu Konfirmasi": "text-orange-600",
        "Dikonfirmasi": "text-green-600",
        "Sedang dalam Penggunaan": "text-blue-600",
        "Selesai": "text-gray-500",
        "Dibatalkan": "text-red-600",

        'Belum Dibayar': 'text-gray-600',
        'Pending': 'text-yellow-500',
        'Lunas': 'text-green-500',
        'Belum Lunas': 'text-red-500',
      }[status] || "text-gray-500"
    },
    bayar() {
      this.$router.push(`/detail-pemesanan/${this.pemesanan.id}/bayar`)
    },
    goToDetailPembayaran(id) {
      this.$router.push(`/detail-pembayaran/${id}`)
    },
    handleBayarSekarang() {
      const belumDibayar = this.pemesanan?.pembayaran?.find(pembayaran =>
        pembayaran.status_pembayaran === 'Belum Dibayar'
      );
      if (belumDibayar) {
        this.goToDetailPembayaran(belumDibayar.id);
      } else {
        this.showModalPilihPembayaran = true;
      }
    },
    async confirmCancelPemesanan() {
      try {
        await api.post(`/pemesanan/${this.pemesanan.id}/cancel`)
        this.showCancelModal = false
        await this.fetchDetailPemesanan()
        this.$toast.success('Pemesanan berhasil dibatalkan')
        this.$router.push(`/riwayat-pemesanan/`)
      } catch (error) {
        console.error('Gagal membatalkan pemesanan:', error)
        this.$toast.error('Gagal membatalkan pemesanan. Silakan coba lagi.')
        throw error
      }
    },
    async downloadKontrak() {
      const url = this.pemesanan?.kontrak_sewa?.link_kontrak
      const filename = 'kontrak_sewa_' + this.pemesanan.id + ".pdf"

      try {
        await downloadFile(url, filename)
      } catch (error) {
        this.$toast.error(errMessage);
      }
    },
    handleBatalkanPemesanan() {
      this.showCancelModal = true
    },
    formatCurrency, formatDate
  },
  mounted() {
    this.fetchDetailPemesanan()
  },
}
</script>
