<template>
  <el-dialog :title="fromDataNew.id ? '编辑' : '添加'" :visible.sync="dialogVisible" width="40%" @close="close">
    <form-create v-if="FormData" ref="fc" v-loading="loading" :option="option" :rule="FormData" class="formBox"
      handle-icon="false" v-model="fApi" :value.sync="fromDataNew">
      <template slot="type-field-component" slot-scope="scope">
        <div class="upLoadPicBox" @click="modalPicTap">
          <div v-if="scope.model.value" class="pictrue">
            <img :src="scope.model.value" />
          </div>
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
import { termAdd, termEdit } from "@/api/content";
import { getToken } from "@/utils/auth";
import dFrom from "@/components/dFrom/dFrom.vue";
import formCreate from "@form-create/element-ui";
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
          labelWidth: "150px"
        },
        submitBtn: false,
        global: {
          upload: {
            props: {
              onSuccess: (rep, file) => {
                if (rep.status === 200) {
                  file.url = rep.data.src;
                } else {
                  this.$message.error(rep.message || "上传失败");
                }
              }
            }
          }
        }
      },
      FormData: [
        {
          type: "input",
          title: "术语名称",
          field: "name",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请输入术语名称", trigger: "blur" }
          ]
        },
        {
          type: "input",
          field: "category",
          title: "类别",
          value: "中医基础术语",
        },
        
        {
          type: "switch",
          title: "是否显示",
          field: "is_show",
          value: 1,
          props: {
            type: "text",
            activeValue: 1,
            inactiveValue: 0,
          },
        },
        {
          type: "upload",
          title: "音频地址",
          field: "audio_url",
          value: "",
          props: {
            type: "select",
            uploadType: "file",
            action:
              process.env.VUE_APP_BASE_API + "/sys/community/topic/upLoadFile",
            name: "file",
            // accept:"mp3\/*",
            headers: {
              "X-Token": getToken()
            },
            limit: 1,
            onSuccess: function(res, file) {
              console.log(res, file, this);
              file.url = res.data.src;
            }
          },
          validate: [
            { required: true, message: "请添加音频", trigger: "blur" }
          ]
        },
        {
          type: "WangEditor",
          title: "描述",
          field: "description",
          value: "",
          props: {
            type: "text",
          },
          validate: [
            { required: true, message: "请输入描述", trigger: "blur" }
          ]
        },
        {
          type: "input",
          title: "概念",
          field: "concept",
          value: "",
          props: {
            type: "text"
          },
        },
        {
          type: "input",
          title: "解读",
          field: "explanation",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "应用领域",
          field: "application",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "参考文献",
          field: "reference",
          value: "",
          props: {
            type: "text"
          }
        },
        // {
        //   type: "Switch",
        //   field: "is_show",
        //   title: "状态",
        //   value: "1",
        //   props: {
        //     activeValue: "1",
        //     inactiveValue: "0"
        //   }
        // }
      ],
      fApi: {
        name: "123456"
      }
    };
  },
  computed: {
    fromDataNew: {
      get() {
        return this.fromData;
      },
      set(v) { }
    }
  },
  mounted() { },
  methods: {
    modalPicTap(key) {
      const _this = this;
      _this.$modalUpload(function (img) {
        console.log(img);
        _this.fromDataNew.logo = img[0];
      });
    },
    close() {
      this.$emit("close");
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        if (formData.id) {
          this.IfupdateEditGift(formData);
        } else {
          this.IfaddtermAdd(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfaddtermAdd(data) {
      termAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      termEdit(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
