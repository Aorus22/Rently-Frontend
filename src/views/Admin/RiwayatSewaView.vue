<template>
  <div class="p-4">
    <h2 class="text-xl font-bold mb-4">Daftar Pemesanan</h2>

    <!-- Table -->
    <div class="overflow-x-auto bg-white shadow rounded-lg">
      <table class="w-full border-collapse">
        <thead class="bg-gray-200">
          <tr class="text-left">
            <th class="p-3 border">User</th>
            <th class="p-3 border">Kendaraan</th>
            <th class="p-3 border">Tanggal Mulai</th>
            <th class="p-3 border">Tanggal Selesai</th>
            <th class="p-3 border">Status</th>
            <th class="p-3 border">Aksi</th>
          </tr>
        </thead>

        <!-- Filters below table header -->
        <tbody class="bg-gray-100">
          <tr>
            <td class="p-2 border">
              <input
                v-model="searchUser"
                type="text"
                placeholder="Cari User..."
                class="p-2 border rounded w-full"
              />
            </td>
            <td class="p-2 border">
              <input
                v-model="searchKendaraan"
                type="text"
                placeholder="Cari Kendaraan..."
                class="p-2 border rounded w-full"
              />
            </td>
            <td class="p-2 border">
              <input v-model="startDate" type="date" class="p-2 border rounded w-full" />
            </td>
            <td class="p-2 border">
              <input v-model="endDate" type="date" class="p-2 border rounded w-full" />
            </td>
            <td class="p-2 border">
              <select v-model="filterStatus" class="p-2 border rounded w-full">
                <option value="">Semua</option>
                <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
                <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
                <option value="Dikonfirmasi">Dikonfirmasi</option>
                <option value="Sedang dalam Penggunaan">Sedang dalam Penggunaan</option>
                <option value="Selesai">Selesai</option>
                <option value="Dibatalkan">Dibatalkan</option>
              </select>
            </td>
            <td></td>
          </tr>
        </tbody>

        <tbody>
          <tr v-for="pemesanan in filteredPemesanan" :key="pemesanan.id" class="hover:bg-gray-100">
            <td class="p-3 border">{{ pemesanan.user.nama_lengkap }}</td>
            <td class="p-3 border">{{ pemesanan.kendaraan.merek_model }}</td>
            <td class="p-3 border">{{ pemesanan.tanggal_mulai }}</td>
            <td class="p-3 border">{{ pemesanan.tanggal_selesai }}</td>
            <td class="p-3 border font-semibold text-center"
                :class="{
                  'text-yellow-500 bg-yellow-100': pemesanan.status_pemesanan === 'Menunggu Pembayaran',
                  'text-orange-500 bg-orange-100': pemesanan.status_pemesanan === 'Menunggu Konfirmasi',
                  'text-blue-500 bg-blue-100': pemesanan.status_pemesanan === 'Dikonfirmasi',
                  'text-green-600 bg-green-100': pemesanan.status_pemesanan === 'Sedang dalam Penggunaan',
                  'text-gray-600 bg-gray-100': pemesanan.status_pemesanan === 'Selesai',
                  'text-red-500 bg-red-100': pemesanan.status_pemesanan === 'Dibatalkan'
                }"
            >
              {{ pemesanan.status_pemesanan }}
            </td>
            <td class="p-3 border">
              <button @click="openModal(pemesanan, 'detail')" class="px-3 py-1 bg-blue-500 text-white rounded mr-2">
                Detail
              </button>
              <button @click="openModal(pemesanan, 'ubah')" class="px-3 py-1 bg-green-500 text-white rounded">
                Ubah
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 class="text-xl font-bold mb-4">
          {{ modalType === "detail" ? "Detail Pemesanan" : "Ubah Status Pemesanan" }}
        </h2>

        <!-- Detail View -->
        <div v-if="modalType === 'detail'">
          <p><strong>User:</strong> {{ selectedPemesanan.user.nama_lengkap }}</p>
          <p><strong>Kendaraan:</strong> {{ selectedPemesanan.kendaraan.merek_model }}</p>
          <p><strong>Tanggal Mulai:</strong> {{ selectedPemesanan.tanggal_mulai }}</p>
          <p><strong>Tanggal Selesai:</strong> {{ selectedPemesanan.tanggal_selesai }}</p>
          <p><strong>Total Harga:</strong> Rp{{ selectedPemesanan.total_harga_sewa }}</p>
          <p><strong>Status:</strong>
            <span
              class="p-2 rounded"
              :class="{
                'text-yellow-500 bg-yellow-100': selectedPemesanan.status_pemesanan === 'Menunggu Pembayaran',
                'text-orange-500 bg-orange-100': selectedPemesanan.status_pemesanan === 'Menunggu Konfirmasi',
                'text-blue-500 bg-blue-100': selectedPemesanan.status_pemesanan === 'Dikonfirmasi',
                'text-green-600 bg-green-100': selectedPemesanan.status_pemesanan === 'Sedang dalam Penggunaan',
                'text-gray-600 bg-gray-100': selectedPemesanan.status_pemesanan === 'Selesai',
                'text-red-500 bg-red-100': selectedPemesanan.status_pemesanan === 'Dibatalkan'
              }"
            >
              {{ selectedPemesanan.status_pemesanan }}
            </span>
          </p>
        </div>

        <!-- Ubah Status -->
        <div v-if="modalType === 'ubah'">
          <label class="block font-semibold mb-2">Ubah Status:</label>
          <select
            v-model="selectedPemesanan.status_pemesanan"
            class="w-full p-2 border rounded"
          >
            <option value="Menunggu Pembayaran" class="text-yellow-500">Menunggu Pembayaran</option>
            <option value="Menunggu Konfirmasi" class="text-orange-500">Menunggu Konfirmasi</option>
            <option value="Dikonfirmasi" class="text-blue-500">Dikonfirmasi</option>
            <option value="Sedang dalam Penggunaan" class="text-green-500">Sedang dalam Penggunaan</option>
            <option value="Selesai" class="text-gray-500">Selesai</option>
            <option value="Dibatalkan" class="text-red-500">Dibatalkan</option>
          </select>

          <button
            @click="updatePemesananStatus"
            class="w-full bg-green-500 text-white p-2 mt-4 rounded"
          >
            Simpan Perubahan
          </button>
        </div>

        <button @click="showModal = false" class="mt-4 w-full bg-gray-400 text-white p-2 rounded">
          Tutup
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/plugins/axios";

const pemesananList = ref([]);
const searchUser = ref("");
const searchKendaraan = ref("");
const filterStatus = ref("");
const startDate = ref("");
const endDate = ref("");

// Fetch data from API using api.get()
const fetchPemesanan = async () => {
  try {
    const response = await api.get("/admin/ceksewa");
    pemesananList.value = response.data;
  } catch (error) {
    console.error("Error fetching pemesanan:", error);
  }
};

const selectedPemesanan = ref(null);
const modalType = ref(""); // 'detail' or 'ubah'
const showModal = ref(false);

const openModal = (pemesanan, type) => {
  selectedPemesanan.value = { ...pemesanan };
  modalType.value = type;
  showModal.value = true;
};

const updatePemesananStatus = async () => {
  try {
    await api.put(`/admin/updatestatus/${selectedPemesanan.value.id}`, {
      status_pemesanan: selectedPemesanan.value.status_pemesanan,
    });
    fetchPemesanan();
    showModal.value = false;
  } catch (error) {
    console.error("Error updating pemesanan:", error);
  }
};

// Filtered list based on search inputs
const filteredPemesanan = computed(() => {
  return pemesananList.value.filter((pemesanan) => {
    const matchUser = searchUser.value
      ? pemesanan.user.nama_lengkap.toLowerCase().includes(searchUser.value.toLowerCase())
      : true;

    const matchKendaraan = searchKendaraan.value
      ? pemesanan.kendaraan.merek_model.toLowerCase().includes(searchKendaraan.value.toLowerCase())
      : true;

    const matchStatus = filterStatus.value
      ? pemesanan.status_pemesanan === filterStatus.value
      : true;

    const matchStartDate = startDate.value
      ? new Date(pemesanan.tanggal_mulai) >= new Date(startDate.value)
      : true;

    const matchEndDate = endDate.value
      ? new Date(pemesanan.tanggal_selesai) <= new Date(endDate.value)
      : true;

    return matchUser && matchKendaraan && matchStatus && matchStartDate && matchEndDate;
});
});

// Fetch data when the component is mounted
onMounted(fetchPemesanan);
</script>
