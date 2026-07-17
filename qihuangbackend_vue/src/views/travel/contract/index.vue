<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">旅游合同管理</span>
      </div>
      <!-- 统计卡片 -->
      <el-row :gutter="20" class="stat-row">
        <el-col :span="6">
          <div class="stat-card">
            <div class="stat-value">{{ stat.total || 0 }}</div>
            <div class="stat-label">全部合同</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card pending">
            <div class="stat-value">{{ stat.pending || 0 }}</div>
            <div class="stat-label">待签署</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card signed">
            <div class="stat-value">{{ stat.signed || 0 }}</div>
            <div class="stat-label">已签署</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card rejected">
            <div class="stat-value">{{ stat.rejected || 0 }}</div>
            <div class="stat-label">已拒绝</div>
          </div>
        </el-col>
      </el-row>
      <!-- 筛选条件 -->
      <div class="filter-container">
        <el-form :inline="true" :model="listQuery" size="small">
          <el-form-item label="订单号">
            <el-input v-model="listQuery.order_id" placeholder="请输入订单号" clearable style="width: 200px;" />
          </el-form-item>
          <el-form-item label="合同号">
            <el-input v-model="listQuery.contract_no" placeholder="请输入合同号" clearable style="width: 200px;" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="listQuery.status" placeholder="请选择状态" clearable style="width: 120px;">
              <el-option label="待签署" value="pending" />
              <el-option label="已签署" value="signed" />
              <el-option label="已拒绝" value="rejected" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">搜索</el-button>
            <el-button @click="resetFilter">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 表格 -->
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="contract_no" label="合同号" width="180" />
        <el-table-column label="订单信息" min-width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.order">
              <div>{{ scope.row.order.order_sn }}</div>
              <div class="sub-text">{{ scope.row.order.product_name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="签署人" width="120">
          <template slot-scope="scope">
            {{ scope.row.signer_name || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)" size="small">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160">
          <template slot-scope="scope">
            {{ scope.row.create_time }}
          </template>
        </el-table-column>
        <el-table-column label="签署时间" width="160">
          <template slot-scope="scope">
            {{ scope.row.sign_time || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetail(scope.row)">详情</el-button>
            <el-button v-if="scope.row.status === 'pending'" type="text" size="small" @click="handleResend(scope.row)">重发</el-button>
            <el-button v-if="scope.row.status === 'signed'" type="text" size="small" @click="handleDownload(scope.row)">下载</el-button>
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

    <!-- 详情弹窗 -->
    <el-dialog title="合同详情" :visible.sync="detailVisible" width="600px">
      <el-descriptions v-if="contractDetail" :column="2" border>
        <el-descriptions-item label="合同号">{{ contractDetail.contract_no }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(contractDetail.status)" size="small">{{ getStatusText(contractDetail.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="签署人">{{ contractDetail.signer_name || '-' }}</el-descriptions-item>
        <el-descriptions-item label="签署人电话">{{ contractDetail.signer_phone || '-' }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ contractDetail.create_time }}</el-descriptions-item>
        <el-descriptions-item label="签署时间">{{ contractDetail.sign_time || '-' }}</el-descriptions-item>
        <el-descriptions-item label="签署IP">{{ contractDetail.sign_ip || '-' }}</el-descriptions-item>
        <el-descriptions-item label="合同文件" v-if="contractDetail.contract_url">
          <el-link type="primary" :href="contractDetail.contract_url" target="_blank">查看合同</el-link>
        </el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { contractList, contractDetail, contractStat, contractResend } from '@/api/travel'

export default {
  name: 'TravelContract',
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      listQuery: { page: 1, limit: 10, order_id: '', contract_no: '', status: '' },
      stat: {},
      detailVisible: false,
      contractDetail: null
    }
  },
  created() {
    this.getStat()
    this.getList()
  },
  methods: {
    getStat() {
      contractStat().then(res => {
        this.stat = res.data || {}
      })
    },
    getList() {
      this.loading = true
      contractList(this.listQuery).then(res => {
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
      this.listQuery = { page: 1, limit: 10, order_id: '', contract_no: '', status: '' }
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
      contractDetail(row.id).then(res => {
        this.contractDetail = res.data
        this.detailVisible = true
      })
    },
    handleResend(row) {
      this.$confirm('确定要重新发送签约邀请吗？', '提示', { type: 'warning' }).then(() => {
        contractResend(row.id).then(() => {
          this.$message.success('已重新发送')
        })
      }).catch(() => {})
    },
    handleDownload(row) {
      if (row.contract_url) {
        window.open(row.contract_url, '_blank')
      } else {
        this.$message.warning('合同文件不存在')
      }
    },
    getStatusType(status) {
      const map = {
        pending: 'warning',
        signed: 'success',
        rejected: 'danger'
      }
      return map[status] || 'info'
    },
    getStatusText(status) {
      const map = {
        pending: '待签署',
        signed: '已签署',
        rejected: '已拒绝'
      }
      return map[status] || status
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
  &.signed {
    background: #f0f9eb;
    .stat-value { color: #67c23a; }
  }
  &.rejected {
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
.sub-text {
  font-size: 12px;
  color: #909399;
}
</style>
