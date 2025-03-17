<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">{{ tableConfig?.title }}</h1>

    <button
      v-if="tableConfig?.can_create"
      @click="openModal(null)"
      class="mb-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      ➕ Create New
    </button>

    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <table v-else class="w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th v-for="(label, column) in tableConfig?.visible_columns" :key="column" class="border p-2">
            {{ label }}
          </th>
          <th class="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in formattedData" :key="row.id" class="border">
          <td v-for="(label, column) in tableConfig?.visible_columns" :key="column" class="border p-2">
            {{ row?.[column] }}
          </td>
          <td class="border p-2">
            <button v-if="tableConfig?.detail_view" @click="openDetail(row)" class="text-blue-500 mr-2">🔍 View</button>
            <button v-if="tableConfig?.can_update" @click="openModal(row)" class="text-yellow-500 mr-2">✏️ Edit</button>
            <button v-if="tableConfig?.can_delete" @click="deleteItem(row.id)" class="text-red-500">🗑️ Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <CrudModal v-if="showModal" :table="table" :config="tableConfig" :editData="editData" @close="showModal = false" @refresh="fetchData" />

    <DetailModal
      v-if="showDetail"
      :data="detailData"
      @close="showDetail = false"
    />

  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import api from "@/plugins/axios";
import CrudModal from "../Admin/CrudModal.vue";
import DetailModal from "../Admin/DetailModal.vue";

const route = useRoute();
const table = ref(route.params.table);
const tableConfig = ref(null);
const data = ref([]);
const foreignData = ref({});
const loading = ref(true);
const error = ref(null);
const showModal = ref(false);
const editData = ref(null);
const showDetail = ref(false);
const detailData = ref(null);

const fetchConfig = async () => {
  try {
    const response = await api.get("/admin/infotabeldong");
    tableConfig.value = response.data[table.value];
  } catch (err) {
    error.value = "Failed to load table config";
  }
};

const fetchData = async () => {
  try {
    const response = await api.get(`/admin/${table.value}`);
    data.value = response.data;
    await fetchForeignKeys();
  } catch (err) {
    error.value = "Failed to load data";
  } finally {
    loading.value = false;
  }
};

const fetchForeignKeys = async () => {
  if (!tableConfig.value?.foreign_key) return;

  for (const [column, config] of Object.entries(tableConfig.value.foreign_key)) {
    try {
      const response = await api.get(`/admin/${config.table}`);
      foreignData.value[column] = response.data.reduce((acc, item) => {
        acc[item[config.id]] = item[config.label];
        return acc;
      }, {});
    } catch (err) {
      console.error(`Failed to fetch foreign key data for ${column}`);
    }
  }
};

// Format foreign keys before rendering
const formattedData = computed(() => {
  return data.value.map((row) => {
    const newRow = { ...row };
    for (const column in foreignData.value) {
      if (newRow[column] !== undefined) {
        newRow[column] = foreignData.value[column][newRow[column]] || newRow[column];
      }
    }
    return newRow;
  });
});

const openModal = (row) => {
  editData.value = row;
  showModal.value = true;
};

const openDetail = (row) => {
  detailData.value = row;
  showDetail.value = true;
};

const deleteItem = async (id) => {
  if (!confirm("Are you sure?")) return;
  try {
    await api.delete(`/admin/${table.value}/${id}`);
    fetchData();
  } catch (err) {
    alert("Failed to delete item");
  }
};

onMounted(() => {
  fetchConfig();
  fetchData();
});

watch(() => route.params.table, (newTable) => {
  table.value = newTable;
  fetchConfig();
  fetchData();
});

</script>
