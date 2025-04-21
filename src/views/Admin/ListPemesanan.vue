<template>
  <div class="container mx-auto">
    <div class="flex flex-col gap-6 w-full">
      <div class="w-full max-w-6xl mx-auto">
        <h1 class="text-3xl font-bold tracking-tight">Daftar Pemesanan</h1>
      </div>

      <!-- Tabs -->
      <div class="w-full max-w-6xl mx-auto relative">
        <div class="flex items-center">
          <button
            @click="scrollLeft"
            class="absolute left-0 z-10 bg-white/80 rounded-full shadow-md p-2 hover:bg-gray-100 transition-all"
            :class="{'opacity-0': isScrollLeftEnd}"
          >
            <ChevronLeftIcon class="w-5 h-5" />
          </button>

          <div
            ref="tabsContainer"
            class="flex overflow-x-auto scrollbar-hide py-2 px-4 space-x-3 scroll-smooth"
            style="scroll-behavior: smooth"
          >
            <button
              v-for="tab in tabs"
              :key="tab.status"
              @click="selectedTab = tab.status"
              :class="[
                'flex-none transition-all whitespace-nowrap flex items-center text-sm py-2 px-4 rounded-lg',
                selectedTab === tab.status
                  ? 'bg-primary text-primary-foreground font-medium'
                  : 'bg-gray-100 hover:bg-gray-200 text-muted-foreground'
              ]"
            >
              <component
                :is="tab.icon"
                class="w-4 h-4 mr-2"
                :class="selectedTab === tab.status ? 'text-white' : 'text-muted-foreground'"
              />
              {{ tab.label }}
            </button>
          </div>

          <button
            @click="scrollRight"
            class="absolute right-0 z-10 bg-white/80 rounded-full shadow-md p-2 hover:bg-gray-100 transition-all"
            :class="{'opacity-0': isScrollRightEnd}"
          >
            <ChevronRightIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Content Area -->
      <div class="w-full max-w-6xl mx-auto bg-white rounded-lg">

        <div v-if="loading" class="text-center py-8">
          <div class="flex flex-col items-center justify-center space-y-2">
            <ArrowPathIcon class="w-8 h-8 animate-spin" />
            <span class="text-gray-600">Memuat data pemesanan...</span>
          </div>
        </div>

        <div v-else-if="filteredPemesanan.length === 0" class="text-gray-500 text-center py-6 bg-gray-50 rounded-lg">
          <div class="flex flex-col items-center">
            <FaceFrownIcon class="w-12 h-12 text-gray-400 mb-2" />
            <span>Tidak ada pemesanan dalam status ini</span>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                <div class="grid grid-cols-[1fr_auto] items-start mb-2">
                  <h3 class="text-lg font-medium text-gray-800">
                    #{{ pemesanan.id }} - {{ pemesanan.kendaraan.merek_model }}
                  </h3>
                  <span
                    :class="getStatusColor(pemesanan.status_pemesanan)"
                    class="text-sm flex items-center ml-4"
                  >
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
                      Rp{{ formatCurrency(pemesanan.total_harga_sewa) }}
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
  </div>
</template>

<script>
import api from '../../plugins/axios';
import {
  BookmarkIcon,
  CalendarIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
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
    ChevronLeftIcon,
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
      isScrollLeftEnd: true,
      isScrollRightEnd: false,
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
    formatCurrency(amount) {
      return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2 }).format(amount)
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString('id-ID') : '-'
    },
    scrollLeft() {
      if (this.$refs.tabsContainer) {
        this.$refs.tabsContainer.scrollLeft -= 200;
      }
    },
    scrollRight() {
      if (this.$refs.tabsContainer) {
        this.$refs.tabsContainer.scrollLeft += 200;
      }
    },
    checkScrollPosition() {
      const container = this.$refs.tabsContainer;
      if (container) {
        this.isScrollLeftEnd = container.scrollLeft <= 0;
        this.isScrollRightEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 5;
      }
    }
  },
  mounted() {
    this.fetchPemesanan();
    if (this.$refs.tabsContainer) {
      this.$refs.tabsContainer.addEventListener('scroll', this.checkScrollPosition);
      this.$nextTick(() => {
        this.checkScrollPosition();
      });
    }
  },
  beforeUnmount() {
    if (this.$refs.tabsContainer) {
      this.$refs.tabsContainer.removeEventListener('scroll', this.checkScrollPosition);
    }
  }
};
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
