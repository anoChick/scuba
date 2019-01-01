<template lang='pug'>
el-menu.top-nav(default-active=1 mode="horizontal")
  el-menu-item(index=1)
    nuxt-link(to='/')
      b Scuba
  el-menu-item(index=2)
    nuxt-link(to='/webhooks') Webhooks
  el-menu-item.user-menu-item(v-if="!currentUser" index=9  @click.native="login") ログイン
  el-submenu.user-menu-item(v-if="currentUser" index=9 )
    template(slot="title")
      img.avatar(:src='currentUser.photoURL')
      span {{currentUser.email}}
    el-menu-item(index="3-1" @click.native="logout") ログアウト

</template>
<script>
import firebase from 'firebase'
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    login() {
      const provider = new firebase.auth.GoogleAuthProvider()
      console.log(this.$fireAuth.signInWithRedirect(provider))
    },
    logout() {
      this.$fireAuth.signOut()
      location.href = '/'
    }
  }
}
</script>

<style lang='sass'>
.top-nav
  img.avatar
    height: 32px
    width: 32px
    border-radius: 16px
    margin-right: 8px
  .user-menu-item
    float:right !important
  .el-menu-item
    a
      margin: 0 -20px
      padding: 20px
      text-decoration: none

</style>
