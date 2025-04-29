<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-cover bg-center background-image">
    <div class="font-normal bg-white bg-opacity-20 backdrop-blur-md shadow-lg rounded-lg max-w-xl p-16 w-full">
      <div class="flex flex-col">
        <div class="mb-2 h-10 w-10 rounded-full bg-white"></div>
        <h2 class="text-3xl font-bold text-left text-black mb-2">
          Buat Akun
        </h2>
        <p class="text-sm text-left text-gray-300 mb-6">
          Sudah punya akun?
          <router-link to="/login" class="text-white underline">Log in</router-link>
        </p>
      </div>
      <div class="mb-4">
        <label for="nama_lengkap" class="block text-gray-300 font-medium mb-1">Nama</label>
        <input
          type="text"
          id="nama_lengkap"
          v-model="nama_lengkap"
          class="text-white w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white bg-opacity-10"
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-300 font-medium mb-1">Alamat Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          class="text-white w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white bg-opacity-10"
        />
      </div>
      <div class="flex space-x-4 mb-4">
        <div class="w-1/2">
          <label for="password" class="block text-gray-300 font-medium mb-1">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="password"
            v-model="password"
            class="text-white w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white bg-opacity-10"
          />
        </div>
        <div class="w-1/2">
          <label for="confirm_password" class="block text-gray-300 font-medium mb-1">Konfirmasi Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            id="confirm_password"
            v-model="confirm_password"
            class="text-white w-full px-4 py-2 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white bg-opacity-10"
          />
        </div>
      </div>
      <p class="text-xs text-gray-300 mb-4">
        Gunakan 8 karakter atau lebih dengan kombinasi huruf, angka, dan simbol.
      </p>
      <div class="flex items-center mb-4">
        <input type="checkbox" id="show_password" v-model="showPassword" class="mr-2" />
        <label for="show_password" class="text-gray-300 text-sm">
          Tunjukkan password
        </label>
      </div>
      <div class="flex items-center w-full justify-between">
        <div>
          <p class="text-center text-gray-300 text-sm mt-4">
            Sudah punya akun?
            <router-link to="/login" class="text-white underline">Log in</router-link>
          </p>
        </div>
        <button
          @click="register"
          class="bg-[#159763] hover:bg-green-600 w-48 text-white font-light py-2 px-6 rounded-3xl transition"
        >
          Buat Akun
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../plugins/axios';

export default {
  data() {
    return {
      nama_lengkap: "",
      email: "",
      password: "",
      confirm_password: "",
      showPassword: false,
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirm_password) {
        this.$toast.error("Password dan konfirmasi password tidak cocok!");
        return;
      }
      try {
        await api.post("/register", {
          nama_lengkap: this.nama_lengkap,
          email: this.email,
          password: this.password,
        });
        this.$toast.success("Registrasi berhasil! Silakan login.");
        this.$router.push("/login");
      } catch (error) {
        console.log(error);
        this.$toast.error("Gagal registrasi!");
      }
    },
  },
};
</script>

<style>
.background-image {
  background: url('/src/assets/image/bg-login.webp') no-repeat center center;
  background-size: cover;
  background-attachment: scroll;
  width: 100%;
}
</style>
