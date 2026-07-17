<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="title">旅游产品分类</span>
        <el-button type="primary" size="small" @click="handleAdd" style="float: right;">添加分类</el-button>
      </div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="name" label="分类名称" />
        <el-table-column label="图标" width="80">
          <template slot-scope="scope">
            <el-image v-if="scope.row.icon" :src="scope.row.icon" style="width: 40px; height: 40px;" fit="cover" />
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="100" />
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" style="color: #f56c6c;" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加/编辑弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="500px"
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="图标">
          <div class="icon-upload">
            <div v-if="form.icon" class="icon-preview">
              <el-image :src="form.icon" fit="cover" />
              <i class="el-icon-delete remove-btn" @click="form.icon = ''"></i>
            </div>
            <div v-else class="upload-btn" @click="selectIcon">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :min="0" :max="999" />
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { categoryList, categoryCreate, categoryUpdate, categoryDelete, categoryStatus } from '@/api/travel'

export default {
  name: 'TravelCategory',
  data() {
    return {
      loading: false,
      tableData: [],
      dialogVisible: false,
      dialogTitle: '添加分类',
      submitLoading: false,
      form: {
        id: 0,
        name: '',
        icon: '',
        sort: 0,
        status: 1
      },
      rules: {
        name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      categoryList().then(res => {
        this.tableData = res.data || []
      }).finally(() => {
        this.loading = false
      })
    },
    handleAdd() {
      this.dialogTitle = '添加分类'
      this.form = { id: 0, name: '', icon: '', sort: 0, status: 1 }
      this.dialogVisible = true
    },
    handleEdit(row) {
      this.dialogTitle = '编辑分类'
      this.form = { ...row }
      this.dialogVisible = true
    },
    selectIcon() {
      const that = this
      this.$modalUpload(function(img) {
        that.form.icon = img[0]
      })
    },
    handleSubmit() {
      this.$refs.formRef.validate(valid => {
        if (!valid) return

        this.submitLoading = true
        const api = this.form.id ? categoryUpdate(this.form.id, this.form) : categoryCreate(this.form)

        api.then(() => {
          this.$message.success('操作成功')
          this.dialogVisible = false
          this.getList()
        }).finally(() => {
          this.submitLoading = false
        })
      })
    },
    handleStatusChange(row) {
      categoryStatus(row.id, row.status).then(() => {
        this.$message.success('修改成功')
      })
    },
    handleDelete(row) {
      this.$confirm('确定要删除该分类吗？', '提示', { type: 'warning' }).then(() => {
        categoryDelete(row.id).then(() => {
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

.icon-upload {
  display: flex;

  .icon-preview {
    position: relative;
    width: 60px;
    height: 60px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: hidden;

    .el-image {
      width: 100%;
      height: 100%;
    }

    .remove-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 12px;
    }
  }

  .upload-btn {
    width: 60px;
    height: 60px;
    border: 1px dashed #d9d9d9;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #ccc;
    cursor: pointer;
    background: #f8f8f8;

    &:hover {
      border-color: #409eff;
      color: #409eff;
    }
  }
}
</style>
