import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/LoginView.vue';
import Register from '../views/RegisterView.vue';
import Dashboard from '../views/DashboardView.vue';
import ListKendaraan from '../views/ListKendaraanView.vue';
import DetailKendaraan from '../views/DetailKendaraanView.vue';
import Pemesanan from '../views/PemesananView.vue';
import RiwayatPemesanan from '../views/RiwayatPemesananView.vue';
import DetailPemesanan from '@/views/DetailPemesananView.vue';

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
  {
    path: "/detail-pemesanan/:id/bayar",
    name: "Pembayaran",
    component: () => import("../views/PembayaranView.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
