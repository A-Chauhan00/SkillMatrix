import { create } from "zustand";
import { getCurrentUser, loginUser, registerUser, logoutUser } from "../api/authApi";

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  // Verify HttpOnly cookie session on initial app load
  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await getCurrentUser();
      if (res?.success) {
        set({ user: res.user || res.data?.user || res.data, loading: false });
      } else {
        set({ user: null, loading: false });
      }
    } catch (error) {
      set({ user: null, loading: false });
    }
  },

  // Register handler 
  register: async (userData) => {
    const res = await registerUser(userData);
    if (res?.success) {
      set({ user: res.user }); 
    }
    return res;
  },

  // Login handler 
  login: async (credentials) => {
    const res = await loginUser(credentials);
    if (res?.success) {
      set({ user: res.user });
    }
    return res;
  },

  // Logout handler
  logout: async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      set({ user: null });
    }
  },
}));