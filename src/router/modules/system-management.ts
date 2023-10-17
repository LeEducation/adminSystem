export default {
  path: "/system-management",
  redirect: "/system-management/system-management",
  meta: {
    icon: "informationLine",
    title: "系统管理",
    rank: 9
  },
  children: [
    {
      path: "/system-management/system",
      name: "SystemManagement",
      component: () => import("@/views/system-management/index.vue"),
      meta: {
        title: "系统管理"
        // showParent: true
      }
    }
  ]
} as RouteConfigsTable;
