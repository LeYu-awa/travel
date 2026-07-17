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
import { bookAdd, bookEdit } from "@/api/content";
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
          title: "书名",
          field: "name",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请输入书名", trigger: "blur" }
          ]
        },
        {
          type: "frame",
          title: "封面",
          field: "cover",
          value: "",
          props: {
            type: "image",
            maxLength: 1,
            title: "请选择封面：",
            src: "/admin/setting/uploadPicture?field=cover&type=1",
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
            { required: true, message: "请选择封面", trigger: "blur" }
          ]
        }, {
          type: "input",
          title: "作者",
          field: "author",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请输入作者名称", trigger: "blur" }
          ]
        },
        {
          type: "input",
          field: "category",
          title: "分类",
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
          type: "input",
          title: "出版社",
          field: "publisher",
          value: "",
          props: {
            type: "text"
          },
        },
        {
          type: "input",
          title: "版权",
          field: "copyright",
          value: "",
          props: {
            type: "text"
          }
        }, {
          type: "input",
          title: "字数",
          field: "word_count",
          value: "",
          props: {
            type: "text"
          }
        }, {
          type: "DatePicker",
          title: "出版日期",
          field: "publish_date",
          value: "",
          props: {
            type: "date",
            format: "yyyy-MM-dd",
            placeholder: "请选择出版日期",
          }
        },
        {
          type: "input",
          title: "价格",
          field: "price",
          value: "",
          props: {
            type: "text"
          }
        },
        {
          type: "WangEditor",
          title: "简介",
          field: "introduction",
          value: "",
          props: {
            type: "text"
          }
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
          this.IfaddbookAdd(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfaddbookAdd(data) {
      bookAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      bookEdit(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
