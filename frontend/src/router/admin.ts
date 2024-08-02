export const adminRoutes = [
  {
    path: 'manage',
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
