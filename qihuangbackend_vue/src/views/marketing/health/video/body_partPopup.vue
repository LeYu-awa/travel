<template>
  <el-dialog :title="fromDataNew.pid && !fromDataNew.id ? fromDataNew.pName + '新增下级' : fromDataNew.id ? '编辑' : '添加'" :visible.sync="dialogVisible" width="40%" @close="close">
    <form-create v-if="FormData" ref="fc" v-loading="loading" :option="option" :rule="FormData" class="formBox"
      handle-icon="false" v-model="fApi" :value.sync="fromDataNew">
    </form-create>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="onSubmitForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { bodyPartAdd, bodyPartEdit } from '@/api/marketing'
import { getToken } from "@/utils/auth";
import dFrom from '@/components/dFrom/dFrom.vue'
import formCreate from '@form-create/element-ui'
export default {
  components: {
    dFrom,
    formCreate: formCreate.$form()
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    fromData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      option: {
        form: {
          labelWidth: '150px'
        },
        submitBtn: false,
        global: {
          upload: {
            props: {
              onSuccess: (rep, file) => {
                if (rep.status === 200) {
                  file.url = rep.data.src
                } else {
                  this.$message.error(rep.message || '上传失败')
                }
              }
            }
          }
        }
      },
      FormData: [
        {
          type: "input",
          title: "部位名称",
          field: "name",
          value: "",
          props: {
            type: "text",
          },
          validate: [
            { required: true, message: '请输入部位名称', trigger: 'blur' },
          ],
        },

        // {
        //   type: 'input',
        //   field: 'parent_id',
        //   title: '父级部位ID',
        //   value: '',
         
        // },
      
      
       {
         type: 'input',
         field: 'sort',
         title: '排序',
         value: ''
       },

      ],
      fApi: {
        name: '123456'
      },
    }
  },
  computed: {
    fromDataNew: {
      get() {
        return this.fromData;
      },
      set(v) { }
    }
  },
  mounted() {

  },
  methods: {
    modalPicTap(key) {
      const _this = this
      _this.$modalUpload(function (img) {
        console.log(img)
        _this.fromDataNew.logo = img[0]
      })
    },
    close() {
      this.$emit('close')
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        formData.parent_id = 0
        if (formData.id) {
          this.IfupdateEditGift(formData)
        } else {
          this.IfaddbodyPartAdd(formData)
        }
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    IfaddbodyPartAdd(data) {
      bodyPartAdd(data).then(res => {
        this.$emit('confirm')
      })
    },
    IfupdateEditGift(data) {
      bodyPartEdit(data).then(res => {
        this.$emit('confirm')
      })
    },
  }
}
</script>
<style scoped lang="less"></style>
