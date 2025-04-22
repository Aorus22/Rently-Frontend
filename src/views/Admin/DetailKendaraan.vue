<template>
  <div class="container mx-auto p-6 max-w-5xl">
    <!-- Header Section -->
    <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <div class="flex items-center gap-4">
        <router-link
          to="/admin/Kendaraan"
          class="flex items-center text-primary hover:underline transition-colors duration-200"
        >
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
        </router-link>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Detail Kendaraan #{{ kendaraan?.id }}
        </h1>
      </div>
      <Badge v-if="kendaraan" :variant="statusVariant(kendaraan.status_ketersediaan)" class="text-sm">
        {{ kendaraan.status_ketersediaan }}
      </Badge>
    </header>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <ArrowPathIcon class="w-8 h-8 animate-spin" />
    </div>

    <!-- Main Content -->
    <Card v-else-if="kendaraan" class="shadow-md border border-gray-100">
      <CardContent class="p-6 sm:p-8 space-y-8">
        <section>
          <div class="flex justify-center">
            <img
              :src="kendaraan.gambar_url"
              alt="Kendaraan"
              class="h-72 w-auto object-cover rounded-lg border-2 border-gray-200"
            >
          </div>
        </section>

        <section>
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Info class="w-5 h-5 text-primary" />
            Informasi Kendaraan
          </h3>
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div class="flex justify-between">
              <span class="text-muted-foreground">ID:</span>
              <span class="font-medium">{{ kendaraan.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Kategori:</span>
              <span>{{ kendaraan.kategori_kendaraan }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Merek Model:</span>
              <span>{{ kendaraan.merek_model }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Harga Sewa per Periode:</span>
              <span class="font-medium">{{ formatCurrency(kendaraan.harga_sewa_per_periode) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Kapasitas Kursi:</span>
              <span>{{ kendaraan.kapasitas_kursi }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Jenis Transmisi:</span>
              <span>{{ kendaraan.jenis_transmisi }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Tahun Produksi:</span>
              <span>{{ kendaraan.tahun_produksi }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">No. Polisi:</span>
              <span>{{ kendaraan.nomor_polisi }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Dibuat:</span>
              <span>{{ formatDateTime(kendaraan.created_at) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Diperbarui:</span>
              <span>{{ formatDateTime(kendaraan.updated_at) }}</span>
            </div>
          </div>
        </section>

        <section v-if="fasilitasList.length">
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Info class="w-5 h-5 text-primary" />
            Informasi Fasilitas Kendaraan
          </h3>
          <div class="flex flex-wrap gap-2 mt-4">
            <Badge
              v-for="(item, index) in fasilitasList"
              :key="index"
              variant="outline"
            >
              {{ item }}
            </Badge>
          </div>
        </section>

        <!-- Tabel Riwayat Pemesanan -->
        <section>
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Info class="w-5 h-5 text-primary" />
            Informasi Riwayat Pemesanan Kendaraan
          </h3>
          <Card v-if="(riwayatPemesanan?.length)" class="mt-4 space-y-4 shadow-md border border-gray-100">
            <CardContent class="p-6 sm:p-4 space-y-4 overflow-y-auto max-h-[500px]">
            <router-link
              v-for="pemesanan in riwayatPemesanan"
              :key="pemesanan.id"
              :to="{ name: 'AdminPemesananDetail', params: { id: pemesanan.id } }"
              class="border p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition cursor-pointer group block"
            >
              <div class="flex items-start gap-4">
                <div class="flex-1">
                  <div class="flex items-center justify-between mb-2">
                    <h2 class="text-lg font-medium text-gray-800">
                      Pemesanan #{{ pemesanan.id }}
                    </h2>
                    <span :class="getStatusColor(pemesanan.status_pemesanan)" class="text-sm flex items-center">
                      <component
                        :is="statusIcons[pemesanan.status_pemesanan]"
                        class="w-4 h-4 mr-1"
                      />
                      {{ pemesanan.status_pemesanan }}
                    </span>
                  </div>

                  <div class="flex items-center text-sm text-gray-500 mb-2">
                    <CalendarIcon class="w-4 h-4 mr-2 text-yellow-600" />
                    {{ formatDate(pemesanan.tanggal_mulai) }} - {{ formatDate(pemesanan.tanggal_selesai) }}
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center">
                      <span class="font-medium text-lg">
                        Total: {{ formatCurrency(pemesanan.total_harga_sewa) }}
                      </span>
                    </div>
                    <button class="hover:text-gray-700 flex items-center text-sm">
                      Detail
                      <ChevronRightIcon class="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            </router-link>
          </CardContent>
          </Card>
          <!-- Empty State -->
          <Alert v-else class="bg-background mt-4">
            <Info class="w-4 h-4" />
            <AlertTitle class="ml-2">Riwayat Kendaraan Tidak Ditemukan</AlertTitle>
            <AlertDescription class="ml-2">
              Data Riwayat Pemesanan dengan ID ini tidak tersedia.
            </AlertDescription>
          </Alert>
        </section>

        <!-- Tabel Pelacakan Kendaraan -->
        <section>
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <User class="w-5 h-5 text-primary" />
            Informasi Pelacakan Kendaraan
          </h3>
          <div v-if="(pelacakan?.length)" class="overflow-auto rounded-lg border shadow-sm mt-4">
          <!-- Table Header -->
          <Table class="w-full table-fixed">
            <TableHeader>
              <TableRow class="bg-slate-800 text-muted-foreground">
                <TableHead
                  v-for="(label, column) in tableConfigPelacakan?.visible_columns"
                  :key="column"
                  class="text-white px-4 py-3 text-left bg-slate-800 z-10"
                >
                  {{ label }}
                </TableHead>
                <TableHead class="px-4 py-3 text-center text-white bg-slate-800 z-10">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>

          <!-- Table Body (Scrollable) -->
          <div class="max-h-[500px] overflow-y-auto">
            <Table class="table-fixed">
              <TableBody>
                <TableRow v-for="row in pelacakan" :key="row.id" class="hover:bg-accent">
                  <TableCell v-for="(label, column) in tableConfigPelacakan?.visible_columns" :key="column" class="px-4 py-3">
                    <template v-if="tableConfigPelacakan?.special_view?.[column] === 'image'">
                      <img :src="row[column]" alt="Image" class="w-16 h-16 rounded-lg shadow-sm border" />
                    </template>
                    <template v-else-if="tableConfigPelacakan?.special_view?.[column] === 'url'">
                      <Button variant="link" as="a" :href="row[column]" target="_blank">View</Button>
                    </template>
                    <template v-else>
                      {{ row?.[column] }}
                    </template>
                  </TableCell>
                  <TableCell class="px-4 py-3 flex justify-center gap-2">
                    <Button v-if="tableConfigPelacakan?.detail_view" variant="outline" size="icon" @click="openDetail(row)">
                      <Eye class="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          </div>
          <!-- Empty State -->
          <Alert v-else class="bg-background mt-4">
            <Info class="w-4 h-4" />
            <AlertTitle class="ml-2">Pelacakan Tidak Ditemukan</AlertTitle>
            <AlertDescription class="ml-2">
              Data Pelacakan Kendaraan dengan ID ini tidak tersedia.
            </AlertDescription>
          </Alert>
        </section>

        <!-- Tabel Perawatan Kendaraan -->
        <section>
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <User class="w-5 h-5 text-primary" />
            Informasi Perawatan Kendaraan
          </h3>
          <div v-if="(perawatan?.length)" class="overflow-auto rounded-lg border shadow-sm mt-4">
          <!-- Table Header -->
          <Table class="w-full table-fixed">
            <TableHeader>
              <TableRow class="bg-slate-800 text-muted-foreground">
                <TableHead
                  v-for="(label, column) in tableConfigPerawatan?.visible_columns"
                  :key="column"
                  class="text-white px-4 py-3 text-left bg-slate-800 z-10"
                >
                  {{ label }}
                </TableHead>
                <TableHead class="px-4 py-3 text-center text-white bg-slate-800 z-10">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>

          <!-- Table Body (Scrollable) -->
          <div class="max-h-[500px] overflow-y-auto">
            <Table class="table-fixed">
              <TableBody>
                <TableRow v-for="row in perawatan" :key="row.id" class="hover:bg-accent">
                  <TableCell v-for="(label, column) in tableConfigPerawatan?.visible_columns" :key="column" class="px-4 py-3">
                    <template v-if="tableConfigPerawatan?.special_view?.[column] === 'image'">
                      <img :src="row[column]" alt="Image" class="w-16 h-16 rounded-lg shadow-sm border" />
                    </template>
                    <template v-else-if="tableConfigPerawatan?.special_view?.[column] === 'url'">
                      <Button variant="link" as="a" :href="row[column]" target="_blank">View</Button>
                    </template>
                    <template v-else>
                      {{ row?.[column] }}
                    </template>
                  </TableCell>
                  <TableCell class="px-4 py-3 flex justify-center gap-2">
                    <Button v-if="tableConfigPerawatan?.detail_view" variant="outline" size="icon" @click="openDetail(row)">
                      <Eye class="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
          <!-- Empty State -->
          <Alert v-else class="bg-background mt-4">
            <Info class="w-4 h-4" />
            <AlertTitle class="ml-2">Perawatan Tidak Ditemukan</AlertTitle>
            <AlertDescription class="ml-2">
              Data Perawatan Kendaraan dengan ID ini tidak tersedia.
            </AlertDescription>
          </Alert>
        </section>
      </CardContent>
    </Card>

    <!-- Empty State -->
    <Alert v-else class="bg-background">
      <Info class="w-4 h-4" />
      <AlertTitle class="ml-2">Pemesanan Tidak Ditemukan</AlertTitle>
      <AlertDescription class="ml-2">
        Data pemesanan dengan ID ini tidak tersedia.
      </AlertDescription>
    </Alert>

    <DetailModal v-if="showDetail" :data="detailData" :config="tableConfig" @close="showDetail = false" />
  </div>
</template>
<script>
import DetailModal from "@/components/admin/DetailModal.vue";
import Alert from "@/components/ui/alert/Alert.vue";
import AlertDescription from "@/components/ui/alert/AlertDescription.vue";
import AlertTitle from "@/components/ui/alert/AlertTitle.vue";
import Badge from "@/components/ui/badge/Badge.vue";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Table from "@/components/ui/table/Table.vue";
import TableBody from "@/components/ui/table/TableBody.vue";
import TableCell from "@/components/ui/table/TableCell.vue";
import TableHead from "@/components/ui/table/TableHead.vue";
import TableHeader from "@/components/ui/table/TableHeader.vue";
import TableRow from "@/components/ui/table/TableRow.vue";
import api from "@/plugins/axios"
import { Activity, ArrowLeftIcon, CalendarIcon, ChevronRightIcon, Eye, Info, User } from "lucide-vue-next";
import { formatCurrency, formatDate, formatDateTime } from "@/custom_utility/utils"
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

export default {
  name: "AdminKendaraanDetail",
  components: {
    Activity,
    Badge,
    ArrowLeftIcon,
    Table,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    Button,
    Eye,
    DetailModal,
    Card,
    CardContent,
    Alert,
    Info,
    AlertTitle,
    AlertDescription,
    CalendarIcon,
    ChevronRightIcon,
    ArrowPathIcon,
    User
  },
  data() {
    return {
      isLoading: false,
      kendaraan: null,
      riwayatPemesanan: null,
      pelacakan: null,
      perawatan: null,
      error: null,
      tableConfigPerawatan: null,
      tableConfigPelacakan: null,
      showDetail: false,
      detailData: null,
      fasilitasList: null,
      statusIcons: {
        "Menunggu Pembayaran": 'ClockIcon',
        "Menunggu Konfirmasi": 'ShieldCheckIcon',
        "Dikonfirmasi": 'CheckCircleIcon',
        "Sedang dalam Penggunaan": 'TruckIcon',
        "Selesai": 'CheckCircleIcon',
        "Dibatalkan": 'XCircleIcon'
      }
    }
  },
  methods: {
    async fetchKendaraanDetail() {
      this.isLoading = true
      try {
        const response = await api.get(`/admin/Kendaraan/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
          },
        })
        this.kendaraan = response.data
        this.fasilitasList = response.data.kondisi_fasilitas
        this.fetchPelacakan(response.data.id)
        this.fetchPerawatan(response.data.id)
        this.fetchRiwayatPemesanan(response.data.id)
      } catch (error) {
        console.error("Gagal mengambil detail kendaraan:", error)
        alert("Terjadi kesalahan saat mengambil detail kendaraan.")
      } finally {
        this.isLoading = false
      }
    },
    async fetchRiwayatPemesanan(ID) {
      this.isLoading = true
      try {
        const response = await api.get(`/admin/pemesananIndex?kendaraan_id=${ID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
          },
        })
        this.riwayatPemesanan = response.data
      } catch (error) {
        console.error("Gagal mengambil detail Pemesanan:", error)
        alert("Terjadi kesalahan saat mengambil detail Pemesanan.")
      } finally {
        this.isLoading = false
      }
    },
    async fetchPelacakan(ID) {
      this.isLoading = true
      try {
        const response = await api.get(`/admin/PelacakanKendaraan?kendaraan_id=${ID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
          },
        })
        this.pelacakan = response.data
      } catch (error) {
        console.error("Gagal mengambil detail pelacakan:", error)
        alert("Terjadi kesalahan saat mengambil detail pelacakan.")
      } finally {
        this.isLoading = false
      }
    },
    async fetchPerawatan(ID) {
      this.isLoading = true
      try {
        const response = await api.get(`/admin/PerawatanKendaraan?kendaraan_id=${ID}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
          },
        })
        this.perawatan = response.data
      } catch (error) {
        console.error("Gagal mengambil detail perawatan:", error)
        alert("Terjadi kesalahan saat mengambil detail perawatan.")
      } finally {
        this.isLoading = false
      }
    },
    async fetchConfig() {
      try {
        this.loading = true
        const response = await api.get('/admin/infotabeldong')
        this.tableConfigPelacakan = response.data["PelacakanKendaraan"] || null
        this.tableConfigPerawatan = response.data["PerawatanKendaraan"] || null
      } catch (err) {
        console.error(err)
        this.error = 'Failed to load table config'
      } finally {
        this.loading = false
      }
    },
    getStatusColor(status) {
      return {
        "Menunggu Pembayaran": "text-yellow-600",
        "Menunggu Konfirmasi": "text-orange-600",
        "Dikonfirmasi": "text-green-600",
        "Sedang dalam Penggunaan": "text-blue-600",
        "Selesai": "text-gray-500",
        "Dibatalkan": "text-red-600"
      }[status] || "text-gray-500"
    },
    statusVariant(status) {
      const variants = {
        'Perawatan': 'destructive',
        'Tersedia': 'secondary',
        'Disewa': 'outline'
      }
      return variants[status] || 'secondary'
    },
    openDetail(row) {
      this.detailData = row;
      this.showDetail = true;
    },
    formatCurrency, formatDate, formatDateTime
  },
  mounted() {
    this.fetchKendaraanDetail(),
    this.fetchConfig()
  },
  computed: {
    fasilitasList() {
      if (!this.kendaraan?.kondisi_fasilitas) return []
      return this.kendaraan.kondisi_fasilitas
        .split(',')
        .map(item => item.trim())
        .filter(Boolean)
    },
  }
}
</script>
