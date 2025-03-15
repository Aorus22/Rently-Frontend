<template>
  <div class="p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4">List Pelanggan</h2>

    <!-- Pelanggan Table -->
    <table class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border p-2">Nama Lengkap</th>
          <th class="border p-2">Email</th>
          <th class="border p-2">Status Blokir</th>
          <th class="border p-2">Aksi</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="Pelanggan in pelangganList" :key="Pelanggan.id">
          <td class="border p-2">{{ Pelanggan.nama_lengkap }}</td>
          <td class="border p-2">{{ Pelanggan.email }}</td>
          <td class="border p-2">{{ Pelanggan.status_blokir }}</td>
          <td class="border p-2">
            <button class="bg-green-500 text-white px-2 py-1 rounded mr-2" @click="openModal(Pelanggan)">Update Status</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div v-if="modalVisible" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 class="text-xl font-bold mb-4">{{ "Edit Pelanggan" }}</h3>

        <!-- Dynamic Form -->
        <div v-for="field in formFields" :key="field.key" class="mb-3">
          <label class="block text-sm font-semibold">{{ field.label }}</label>

          <input
            v-if="field.type === 'text' || field.type === 'number'"
            :type="field.type"
            v-model="pelangganData[field.key]"
            class="w-full p-2 border rounded"
          />

          <span v-if="field.type === 'uneditedtext'" class="p-2 bg-gray-100 rounded block">
            {{ pelangganData[field.key] }}
          </span>

          <select
            v-if="field.type === 'select'"
            v-model="pelangganData[field.key]"
            @change="updateStatusBlokir"
            class="w-full p-2 border rounded"
          >
            <option v-for="option in field.options" :key="option" :value="option">
              {{ option }}
            </option>
          </select>


          <p v-if="errors[field.key]" class="text-red-500 text-sm">{{ errors[field.key][0] }}</p>
        </div>

        <div class="flex justify-end mt-4">
          <button class="bg-gray-500 text-white px-4 py-2 rounded mr-2" @click="closeModal">Batal</button>
          <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="savePelanggan">Simpan</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import api from "@/plugins/axios";

const pelangganList = ref([]);
const modalVisible = ref(false);
const pelangganData = ref({});
const errors = ref({});

const formFields = [
  { key: "nama_lengkap", label: "Nama Lengkap", type: "uneditedtext"},
  { key: "email", label: "Email", type: "uneditedtext"},
  { key: "status_blokir", label: "Status Blokir", type: "select", options: ["Ya", "Tidak"] },
];

const fetchAll = async () => {
  try {
    const access_token = localStorage.getItem('admin_access_token');

    if (!access_token) {
      console.error("No access token found!");
      return;
    }

    const userResponse = await api.get("/admin/getusers", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    pelangganList.value = userResponse.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const openModal = (Pelanggan) => {
  pelangganData.value = { ...Pelanggan };

  modalVisible.value = true;
  errors.value = {};
};

const closeModal = () => {
  modalVisible.value = false;
};

const savePelanggan = async () => {
  try {
    await api.put(`/admin/user/${pelangganData.value.id}`, {
      status_blokir: pelangganData.value.status_blokir
    });

    closeModal();
    fetchAll();
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      console.error("Error update user:", error);
    }
  }
};

onMounted(fetchAll);
</script>
