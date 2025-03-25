<template>
  <div class="w-full bg-white p-10">
    <!-- Header -->
    <div class="text-center mb-6">
      <div class="text-green-600 font-medium text-sm">MOBIL SEDAN</div>
      <h1 class="text-3xl font-medium text-gray-600 mb-2">Pilih Mobil yang Sesuai untuk Anda</h1>
      <p class="text-gray-500 text-sm">
        Kami menghadirkan mobil populer yang siap digunakan untuk memaksimalkan kenyamanan Anda dalam perjalanan jauh
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Filter Section -->
      <div class="w-full lg:w-80 lg:sticky top-24 h-fit bg-gray-100 p-4 rounded-lg lg:self-start">
        <div class="flex justify-between items-center mb-4">
          <h2 class="font-bold text-gray-800">FILTER</h2>
          <button
            @click="resetFilters"
            class="text-green-600 text-sm"
          >
            Reset
          </button>
        </div>

        <!-- Price Range dengan dua slider dan track -->
        <div class="mb-6">
          <h3 class="font-medium text-sm mb-2">Kisaran harga</h3>
          <div class="relative pt-5 pb-4 h-8">
            <!-- Track Background -->
            <div class="slider-track"></div>

            <!-- Active Range Track -->
            <div
              class="slider-range"
              :style="{
                left: `${(minPriceRange / 1000000) * 100}%`,
                right: `${100 - (maxPriceRange / 1000000) * 100}%`
              }"
            ></div>

            <!-- Input Sliders -->
            <input
              type="range"
              min="0"
              max="1000000"
              v-model="minPriceRange"
              class="slider-input"
              @input="validatePriceRange"
            />
            <input
              type="range"
              min="0"
              max="1000000"
              v-model="maxPriceRange"
              class="slider-input"
              @input="validatePriceRange"
            />

            <!-- Price Range Display -->
            <div class="flex justify-between text-xs text-gray-500 mt-4">
              <span>Rp {{ formatHarga(minPriceRange) }}</span>
              <span>Rp {{ formatHarga(maxPriceRange) }}</span>
            </div>
          </div>
        </div>

        <!-- Capacity -->
        <div class="mb-6">
          <h3 class="font-medium text-sm mb-2">Kapasitas kursi</h3>
          <div class="flex gap-2">
            <button
              class="px-4 py-2 rounded-full text-sm"
              :class="selectedCapacity === 4 ? 'bg-green-600 text-white' : 'bg-white text-gray-600'"
              @click="toggleCapacity(4)"
            >
              {{ "<5 kursi" }}
            </button>
            <button
              class="px-4 py-2 rounded-full text-sm"
              :class="selectedCapacity === 5 ? 'bg-green-600 text-white' : 'bg-white text-gray-600'"
              @click="toggleCapacity(5)"
            >
              5-6 kursi
            </button>
            <button
              class="px-4 py-2 rounded-full text-sm"
              :class="selectedCapacity === 7 ? 'bg-green-600 text-white' : 'bg-white text-gray-600'"
              @click="toggleCapacity(7)"
            >
              7+ kursi
            </button>
          </div>
        </div>

        <!-- Transmission -->
        <div>
          <h3 class="font-medium text-sm mb-2">Transmisi</h3>
          <div class="flex gap-2">
            <button
              class="px-4 py-2 rounded-full text-sm"
              :class="selectedTransmission === 'Automatic' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'"
              @click="toggleTransmission('Automatic')"
            >
              Otomatis
            </button>
            <button
              class="px-4 py-2 rounded-full text-sm"
              :class="selectedTransmission === 'Manual' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'"
              @click="toggleTransmission('Manual')"
            >
              Manual
            </button>
          </div>
        </div>

        <!-- Category -->
        <div class="mt-5">
          <h3 class="font-medium text-sm mb-2">Kategori Kendaraan</h3>
          <div class="flex gap-2">
            <button
              class="px-4 py-2 rounded-full text-sm"
              :class="selectedCategory === 'Mobil' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'"
              @click="toggleCategory('Mobil')"
            >
              Mobil
            </button>
            <button
              class="px-4 py-2 rounded-full text-sm"
              :class="selectedCategory === 'Minibus' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'"
              @click="toggleCategory('Minibus')"
            >
              Minibus
            </button>
            <button
              class="px-4 py-2 rounded-full text-sm"
              :class="selectedCategory === 'Pickup' ? 'bg-green-600 text-white' : 'bg-white text-gray-600'"
              @click="toggleCategory('Pickup')"
            >
              Pickup
            </button>
          </div>
        </div>
      </div>

      <!-- Car List -->
      <div class="flex-1">

        <!-- Skeleton Loading -->
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <div v-for="n in 6" :key="n" class="bg-white rounded-lg shadow overflow-hidden">
            <div class="p-4">
              <div class="w-full h-40 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
            <div class="px-4 pb-4">
              <div class="h-4 w-3/4 bg-gray-200 animate-pulse mb-2"></div>
              <div class="h-4 w-1/2 bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>

        <!-- Jika data sudah selesai dimuat -->
        <div v-else>
          <div v-if="filteredKendaraan.length === 0" class="text-center text-gray-500">
            Tidak ada kendaraan tersedia.
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div
              v-for="item in filteredKendaraan"
              :key="item.id"
              class="bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition"
              @click="goToDetail(item.id)"
            >
              <div class="p-4">
                <img :src="item.gambar_url" alt="Kendaraan" class="w-full h-40 object-cover rounded-lg">
              </div>
              <div class="px-4 pb-4">
                <h3 class="font-medium text-gray-800">{{ item.merek_model }}</h3>
                <div class="flex items-center justify-between mt-2">
                  <div class="flex items-center">
                    <span class="text-green-600 font-medium">Rp{{ formatHarga(item.harga_sewa_per_periode) }}</span>
                    <span class="text-gray-400 text-sm">/hari</span>
                  </div>
                  <div class="flex items-center text-gray-400 text-sm">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {{ item.lokasi_garasi.kota }}
                  </div>
                </div>
                <button class="w-full mt-4 text-green-600 border border-green-600 rounded-lg py-2 text-center flex items-center justify-center">
                  View
                  <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
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
import api from '../plugins/axios'

export default {
  data() {
    return {
      isLoading: true,
      kendaraan: [],
      minPriceRange: 0,
      maxPriceRange: 1000000,
      selectedCapacity: null,
      selectedTransmission: null,
      selectedCategory: null,
    };
  },
  created() {
    this.selectedCategory = this.$route.query.category || null;
  },
  computed: {
    filteredKendaraan() {
      return this.kendaraan.filter(item => {
        const harga = Number(item.harga_sewa_per_periode);
        const minHarga = Number(this.minPriceRange);
        const maxHarga = Number(this.maxPriceRange);

        const priceMatch = harga >= minHarga && harga <= maxHarga;
        const capacityMatch = !this.selectedCapacity ||
                              (this.selectedCapacity === 4 && item.kapasitas_kursi <= 4) ||
                              (this.selectedCapacity === 5 && (item.kapasitas_kursi === 5 || item.kapasitas_kursi === 6)) ||
                              (this.selectedCapacity === 7 && item.kapasitas_kursi >= 7);

        const transmissionMatch = !this.selectedTransmission ||
                                  item.jenis_transmisi === this.selectedTransmission;

        const categoryMatch = !this.selectedCategory || item.kategori_kendaraan === this.selectedCategory

        return priceMatch && capacityMatch && transmissionMatch && categoryMatch;
      });
    }
  },
  methods: {
    async fetchKendaraan() {
      try {
        const response = await api.get(`/kendaraan`);
        this.kendaraan = response.data;
      } catch (error) {
        console.error("Gagal mengambil data kendaraan:", error);
      }
      this.isLoading = false;
    },

    formatHarga(harga) {
      return new Intl.NumberFormat('id-ID').format(harga);
    },

    goToDetail(id) {
      this.$router.push(`/kendaraan/${id}`);
    },

    resetFilters() {
      this.minPriceRange = 0;
      this.maxPriceRange = 1000000;
      this.selectedCapacity = null;
      this.selectedTransmission = null;
      this.selectedCategory = null;
    },

    toggleCapacity(capacity) {
      this.selectedCapacity = this.selectedCapacity === capacity ? null : capacity;
    },

    toggleTransmission(transmission) {
      this.selectedTransmission = this.selectedTransmission === transmission ? null : transmission;
    },

    toggleCategory(category) {
      this.selectedCategory = this.selectedCategory === category ? null : category;
    },

    validatePriceRange() {
      if (parseInt(this.minPriceRange) > parseInt(this.maxPriceRange)) {
        this.minPriceRange = this.maxPriceRange;
      }

      if (parseInt(this.maxPriceRange) <= parseInt(this.minPriceRange)) {
        this.maxPriceRange = this.minPriceRange;
      }
    }
  },
  mounted() {
    this.fetchKendaraan();
  }
};
</script>

<style scoped>
.slider-track {
  @apply absolute top-1/2 left-0 right-0 h-1 bg-gray-300 rounded-full transform -translate-y-1/2;
}

.slider-range {
  @apply absolute top-1/2 h-1 bg-green-600 rounded-full transform -translate-y-1/2;
}

.slider-input {
  @apply absolute top-1/2 left-0 w-full h-0 transform -translate-y-1/2 appearance-none pointer-events-none;
}

.slider-input::-webkit-slider-thumb {
  @apply w-4 h-4 bg-green-600 rounded-full appearance-none cursor-pointer pointer-events-auto;
}

.slider-input::-moz-range-thumb {
  @apply w-4 h-4 bg-green-600 rounded-full appearance-none cursor-pointer pointer-events-auto;
}
</style>
