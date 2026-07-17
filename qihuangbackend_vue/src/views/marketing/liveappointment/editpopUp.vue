<template>
  <el-dialog
    :title="
      fromDataNew.pid && !fromDataNew.id
        ? fromDataNew.pName + '新增下级'
        : fromDataNew.id
        ? '编辑'
        : '添加'
    "
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
  liveAppointmentAdd,
  liveAppointmentEdit,
  getLiveType
} from "@/api/marketing";
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
          title: "直播标题",
          field: "title",
          value: "",
          props: {
            type: "text"
          },
          validate: [{ required: true, message: "请输入标题", trigger: "blur" }]
        },
        {
          type: "select",
          field: "specialty_type",
          title: "专科类型",
          value: "",
          props: {
            type: "text"
          },
          validate: [{ required: true, message: "请选择", trigger: "blur" }]
        },
        {
          type: "input",
          title: "直播间ID",
          field: "live_id",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "input",
          field: "lecturer_name",
          title: "讲师姓名",
          value: ""
        },
        // {
        //   type: 'input',
        //   field: 'live_user_id',
        //   title: '讲师用户ID',
        //   value: '',
        // },
        {
          type: "select",
          field: "status",
          title: "状态",
          value: 1,
          options: [
            { value: 1, label: "未开始" },
            { value: 2, label: "直播中" },
            { value: 3, label: "已结束" },
            { value: 4, label: "已取消" }
          ]
        }, {
          type: 'input',
          field: 'max_participants',
          title: '最大参与人数',
          value: '',

        }, {
          type: 'input',
          field: 'current_participants',
          title: '当前参与人数',
          value: '',

        }, {
          type: 'input',
          field: 'price',
          title: '价格',
          value: '',

        },{
          type: 'input',
          field: 'cost_price',
          title: '成本价',
          value: '',

        }, {
          type: 'switch',
          field: 'is_free',
          title: '是否免费',
          value: 1,
          props: {
            type: "text",
            activeText: "是",
            inactiveText: "否"
          }
        },
        {
          type: "frame",
          field: "cover_image",
          title: "封面图片URL",
          value: "",
          props: {
            type: "image",
            maxLength: 1,
            title: "请选择图片：",
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
          validate: [{ required: true, message: "请选择", trigger: "blur" }]
        },
        {
          type: "WangEditor",
          field: "description",
          title: "直播描述",
          value: ""
        },
        {
          type: "input",
          field: "live_url",
          title: "直播连接",
          value: ""
        },
        {
          type: "input",
          field: "playback_url",
          title: "回放连接",
          value: ""
        },
        {
          type: "input",
          field: "tags",
          title: "标签",
          value: ""
        },
        {
          type: "input",
          field: "sort_order",
          title: "排序权重",
          value: ""
        },
        {
          type: "switch",
          field: "is_recommend",
          title: "是否推荐",
          value: 0,
          props: {
            type: "text",
            activeText: "是",
            inactiveText: "否"
          }
        },
        {
          type: "switch",
          field: "is_hot",
          title: "是否热门",
          value: 0,
          props: {
            type: "text",
            activeText: "是",
            inactiveText: "否"
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
        return this.fromData;
      },
      set(v) {}
    }
  },
  created() {
    this.getOptions();
  },
  methods: {
    async getOptions() {
      let { data } = await getLiveType({ limit: 1000 });
      let arr = [];
      data.data.map(v => {
        arr.push({
          label: v.name,
          value: v.id
        });
      });
      this.FormData[1].options = arr;
    },
    modalPicTap(key) {
      const _this = this;
      _this.$modalUpload(function(img) {
        console.log(img);
        _this.fromDataNew.logo = img[0];
      });
    },
    close() {
      this.$emit("close");
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        formData.pid = formData.pid || 0;
        formData.is_show = 1;
        if (formData.id) {
          this.IfupdateEditGift(formData);
        } else {
          this.IfaddliveAppointmentAdd(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfaddliveAppointmentAdd(data) {
      liveAppointmentAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      liveAppointmentEdit(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
