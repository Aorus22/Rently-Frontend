<template>
  <div class="w-full max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg flex flex-col lg:flex-row">
    <!-- Sidebar Tabs -->
    <div class="h-full lg:border-r">
      <div class="w-full lg:w-80 lg:sticky lg:top-24 h-fit lg:pr-4 lg:self-start">
      <div class="lg:bg-gray-100 lg:p-4 lg:rounded-lg">
        <h2 class="text-lg font-medium mb-4 text-gray-700 flex items-center">
          <BookmarkIcon class="w-5 h-5 mr-2 text-green-600" />
          Riwayat Pemesanan
        </h2>
        <ul class="space-y-1">
          <li
            v-for="tab in tabs"
            :key="tab.status"
            @click="selectedTab = tab.status"
            :class="[
              'cursor-pointer py-2 px-3 rounded-lg transition-all flex items-center text-sm',
              selectedTab === tab.status
                ? 'bg-green-600 text-white font-medium'
                : 'hover:bg-gray-200 text-gray-600'
            ]"
          >
            <component
              :is="tab.icon"
              class="w-4 h-4 mr-2"
              :class="selectedTab === tab.status ? 'text-white' : 'text-green-600'"
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
          <ArrowPathIcon class="w-8 h-8 text-green-600 animate-spin" />
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
        <div
          v-for="item in filteredPemesanan"
          :key="item.id"
          class="border p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer group"
          @click="goToDetail(item.id)"
        >
          <div class="flex items-start gap-4">
            <img
              :src="item.kendaraan.gambar_url"
              alt="Kendaraan"
              class="w-24 h-24 object-cover rounded-lg border-2 border-gray-200"
            >
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-lg font-medium text-gray-800">
                  {{ item.kendaraan.merek_model }}
                </h2>
                <span :class="getStatusColor(item.status_pemesanan)" class="text-sm flex items-center">
                  <component
                    :is="statusIcons[item.status_pemesanan]"
                    class="w-4 h-4 mr-1"
                  />
                  {{ item.status_pemesanan }}
                </span>
              </div>

              <div class="flex items-center text-sm text-gray-500 mb-2">
                <CalendarIcon class="w-4 h-4 mr-2 text-green-600" />
                {{ item.tanggal_mulai }} - {{ item.tanggal_selesai }}
              </div>

              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="text-green-600 font-medium text-lg">
                    {{ formatCurrency(item.total_harga_sewa) }}
                  </span>
                  <span class="text-gray-400 text-sm ml-1">/hari</span>
                </div>
                <button class="text-green-600 hover:text-green-700 flex items-center text-sm">
                  Detail
                  <ChevronRightIcon class="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatCurrency } from '@/custom_utility/utils';
import api from '../plugins/axios';
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
        : this.pemesanan.filter(item => item.status_pemesanan === this.selectedTab);
    }
  },
  methods: {
    async fetchPemesanan() {
      try {
        const response = await api.get("/pemesanan");
        this.pemesanan = response.data;
      } catch (error) {
        console.error("Gagal mengambil riwayat pemesanan:", error);
      } finally {
        this.loading = false;
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

    formatCurrency

  },
  mounted() {
    this.fetchPemesanan();
  }
};
</script>
