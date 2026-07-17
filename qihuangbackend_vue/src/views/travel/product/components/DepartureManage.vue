<template>
  <el-dialog title="团期管理" :visible.sync="dialogVisible" width="1150px" :close-on-click-modal="false">
    <div class="departure-header">
      <el-button type="primary" size="small" @click="handleAdd">添加团期</el-button>
      <el-button type="success" size="small" @click="handleBatch">批量添加</el-button>
    </div>
    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column label="出发日期" width="120">
        <template slot-scope="scope">
          {{ formatDate(scope.row.date) }}
        </template>
      </el-table-column>
      <el-table-column label="成人价" width="100">
        <template slot-scope="scope">
          {{ scope.row.adult_price || 0 }}
        </template>
      </el-table-column>
      <el-table-column label="儿童价" width="100">
        <template slot-scope="scope">
          {{ scope.row.child_price || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="单房差" width="100">
        <template slot-scope="scope">
          {{ scope.row.single_room_diff || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="大床房库存" width="100">
        <template slot-scope="scope">
          {{ scope.row.king_room_stock || 0 }}/{{ scope.row.king_room_sold || 0 }}
        </template>
      </el-table-column>
      <el-table-column label="双床房库存" width="100">
        <template slot-scope="scope">
          {{ scope.row.twin_room_stock || 0 }}/{{ scope.row.twin_room_sold || 0 }}
        </template>
      </el-table-column>
      <el-table-column label="库存" width="80">
        <template slot-scope="scope">
          <span :class="{ 'low-stock': scope.row.stock < 5 }">{{ scope.row.stock }}</span>
        </template>
      </el-table-column>
      <el-table-column label="已售" width="80">
        <template slot-scope="scope">
          {{ scope.row.sold }}
        </template>
      </el-table-column>
      <el-table-column label="状态" width="80">
        <template slot-scope="scope">
          <el-tag :type="getStatusType(scope.row.status)" size="small">
            {{ getStatusText(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" style="color: #f56c6c;" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑团期弹窗 -->
    <el-dialog :title="editId ? '编辑团期' : '添加团期'" :visible.sync="editVisible" width="600px" append-to-body :close-on-click-modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" size="small">
        <el-form-item label="出发日期" prop="date">
          <el-date-picker v-model="form.date" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" style="width: 100%;" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="成人价" prop="adult_price">
              <el-input-number v-model="form.adult_price" :min="0" :precision="2" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="儿童价">
              <el-input-number v-model="form.child_price" :min="0" :precision="2" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单房差">
              <el-input-number v-model="form.single_room_diff" :min="0" :precision="2" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总库存" prop="stock">
              <el-input-number v-model="form.stock" :min="0" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="大床房库存">
              <el-input-number v-model="form.king_room_stock" :min="0" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="双床房库存">
              <el-input-number v-model="form.twin_room_stock" :min="0" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="状态">
              <el-select v-model="form.status" placeholder="请选择状态" style="width: 100%;">
                <el-option label="可订" value="available" />
                <el-option label="满员" value="full" />
                <el-option label="可预约" value="reserve" />
                <el-option label="已过期" value="expired" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 批量添加弹窗 -->
    <el-dialog title="批量添加团期" :visible.sync="batchVisible" width="600px" append-to-body :close-on-click-modal="false">
      <el-form ref="batchForm" :model="batchForm" :rules="batchRules" label-width="100px" size="small">
        <el-form-item label="日期范围" prop="date_range">
          <el-date-picker v-model="batchForm.date_range" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="选择周">
          <el-checkbox-group v-model="batchForm.weekdays">
            <el-checkbox :label="1">周一</el-checkbox>
            <el-checkbox :label="2">周二</el-checkbox>
            <el-checkbox :label="3">周三</el-checkbox>
            <el-checkbox :label="4">周四</el-checkbox>
            <el-checkbox :label="5">周五</el-checkbox>
            <el-checkbox :label="6">周六</el-checkbox>
            <el-checkbox :label="0">周日</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="成人价" prop="adult_price">
              <el-input-number v-model="batchForm.adult_price" :min="0" :precision="2" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="儿童价">
              <el-input-number v-model="batchForm.child_price" :min="0" :precision="2" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="单房差">
              <el-input-number v-model="batchForm.single_room_diff" :min="0" :precision="2" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总库存" prop="stock">
              <el-input-number v-model="batchForm.stock" :min="0" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="大床房库存">
              <el-input-number v-model="batchForm.king_room_stock" :min="0" style="width: 100%;" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="双床房库存">
              <el-input-number v-model="batchForm.twin_room_stock" :min="0" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchVisible = false">取 消</el-button>
        <el-button type="primary" :loading="batchLoading" @click="handleBatchSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { departureList, departureCreate, departureUpdate, departureDelete, departureBatch } from '@/api/travel'

export default {
  name: 'DepartureManage',
  props: {
    visible: { type: Boolean, default: false },
    productId: { type: Number, default: null }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      tableData: [],
      editVisible: false,
      editId: null,
      submitLoading: false,
      form: {
        date: '',
        adult_price: 0,
        child_price: 0,
        single_room_diff: 0,
        stock: 0,
        king_room_stock: 0,
        twin_room_stock: 0,
        status: 'available'
      },
      rules: {
        date: [{ required: true, message: '请选择日期', trigger: 'change' }],
        adult_price: [{ required: true, message: '请输入成人价', trigger: 'blur' }],
        stock: [{ required: true, message: '请输入库存', trigger: 'blur' }]
      },
      batchVisible: false,
      batchLoading: false,
      batchForm: {
        date_range: [],
        weekdays: [1, 2, 3, 4, 5, 6, 0],
        adult_price: 0,
        child_price: 0,
        single_room_diff: 0,
        stock: 0,
        king_room_stock: 0,
        twin_room_stock: 0
      },
      batchRules: {
        date_range: [{ required: true, message: '请选择日期范围', trigger: 'change' }],
        adult_price: [{ required: true, message: '请输入成人价', trigger: 'blur' }],
        stock: [{ required: true, message: '请输入库存', trigger: 'blur' }]
      }
    }
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
      if (val && this.productId) {
        this.getList()
      }
    },
    dialogVisible(val) {
      this.$emit('update:visible', val)
    }
  },
  mounted() {
    if (this.visible) {
      this.dialogVisible = true
      if (this.productId) {
        this.getList()
      }
    }
  },
  methods: {
    getList() {
      this.loading = true
      departureList(this.productId).then(res => {
        if (res.data && Array.isArray(res.data.list)) {
          this.tableData = res.data.list
        } else if (Array.isArray(res.data)) {
          this.tableData = res.data
        } else {
          this.tableData = []
        }
      }).finally(() => {
        this.loading = false
      })
    },
    formatDate(date) {
      if (!date) return '-'
      return date.substring(0, 10)
    },
    handleAdd() {
      this.editId = null
      this.form = {
        date: '',
        adult_price: 0,
        child_price: 0,
        single_room_diff: 0,
        stock: 0,
        king_room_stock: 0,
        twin_room_stock: 0,
        status: 'available'
      }
      this.editVisible = true
      this.$nextTick(() => {
        this.$refs.form && this.$refs.form.clearValidate()
      })
    },
    handleEdit(row) {
      this.editId = row.id
      this.form = {
        date: row.date,
        adult_price: row.adult_price,
        child_price: row.child_price || 0,
        single_room_diff: row.single_room_diff || 0,
        stock: row.stock,
        king_room_stock: row.king_room_stock || 0,
        twin_room_stock: row.twin_room_stock || 0,
        status: row.status
      }
      this.editVisible = true
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (!valid) return
        this.submitLoading = true
        const data = { ...this.form, product_id: this.productId }
        const api = this.editId ? departureUpdate(this.editId, data) : departureCreate(data)
        api.then(() => {
          this.$message.success(this.editId ? '编辑成功' : '添加成功')
          this.editVisible = false
          this.getList()
        }).finally(() => {
          this.submitLoading = false
        })
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除该团期吗？', '提示', { type: 'warning' }).then(() => {
        departureDelete(row.id).then(() => {
          this.$message.success('删除成功')
          this.getList()
        })
      }).catch(() => {})
    },
    getStatusType(status) {
      const map = {
        'available': 'success',
        'full': 'danger',
        'reserve': 'warning',
        'expired': 'info'
      }
      return map[status] || 'info'
    },
    getStatusText(status) {
      const map = {
        'available': '可订',
        'full': '满员',
        'reserve': '可预约',
        'expired': '已过期'
      }
      return map[status] || status
    },
    handleBatch() {
      this.batchForm = {
        date_range: [],
        weekdays: [1, 2, 3, 4, 5, 6, 0],
        adult_price: 0,
        child_price: 0,
        single_room_diff: 0,
        stock: 0,
        king_room_stock: 0,
        twin_room_stock: 0
      }
      this.batchVisible = true
    },
    handleBatchSubmit() {
      this.$refs.batchForm.validate(valid => {
        if (!valid) return
        this.batchLoading = true
        const data = {
          product_id: this.productId,
          start_date: this.batchForm.date_range[0],
          end_date: this.batchForm.date_range[1],
          weekdays: this.batchForm.weekdays,
          adult_price: this.batchForm.adult_price,
          child_price: this.batchForm.child_price,
          single_room_diff: this.batchForm.single_room_diff,
          stock: this.batchForm.stock,
          king_room_stock: this.batchForm.king_room_stock,
          twin_room_stock: this.batchForm.twin_room_stock
        }
        departureBatch(data).then(() => {
          this.$message.success('批量添加成功')
          this.batchVisible = false
          this.getList()
        }).finally(() => {
          this.batchLoading = false
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.departure-header {
  margin-bottom: 15px;
}
.low-stock {
  color: #f56c6c;
  font-weight: 500;
}
</style>
