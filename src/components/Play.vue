<template>
  <div>
    <text class="message">play{{Id}}</text>
    <text @click="back(link)">返回</text>
    <text @click="nextTo">下一个</text>
  </div>
</template>

<script>
export default {
  name: 'play',
  props: { // 添加props，即可从路由的props中取得指定的值
    id: {
      type: String,
      default: '1'
    }
  },
  data (props) {
    return {
      link: '/',
      Id: +props.id
    }
  },
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用

    // 提取路由元数据，遍历 $route.matched 来检查路由记录中的 meta 字段
    if (to.matched.some(record => record.meta.requiresAuth)) {

    }

    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    next(vm => {
      // 通过 `vm` 访问组件实例
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    next() // 写这个方法的话必须要调用next方法，不然路由更新不生效
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    // next(false) // 可以取消离开
    next() // 写这个方法的话必须要调用next方法，不然跳转不生效
  },
  created () {
    const params = this.$route.params
    console.log(params)
    console.log(this.Id) // 可以取到路由中传递的值
  },
  methods: {
    back (path) {
      // const navigator = weex.registerModule('navigator')
      console.log(path)
      // // alert(navigator)
      // navigator
      //   ? navigator.push({
      //     url: path,
      //     animated: 'true'
      //   }) :
      this.$router.push(path) // 使用vue-router
    },
    nextTo () {
      this.Id += 1
      console.log(this.Id)
      this.$router.push(`/play/${this.Id}`)
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法，没有有next方法
    '$route': (to, from) => {
      console.log(to, from)
    }
  }
}
</script>
