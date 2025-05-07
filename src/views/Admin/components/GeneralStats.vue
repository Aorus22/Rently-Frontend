<template>
  <Card class="shadow-md border border-gray-100">
    <CardContent class="p-6">
      <h3 class="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
        <InformationCircleIcon class="w-5 h-5 text-primary" />
        Statistik Umum
      </h3>
      {{  }}
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p class="text-sm text-muted-foreground">Total Kendaraan</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.total_kendaraan }}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p class="text-sm text-muted-foreground">Total User</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.total_user }}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p class="text-sm text-muted-foreground">Total Pemesanan</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.total_pemesanan }}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p class="text-sm text-muted-foreground">Total Garasi</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.total_garasi }}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p class="text-sm text-muted-foreground">User Baru Bulan Ini</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.user_baru_bulan_ini }}</p>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <p class="text-sm text-muted-foreground">User Terblokir</p>
          <p class="text-2xl font-bold text-gray-800">{{ stats.user_terblokir }}</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
import { Card, CardContent } from '@/components/ui/card'
import { InformationCircleIcon } from '@heroicons/vue/24/outline'

defineProps({
  stats: Object
})
</script>
