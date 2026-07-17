<template>
  <el-dialog :title="fromDataNew.area_id ? '编辑' : '添加'" :visible.sync="dialogVisible" width="40%" @close="close">
    <form-create v-if="FormData" ref="fc" v-loading="loading" :option="option" :rule="FormData" class="formBox"
      handle-icon="false" v-model="fApi" :value.sync="fromDataNew">
    </form-create>
    <div class="city-select">
      <span class="label"><span class="red">*</span>区域</span>
      <!-- 省选择器 -->
      <el-select v-model="fromData.province" placeholder="请选择省份" @change="handleProvinceChange">
        <el-option v-for="province in provinceList" :key="province.id" :label="province.name"
          :value="province.name"></el-option>
      </el-select>

      <!-- 市选择器（选择省后显示） -->
      <el-select v-model="fromData.city" placeholder="请选择城市" @change="handleCityChange" v-if="fromData.province">
        <el-option v-for="city in cityList" :key="city.id" :label="city.name" :value="city.name"></el-option>
      </el-select>

      <!-- 区选择器（选择市后显示） -->
      <el-select v-model="fromData.county" placeholder="请选择区域" v-if="fromData.city">
        <el-option v-for="area in areaList" :key="area.id" :label="area.name" :value="area.name"></el-option>
      </el-select>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="onSubmitForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { areaAdminAdd, areaAdminEdit } from "@/api/setting";
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
          title: "登录账号",
          field: "account",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            {
              required: true,
              message: "请输入登录账号（唯一）",
              trigger: "blur"
            }
          ]
        },
        {
          type: "input",
          title: "登录密码",
          field: "pwd",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            {
              required: true,
              message: "请输入登录密码",
              trigger: "blur"
            }
          ]
        },
        {
          type: "input",
          title: "真实姓名",
          field: "real_name",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            {
              required: true,
              message: "请输入真实姓名",
              trigger: "blur"
            }
          ]
        },
        {
          type: "input",
          title: "手机号码",
          field: "phone",
          value: "",
          props: {
            type: "text"
          },
          validate: [
            {
              required: true,
              message: "请输入手机号码",
              trigger: "blur"
            }
          ]
        },

        {
          type: "switch",
          title: "状态",
          field: "status",
          value: true,
          props: {
            type: "text"
          }
        }
      ],
      fApi: {
        name: "123456"
      },
      cacheAddress: {}
    };
  },
  watch: {
    fromData: {
      handler(value) {
        console.log(value)
        if (value.area_id) {
          this.FormData[1].hidden = true
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    fromDataNew: {
      get() {
        return this.fromData;
      },
      set(v) { }
    }
  },
  async mounted() {
    this.getTreeData();
  },
  methods: {
    async getTreeData() {
      let { data } = await cityListApi();

      this.provinceList = data.tree;
      this.provinceList = [...this.provinceList];
    },
    modalPicTap(key) {
      const _this = this;
      _this.$modalUpload(function (img) {
        console.log(img);
        _this.fromDataNew.logo = img[0];
      });
    },
    // 省份选择变化时，加载对应城市
    handleProvinceChange(province, e) {
      for (let v of this.provinceList) {
        if (v.name == province) {
          this.cityList = v.children || []
        }
      }
      this.cityValue = null; // 重置城市选中值
      this.areaValue = null; // 重置区域选中值
      this.areaList = []; // 清空区域列表
    },
    // 城市选择变化时，加载对应区域
    handleCityChange(city) {
      for (let v of this.cityList) {
        if (v.name == city) {
          this.areaList = v.children || []
        }
      }
      this.areaValue = null; // 重置区域选中值
    },
    close() {
      this.$emit("close");
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        if (!this.fromData.province) {
          return message.error('请选择省')
        }
        if (!this.fromData.city) {
          return message.error('请选择市')
        }
        if (!this.fromData.county) {
          return message.error('请选择区')
        }
        if (formData.area_id) {
          this.IfupdateEditGift({ ...this.fromData, ...formData });
        } else {
          this.IfaddareaAdminAdd({ ...this.fromData, ...formData });
        }
      });
    },
    cancel() {
      this.$emit("cancel");
    },
    IfaddareaAdminAdd(data) {
      areaAdminAdd(data).then(res => {
        this.$emit("confirm");
      });
    },
    IfupdateEditGift(data) {
      areaAdminEdit(data).then(res => {
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
