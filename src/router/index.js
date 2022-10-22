import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      children: [
        {
          path: '/:id',
          name: 'edit',
          component: () => import('../components/EditToDo.vue'),
          params: true
        }
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: () => import('../components/Auth.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../components/DashBoard.vue')

    }
  ]
})

export default router