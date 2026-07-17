<template>
  <div class="box">
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px" >
        <el-form-item label="id" prop="order_id">
          <el-input
            v-model="tableFrom.name"
            placeholder="请输入订单号"
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
      </div>

      <dTable :table-data="tableData"
        :default-expand-all="false"
        :tree-config="{rowKey:'id',children: 'children', hasChildren: 'hasChildren'}" :table-header-data="tableHeaderData" :showLoading="showLoading">
        <template #operation="scope">
          <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
        </template>
        <template #pay_status="scope">
         <span :style="{color: scope.row.pay_status == 0 ? 'red' : ''}">{{ pay_status[scope.row.pay_status] }}</span> 
         </template>
         <template #order_status="scope">
         <span :style="{color: scope.row.order_status == 0 ? 'red' : ''}">{{ order_status[scope.row.order_status] }}</span> 
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
import { healthVideoOrderList,healthVideoOrderDelete } from '@/api/marketing'
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
        limit: 10,
        name:'',
        pay_status: 'all',
        order_status:'all',
        is_del:'all'
      },
      pay_status: {
        0: '未支付',
        1: '已支付',
        2: '已退款',
      },
      order_status: {
        0: '待支付',
        1: '已支付',
        2: '已取消',
        3: '已退款',
      },
      seckillStatusList:[],
      tableData: [],
      tableHeaderData: [
        // { prop: 'id', label: '编号', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'order_id', label: '订单号', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'uid', label: '用户ID', columnType: 'text', align: 'left', 'min-width': '150' },
        { prop: 'video_course_image', label: '视频课程封面', columnType: 'image', align: 'left', 'min-width': '150' },
        { prop: 'video_course_id', label: '视频课程ID', columnType: 'text', align: 'left', 'min-width': '150' },
        { prop: 'video_course_name', label: '视频课程', columnType: 'text', align: 'left', 'min-width': '180' },
        { prop: 'addres', label: '地址', columnType: 'text', align: 'left', 'min-width': '180' },
        { prop: 'video_course_price', label: '视频课程价格', columnType: 'text', align: 'left', 'min-width': '120' },
        { prop: 'pay_price', label: '支付价格', columnType: 'text', align: 'left', 'min-width': '120' },
        { prop: 'pay_type', label: '支付方式', columnType: 'text', align: 'left', 'min-width': '120' },
        { prop: 'pay_status', label: '支付状态', columnType: 'slot', align: 'left', 'min-width': '120' },
        { prop: 'order_status', label: '订单状态', columnType: 'slot', align: 'left', 'min-width': '120' },
        { prop: 'remark', label: '备注', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'create_time_text', label: '创建时间', columnType: 'text', align: 'left', 'min-width': '180' },
        { prop: 'update_time_text', label: '更新时间', columnType: 'text', align: 'left', 'min-width': '180' },
        { prop: 'pay_time_text', label: '支付时间', columnType: 'text', align: 'left', 'min-width': '180' },
        { prop: 'cancel_time_text', label: '取消时间', columnType: 'text', align: 'left', 'min-width': '180' },
        { prop: 'refund_time_text', label: '退款时间', columnType: 'text', align: 'left', 'min-width': '180' },
        
        // { prop: 'money', label: '专题数量', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'sort', label: '排序', columnType: 'text', align: 'left', 'min-width': '100' },
        // { prop: 'is_show', label: '状态', columnType: 'text', align: 'left', 'min-width': '249' },
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
              this.IfhealthVideoOrderDelete(row.id)

            })
          break
      }
    },
    // 删除接口
    IfhealthVideoOrderDelete(str) {
      healthVideoOrderDelete(str).then(res => {
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
      healthVideoOrderList(this.tableFrom)
        .then((res) => {
          this.showLoading = false
          res.data.list.map(item => {
            item.operation = this.operationData
          })
          this.tableData = res.data.list
          this.pageConfig.total = res.data.count
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
