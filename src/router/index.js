import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Layout from '../views/layout/index.vue'
import { getUser } from '../utils/storage.js'
import Articles from '../views/articles/index.vue'
import addArticles from '../views/articles/add.vue'
import NotFound from '../views/page404/index.vue'
Vue.use(VueRouter)

const routes = [
 {path:'/login',component:Login},
 {path:'/',component:Layout,
  children:[
    {path:'/articles',component:Articles},
    {path:'/addArticle',component:addArticles}
  ]
  },
  {path:'*',component:NotFound}
]

const router = new VueRouter({
  routes
})


/*
路由导航守卫
所有的路由页面中跳转，都会先进入到这个函数中来，
to要跳入的路由信息你要去哪里
from 要跳出的路由信息你从哪里来
next 放心方法
next()正确的跳转允许进入到to路由
next(路由地址)不允许去to而转去指定的路由地址
*/
router.beforeEach((to,from,next)=>{
  //console.log('路由导航守卫，to，from，next)
  if (to.path ==='/') {
    //alert('有人马上要进入主页')
    //检查是否有登录信息，看localStorage是否有保存信息
    const userInfo = getUser()
    if (userInfo && userInfo.token) {
      next()
    }else {
      console.log('路由导航守卫：你没有登录，请回去')
      //没有就回去登录
      next('/login')
    }
  }else {
    //如果不是去主页，直接放行
    next()
  }
})
export default router