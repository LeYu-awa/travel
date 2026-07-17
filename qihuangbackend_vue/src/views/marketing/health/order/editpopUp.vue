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
import { healthVideoOrderEdit } from '@/api/marketing'
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
          type: "select",
          title: "支付状态",
          field: "pay_status",
          value: "",
          props: {
            type: "text",
          },
         options: [
            { "value": 0, "label": "未支付" },
            { "value": 1, "label": "已支付" },
            { "value": 2, "label": "已退款" },
          ],
        },
        {
          type: 'select',
          field: 'order_status',
          title: '订单状态',
          value: '',
           options: [
            { "value": 0, "label": "未支付" },
            { "value": 1, "label": "已支付" },
            { "value": 2, "label": "已取消" },
            { "value": 3, "label": "已退款" },
          ],
        },
         {
          type: 'select',
          field: 'pay_type',
          title: '支付方式',
          value: '',
           options: [
            { "value": 'weixin', "label": "weixin" },
            { "value": 'alipay', "label": "alipay" },
            { "value": 'balance', "label": "balance" },
          ],
        },
         {
          type: 'input',
          field: 'remark',
          title: '备注',
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
        formData.pid = formData.pid || 0
        formData.is_show = 1
        if (formData.id) {
          this.IfupdateEditGift(formData)
        } 
      })
    },
    cancel() {
      this.$emit('cancel')
    },
   
    IfupdateEditGift(data) {
      healthVideoOrderEdit(data).then(res => {
        this.$emit('confirm')
      })
    },
  }
}
</script>
<style scoped lang="less"></style>
