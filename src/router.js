import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Play from '@/components/Play'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/play',
      name: 'Play',
      component: Play
    }
  ]
})
