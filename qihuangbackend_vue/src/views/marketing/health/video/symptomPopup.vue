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
import { healthSymptomAdd, healthSymptomEdit, bodyPartList } from "@/api/marketing";
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
          title: "功效名称",
          field: "name",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请输入功效名称", trigger: "blur" }
          ]
        },
        {
          type: "select",
          title: "身体部位",
          field: "category",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请选择", trigger: "blur" }
          ],
          options: []
          // [
          //   { "value": '常见症状', "label": "常见症状" },
          //   { "value": '内科疾病', "label": "内科疾病" },
          //   { "value": '妇科', "label": "妇科" },
          // ],
        
        },
        {
          type: "input",
          title: "排序",
          field: "sort",
          value: "",
          props: {
            type: "text"
          },
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
      let { data } = await bodyPartList({ limit: 1000 });
      let arr = [];
      data.list.map(v => {
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
        if (formData.id) {
          this.IfupdateEditGift(formData);
        } else {
          this.IfaddhealthSymptomAdd(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfaddhealthSymptomAdd(data) {
      healthSymptomAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      healthSymptomEdit(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
