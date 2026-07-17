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
      @change="change"
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
import { getToken } from "@/utils/auth";
import {
  acupointAdd,
  acupointEdit,
  acupointDetail,
  handfootList
} from "@/api/content";
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
      fromDataNew: {},
      handfootOptions: [],
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
          title: "穴位名称",
          field: "name",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请输入穴位名称", trigger: "blur" }
          ]
        },
        {
          type: "select",
          title: "分类",
          field: "handfoot_id",
          value: "",
          props: {
            type: "text",
          },
          validate: [{ required: true, message: "请选择分类", trigger: "blur" }]
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
              file.url = res.data.src;
            }
          },
          validate: [{ required: true, message: "请添加音频", trigger: "blur" }]
        },
        {
          type: "input",
          field: "code",
          title: "编码",
          value: ""
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
          type: "input",
          field: "position",
          title: "部位",
          value: "",
          validate: [
            // { required: true, message: "请输入穴位名称", trigger: "blur" }
          ]
        },
        {
          type: "input",
          field: "indication",
          title: "主治",
          value: "",
          validate: [
            // { required: true, message: "请输入穴位名称", trigger: "blur" }
          ]
        },

        {
          type: "input",
          field: "location",
          title: "定位",
          value: "",
          validate: [
            // { required: true, message: "请输入穴位名称", trigger: "blur" }
          ]
        },

        {
          type: "frame",
          field: "location_image",
          title: "定位图",
          value: "",
          props: {
            type: "image",
            maxLength: 1,
            title: "请选择定位图：",
            src: "/admin/setting/uploadPicture?field=location_image&type=1",
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
          type: "upload",
          title: "取穴视频",
          field: "locate_video",
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
              file.url = res.data.src;
            }
          }
        },
        {
          type: "WangEditor",
          title: "取穴视频描述",
          field: "locate_video_desc",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "简单取法",
          field: "simple_location",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "更多取法",
          field: "more_location",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "额外概述",
          field: "extra_summary",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "穴名解",
          field: "acupoint_name_explain",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "历代主治",
          field: "history_indication*",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "历代定位",
          field: "history_location",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "针灸",
          field: "acupuncture",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "针刺演示",
          field: "acupuncture_demo",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "进针动画",
          field: "acupuncture_animation",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "配伍",
          field: "compatibility`",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "艾灸",
          field: "moxibustion",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "按推按摩",
          field: "massage",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "3D位置",
          field: "position_3d",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "解剖图",
          field: "anatomy_image",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "针刺层次",
          field: "acupuncture_layer",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "血管",
          field: "vessel",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "神经",
          field: "nerve",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "更多",
          field: "more",
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
  watch: {
    fromData: {
      handler(value) {
        if (value.id) {
          this.getDetails(value.id);
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    // fromDataNew: {
    //   get() {
    //     return this.fromData;
    //   },
    //   set(v) {}
    // }
  },
  created() {
    this.getOptions();
  },
  methods: {
    change(e, value){
      if(e == 'handfoot_id'){
        this.handfootOptions.filter((v) => {
          if(v.id === value){
            this.fromDataNew.type = v.type
          }
        })
      }
    },
    async getOptions() {
      let { data } = await handfootList({ limit: 1000 });
      let arr = [];
      data.list.map(v => {
        arr.push({
          label: v.name,
          value: v.id
        });
      });
      this.handfootOptions = data.list
      this.FormData[1].options = arr;
    },
    async getDetails(id) {
      let { data } = await acupointDetail(id);
      this.fromDataNew = { ...data, ...data.detail };
    },
    close() {
      this.$emit("close");
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        if (formData.id) {
          this.IfupdateEditGift(formData);
        } else {
          this.IfaddacupointAdd(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfaddacupointAdd(data) {
      acupointAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      acupointEdit(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
