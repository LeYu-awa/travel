<template>
  <div class="divBox">
    <el-card>
      <div class="mb20">
        <el-button size="small" type="primary" @click="onAdd">添加直播分类</el-button>
      </div>
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        size="small"
      >
        <el-table-column
          label="分类名称"
          prop="name"
          min-width="180"
        >
        </el-table-column>
        <el-table-column
          label="logo"
          prop="logo"
          min-width="180"
        >
        <template #default="row">
          <img :src="row.logo"/>
        </template>
        </el-table-column>
        <el-table-column
          prop="sort"
          label="排序"
          min-width="150"
        />
        <el-table-column label="操作" min-width="100" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="onEdit(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row, scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog :title="modalTitle" :visible.sync="visible" width="600px">
      <el-form ref="formRef" :model="form" label-width="90px" @submit.native.prevent>
        <el-form-item label="分类名称：" prop="name" required>
          <el-input v-model="form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="分类名称：" prop="name" required>
          <el-input v-model="form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="排序：" prop="sort" required>
          <el-input-number v-model="form.sort" placeholder="请输入排序" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button :loading="confirmLoading" type="primary" @click="submitForm">提交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getLiveType, deleteLiveType, addLiveType, editLiveType
} from '@/api/marketing'
export default {
  name: "LiveManage",
  data() {
    return {
      listLoading: true,
      tableData: {
        data: [],
        total: 0
      },
      visible: false,
      modalTitle: '添加直播分类',
      form: {},
      confirmLoading: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 列表
    getList() {
      this.listLoading = true
      return getLiveType().then(res => {
        this.tableData.data = res.data.data
        this.tableData.total = res.data.data.count
        this.listLoading = false
      }).catch(res => {
        this.listLoading = false
        this.$message.error(res.message)
      })
    },

    onAdd() {
      this.modalTitle = '添加直播分类'
      this.form = {}
      this.visible = true
    },
    onEdit(row){
      this.modalTitle = '编辑直播分类'
      this.form = {...row}
      this.visible = true
    },
    handleDelete(row) {
      this.$modalSure('确认删除吗').then(() => {
        deleteLiveType(row.id).then(({ message }) => {
          this.$message.success(message)
          this.getList()
        }).catch(({ message }) => {
          this.$message.error(message)
        })
      })
    },
     submitForm() {
      this.$refs.formRef.validate().then(valid => {
        if (!valid) return
        this.confirmLoading = true
        if (this.modalTitle === '添加直播分类') {
          addLiveType(this.form).then(() => {
            this.$message.success('添加成功')
            this.getList()
            this.visible = false
            this.confirmLoading = false
          }).catch(() => {
            this.confirmLoading = false
          })
        } else {
          editLiveType(this.form).then(() => {
            this.$message.success('编辑成功')
            this.getList()
            this.visible = false
            this.confirmLoading = false
          }).catch(() => {
            this.confirmLoading = false
          })
        }
      })
    }
  }
}
</script>
