<template>
  <div class="divBox">
    <el-card class="box-card FromData">
      <form-create v-if="FromData" :option="option" :rule="FromData.rule" @submit="onSubmit" />
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import formCreate from '@form-create/element-ui'
import { deliveryConfigApi, uploadApi } from '@/api/systemForm'
import request from '@/api/request'
import { roterPre } from '@/settings'
export default {
  name: 'Basics',
  components: { formCreate: formCreate.$form() },
  data() {
    return {
      roterPre: roterPre,
      option: {
        form: {
          labelWidth: '150px'
        },
        global: {
          upload: {
            props: {
              onSuccess(rep, file) {
                if (rep.status === 200) { file.url = rep.data.src }
              }
            }
          }
        }
      },
      FromData: null,
      titles: ''
    }
  },
  mounted() {
    this.getFrom()
  },
  watch:{
    '$route.path': {   
      handler: function() {
        this.getFrom();
      },
      immediate: false,
      deep: true
    },
  },
  computed: {
    ...mapGetters(['menuList'])
  },
  created() {

  },
  methods: {
    getFrom() {
      deliveryConfigApi().then(async res => {
        this.FromData = res.data
      }).catch(res => {
        this.$message.error(res.message)
      })
    },
    onSubmit(formData) {
      request[this.FromData.method.toLowerCase()](this.FromData.api, formData).then((res) => {
        this.$message.success(res.message || '提交成功')
      }).catch(err => {
        this.$message.error(err.message || '提交失败')
      })
    },
  }
}
</script>

<style scoped lang="scss">
  .form-create .el-form-item__label {
    font-size: 12px !important;
  }
  .FromData ::v-deep .el-textarea__inner {
    min-height: 100px !important; 
  }
</style>
