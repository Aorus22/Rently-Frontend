<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-cover bg-center" :style="{ backgroundImage: 'url(/bg-login.jpg)' }">
    <div class="font-normal bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg max-w-lg p-16 w-full ">
      <h2 class="text-3xl font-bold text-center text-black mb-2">
        Sewa kendaraan,<br />jelajahi setiap sudut dengan bebas
      </h2>
      <p class="text-sm text-center text-gray-300 mb-6">
        Dengan kendaraan yang tepat, jelajahi keindahan tanpa batas di ujung perjalananmu.
      </p>
      <div class="mb-4">
        <label for="email" class="block text-gray-300 font-medium mb-1">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="text-white w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white bg-opacity-10"
        />
      </div>
      <div class="mb-4">
        <label for="password" class="block text-gray-300 font-medium mb-1">Password</label>
        <div class="relative">
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            class="text-white w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white bg-opacity-10"
          />
          <button
            @click="showPassword = !showPassword"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm flex items-center"
          >
            <span class="mr-1 text-white">{{ showPassword ? 'HIDE' : 'SHOW' }}</span>
            <Eye v-if="showPassword" color="white" class="w-4 h-4" />
            <EyeOff v-else color="white" class="w-4 h-4" />
          </button>
        </div>
      </div>
      <div class="flex items-center mb-4">
        <input type="checkbox" id="terms" class="mr-2" />
        <label for="terms" class="text-gray-300 text-sm">
          Dengan mendaftar saya menyetujui <a href="#" class="text-gray-400 underline">Syarat Penggunaan</a> dan <a href="#" class="text-gray-400 underline">Kebijakan Privasi</a>
        </label>
      </div>
      <button
        @click="login"
        class="w-full bg-[#159763] hover:bg-green-600 text-white font-light py-2 rounded-3xl transition"
      >
        Log In
      </button>
      <p class="text-center text-gray-300 text-sm mt-4">
        Belum punya akun?
        <router-link to="/register" class="text-white underline">Daftar</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import api from '../plugins/axios';
import { useAuthStore } from "@/stores/auth";
import { Eye, EyeOff } from 'lucide-vue-next';

export default {
  components: {
    Eye,
    EyeOff,
  },
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      authStore: useAuthStore(),
    };
  },
  computed: {
    redirect() {
      return this.$route.query.redirect || '/';
    }
  },
  methods: {
    async login() {
      let loader = this.$loading.show({
        isFullPage: true,
      });

      try {
        const response = await api.post("/login", {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("access_token", response.data.access_token);

        const userResponse = await api.get("/me");

        this.authStore.setUser(userResponse.data);

        this.$router.push(this.redirect);

      } catch (error) {
        console.log(error);
        this.$toast.error("Login gagal! Cek email dan password.");
      } finally {
        loader.hide();
      }
    },
  },
};
</script>
