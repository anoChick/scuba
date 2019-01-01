<template lang='pug'>
.container
  #editContainer(v-if="webhook")
    #editInfoContainer
      el-form
        el-form-item
          el-col(:span="22")
            el-input(v-model="webhook.title" placeholder="タイトル" size='mini')
          el-col(:span="2")
            el-button.delete-webhook-button(plain type="danger" icon="el-icon-delete" @click="deleteDialogVisible = true" size='mini')

        el-form-item
          el-input(type="textarea" v-model="webhook.description" placeholder="詳細" rows='5' size='mini')
    #editCodeContainer
      .box.editor-box
        el-form
          el-form-item
            editor(v-model="webhook.code" @init="editorInit" lang="html" theme="chrome" width="auto" height="400")
          el-form-item(style='text-align:right;')
            el-button(@click="execWebhook") 保存して実行
      .box
        el-form.spec
          b テストリクエスト
          .method
            span.title メソッド
            .method-wrap
              el-form-item
                el-select(v-model="webhook.spec.method"  placeholder="Method" size='mini')
                  el-option(
                    v-for="method in this.methods"
                    :key="method"
                    :label="method"
                    :value="method"
                  )
          .params
            span.title パラメータ
            .param-wrap
              .param-list
                el-form-item(v-for="(param, index) in webhook.spec.params" :key="param.id")
                    el-col(:span="10")
                      el-input(v-model="param.key" placeholder="Key" size='mini')
                    el-col.colon(:span="2") :
                    el-col(:span="10")
                      el-input(v-model="param.value" placeholder="Value" size='mini')
                    el-col(:span="2")
                      el-button.delete-param-button(plain type="danger" icon="el-icon-delete" @click="removeParam(param.id)" size='mini')
              .param-button
                el-button(round icon="el-icon-plus" @click="addParam" style="width: 80%;" size='mini') パラメータを追加
        .result
          b 結果
          .result-body {{result}}
  el-dialog(
    title="Webhookを削除"
    :visible.sync="deleteDialogVisible"
    width="30%"
    center
  )
    span 本当に削除しますか？
    span.dialog-footer(slot='footer')
      el-button(@click="deleteDialogVisible = false") キャンセル
      el-button(type="danger" @click="deleteWebhook()") 削除
</template>
<script>
import { mapState } from 'vuex'
import vue2AceEditor from 'vue2-ace-editor';
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
  components: {
      editor: vue2AceEditor,
  },
  computed: {
    ...mapState(['webhook'])
  },
  mounted() {
    this.waitLoading(async () => {
      await this.$store.dispatch('bindWebhook', this.$route.params.webhook)
    })
  },
  methods: {
    deleteWebhook() {
      this.$store.dispatch('deleteWebhook', this.webhook.id);
      this.$router.push('/webhooks')
    },
    removeParam(index) {
      this.webhook.spec.params = this.webhook.spec.params.filter(param => param.id != index)
    },
    addParam() {
      this.webhook.spec.params.push({
        id: IDGenerator.generate(),
        key:'',
        value:''
      })
    },
    async update() {
      this.$store.dispatch('updateWebhook', this.webhook);
    },
    editorInit: function () {

    },
    params() {
      let paramsResult = {}
      this.webhook.spec.params.forEach(param => {
        paramsResult[param.key] = param.value
      });
      paramsResult.code = this.webhook.code;
      return paramsResult
    },
    async execWebhook() {
      const method = this.webhook.spec.method
      await this.update();
      let result = null
      if(method == 'GET' || method == 'DELETE'){
        result = await this.$axios[`$${this.webhook.spec.method.toLowerCase()}`](`https://us-central1-anochick-scuba.cloudfunctions.net/webhook/${this.webhook.id}`,{params: this.params()})
      }else{
        result = await this.$axios[`$${this.webhook.spec.method.toLowerCase()}`](`https://us-central1-anochick-scuba.cloudfunctions.net/webhook/${this.webhook.id}`,this.params())
      }

      this.result = result;
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
#editInfoContainer
  .delete-webhook-button
    margin-left: 10px
#editCodeContainer
  display: flex
  justify-content: space-around
  .el-form-item
    margin-bottom: 8px
  .box
    width: 50%
    flex-grow: 1
  .editor-box
    padding-right: 8px
    margin-right: 8px
    border-right: 1px solid #ddd
  .spec
    .title
      padding-top: 8px
      margin: 8px 0
      display: block
      border-bottom: 1px solid #ddd
    .colon
      text-align: center
    .param-button
      text-align: center

    .delete-param-button
      margin-left: 10px
      padding: 6px 10px
  .result
    margin: 16px 0
    padding: 16px 0
    border-top: 1px solid #ddd
    .result-body
      margin: 16px 0
</style>
