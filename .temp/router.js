import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Play from '@/components/Play'
// eslint-disable-next-line
Vue.use(Router)

const router = new Router({
  saveScrollPosition: true,
  scrollBehavior: () => ({
    x: 0, y: 0
  }),
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/play/:id',
      name: 'Play',
      component: Play,
      props: true, // 通过props传值，在页面上通过props和this.$route.params都可以取到值
      // 此路由独享的前置守卫
      beforeEnter: (to, from, next) => {
        console.log(to, from)
        next()
      },
      meta: { requiresAuth: true } // 路由元数据
    }
  ]
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log(to, from, next)
  next()
})

// 全局后置守卫，没有next
router.afterEach((to, from) => {
  // ...
})

module.exports = router
