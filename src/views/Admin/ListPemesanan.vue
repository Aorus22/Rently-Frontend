<template>
  <div class="container mx-auto p-6">
    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold tracking-tight">Daftar Pemesanan</h1>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center h-64">
        <Activity class="w-8 h-8 animate-spin text-primary" />
      </div>

      <!-- Pemesanan List -->
      <div v-else-if="pemesananList?.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <router-link
          v-for="pemesanan in pemesananList"
          :key="pemesanan.id"
          :to="{ name: 'AdminPemesananDetail', params: { id: pemesanan.id } }"
          class="group transition-colors"
        >
          <Card class="h-full hover:bg-accent/20 transition-colors">
            <CardHeader>
              <CardTitle class="flex justify-between items-start">
                <span>Pemesanan #{{ pemesanan.id }}</span>
                <Badge :variant="statusVariant(pemesanan.status_pemesanan)">
                  {{ pemesanan.status_pemesanan }}
                </Badge>
              </CardTitle>
              <CardDescription class="pt-2">
                <div class="flex items-center gap-2">
                  <User class="w-4 h-4" />
                  {{ pemesanan.user.nama_lengkap }}
                </div>
                <div class="flex items-center gap-2">
                  <Car class="w-4 h-4" />
                  {{ pemesanan.kendaraan.merek_model }}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Total:</span>
                  <span class="font-medium">
                    Rp {{ formatCurrency(pemesanan.total_harga_sewa) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Durasi:</span>
                  <span>
                    {{ formatDate(pemesanan.tanggal_mulai) }} - {{ formatDate(pemesanan.tanggal_selesai) }}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </router-link>
      </div>

      <!-- Empty State -->
      <Alert v-else class="bg-background">
        <Info class="w-4 h-4" />
        <AlertTitle class="ml-2">Tidak ada data</AlertTitle>
        <AlertDescription class="ml-2">
          Tidak ditemukan pemesanan yang tercatat.
        </AlertDescription>
      </Alert>
    </div>
  </div>
</template>

<script>
import { Activity, User, Car, Info } from 'lucide-vue-next'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import api from '@/plugins/axios'

export default {
  name: 'AdminPemesanan',
  components: {
    Activity,
    User,
    Car,
    Info,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
    Alert,
    AlertTitle,
    AlertDescription,
    Badge
  },
  data() {
    return {
      isLoading: false,
      pemesananList: [],
    }
  },
  mounted() {
    this.fetchPemesanan()
  },
  methods: {
    statusVariant(status) {
      const variants = {
        'Menunggu Konfirmasi': 'warning',
        'Menunggu Pembayaran': 'warning',
        'Dikonfirmasi': 'info',
        'Sedang dalam Penggunaan': 'success',
        'Selesai': 'outline',
        'Dibatalkan': 'destructive'
      }
      return variants[status] || 'secondary'
    },
    async fetchPemesanan() {
      this.isLoading = true
      try {
        const response = await api.get('/admin/pemesanan', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('admin_access_token')}`
          }
        })
        this.pemesananList = response.data.data
      } catch (error) {
        console.error('Gagal mengambil pemesanan:', error)
      } finally {
        this.isLoading = false
      }
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('id-ID', { minimumFractionDigits: 2 }).format(amount)
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString('id-ID') : '-'
    }
  }
}
</script>