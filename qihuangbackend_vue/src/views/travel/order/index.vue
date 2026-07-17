<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">旅游订单管理</span>
      </div>
      <!-- 统计卡片 -->
      <el-row :gutter="20" class="stat-row">
        <el-col :span="4">
          <div class="stat-card">
            <div class="stat-value">{{ stat.total || 0 }}</div>
            <div class="stat-label">全部订单</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="stat-card pending">
            <div class="stat-value">{{ stat.pending || 0 }}</div>
            <div class="stat-label">待支付</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="stat-card paid">
            <div class="stat-value">{{ stat.paid || 0 }}</div>
            <div class="stat-label">已支付</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="stat-card confirmed">
            <div class="stat-value">{{ stat.confirmed || 0 }}</div>
            <div class="stat-label">已确认</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="stat-card cancelled">
            <div class="stat-value">{{ stat.cancelled || 0 }}</div>
            <div class="stat-label">已取消</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="stat-card refunded">
            <div class="stat-value">{{ stat.refunded || 0 }}</div>
            <div class="stat-label">已退款</div>
          </div>
        </el-col>
      </el-row>
      <!-- 筛选条件 -->
      <div class="filter-container">
        <el-form :inline="true" :model="listQuery" size="small">
          <el-form-item label="订单号">
            <el-input v-model="listQuery.order_sn" placeholder="请输入订单号" clearable style="width: 200px;" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="listQuery.status" placeholder="请选择状态" clearable style="width: 120px;">
              <el-option label="待支付" value="pending" />
              <el-option label="已支付" value="paid" />
              <el-option label="已确认" value="confirmed" />
              <el-option label="已取消" value="cancelled" />
              <el-option label="已退款" value="refunded" />
            </el-select>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-date-picker v-model="listQuery.date_range" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 240px;" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">搜索</el-button>
            <el-button @click="resetFilter">重置</el-button>
            <el-button type="success" @click="handleExport">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格 -->
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="order_sn" label="订单号" width="180" />
        <el-table-column label="产品信息" min-width="200">
          <template slot-scope="scope">
            <div class="product-info">
              <span class="product-name">{{ scope.row.product_name }}</span>
              <span class="departure-date">出发: {{ formatDate(scope.row.departure_date) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="人数" width="100">
          <template slot-scope="scope">
            成{{ scope.row.adult_num }} / 童{{ scope.row.child_num }}
          </template>
        </el-table-column>
        <el-table-column label="订单金额" width="120">
          <template slot-scope="scope">
            <span class="price">¥{{ scope.row.total_price }}</span>
          </template>
        </el-table-column>
        <el-table-column label="支付金额" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.pay_price" class="price">¥{{ scope.row.pay_price }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)" size="small">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="下单时间" width="160">
          <template slot-scope="scope">
            {{ formatDateTime(scope.row.create_time) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetail(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="handleGuests(scope.row)">出行人</el-button>
            <el-button v-if="scope.row.status === 'paid'" type="text" size="small" @click="handleConfirm(scope.row)">确认</el-button>
            <el-button v-if="scope.row.status === 'pending'" type="text" size="small" style="color: #f56c6c;" @click="handleCancel(scope.row)">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!-- 订单详情弹窗 -->
    <el-dialog title="订单详情" :visible.sync="detailVisible" width="700px">
      <el-descriptions v-if="orderDetail" :column="2" border>
        <el-descriptions-item label="订单号">{{ orderDetail.order_sn }}</el-descriptions-item>
        <el-descriptions-item label="订单状态">
          <el-tag :type="getStatusType(orderDetail.status)" size="small">{{ getStatusText(orderDetail.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="产品名称" :span="2">{{ orderDetail.product_name }}</el-descriptions-item>
        <el-descriptions-item label="出发日期">{{ formatDate(orderDetail.departure_date) }}</el-descriptions-item>
        <el-descriptions-item label="行程天数">{{ orderDetail.days }}天</el-descriptions-item>
        <el-descriptions-item label="成人数量">{{ orderDetail.adult_num }}</el-descriptions-item>
        <el-descriptions-item label="儿童数量">{{ orderDetail.child_num }}</el-descriptions-item>
        <el-descriptions-item label="单房差数量">{{ orderDetail.single_room_num || 0 }}</el-descriptions-item>
        <el-descriptions-item label="单房差金额">¥{{ orderDetail.single_room_price || 0 }}</el-descriptions-item>
        <el-descriptions-item label="订单金额">¥{{ orderDetail.total_price }}</el-descriptions-item>
        <el-descriptions-item label="优惠金额">¥{{ orderDetail.coupon_price || 0 }}</el-descriptions-item>
        <el-descriptions-item label="支付金额">¥{{ orderDetail.pay_price || 0 }}</el-descriptions-item>
        <el-descriptions-item label="联系人">{{ orderDetail.contact_name }}</el-descriptions-item>
        <el-descriptions-item label="联系电话">{{ orderDetail.contact_phone }}</el-descriptions-item>
        <el-descriptions-item label="下单时间">{{ formatDateTime(orderDetail.create_time) }}</el-descriptions-item>
        <el-descriptions-item label="支付时间">{{ formatDateTime(orderDetail.pay_time) }}</el-descriptions-item>
        <el-descriptions-item label="备注" :span="2">{{ orderDetail.remark || '-' }}</el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 出行人弹窗 -->
    <el-dialog title="出行人信息" :visible.sync="guestsVisible" width="800px">
      <el-table :data="guestList" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="100" />
        <el-table-column prop="id_type" label="证件类型" width="100">
          <template slot-scope="scope">
            {{ scope.row.id_type === 'idcard' ? '身份证' : '护照' }}
          </template>
        </el-table-column>
        <el-table-column prop="id_no" label="证件号码" width="180" />
        <el-table-column prop="phone" label="手机号" width="120" />
        <el-table-column label="人群类型" width="100">
          <template slot-scope="scope">
            {{ getGuestType(scope.row.guest_type) }}
          </template>
        </el-table-column>
        <el-table-column prop="birthday" label="出生日期" width="120" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="guestsVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { orderList, orderDetail, orderStat, orderGuests, orderConfirm, orderCancel, orderExport } from '@/api/travel'

export default {
  name: 'TravelOrder',
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      listQuery: { page: 1, limit: 10, order_sn: '', status: '', date_range: [] },
      stat: {},
      detailVisible: false,
      orderDetail: null,
      guestsVisible: false,
      guestList: []
    }
  },
  created() {
    this.getStat()
    this.getList()
  },
  methods: {
    getStat() {
      orderStat().then(res => {
        this.stat = res.data || {}
      })
    },
    getList() {
      this.loading = true
      const params = { ...this.listQuery }
      if (this.listQuery.date_range && this.listQuery.date_range.length === 2) {
        params.start_date = this.listQuery.date_range[0]
        params.end_date = this.listQuery.date_range[1]
      }
      delete params.date_range
      orderList(params).then(res => {
        this.tableData = res.data.list || []
        this.total = res.data.count || 0
      }).finally(() => {
        this.loading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetFilter() {
      this.listQuery = { page: 1, limit: 10, order_sn: '', status: '', date_range: [] }
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleDetail(row) {
      orderDetail(row.id).then(res => {
        this.orderDetail = res.data
        this.detailVisible = true
      })
    },
    handleGuests(row) {
      orderGuests(row.id).then(res => {
        this.guestList = res.data || []
        this.guestsVisible = true
      })
    },
    handleConfirm(row) {
      this.$confirm('确定要确认该订单吗？', '提示', { type: 'warning' }).then(() => {
        orderConfirm(row.id).then(() => {
          this.$message.success('确认成功')
          this.getStat()
          this.getList()
        })
      }).catch(() => {})
    },
    handleCancel(row) {
      this.$prompt('请输入取消原因', '取消订单', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /\S+/,
        inputErrorMessage: '请输入取消原因'
      }).then(({ value }) => {
        orderCancel(row.id, { reason: value }).then(() => {
          this.$message.success('取消成功')
          this.getStat()
          this.getList()
        })
      }).catch(() => {})
    },
    handleExport() {
      const params = { ...this.listQuery }
      delete params.page
      delete params.limit
      orderExport(params).then(res => {
        const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `旅游订单_${new Date().getTime()}.xlsx`
        link.click()
        window.URL.revokeObjectURL(url)
      })
    },
    formatDate(date) {
      if (!date) return '-'
      return date.substring(0, 10)
    },
    formatDateTime(datetime) {
      if (!datetime) return '-'
      return datetime
    },
    getStatusType(status) {
      const map = {
        pending: 'warning',
        paid: 'primary',
        confirmed: 'success',
        cancelled: 'info',
        refunded: 'danger'
      }
      return map[status] || 'info'
    },
    getStatusText(status) {
      const map = {
        pending: '待支付',
        paid: '已支付',
        confirmed: '已确认',
        cancelled: '已取消',
        refunded: '已退款'
      }
      return map[status] || status
    },
    getGuestType(type) {
      const map = {
        adult: '成人',
        big_child: '大童',
        mid_child: '中童',
        small_child: '小童'
      }
      return map[type] || type
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  font-size: 16px;
  font-weight: 500;
}
.stat-row {
  margin-bottom: 20px;
}
.stat-card {
  background: #f5f7fa;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  .stat-value {
    font-size: 24px;
    font-weight: 600;
    color: #303133;
  }
  .stat-label {
    font-size: 12px;
    color: #909399;
    margin-top: 5px;
  }
  &.pending {
    background: #fdf6ec;
    .stat-value { color: #e6a23c; }
  }
  &.paid {
    background: #ecf5ff;
    .stat-value { color: #409eff; }
  }
  &.confirmed {
    background: #f0f9eb;
    .stat-value { color: #67c23a; }
  }
  &.cancelled {
    background: #f4f4f5;
    .stat-value { color: #909399; }
  }
  &.refunded {
    background: #fef0f0;
    .stat-value { color: #f56c6c; }
  }
}
.filter-container {
  margin-bottom: 20px;
}
.el-pagination {
  margin-top: 20px;
  text-align: right;
}
.price {
  color: #f56c6c;
  font-weight: 500;
}
.product-info {
  display: flex;
  flex-direction: column;
  .product-name {
    font-weight: 500;
  }
  .departure-date {
    font-size: 12px;
    color: #909399;
  }
}
</style>
