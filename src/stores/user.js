import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      console.log("fetchUser:",user)
      if (user) {
        this.user = user;
      }
      
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      console.log("email:",email,"pass:",password)
      if (error) throw error;
      if (user) this.user = user;
      
    },
    async signIn(email, password) {
      try {
        const { user, error } = await supabase.auth.signIn({
          email: email,
        password: password,
        });
        console.log("SIGN IN -> email:",email,"pass:",password)
        if (error) throw error;
        if (user) this.user = user;
      } 
      catch (error) {
        alert(error.error_description || error.message);
      }
    },

    async signOut() {
      try {
        console.log("dentro de funcion SignOut de user.js");
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        //commit('setUser', null)
        this.user = null;
        //alert("You've been logged Out successfully");
        console.log ("this.user:", this.user);
      } catch (error) {
        alert(error.error_description || error.message);
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
