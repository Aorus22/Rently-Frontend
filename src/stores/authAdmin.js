import { defineStore } from "pinia";
import api from "../plugins/axios";

export const useAdminAuthStore = defineStore("adminAuth", {
  state: () => ({
    admin: null,
  }),
  actions: {
    setAdmin(admin, token) {
      this.admin = admin;
      localStorage.setItem("admin_access_token", token);
    },
    logoutAdmin() {
      this.admin = null;
      localStorage.removeItem("admin_access_token");
    },
    async checkAuth(access_token) {
      try {
        const userResponse = await api.get("/admin/akusiapa", {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (userResponse.status === 200 && userResponse.data) {
          this.setAdmin(userResponse.data, access_token);
        } else {
          this.logoutAdmin();
          throw new Error("Invalid authentication");
        }

      } catch (error) {
        console.error("Error checking auth:", error);
        this.logoutAdmin();
        throw error;
      }
    }
  },
});
