<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        class="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        class="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
      />
      <button
        @click="login"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition"
      >
        Login
      </button>
      <p class="text-center text-gray-600 mt-4">
        Belum punya akun?
        <router-link to="/register" class="text-blue-500 hover:underline">Daftar</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import api from '../plugins/axios'
import { useAuthStore } from "@/stores/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
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

        const userResponse = await api.get("/me", {
          headers: { Authorization: `Bearer ${response.data.access_token}` },
        });

        this.authStore.setUser(userResponse.data);

        this.$router.push(this.redirect);
        
      } catch (error) {
        console.log(error)
        alert("Login gagal! Cek email dan password.");
      } finally {
        loader.hide();
      }
    },
  },
};
</script>
