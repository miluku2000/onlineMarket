import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/charts/map',
    component: () => import('@/views/charts/map'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/gridManage',
    children: [
      {
        path: '/gridManage',
        component: () => import('@/views/gridManage/index'),
        name: 'GridManage',
        meta: {
          title: '组织管理',
          noCache: false,
          icon: 'el-icon-s-grid'
        }
      }
    ]
  },
  {
    path: '/householdManage',
    component: Layout,
    redirect: '/householdManage',
    children: [
      {
        path: '/householdManage',
        component: () => import('@/views/householdManage/index'),
        name: 'HouseholdManage',
        meta: {
          title: '住户管理 ',
          noCache: false,
          icon: 'el-icon-s-home'
        }
      }
    ]
  },
  {
    path: '/labelManage',
    component: Layout,
    redirect: '/labelManage',
    children: [
      {
        path: '/labelManage',
        component: () => import('@/views/labelManage/index'),
        name: 'LabelManage',
        meta: {
          title: '标签管理 ',
          noCache: true,
          icon: 'icon'
        }
      }
    ]
  },
  {
    path: '/peopleManage',
    component: Layout,
    redirect: '/peopleManage',
    children: [
      {
        path: '/peopleManage',
        component: () => import('@/views/peopleManage/index'),
        name: 'PeopleManage',
        meta: {
          title: '人员管理 ',
          noCache: true,
          icon: 'icon'
        }
      }
    ]
  },
  {
    path: '/eventManage',
    component: Layout,
    redirect: '/eventManage',
    children: [
      {
        path: '/eventManage',
        component: () => import('@/views/eventManage/index'),
        name: 'eventManage',
        meta: {
          title: '活动管理 ',
          noCache: true,
          icon: 'icon'
        }
      }
    ]
  },
  {
    path: '/menuManage',
    component: Layout,
    redirect: '/menuManage',
    children: [
      {
        path: '/menuManage',
        component: () => import('@/views/menuManage/index'),
        name: 'menuManage',
        meta: {
          title: '菜单管理 ',
          noCache: true,
          icon: 'icon'
        }
      }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
      y: 0
    }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
