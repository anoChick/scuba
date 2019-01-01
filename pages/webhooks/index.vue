<template lang='pug'>
div#webhookIndexContainer
  el-form
    el-form-item
      el-button(type="primary" @click="createWebhook()") Webhook新規作成
  el-row(:gutter="16")
    el-col(:span="8" v-for="webhook in webhooks" :key="webhook.id")
        el-card.card(shadow="never")
          nuxt-link.title(:to="`/webhooks/${webhook.id}/edit`") {{webhook.title}}
          p.description {{webhook.description}}
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
    ...mapState(['webhooks'])
  },
  destroyed() {
    this.$store.dispatch('unbindWebhooks')
  },
  mounted() {
    this.waitLoading(async () => {
      await this.$store.dispatch('bindWebhooks')
    })
  },
  methods: {
    async createWebhook() {
      const id = IDGenerator.generate();
      await this.$store.dispatch('createWebhook', {
        id: id,
        title: '新しいWebhook',
        description: '',
        code: 'res.send(`Hello, ${req.query.name}!`);',
        spec: {
          method: 'GET',
          params: [
            {
              id: IDGenerator.generate(),
              key: 'name',
              value: 'Cat'
            }
          ]
        }
      })
      this.$router.push(`/webhooks/${id}/edit`)

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
#webhookIndexContainer
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
