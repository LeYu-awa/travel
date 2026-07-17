<template>
  <el-dialog :title="fromDataNew.pid && !fromDataNew.id ? fromDataNew.pName + '新增下级' : fromDataNew.id ? '编辑' : '添加'"
    :visible.sync="dialogVisible" width="40%" @close="close">
    <form-create v-if="FormData" ref="fc" v-loading="loading" :option="option" :rule="FormData" class="formBox"
      handle-icon="false" v-model="fApi" :value.sync="fromDataNew">
    </form-create>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="onSubmitForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import {
  healthVideoMemberCardAdd,
  healthVideoMemberCardEdit
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
          title: "标题",
          field: "title",
          value: "",
          props: {
            type: "text"
          },
          validate: [{ required: true, message: "请输入标题", trigger: "blur" }]
        },

        {
          type: "input",
          field: "subtitle",
          title: "副标题",
          value: "",
          validate: [
            { required: true, message: "请输入副标题", trigger: "blur" }
          ]
        },
        {
          type: "select",
          field: "card_type",
          title: "类型",
          value: "1",
          options: [
            { value: "1", label: "月卡" },
            { value: "2", label: "季卡" },
            { value: "3", label: "年卡" },
            { value: "4", label: "永久卡" }
          ],
          validate: [{ required: true, message: "请选择", trigger: "blur" }]
        },
        {
          type: 'select',
          field: 'card_type',
          title: '卡包',
          value: 1,
          options: [
            { "value": 1, "label": "月卡" },
            { "value": 2, "label": "季卡" },
            { "value": 3, "label": "年卡" },
            { "value": 4, "label": "永久卡" },
          ],
          validate: [
            { required: true, message: '请选择', trigger: 'blur' },
          ],
        },

        {
          type: 'frame',
          field: 'thumbnail_url',
          title: '封面图',
          value: '',
          props: {
            type: "image",
            maxLength: 1,
            title: "请选择图片：",
            src: "/admin/setting/uploadPicture?field=thumbnail_url&type=1",
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
            { required: true, message: '请选择', trigger: 'blur' },
          ],
        },
        {
          type: "frame",
          field: "banner_images",
          title: "轮播图",
          value: '',
          props: {
            type: "image",
            maxLength: 1,
            title: "请选择图片：",
            src: "/admin/setting/uploadPicture?field=banner_images&type=1",
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
            { required: true, message: '请选择', trigger: 'blur' },
          ],
        },
        {
          type: 'input',
          field: 'sort',
          title: '有效期天数',
          value: ''
        },
        {
          type: 'input',
          field: 'price',
          title: '价格',
          value: '',
          validate: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
        },{
          type: 'input',
          field: 'cost_price',
          title: '成本价',
          value: '',
        },
        {
          type: 'input',
          field: 'original_price',
          title: '原价',
          value: '',
          validate: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
        },
        {
          type: 'input',
          field: 'stock',
          title: '库存',
          value: '',
          validate: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
        },
        {
          type: 'input',
          field: 'sold_count',
          title: '销量',
          value: ''
        },
        {
          type: 'WangEditor',
          field: 'description',
          title: '详情',
          value: '',
          validate: [
            { required: true, message: '请输入', trigger: 'blur' },
          ],
        },

        {
          type: 'WangEditor',
          field: 'benefits',
          title: '权益说明',
          value: ''
        },


        {
          type: 'input',
          field: 'status',
          title: '状态',
          value: 0,
          props: {
            type: "text",
            activeText: "上架",
            inactiveText: "下架"
          }
        },
        {
          type: 'switch',
          field: 'is_hot',
          title: '是否热门',
          value: 0,
          props: {
            type: "text",
            activeText: "是",
            inactiveText: "否"
          }
        },
        {
          type: 'switch',
          field: 'is_recommend',
          title: '是否推荐',
          value: 0,
          props: {
            type: "text",
            activeText: "是",
            inactiveText: "否"
          }
        },
        {
          type: 'input',
          field: 'sort',
          title: '排序',
          value: '',
        },

        {
          type: "WangEditor",
          field: "benefits",
          title: "权益说明",
          value: ""
        },


        {
          type: "input",
          field: "status",
          title: "状态",
          value: ""
        },
        {
          type: "switch",
          field: "sort",
          title: "是否热门",
          value: ""
        },
        {
          type: "switch",
          field: "is_recommend",
          title: "是否推荐",
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
          this.IfaddhealthVideoMemberCardAdd(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfaddhealthVideoMemberCardAdd(data) {
      healthVideoMemberCardAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      healthVideoMemberCardEdit(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
