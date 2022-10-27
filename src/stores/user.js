import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    errors: null,
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      if (user) {
        this.user = user;
      }

    },

    async signUp(email, password) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error;
        if (user) this.user = user;
      }
      catch (error){
        this.errors = error;
        console.log("mi variiable error", this.errors.message);
      }
    },

    async signIn(email, password) {
      try {
        const { user, error } = await supabase.auth.signIn({
          email: email,
          password: password,
        });
        if (error) throw error;
        if (user) this.user = user;
      }
      catch (error) {
        this.errors = error;
        console.log("mi variiable error", this.errors.message);
      }
    },

    async signOut() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.user = null;
        this.errors = null;
      } catch (error) {
        this.errors = error;
        console.log("mi variiable error", this.errors.message);
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});
