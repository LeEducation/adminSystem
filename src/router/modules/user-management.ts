export default {
  path: "/user-management",
  redirect: "/user-management/user-management",
  meta: {
    icon: "informationLine",
    title: "用户管理",
    rank: 9
  },
  children: [
    {
      path: "/user-management/teacher",
      name: "teacherManagement",
      component: () => import("@/views/user-management/teacher/index.vue"),
      meta: {
        title: "教师管理"
        // showParent: true
      }
    },
    {
      path: "/user-management/student",
      name: "studentManagement",
      component: () => import("@/views/user-management/student/index.vue"),
      meta: {
        title: "学生管理"
      }
    }
  ]
} as RouteConfigsTable;
