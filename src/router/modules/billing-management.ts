export default {
  path: "/billing-management",
  redirect: "/billing-management/billing-management",
  meta: {
    icon: "informationLine",
    title: "结算管理",
    rank: 9
  },
  children: [
    {
      path: "/billing-management/billing",
      name: "BillingManagement",
      component: () => import("@/views/billing-management/index.vue"),
      meta: {
        title: "结算管理"
        // showParent: true
      }
    }
  ]
} as RouteConfigsTable;
