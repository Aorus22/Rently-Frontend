import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import Dashboard from '../views/DashboardView.vue';
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
import KendaraanTable from '../views/Admin/KendaraanTable.vue';
import AdminLogin from '../views/Admin/LoginView.vue';
import PelangganTable from '../views/Admin/ListPelanggan.vue';
import RiwayatSewa from '../views/Admin/RiwayatSewaTable.vue';

const routes = [
  { path: '/', component: Dashboard },
  { path: '/kendaraan', component: ListKendaraan },
  { path: '/kendaraan/:id', component: DetailKendaraan },
  { path: '/kendaraan/:id/pesan', component: Pemesanan },
  // { path: '/pemesanan/:id', component: Pemesanan },
  { path: '/login', component: Login, meta: { hideHeader: true },  },
  { path: '/register', component: Register, meta: { hideHeader: true }, },
  { path: '/riwayat-pemesanan', component: RiwayatPemesanan },
  { path: '/detail-pemesanan/:id', component: DetailPemesanan },
  { path: "/detail-pemesanan/:id/bayar", component: Pembayaran, props: true },
  { path: '/detail-pembayaran/:id', component: DetailPembayaran, props: true },

   // Admin Routes
   {
    path: "/admin",
    component: AdminLayout,
    children: [
      { path: "", redirect: "/admin/dashboard" },
      { path: "dashboard", component: AdminHome },
      { path: "manage_kendaraan", component: KendaraanTable },
      { path: "manage_pelanggan", component: PelangganTable },
      { path: "manage_riwayat_sewa", component: RiwayatSewa }
    ],
    meta: { requiresAuth: true },
  },

  { path: "/admin/login", component: AdminLogin, meta: { hideHeader: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Check if logged in
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('admin_access_token');

  if (to.path === "/admin/login" && isAuthenticated) {
    next("/admin");
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next("/admin/login");
  } else {
    next();
  }
});

export default router
