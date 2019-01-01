<template lang='pug'>
div#formIndexContainer
  el-form
    el-form-item
      el-button(type="primary" @click="createForm()") Form新規作成
  el-row(:gutter="16")
    el-col(:span="8" v-for="form in forms" :key="form.id")
        el-card.card(shadow="never")
          nuxt-link.title(:to="`/forms/${form.id}/edit`") {{form.title}}
          p.description {{form.description}}
</template>
<script>
import { mapState } from 'vuex'
import IDGenerator from '~/libs/id-generator'

export default {
  data() {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState(['forms'])
  },
  destroyed() {
    this.$store.dispatch('unbindForms')
  },
  mounted() {
    this.waitLoading(async () => {
      await this.$store.dispatch('bindForms')
    })
  },
  methods: {

    async createForm() {
      const id = IDGenerator.generate();
      await this.$store.dispatch('createForm', {
        id: id,
        title: '新しいForm',
        description: '',
        url: 'https://example.com',
        method: 'GET',
        params: [
          {
            id: IDGenerator.generate(),
            key: '',
            value: ''
          }
        ],
        headers: [
          {
            id: IDGenerator.generate(),
            key: '',
            value: ''
          }
        ],
        variables: [
          {
            id: IDGenerator.generate(),
            label: '',
            name: ''
          }
        ]
      })
      this.$router.push(`/forms/${id}/edit`)

    },
    async waitLoading(process) {
      this.loading = true
      await process()
      this.loading = false
    }
  }
}
</script>
<style lang='sass'>
#formIndexContainer
  .card
    margin-bottom: 16px
    .title
      color: #409EFF
      text-decoration: none
    p.description
      font-size: 14px
      height: 60px
      display: -webkit-box
      -webkit-box-orient: vertical
      -webkit-line-clamp: 3
      overflow: hidden
</style>
