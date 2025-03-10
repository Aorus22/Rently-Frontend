<template>
  <Disclosure as="nav" class="sticky top-0 bg-white" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6">
      <div class="relative flex h-24 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block size-6" aria-hidden="true" />
            <XMarkIcon v-else class="block size-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start sm:w-auto sm:flex-none sm:mr-10">
          <!-- Logo / Home -->
          <div class="flex shrink-0 items-center">
            <router-link to="/" class="text-3xl font-bold iceland-regular">RENTLY</router-link>
          </div>
        </div>
        <div class="flex flex-none sm:flex-1">
          <a href="#" class="hidden lg:flex items-center inline-block hover:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4 mr-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            +6281 123 456 789
          </a>
        </div>
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Menu Navigasi -->
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a v-for="item in navigation" :key="item.name" :href="item.href"
                :class="[item.current ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']"
                :aria-current="item.current ? 'page' : undefined">{{ item.name }}</a>
            </div>
          </div>

          <!-- Login / User Dropdown -->
          <div class="relative ml-3">
            <template v-if="isLoggedIn">
              <button @click="toggleDropdown" class="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8 -mr-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd" />
                </svg>
              </button>

              <!-- Dropdown Menu -->
              <div v-if="dropdownOpen"
                class="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-xl overflow-hidden">
                <span class="block px-4 py-2 font-semibold">Hai, {{ user.nama_lengkap }}!</span>
                <router-link to="/riwayat-pemesanan" class="block px-4 py-2 hover:bg-gray-200">Riwayat
                  Pemesanan</router-link>
                <button @click="logout" class="block w-full text-left px-4 py-2 hover:bg-gray-200">Logout</button>
              </div>
            </template>

            <template v-else>
              <router-link to="/login"
                class="hover:text-gray-500 hover:border-gray-500 flex items-center  text-sm border-2 border-black rounded-xl px-4 py-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="size-4 mr-3">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                Login
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="space-y-1 px-2 pt-2 pb-3">
        <DisclosureButton v-for="item in navigation" :key="item.name" as="a" :href="item.href"
          :class="[item.current ? 'bg-gray-900 text-white' : 'hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
          :aria-current="item.current ? 'page' : undefined">{{ item.name }}</DisclosureButton>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const route = useRoute() // Get current route

const navigation = computed(() =>
  [
    { name: 'Home', href: '/', current: route.path === '/' },
    { name: 'List Kendaraan', href: '/kendaraan', current: route.path.startsWith('/kendaraan') },
    { name: 'About', href: '$', current: false },
    { name: 'Contact', href: '$', current: false }
  ]
)
</script>

<script>
export default {
  data() {
    return {
      dropdownOpen: false,
      user: JSON.parse(localStorage.getItem('user')) || null
    };
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('access_token');
    }
  },
  methods: {
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
    logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      this.user = null;
      this.$router.push('/login');
    }
  }
};
</script>
