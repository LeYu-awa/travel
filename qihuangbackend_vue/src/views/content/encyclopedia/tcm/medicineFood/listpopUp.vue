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
  medicineFoodAdd,
  medicineFoodEdit,
  medicineFoodCategoryList,
  medicineFoodEfficacyCategoryList
} from "@/api/content";
import dFrom from "@/components/dFrom/dFrom.vue";
import formCreate from "@form-create/element-ui";
import { getToken } from "@/utils/auth";

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
          title: "名称",
          field: "name",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请输入品类名称", trigger: "blur" }
          ]
        },
        {
          type: "select",
          title: "分类",
          field: "category_id",
          value: "",
          options: [],
          props: {
            type: "text",
            remote: true,
            filterable: true
          }
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
          type: "select",
          title: "功效分类",
          field: "efficacy_category_ids",
          value: "",
          options: [],
          props: {
            multiple: true,
            type: "text",
            remote: true,
            filterable: true
          }
        },
        {
          type: "frame",
          field: "image",
          title: "图片",
          value: "",
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
          type: "radio",
          title: "类型",
          field: "type",
          value: 1,
          props: {
            type: "text"
          },
          options: [
            { label: '中草药', value: 1 },
            { label: '食材', value: 2 },
          ],
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
          type: "input",
          field: "sort",
          title: "排序",
          value: ""
        },

        {
          type: "input",
          field: "family",
          title: "科属与学名",
          value: ""
        },
        {
          type: "input",
          field: "alias_origin",
          title: "别名与产地",
          value: ""
        },
        {
          type: "input",
          field: "property_meridian",
          title: "性味与归经",
          value: ""
        },
        {
          type: "input",
          field: "effect",
          title: "功效",
          value: ""
        },
        {
          type: "input",
          title: "药性",
          field: "property",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "input",
          field: "ingredient_nutrition",
          title: "成分与营养",
          value: ""
        },
        {
          type: "WangEditor",
          field: "clinical",
          title: "临床应用",
          value: ""
        },
        {
          type: "WangEditor",
          field: "literature",
          title: "文献摘要",
          value: ""
        },
        {
          type: "WangEditor",
          field: "comment",
          title: "按语",
          value: ""
        },
        {
          type: "WangEditor",
          field: "appendix",
          title: "附录",
          value: ""
        },
        {
          type: "WangEditor",
          field: "description",
          title: "详细描述",
          value: ""
        },
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
        data.efficacy_category_ids = data.efficacy_category_ids ? data.efficacy_category_ids.split(',').map(Number) : []
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
    async getOptions() {
      let { data } = await medicineFoodCategoryList({limit: 1000, type: this.fromDataNew.type});
      let arr = [];
      data.list.map(v => {
        arr.push({
          label: v.name,
          value: v.id
        });
      });
      this.FormData[1].options = arr;
      // 功效分类
      let Efficacy = await medicineFoodEfficacyCategoryList({limit: 1000});
      let Efficacyarr = [];
      Efficacy.data.list.map(v => {
        Efficacyarr.push({
          label: v.name,
          value: v.id
        });
      });
      this.FormData[2].options = Efficacyarr;
    },
    close() {
      this.$emit("close");
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        formData.efficacy_category_ids = formData.efficacy_category_ids
          ? formData.efficacy_category_ids.toString()
          : "";
        if (formData.id) {
          this.IfupdateEditGift(formData);
        } else {
          this.IfaddmedicineFoodAdd(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfaddmedicineFoodAdd(data) {
      medicineFoodAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      medicineFoodEdit(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
