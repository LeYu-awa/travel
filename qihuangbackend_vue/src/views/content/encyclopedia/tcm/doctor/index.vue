<template>
  <div class="box">
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px" >
        <el-form-item label="姓名：" prop="name">
          <el-input
            v-model="tableFrom.name"
            placeholder="请输入姓名"
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
      <dTable :table-data="tableData" :table-header-data="tableHeaderData" :showLoading="showLoading" @switchChange="switchChange">
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
import { doctorList,doctorDelete, doctorEdit } from '@/api/content'

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
        { prop: 'name', label: '姓名', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'alias', label: '别名', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'dynasty', label: '朝代', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'birthplace', label: '出生地', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'avatar', label: '头像', columnType: 'image', align: 'left', 'min-width': '249' },
        { prop: 'representative', label: '代表作', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'specialty', label: '专长', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'profile', label: '简介', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'experience', label: '经历', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'academic', label: '学术成就', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'clinical', label: '临床经验', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'anecdote', label: '轶事', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'influence', label: '影响力', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'is_show', label: '是否显示', columnType: 'switch', align: 'left', 'min-width': '249' },
        { prop: 'create_time', label: '创建时间', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'update_time', label: '更新时间', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData:[
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
      doctorEdit(e)
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
              this.IfdoctorDelete(row.id)

            })
          break
      }
    },
    // 删除接口
    IfdoctorDelete(str) {
      doctorDelete(str).then(res => {
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
      doctorList(this.tableFrom)
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
