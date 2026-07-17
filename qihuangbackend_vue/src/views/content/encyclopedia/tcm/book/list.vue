<template>
  <div class="box">
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px" >
        <el-form-item label="书名：" prop="name">
          <el-input
            v-model="tableFrom.name"
            placeholder="请输入书名"
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
        <el-button size="small" type="primary" @click="onadd">添加</el-button>
      </div>
      <dTable @switchChange="switchChange" :table-data="tableData" :table-header-data="tableHeaderData" :showLoading="showLoading">
        <template #operation="scope">
          <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
        </template>
        <template #image="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.image"
            :preview-src-list="[scope.row.image]">
          </el-image>
        </template>
      </dTable>
      <div class="block">
        <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
        @currentChange="onCurrentChange"></dFooter>
      </div>
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
import { bookList,bookDelete, bookEdit } from '@/api/content'

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
        limit: 10,
        name:''
      },
      seckillStatusList:[],
      tableData: [],
      tableHeaderData: [
        { prop: 'name', label: '书名', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'cover', label: '封面', columnType: 'image', align: 'left', 'min-width': '249' },
        { prop: 'author', label: '作者', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'category', label: '分类', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'publisher', label: '出版社', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'copyright', label: '版权', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'word_count', label: '字数', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'publish_date', label: '出版日期', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'price', label: '价格', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'is_show', label: '是否显示', columnType: 'switch', align: 'left', 'min-width': '249' },
        // { prop: 'introduction', label: '简介', columnType: 'switch', align: 'left', 'min-width': '249' },
        { prop: 'create_time', label: '创建时间', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'update_time', label: '更新时间', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData:[
      { name: 'details', label: '详情' },
        { name: 'edit', label: '编辑' },
        { name: 'del', label: '删除'},
      ],
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    switchChange(e){
      bookEdit(e)
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
        case 'details':
          this.$router.push({
            path: './details',
            query: {
              id: row.id,
              name: row.name
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
              this.IfbookDelete(row.id)

            })
          break
      }
    },
    // 删除接口
    IfbookDelete(str) {
      bookDelete(str).then(res => {
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
      bookList(this.tableFrom)
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
