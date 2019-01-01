<template lang='pug'>
el-menu(default-active=1 mode="horizontal")
  el-menu-item(index=1)
    nuxt-link(to='/')
      b Scuba
  el-menu-item(index=2)
    nuxt-link(to='/webhooks') Webhooks
</template>
<script>
export default {

}
</script>

<style>
.el-menu-item a {
  margin: 0 -20px;
  padding:20px;
  text-decoration: none;
}
</style>
