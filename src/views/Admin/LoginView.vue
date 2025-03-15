<template>
  <div class="min-h-screen w-full flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
      <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Admin Login</h2>
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
    </div>
  </div>
</template>

<script>
import api from '../../plugins/axios'

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await api.post("/adminlogin", {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("admin_access_token", response.data.access_token);
        localStorage.setItem("admin_token_type", response.data.token_type);

        const userResponse = await api.get("/akusiapa", {
          headers: { Authorization: `Bearer ${response.data.access_token}` },
        });

        localStorage.setItem("admin", JSON.stringify(userResponse.data));
        this.$router.push("/admin");
      } catch (error) {
        console.log(error)
        alert("Login gagal! Cek email dan password.");
      }
    },
  },
};
</script>
