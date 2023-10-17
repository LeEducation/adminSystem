export default {
  path: "/course-management",
  redirect: "/course-management/index",
  meta: {
    icon: "informationLine",
    title: "课程管理咯咯咯",
    rank: 9
  },
  children: [
    {
      path: "/course-management/index",
      name: "CourseManagement",
      component: () => import("@/views/course-management/index.vue"),
      meta: {
        title: "课程管理1",
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
