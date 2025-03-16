<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" @click="closeModal">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96" @click.stop>
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-2 mb-4">
        <h2 class="text-lg font-semibold">Detail Kendaraan</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">&times;</button>
      </div>

      <!-- Modal Content -->
      <div v-if="kendaraan">
        <img :src="kendaraan.gambar_url" alt="Gambar Kendaraan" class="w-full h-40 object-cover rounded mb-4">

        <div class="space-y-2">
          <p><strong>Kategori:</strong> {{ kendaraan.kategori_kendaraan }}</p>
          <p><strong>Merek & Model:</strong> {{ kendaraan.merek_model }}</p>
          <p><strong>Kapasitas Kursi:</strong> {{ kendaraan.kapasitas_kursi }}</p>
          <p><strong>Transmisi:</strong> {{ kendaraan.jenis_transmisi }}</p>
          <p><strong>Tahun Produksi:</strong> {{ kendaraan.tahun_produksi }}</p>
          <p><strong>Nomor Polisi:</strong> {{ kendaraan.nomor_polisi }}</p>
          <p><strong>Status:</strong> {{ kendaraan.status_ketersediaan }}</p>
          <p><strong>Harga Sewa:</strong> Rp{{ kendaraan.harga_sewa_per_periode.toLocaleString() }}</p>
          <p><strong>Fasilitas:</strong> {{ kendaraan.kondisi_fasilitas }}</p>
          <p><strong>Lokasi:</strong> {{ kendaraan.lokasi_garasi.kota }}</p>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-4 text-right">
        <button @click="closeModal" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Tutup</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const isOpen = ref(false);
const kendaraan = ref(null);

const openDetailModal = (data) => {
  kendaraan.value = data;
  isOpen.value = true;
};

const closeModal = () => {
  isOpen.value = false;
  kendaraan.value = null;
};

defineExpose({ openDetailModal });
</script>
