<template>
  <el-dialog
    :title="fromDataNew.id ? '编辑' : '添加'"
    :visible.sync="dialogVisible"
    width="40%"
    @close="close"
  >
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
      @change="change"
    >
      <!-- <template slot="type-field-component" slot-scope="scope">
        <el-upload class="upload-demo" :action="baseApi + '/sys/community/topic/upLoadFile'" :headers="{}" :on-preview="handlePreview"
          :on-remove="handleRemove" :before-remove="beforeRemove" :limit="1" :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </template> -->
    </form-create>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="onSubmitForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { materialAdd, materialEdit } from "@/api/content";
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
      baseApi: process.env.VUE_APP_BASE_API,
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
          type: "radio",
          title: "分类",
          field: "type",
          value: 1,
          props: {
            type: "text",
            remote: true,
            filterable: true
          },
          options: [
            { label: "图文", value: 1 },
            { label: "音频", value: 2 },
            { label: "视频", value: 3 }
          ],
          validate: [
            { required: true, message: "请选择分类类型", trigger: "blur" }
          ]
        },
        {
          type: "input",
          title: "素材标题",
          field: "title",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请输入素材标题", trigger: "blur" }
          ]
        },
        {
          type: "frame",
          field: "cover_image",
          title: "素材封面",
          value: "",
          props: {
            type: "image",
            maxLength: 1,
            title: "请选择素材封面：",
            src: "/admin/setting/uploadPicture?field=cover_image&type=1",
            width: "1000px",
            height: "600px",
            footer: false,
            icon: "el-icon-camera",
            modal: {
              modal: false,
              "custom-class": "suibian-modal"
            }
          },
          validate: [
            { required: true, message: "请选择素材封面", trigger: "blur" }
          ]
        },
        {
          type: "WangEditor",
          title: "素材内容",
          field: "content",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请输入素材内容", trigger: "blur" }
          ]
        },
        {
          type: "WangEditor",
          title: "素材简介",
          field: "description",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请输入素材简介", trigger: "blur" }
          ]
        },
        {
          type: "upload",
          title: "文件地址",
          field: "file_url",
          value: "",
          props: {
            type: "select",
            uploadType: "file",
            action:
              process.env.VUE_APP_BASE_API + "/sys/community/topic/upLoadFile",
            name: "file",
            headers: {
              "X-Token": getToken()
            },
            limit: 1,
            onSuccess: function(res, file) {
              console.log(res, file, this);
              file.url = res.data.src;
            }
          }
        },
        {
          type: "input",
          title: "时长",
          field: "duration",
          value: "",
          props: {
            type: "text",
            placeholder: "按秒计算，输入整数，例如100"
          }
        },
        {
          type: "input",
          title: "排序",
          field: "sort",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "switch",
          title: "是否收费",
          field: "is_need_pay",
          value: 0,
          props: {
            type: "text",
            activeText: "是",
            inactiveText: "否"
          }
        }
      ],
      fApi: {}
    };
  },
  computed: {
    fromDataNew: {
      get() {
        console.log(this.fromData)
        if (this.fromData) {
          console.log(this.fromData)
          this.change("type", this.fromData.type || 1);
        }
        return this.fromData;
      },
      set(v) {}
    }
  },
  mounted() {},
  methods: {
    modalPicTap(key) {
      const _this = this;
      _this.$modalUpload(function(img) {
        _this.fromDataNew.image = img[0];
      });
    },
    change(e, value) {
      switch (e) {
        case "type": // 只有type = 1时才需要输入素材内容，音频跟视频不需要输入
          if (value == 1) {
            this.FormData[3].type = "WangEditor";
            setTimeout(() => {
              this.FormData[5].type = "hidden";
            }, 100);
            //
            this.FormData[6].type = "hidden";
          } else {
            this.FormData[3].type = "hidden";
            this.FormData[5].type = "upload";
            this.FormData[6].type = "input";
          }
          break;
      }
      console.log(e, value);
    },
    close() {
      this.$emit("close");
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        if (formData.id) {
          this.IfupdatematerialEdit(formData);
        } else {
          this.IfaddmaterialAdd(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfaddmaterialAdd(data) {
      materialAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdatematerialEdit(data) {
      materialEdit(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
