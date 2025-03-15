<template>
  <div class="p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4">Kendaraan List</h2>

    <!-- Add Button -->
    <button class="bg-blue-500 text-white px-4 py-2 rounded mb-4" @click="openModal()">Tambah Kendaraan</button>

    <!-- Kendaraan Table -->
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border p-2">Gambar</th>
          <th class="border p-2">Merek & Model</th>
          <th class="border p-2">Transmisi</th>
          <th class="border p-2">Nomor Polisi</th>
          <th class="border p-2">Harga</th>
          <th class="border p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="kendaraan in kendaraanList" :key="kendaraan.id">
          <td class="border p-2">
            <img :src="kendaraan.gambar_url" alt="Gambar Kendaraan" class="w-16 h-16">
          </td>
          <td class="border p-2">{{ kendaraan.merek_model }}</td>
          <td class="border p-2">{{ kendaraan.jenis_transmisi }}</td>
          <td class="border p-2">{{ kendaraan.nomor_polisi }}</td>
          <td class="border p-2">Rp {{ kendaraan.harga_sewa_per_periode }}</td>
          <td class="border p-2">
            <button class="bg-green-500 text-white px-2 py-1 rounded mr-2" @click="openModal(kendaraan)">Edit</button>
            <button class="bg-red-500 text-white px-2 py-1 rounded" @click="deleteKendaraan(kendaraan.id)">Hapus</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="modalVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-xl font-bold mb-4">{{ isEditing ? "Edit Kendaraan" : "Tambah Kendaraan" }}</h3>

        <!-- Dynamic Form -->
        <div v-for="field in formFields" :key="field.key" class="mb-3">
          <label class="block text-sm font-semibold">{{ field.label }}</label>

          <input
            v-if="field.type === 'text' || field.type === 'number'"
            :type="field.type"
            v-model="kendaraanData[field.key]"
            class="w-full p-2 border rounded"
          />

          <select
            v-if="field.type === 'select'"
            v-model="kendaraanData[field.key]"
            class="w-full p-2 border rounded"
          >
            <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
          </select>

          <p v-if="errors[field.key]" class="text-red-500 text-sm">{{ errors[field.key][0] }}</p>
        </div>

        <div class="flex justify-end mt-4">
          <button class="bg-gray-500 text-white px-4 py-2 rounded mr-2" @click="closeModal">Batal</button>
          <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="saveKendaraan">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";

// Data
const kendaraanList = ref([]);
const modalVisible = ref(false);
const isEditing = ref(false);
const kendaraanData = ref({});
const errors = ref({});

// Define fields dynamically
const formFields = [
  { key: "gambar_url", label: "Gambar URL", type: "text" },
  { key: "kategori_kendaraan", label: "Kategori Kendaraan", type: "select", options: ["Mobil", "Minibus", "Pickup"] },
  { key: "merek_model", label: "Merek & Model", type: "text" },
  { key: "kapasitas_kursi", label: "Kapasitas Kursi", type: "number" },
  { key: "jenis_transmisi", label: "Jenis Transmisi", type: "select", options: ["Manual", "Automatic"] },
  { key: "tahun_produksi", label: "Tahun Produksi", type: "number" },
  { key: "nomor_polisi", label: "Nomor Polisi", type: "text" },
  { key: "status_ketersediaan", label: "Status Ketersediaan", type: "select", options: ["Tersedia", "Disewa", "Perawatan"] },
  { key: "harga_sewa_per_periode", label: "Harga Sewa", type: "number" },
  { key: "kondisi_fasilitas", label: "Kondisi Fasilitas", type: "text" },
  { key: "lokasi_kendaraan", label: "Lokasi Kendaraan", type: "text" },
];

// Fetch all kendaraan
const fetchKendaraan = async () => {
  try {
    const response = await api.get("/kendaraan");
    kendaraanList.value = response.data;
  } catch (error) {
    console.error("Error fetching kendaraan:", error);
  }
};

// Open modal (Add/Edit)
const openModal = (kendaraan = null) => {
  if (kendaraan) {
    kendaraanData.value = { ...kendaraan };
    isEditing.value = true;
  } else {
    kendaraanData.value = Object.fromEntries(formFields.map((field) => [field.key, ""]));
    isEditing.value = false;
  }
  modalVisible.value = true;
  errors.value = {};
};

// Close modal
const closeModal = () => {
  modalVisible.value = false;
};

// Add or update kendaraan
const saveKendaraan = async () => {
  try {
    if (isEditing.value) {
      await api.put(`/kendaraan/${kendaraanData.value.id}`, kendaraanData.value);
    } else {
      await api.post("/kendaraan", kendaraanData.value);
    }
    closeModal();
    fetchKendaraan(); // Refresh table data
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error saving kendaraan:", error);
    }
  }
};

// Delete kendaraan
const deleteKendaraan = async (id) => {
  if (confirm("Are you sure you want to delete this kendaraan?")) {
    try {
      await api.delete(`/kendaraan/${id}`);
      fetchKendaraan();
    } catch (error) {
      console.error("Error deleting kendaraan:", error);
    }
  }
};

// Load data on mount
onMounted(fetchKendaraan);
</script>
