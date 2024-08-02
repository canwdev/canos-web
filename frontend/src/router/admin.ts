export const adminRoutes = [
  {
    path: 'system-admin',
    name: 'SystemAdminGroup',
    meta: {
      title: `System`,
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
