<template lang='pug'>
.container
  #formEditContainer(v-if="form")
    .link-wrap(style='text-align:right;')
      nuxt-link.link(:to="`/forms/${form.id}/form`") フォーム画面へ
    el-form(label-position='top')
      el-form-item(label="タイトル")
        el-input(v-model="form.title" size='mini')
      el-form-item(label="詳細")
        el-input(type='textarea' v-model="form.description" rows='5' size='mini')
      el-form-item(label="URL")
        el-input(v-model="form.url" size='mini')
      el-form-item(label="メソッド")
        el-form-item
          el-select(v-model="form.method" size='mini')
            el-option(
              v-for="method in this.methods"
              :key="method"
              :label="method"
              :value="method"
            )
      el-form-item(label="パラメータ")
        .form-param(v-for="param in form.params" :key="param.id")
          el-col(:span="10")
            el-input(v-model="param.key" placeholder="Key" size='mini')
          el-col.line.center(:span="2") :
          el-col(:span="10")
            el-input(v-model="param.value" placeholder="Value" size='mini')
          el-col(:span="2")
            el-button.delete-button(plain type="danger" icon="el-icon-delete" @click="removePair('params', param.id)" size='mini')
        .add-button
          el-button(round icon="el-icon-plus" @click="addPair('params')" style="width: 80%;" size='mini') パラメータを追加
      //- el-form-item(label="HTTPヘッダ")
      //-   .form-param(v-for="header in form.headers" :key="header.id")
      //-     el-col(:span="10")
      //-       el-input(v-model="header.key" placeholder="Key" size='mini')
      //-     el-col.line.center(:span="2") :
      //-     el-col(:span="10")
      //-       el-input(v-model="header.value" placeholder="Value" size='mini')
      //-     el-col(:span="2")
      //-       el-button.delete-button(plain type="danger" icon="el-icon-delete" @click="removePair('headers', header.id)" size='mini')
      //-   .add-button
      //-     el-button(round icon="el-icon-plus" @click="addPair('headers')" style="width: 80%;" size='mini') HTTPヘッダを追加
      el-form-item(label="変数")
        .form-param(v-for="variable in form.variables" :key="variable.id")
          el-col(:span="10")
            el-input(v-model="variable.label" placeholder="ラベル" size='mini')
          el-col.line.center(:span="2") :
          el-col(:span="10")
            el-input(v-model="variable.name" placeholder="変数名" size='mini')
          el-col(:span="2")
            el-button.delete-button(plain type="danger" icon="el-icon-delete" @click="removePair('variables', variable.id)" size='mini')
        .add-button
          el-button(round icon="el-icon-plus" @click="addPair('variables')" style="width: 80%;" size='mini') 変数を追加
      el-form-item(style='text-align:right;')
        el-button(icon="el-icon-delete" @click="deleteDialogVisible = true" type='danger' style='float:left;') 削除
        el-button(@click="updateForm") 保存
  el-dialog(
    title="Formを削除"
    :visible.sync="deleteDialogVisible"
    width="30%"
    center
  )
    span 本当に削除しますか？
    span.dialog-footer(slot='footer')
      el-button(@click="deleteDialogVisible = false") キャンセル
      el-button(type="danger" @click="deleteForm()") 削除
</template>
<script>
import { mapState } from 'vuex'
import IDGenerator from '~/libs/id-generator'

export default {
  data () {
    return {
      deleteDialogVisible: false,
      loading: false,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    }
  },
  computed: {
    ...mapState(['form'])
  },
  mounted() {
    this.waitLoading(async () => {
      await this.$store.dispatch('bindForm', this.$route.params.form)
    })
  },
  methods: {
    updateForm() {
      this.$store.dispatch('updateForm', this.form)
    },
    deleteForm() {
      this.$store.dispatch('deleteForm', this.form.id)
      this.$router.push('/forms')
    },
    addPair(type) {
      this.form[type].push(this.defaultPair(type))
    },
    removePair(type, id){
      this.form[type] = this.form[type].filter(pair => pair.id != id)
    },
    defaultPair(type) {
      if(type =='variable'){
        return {
          id: IDGenerator.generate(),
          label:'',
          name:''
        }
      }else {
        return {
          id: IDGenerator.generate(),
          key:'',
          value:''
        }
      }
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
#formEditContainer
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
