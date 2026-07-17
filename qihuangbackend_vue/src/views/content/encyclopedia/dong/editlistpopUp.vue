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
import { dongPointAdd, dongPointEdit, dongCategoryList } from "@/api/content";
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
          title: "奇穴名称",
          field: "name",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            { required: true, message: "请输入奇穴名称", trigger: "blur" }
          ]
        },
        {
          type: "select",
          field: "category_id",
          title: "分类",
          value: "",
          options: [],
          props: {
            type: "text",
            remote: true,
            filterable: true
          }, validate: [
            { required: true, message: "请选择分类", trigger: "blur" }
          ]
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
          field: "sort",
          title: "排序",
          value: "",
        },
       
        {
          type: "input",
          field: "position",
          title: "部位",
          value: "",
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
       
        // {
        //   type: "input",
        //   field: "locate_video",
        //   title: "取穴视频",
        //   value: "",
        // },
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
              console.log(res, file, this);
              file.url = res.data.src;
            }
          },
          
        },

        {
          type: "WangEditor",
          field: "locate_video_desc",
          title: "取穴视频说明",
          value: "",
        },
        {
          type: "WangEditor",
          field: "anatomy",
          title: "解剖",
          value: "",
        },
        {
          type: "WangEditor",
          field: "indication",
          title: "主治",
          value: "",
        },
        {
          type: "WangEditor",
          field: "location",
          title: "取穴方法",
          value: "",
        },
        {
          type: "WangEditor",
          field: "operation",
          title: "操作",
          value: "",
        },
        
        {
          type: "WangEditor",
          field: "summary",
          title: "说明",
          value: "",
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
  async created() {
    this.getOptions();
    // console.log(666, this.getOptions());
  },
  methods: {
    modalPicTap(key) {
      const _this = this;
      _this.$modalUpload(function(img) {
        console.log(img);
        _this.fromDataNew.logo = img[0];
      });
    },
    async getOptions() {
      let { data } = await dongCategoryList({limit: 1000});
      let arr = [];
      data.list.map(v => {
        arr.push({
          label: v.name,
          value: v.id
        });
      });
      this.efficacy = arr;
      // console.log(arr)
      this.FormData[1].options = arr;
      return arr;
    },
    close() {
      this.$emit("close");
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        if (formData.id) {
          this.IfupdateEditGift(formData);
        } else {
          this.IfadddongPointAdd(formData);
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfadddongPointAdd(data) {
      dongPointAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      dongPointEdit(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="less"></style>
