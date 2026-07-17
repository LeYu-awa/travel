import Layout from "@/layout";
import { roterPre } from "@/settings";
const userContentRouter = {
  path: `${roterPre}/content`,
  name: "content",
  meta: {
    icon: "dashboard",
    title: "内容"
  },
  alwaysShow: true,
  component: Layout,
  children: [
    {
      path: "course",
      name: "ContentCourse",
      meta: {
        title: "课程管理",
        noCache: true
      },
      component: () => import("@/views/content/course/index"),
      children: [
        {
          path: "category",
          name: "ContentCourseCategory",
          meta: {
            title: "课程分类",
            noCache: true
          },
          component: () => import("@/views/content/course/category/index")
        },
        {
          path: "special",
          name: "ContentCourseSpecial",
          meta: {
            title: "专题管理",
            noCache: true
          },
          component: () => import("@/views/content/course/special/index"),
          children: [
            {
              path: "article",
              name: "ContentCourseSpecialArticle",
              meta: {
                title: "图文专题",
                noCache: true
              },
              component: () => import("@/views/content/course/special/article")
            },
            {
              path: "article/addArticle3/:id?",
              component: () =>
                import("@/views/content/course/special/add/addArticle"),
              name: "EditArticle3",
              meta: {
                title: "图文添加",
                noCache: true,
                activeMenu: `${roterPre}/content/course/special/article`
              },
              hidden: true
            },
            {
              path: "audio",
              name: "ContentCourseSpecialAudio",
              meta: {
                title: "音频专题",
                noCache: true
              },
              component: () => import("@/views/content/course/special/audio")
            },
            {
              path: "article/addArticle2/:id?",
              component: () =>
                import("@/views/content/course/special/add/addArticle"),
              name: "EditArticle2",
              meta: {
                title: "音频添加",
                noCache: true,
                activeMenu: `${roterPre}/content/course/special/audio`
              },
              hidden: true
            },
            {
              path: "video",
              name: "ContentCourseSpecialVideo",
              meta: {
                title: "视频专题",
                noCache: true
              },
              component: () => import("@/views/content/course/special/video")
            },
            {
              path: "article/addArticle1/:id?",
              component: () =>
                import("@/views/content/course/special/add/addArticle"),
              name: "EditArticle1",
              meta: {
                title: "视频添加",
                noCache: true,
                activeMenu: `${roterPre}/content/course/special/video`
              },
              hidden: true
            },
          ]
        },
        {
          path: "material",
          name: "ContentCourseMaterial",
          meta: {
            title: "素材管理",
            noCache: true
          },
          component: () => import("@/views/content/course/material/index")
          // children: [{
          //   path: "category",
          //   name: "ContentCourseMaterialCategory",
          //   meta: {
          //     title: "素材分类",
          //     noCache: true
          //   },
          //   component: () =>
          //     import("@/views/content/course/material/category")
          // },
          // {
          //   path: "list",
          //   name: "ContentCourseMaterialList",
          //   meta: {
          //     title: "素材列表",
          //     noCache: true
          //   },
          //   component: () => import("@/views/content/course/material/list")
          // }
          // ]
        }
      ]
    },
    {
      path: "encyclopedia",
      name: "ContentEncyclopedia",
      meta: {
        title: "百科管理",
        noCache: true
      },
      component: () => import("@/views/content/encyclopedia/index"),
      children: [
        {
          path: "acupoint",
          name: "acupoint",
          meta: {
            title: "经络穴位",
            noCache: true
          },
          component: () => import("@/views/content/encyclopedia/acupoint/index"),
          children: [

            {
              path: "handfoot",
              name: "handfoot",
              meta: {
                title: "分类",
                noCache: true
              },
              component: () => import("@/views/content/encyclopedia/acupoint/handfoot")
            },
            {
              path: "list",
              name: "list",
              meta: {
                title: "穴位",
                noCache: true
              },
              component: () => import("@/views/content/encyclopedia/acupoint/list")
            },
          ]
        },
        {
          path: "efficacy",
          name: "efficacy",
          meta: {
            title: "功效",
            noCache: true
          },
          component: () => import("@/views/content/encyclopedia/efficacy/index")
        },


        {
          path: "tcm",
          name: "tcm",
          meta: {
            title: "中医医学",
            noCache: true
          },
          component: () => import("@/views/content/encyclopedia/tcm/index"),
          children: [
            // {
            //   path: "book",
            //   name: "book",
            //   meta: {
            //     title: "医书",
            //     noCache: true
            //   },
            //   component: () =>
            //     import("@/views/content/encyclopedia/tcm/book/index"),
            //   children: [

            //   ]
            // },
            {
              path: "book/list",
              name: "book/list",
              meta: {
                title: "医书",
                noCache: true
              },
              component: () =>
                import("@/views/content/encyclopedia/tcm/book/list")
            },
            {
              path: "book/details/:id?",
              name: "book/details",
              meta: {
                title: "医书详情",
                noCache: true,
                activeMenu: `${roterPre}/content/encyclopedia/tcm/book/list`
              },
              component: () =>
                import("@/views/content/encyclopedia/tcm/book/details"),
              hidden: true
            },
            {
              path: "doctor",
              name: "doctor",
              meta: {
                title: "医家",
                noCache: true
              },
              component: () =>
                import("@/views/content/encyclopedia/tcm/doctor/index")
            },
            {
              path: "term",
              name: "term",
              meta: {
                title: "术语",
                noCache: true
              },
              component: () =>
                import("@/views/content/encyclopedia/tcm/term/index")
            },
            {
              path: "medicinalDiet",
              name: "medicinalDiet",
              meta: {
                title: "药膳",
                noCache: true
              },
              component: () =>
                import("@/views/content/encyclopedia/tcm/medicinalDiet/index"),
              children: [
                {
                  path: "category",
                  name: "category",
                  meta: {
                    title: "药膳分类",
                    noCache: true
                  },
                  component: () =>
                    import("@/views/content/encyclopedia/tcm/medicinalDiet/category")
                },
                {
                  path: "list",
                  name: "list",
                  meta: {
                    title: "药膳列表",
                    noCache: true
                  },
                  component: () =>
                    import("@/views/content/encyclopedia/tcm/medicinalDiet/list")
                },
                {
                  path: "details/:id?",
                  name: "details",
                  meta: {
                    title: "药膳详情",
                    noCache: true,
                    activeMenu: `${roterPre}/content/encyclopedia/tcm/medicinalDiet/list`
                  },
                  component: () =>
                    import("@/views/content/encyclopedia/tcm/medicinalDiet/details"),
                  hidden: true
                }
              ]
            },
            {
              path: "medicineFood",
              name: "medicineFood",
              meta: {
                title: "药食材",
                noCache: true
              },
              component: () =>
                import("@/views/content/encyclopedia/tcm/medicineFood/index"),
              children: [
                {
                  path: "category",
                  name: "category",
                  meta: {
                    title: "分类",
                    noCache: true
                  },
                  component: () =>
                    import("@/views/content/encyclopedia/tcm/medicineFood/category")
                },
                {
                  path: "efficacy",
                  name: "efficacy",
                  meta: {
                    title: "功效",
                    noCache: true
                  },
                  component: () => import("@/views/content/encyclopedia/tcm/medicineFood/efficacy")
                },
                {
                  path: "list",
                  name: "list",
                  meta: {
                    title: "列表",
                    noCache: true
                  },
                  component: () => import("@/views/content/encyclopedia/tcm/medicineFood/list")
                }
              ]
            },
          ]
        },
        {
          path: "dong",
          name: "dong",
          meta: {
            title: "董氏奇穴",
            noCache: true
          },
          component: () => import("@/views/content/encyclopedia/dong/index"),
          children: [
            {
              path: "category",
              name: "category",
              meta: {
                title: "病症分类",
                noCache: true
              },
              component: () =>
                import("@/views/content/encyclopedia/dong/category")
            },
            {
              path: "list",
              name: "list",
              meta: {
                title: "病症列表",
                noCache: true
              },
              component: () => import("@/views/content/encyclopedia/dong/list")
            }
          ]
        },
        {
          path: "other",
          name: "other",
          meta: {
            title: "其他",
            noCache: true
          },
          component: () => import("@/views/content/encyclopedia/other/index"),
          children: [
            {
              path: "category",
              name: "category",
              meta: {
                title: "分类",
                noCache: true
              },
              component: () =>
                import("@/views/content/encyclopedia/other/category")
            },
            {
              path: "list",
              name: "list",
              meta: {
                title: "关键字",
                noCache: true
              },
              component: () => import("@/views/content/encyclopedia/other/list")
            }
          ]
        },
        {
          path: "disease",
          name: "disease",
          meta: {
            title: "病症管理",
            noCache: true
          },
          component: () => import("@/views/content/encyclopedia/disease/index"),
          children: [
            {
              path: "category",
              name: "category",
              meta: {
                title: "病症分类",
                noCache: true
              },
              component: () =>
                import("@/views/content/encyclopedia/disease/category")
            },
            {
              path: "list",
              name: "list",
              meta: {
                title: "病症列表",
                noCache: true
              },
              component: () =>
                import("@/views/content/encyclopedia/disease/list")
            }
          ]
        }
      ]
    }
  ]
};

export default userContentRouter;
