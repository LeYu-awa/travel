<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">旅游产品管理</span>
        <el-button type="primary" size="small" @click="handleAdd" style="float: right;">添加产品</el-button>
      </div>
      <!-- 筛选条件 -->
      <div class="filter-container">
        <el-form :inline="true" :model="listQuery" size="small">
          <el-form-item label="产品名称">
            <el-input v-model="listQuery.name" placeholder="请输入产品名称" clearable style="width: 200px;" />
          </el-form-item>
          <el-form-item label="分类">
            <el-select v-model="listQuery.category_id" placeholder="请选择分类" clearable style="width: 150px;">
              <el-option v-for="item in categoryOptions" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="listQuery.status" placeholder="请选择状态" clearable style="width: 120px;">
              <el-option label="上架" value="active" />
              <el-option label="下架" value="inactive" />
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
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column label="主图" width="100">
          <template slot-scope="scope">
            <el-image v-if="scope.row.image" :src="scope.row.image" style="width: 60px; height: 60px;" fit="cover" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="产品名称" min-width="200" show-overflow-tooltip />
        <el-table-column prop="category_name" label="分类" width="120" />
        <el-table-column prop="days" label="天数" width="80" />
        <el-table-column label="价格" width="120">
          <template slot-scope="scope">
            <span class="price">¥{{ scope.row.min_price }}</span>
            <span v-if="scope.row.max_price > scope.row.min_price">起</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="80">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 'active' ? 'success' : 'info'" size="small">
              {{ scope.row.status === 'active' ? '上架' : '下架' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDeparture(scope.row)">团期</el-button>
            <el-button type="text" size="small" @click="handleToggleStatus(scope.row)">{{ scope.row.status === 'active' ? '下架' : '上架' }}</el-button>
            <el-button type="text" size="small" style="color: #f56c6c;" @click="handleDelete(scope.row)">删除</el-button>
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

    <!-- 产品编辑弹窗 -->
    <product-edit
      v-if="editVisible"
      :visible.sync="editVisible"
      :product-id="editId"
      :category-options="categoryOptions"
      @success="handleEditSuccess"
    />

    <!-- 团期管理弹窗 -->
    <departure-manage
      v-if="departureVisible"
      :visible.sync="departureVisible"
      :product-id="departureProductId"
      @success="getList"
    />
  </div>
</template>

<script>
import { productList, productDelete, productStatus, categoryOptions } from '@/api/travel'
import ProductEdit from './components/ProductEdit.vue'
import DepartureManage from './components/DepartureManage.vue'

export default {
  name: 'TravelProduct',
  components: { ProductEdit, DepartureManage },
  data() {
    return {
      loading: false,
      tableData: [],
      total: 0,
      listQuery: { page: 1, limit: 10, name: '', category_id: '', status: '' },
      categoryOptions: [],
      editVisible: false,
      editId: null,
      departureVisible: false,
      departureProductId: null
    }
  },
  created() {
    this.getCategoryOptions()
    this.getList()
  },
  methods: {
    getCategoryOptions() {
      categoryOptions().then(res => {
        this.categoryOptions = res.data || []
      })
    },
    getList() {
      this.loading = true
      productList(this.listQuery).then(res => {
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
      this.listQuery = { page: 1, limit: 10, name: '', category_id: '', status: '' }
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
    handleAdd() {
      console.log('handleAdd called')
      console.log('editVisible before:', this.editVisible)
      this.editId = null
      this.editVisible = true
      console.log('editVisible after:', this.editVisible)
      this.$nextTick(() => {
        console.log('nextTick: editVisible =', this.editVisible)
      })
    },
    handleEdit(row) {
      this.editId = row.id
      this.editVisible = true
    },
    handleEditSuccess() {
      this.editVisible = false
      this.getList()
    },
    handleDeparture(row) {
      this.departureProductId = row.id
      this.departureVisible = true
    },
    handleToggleStatus(row) {
      const newStatus = row.status === 'active' ? 'inactive' : 'active'
      productStatus(row.id, newStatus).then(() => {
        row.status = newStatus
        this.$message.success('状态修改成功')
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除该产品吗？', '提示', { type: 'warning' }).then(() => {
        productDelete(row.id).then(() => {
          this.$message.success('删除成功')
          this.getList()
        })
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.title {
  font-size: 16px;
  font-weight: 500;
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
</style>
