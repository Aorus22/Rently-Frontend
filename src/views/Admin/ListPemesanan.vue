<template>
  <div class="container mx-auto p-10">
    <div class="flex flex-col items-center gap-4 w-full">
  <div class="w-full max-w-6xl mx-auto">
    <h1 class="text-3xl font-bold tracking-tight">Daftar Pemesanan</h1>
  </div>

  <div class="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col lg:flex-row">
    <!-- Sidebar Tabs -->
    <div class="h-full lg:border-r">
      <div class="w-full lg:w-80 lg:sticky lg:top-24 h-fit lg:pr-4 lg:self-start">
      <div class="lg:bg-gray-100 lg:p-4 lg:rounded-lg">
        <ul class="space-y-1">
          <li
            v-for="tab in tabs"
            :key="tab.status"
            @click="selectedTab = tab.status"
            :class="[
              'cursor-pointer py-2 px-3 rounded-lg transition-all flex items-center text-sm',
              selectedTab === tab.status
                ? 'bg-primary text-primary-foreground font-medium'
                : 'hover:bg-muted text-muted-foreground'
            ]"
          >
            <component
              :is="tab.icon"
              class="w-4 h-4 mr-2"
              :class="selectedTab === tab.status ? 'text-white' : 'text-muted-foreground'"
            />
            {{ tab.label }}
          </li>
        </ul>
      </div>
    </div>
    </div>

    <!-- Daftar Pemesanan -->
    <div class="flex-1 lg:pl-6 mt-6 lg:mt-0">
      <h1 class="text-2xl font-medium text-gray-800 mb-6">
        {{ getTabLabel() }}
      </h1>

      <div v-if="loading" class="text-center py-8">
        <div class="flex flex-col items-center justify-center space-y-2">
          <ArrowPathIcon class="w-8 h-8 animate-spin" />
          <span class="text-gray-600">Memuat data pemesanan...</span>
        </div>
      </div>

      <div v-else>
        <div v-if="filteredPemesanan.length === 0" class="text-gray-500 text-center py-6 bg-gray-50 rounded-lg">
          <div class="flex flex-col items-center">
            <FaceFrownIcon class="w-12 h-12 text-gray-400 mb-2" />
            <span>Tidak ada pemesanan dalam status ini</span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <router-link
          v-for="pemesanan in filteredPemesanan"
          :key="pemesanan.id"
          :to="{ name: 'AdminPemesananDetail', params: { id: pemesanan.id } }"
          class="border p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer group block"
        >
          <div class="flex items-start gap-4">
            <img
              :src="pemesanan.kendaraan.gambar_url"
              alt="Kendaraan"
              class="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
            >
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-lg font-medium text-gray-800">
                  Pemesanan #{{ pemesanan.id }} - {{ pemesanan.kendaraan.merek_model }}
                </h2>
                <span :class="getStatusColor(pemesanan.status_pemesanan)" class="text-sm flex items-center">
                  <component
                    :is="statusIcons[pemesanan.status_pemesanan]"
                    class="w-4 h-4 mr-1"
                  />
                  {{ pemesanan.status_pemesanan }}
                </span>
              </div>

              <div class="flex items-center text-sm text-gray-500 mb-2">
                <CalendarIcon class="w-4 h-4 mr-2 text-yellow-600" />
                {{ formatDate(pemesanan.tanggal_mulai) }} - {{ formatDate(pemesanan.tanggal_selesai) }}
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="font-medium text-lg">
                    Total: Rp{{ formatCurrency(pemesanan.total_harga_sewa) }}
                  </span>
                </div>
                <button class="hover:text-gray-700 flex items-center text-sm">
                  Detail
                  <ChevronRightIcon class="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
  </div></div>
</template>

<script>
import api from '../../plugins/axios';
import {
  BookmarkIcon,
  CalendarIcon,
  ChevronRightIcon,
  FaceFrownIcon,
  WalletIcon,
  ClockIcon,
  CheckCircleIcon,
  TruckIcon,
  XCircleIcon,
  ShieldCheckIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

export default {
  components: {
    BookmarkIcon,
    CalendarIcon,
    ChevronRightIcon,
    FaceFrownIcon,
    WalletIcon,
    ClockIcon,
    CheckCircleIcon,
    TruckIcon,
    XCircleIcon,
    ShieldCheckIcon,
    ArrowPathIcon
  },
  data() {
    return {
      loading: true,
      pemesanan: [],
      selectedTab: "Semua",
      tabs: [
        {
          label: "Semua",
          status: "Semua",
          icon: 'BookmarkIcon'
        },
        {
          label: "Menunggu Pembayaran",
          status: "Menunggu Pembayaran",
          icon: 'WalletIcon'
        },
        {
          label: "Menunggu Konfirmasi",
          status: "Menunggu Konfirmasi",
          icon: 'ShieldCheckIcon'
        },
        {
          label: "Dikonfirmasi",
          status: "Dikonfirmasi",
          icon: 'CheckCircleIcon'
        },
        {
          label: "Sedang dalam Penggunaan",
          status: "Sedang dalam Penggunaan",
          icon: 'TruckIcon'
        },
        {
          label: "Selesai",
          status: "Selesai",
          icon: 'CheckCircleIcon'
        },
        {
          label: "Dibatalkan",
          status: "Dibatalkan",
          icon: 'XCircleIcon'
        }
      ],
      statusIcons: {
        "Menunggu Pembayaran": 'ClockIcon',
        "Menunggu Konfirmasi": 'ShieldCheckIcon',
        "Dikonfirmasi": 'CheckCircleIcon',
        "Sedang dalam Penggunaan": 'TruckIcon',
        "Selesai": 'CheckCircleIcon',
        "Dibatalkan": 'XCircleIcon'
      }
    };
  },
  computed: {
    filteredPemesanan() {
      return this.selectedTab === "Semua"
        ? this.pemesanan
        : this.pemesanan.filter(pemesanan => pemesanan.status_pemesanan === this.selectedTab);
    }
  },
  methods: {
    async fetchPemesanan() {
      this.loading = true
      try {
        const response = await api.get('/admin/pemesanan', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_access_token')}`
          }
        })
        this.pemesanan = response.data.data
      } catch (error) {
        console.error('Gagal mengambil pemesanan:', error)
      } finally {
        this.loading = false
      }
    },
    getStatusColor(status) {
      return {
        "Menunggu Pembayaran": "text-yellow-600",
        "Menunggu Konfirmasi": "text-orange-600",
        "Dikonfirmasi": "text-green-600",
        "Sedang dalam Penggunaan": "text-blue-600",
        "Selesai": "text-gray-500",
        "Dibatalkan": "text-red-600"
      }[status] || "text-gray-500"
    },
    getTabLabel() {
      return this.tabs.find(tab => tab.status === this.selectedTab)?.label || "Riwayat Pemesanan";
    },
    goToDetail(id) {
      this.$router.push(`/detail-pemesanan/${id}`);
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2 }).format(amount)
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString('id-ID') : '-'
    }
  },
  mounted() {
    this.fetchPemesanan();
  }
};
</script>
