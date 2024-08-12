export const adminRoutes = [
  {
    path: 'admin',
    redirect: '/system32/home',
    name: 'AdminManageGroup',
    meta: {
      title: `Manage`,
    },
    children: [
      {
        path: 'admin-users',
        name: 'AdminUsers',
        component: () => import('@/views/Admin/Users/UserList.vue'),
        meta: {
          title: `Admin Users`,
        },
      },
    ],
  },
]
