<template>
  <aside class="w-64 bg-gray-900 text-white p-6 flex flex-col fixed inset-y-0 left-0 h-screen">
    <h2 class="text-xl font-bold mb-6">Admin Panel</h2>

    <div v-if="loading" class="text-gray-400">Loading...</div>
    <div v-else-if="error" class="text-red-400">{{ error }}</div>

    <nav v-else class="flex-1 space-y-2">

      <router-link
      v-for="item in sidebarNav"
      :key="item.path"
      :to="item.path"
        class="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-800 transition"
        >
        <component :is="item.icon" class="w-5 h-5" /> {{ item.label }}
      </router-link>

      <!-- <router-link to="/admin/dashboard" class="flex items-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-800 transition">
        <HomeIcon class="w-5 h-5" /> Dashboard
      </router-link>
      <router-link
        v-for="(config, table) in tables"
        :key="table"
        :to="'/admin/' + table"
        class="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        <TableIcon class="w-5 h-5" /> {{ config.title }}
      </router-link> -->
    </nav>

    <Button variant="destructive" class="mt-auto w-full" @click="logout">
      <Lock class="w-5 h-5 mr-2" /> Logout
    </Button>
  </aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAdminAuthStore } from "@/stores/authAdmin";
// import api from "@/plugins/axios";

import {
  Home, Lock, Table, MapPin, Car, ClipboardList,
  CreditCard, FileText, Truck
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";

// const tables = ref({});
const loading = ref(true);
const error = ref(null);
const router = useRouter();
const adminAuth = useAdminAuthStore();

const sidebarNav = [
  { path: "/admin/dashboard", label: "Dashboard", icon: Home },
  { path: "/admin/User", label: "User", icon: Table },
  { path: "/admin/LokasiGarasi", label: "Lokasi Garasi", icon: MapPin },
  { path: "/admin/Kendaraan", label: "Kendaraan", icon: Car },
  { path: "/admin/Pemesanan", label: "Pemesanan", icon: ClipboardList },
  { path: "/admin/Pembayaran", label: "Pembayaran", icon: CreditCard },
  { path: "/admin/KontrakSewa", label: "Kontrak Sewa", icon: FileText },
  { path: "/admin/PelacakanKendaraan", label: "Pelacakan Kendaraan", icon: Truck },
  { path: "/admin/PerawatanKendaraan", label: "Perawatan Kendaraan", icon: Car },
];

// const fetchTables = async () => {
//   try {
//     const response = await api.get("/admin/infotabeldong");
//     tables.value = response.data;
//   } catch (err) {
//     console.error(err);
//     error.value = "Failed to load tables";
//   } finally {
//     loading.value = false;
//   }
// };

const logout = () => {
  adminAuth.logoutAdmin();
  router.push("/admin/login");
};

onMounted(async () => {
  // await fetchTables();
  const access_token = localStorage.getItem("admin_access_token");
  if (access_token) {
    loading.value = false;
  }
});
</script>
