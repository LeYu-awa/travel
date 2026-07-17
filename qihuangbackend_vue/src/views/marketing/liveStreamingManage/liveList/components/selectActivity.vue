<template>
  <div>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="68%" @close="close">
    <div class="divBox">
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px" >
        <el-form-item label="活动名称" prop="keyword">
          <el-input
            v-model="tableFrom.keyword"
            placeholder="请输入商品名称，关键字，产品编号"
            class="selWidth"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onsearch">搜索</el-button>
          <el-button size="small" @click="searchReset()">重置</el-button> 
        </el-form-item>
      </el-form>
    </div>
    <el-card class="mt14">
      <div>活动列表</div>
      <dTable 
      :showSelection="true" 
      :table-data="tableData" 
      :show-loading="showLoading" 
      :table-header-data="tableHeaderData"
      @multipleSelection="onMultipleSelection"
      >
        <template #image="scope">
          <el-image 
            style="width: 60px; height: 60px"
            :src="scope.row.pic" 
            :preview-src-list="[scope.row.pic]">
          </el-image>
        </template>
      </dTable>
      <div class="block">
        <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
        @currentChange="onCurrentChange"></dFooter>
      </div>
    </el-card>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import { getActivityList } from '@/api/liveStreamingManage'
export default {
  components: {
    dTable,
    dFooter
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
        keyword:'',
        type_id: '',
        page: 1,
        limit: 20
      },
      tableData: [],
      tableHeaderData: [
        { prop: 'activity_id', label: '编号', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'activity_name', label: '活动名称', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'image', label: '封面', columnType: 'slot', align: 'left', 'min-width': '249' }
      ],
      setdata:[]
    }
  },
  mounted() {
    this.getActivityList()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    onSizeChange(val) {
      // this.searchFromData.pageSize = val
      // this.fetchData()
    },
    onCurrentChange(val) {
      // this.searchFromData.pageNo = val
      // this.fetchData()
    },
    // 具体日期
    onchangeTime(e) {
      console.log(e)
      // this.tableFrom.timeVal = e;
      // this.tableFrom.timeVal = e ? this.timeVal.join("-") : "";
      // this.getList(1);
    },
    // 重置
    searchReset(){
      // this.tableFrom.date = ""
      this.$refs.searchForm.resetFields()
    },
    onsearch() {
      this.tableFrom.page = 1
      this.getActivityList()
    },
    getActivityList() {
      this.showLoading = true
      getActivityList(this.tableFrom)
        .then((res) => {
          this.showLoading = false
          this.tableData = res.data.list
          console.log(this.tableData)
          this.pageConfig.total = res.data.count
        })
        .catch((res) => {
          this.showLoading = false
          this.$message.error(res.message)
        })
    },
    confirm() {
      
      this.$emit('onConfirm', this.setdata)
    },
    onMultipleSelection(e) {
      console.log('选中数据', e)
      this.setdata = e
    }
  }
}
</script>
<style scoped lang="less"></style>
