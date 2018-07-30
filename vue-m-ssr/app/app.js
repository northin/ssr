import Vue from 'vue'
import App from "./App.vue"
import createRouter from "./router/index.js"
import { createStore } from './store/index.js'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import myUtil from './util/MyUtil'

Vue.use(ElementUI)
Vue.use(myUtil)
export  function createServerApp (){
    const router = createRouter()
    const store = createStore()

    // 同步路由状态(route state)到 store
    sync(store, router)

    const app = new Vue({
        router,
        store,
        // el:"#app"
        render: h => h(App)
        // template: '<App/>',
    })
    return {app,router,store}
}
// export  function createClientApp (){
//     return new Vue({
//         el: '#app',
//         // router,
//         // store,
//         template: '<App/>',
//         components: { App }
//     })
// }

