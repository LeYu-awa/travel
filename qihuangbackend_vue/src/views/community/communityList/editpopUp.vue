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
    </form-create>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="onSubmitForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { communityEditDataApi } from "@/api/community";
import { cityListApi } from "@/api/user";

import { getToken } from "@/utils/auth";
import dFrom from "@/components/dFrom/dFrom.vue";
import formCreate from "@form-create/element-ui";
import LazyCascader from "@/components/lazyCascader";
import message from "@/views/dataScreen/components/message/message";
export default {
  components: {
    dFrom,
    formCreate: formCreate.$form(),
    LazyCascader
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
      provinceList: [], // 省份列表
      cityList: [], // 城市列表
      areaList: [], // 区域列表
      provinceValue: null, // 选中的省份
      cityValue: null, // 选中的城市
      areaValue: null, // 选中的区域
      // 模拟后端返回的树形数据（与你提供的结构一致）
      treeData: [],
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
          field: "sham_start",
          value: "",
          title: "虚拟点赞数",
          props: {
            type: "text",
            placeholder: "请输入虚拟点赞数"
          }
        },
        {
          type: "input",
          field: "sham_collect",
          value: "",
          title: "虚拟收藏数",
          props: {
            type: "text",
            placeholder: "请输入虚拟收藏数"
          }
        }
      ],
      fApi: {
        name: "123456"
      },
      cacheAddress: {}
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
  async mounted() {},
  methods: {
    close() {
      this.$emit("close");
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        communityEditDataApi(formData).then(() => {
          this.$emit("confirm");
        });
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfaddadminCreateApi(data) {
      adminCreateApi(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      adminUpdateApi(data).then(res => {
        this.$emit("confirm");
      });
    }
  }
};
</script>
<style scoped lang="scss">
.city-select {
  display: flex;
  align-items: center;

  .label {
    width: 150px;
    padding-right: 12px;
    text-align: right;

    .red {
      color: red;
      margin-right: 4px;
    }
  }
}
</style>
