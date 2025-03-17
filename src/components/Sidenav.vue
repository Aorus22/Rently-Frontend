<template>
  <aside class="w-64 bg-gray-800 text-white p-6 flex flex-col h-screen">
    <h2 class="text-xl font-bold mb-6">Admin Panel</h2>

    <div v-if="loading" class="text-gray-400">Loading...</div>
    <div v-else-if="error" class="text-red-400">{{ error }}</div>
    <nav v-else class="flex-1">
      <router-link to="/admin/dashboard" class="block py-2 px-4 hover:bg-gray-700 rounded">
         Dashboard
      </router-link>
      <router-link
        v-for="(config, table) in tables"
        :key="table"
        :to="'/admin/' + table"
        class="block px-4 py-2 rounded hover:bg-gray-700"
      >
        {{ config.title }}
      </router-link>
    </nav>

    <button @click="logout" class="mt-auto bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
      🔒 Logout
    </button>
  </aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import api from "@/plugins/axios";

const tables = ref({});
const loading = ref(true);
const error = ref(null);
const router = useRouter();

const fetchTables = async () => {
  try {
    const response = await api.get("/admin/infotabeldong");
    tables.value = response.data;
  } catch (err) {
    error.value = "Failed to load tables";
  } finally {
    loading.value = false;
  }
};

const logout = () => {
  localStorage.removeItem("admin_access_token");
  localStorage.removeItem("admin_token_type");
  localStorage.removeItem("admin");

  router.push("/admin/login");
};
onMounted(fetchTables);
</script>
