<template>
  <div class="w-full flex items-center justify-center bg-gray-100 p-6">
    <Card class="flex w-full max-w-7xl shadow-lg overflow-hidden">
      <!-- Bagian Kiri: Detail Kendaraan -->
      <div class="w-1/3 p-6 bg-white">
        <div class="w-full p-4 bg-[#159763] text-center text-white rounded-md">
          <h2 class="text-lg font-bold">Detail Pemesanan</h2>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="animate-pulse space-y-4">
          <div class="w-full h-40 bg-gray-300 rounded-lg"></div>
          <div class="h-6 bg-gray-300 rounded w-2/3"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          <div class="h-4 bg-gray-300 rounded w-1/3"></div>
          <div class="h-10 bg-gray-300 rounded w-full max-w-72"></div>
        </div>

        <!-- Konten Kendaraan -->
        <template v-else>
          <img :src="kendaraan.gambar_url" alt="Kendaraan" class="w-full h-fit object-cover rounded-lg mb-4" />
          <div class="mb-4 border-b-2 border-gray-400 py-2 border-opacity-65">
            <h3 class="text-xl font-semibold text-gray-800">{{ kendaraan.merek_model }}</h3>
          </div>
          <div class="space-y-2 text-gray-600">
            <div class="flex items-center space-x-2">
              <MapPinIcon class="w-5 h-5 text-green-600" />
              <span>{{ kendaraan.lokasi_garasi?.kota }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <CarIcon class="w-5 h-5 text-green-600" />
              <span>{{ kendaraan.tahun_produksi }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <UsersIcon class="w-5 h-5 text-green-600" />
              <span>{{ kendaraan.kapasitas_kursi }} Kursi</span>
            </div>
            <div class="flex items-center space-x-2">
              <ClockIcon class="w-5 h-5 text-green-600" />
              <span>{{ kendaraan.jenis_transmisi }}</span>
            </div>
          </div>
          <div class="w-full flex justify-center mt-4">
            <div class="w-full max-w-72 border-2 border-green-600 text-green-600 font-light py-2 rounded-sm flex justify-center">
              <p class="text-green-600 font-bold text-lg">Rp {{ formatHarga(kendaraan.harga_sewa_per_periode) }}/Hari</p>
            </div>
          </div>
        </template>
      </div>

      <!-- Bagian Kanan: Form Pemesanan -->
      <CardContent class="w-2/3 p-6 bg-gray-50">
        <div class="flex items-center mb-4">
          <h1 class="text-2xl font-bold text-gray-800 leading-none">Pesan Kendaraan</h1>
          <div class="flex-1 h-[2px] bg-gray-300 ml-3"></div>
        </div>

        <!-- Informasi Kontak -->
        <section class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-2 bg-gray-300 p-2">Informasi Kontak</h3>
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <Label class="w-1/3 text-gray-600 font-medium">Nama</Label>
              <Input v-model="nama" class="w-2/3" placeholder="Masukkan nama" />
            </div>
            <div class="flex items-center space-x-4">
              <Label class="w-1/3 text-gray-600 font-medium">No. Handphone</Label>
              <Input v-model="no_handphone" class="w-2/3" placeholder="Masukkan nomor" />
            </div>
            <div class="flex items-start space-x-4">
              <Label class="w-1/3 text-gray-600 font-medium">Email</Label>
              <div class="w-2/3 space-y-1">
                <Input v-model="email" type="email" class="w-full" placeholder="Masukkan email" />
                <p class="text-xs text-gray-500">
                  Email yang Anda masukkan akan digunakan untuk mengirimkan soft file.
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Detail Penyewaan -->
        <section class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-2 bg-gray-300 p-2">Detail Penyewaan</h3>
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <Label class="w-1/3 text-gray-600 font-medium">Tanggal Mulai</Label>
              <Input v-model="tanggal_mulai" type="date" class="w-2/3" />
            </div>
            <div class="flex items-center space-x-4">
              <Label class="w-1/3 text-gray-600 font-medium">Durasi</Label>
              <Input v-model="durasi" type="number" min="1" class="w-2/3" placeholder="Masukkan durasi (hari)" />
            </div>
          </div>
        </section>

        <!-- Tombol Konfirmasi -->
        <div class="flex justify-end">
          <Button
            @click="submitPemesanan"
            class="w-56 font-semibold"
            :class="{
              'bg-green-600 text-white hover:bg-green-700': true,
              'opacity-50 cursor-not-allowed': loading
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
    ClockIcon
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
      loading: true
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
      let loader = this.$loading.show({
        isFullPage: true
      })

      try {
        await api.post('/pemesanan', {
          kendaraan_id: this.kendaraan.id,
          tanggal_mulai: this.tanggal_mulai,
          durasi: this.durasi,
          nama: this.nama,
          no_handphone: this.no_handphone,
          email: this.email
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
    formatHarga(harga) {
      return new Intl.NumberFormat('id-ID').format(harga)
    }
  },
  mounted() {
    this.fetchKendaraan()
    this.fetchUserData()
  }
}
</script>