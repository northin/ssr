import {createServerApp} from './app.js'
import Vue from 'vue'
const { app, router, store } = createServerApp()


Vue.mixin({
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    beforeRouteUpdate (to, from, next) {
      const { asyncData } = this.$options
      if (asyncData) {
          // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
        asyncData({
          store: this.$store,
          route: to
        }).then(next).catch(next)
      } else {
        next()
      }
    }
  })
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
//   在路由完成初始导航时调用，这意味着它可以解析所有的异步进入钩子和路由初始化相关联的异步组件。
router.onReady(() => {
    // 添加路由钩子函数，用于处理 asyncData.
  // 在初始路由 resolve 后执行，
  // 以便我们不会二次预取(double-fetch)已有的数据。
  // 使用 `router.beforeResolve()`，以便确保所有异步组件都 resolve。
    router.beforeResolve((to,from ,next) => {
        // 返回目标位置或是当前路由匹配的组件数组 (是数组的定义/构造类，不是实例)
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)
        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        if (!activated.length) {
            return next()
        }

        // 这里如果有加载指示器(loading indicator)，就触发

        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {

        // 停止加载指示器(loading indicator)

            next()
        }).catch(next)
    
    })
    app.$mount('#app');
})