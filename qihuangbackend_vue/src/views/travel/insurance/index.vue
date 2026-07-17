<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">旅游保险管理</span>
      </div>
      <!-- 统计卡片 -->
      <el-row :gutter="15" class="stat-row">
        <el-col :span="4">
          <div class="stat-card">
            <div class="stat-value">{{ stat.total || 0 }}</div>
            <div class="stat-label">全部保单</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="stat-card pending">
            <div class="stat-value">{{ stat.pending || 0 }}</div>
            <div class="stat-label">待出单</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="stat-card issued">
            <div class="stat-value">{{ stat.issued || 0 }}</div>
            <div class="stat-label">已出单</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="stat-card expired">
            <div class="stat-value">{{ stat.expired || 0 }}</div>
            <div class="stat-label">已过期</div>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="stat-card cancelled">
            <div class="stat-value">{{ stat.cancelled || 0 }}</div>
            <div class="stat-label">已作废</div>
          </div>
        </el-col>
      </el-row>
      <!-- 筛选条件 -->
      <div class="filter-container">
        <el-form :inline="true" :model="listQuery" size="small">
          <el-form-item label="订单号">
            <el-input v-model="listQuery.order_id" placeholder="请输入订单号" clearable style="width: 200px;" />
          </el-form-item>
          <el-form-item label="保单号">
            <el-input v-model="listQuery.insurance_no" placeholder="请输入保单号" clearable style="width: 200px;" />
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="listQuery.status" placeholder="请选择状态" clearable style="width: 120px;">
              <el-option label="待出单" value="pending" />
              <el-option label="已出单" value="issued" />
              <el-option label="已过期" value="expired" />
              <el-option label="已作废" value="cancelled" />
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
        <el-table-column prop="insurance_no" label="保单号" width="180">
          <template slot-scope="scope">
            {{ scope.row.insurance_no || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="订单信息" min-width="200">
          <template slot-scope="scope">
            <div v-if="scope.row.order">
              <div>{{ scope.row.order.order_sn }}</div>
              <div class="sub-text">{{ scope.row.order.product_name }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="被保险人" width="120">
          <template slot-scope="scope">
            <div v-if="scope.row.guest">
              {{ scope.row.guest.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="保险类型" width="100">
          <template slot-scope="scope">
            {{ getInsuranceType(scope.row.type) }}
          </template>
        </el-table-column>
        <el-table-column label="保险期限" width="200">
          <template slot-scope="scope">
            {{ scope.row.start_date }} 至 {{ scope.row.end_date }}
          </template>
        </el-table-column>
        <el-table-column label="保费" width="100">
          <template slot-scope="scope">
            ¥{{ scope.row.price }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="getStatusType(scope.row.status)" size="small">
              {{ getStatusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetail(scope.row)">详情</el-button>
            <el-button v-if="scope.row.status === 'pending'" type="text" size="small" @click="handleIssue(scope.row)">出单</el-button>
            <el-button v-if="scope.row.status === 'issued'" type="text" size="small" @click="handleDownload(scope.row)">下载</el-button>
            <el-button v-if="['pending', 'issued'].includes(scope.row.status)" type="text" size="small" style="color: #f56c6c;" @click="handleCancel(scope.row)">作废</el-button>
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
    <el-dialog title="保单详情" :visible.sync="detailVisible" width="600px">
      <el-descriptions v-if="insuranceDetail" :column="2" border>
        <el-descriptions-item label="保单号">{{ insuranceDetail.insurance_no || '-' }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="getStatusType(insuranceDetail.status)" size="small">{{ getStatusText(insuranceDetail.status) }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="被保险人">{{ insuranceDetail.guest ? insuranceDetail.guest.name : '-' }}</el-descriptions-item>
        <el-descriptions-item label="证件号码">{{ insuranceDetail.guest ? insuranceDetail.guest.id_no : '-' }}</el-descriptions-item>
        <el-descriptions-item label="保险类型">{{ getInsuranceType(insuranceDetail.type) }}</el-descriptions-item>
        <el-descriptions-item label="保费">¥{{ insuranceDetail.price }}</el-descriptions-item>
        <el-descriptions-item label="保险期限" :span="2">{{ insuranceDetail.start_date }} 至 {{ insuranceDetail.end_date }}</el-descriptions-item>
        <el-descriptions-item label="出单时间">{{ insuranceDetail.issue_time || '-' }}</el-descriptions-item>
        <el-descriptions-item label="创建时间">{{ insuranceDetail.create_time }}</el-descriptions-item>
      </el-descriptions>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

    <!-- 出单弹窗 -->
    <el-dialog title="保单出单" :visible.sync="issueVisible" width="400px">
      <el-form ref="issueForm" :model="issueForm" :rules="issueRules" label-width="80px">
        <el-form-item label="保单号" prop="insurance_no">
          <el-input v-model="issueForm.insurance_no" placeholder="请输入保单号" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="issueVisible = false">取 消</el-button>
        <el-button type="primary" :loading="issueLoading" @click="submitIssue">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { insuranceList, insuranceDetail, insuranceStat, insuranceIssue, insuranceCancel } from '@/api/travel'

export default {
  name: 'TravelInsurance',
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      listQuery: { page: 1, limit: 10, order_id: '', insurance_no: '', status: '' },
      stat: {},
      detailVisible: false,
      insuranceDetail: null,
      issueVisible: false,
      issueLoading: false,
      issueForm: { insurance_no: '' },
      issueRules: {
        insurance_no: [{ required: true, message: '请输入保单号', trigger: 'blur' }]
      },
      currentId: null
    }
  },
  created() {
    this.getStat()
    this.getList()
  },
  methods: {
    getStat() {
      insuranceStat().then(res => {
        this.stat = res.data || {}
      })
    },
    getList() {
      this.loading = true
      insuranceList(this.listQuery).then(res => {
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
      this.listQuery = { page: 1, limit: 10, order_id: '', insurance_no: '', status: '' }
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
      insuranceDetail(row.id).then(res => {
        this.insuranceDetail = res.data
        this.detailVisible = true
      })
    },
    handleIssue(row) {
      this.currentId = row.id
      this.issueForm = { insurance_no: '' }
      this.issueVisible = true
      this.$nextTick(() => {
        this.$refs.issueForm && this.$refs.issueForm.clearValidate()
      })
    },
    submitIssue() {
      this.$refs.issueForm.validate(valid => {
        if (!valid) return
        this.issueLoading = true
        insuranceIssue(this.currentId, this.issueForm).then(() => {
          this.$message.success('出单成功')
          this.issueVisible = false
          this.getStat()
          this.getList()
        }).finally(() => {
          this.issueLoading = false
        })
      })
    },
    handleDownload(row) {
      if (row.policy_url) {
        window.open(row.policy_url, '_blank')
      } else {
        this.$message.warning('保单文件不存在')
      }
    },
    handleCancel(row) {
      this.$confirm('确定要作废该保单吗？', '提示', { type: 'warning' }).then(() => {
        insuranceCancel(row.id).then(() => {
          this.$message.success('作废成功')
          this.getStat()
          this.getList()
        })
      }).catch(() => {})
    },
    getStatusType(status) {
      const map = {
        pending: 'warning',
        issued: 'success',
        expired: 'info',
        cancelled: 'danger'
      }
      return map[status] || 'info'
    },
    getStatusText(status) {
      const map = {
        pending: '待出单',
        issued: '已出单',
        expired: '已过期',
        cancelled: '已作废'
      }
      return map[status] || status
    },
    getInsuranceType(type) {
      const map = {
        accident: '意外险',
        medical: '医疗险',
        comprehensive: '综合险'
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
  &.issued {
    background: #f0f9eb;
    .stat-value { color: #67c23a; }
  }
  &.expired {
    background: #f4f4f5;
    .stat-value { color: #909399; }
  }
  &.cancelled {
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
