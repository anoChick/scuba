<template lang='pug'>
  el-container
    el-header
      top-nav
    el-main
      nuxt
</template>
<script>
import TopNav from '~/components/TopNav.vue'

export default {
  components: {
    TopNav
  }
}
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
}
.el-header {
  padding: 0;
}
.clearfix:after {
    content:"";
    display:block;
    clear:both;
}
</style>
