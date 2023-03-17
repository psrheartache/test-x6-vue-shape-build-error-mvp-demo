import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'X6',
    component: () => import('@/views/automated-processes/index.vue'),
    meta: { title: '' },
  },
  {
    name: 'notFound',
    path: '/:path(.*)+',
    redirect: {
      path: '/main',
    },
  },
]

const router = createRouter({
  routes,
  history: createWebHistory(),
})

export default router
