<template>
  <el-dialog
    :title="fromDataNew.admin_id ? '编辑' : '添加'"
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
    <div class="city-select" v-if="fromDataNew">
      <span class="label">区域：</span>
      <el-cascader
        v-model="fromData.address"
        :options="provinceList"
        :props="{
          multiple: true,
          label: 'name',
          value: 'name',
          checkStrictly: true
        }"
        clearable
      ></el-cascader>
      <!-- 省选择器 -->
      <!-- <el-select
        v-model="fromData.province"
        placeholder="请选择省份"
        @change="handleProvinceChange"
      >
        <el-option
          v-for="province in provinceList"
          :key="province.id"
          :label="province.name"
          :value="province.name"
        ></el-option>
      </el-select> -->

      <!-- 市选择器（选择省后显示） -->
      <!-- <el-select
        v-model="fromData.city"
        placeholder="请选择城市"
        @change="handleCityChange"
        v-if="fromData.province"
      >
        <el-option
          v-for="city in cityList"
          :key="city.id"
          :label="city.name"
          :value="city.name"
        ></el-option>
      </el-select> -->

      <!-- 区选择器（选择市后显示） -->
      <!-- <el-select
        v-model="fromData.county"
        placeholder="请选择区域"
        v-if="fromData.city"
      >
        <el-option
          v-for="area in areaList"
          :key="area.id"
          :label="area.name"
          :value="area.name"
        ></el-option>
      </el-select> -->
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="onSubmitForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { adminCreateApi, adminUpdateApi } from "@/api/setting";
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
          type: "select",
          field: "roles",
          value: [],
          title: "身份：",
          props: {
            multiple: true,
            placeholder: "请选择身份："
          },
          validate: [
            {
              message: "请选择身份：",
              required: true,
              type: "array",
              trigger: "change"
            }
          ],
          options: [
            {
              value: 1,
              label: "财务"
            },
            {
              value: 2,
              label: "区域"
            }
          ]
        },
        {
          type: "input",
          field: "real_name",
          value: "",
          title: "管理员姓名：",
          props: {
            type: "text",
            placeholder: "请输入管理员姓名"
          },
          validate: [
            {
              message: "请输入管理员姓名：",
              required: true,
              type: "string",
              trigger: "change"
            }
          ]
        },
        {
          type: "input",
          field: "account",
          value: "",
          title: "账号：",
          props: {
            type: "text",
            placeholder: "请输入账号"
          },
          validate: [
            {
              message: "请输入账号：",
              required: true,
              type: "string",
              trigger: "change"
            }
          ]
        },
        {
          type: "input",
          field: "phone",
          value: "",
          title: " 联系电话：",
          props: {
            type: "text",
            placeholder: "请输入联系电话"
          }
        },
        {
          type: "input",
          field: "pwd",
          value: "",
          title: "密码：",
          props: {
            type: "password",
            placeholder: "请输入密码"
          },
          validate: [
            {
              message: "请输入密码：",
              required: true,
              type: "string",
              trigger: "change"
            }
          ]
        },
        {
          type: "input",
          field: "againPassword",
          value: "",
          title: "确认密码：",
          props: {
            type: "password",
            placeholder: "请输入确认密码"
          },
          validate: [
            {
              message: "请输入确认密码：",
              required: true,
              type: "string",
              trigger: "change"
            }
          ]
        },
        {
          type: "switch",
          field: "status",
          value: 1,
          title: "是否开启：",
          props: {
            activeValue: 1,
            inactiveValue: 0,
            inactiveText: "关",
            activeText: "开"
          }
        },
        {
          type: "switch",
          field: "is_area",
          value: 0,
          title: "是否区域代理：",
          props: {
            activeValue: 1,
            inactiveValue: 0,
            inactiveText: "否",
            activeText: "是"
          }
        }
        // {
        //   type: "radio",
        //   field: "type",
        //   value: 0,
        //   title: "区域类型：",
        //   options: [
        //     { label: "省", value: 1 },
        //     { label: "市", value: 2 },
        //     { label: "区", value: 3 }
        //   ]
        // }
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
        if (value.admin_id) {
          this.FormData[4].hidden = true;
          this.FormData[5].hidden = true;
        }

        if (value.regions && value.regions.length) {
          let arr = [];
          value.regions.filter(v => {
            arr.push(v.region_name.split(","));
          });
          value.address = arr;

          console.log(value.address);
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
      set(v) {}
    }
  },
  async mounted() {
    this.getTreeData();
  },
  methods: {
    async getTreeData() {
      let { data } = await cityListApi();
      // this.FormData[8].props.options = data.tree;

      this.provinceList = data.tree;
      this.provinceList = [...this.provinceList];
      // if (this.fromData.province) {
      //   this.handleProvinceChange(this.fromData.province);
      //   this.handleCityChange(this.fromData.city);
      // }
    },
    modalPicTap(key) {
      const _this = this;
      _this.$modalUpload(function(img) {
        console.log(img);
        _this.fromDataNew.logo = img[0];
      });
    },
    // 省份选择变化时，加载对应城市
    handleProvinceChange(province, e) {
      for (let v of this.provinceList) {
        if (v.name == province) {
          this.cityList = v.children || [];
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
          this.areaList = v.children || [];
        }
      }
      this.areaValue = null; // 重置区域选中值
    },
    close() {
      this.$emit("close");
    },
    onSubmitForm() {
      this.fApi.submit((formData, fApi) => {
        let regions = [];
        if (formData.is_area && !this.fromData.address) {
          return message.error("请选择区域");
        }

        if (this.fromData.address) {
          this.fromData.address.filter(v => {
            regions.push({
              region_type: v.length,
              region_name: v.join(",")
            });
          });
          console.log(regions);
        }
        if (formData.admin_id) {
          this.IfupdateEditGift({ ...formData, regions });
        } else {
          this.IfaddadminCreateApi({ ...formData, regions });
        }
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
