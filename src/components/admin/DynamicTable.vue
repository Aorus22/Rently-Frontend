<template>
  <div class="p-12">
    <h1 class="text-2xl font-bold">{{ tableConfig?.title }}</h1>

    <div class="mt-5 flex items-center justify-between mb-4">
      <Button v-if="tableConfig?.can_create" @click="openModal(null)" class="flex items-center gap-2">
        <Plus class="w-5 h-5" /> Create New
      </Button>

      <Button v-if="tableConfig?.can_export" class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center gap-2" @click="exportExcel">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>Export</span>
      </Button>
    </div>
    <div v-if="loading" class="flex items-center text-gray-500">
      <LoaderCircle class="animate-spin w-5 h-5 mr-2" /> Loading...
    </div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>

    <template v-else>
      <div v-if="formattedData.length" class="overflow-auto rounded-lg border shadow-sm">
        <Table class="w-full">
          <TableHeader>
            <TableRow class="bg-slate-800 text-muted-foreground">
              <TableHead v-for="(label, column) in tableConfig?.visible_columns" :key="column" class="text-white px-4 py-3 text-left">
                {{ label }}
              </TableHead>
              <TableHead class="px-4 py-3 text-center text-white">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="row in formattedData" :key="row.id" class="hover:bg-accent">
              <TableCell v-for="(label, column) in tableConfig?.visible_columns" :key="column" class="px-4 py-3">
                <template v-if="tableConfig?.special_view?.[column] === 'image'">
                  <img :src="row[column]" alt="Image" class="w-16 h-16 rounded-lg shadow-sm border" />
                </template>
                <template v-else-if="tableConfig?.special_view?.[column] === 'url'">
                  <Button variant="link" as="a" :href="row[column]" target="_blank">View</Button>
                </template>
                <template v-else>
                  {{ row?.[column] }}
                </template>
              </TableCell>
              <TableCell class="px-4 py-3 flex justify-center gap-2">
                <Button v-if="tableConfig?.detail_view" variant="outline" size="icon" @click="openDetail(row)">
                  <Eye class="w-5 h-5" />
                </Button>
                <Button v-if="tableConfig?.can_update" variant="ghost" size="icon" @click="openModal(row)">
                  <Pencil class="w-5 h-5 text-yellow-500" />
                </Button>
                <Button v-if="tableConfig?.can_delete" variant="destructive" size="icon" @click="deleteItem(row.id)">
                  <Trash class="w-5 h-5" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div v-else class="flex flex-col items-center justify-center p-6 bg-gray-100 rounded-lg shadow">
        <p class="text-gray-500 text-lg font-medium">Tidak ada data tersedia.</p>
      </div>
    </template>

    <CrudModal v-if="showModal" :table="table" :config="tableConfig" :editData="editData" @close="showModal = false" @refresh="fetchData" />
    <DetailModal v-if="showDetail" :data="detailData" :config="tableConfig" @close="showDetail = false" />
  </div>
</template>

<script setup>
import { ref, watchEffect, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/plugins/axios";
import CrudModal from "./CrudModal.vue";
import DetailModal from "./DetailModal.vue";

import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LoaderCircle, Plus, Eye, Pencil, Trash } from "lucide-vue-next";

const route = useRoute();
const router = useRouter();
const table = ref(route.params.table);
const tableConfig = ref(null);
const data = ref([]);
const foreignData = ref({});
const loading = ref(false);
const error = ref(null);
const showModal = ref(false);
const editData = ref(null);
const showDetail = ref(false);
const detailData = ref(null);

const resetState = () => {
  tableConfig.value = null;
  data.value = [];
  foreignData.value = {};
  loading.value = false;
  error.value = null;
  showModal.value = false;
  editData.value = null;
  showDetail.value = false;
  detailData.value = null;
};

const fetchConfig = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await api.get("/admin/infotabeldong");
    tableConfig.value = response.data[table.value] || null;
  } catch (err) {
    console.error(err);
    error.value = "Failed to load table config";
  } finally {
    loading.value = false;
  }
};

const fetchData = async () => {
  try {
    loading.value = true;
    error.value = null;
    data.value = [];
    foreignData.value = {};

    const response = await api.get(`/admin/${table.value}`);
    data.value = response.data;

    await fetchForeignKeys();
  } catch (err) {
    console.error(err);
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
      console.error(err);
      console.error(`Failed to fetch foreign key data for ${column}`);
    }
  }
};

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
  if (tableConfig.value.title == "Kendaraan") {
    router.push(`/admin/Kendaraan/${row.id}`);
  } else {
    detailData.value = row;
    showDetail.value = true;
  }
};

const deleteItem = async (id) => {
  if (!confirm("Are you sure?")) return;
  try {
    await api.delete(`/admin/${table.value}/${id}`);
    fetchData();
  } catch (err) {
    console.error(err);
    alert("Failed to delete item");
  }
};

const exportExcel = async () => {
  try {
    const response = await api.get(`/admin/export/${table.value}`, { responseType: "blob" });
    console.log("Response Data:", response.data); // Log response data
    // Create download link
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${table.value}.xlsx`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    } catch (error) {
    console.error("Export failed", error);
    }
};

watchEffect(() => {
  table.value = route.params.table;
  resetState();
  fetchConfig();
  fetchData();
});
</script>
