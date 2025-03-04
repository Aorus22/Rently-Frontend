<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Register</h2>
      <input
        type="text"
        v-model="nama_lengkap"
        placeholder="Nama Lengkap"
        class="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
      />
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
        @click="register"
        class="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition"
      >
        Register
      </button>
      <p class="text-center text-gray-600 mt-4">
        Sudah punya akun?
        <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      nama_lengkap: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        await axios.post("http://127.0.0.1:8000/api/register", {
          nama_lengkap: this.nama_lengkap,
          email: this.email,
          password: this.password,
        });
        alert("Registrasi berhasil! Silakan login.");
        this.$router.push("/login");
      } catch (error) {
        console.log(error)
        alert("Gagal registrasi!");
      }
    },
  },
};
</script>
