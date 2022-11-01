/*
 * This file contains all the actions related to the user and SUPABASE functions.
 * Actions:
 * - fetchUser. Verifies if the user is logged in
 * - SignUp. Registers a new user in Supabase
 * - SignIn. Logs an existing user in
 * - SignOut. Ends user session 
 */

import { defineStore } from "pinia";
import { supabase } from "../supabase";

// Creating a store using Pinia
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
      catch (error) {
        this.errors = error.message;
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
        this.errors = error.message;
      }
    },

    async signOut() {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        this.user = null;
        this.errors = null;
      } catch (error) {
        this.errors = error.message;
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
