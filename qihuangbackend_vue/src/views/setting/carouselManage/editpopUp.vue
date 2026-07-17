<template>
  <el-dialog
    title="编辑"
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
import { addCarouse, editCarouse } from "@/api/setting";
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
          type: "fieldComponent",
          field: "image",
          title: "图片",
          value: "",
          validate: [{ required: true, message: "请上传图片", trigger: "blur" }]
        },
        {
          type: "select",
          field: "type",
          title: "分类",
          value: "",

          validate: [
            { required: true, message: "请选择分类", trigger: "blur" }
          ],
          options: [
            { value: "1", label: "直播live", disabled: false },
            { value: "2", label: "商城shop", disabled: false }
            // { value: "2", label: "middle", disabled: false },
            // { value: "3", label: "lower", disabled: false },
            // { value: "4", label: "bottom", disabled: false }
          ]
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
    modalPicTap(key) {
      const _this = this;
      _this.$modalUpload(function(img) {
        _this.fromDataNew.image = img[0];
      });
    },
    close() {
      this.$emit("close");
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        console.log(formData);
        let str = {};
        if (formData.id) {
          str.type = formData.type;
          str.image = formData.image;
          str.id = formData.id;
          this.IfupdateEditGift(formData);
        } else {
          str.type = formData.type;
          str.image = formData.image;
          this.IfaddaddGift(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfaddaddGift(data) {
      addCarouse(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      editCarouse(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
