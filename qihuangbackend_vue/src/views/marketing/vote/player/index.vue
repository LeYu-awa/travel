<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>选手管理 - {{ voteName }}</span>
        <el-button style="float: right" type="text" @click="goBack">返回列表</el-button>
      </div>

      <!-- 筛选 -->
      <div class="filter-container">
        <el-form :inline="true" :model="listQuery">
          <el-form-item label="选手名称">
            <el-input v-model="listQuery.keyword" placeholder="请输入选手名称/编号" clearable />
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="listQuery.status" placeholder="请选择" clearable>
              <el-option label="全部" value="" />
              <el-option label="待审核" :value="0" />
              <el-option label="已通过" :value="1" />
              <el-option label="已拒绝" :value="2" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">搜索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格 -->
      <el-table v-loading="listLoading" :data="list" border>
        <el-table-column prop="player_id" label="ID" width="80" />
        <el-table-column prop="number" label="编号" width="80" />
        <el-table-column label="封面" width="80">
          <template slot-scope="{row}">
            <el-image :src="row.cover" style="width: 50px; height: 50px" fit="cover" />
          </template>
        </el-table-column>
        <el-table-column prop="name" label="选手名称" min-width="120" />
        <el-table-column prop="vote_count" label="票数" width="100" sortable />
        <el-table-column prop="view_count" label="浏览量" width="100" />
        <el-table-column label="审核状态" width="100">
          <template slot-scope="{row}">
            <el-tag v-if="Number(row.status) === 0" type="warning">待审核</el-tag>
            <el-tag v-else-if="Number(row.status) === 1" type="success">已通过</el-tag>
            <el-tag v-else type="danger">已拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="报名时间" width="160" />
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="{row}">
            <el-button type="text" @click="handleDetail(row)">详情</el-button>
            <template v-if="Number(row.status) === 0">
              <el-button type="text" @click="handleAudit(row, 1)">通过</el-button>
              <el-button type="text" class="danger" @click="handleAudit(row, 2)">拒绝</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-show="total > 0"
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 50]"
        :page-size="listQuery.limit"
        :total="total"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>

    <!-- 详情弹窗 -->
    <el-dialog title="选手详情" :visible.sync="detailVisible" width="600px">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="编号">{{ currentPlayer.number }}</el-descriptions-item>
        <el-descriptions-item label="名称">{{ currentPlayer.name }}</el-descriptions-item>
        <el-descriptions-item label="封面">
          <el-image :src="currentPlayer.cover" style="width: 100px; height: 100px" fit="cover" />
        </el-descriptions-item>
        <el-descriptions-item label="图片">
          <div v-if="currentPlayer.images && currentPlayer.images.length" class="image-list">
            <el-image
              v-for="(img, idx) in currentPlayer.images"
              :key="idx"
              :src="img"
              style="width: 80px; height: 80px; margin-right: 10px"
              fit="cover"
              :preview-src-list="currentPlayer.images"
            />
          </div>
          <span v-else>无</span>
        </el-descriptions-item>
        <el-descriptions-item label="简介">{{ currentPlayer.description || '无' }}</el-descriptions-item>
        <el-descriptions-item label="票数">{{ currentPlayer.vote_count }}</el-descriptions-item>
        <el-descriptions-item label="审核状态">
          <el-tag v-if="Number(currentPlayer.status) === 0" type="warning">待审核</el-tag>
          <el-tag v-else-if="Number(currentPlayer.status) === 1" type="success">已通过</el-tag>
          <el-tag v-else type="danger">已拒绝</el-tag>
          <span v-if="currentPlayer.reject_reason">（{{ currentPlayer.reject_reason }}）</span>
        </el-descriptions-item>
        <el-descriptions-item label="报名时间">{{ currentPlayer.create_time }}</el-descriptions-item>
      </el-descriptions>
    </el-dialog>

    <!-- 拒绝弹窗 -->
    <el-dialog title="拒绝原因" :visible.sync="rejectVisible" width="400px">
      <el-input v-model="rejectReason" type="textarea" :rows="3" placeholder="请输入拒绝原因" />
      <div slot="footer">
        <el-button @click="rejectVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmReject">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { votePlayerListApi, votePlayerAuditApi } from '@/api/marketing'
import { roterPre } from '@/settings'

export default {
  name: 'VotePlayer',
  data() {
    return {
      roterPre: roterPre,
      voteId: 0,
      voteName: '',
      list: [],
      total: 0,
      listLoading: false,
      listQuery: {
        page: 1,
        limit: 10,
        keyword: '',
        status: ''
      },
      detailVisible: false,
      currentPlayer: {},
      rejectVisible: false,
      rejectReason: '',
      pendingPlayer: null
    }
  },
  created() {
    this.voteId = this.$route.params.voteId
    this.voteName = this.$route.query.name || ''
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = true
      try {
        const { data } = await votePlayerListApi({
          ...this.listQuery,
          vote_id: this.voteId
        })
        this.list = data.list || []
        this.total = data.count || 0
        if (this.list.length && !this.voteName) {
          this.voteName = this.list[0].vote_name || ''
        }
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
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleDetail(row) {
      let images = []
      if (Array.isArray(row.images)) {
        images = row.images
      } else if (typeof row.images === 'string' && row.images) {
        try {
          images = JSON.parse(row.images)
        } catch (e) {
          images = []
        }
      }
      this.currentPlayer = {
        ...row,
        images
      }
      this.detailVisible = true
    },
    handleAudit(row, status) {
      if (status === 2) {
        this.pendingPlayer = row
        this.rejectReason = ''
        this.rejectVisible = true
      } else {
        this.doAudit(row.player_id, status)
      }
    },
    async confirmReject() {
      if (!this.pendingPlayer) {
        this.rejectVisible = false
        return
      }
      if (!this.rejectReason.trim()) {
        this.$message.warning('请输入拒绝原因')
        return
      }
      await this.doAudit(this.pendingPlayer.player_id, 2, this.rejectReason)
      this.rejectVisible = false
    },
    async doAudit(playerId, status, reason = '') {
      try {
        await votePlayerAuditApi(playerId, { status, reject_reason: reason })
        this.$message.success('操作成功')
        this.getList()
      } catch (e) {
        this.$message.error(e.message || '操作失败')
      }
    },
    goBack() {
      this.$router.push({ path: this.roterPre + '/marketing/vote/list' })
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
.image-list {
  display: flex;
  flex-wrap: wrap;
}
</style>
