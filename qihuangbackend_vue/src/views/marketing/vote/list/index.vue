<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button type="primary" @click="handleCreate">创建活动</el-button>
      </div>
      <!-- 筛选条件 -->
      <div class="filter-container">
        <el-form :inline="true" :model="listQuery" class="demo-form-inline">
          <el-form-item label="活动名称">
            <el-input v-model="listQuery.keyword" placeholder="请输入活动名称" clearable />
          </el-form-item>
          <el-form-item label="活动状态">
            <el-select v-model="listQuery.status" placeholder="请选择" clearable>
              <el-option label="全部" value="" />
              <el-option label="进行中" :value="1" />
              <el-option label="未开始" :value="0" />
              <el-option label="已结束" :value="-1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">搜索</el-button>
            <el-button @click="resetFilter">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格 -->
      <el-table v-loading="listLoading" :data="list" border style="width: 100%">
        <el-table-column prop="vote_id" label="ID" width="80" />
        <el-table-column label="封面" width="100">
          <template slot-scope="{row}">
            <el-image :src="row.cover" style="width: 60px; height: 60px" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="activity_name" label="活动名称" min-width="150" show-overflow-tooltip />
        <el-table-column label="活动时间" min-width="180">
          <template slot-scope="{row}">
            <div>{{ row.start_time }}</div>
            <div>至 {{ row.end_time }}</div>
          </template>
        </el-table-column>
        <el-table-column label="选手/投票数" width="120">
          <template slot-scope="{row}">
            <div>选手: {{ row.player_count || 0 }}</div>
            <div>投票: {{ row.vote_count || 0 }}</div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="{row}">
            <el-tag v-if="Number(row.status) === 1 && Number(row.time_status) === 1" type="success">进行中</el-tag>
            <el-tag v-else-if="Number(row.status) === 0" type="info">已禁用</el-tag>
            <el-tag v-else-if="Number(row.time_status) === 0" type="warning">未开始</el-tag>
            <el-tag v-else type="danger">已结束</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="160" />
        <el-table-column label="操作" width="280" fixed="right">
          <template slot-scope="{row}">
            <el-button type="text" @click="handleEdit(row)">编辑</el-button>
            <el-button type="text" @click="handlePlayer(row)">选手管理</el-button>
            <el-button type="text" @click="handleRecord(row)">投票记录</el-button>
            <el-button type="text" @click="handleStatistics(row)">统计</el-button>
            <el-button type="text" @click="handleStatus(row)">
              {{ Number(row.status) === 1 ? '禁用' : '启用' }}
            </el-button>
            <el-button type="text" class="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-show="total > 0"
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { voteListApi, voteStatusApi, voteDeleteApi } from '@/api/marketing'
import { roterPre } from '@/settings'

export default {
  name: 'VoteList',
  data() {
    return {
      roterPre: roterPre,
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        keyword: '',
        status: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      try {
        const params = {
          ...this.listQuery
        }
        if (params.status !== '') {
          params.time_status = params.status
          params.status = 1
        }
        const { data } = await voteListApi(params)
        this.list = data.list || []
        this.total = data.count || 0
      } catch (e) {
        console.error(e)
      } finally {
        this.listLoading = false
      }
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetFilter() {
      this.listQuery = {
        page: 1,
        limit: 10,
        keyword: '',
        status: ''
      }
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
    handleCreate() {
      this.$router.push({ path: this.roterPre + '/marketing/vote/create' })
    },
    handleEdit(row) {
      this.$router.push({ path: this.roterPre + `/marketing/vote/edit/${row.vote_id}` })
    },
    handlePlayer(row) {
      this.$router.push({
        path: this.roterPre + `/marketing/vote/player/${row.vote_id}`,
        query: { name: row.activity_name || '' }
      })
    },
    handleRecord(row) {
      this.$router.push({
        path: this.roterPre + `/marketing/vote/record/${row.vote_id}`,
        query: { name: row.activity_name || '' }
      })
    },
    handleStatistics(row) {
      this.$router.push({
        path: this.roterPre + `/marketing/vote/statistics/${row.vote_id}`,
        query: { name: row.activity_name || '' }
      })
    },
    handleStatus(row) {
      const status = Number(row.status) === 1 ? 0 : 1
      const text = status === 1 ? '启用' : '禁用'
      this.$confirm(`确定${text}该活动吗？`, '提示', {
        type: 'warning'
      }).then(async() => {
        await voteStatusApi(row.vote_id, status)
        this.$message.success('操作成功')
        this.getList()
      }).catch(() => {})
    },
    handleDelete(row) {
      this.$confirm('确定删除该活动吗？删除后无法恢复', '提示', {
        type: 'warning'
      }).then(async() => {
        await voteDeleteApi(row.vote_id)
        this.$message.success('删除成功')
        this.getList()
      }).catch(() => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.divBox {
  padding: 20px;
}
.filter-container {
  margin-bottom: 20px;
}
.danger {
  color: #f56c6c;
}
</style>
