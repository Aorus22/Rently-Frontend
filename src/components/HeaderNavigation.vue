<template>
  <nav class="z-10 sticky top-0 bg-white border-b border-gray-200">
    <div class="mx-auto max-w-7xl px-2 sm:px-6">
      <div class="relative flex h-24 items-center justify-between">
        <!-- Mobile Menu Button -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <Button variant="ghost" @click="isMobileMenuOpen = true" class="p-2">
            <Bars3Icon class="size-6" />
            <span class="sr-only">Open main menu</span>
          </Button>
        </div>

        <!-- Logo / Home -->
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start sm:w-auto sm:flex-none sm:mr-10">
          <router-link to="/" class="text-3xl font-bold iceland-regular">RENTLY</router-link>
        </div>

        <!-- Contact Info -->
        <div class="hidden md:flex flex-none sm:flex-1">
          <a href="#" class="lg:flex items-center inline-block hover:text-gray-500">
            <PhoneIcon class="size-4 mr-2" />
            +6281 123 456 789
          </a>
        </div>

        <!-- Desktop Navigation and User Menu -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <!-- Desktop Navigation -->
          <div class="hidden sm:flex sm:ml-6 space-x-4">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="rounded-md px-3 py-2 text-sm font-medium"
              :class="[item.current ? 'bg-[#159763] text-white' : 'hover:bg-gray-700 hover:text-white']"
              :aria-current="item.current ? 'page' : undefined"
            >
              {{ item.name }}
            </router-link>
          </div>

          <!-- User Menu -->
          <div class="relative ml-3">
            <template v-if="isLoggedIn">
              <DropdownMenu>
                <DropdownMenuTrigger as-child>
                  <Button variant="ghost" class="flex items-center space-x-2">
                    <UserIcon class="size-8" />
                    <ChevronDownIcon class="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-48" align="end">
                  <DropdownMenuLabel>Hai, {{ user.nama_lengkap }}!</DropdownMenuLabel>
                  <DropdownMenuItem as-child class="cursor-pointer">
                    <router-link to="/riwayat-pemesanan">
                      <ShoppingCart />
                      Riwayat Pemesanan
                    </router-link>
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="logout" class="cursor-pointer">
                    <LogOutIcon />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </template>
            <template v-else>
              <router-link to="/login">
                <Button variant="outline" class="flex items-center space-x-2">
                  <UserIcon class="size-4" />
                  <span>Login</span>
                </Button>
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Menu (Sheet) -->
    <Sheet v-model:open="isMobileMenuOpen">
      <SheetContent side="left" class="w-[300px] sm:hidden">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div class="space-y-2 py-4">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="block rounded-md px-3 py-2 text-base font-medium"
            :class="[item.current ? 'bg-[#159763] text-white' : 'hover:bg-gray-700 hover:text-white']"
            @click="isMobileMenuOpen = false"
          >
            {{ item.name }}
          </router-link>
        </div>
      </SheetContent>
    </Sheet>
  </nav>
</template>

<script>
import { useRoute } from 'vue-router'
import { Bars3Icon } from '@heroicons/vue/24/outline'
import { PhoneIcon, UserIcon, ChevronDownIcon, LogOutIcon, ShoppingCart } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { useAuthStore } from '@/stores/auth'

export default {
  components: {
    Bars3Icon,
    PhoneIcon,
    UserIcon,
    ChevronDownIcon,
    LogOutIcon,
    ShoppingCart,
    Button,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
  },
  data() {
    return {
      isMobileMenuOpen: false,
      authStore: useAuthStore(),
      route: useRoute(),
      loading: true
    }
  },
  computed: {
    isLoggedIn() {
      return !!this.user
    },
    user() {
      return this.authStore.user
    },
    navigation() {
      return [
        { name: 'Home', href: '/home', current: this.$route.path === '/home' },
        { name: 'List Kendaraan', href: '/kendaraan', current: this.$route.path.startsWith('/kendaraan') },
        { name: 'About', href: '/about', current: false, current: this.$route.path === '/about' },
        { name: 'Contact', href: '/contact', current: false, current: this.$route.path === '/contact' }
      ]
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('access_token')
      this.authStore.logoutUser()
      this.$router.push('/')
    }
  },
  async mounted() {
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      let loader = this.$loading.show({
        isFullPage: true,
      })
      await this.authStore.checkAuth(access_token)
      loader.hide()
      this.loading = false
    }
  }
}
</script>
