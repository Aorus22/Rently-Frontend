<template>
  <div class="w-full flex items-center justify-center bg-gray-100 p-6">
    <div class="flex w-full max-w-7xl bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="w-1/3 p-6 bg-white">
        <div class="w-full p-4 bg-[#159763] text-center text-white rounded-md">
          <h2 class="text-lg font-bold">Detail Pemesanan</h2>
        </div>

        <div v-if="loading" class="animate-pulse">
          <div class="w-full h-40 bg-gray-300 rounded-lg my-4"></div>

          <div class="h-6 bg-gray-300 rounded w-2/3 mb-2"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
          <div class="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div class="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>

          <div class="h-10 bg-gray-300 rounded w-full max-w-72"></div>
        </div>

        <template v-else>
          <img :src="kendaraan.gambar_url" alt="Kendaraan" class="w-full h-fit object-cover rounded-lg mb-4" />
          <div class="mb-4 border-b-2 border-gray-400 py-2 border-opacity-65">
            <h3 class="text-xl font-semibold text-gray-800">{{ kendaraan.merek_model }}</h3>
          </div>
          <div class="flex items-center space-x-2 text-gray-600 mb-2">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>{{ kendaraan.lokasi_garasi?.kota }}</span>
          </div>
          <div class="flex items-center space-x-2 text-gray-600 mb-2">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
            </svg>
            <span>{{ kendaraan.tahun_produksi }}</span>
          </div>
          <div class="flex items-center space-x-2 text-gray-600 mb-2">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            <span>{{ kendaraan.kapasitas_kursi }} Kursi</span>
          </div>
          <div class="flex items-center space-x-2 text-gray-600 mb-4">
            <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{{ kendaraan.jenis_transmisi }}</span>
          </div>
          <div class="w-full flex justify-center">
            <div class="w-full max-w-72 border-2 border-green-600 text-green-600 font-light py-2 rounded-sm transition flex justify-center">
              <p class="text-green-600 font-bold text-lg">Rp {{ formatHarga(kendaraan.harga_sewa_per_periode) }}/Hari</p>
            </div>
          </div>
        </template>
      </div>

      <div class="w-2/3 p-6 bg-gray-50">
        <div class="flex items-center mb-4">
          <h1 class="text-2xl font-bold text-gray-800 leading-none">Pesan Kendaraan</h1>
          <div class="flex-1 h-[2px] bg-gray-300 ml-3"></div>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-2 bg-gray-300 p-2">Informasi Kontak</h3>

          <div class="mb-4 flex items-center">
            <label class="w-1/3 text-gray-600 font-medium">Nama</label>
            <input
              type="text"
              v-model="nama"
              class="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            />
          </div>

          <div class="mb-4 flex items-center">
            <label class="w-1/3 text-gray-600 font-medium">No. Handphone</label>
            <input
              type="text"
              v-model="no_handphone"
              class="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            />
          </div>

          <div class="mb-4 flex items-center">
            <label class="w-1/3 text-gray-600 font-medium">Email</label>
            <div class="w-2/3">
              <input
                type="email"
                v-model="email"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              />
              <p class="text-xs text-gray-500 mt-1">
                Email yang Anda masukkan akan digunakan untuk mengirimkan soft file.
              </p>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-2 bg-gray-300 p-2">Detail Penyewaan</h3>

          <div class="mb-4 flex items-center">
            <label class="w-1/3 text-gray-600 font-medium">Tanggal Mulai</label>
            <input
              type="date"
              v-model="tanggal_mulai"
              class="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            />
          </div>

          <div class="mb-4 flex items-center">
            <label class="w-1/3 text-gray-600 font-medium">Durasi</label>
            <input
              type="number"
              v-model="durasi"
              min="1"
              class="w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
            />
          </div>
        </div>

        <div class="flex flex-1 justify-end">
          <button
            @click="submitPemesanan"
            class="w-56 font-semibold border border-green-600 hover:bg-green-700 text-green-600 py-2 rounded-sm transition"
          >
            Konfirmasi Pemesanan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../plugins/axios';
import { useAuthStore } from '@/stores/auth';

export default {
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
    };
  },
  methods: {
    async fetchKendaraan() {
      try {
        const response = await api.get(`/kendaraan/${this.$route.params.id}`);
        this.kendaraan = response.data;
      } catch (error) {
        console.error('Gagal mengambil data kendaraan:', error);
      }
    },
    async fetchUserData() {
      this.loading = true;
      try {
        const response = await api.get('/me');
        const user = response.data;
        this.nama = user.nama_lengkap || '';
        this.email = user.email || '';
        this.no_handphone = user.no_handphone || '';
      } catch (error) {
        console.error('Gagal mengambil data pengguna:', error);
      } finally {
        this.loading = false;
      }
    },
    async submitPemesanan() {
      let loader = this.$loading.show({
        isFullPage: true,
      });

      try {
        await api.post('/pemesanan', {
            kendaraan_id: this.kendaraan.id,
            tanggal_mulai: this.tanggal_mulai,
            durasi: this.durasi,
            nama: this.nama,
            no_handphone: this.no_handphone,
            email: this.email,
        });

        this.$toast.success('Pemesanan berhasil!');
        this.$router.push('/riwayat-pemesanan');
      } catch (error) {
        console.error('Gagal melakukan pemesanan:', error);
        this.$toast.error('Terjadi kesalahan saat memproses pemesanan.');
      } finally {
        loader.hide();
      }
    },
    formatHarga(harga) {
      return new Intl.NumberFormat('id-ID').format(harga);
    },
  },
  mounted() {
    this.fetchKendaraan();
    this.fetchUserData();
  },
};
</script>