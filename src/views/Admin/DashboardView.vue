<template>
  <div class="container mx-auto p-6 max-w-6xl">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
    </header>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center h-64">
      <ArrowPathIcon class="w-8 h-8 animate-spin" />
    </div>

    <!-- Main Content -->
    <div v-else class="space-y-8">
      <!-- General Statistics -->

      <GeneralStats :stats="dashboardData.data.statistik_umum" />

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ArrowPathIcon } from '@heroicons/vue/24/outline'
import GeneralStats from './components/GeneralStats.vue'
import api from '@/plugins/axios'
// import VehicleStatus from './components/VehicleStatus.vue'
// import VehicleCategory from './components/VehicleCategory.vue'
// import OrderStats from './components/OrderStats.vue'
// import FinancialStats from './components/FinancialStats.vue'
// import MonthlyRevenueChart from './components/MonthlyRevenueChart.vue'
// import WeeklyOrdersChart from './components/WeeklyOrdersChart.vue'
// import RecentOrders from './components/RecentOrders.vue'
// import RecentPayments from './components/RecentPayments.vue'
// import PopularVehicles from './components/PopularVehicles.vue'
// import MaintenanceNeeded from './components/MaintenanceNeeded.vue'
// import OrdersNeedingConfirmation from './components/OrdersNeedingConfirmation.vue'
// import PopularGarages from './components/PopularGarages.vue'
// import ActiveUsers from './components/ActiveUsers.vue'
// import CategoryPerformance from './components/CategoryPerformance.vue'
// import ActiveContracts from './components/ActiveContracts.vue'

const dashboardData = ref({})
const isLoading = ref(true)

const fetchDashboardData = async () => {
  try {
    isLoading.value = true
    const response = await api.get('/admin/dashboard')
    if (response.status === 200) {
      dashboardData.value = response.data
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>
