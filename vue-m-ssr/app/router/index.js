import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '.././components/HelloWorld.vue'

// import Moblie from '.././view/Mobile.vue'
// import Index from '.././view/Index.vue'
// import Project from '.././view/Project'
import { createStore } from '.././store/index.js'
const store = createStore()
//const HelloWorld = () => import(/* webpackChunkName: "group-foo" */ '@/components/HelloWorld')
//const Moblie = () => import(/* webpackChunkName: "group-foo" */ '@/view/Mobile')
//const Index = () => import( webpackChunkName: "group-foo"  '@/view/Index')
//const Project = () => import(/* webpackChunkName: "group-foo" */ '@/view/Project')
// const store = () => import(/* webpackChunkName: "group-foo" */ '@/store/index')

Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import('.././view/Index.vue')
    },{
      path: '/Moblie',
      name: 'Moblie',
      component: () => import('.././view/Index.vue')
    },{
      path: '/Hello',
      name: 'Hello',
      component: () => import('.././view/Index.vue')
    },{
      path: '/Project/:routerId',
      name: 'Project',
      meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('.././view/Project.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = ''
  if (process.env.VUE_ENV !== 'server') {
    
    token = window.sessionStorage.getItem('token')
    
  }
  // let token = store.state.login.token;
    //判断要去的路由有没有requiresAuth
  console.log(to.meta.requireAuth);
  if(to.meta.requireAuth){
    console.log(token)
    if(token){
      next();
    }else{
      next({
        path: '/',
        query: {redirect: to.path}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  }else{
    next();//如果无需token,那么随它去吧
  }
})
export default function createRouter(){
  return router
}
// export default 
