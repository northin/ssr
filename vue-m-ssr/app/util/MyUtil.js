import util from './util.js'
const MyUtil = {}
MyUtil.install = function(Vue, options){
  Vue.prototype.$util = util
}

export default MyUtil
