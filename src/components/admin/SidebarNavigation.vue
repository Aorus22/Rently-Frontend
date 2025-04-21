<template>
  <!-- Desktop Sidebar -->
  <aside class="z-10 hidden md:flex w-64 bg-gray-900 text-white p-6 flex-col fixed inset-y-0 left-0 h-screen">
    <h2 class="text-xl font-bold mb-6">Admin Panel</h2>

    <div v-if="loading" class="text-gray-400">Loading...</div>
    <div v-else-if="error" class="text-red-400">{{ error }}</div>

    <nav v-else class="flex-1 space-y-2">
      <router-link
        v-for="item in sidebarNav"
        :key="item.path"
        :to="item.path"
        class="flex items-center gap-2 py-2 px-4 rounded-lg transition"
        :class="isActive(item.path) ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'"
      >
        <component :is="item.icon" class="w-5 h-5" /> {{ item.label }}
      </router-link>
    </nav>

    <Button variant="destructive" class="mt-auto w-full" @click="logout">
      <Lock class="w-5 h-5 mr-2" /> Logout
    </Button>
  </aside>

  <!-- Mobile Menu Button -->
  <div class="md:hidden fixed top-4 left-4 z-50">
    <Button variant="default" size="icon" @click="isMobileMenuOpen = true" class="bg-gray-900 hover:bg-gray-800">
      <MenuIcon class="w-5 h-5 text-white" />
      <span class="sr-only">Open admin menu</span>
    </Button>
  </div>

  <!-- Mobile Menu (Sheet) -->
  <Sheet v-model:open="isMobileMenuOpen">
    <SheetContent side="left" class="w-[300px] bg-gray-900 text-white">
      <SheetHeader>
        <SheetTitle class="text-white">Admin Panel</SheetTitle>
      </SheetHeader>

      <div v-if="loading" class="text-gray-400 mt-4">Loading...</div>
      <div v-else-if="error" class="text-red-400 mt-4">{{ error }}</div>

      <div v-else class="space-y-4 py-4">
        <router-link
          v-for="item in sidebarNav"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-2 py-2 px-4 rounded-lg transition"
          :class="isActive(item.path) ? 'bg-gray-700 text-white' : 'hover:bg-gray-800'"
          @click="isMobileMenuOpen = false"
        >
          <component :is="item.icon" class="w-5 h-5" /> {{ item.label }}
        </router-link>
      </div>

      <div class="mt-auto pt-6">
        <Button variant="destructive" class="w-full" @click="logout">
          <Lock class="w-5 h-5 mr-2" /> Logout
        </Button>
      </div>
    </SheetContent>
  </Sheet>
</template>

<script setup>
import { ref, onMounted, computed, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAdminAuthStore } from "@/stores/authAdmin";

import {
  Home, Lock, Table, MapPin, Car, ClipboardList,
  CreditCard, FileText, Truck, Menu as MenuIcon
} from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const { appContext } = getCurrentInstance();
const $loading = appContext.config.globalProperties.$loading;

const loading = ref(true);
const error = ref(null);
const router = useRouter();
const route = useRoute();
const adminAuth = useAdminAuthStore();
const isMobileMenuOpen = ref(false);

const sidebarNav = [
  { path: "/admin/dashboard", label: "Dashboard", icon: Home },
  { path: "/admin/User", label: "User", icon: Table },
  { path: "/admin/LokasiGarasi", label: "Lokasi Garasi", icon: MapPin },
  { path: "/admin/Kendaraan", label: "Kendaraan", icon: Car },
  { path: "/admin/list-pemesanan", label: "List Pemesanan", icon: CreditCard },
  { path: "/admin/KontrakSewa", label: "Kontrak Sewa", icon: FileText },
  { path: "/admin/PelacakanKendaraan", label: "Pelacakan Kendaraan", icon: Truck },
  { path: "/admin/PerawatanKendaraan", label: "Perawatan Kendaraan", icon: Car },
];

const isActive = (path) => {
  return route.path === path || route.path.startsWith(`${path}/`);
};

const logout = () => {
  adminAuth.logoutAdmin();
  router.push("/admin/login");
};

onMounted(async () => {
  const access_token = localStorage.getItem("admin_access_token");
  if (access_token) {
    const loader = $loading.show({
      isFullPage: true,
    });
    await adminAuth.checkAuth(access_token);
    loader.hide();
    loading.value = false;
  }
});
</script>
