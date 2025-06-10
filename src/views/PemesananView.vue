<template>
  <div class="w-full flex items-center justify-center bg-gray-100 p-4 md:p-6">
    <Card class="flex flex-col md:flex-row w-full max-w-7xl shadow-lg overflow-hidden">
      <!-- Detail Kendaraan  -->
      <div class="w-full md:w-1/3 p-4 md:p-6 bg-white">
        <div class="w-full p-3 md:p-4 bg-green-600 text-center text-white rounded-md">
          <h2 class="text-base md:text-lg font-bold">Detail Pemesanan</h2>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="animate-pulse space-y-4 mt-4">
          <div class="w-full h-32 md:h-40 bg-gray-300 rounded-lg"></div>
          <div class="h-6 bg-gray-300 rounded w-2/3"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          <div class="h-4 bg-gray-300 rounded w-1/3"></div>
          <div class="h-10 bg-gray-300 rounded w-full"></div>
        </div>

        <!-- Konten Kendaraan -->
        <template v-else>
          <img
            :src="kendaraan.gambar_url"
            alt="Kendaraan"
            class="w-full h-fit object-cover rounded-lg my-4"
          />
          <div class="mb-4 border-b-2 border-gray-400 py-2 border-opacity-65">
            <h3 class="text-lg md:text-xl font-semibold text-gray-800">
              {{ kendaraan.merek_model }}
            </h3>
          </div>
          <div class="space-y-2 text-gray-600 text-sm md:text-base">
            <div class="flex items-center space-x-2">
              <MapPinIcon class="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              <span>{{ kendaraan.lokasi_garasi?.kota }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <CarIcon class="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              <span>{{ kendaraan.tahun_produksi }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <UsersIcon class="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              <span>{{ kendaraan.kapasitas_kursi }} Kursi</span>
            </div>
            <div class="flex items-center space-x-2">
              <ClockIcon class="w-4 h-4 md:w-5 md:h-5 text-green-600" />
              <span>{{ kendaraan.jenis_transmisi }}</span>
            </div>
          </div>
          <div class="w-full flex justify-center mt-4">
            <div
              class="w-full border-2 border-green-600 text-green-600 font-light py-2 rounded-sm flex justify-center"
            >
              <p class="text-green-600 font-bold text-base md:text-lg">
                {{ formatCurrency(kendaraan.harga_sewa_per_periode) }}/Hari
              </p>
            </div>
          </div>
        </template>
      </div>

      <!-- Form Pemesanan  -->
      <CardContent class="w-full md:w-2/3 p-4 md:p-6 bg-gray-50">
        <div class="flex items-center mb-4">
          <h1 class="text-xl md:text-2xl font-bold text-gray-800 leading-none">Pesan Kendaraan</h1>
          <div class="flex-1 h-px md:h-0.5 bg-gray-300 ml-3"></div>
        </div>

        <!-- Informasi Kontak -->
        <section class="mb-4 md:mb-6">
          <h3 class="text-base md:text-lg font-semibold text-gray-800 mb-2 bg-gray-300 p-2">
            Informasi Kontak
          </h3>
          <div class="space-y-3 md:space-y-4">
            <div
              class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4"
            >
              <Label class="md:w-1/3 text-gray-600 font-medium text-sm md:text-base">Nama</Label>
              <Input v-model="nama" class="w-full md:w-2/3" placeholder="Masukkan nama" />
            </div>
            <div
              class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4"
            >
              <Label class="md:w-1/3 text-gray-600 font-medium text-sm md:text-base"
                >No. Handphone</Label
              >
              <Input v-model="no_handphone" class="w-full md:w-2/3" placeholder="Masukkan nomor" />
            </div>
            <div
              class="flex flex-col md:flex-row md:items-start space-y-1 md:space-y-0 md:space-x-4"
            >
              <Label class="md:w-1/3 text-gray-600 font-medium text-sm md:text-base">Email</Label>
              <div class="w-full md:w-2/3 space-y-1">
                <Input v-model="email" type="email" class="w-full" placeholder="Masukkan email" />
                <p class="text-xs text-gray-500">
                  Email yang Anda masukkan akan digunakan untuk mengirimkan soft file.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Detail Penyewaan -->
        <section class="mb-4 md:mb-6">
          <h3 class="text-base md:text-lg font-semibold text-gray-800 mb-2 bg-gray-300 p-2">
            Detail Penyewaan
          </h3>
          <div class="space-y-3 md:space-y-4">
            <div
              class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4"
            >
              <Label class="md:w-1/3 text-gray-600 font-medium text-sm md:text-base"
                >Tanggal Mulai</Label
              >
              <Input v-model="tanggal_mulai" type="date" class="w-full md:w-2/3" :min="minDate" />
            </div>
            <div
              class="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4"
            >
              <Label class="md:w-1/3 text-gray-600 font-medium text-sm md:text-base">Durasi</Label>
              <Input
                v-model="durasi"
                type="number"
                min="1"
                class="w-full md:w-2/3"
                placeholder="Masukkan durasi (hari)"
                @input="validateInputDurasi"
              />
            </div>
          </div>
        </section>

        <!-- Tombol Konfirmasi -->
        <div class="flex justify-center md:justify-end mt-4">
          <Button
            @click="submitPemesanan"
            class="w-full md:w-56 py-3 md:py-2 font-semibold text-base"
            :class="{
              'bg-green-600 text-white hover:bg-green-700': true,
              'opacity-50 cursor-not-allowed': loading,
            }"
            :disabled="loading"
          >
            Konfirmasi Pemesanan
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
</template>

<script>
import api from '../plugins/axios'
import { useAuthStore } from '@/stores/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { MapPinIcon, CarIcon, UsersIcon, ClockIcon } from 'lucide-vue-next'
import { formatCurrency } from '@/custom_utility/utils'

export default {
  components: {
    Card,
    CardContent,
    Input,
    Button,
    Label,
    MapPinIcon,
    CarIcon,
    UsersIcon,
    ClockIcon,
  },
  data() {
    return {
      kendaraan: {},
      nama: '',
      no_handphone: '',
      email: '',
      tanggal_mulai: '',
      durasi: 1,
      authStore: useAuthStore(),
      loading: true,
      minDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
    }
  },
  methods: {
    async fetchKendaraan() {
      try {
        const response = await api.get(`/kendaraan/${this.$route.params.id}`)
        this.kendaraan = response.data
      } catch (error) {
        console.error('Gagal mengambil data kendaraan:', error)
      }
    },
    async fetchUserData() {
      this.loading = true
      try {
        const response = await api.get('/me')
        const user = response.data
        this.nama = user.nama_lengkap || ''
        this.email = user.email || ''
        this.no_handphone = user.no_handphone || ''
      } catch (error) {
        console.error('Gagal mengambil data pengguna:', error)
      } finally {
        this.loading = false
      }
    },
    async submitPemesanan() {
      if (!this.tanggal_mulai) {
        this.$toast.warning('Tanggal mulai harus diisi')
        return
      }

      if (!this.durasi) {
        this.$toast.warning('Durasi harus diisi')
        return
      }

      if (this.durasi > 30) {
        this.$toast.warning('Durasi maksimum peminjaman adalah 30 hari')
        return
      }

      let loader = this.$loading.show({
        isFullPage: true,
      })

      try {
        await api.post('/pemesanan', {
          kendaraan_id: this.kendaraan.id,
          tanggal_mulai: this.tanggal_mulai,
          durasi: this.durasi,
          nama: this.nama,
          no_handphone: this.no_handphone,
          email: this.email,
        })

        this.$toast.success('Pemesanan berhasil!')
        this.$router.push('/riwayat-pemesanan')
      } catch (error) {
        console.error('Gagal melakukan pemesanan:', error)
        this.$toast.error('Terjadi kesalahan saat memproses pemesanan.')
      } finally {
        loader.hide()
      }
    },
    validateInputDurasi(event) {
      const value = event.target.value
      if (value === '' || value < 1) {
        this.durasi = ''
      } else if (value > 30) {
        this.durasi = 30
        this.$toast.warning('Durasi maksimum peminjaman adalah 30 hari')
      } else {
        this.durasi = parseInt(value)
      }
    },
    formatCurrency,
  },
  mounted() {
    this.fetchKendaraan()
    this.fetchUserData()
  },
}
</script>
