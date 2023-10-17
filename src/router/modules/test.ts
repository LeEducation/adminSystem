export default {
  path: "/test",
  redirect: "/test/index",
  meta: {
    icon: "informationLine",
    title: "我是test目录咯",
    // showLink: false,
    rank: 9
  },
  children: [
    {
      path: "/test/test",
      name: "Test",
      component: () => import("@/views/test/test.vue"),
      meta: {
        title: "俺是test1",
        showParent: true
      }
    }
    // {
    //   path: "/test/test2",
    //   name: "Test2",
    //   component: () => import("@/views/test/test2.vue"),
    //   meta: {
    //     title: "testChildrenTitle2222222"
    //   }
    // }
  ]
} as RouteConfigsTable;
