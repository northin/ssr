import Vue from 'vue'
import Vuex from 'vuex'
import api from '../api/api'

import actions from './action'
import login from './modules/login'
Vue.use(Vuex)

const state = {
  topData:[]
}
// const actions = {
//   test(store){
//     api.userGetAll().then(res=>{
//       console.log(res)
//     })
//   }
// }
console.log(actions)
export  function createStore(){
  return new Vuex.Store({
    state,
    actions:actions,
    modules: {
      login
    }
  })
}
