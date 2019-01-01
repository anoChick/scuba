<template lang='pug'>
.container
  #formEditContainer(v-if="form")
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
      el-form-item(label="HTTPヘッダ")
        .form-param(v-for="header in form.headers" :key="header.id")
          el-col(:span="10")
            el-input(v-model="header.key" placeholder="Key" size='mini')
          el-col.line.center(:span="2") :
          el-col(:span="10")
            el-input(v-model="header.value" placeholder="Value" size='mini')
          el-col(:span="2")
            el-button.delete-button(plain type="danger" icon="el-icon-delete" @click="removePair('headers', header.id)" size='mini')
        .add-button
          el-button(round icon="el-icon-plus" @click="addPair('headers')" style="width: 80%;" size='mini') HTTPヘッダを追加
      el-form-item(label="変数")
        .form-param(v-for="variable in form.variables" :key="variable.id")
          el-col(:span="10")
            el-input(v-model="variable.key" placeholder="ラベル" size='mini')
          el-col.line.center(:span="2") :
          el-col(:span="10")
            el-input(v-model="variable.value" placeholder="変数名" size='mini')
          el-col(:span="2")
            el-button.delete-button(plain type="danger" icon="el-icon-delete" @click="removePair('variables', variable.id)" size='mini')
        .add-button
          el-button(round icon="el-icon-plus" @click="addPair('variables')" style="width: 80%;" size='mini') 変数を追加
      el-form-item(style='text-align:right;')
        el-button(@click="updateForm") 保存
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
    ...mapState(['form'])
  },
  mounted() {
    this.waitLoading(async () => {
      await this.$store.dispatch('bindForm', this.$route.params.form)
    })
  },
  methods: {
    updateForm() {
      this.$store.dispatch('updateForm', this.form);
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
    async update() {
      this.$store.dispatch('updateForm', this.form);
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
