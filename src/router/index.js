import Vue from 'vue'
import VueRouter from 'vue-router'
const login = () => import('../views/login.vue')
const layout = () => import('../components/layout.vue')
const menu = () => import('../views/menu/index.vue')
const role = () => import('../views/role/index.vue')
const admin = () => import('../views/admin/index.vue')
const category = () => import('../views/category/index.vue')
const goods = () => import('../views/goods/index.vue')
const specs = () => import('../views/specs/index.vue')
const member = () => import('../views/member/index.vue')
const seckill = () => import('../views/seckill/index.vue')
const banner = () => import('../views/banner/index.vue')
const index = () => import('../views/index.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    children:[
      {
        path:'',//默认的子路由
        component:index,
        meta:{
          title:'首页'
        }
      },
      {
        path:'menu',
        component:menu,
        meta:{
          title:'菜单管理'
        }
      },
      {
        path:'/role',
        component:role,
        meta:{
          title:'角色管理'
        }
      },
      {
        path:'/goods',
        component:goods,
        meta:{
          title:'商品管理'
        }
      },
      {
        path:'/category',
        component:category,
        meta:{
          title:'商品分类管理'
        }
      },
      {
        path:'/specs',
        component:specs,
        meta:{
          title:'商品分类管理'
        }
      },
      {
        path:'/user',
        component:admin,
        meta:{
          title:'管理员管理'
        }
      },
      {
        path:'/member',
        component:member,
        meta:{
          title:'会员管理'
        }
      },
      {
        path:'/banner',
        component:banner,
        meta:{
          title:'轮播图管理'
        }
      },
      {
        path:'/seckill',
        component:seckill,
        meta:{
          title:'秒杀活动'
        }
      },

    ]
  },
  {
    path: '/login',
    component: login,
    meta:{
      title:"欢迎登录"
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,//固定的前缀
  routes
  
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'u-shop';
  if(to.path === '/login'){
    next()
  }else{
    let userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
    if(userInfo.token){
      //判断是否登录,就正常跳转
    next()
    }else{
      //没有登陆就回到登录页
      next('/login')
    }
    
  }
  
})
export default router
