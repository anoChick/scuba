<template lang='pug'>
.container
  #formShowContainer(v-if="form")
    .link-wrap(v-if="currentUser")
      nuxt-link.link(:to="`/forms/${form.id}/edit`") 編集画面へ
    h3 {{form.title}}
    el-form
      el-form-item(:label="variable.label" v-for="variable in form.variables" :key="variable.id")
        el-input(v-model="variable.value" placeholder="変数名" size='mini')
      el-form-item
        el-button(style='width:100%;' @click="execute") 送信

</template>
<script>
import { mapState } from 'vuex'
import IDGenerator from '~/libs/id-generator'

export default {
  data () {
    return {
      deleteDialogVisible: false,
      loading: false,
      result: '[未実行]',
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    }
  },
  computed: {
    ...mapState(['form', 'currentUser'])
  },
  mounted() {
    this.waitLoading(async () => {
      await this.$store.dispatch('bindForm', this.$route.params.form)
    })
  },
  methods: {
    async execute() {
      const method = this.form.method

      const methodName = `$${method.toLowerCase()}`
      this.injectVariables(this.form.url)
      let result = null
      if(method == 'GET' || method == 'DELETE'){
        result = await this.$axios[methodName](this.endpointURL(),{params: this.params()})
      }else{
        result = await this.$axios[methodName](this.endpointURL(),this.params())
      }
    },
    params() {
      let paramsResult = {}
      this.form.params.forEach(param => {
        paramsResult[param.key] = this.injectVariables(param.value);
      });
      return paramsResult
    },
    endpointURL() {
      this.injectVariables(this.form.url)
    },
    injectVariables(str) {
      this.form.variables.forEach(variable => {
        const reg = new RegExp(`{${variable.name}}`, "g")
        str = str.replace(reg, variable.value)
      })

      return str
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
#formShowContainer
  .link
    color: #409EFF
    text-decoration: none
  .center
    text-align: center
  .el-form-item
    margin-bottom: 8px
    .el-form-item__label
      line-height: 20px
      padding: 4px
  .add-button
    text-align: center
  .delete-button
    margin-left: 10px
    padding: 6px 10px
</style>
