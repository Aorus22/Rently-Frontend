import { defineStore } from "pinia";
import api from "../plugins/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    setUser(user) {
      this.user = user;
    },
    logoutUser() {
      this.user = null;
      localStorage.removeItem("access_token");
    },
    async checkAuth(access_token) {
      try {
        const userResponse = await api.get("/me", {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        if (userResponse.status === 200 && userResponse.data) {
          this.setUser(userResponse.data);
        } else {
          this.logoutUser();
        }

      } catch (error) {
        console.error("Error checking auth:", error);
        this.logoutUser();
      }
    }
  },
});
