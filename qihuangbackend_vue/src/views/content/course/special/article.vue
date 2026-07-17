<template>
  <div class="box">
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px">
        <el-form-item label="名称：" prop="name">
          <el-input v-model="tableFrom.name" placeholder="请输入名称" class="selWidth" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
          <el-button size="small" @click="searchReset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card class="mt14" style="flex: 1">
      <div class="mb14">
        <router-link :to="{
          path: roterPre + '/content/course/special/article/addArticle3', query: {
            type: 3
          }
        }">
          <el-button size="small" type="primary">添加图文</el-button>
        </router-link>
        <!-- <el-button size="small" type="primary" @click="onadd">添加图文</el-button> -->
      </div>
      <dTable :table-data="tableData" :table-header-data="tableHeaderData" :showLoading="showLoading">
        <template #operation="scope">
          <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
        </template>
        <template #cover_image="scope">
          <el-image style="width: 60px; height: 60px" :src="scope.row.cover_image"
            :preview-src-list="[scope.row.cover_image]">
          </el-image>
        </template>
      </dTable>
      <div class="block">
        <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
          @currentChange="onCurrentChange"></dFooter>
      </div>
    </el-card>
    <editpopUp v-if="editshow" :dialog-visible="editshow" :from-data="fromData" @cancel="editshow = false"
      @confirm="onConfirm" @close="editshow = false" />
  </div>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import timeOptions from '@/utils/timeOptions';
import operation from '@/components/operation/operation.vue'
import editpopUp from './editpopUp.vue'
import { getLessonSubjectList, deleteLessonSubject } from '@/api/content'

import { roterPre } from '@/settings'
export default {
  name: "LiveManage",
  components: {
    dTable,
    dFooter,
    editpopUp,
    operation
  },
  data() {
    return {
      roterPre,
      editshow: false,
      fromData: {
        id: null,
        image: '',
        svga: '',
        money: '',
        name: '123'
      },
      pickerOptions: timeOptions,
      pageConfig: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: 10,
        total: 0,
        disabled: false,
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      showLoading: false,
      tableFrom: {
        page: 1,
        limit: 10,
        name: ''
      },
      seckillStatusList: [],
      tableData: [],
      tableHeaderData: [
        { prop: 'id', label: '编号', columnType: 'text', align: 'left', 'min-width': '70' },
        { prop: 'name', label: '名称', columnType: 'text', align: 'left', 'min-width': '200' },
        // { prop: 'type', label: '类型', columnType: 'text', align: 'left', 'min-width': '200' },
        { prop: 'label', label: '标签', columnType: 'text', align: 'left', 'min-width': '200' },
        { prop: 'teacher_name', label: '讲师', columnType: 'text', align: 'left', 'min-width': '200' },
        { prop: 'cover_image', label: '封面', columnType: 'image', align: 'left', 'min-width': '200' },
        { prop: 'banner', label: '横幅', columnType: 'image', align: 'left', 'min-width': '200' },
        { prop: 'promotion_poster', label: '推广海报 ', columnType: 'image', align: 'left', 'min-width': '200' },
        { prop: 'is_pay', label: '是否付费课程', columnType: 'text', align: 'left', 'min-width': '200' },
        { prop: 'pay_money', label: '价格', columnType: 'text', align: 'left', 'min-width': '200' },
        { prop: 'vip_money', label: '会员价', columnType: 'text', align: 'left', 'min-width': '200' },
        // { prop: 'money', label: '拼团价', columnType: 'text', align: 'left', 'min-width': '200' },
        // { prop: 'details', label: '课程详情', columnType: 'text', align: 'left', 'min-width': '200' },
        // { prop: 'money', label: '拼团状态', columnType: 'text', align: 'left', 'min-width': '200' },
        { prop: 'only_vip_see', label: '是否仅会员可见', columnType: 'text', align: 'left', 'min-width': '200' },
        { prop: 'sort', label: '排序', columnType: 'text', align: 'left', 'min-width': '200' },
        { prop: 'money', label: '状态', columnType: 'text', align: 'left', 'min-width': '200' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData: [
        { name: 'edit', label: '编辑' },
        { name: 'del', label: '删除' },
      ],
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    onConfirm() {
      this.editshow = false
      this.getList(1)
    },
    onSizeChange(val) {
      this.tableFrom.limit = val
      this.getList()
    },
    onCurrentChange(val) {
      this.tableFrom.page = val
      this.getList()
    },
    onSearch() {
      this.getList(1)
    },
    // 重置
    searchReset() {
      // this.tableFrom.date = ""
      this.$refs.searchForm.resetFields()
      this.getList(1)
    },
    onadd() {
      this.editshow = true
      this.fromData = {}
    },
    onErtion(name, row) {
      switch (name) {
        case 'edit':
          this.$router.push({
            path: this.roterPre + '/content/course/special/article/addArticle3/' + row.id,
            query: {
              type: 3
            }
          })
          // this.fromData = { ...row }
          // this.editshow = true
          break
        case 'del':
          this.$confirm('是否删除此数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.IfdeleteLessonSubject(row.id)

          })
          break
      }
    },
    // 删除接口
    IfdeleteLessonSubject(str) {
      console.log(str)
      deleteLessonSubject(str).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getList()
      })
    },
    // 列表
    getList(num) {
      this.showLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page
      getLessonSubjectList({ type: 3, ...this.tableFrom })
        .then((res) => {
          this.showLoading = false
          res.data.data.map(item => {
            item.operation = this.operationData
          })
          this.tableData = res.data.data
          this.pageConfig.total = res.data.total
        })
        .catch((res) => {
          this.showLoading = false
          this.$message.error(res.message)
        })
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/form.scss';
</style>
