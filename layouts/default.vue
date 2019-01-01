<template lang='pug'>
  el-container
    el-header
      top-nav
    el-main
      nuxt
</template>
<script>
import TopNav from '~/components/TopNav.vue'
import firebase from 'firebase'
export default {
  components: {
    TopNav
  },
  async mounted () {
    let user = await new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged((user) => resolve(user))
    })

    if (user) {
      this.$store.dispatch("setUser", user)
      this.$router.push('/')
    }
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
