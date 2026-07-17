<template>
  <div class="box">
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px" >
        <el-form-item label="名称：" prop="name">
          <el-input
            v-model="tableFrom.name"
            placeholder="请输入名称"
            class="selWidth"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
          <el-button size="small" @click="searchReset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card class="mt14" style="flex: 1">
      <div class="mb14">
        <el-button size="small" type="primary" @click="onadd">添加分类</el-button>
      </div>

      <dTable :table-data="tableData"
        :default-expand-all="false"
        :tree-config="{rowKey:'id',children: 'children', hasChildren: 'hasChildren'}" :table-header-data="tableHeaderData" :showLoading="showLoading">
        <template #operation="scope">
          <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
        </template>
      </dTable>
      <!-- <div class="block">
        <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
        @currentChange="onCurrentChange"></dFooter>
      </div> -->
    </el-card>
    <editpopUp
      v-if="editshow"
      :dialog-visible="editshow"
      :from-data="fromData"
      @cancel="editshow=false"
      @confirm="onConfirm"
      @close="editshow=false"
    />
  </div>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import timeOptions from '@/utils/timeOptions';
import operation from '@/components/operation/operation.vue'
import editpopUp from './editpopUp.vue'
import { getLessonList,deleteLesson } from '@/api/content'
import { handleTree } from '@/utils/tree'
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
        name:'123',
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
        limit: 20,
        name:''
      },
      seckillStatusList:[],
      tableData: [],
      tableHeaderData: [
        // { prop: 'id', label: '编号', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'name', label: '分类名称', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'logo', label: '图片', columnType: 'image', align: 'left', 'min-width': '249' },
        // { prop: 'money', label: '专题数量', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'sort', label: '排序', columnType: 'text', align: 'left', 'min-width': '249' },
        // { prop: 'is_show', label: '状态', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData:[
        { name: 'add', label: '新增下级' },
        { name: 'edit', label: '编辑' },
        { name: 'del', label: '删除'},
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
    searchReset(){
      this.$refs.searchForm.resetFields()
      this.getList(1)
    },
    onadd() {
      this.editshow = true
      this.fromData = {}
    },
    onErtion(name, row) {
      switch (name) {
        case 'add':
          this.fromData = { pid: row.id,pName: row.name }
          this.editshow = true
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
              this.IfdeleteLesson(row.id)

            })
          break
      }
    },
    // 删除接口
    IfdeleteLesson(str) {
      deleteLesson(str).then(res => {
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
      this.tableFrom.search = ''
      getLessonList(this.tableFrom)
        .then((res) => {
          this.showLoading = false
          res.data.map(item => {
            item.operation = this.operationData
          })
          this.tableData = handleTree(res.data, 'id', 'pid')
          this.pageConfig.total = res.data.length
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
