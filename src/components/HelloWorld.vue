<template>
  <div>
    <text class="message">Now, let's use Vue.js to build your Weex app.</text>
    <text @click="jump(link)">跳转</text>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      link: 'play'
    }
  },
  methods: {
    jump (path) {
      // const navigator = weex.registerModule('navigator')
      // // alert(path)
      // // alert(navigator)
      // navigator
      //   ? navigator.push({
      //     url: path,
      //     animated: 'true'
      //   }) :
      this.$router.push(path) // 使用vue-router
    }
  }
}
</script>
