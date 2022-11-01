/*
 * This file contains all the actions related to the tasks and SUPABASE functions.
 * CRUD actions:
 * - fetchTasks. Grabs the tasks of the logged user (Read)
 * - createTask. Creates a new row in table task (Create)
 * - editTask. Modifies existing task (Update)
 * - toogleCompleted. Changes task state: completed or not completed (Update)
 * - deleteTask. Deletes an existing task (Delete)
 */

import { defineStore } from "pinia";
import { supabase } from "../supabase";

// Creating a store using Pinia
export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
    errors: null,
  }),

  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id', { ascending: false });
      this.tasks = tasks;
    },

    async createTask(newTask) {
      try {
        const { error } = await supabase
          .from('tasks')
          .insert({
            user_id: newTask.user_id,
            title: newTask.title.value,
            is_complete: newTask.is_complete,
            inserted_at: newTask.inserted_at
          })
          .select()
        this.errors = null;
        if (error) throw error
      } catch (error) {
        this.errors = "Oops! Something went wrong, please try again. "
      }
    },

    async editTask(id, title) {
      try {
        const { error } = await supabase
          .from('tasks')
          .update({ title: title })
          .eq('id', id)
        this.errors = null;
        if (error) throw error
      } catch (error) {
        this.errors = "Oops! Something went wrong, please try again. "
      }
    },

    async toogleCompleted(id, isComplete) {
      try {
        const { error } = await supabase
          .from('tasks')
          .update({ is_complete: isComplete })
          .eq('id', id)
        this.errors = null;
        if (error) throw error
      } catch (error) {
        this.errors = "Error completing task, please try again. "
      }
    },

    async deleteTask(id) {
      try {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', id)
        this.errors = null;
        if (error) throw error
      } catch (error) {
        this.errors = "Error deleting task, please try again. "
      }
    },
  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: "tasks",
        storage: localStorage,
      },
    ],
  },
});

