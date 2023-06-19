import { createRouter, createWebHistory } from 'vue-router'
import MajorScreen from '@/views/MajorScreen.vue'
import TasksScreen from '@/views/TasksScreen.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MajorScreen
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksScreen
    }
  ]
})

export default router
