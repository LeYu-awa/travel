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
  medicineFoodCategoryAdd,
  medicineFoodCategoryEdit
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
          title: "品类名称",
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
          type: "input",
          field: "sort",
          title: "排序",
          value: ""
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
          type: "input",
          title: "药性",
          field: "property",
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
        return this.fromData;
      },
      set(v) {}
    }
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("close");
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        if (formData.id) {
          this.IfupdateEditGift(formData);
        } else {
          this.IfaddmedicineFoodCategoryAdd(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfaddmedicineFoodCategoryAdd(data) {
      medicineFoodCategoryAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      medicineFoodCategoryEdit(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
