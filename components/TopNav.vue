<template lang='pug'>
el-menu(:default-active="activeIndex" mode="horizontal" @select="handleSelect")
  el-menu-item(index='1')
    nuxt-link(to='/') Scuba
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
