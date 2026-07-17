<template>
  <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%" @close="close">
    <form-create
        v-if="FormData"
        ref="fc"
        v-loading="loading"
        :option="option"
        :rule="FormData"
        class="formBox"
        handle-icon="false"
        v-model="fApi"
        :value.sync="fromDataNew"
      >
      <template slot="type-field-component" slot-scope="scope">
        <div class="upLoadPicBox" @click="modalPicTap">
          <div v-if="scope.model.value" class="pictrue"><img :src="scope.model.value"></div>
          <div v-else class="upLoad">
            <i class="el-icon-camera cameraIconfont" />
          </div>
        </div>
      </template>
    </form-create>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="onSubmitForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addGift, editGift } from '@/api/liveStreamingManage'
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
        submitBtn:false,
        global: {
          upload: {
            props: {
              onSuccess:(rep, file)=> {
                if (rep.status === 200) {
                  file.url = rep.data.src
                }else {
                  this.$message.error(rep.message || '上传失败')
                }
              }
            }
          }
        }
      },
      FormData: [
          
        {
            type:'fieldComponent',
            field:'image',
            title:'图片',
            value:''
        },
        // {
        //   type: "upload",
        //   field: "image",
        //   title: "图片",
        //   value: [],
        //   props: {
        //       type:"upload",
        //       uploadType:"file",
        //       action: "https://qh.cg24.cn/sys/config/setting/update_name/file.html",
        //       name:"file",
        //       multiple: false,
        //       accept:"file",
        //       limit: 1, 
        //       headers: {
        //       "X-Token": getToken()
        //       },
        //   },
        // },
        {
          type: "upload",
          field: "svga",
          title: "动画文件",
          value: [],
          props: {
              type:"upload",
              uploadType:"file",
              action: "https://qh.cg24.cn/sys/community/topic/upLoadImg",
              headers: {
              "X-Token": getToken()
              },
              name:"file",
              multiple: false,//是否支持多选文件
              accept:"file",
              limit:1
          },
        },
        {
            type:"input",
            title:"礼物名称",
            field:"name",
            value:"",
            props: {
                type: "text",
            },
            validate:[
                { required: true, message: '请输入礼物名称', trigger: 'blur' },
            ],
        },
        {
            type: "InputNumber",
            field: "money",
            title: "礼物价格（虚拟货币）",
            value: 1,
            validate:[
                { required: true, message: '请输入礼物价格', trigger: 'blur' },
            ],
        },
      ],
      fApi: {
        name:'123456'
      },
    }
  },
  computed: {
    fromDataNew:{
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
        _this.fromDataNew.image = img[0]
      })
    },
    close() {
      this.$emit('close')
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi)=>{
          if (formData.id) {
            this.IfupdateEditGift(formData)
          } else {
            this.IfaddaddGift(formData)
          }
      })
    },
    cancel() {
      this.$emit('cancel')
    },
    IfaddaddGift(data) {
      addGift(data).then(res => {
        this.$emit('confirm')
      })
    },
    IfupdateEditGift(data) {
      editGift(data).then(res => {
        this.$emit('confirm')
      })
    },
  }
}
</script>
<style scoped lang="less"></style>
