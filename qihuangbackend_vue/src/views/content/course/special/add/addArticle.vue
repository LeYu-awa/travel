<template>
  <div class="divBox">
    <el-card>
      <el-page-header @back="back" :content="$route.params.id ? '编辑' : '添加'">
      </el-page-header>
    </el-card>
    <el-card class="box-card mt14">
      <el-form ref="formValidate" class="form" size="small" :model="formValidate" label-width="120px"
        :rules="ruleValidate" @submit.native.prevent>
        <el-tabs v-model="activeName">
          <el-tab-pane label="基础设置" name="first"></el-tab-pane>
          <el-tab-pane label="素材选择" name="material"></el-tab-pane>
          <el-tab-pane label="课程配置" name="special"></el-tab-pane>
          <el-tab-pane label="价格设置" name="price"></el-tab-pane>
        </el-tabs>
        <el-row v-if="activeName == 'first'" :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="课程名称：" prop="name" label-for="name">
              <el-input v-model="formValidate.name" placeholder="请输入" element-id="name" style="width: 90%" />
            </el-form-item>
            <el-form-item label="课程标签：" prop="label" label-for="label">
              <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false"
                @close="handleClose(tag)">
                {{ tag }}
              </el-tag>
              <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
                @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">新增标签</el-button>
            </el-form-item>
            <el-form-item label="课程分类：" label-for="lesson_type_id" prop="lesson_type_id">
              <el-select v-model="formValidate.lesson_type_id" filterable clearable placeholder="请选择" ref="configSelect"
                class="mb15" style="width: 90%">
                <el-option v-for="(item, index) in treeData" :key="index" :label="item.name" :value="item.id">
                  {{ item.name }}
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="课程封面：" prop="cover_image">
              <div class="upLoadPicBox" @click="modalPicTap('1', 'cover_image')">
                <div v-if="formValidate.cover_image" class="pictrue">
                  <img :src="formValidate.cover_image" />
                </div>
                <div v-else class="upLoad">
                  <i class="iconfont iconjiahao" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="课程Banner：" prop="banner">
              <div class="upLoadPicBox" @click="modalPicTap('1', 'banner')">
                <div v-if="formValidate.banner" class="pictrue">
                  <img :src="formValidate.banner" />
                </div>
                <div v-else class="upLoad">
                  <i class="iconfont iconjiahao" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="推广海报：" prop="promotion_poster">
              <div class="upLoadPicBox" @click="modalPicTap('1', 'promotion_poster')">
                <div v-if="formValidate.promotion_poster" class="pictrue">
                  <img :src="formValidate.promotion_poster" />
                </div>
                <div v-else class="upLoad">
                  <i class="iconfont iconjiahao" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="客服二维码：" prop="customer_service_qrcode">
              <div class="upLoadPicBox" @click="modalPicTap('1', 'customer_service_qrcode')">
                <div v-if="formValidate.customer_service_qrcode" class="pictrue">
                  <img :src="formValidate.customer_service_qrcode" />
                </div>

                <div v-else class="upLoad">
                  <i class="iconfont iconjiahao" />
                </div>
              </div>
            </el-form-item>
            <el-form-item label="课程简介：" prop="introduction" label-for="introduction">
              <!-- <vue-ueditor-wrap v-model="formValidate.introduction" :config="myConfig" style="width: 100%;" @beforeInit="addCustomDialog" /> -->

              <el-input v-model="formValidate.introduction" type="textarea" placeholder="请输入" style="width: 90%" />
            </el-form-item>
            <el-form-item label="课程详情：" prop="details">
              <!-- <ueditor-from v-model="formValidate.content" :content="formValidate.content"/> -->
              <vue-ueditor-wrap v-model="formValidate.details" :config="myConfig" style="width: 100%"
                @beforeInit="addCustomDialog" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="activeName == 'material'" :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="素材排序方式：">
              <el-radio-group v-model="formValidate.source_sort">
                <el-radio label="asc" class="radio">正序</el-radio>
                <el-radio label="desc">倒序</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="素材选择：">
              <div class="flex">
                <el-button type="primary" @click="materialpopUpShow = true">选择素材</el-button>
                <div class="ml14">
                  如果素材列表中没有你要的素材，请：<el-button type="text" @click="editshow = true">前往添加素材</el-button>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="选择展示：" style="width: 100%">
              <dTable @switchChange="changeMaterial" :table-data="materialList" :table-header-data="tableHeaderData">
                <template #operation="{ row, index }">
                  <el-button type="primary" size="mini" @click="editMaterial(row)">编辑</el-button>
                  <el-button type="danger" size="mini" @click="deleteMaterial(index)">删除</el-button>
                </template>
                <template #sort="{ row }">
                  <el-input v-model="row.sort" :value="row.sort || 0" @blur="changeMaterial(row)"
                    placeholder="请输入"></el-input>
                </template>
              </dTable>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="activeName == 'special'" :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="课程章节：" prop="chapter_num" label-for="chapter_num">
              <el-input v-model="formValidate.chapter_num" placeholder="请输入" element-id="chapter_num" style="width: 90%"
                suffix />
              节
            </el-form-item>
            <el-form-item label="课程排序：" prop="sort" label-for="sort">
              <el-input v-model="formValidate.sort" placeholder="请输入" element-id="sort" style="width: 90%" />
            </el-form-item>
            <el-form-item label="虚拟学习人数：" prop="virtual_user_num" label-for="virtual_user_num">
              <el-input v-model="formValidate.virtual_user_num" placeholder="请输入" element-id="virtual_user_num"
                style="width: 90%" />
            </el-form-item>
            <el-form-item label="有效期：" prop="expiration_date" label-for="expiration_date">
              <el-input v-model="formValidate.expiration_date" placeholder="请输入" element-id="expiration_date"
                style="width: 40%" />
              天<span style="margin-left: 14px;color: #999;">有效期为用户购买后可以观看时间，0为时间不限；</span>
            </el-form-item>
            <el-form-item label="仅会员可见：">
              <el-radio-group v-model="formValidate.only_vip_see">
                <el-radio :label="1" class="radio">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="activeName == 'price'" :gutter="10">
          <el-col v-bind="grid">
            <el-form-item label="付费方式：">
              <el-radio-group v-model="formValidate.is_pay">
                <el-radio :label="1" class="radio">付费</el-radio>
                <el-radio :label="0">免费</el-radio>
              </el-radio-group>
            </el-form-item>
            <template v-if="formValidate.is_pay == 1">
              <el-form-item label="购买金额：" prop="pay_money" label-for="pay_money">
                <el-input v-model="formValidate.pay_money" placeholder="请输入" element-id="pay_money"
                  style="width: 90%" />
              </el-form-item>
              <!-- <el-form-item label="会员付费方式：">
                <el-radio-group v-model="formValidate.is_vip_pay">
                  <el-radio :label="1" class="radio">付费</el-radio>
                  <el-radio :label="0">免费</el-radio>
                </el-radio-group>
              </el-form-item> -->
              <el-form-item label="会员购买金额：" prop="vip_money" label-for="vip_money">
                <el-input v-model="formValidate.vip_money" placeholder="请输入" element-id="vip_money"
                  style="width: 90%" />
              </el-form-item>
              <el-form-item label="单独分销：">
                <el-radio-group v-model="formValidate.is_separate">
                  <el-radio :label="1" class="radio">开启</el-radio>
                  <el-radio :label="0">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
              <template v-if="formValidate.is_separate == 1">
                <el-form-item label="一级返佣比例[5%=5]：" prop="first_commission_rebate" label-for="first_commission_rebate">
                  <el-input v-model="formValidate.first_commission_rebate" placeholder="请输入"
                    element-id="first_commission_rebate" style="width: 90%" />
                </el-form-item>
                <el-form-item label="二级返佣比例[5%=5]：" prop="second_commission_rebate"
                  label-for="second_commission_rebate">
                  <el-input v-model="formValidate.second_commission_rebate" placeholder="请输入"
                    element-id="second_commission_rebate" style="width: 90%" />
                </el-form-item>
              </template>
              <el-form-item label="拼团状态：">
                <el-radio-group v-model="formValidate.is_group_buying">
                  <el-radio :label="1" class="radio">开启</el-radio>
                  <el-radio :label="0">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- 开启拼团 -->
              <template v-if="formValidate.is_group_buying == 1">
                <el-form-item label="拼团金额：" prop="group_money" label-for="group_money">
                  <el-input v-model="formValidate.group_money" placeholder="请输入" element-id="group_money"
                    style="width: 90%" />
                </el-form-item>
                <el-form-item label="拼团人数：" prop="group_people" label-for="group_people">
                  <el-input v-model="formValidate.group_people" placeholder="请输入" element-id="group_people"
                    style="width: 90%" />
                </el-form-item>
                <el-form-item label="开始时间：" prop="group_start_time" label-for="group_start_time">
                  <el-date-picker v-model="formValidate.group_start_time" type="date" placeholder="选择日期">
                  </el-date-picker>
                  <!-- <el-input
                    v-model="formValidate.group_start_time"
                    placeholder="请输入"
                    element-id="group_start_time"
                    style="width: 90%"
                  /> -->
                </el-form-item>
                <el-form-item label="结束时间：" prop="group_end_time" label-for="group_end_time">
                  <el-date-picker v-model="formValidate.group_end_time" type="date" placeholder="选择日期">
                  </el-date-picker>
                  <!-- <el-input
                    v-model="formValidate.group_end_time"
                    placeholder="请输入"
                    element-id="group_end_time"
                    style="width: 90%"
                  /> -->
                </el-form-item>
                <el-form-item label="拼团时间：" prop="group_expiration_time" label-for="group_expiration_time">
                  <el-input v-model="formValidate.group_expiration_time" placeholder="请输入"
                    element-id="group_expiration_time" style="width: 90%" /> 小时
                </el-form-item>
                <el-form-item label="模拟成团：">
                  <el-radio-group v-model="formValidate.is_group_simulate">
                    <el-radio :label="1" class="radio">开启</el-radio>
                    <el-radio :label="0">关闭</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item v-if="formValidate.is_group_simulate == 1" label="补齐比例：" prop="simulate_num"
                  label-for="simulate_num">
                  <el-input v-model="formValidate.simulate_num" placeholder="请输入" element-id="simulate_num"
                    style="width: 20%" />
                  <span
                    style="color: red; margin-left: 14px">注：可设置成团的补齐比例，拼团结束前实际拼团人数达不到拼团要求时，可根据补齐比例自动添加人数，达到拼团成功的目的</span>
                </el-form-item>
              </template>
            </template>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <div class="footer">
      <el-button type="primary" size="small" @click="onsubmit('formValidate')">提交</el-button>
    </div>

    <!-- 选择素材 -->
    <materialpopUp v-if="materialpopUpShow" :fromData="{}" :dialog-visible="materialpopUpShow"
      @cancel="materialpopUpShow = false" @confirm="onmaterialConfirm" @close="materialpopUpShow = false" />

    <!-- 添加素材 -->
    <editpopUp v-if="editshow" :fromData="fromData" :dialog-visible="editshow" @cancel="editshow = false"
      @confirm="onConfirm" @close="editshow = false" />
  </div>
</template>

<script>
import {
  getLessonList,
  addLessonSubject,
  editLessonSubject,
  getLessonSubjectDetail,
  materialEdit
} from "@/api/content";

import dTable from "@/components/dTable/dTable.vue";
// import ueditorFrom from '@/components/ueditorFrom'
import VueUeditorWrap from "vue-ueditor-wrap";
import SettingMer from "@/libs/settingMer";
import { getToken } from "@/utils/auth";
import { roterPre } from "@/settings";
import editpopUp from "@/views/content/course/material/editpopUp.vue";
import materialpopUp from "./materialpopUp.vue";
export default {
  name: "EditArticle",
  components: { VueUeditorWrap, editpopUp, materialpopUp, dTable },
  data() {
    const url =
      SettingMer.https + "/upload/image/0/file?ueditor=1&token=" + getToken();

    return {
      dynamicTags: [],
      inputVisible: false,
      inputValue: "",
      editshow: false, // 添加素材
      fromData: {},
      materialList: [],
      materialpopUpShow: false, // 选择素材的弹框
      myConfig: {
        autoHeightEnabled: false, // 编辑器不自动被内容撑高
        initialFrameHeight: 500, // 初始容器高度
        initialFrameWidth: "100%", // 初始容器
        enableAutoSave: false,
        UEDITOR_HOME_URL: "/UEditor/",
        serverUrl: url,
        imageUrl: url,
        imageFieldName: "file",
        imageUrlPrefix: "",
        imageActionName: "upfile",
        imageMaxSize: 2048000,
        imageAllowFiles: [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
      },
      tableHeaderData: [
        {
          prop: "title",
          label: "素材标题",
          columnType: "text",
          align: "left",
          "min-width": "249",
        },
        {
          prop: "cover_image",
          label: "封面图片",
          columnType: "image",
          align: "left",
          "min-width": "109",
        },
        {
          prop: "sort",
          label: "排序",
          columnType: "slot",
          align: "left",
          "min-width": "109",
        },
        {
          prop: "is_need_pay",
          label: "是否收费",
          columnType: "switch",
          activeText: '收费',
          inactiveText: '免费',
          align: "left",
          "min-width": "109",
        },
        {
          prop: "operation",
          label: "操作",
          columnType: "slot",
          width: "230",
          fixed: "right",
        },
      ],
      activeName: "first",
      roterPre: roterPre,
      sleOptions: {
        title: "",
        article_category_id: "",
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
      list: [],
      treeData: [],
      grid: {
        xl: 24,
        lg: 24,
        md: 24,
        sm: 24,
        xs: 24,
      },
      formValidate: {
        source_sort: "asc",
        only_vip_see: 0,
        is_pay: 0,
        label: "",
        cover_image: "",
        banner: "",
        sort: 0,
        teacher_id: 0,
        promotion_poster: "",
        customer_service_qrcode: "",
        is_separate: 0,
        is_group_buying: 0,
        is_group_simulate: 0,
      },
      ruleValidate: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        label: [{ required: true, message: "请输入标签", trigger: "blur" }],
        lesson_type_id: [
          { required: true, message: "请选择分类", trigger: "blur" },
        ],
        cover_image: [
          { required: true, message: "请上传封面", trigger: "blur" },
        ],
        banner: [{ required: true, message: "请上传Banner", trigger: "blur" }],
        promotion_poster: [
          { required: true, message: "请上传推广海报", trigger: "blur" },
        ],
        introduction: [
          { required: true, message: "请输入课程简介", trigger: "blur" },
        ],
        details: [
          { required: true, message: "请输入课程详情", trigger: "blur" },
        ],
      },
      tempRoute: {},
    };
  },
  watch: {
    $route(to, from) {
      console.log(this.$route.query)
      if (this.$route.params.id) {
        this.getDetails();
      }
    },
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route);
  },
  mounted() {
    this.getList();
    if (this.$route.params.id) {
      this.setTagsViewTitle();
      this.getDetails();
    }
  },
  methods: {
    deleteMaterial(index) {
      this.materialList.splice(index, 1)
    },
    onmaterialConfirm(e) {
      this.materialList = e || [];
      this.materialpopUpShow = false;
    },
    onConfirm() {
      this.editshow = false;
      this.$message.success("添加成功");
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    editMaterial(e) {
      console.log(e)
      this.fromData = e
      this.editshow = true
    },
    async changeMaterial(e) {
      await materialEdit({
        ...e
      })
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.dynamicTags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = "";
      this.formValidate.label = this.dynamicTags.toString();
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 所有分类
    getList() {
      getLessonList({ search: "", limit: 1000 })
        .then((res) => {
          this.treeData = res.data;
          // this.sleOptions = res.data
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    modalPicTap(tit, type) {
      const _this = this;
      this.$modalUpload(function (img) {
        _this.formValidate[type] = img[0];
      }, tit);
    },
    // 分类点击
    handleSelClick(node) {
      this.formValidate.cid = node.article_category_id;
      this.sleOptions = {
        title: node.title,
        article_category_id: node.article_category_id,
      };
      this.$refs.configSelect.blur();
    },
    // 提交数据
    onsubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let data = this.formValidate;
          data.type = this.formValidate.type || this.$route.query.type;
          if (!this.materialList.length) {
            return this.$message.error('请选择素材')
          }
          let arr = [];
          this.materialList.filter((v) => {
            arr.push(v.id);
          });
          data.source_ids = arr.toString();
          if (this.$route.params.id) {
            editLessonSubject(data, this.$route.params.id)
              .then(async (res) => {
                this.$message.success(res.message);
                setTimeout(() => {
                  this.$router.go(-1);
                }, 500);
              })
              .catch((res) => {
                this.$message.error(res.message);
              });
          } else {
            addLessonSubject(data)
              .then(async (res) => {
                this.$message.success(res.message);
                setTimeout(() => {
                  this.$router.go(-1);
                }, 500);
              })
              .catch((res) => {
                this.$message.error(res.message);
              });
          }
        } else {
          return false;
        }
      });
    },
    // 文章详情
    getDetails() {
      getLessonSubjectDetail(this.$route.params.id ? this.$route.params.id : 0)
        .then(async (res) => {
          // const news = res.data;
          console.log(res)
          this.formValidate = {
            ...this.formValidate,
            ...res.data,
          };
          this.dynamicTags = this.formValidate.label.split(',')
          this.materialList = this.formValidate.materials;
        })
        .catch((res) => {
          this.loading = false;
          this.$message.error(res.message);
        });
    },
    setTagsViewTitle() {
      const title = "编辑文章";
      const route = Object.assign({}, this.tempRoute, {
        title: `${title}-${this.$route.params.id}`,
      });
      this.$store.dispatch("tagsView/updateVisitedView", route);
    },
    // 添加自定义弹窗
    addCustomDialog(editorId) {
      window.UE.registerUI(
        "test-dialog",
        function (editor, uiName) {
          // 创建 dialog
          let dialog = new window.UE.ui.Dialog({
            iframeUrl: roterPre + "/admin/widget/image?field=dialog",
            editor: editor,
            name: uiName,
            title: "上传图片",
            cssRules: "width:1200px;height:500px;padding:20px;",
          });
          this.dialog = dialog;
          let btn = new window.UE.ui.Button({
            name: "dialog-button",
            title: "上传图片",
            cssRules: `background-image: url(../../../assets/images/icons.png);background-position: -726px -77px;`,
            onclick: function () {
              // 渲染dialog
              dialog.render();
              dialog.open();
            },
          });
          return btn;
        },
        37
      );
      window.UE.registerUI(
        "video-dialog",
        function (editor, uiName) {
          let dialog = new window.UE.ui.Dialog({
            iframeUrl: roterPre + "/admin/widget/video?fodder=video",
            editor: editor,
            name: uiName,
            title: "上传视频",
            cssRules: "width:800px;height:420px;padding:10px 20px 20px;",
          });
          this.dialog = dialog;
          let btn = new window.UE.ui.Button({
            name: "video-button",
            title: "上传视频",
            cssRules: `background-image: url(../../../assets/images/icons.png);background-position: -320px -20px;`,
            onclick: function () {
              // 渲染dialog
              dialog.render();
              dialog.open();
            },
          });
          return btn;
        },
        38
      );
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-pagination__jump {
  margin-left: 0;
}

::v-deep .el-tree-node__content {
  height: 34px;
  font-weight: normal;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  height: 66px;
  box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.15);
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
}

.el-tag+.el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
