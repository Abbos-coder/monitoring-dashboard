import type {RouteRecordRaw} from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    children: [
      {
        path: 'monitoring',
        name: 'Monitoring',
        children: [
          {
            path: 'online-users',
            name: 'OnlineUsers',
            meta: { layout: MainLayout },
            component: () => import('@/pages/Monitoring/OnlineUsers.vue')
          },
          {
            path: 'clients',
            name: 'Clients',
            meta: { layout: MainLayout },
            component: () => import('@/pages/Monitoring/ClientsView.vue')
          },
          {
            path: 'deactivated-clients',
            name: 'DeactivatedClients',
            meta: { layout: MainLayout },
            component: () => import('@/pages/Monitoring/DeactivatedClients.vue')
          },
        ]
      },

      {
        path: 'login',
        name: 'Login',
        meta: { layout: DefaultLayout },
        component: () => import('@/pages/LoginPage.vue')
      }
    ]
  },
  { path: '/', redirect: { name: 'OnlineUsers' } },
]