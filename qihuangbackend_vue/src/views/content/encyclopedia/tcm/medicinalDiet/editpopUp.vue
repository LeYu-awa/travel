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
    >
    </form-create>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="onSubmitForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  medicinalDietAdd,
  medicinalDietEdit,
  medicinalDietEfficacyList
} from "@/api/content";
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
          title: "药膳名称",
          field: "name",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请输入药膳名称", trigger: "blur" }
          ]
        },
        {
          type: "select",
          title: "药膳功效",
          field: "efficacy_ids",
          value: "",
          options: [],
          props: {
            type: "text",
            multiple: true,
            remote: true,
            filterable: true
          }
        },
        {
          type: "frame",
          field: "image",
          value: "",
          title: "图片",
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
          type: "input",
          title: "来源",
          field: "source",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "input",
          field: "effect",
          title: "功效描述",
          value: ""
        },
        {
          type: "input",
          title: "配方",
          field: "formula",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "input",
          title: "适宜人群",
          field: "suitable_people",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "input",
          title: "食用方法",
          field: "usage",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "相关配伍",
          field: "compatibility",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "详细描述",
          field: "description",
          value: "",
          props: {
            type: "text"
          }
        }
      ],
      fApi: {
        name: "123456"
      }
    };
  },
  computed: {
    fromDataNew: {
      get() {
        let data = this.fromData || {}
        data.efficacy_ids = data.efficacy_ids ? data.efficacy_ids.split(',').map(Number) : []
        // console.log(this.formData)
        return data || {};
      },
      set(v) {}
    }
  },
  async created() {
    this.getOptions();
    // console.log(666, this.getOptions());
  },
  methods: {
    close() {
      this.$emit("close");
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        formData.efficacy_ids = formData.efficacy_ids
          ? formData.efficacy_ids.toString()
          : "";
        if (formData.id) {
          this.IfupdateEditGift(formData);
        } else {
          this.IfaddmedicinalDietAdd(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    async getOptions() {
      let { data } = await medicinalDietEfficacyList();
      let arr = [];
      data.list.map(v => {
        arr.push({
          label: v.name,
          value: v.id
        });
      });
      this.FormData[1].options = arr;
      return arr;
    },
    IfaddmedicinalDietAdd(data) {
      medicinalDietAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      medicinalDietEdit(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
