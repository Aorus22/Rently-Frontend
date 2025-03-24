<template>
  <div class="container mx-auto p-6 max-w-5xl">
    <!-- Header Section -->
    <header class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
      <div class="flex items-center gap-4">
        <router-link
          to="/admin/list-pemesanan"
          class="flex items-center text-primary hover:underline transition-colors duration-200"
        >
          <ArrowLeftIcon class="w-5 h-5 mr-2" />
          Kembali ke Daftar
        </router-link>
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Detail Pemesanan #{{ pemesanan?.id }}
        </h1>
      </div>
      <Badge v-if="pemesanan" :variant="statusVariant(pemesanan.status_pemesanan)" class="text-sm">
        {{ pemesanan.status_pemesanan }}
      </Badge>
    </header>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <Activity class="w-8 h-8 animate-spin text-primary" />
    </div>

    <!-- Main Content -->
    <Card v-else-if="pemesanan" class="shadow-md border border-gray-100">
      <CardContent class="p-6 sm:p-8 space-y-8">
        <!-- Informasi Pemesanan -->
        <section>
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Info class="w-5 h-5 text-primary" />
            Informasi Pemesanan
          </h3>
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div class="flex justify-between">
              <span class="text-muted-foreground">ID:</span>
              <span class="font-medium">{{ pemesanan.id }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Tanggal Mulai:</span>
              <span>{{ formatDate(pemesanan.tanggal_mulai) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Tanggal Selesai:</span>
              <span>{{ formatDate(pemesanan.tanggal_selesai) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Total Harga:</span>
              <span class="font-medium">Rp {{ formatCurrency(pemesanan.total_harga_sewa) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Dibuat:</span>
              <span>{{ formatDateTime(pemesanan.created_at) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Diperbarui:</span>
              <span>{{ formatDateTime(pemesanan.updated_at) }}</span>
            </div>
          </div>
        </section>

        <!-- Informasi Pengguna -->
        <section>
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <User class="w-5 h-5 text-primary" />
            Informasi Pengguna
          </h3>
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Nama:</span>
              <span class="font-medium">{{ pemesanan.user.nama_lengkap }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Email:</span>
              <span>{{ pemesanan.user.email }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Status Blokir:</span>
              <span>{{ pemesanan.user.status_blokir }}</span>
            </div>
          </div>
        </section>

        <!-- Informasi Kendaraan -->
        <section>
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Car class="w-5 h-5 text-primary" />
            Informasi Kendaraan
          </h3>
          <div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <div class="flex justify-between">
              <span class="text-muted-foreground">Merek & Model:</span>
              <span class="font-medium">{{ pemesanan.kendaraan.merek_model }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Kategori:</span>
              <span>{{ pemesanan.kendaraan.kategori_kendaraan }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Nomor Polisi:</span>
              <span>{{ pemesanan.kendaraan.nomor_polisi }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Kapasitas Kursi:</span>
              <span>{{ pemesanan.kendaraan.kapasitas_kursi }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Jenis Transmisi:</span>
              <span>{{ pemesanan.kendaraan.jenis_transmisi }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Tahun Produksi:</span>
              <span>{{ pemesanan.kendaraan.tahun_produksi }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Status Ketersediaan:</span>
              <span>{{ pemesanan.kendaraan.status_ketersediaan }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Harga Sewa per Periode:</span>
              <span class="font-medium">Rp {{ formatCurrency(pemesanan.kendaraan.harga_sewa_per_periode) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-muted-foreground">Kondisi Fasilitas:</span>
              <span>{{ pemesanan.kendaraan.kondisi_fasilitas }}</span>
            </div>
          </div>
        </section>

        <!-- Informasi Pembayaran -->
        <section>
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <CreditCard class="w-5 h-5 text-primary" />
            Informasi Pembayaran
          </h3>
          <div class="mt-4" v-if="pemesanan.pembayaran && pemesanan.pembayaran.length > 0">
            <Card v-for="payment in pemesanan.pembayaran" :key="payment.id" class="mt-4 shadow-sm hover:bg-accent/20 transition-colors">
              <CardContent class="p-5">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">ID Pembayaran:</span>
                    <span class="font-medium">{{ payment.id }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Metode:</span>
                    <span>{{ payment.metode_pembayaran }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Jumlah:</span>
                    <span class="font-medium">Rp {{ formatCurrency(payment.jumlah_pembayaran) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Status:</span>
                    <Badge :variant="statusVariant(payment.status_pembayaran)">
                      {{ payment.status_pembayaran }}
                    </Badge>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Tanggal:</span>
                    <span>{{ formatDateTime(payment.tanggal_pembayaran) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Deposit Keamanan:</span>
                    <span class="font-medium">Rp {{ formatCurrency(payment.deposit_keamanan) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Dibuat:</span>
                    <span>{{ formatDateTime(payment.created_at) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">Diperbarui:</span>
                    <span>{{ formatDateTime(payment.updated_at) }}</span>
                  </div>
                </div>
                <div v-if="payment.bukti_pembayaran" class="mt-6">
                  <p class="text-sm text-muted-foreground">Bukti Pembayaran:</p>
                  <img
                    :src="payment.bukti_pembayaran"
                    alt="Bukti Pembayaran"
                    class="w-full max-w-md h-auto rounded-lg border border-gray-200 mt-2"
                  />
                </div>
                <div v-if="payment.status_pembayaran === 'Pending'" class="mt-6 flex gap-4">
                  <Button
                    @click="openLunasModal(payment.id)"
                    :disabled="isConfirmingLunas"
                    variant="default"
                    class="bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
                  >
                    Konfirmasi Lunas
                  </Button>
                  <Button
                    @click="openBelumLunasModal(payment.id)"
                    :disabled="isConfirmingBelumLunas"
                    variant="outline"
                    class="border-red-600 text-red-600 hover:bg-red-50 transition-colors duration-200"
                  >
                    Konfirmasi Belum Lunas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Alert v-else class="mt-4 bg-background">
            <Info class="w-4 h-4" />
            <AlertDescription class="ml-2">
              Tidak ada data pembayaran.
            </AlertDescription>
          </Alert>
        </section>

        <!-- Informasi Kontrak Sewa -->
        <section>
          <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FileText class="w-5 h-5 text-primary" />
            Informasi Kontrak Sewa
          </h3>
          <div class="mt-4">
            <div v-if="pemesanan.kontrak_sewa">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
                <div class="flex justify-between">
                  <span class="text-muted-foreground">ID Kontrak:</span>
                  <span class="font-medium">{{ pemesanan.kontrak_sewa.id }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Link Kontrak:</span>
                  <span
                    @click="downloadKontrak(pemesanan.kontrak_sewa.link_kontrak, 'kontrak_sewa_' + pemesanan.id + '.pdf')"
                    class="text-blue-600 hover:underline cursor-pointer"
                  >
                    Download Kontrak
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Status:</span>
                  <Badge :variant="statusVariant(pemesanan.kontrak_sewa.status_kontrak)">
                    {{ pemesanan.kontrak_sewa.status_kontrak }}
                  </Badge>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Dibuat:</span>
                  <span>{{ formatDateTime(pemesanan.kontrak_sewa.created_at) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-muted-foreground">Diperbarui:</span>
                  <span>{{ formatDateTime(pemesanan.kontrak_sewa.updated_at) }}</span>
                </div>
              </div>
            </div>
            <Alert v-else class="mt-4 bg-background">
              <Info class="w-4 h-4" />
              <AlertDescription class="ml-2">
                Tidak ada data kontrak sewa.
              </AlertDescription>
            </Alert>
            <!-- Tombol Upload Kontrak Sewa -->
            <div v-if="pemesanan.status_pemesanan === 'Dikonfirmasi' && !pemesanan.kontrak_sewa" class="mt-6">
              <Button @click="openUploadModal" variant="default" class="bg-blue-600 hover:bg-blue-700 text-white">
                Upload Kontrak Sewa
              </Button>
            </div>
            <!-- Tombol Konfirmasi Pengembalian -->
            <div v-if="pemesanan.status_pemesanan === 'Sedang dalam Penggunaan'" class="mt-6">
              <Button
                @click="confirmPengembalian"
                :disabled="isConfirmingPengembalian"
                variant="default"
                class="bg-purple-600 hover:bg-purple-700 text-white transition-colors duration-200"
              >
                <Activity v-if="isConfirmingPengembalian" class="w-4 h-4 mr-2 animate-spin" />
                {{ isConfirmingPengembalian ? 'Memproses...' : 'Konfirmasi Pengembalian' }}
              </Button>
            </div>
          </div>
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

    <!-- Modal Konfirmasi Lunas -->
    <Dialog v-model:open="isLunasModalOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Pembayaran Lunas</DialogTitle>
          <DialogDescription>
            Masukkan jumlah pembayaran untuk mengonfirmasi sebagai lunas.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4">
          <Label for="jumlahLunas">Jumlah Pembayaran (Rp)</Label>
          <Input
            id="jumlahLunas"
            v-model="jumlahPembayaranLunas"
            type="number"
            placeholder="Masukkan jumlah"
            :disabled="isConfirmingLunas"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" @click="isLunasModalOpen = false">Batal</Button>
          <Button
            @click="confirmPaymentLunas(selectedPaymentId)"
            :disabled="isConfirmingLunas || !jumlahPembayaranLunas"
            class="bg-green-600 hover:bg-green-700 text-white"
          >
            <Activity v-if="isConfirmingLunas" class="w-4 h-4 mr-2 animate-spin" />
            {{ isConfirmingLunas ? 'Memproses...' : 'Konfirmasi' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Modal Konfirmasi Belum Lunas -->
    <Dialog v-model:open="isBelumLunasModalOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Pembayaran Belum Lunas</DialogTitle>
          <DialogDescription>
            Masukkan jumlah pembayaran untuk mengonfirmasi sebagai belum lunas.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4">
          <Label for="jumlahBelumLunas">Jumlah Pembayaran (Rp)</Label>
          <Input
            id="jumlahBelumLunas"
            v-model="jumlahPembayaranBelumLunas"
            type="number"
            placeholder="Masukkan jumlah"
            :disabled="isConfirmingBelumLunas"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" @click="isBelumLunasModalOpen = false">Batal</Button>
          <Button
            @click="confirmPaymentBelumLunas(selectedPaymentId)"
            :disabled="isConfirmingBelumLunas || !jumlahPembayaranBelumLunas"
            class="bg-red-600 hover:bg-red-700 text-white"
          >
            <Activity v-if="isConfirmingBelumLunas" class="w-4 h-4 mr-2 animate-spin" />
            {{ isConfirmingBelumLunas ? 'Memproses...' : 'Konfirmasi' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <!-- Modal Upload Kontrak Sewa -->
    <Dialog v-model:open="isUploadModalOpen">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Kontrak Sewa</DialogTitle>
          <DialogDescription>
            Unggah file kontrak sewa untuk pemesanan ini.
          </DialogDescription>
        </DialogHeader>
        <div class="space-y-4">
          <Label for="fileKontrak">File Kontrak (PDF/DOC/DOCX)</Label>
          <Input
            id="fileKontrak"
            type="file"
            accept=".pdf,.doc,.docx"
            @change="handleFileChange"
            :disabled="isUploading"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" @click="isUploadModalOpen = false">Batal</Button>
          <Button
            @click="uploadKontrakSewa"
            :disabled="isUploading || !fileKontrak"
            class="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Activity v-if="isUploading" class="w-4 h-4 mr-2 animate-spin" />
            {{ isUploading ? 'Mengunggah...' : 'Unggah' }}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script>
import { Activity, ArrowLeftIcon, User, Car, Info, CreditCard, FileText } from "lucide-vue-next"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import api from "@/plugins/axios"

export default {
  name: "AdminPemesananDetail",
  components: {
    Activity,
    ArrowLeftIcon,
    User,
    Car,
    Info,
    CreditCard,
    FileText,
    Card,
    CardContent,
    Badge,
    Button,
    Alert,
    AlertTitle,
    AlertDescription,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    Input,
    Label,
  },
  data() {
    return {
      isLoading: false,
      isConfirmingLunas: false,
      isConfirmingBelumLunas: false,
      isConfirmingPengembalian: false,
      isUploading: false,
      pemesanan: null,
      isLunasModalOpen: false,
      isBelumLunasModalOpen: false,
      isUploadModalOpen: false,
      selectedPaymentId: null,
      jumlahPembayaranLunas: '',
      jumlahPembayaranBelumLunas: '',
      fileKontrak: null,
    }
  },
  mounted() {
    this.fetchPemesananDetail()
  },
  methods: {
    statusVariant(status) {
      const variants = {
        'Menunggu Konfirmasi': 'warning',
        'Menunggu Pembayaran': 'warning',
        'Dikonfirmasi': 'info',
        'Sedang dalam Penggunaan': 'success',
        'Selesai': 'outline',
        'Dibatalkan': 'destructive',
        'Pending': 'warning',
        'Completed': 'success',
        'Aktif': 'success',
        'Selesai': 'outline'
      }
      return variants[status] || 'secondary'
    },
    async fetchPemesananDetail() {
      this.isLoading = true
      try {
        const response = await api.get(`/admin/pemesanan/${this.$route.params.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
          },
        })
        this.pemesanan = response.data.data
      } catch (error) {
        console.error("Gagal mengambil detail pemesanan:", error)
        alert("Terjadi kesalahan saat mengambil detail pemesanan.")
      } finally {
        this.isLoading = false
      }
    },
    openLunasModal(paymentId) {
      this.selectedPaymentId = paymentId
      this.jumlahPembayaranLunas = ''
      this.isLunasModalOpen = true
    },
    openBelumLunasModal(paymentId) {
      this.selectedPaymentId = paymentId
      this.jumlahPembayaranBelumLunas = ''
      this.isBelumLunasModalOpen = true
    },
    openUploadModal() {
      this.fileKontrak = null
      this.isUploadModalOpen = true
    },
    handleFileChange(event) {
      this.fileKontrak = event.target.files[0]
    },
    async confirmPaymentLunas(paymentId) {
      this.isConfirmingLunas = true
      try {
        await api.post(`/admin/konfirmasi-lunas/${paymentId}`, {
          jumlah_pembayaran: parseFloat(this.jumlahPembayaranLunas),
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("admin_access_token")}` },
        })
        this.isLunasModalOpen = false
        await this.fetchPemesananDetail()
      } catch (error) {
        alert("Terjadi kesalahan saat mengonfirmasi pembayaran lunas.")
      } finally {
        this.isConfirmingLunas = false
      }
    },
    async confirmPaymentBelumLunas(paymentId) {
      this.isConfirmingBelumLunas = true
      try {
        await api.post(`/admin/konfirmasi-belumlunas/${paymentId}`, {
          jumlah_pembayaran: parseFloat(this.jumlahPembayaranBelumLunas),
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem("admin_access_token")}` },
        })
        this.isBelumLunasModalOpen = false
        await this.fetchPemesananDetail()
      } catch (error) {
        alert("Terjadi kesalahan saat mengonfirmasi pembayaran belum lunas.")
      } finally {
        this.isConfirmingBelumLunas = false
      }
    },
    async uploadKontrakSewa() {
      this.isUploading = true
      try {
        const formData = new FormData()
        formData.append('file_kontrak', this.fileKontrak)

        await api.post(`/admin/upload-kontrak-sewa/${this.pemesanan.id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("admin_access_token")}`,
            'Content-Type': 'multipart/form-data'
          },
        })
        this.isUploadModalOpen = false
        await this.fetchPemesananDetail()
      } catch (error) {
        alert("Terjadi kesalahan saat mengunggah kontrak sewa.")
        console.error("Upload error:", error)
      } finally {
        this.isUploading = false
      }
    },
    async confirmPengembalian() {
      if (!confirm("Apakah Anda yakin ingin mengonfirmasi pengembalian kendaraan?")) return
      this.isConfirmingPengembalian = true
      try {
        await api.post(`/admin/pengembalian-mobil/${this.pemesanan.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("admin_access_token")}` },
        })
        await this.fetchPemesananDetail()
      } catch (error) {
        alert("Terjadi kesalahan saat mengonfirmasi pengembalian.")
        console.error("Pengembalian error:", error)
      } finally {
        this.isConfirmingPengembalian = false
      }
    },
    async downloadKontrak(url, filename) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Gagal mengambil file kontrak');
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error('Error saat mengunduh kontrak:', error);
        alert('Terjadi kesalahan saat mengunduh kontrak sewa.');
      }
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat("id-ID", { minimumFractionDigits: 2 }).format(amount)
    },
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString("id-ID") : "-"
    },
    formatDateTime(dateTime) {
      return dateTime ? new Date(dateTime).toLocaleString("id-ID") : "-"
    }
  }
}
</script>