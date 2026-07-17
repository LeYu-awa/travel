<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>投票记录 - {{ voteName }}</span>
        <el-button style="float: right" type="text" @click="goBack">返回列表</el-button>
      </div>

      <!-- 筛选 -->
      <div class="filter-container">
        <el-form :inline="true" :model="listQuery">
          <el-form-item label="选手">
            <el-input v-model="listQuery.player_name" placeholder="选手名称" clearable />
          </el-form-item>
          <el-form-item label="投票日期">
            <el-date-picker
              v-model="listQuery.date_range"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleFilter">搜索</el-button>
            <el-button @click="resetFilter">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 表格 -->
      <el-table v-loading="listLoading" :data="list" border>
        <el-table-column prop="record_id" label="ID" width="80" />
        <el-table-column label="选手" min-width="150">
          <template slot-scope="{row}">
            <div class="player-info">
              <el-image :src="row.player_cover" style="width: 40px; height: 40px" fit="cover" />
              <div class="player-text">
                <div>{{ row.player_name }}</div>
                <div class="number">编号: {{ row.player_number }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="投票用户" min-width="120">
          <template slot-scope="{row}">
            <div>{{ row.user_nickname || row.uid }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="ip" label="IP" width="130" />
        <el-table-column label="支付方式" width="100">
          <template slot-scope="{row}">
            <span v-if="row.pay_type === 'integral'">积分</span>
            <span v-else-if="row.pay_type === 'balance'">余额</span>
            <span v-else>免费</span>
          </template>
        </el-table-column>
        <el-table-column prop="pay_amount" label="支付金额" width="100" />
        <el-table-column prop="create_time" label="投票时间" width="160" />
      </el-table>

      <!-- 分页 -->
      <el-pagination
        v-show="total > 0"
        :current-page="listQuery.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="listQuery.limit"
        :total="total"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import { voteRecordListApi } from '@/api/marketing'
import { roterPre } from '@/settings'

export default {
  name: 'VoteRecord',
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
        limit: 20,
        player_name: '',
        date_range: []
      }
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
        const params = {
          ...this.listQuery,
          vote_id: this.voteId
        }
        if (this.listQuery.date_range && this.listQuery.date_range.length === 2) {
          params.start_date = this.listQuery.date_range[0]
          params.end_date = this.listQuery.date_range[1]
        }
        const { data } = await voteRecordListApi(params)
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
    resetFilter() {
      this.listQuery = {
        page: 1,
        limit: 20,
        player_name: '',
        date_range: []
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
.player-info {
  display: flex;
  align-items: center;
  .player-text {
    margin-left: 10px;
    .number {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
