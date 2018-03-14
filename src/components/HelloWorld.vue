<template>
  <div>
    <text class="message">Now, let's use Vue.js to build your Weex app.</text>
    <text @click="jump(link)">跳转</text>
  </div>
</template>

<script>
import weex from 'weex-vue-render'
export default {
  name: 'HelloWorld',
  data () {
    return {
      link: '/play/12'
    }
  },
  created () {
    // console.log(this)
    console.log(weex)
    const navigator = weex.requireModule('navigator')
    console.log(navigator)
    console.log(weex.config.env)
    console.log(weex.support('@component/slider'))
    const modal = weex.requireModule('modal')
    modal.toast({
      message: 'This is a toast',
      duration: 3
    })
  },
  methods: {
    jump (path) {
      // const navigator = weex.requireModule('navigator')
      // alert(path)
      // alert(navigator)
      // navigator
      //   ? navigator.push({
      //     url: path,
      //     animated: 'true'
      //   })
      //   :
      this.$router.push(path) // 使用vue-router
    }
  }
}
</script>

<style scoped>
  .weex-toast {
    width: 80%;
    color: red !important;
  }
</style>
