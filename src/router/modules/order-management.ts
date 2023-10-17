export default {
  path: "/order-management",
  redirect: "/order-management/order-management",
  meta: {
    icon: "informationLine",
    title: "订单管理",
    rank: 9
  },
  children: [
    {
      path: "/order-management/order",
      name: "OrderManagement",
      component: () => import("@/views/order-management/index.vue"),
      meta: {
        title: "订单管理"
        // showParent: true
      }
    }
  ]
} as RouteConfigsTable;
