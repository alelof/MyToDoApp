import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),

  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from('tasks')
        .select('*')
        .order('id');
      this.tasks = tasks;
    },

    async createTask(newTask) {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .insert({
            user_id: newTask.user_id,
            title: newTask.title.value,
            is_complete: newTask.is_complete,
            inserted_at: newTask.inserted_at
          })
          .select()
        if (error) throw error
      } catch (error) {
        alert(error.message)
      }
    },
    
    async editTask(id, title) {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .update({ title: title })
          .eq('id', id)
        if (error) throw error
      } catch (error) {
        alert(error.message)
      }
    },

    async toogleCompleted(id, isComplete) {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .update({ is_complete: isComplete })
          .eq('id', id)
        if (error) throw error
      } catch (error) {
        alert(error.message)
      }
    },
    async deleteTask(id) {
      try {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', id)
        if (error) throw error
      } catch (error) {
        alert(error.message)
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

