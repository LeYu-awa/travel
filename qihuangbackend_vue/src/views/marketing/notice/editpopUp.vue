<template>
  <el-dialog :title="fromDataNew.pid && !fromDataNew.id ? fromDataNew.pName + '新增下级' : fromDataNew.id ? '编辑' : '添加'"
    :visible.sync="dialogVisible" width="40%" @close="close">
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
import { storeNoticeAdd, storeNoticeEdit } from '@/api/marketing'
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
          title: "公告标题",
          field: "title",
          value: "",
          props: {
            type: "text",
          },
          validate: [
            { required: true, message: '请输入标题', trigger: 'blur' },
          ],
        },

        {
          type: 'WangEditor',
          field: 'content',
          title: '公告内容',
          value: '',
          validate: [
            { required: true, message: '请输入公告内容', trigger: 'blur' },
          ],
        },
        {
          type: 'frame',
          field: 'image',
          title: '公告图片URL',
          value: '',
          props: {
            type: "image",
            maxLength: 1,
            title: "请选择图片：",
            src: "/admin/setting/uploadPicture?field=image&type=1",
            width: "1000px",
            height: "600px",
            footer: false,
            icon: "el-icon-camera",
            modal: {
              modal: false,
              "custom-class": "suibian-modal"
            }
          }
        },
        {
          type: 'select',
          field: 'link_type',
          title: '跳转类型',
          value: 0,
          options: [
            { "value": 0, "label": "无" },
            { "value": 1, "label": "内部" },
            { "value": 2, "label": "外部" },
            { "value": 3, "label": "商品" },
            { "value": 4, "label": "分类" },
            { "value": 5, "label": "活动" },
          ],
        },
        {
          type: 'input',
          field: 'link_url',
          title: '跳转连接',
          value: ''
        },
        {
          type: 'input',
          field: 'target_id',
          title: '目标ID',
          value: ''
        },
        {
          type: 'DatePicker',
          field: 'start_time',
          title: '开始时间',
          value: '',
          props: {
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            placeholder: "请选择活动日期",
          }
        },
        {
          type: 'DatePicker',
          field: 'end_time',
          title: '结束时间',
          value: '',
          props: {
            type: "datetime",
            format: "yyyy-MM-dd HH:mm:ss",
            placeholder: "请选择活动日期",
          }
        },
        {
          type: 'switch',
          field: 'is_show',
          title: '是否显示',
          value: 1,
          props: {
            type: "text",
            activeText: "是",
            inactiveText: "否"
          }
        },
        {
          type: 'switch',
          field: 'is_top',
          title: '是否置顶',
          value: 0,
          props: {
            type: "text",
            activeText: "是",
            inactiveText: "否"
          }
        },
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
        formData.pid = formData.pid || 0
        formData.is_show = 1
        if (formData.id) {
          this.IfupdateEditGift(formData)
        } else {
          this.IfaddstoreNoticeAdd(formData)
        }
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    IfaddstoreNoticeAdd(data) {
      storeNoticeAdd(data).then(res => {
        this.$emit('confirm')
      })
    },
    IfupdateEditGift(data) {
      storeNoticeEdit(data).then(res => {
        this.$emit('confirm')
      })
    },
  }
}
</script>
<style scoped lang="less"></style>
