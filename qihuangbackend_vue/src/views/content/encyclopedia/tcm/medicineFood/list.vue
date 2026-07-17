<template>
  <div class="box">
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px">
        <el-form-item label="品类名称：" prop="name">
          <el-input v-model="tableFrom.name" placeholder="请输入品类名称" class="selWidth" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
          <el-button size="small" @click="searchReset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card class="mt14" style="flex: 1">
      <el-tabs v-model="tableFrom.type" @tab-click="getList(1)">
        <el-tab-pane v-for="(item, index) in headeNum" :key="index" :name="item.type" :label="item.name" />
      </el-tabs>
      <div class="mb14">
        <el-button size="small" type="primary" @click="onadd">添加</el-button>
      </div>
      <dTable @switchChange="switchChange" :table-data="tableData" :table-header-data="tableHeaderData"
        :showLoading="showLoading">
        <template #operation="scope">
          <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
        </template>
        <template #image="scope">
          <el-image style="width: 60px; height: 60px" :src="scope.row.image" :preview-src-list="[scope.row.image]">
          </el-image>
        </template>
      </dTable>
      <div class="block">
        <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
          @currentChange="onCurrentChange"></dFooter>
      </div>
    </el-card>
    <listpopUp v-if="editshow" :dialog-visible="editshow" :from-data="fromData" @cancel="editshow = false"
      @confirm="onConfirm" @close="editshow = false" />
  </div>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import timeOptions from '@/utils/timeOptions';
import operation from '@/components/operation/operation.vue'
import listpopUp from './listpopUp.vue'
import { medicineFoodList, medicineFoodDelete, medicineFoodEdit } from '@/api/content'

export default {
  name: "LiveManage",
  components: {
    dTable,
    dFooter,
    listpopUp,
    operation
  },
  data() {
    return {
      editshow: false,
      fromData: {
        id: null,
        name: '123',
        is_show: true,
        pid: 0,
        sort: 0
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
      headeNum: [
        { name: '中草药', type: 1 },
        { name: '食材', type: 2 },
      ],
      showLoading: false,
      tableFrom: {
        page: 1,
        limit: 10,
        name: '',
        type: 1
      },
      seckillStatusList: [],
      tableData: [],
      tableHeaderData: [
        // { prop: 'id', label: 'id', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'name', label: '名称', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'image', label: '图片', columnType: 'image', align: 'left', 'min-width': '249' },
        { prop: 'category_name', label: '分类', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'efficacy_category_names', label: '功效分类', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'family', label: '科属与学名', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'alias_origin', label: '别名与产地', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'property_meridian', label: '性味与归经', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'property', label: '药性', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'effect', label: '功效', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'clinical', label: '临床应用', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'ingredient_nutrition', label: '成分与营养', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'literature', label: '文献摘要', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'comment', label: '按语', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'appendix', label: '附录', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'description', label: '详细描述', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'is_show', label: '是否显示', columnType: 'switch', align: 'left', 'min-width': '249' },
        // { prop: 'type', label: '类型', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'create_time', label: '创建时间', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'update_time', label: '更新时间', columnType: 'text', align: 'left', 'min-width': '249' },
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
    switchChange(e) {
      medicineFoodEdit(e)
    },
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
      this.$refs.searchForm.resetFields()
      this.getList(1)
    },
    onadd() {
      this.editshow = true
      this.fromData = {
        type: this.tableFrom.type
      }
    },
    onErtion(name, row) {
      switch (name) {
        case 'edit':
          this.fromData = { ...row }
          this.editshow = true
          break
        case 'del':
          this.$confirm('是否删除此数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.IfmedicineFoodDelete(row.id)

          })
          break
      }
    },
    // 删除接口
    IfmedicineFoodDelete(str) {
      medicineFoodDelete(str).then(res => {
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
      medicineFoodList(this.tableFrom)
        .then((res) => {
          this.showLoading = false
          res.data.list.map(item => {
            item.operation = this.operationData
            item.efficacy_category_names = item.efficacy_category_names.toString()
          })
          this.tableData = res.data.list
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
