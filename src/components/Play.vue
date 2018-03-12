<template>
  <div>
    <text class="message">play</text>
    <text @click="back(link)">返回</text>
  </div>
</template>

<script>
export default {
  name: 'play',
  data () {
    return {
      link: '/'
    }
  },
  methods: {
    back (path) {
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