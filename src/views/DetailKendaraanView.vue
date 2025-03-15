html
Copy
<template>
  <div class="flex-1 p-6 bg-gray-50 min-h-screen">
    <!-- Loading State -->
    <div v-if="loading" class="text-center py-12">
      <div class="flex flex-col items-center justify-center space-y-2">
        <ArrowPathIcon class="w-8 h-8 text-green-600 animate-spin" />
        <span class="text-gray-600">Memuat detail kendaraan...</span>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else-if="kendaraan" class="max-w-5xl mx-auto">
      <div class="bg-white rounded-xl shadow-lg overflow-hidden">
        <div class="relative aspect-video bg-gray-200">
          <img
            :src="kendaraan.gambar_url"
            :alt="kendaraan.merek_model"
            class="w-full h-full object-cover"
          />
          <span class="absolute top-4 left-4 px-3 py-1 bg-white rounded-full text-sm font-medium shadow-sm"
                :class="statusColor[kendaraan.status_ketersediaan]">
            <component
              :is="statusIcons[kendaraan.status_ketersediaan]"
              class="w-4 h-4 mr-1 inline-block"
            />
            {{ kendaraan.status_ketersediaan }}
          </span>
        </div>

        <!-- Detail Section -->
        <div class="p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h1 class="text-3xl font-medium text-gray-800 mb-4">{{ kendaraan.merek_model }}</h1>

            <div class="space-y-3 text-gray-600">
              <div class="flex items-center">
                <TagIcon class="w-5 h-5 mr-2 text-green-600" />
                {{ kendaraan.kategori_kendaraan }}
              </div>
              <div class="flex items-center">
                <MapPinIcon class="w-5 h-5 mr-2 text-green-600" />
                {{ kendaraan.lokasi_kendaraan }}
              </div>
              <div class="flex items-center">
                <CalendarIcon class="w-5 h-5 mr-2 text-green-600" />
                Tahun {{ kendaraan.tahun_produksi }}
              </div>
              <div class="flex items-center">
                <IdentificationIcon class="w-5 h-5 mr-2 text-green-600" />
                {{ kendaraan.nomor_polisi }}
              </div>
            </div>
          </div>

          <!-- Specs & Price -->
          <div class="border-l lg:pl-8">
            <div class="space-y-4">
              <div class="bg-green-50 p-4 rounded-lg">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-500">Harga Sewa Harian</p>
                    <p class="text-2xl font-bold text-green-600">
                      Rp{{ formatHarga(kendaraan.harga_sewa_per_periode) }}
                    </p>
                  </div>
                  <CurrencyDollarIcon class="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 text-sm">
                <div class="flex items-center">
                  <UserGroupIcon class="w-4 h-4 mr-2 text-green-600" />
                  {{ kendaraan.kapasitas_kursi }} Kursi
                </div>
                <div class="flex items-center">
                  <Cog6ToothIcon class="w-4 h-4 mr-2 text-green-600" />
                  {{ kendaraan.jenis_transmisi }}
                </div>
                <div class="flex items-center">
                  <WrenchScrewdriverIcon class="w-4 h-4 mr-2 text-green-600" />
                  {{ kendaraan.kondisi_fasilitas }}
                </div>
              </div>

              <button
                @click="goToPemesanan"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg
                      flex items-center justify-center transition-all"
              >
                Ajukan Sewa
                <ArrowRightIcon class="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div v-else class="text-center py-12">
      <div class="flex flex-col items-center justify-center space-y-2">
        <FaceFrownIcon class="w-12 h-12 text-red-500" />
        <span class="text-red-600 font-medium">Kendaraan tidak ditemukan</span>
        <p class="text-gray-600">Silakan coba kembali atau pilih kendaraan lain</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../plugins/axios'
import {
  ArrowPathIcon,
  MapPinIcon,
  CalendarIcon,
  IdentificationIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  WrenchScrewdriverIcon,
  ArrowRightIcon,
  FaceFrownIcon,
  TagIcon
} from '@heroicons/vue/24/outline'

export default {
  components: {
    ArrowPathIcon,
    MapPinIcon,
    CalendarIcon,
    IdentificationIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    Cog6ToothIcon,
    WrenchScrewdriverIcon,
    ArrowRightIcon,
    FaceFrownIcon,
    TagIcon
  },
  data() {
    return {
      kendaraan: null,
      loading: true,
      statusIcons: {
        'Tersedia': 'CheckCircleIcon',
        'Disewa': 'XCircleIcon',
        'Dalam Perawatan': 'WrenchScrewdriverIcon'
      },
      statusColor: {
        'Tersedia': 'text-green-600',
        'Disewa': 'text-red-600',
        'Dalam Perawatan': 'text-yellow-600'
      }
    }
  },
  methods: {
    async fetchDetail() {
      const id = this.$route.params.id
      try {
        const response = await api.get(`/kendaraan/${id}`)
        this.kendaraan = response.data
      } catch (error) {
        console.error('Gagal mengambil detail kendaraan:', error)
      } finally {
        this.loading = false
      }
    },
    formatHarga(harga) {
      return new Intl.NumberFormat('id-ID').format(harga)
    },
    goToPemesanan() {
      this.$router.push(`/kendaraan/${this.kendaraan.id}/pesan`)
    },
  },
  mounted() {
    this.fetchDetail()
  },
}
</script>
