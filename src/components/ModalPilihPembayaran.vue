<template>
  <Dialog :open="show" @update:open="$emit('close')">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle class="text-xl text-center">Pilih Metode Pembayaran</DialogTitle>
      </DialogHeader>

      <div v-if="pemesanan" class="space-y-6">
        <div class="text-center">
          <h3 class="text-lg font-bold text-green-700 uppercase tracking-wide">Total</h3>
          <Card class="mt-2 max-w-72 mx-auto border-2 border-green-600">
            <CardContent class="py-2">
              <p class="text-green-600 font-bold text-lg">{{ formatHarga(pemesanan.total_harga_sewa) }}</p>
            </CardContent>
          </Card>
        </div>

        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-gray-700">Metode Pembayaran:</h3>
          <div class="grid grid-cols-2 gap-4">
            <Card
              @click="metodePembayaran = 'Transfer Bank'"
              :class="{
                'border-green-500 bg-green-50': metodePembayaran === 'Transfer Bank',
                'border-gray-300 bg-gray-50': metodePembayaran !== 'Transfer Bank'
              }"
              class="cursor-pointer hover:border-green-500 transition-all"
            >
              <CardContent class="p-4 flex flex-col items-center">
                <BanknoteIcon class="w-12 h-12 text-green-500 mb-2" />
                <span class="text-gray-700 font-medium text-sm">Transfer Bank</span>
              </CardContent>
            </Card>

            <Card
              @click="metodePembayaran = 'E-Wallet'"
              :class="{
                'border-green-500 bg-green-50': metodePembayaran === 'E-Wallet',
                'border-gray-300 bg-gray-50': metodePembayaran !== 'E-Wallet'
              }"
              class="cursor-pointer hover:border-green-500 transition-all"
            >
              <CardContent class="p-4 flex flex-col items-center">
                <QrCodeIcon class="w-12 h-12 text-green-500 mb-2" />
                <span class="text-gray-700 font-medium text-sm">E-Wallet / QRIS</span>
              </CardContent>
            </Card>
          </div>
        </div>

        <Button
          @click="pilihMetodePembayaran"
          class="w-full bg-green-500 hover:bg-green-600"
        >
          Lanjutkan Pembayaran
        </Button>
      </div>

      <div v-else class="text-center py-4">
        <span class="text-gray-500">Memuat data...</span>
      </div>

      <DialogFooter>
        <Button
          variant="outline"
          class="w-full"
          @click="$emit('close')"
        >
          Batal
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script>
import api from "../plugins/axios";
import { BanknoteIcon, QrCodeIcon } from "lucide-vue-next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default {
  props: {
    show: Boolean,
    pemesanan: Object,
  },
  components: {
    BanknoteIcon,
    QrCodeIcon,
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    Button,
    Card,
    CardContent,
  },
  data() {
    return {
      metodePembayaran: "",
    };
  },
  methods: {
    formatHarga(harga) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(harga);
    },
    async pilihMetodePembayaran() {
      if (!this.metodePembayaran) {
        this.$toast.error("Silakan pilih metode pembayaran terlebih dahulu.");
        return;
      }

      let loader = this.$loading.show({
        isFullPage: true,
      });

      try {
        const response = await api.post(
          `/pemesanan/${this.pemesanan.id}/bayar`,
          { metode_pembayaran: this.metodePembayaran },
        );

        this.$toast.success("Metode pembayaran berhasil dipilih!");
        this.$emit("close");
        this.$router.push(`/detail-pembayaran/${response.data.pembayaran_id}`);
      } catch (error) {
        console.error("Gagal memilih metode pembayaran:", error);
      } finally {
        loader.hide();
      }
    },
  },
};
</script>