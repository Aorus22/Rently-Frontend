import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth';
import { useAdminAuthStore } from '@/stores/authAdmin';

import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import Dashboard from '../views/DashboardView.vue';
import Home from '../views/HomeView.vue';
import ListKendaraan from '../views/ListKendaraanView.vue';
import DetailKendaraan from '../views/DetailKendaraanView.vue';
import Pemesanan from '../views/PemesananView.vue';
import RiwayatPemesanan from '../views/RiwayatPemesananView.vue';
import DetailPemesanan from '@/views/DetailPemesananView.vue';
import Pembayaran from '../views/PembayaranView.vue';
import DetailPembayaran from '@/views/DetailPembayaranView.vue';

// Import Admin Views
import AdminLayout from '../components/AdminLayout.vue';
import AdminHome from '../views/Admin/Dashboard.vue';
import AdminLogin from '../views/Admin/LoginView.vue';
import DynamicCrud from '../views/Admin/DynamicCrud.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/home', component: Home },
  { path: '/kendaraan', component: ListKendaraan },
  { path: '/kendaraan/:id', component: DetailKendaraan },
  { path: '/kendaraan/:id/pesan', component: Pemesanan, meta: { requiresAuth: true } },

  { path: '/login', component: Login, meta: { hideHeader: true },  },
  { path: '/register', component: Register, meta: { hideHeader: true }, },

  { path: '/riwayat-pemesanan', component: RiwayatPemesanan, meta: { requiresAuth: true } },
  { path: '/detail-pemesanan/:id', component: DetailPemesanan, meta: { requiresAuth: true } },
  { path: "/detail-pemesanan/:id/bayar", component: Pembayaran, props: true, meta: { requiresAuth: true } },
  { path: '/detail-pembayaran/:id', component: DetailPembayaran, props: true, meta: { requiresAuth: true } },

   // Admin Routes
  {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", redirect: "/admin/dashboard" },
      { path: "dashboard", component: AdminHome },
      { path: ':table', component: DynamicCrud, props: true }
    ],
    meta: { requiresAdminAuth: true },
  },

  { path: "/admin/login", component: AdminLogin, meta: { hideHeader: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Check if logged in
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const adminAuthStore = useAdminAuthStore();
  const isUserAuthenticated = !!authStore.user || !!localStorage.getItem('access_token');
  const isAdminAuthenticated = !!adminAuthStore.user || !!localStorage.getItem('admin_access_token');

  // Admin Authentication Check
  if (to.path.startsWith("/admin")) {
    if (to.path != "/admin/login" && !isAdminAuthenticated) {
      return next("/admin/login);
    }

    if (to.path === "/admin/login" && isAdminAuthenticated) {
      return next("/admin")
    }
    return next();
  }

  // user Authentication Check
  if (to.meta.requiresAuth && !isUserAuthenticated) {
    return next({ path: "/login", query: { redirect: to.fullPath } });
  }

  if (!authStore.user && localStorage.getItem('access_token')) {
    try {
      await authStore.checkAuth(localStorage.getItem('access_token'));
    } catch (error) {
      console.error("Autentikasi gagal:", error);
      return next({ path: "/login", query: { redirect: to.fullPath } });
    }
  }

  next();
});

export default router
