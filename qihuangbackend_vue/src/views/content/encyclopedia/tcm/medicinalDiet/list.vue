<template>
  <div class="box">
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px">
        <el-form-item label="药膳名称：" prop="name">
          <el-input v-model="tableFrom.name" placeholder="请输入药膳名称" class="selWidth" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
          <el-button size="small" @click="searchReset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card class="mt14" style="flex: 1">
      <div class="mb14">
        <el-button size="small" type="primary" @click="onadd">添加</el-button>
      </div>
      <dTable @switchChange="switchChange" :table-data="tableData" :table-header-data="tableHeaderData" :showLoading="showLoading">
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
import { medicinalDietList, medicinalDietDelete, medicinalDietEdit } from '@/api/content'

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
      showLoading: false,
      tableFrom: {
        page: 1,
        limit: 10,
        name: ''
      },
      seckillStatusList: [],
      tableData: [],
      tableHeaderData: [
        // { prop: 'id', label: 'id', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'name', label: '药膳名称', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'image', label: '图片', columnType: 'image', align: 'left', 'min-width': '249' },
        { prop: 'source', label: '来源', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'effect', label: '功效描述', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'formula', label: '配方', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'suitable_people', label: '适宜人群', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'usage', label: '食用方法', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'compatibility', label: '相关配伍', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'efficacy_names', label: '药膳功效', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'description', label: '详细描述', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'is_show', label: '是否显示', columnType: 'switch', align: 'left', 'min-width': '249' },
        { prop: 'create_time', label: '创建时间', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'update_time', label: '更新时间', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData: [
        // { name: 'details', label: '详情' },
        { name: 'edit', label: '编辑' },
        { name: 'del', label: '删除' },
      ],
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    switchChange(e){
      medicinalDietEdit(e)
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
      this.fromData = {}
    },
    onErtion(name, row) {
      switch (name) {
        case 'details':
          this.$router.push({
            path: './details',
            query: {
              id: row.id
            }
          })
          break
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
            this.IfmedicinalDietDelete(row.id)

          })
          break
      }
    },
    // 删除接口
    IfmedicinalDietDelete(str) {
      medicinalDietDelete(str).then(res => {
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
      medicinalDietList(this.tableFrom)
        .then((res) => {
          this.showLoading = false
          res.data.list.map(item => {
            item.operation = this.operationData
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
