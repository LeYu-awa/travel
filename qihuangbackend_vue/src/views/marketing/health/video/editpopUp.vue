<template>
  <el-dialog :title="fromDataNew.id ? '编辑' : '添加'" :visible.sync="dialogVisible" width="40%" @close="close">
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
  healthVideoCourseAdd,
  healthVideoCourseEdit,
  bodyPartList
} from "@/api/marketing";
import {
  getToken
} from "@/utils/auth";
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
      FormData: [{
        type: "input",
        title: "标题",
        field: "title",
        value: "",
        props: {
          type: "text"
        },
        validate: [{
          required: true,
          message: "请输入标题",
          trigger: "blur"
        }]
      },

      {
        type: "select",
        title: "身体部位",
        field: "body_part_ids",
        value: [],
        props: {
          multiple: true
        },
        validate: [{
          required: true,
          message: "请选择",
          trigger: "blur"
        }]
      },
      {
        type: "input",
        title: "副标题/简介",
        field: "subtitle",
        value: "",
        options: [],
        props: {
          type: "text",
          multiple: true,
          remote: true,
          filterable: true
        },
        validate: [{
          required: true,
          message: "请输入副标题",
          trigger: "blur"
        }]
      },
      {
        type: "frame",
        field: "thumbnail_url",
        value: "",
        title: "封面图URL",
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

        validate: [{
          required: true,
          message: "请添加图片",
          trigger: "blur"
        }]
      },
      {
        type: "upload",
        title: "播放URL",
        field: "video_url",
        value: "",
        props: {
          type: "select",
          uploadType: "file",
          action: process.env.VUE_APP_BASE_API + "/sys/community/topic/upLoadFile",
          name: "file",
          // accept:"mp3\/*",
          headers: {
            "X-Token": getToken()
          },
          limit: 1,
          onSuccess: function (res, file) {
            file.url = res.data.src;
          }
        },
        validate: [{
          required: true,
          message: "请添加URL",
          trigger: "blur"
        }]
      },

      {
        type: "switch",
        title: "是否上锁",
        field: "is_locked",
        value: 0,
        props: {
          type: "text",
          activeValue: 1,
          inactiveValue: 0,
        },
      },
      {
        type: "switch",
        title: "是否免费",
        field: "is_free",
        value: 1,
        props: {
          type: "text",
          activeValue: 1,
          inactiveValue: 0,
        },
      },

      {
        type: "input",
        title: "价格",
        field: "price",
        value: 0.00,
        props: {
          type: "text"
        }
      },{
        type: "input",
        title: "成本价",
        field: "cost_price",
        value: 0.00,
        props: {
          type: "text"
        }
      },
      {
        type: "input",
        field: "play_count",
        title: "播放次数",
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
        data.efficacy_ids = data.efficacy_ids ? data.efficacy_ids.split(',').map(Number) : []
        // console.log(this.formData)
        return data || {};
      },
      set(v) { }
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
        formData.efficacy_ids = formData.efficacy_ids ?
          formData.efficacy_ids.toString() :
          "";
        if (formData.id) {
          this.IfupdateEditGift(formData);
        } else {
          this.IfaddhealthVideoCourseAdd(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    async getOptions() {
      let {
        data
      } = await bodyPartList({limit: 10000});
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
    IfaddhealthVideoCourseAdd(data) {
      healthVideoCourseAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      healthVideoCourseEdit(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
