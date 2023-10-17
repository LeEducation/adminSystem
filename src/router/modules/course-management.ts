export default {
  path: "/course-management",
  redirect: "/course-management/course-management",
  meta: {
    icon: "informationLine",
    title: "课程管理",
    rank: 9
  },
  children: [
    {
      path: "/course-management/course",
      name: "CourseManagement",
      component: () => import("@/views/course-management/course/index.vue"),
      meta: {
        title: "课程管理"
        // showParent: true
      }
    },
    {
      path: "/course-management/event",
      name: "EventManagement",
      component: () => import("@/views/course-management/event/index.vue"),
      meta: {
        title: "活动管理"
      }
    }
  ]
} as RouteConfigsTable;
