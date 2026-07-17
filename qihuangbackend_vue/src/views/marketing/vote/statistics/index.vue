<template>
  <div class="divBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>活动统计 - {{ voteName }}</span>
        <el-button style="float: right" type="text" @click="goBack">返回列表</el-button>
      </div>

      <!-- 概览卡片 -->
      <el-row :gutter="20" class="stat-cards">
        <el-col :span="6">
          <div class="stat-card">
            <div class="stat-value">{{ statistics.player_count || 0 }}</div>
            <div class="stat-label">选手数</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card">
            <div class="stat-value">{{ statistics.vote_count || 0 }}</div>
            <div class="stat-label">总票数</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card">
            <div class="stat-value">{{ statistics.vote_user_count || 0 }}</div>
            <div class="stat-label">投票人数</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="stat-card">
            <div class="stat-value">{{ statistics.view_count || 0 }}</div>
            <div class="stat-label">浏览量</div>
          </div>
        </el-col>
      </el-row>

      <!-- 收益数据 -->
      <el-row v-if="statistics.is_pay" :gutter="20" class="stat-cards">
        <el-col :span="6">
          <div class="stat-card pay">
            <div class="stat-value">{{ statistics.total_income || 0 }}</div>
            <div class="stat-label">总收入({{ statistics.pay_type === 'integral' ? '积分' : '元' }})</div>
          </div>
        </el-col>
      </el-row>

      <!-- 排行榜 -->
      <div class="ranking-section">
        <h3>选手排行榜 TOP 10</h3>
        <el-table :data="topPlayers" border>
          <el-table-column label="排名" width="80">
            <template slot-scope="{$index}">
              <span :class="['rank-badge', `rank-${$index + 1}`]">{{ $index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="选手" min-width="150">
            <template slot-scope="{row}">
              <div class="player-info">
                <el-image :src="row.cover" style="width: 40px; height: 40px" fit="cover" />
                <div class="player-text">
                  <div>{{ row.name }}</div>
                  <div class="number">编号: {{ row.number }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="vote_count" label="票数" width="120" sortable />
          <el-table-column prop="view_count" label="浏览量" width="100" />
        </el-table>
      </div>

      <!-- 投票趋势 -->
      <div class="trend-section">
        <h3>近7日投票趋势</h3>
        <div v-if="trendData.length" class="trend-chart">
          <div class="chart-container">
            <div v-for="(item, idx) in trendData" :key="idx" class="chart-bar">
              <div class="bar" :style="{ height: getBarHeight(item.count) + '%' }">
                <span class="count">{{ item.count }}</span>
              </div>
              <div class="date">{{ item.date }}</div>
            </div>
          </div>
        </div>
        <el-empty v-else description="暂无数据" />
      </div>
    </el-card>
  </div>
</template>

<script>
import { voteStatisticsApi } from '@/api/marketing'
import { roterPre } from '@/settings'

export default {
  name: 'VoteStatistics',
  data() {
    return {
      roterPre: roterPre,
      voteId: 0,
      voteName: '',
      statistics: {},
      topPlayers: [],
      trendData: [],
      maxCount: 0
    }
  },
  created() {
    this.voteId = this.$route.params.id
    this.voteName = this.$route.query.name || ''
    this.getStatistics()
  },
  methods: {
    async getStatistics() {
      try {
        const { data } = await voteStatisticsApi(this.voteId)
        this.statistics = (data && data.info) ? data.info : (data || {})
        this.topPlayers = data.top_players || []
        this.trendData = data.trend || []
        this.voteName = this.statistics.activity_name || this.voteName

        if (this.trendData.length) {
          this.maxCount = Math.max(...this.trendData.map(t => Number(t.count) || 0), 1)
        }
      } catch (e) {
        this.$message.error('加载统计失败')
      }
    },
    getBarHeight(count) {
      return Math.max((count / this.maxCount) * 100, 5)
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
.stat-cards {
  margin-bottom: 30px;
}
.stat-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 30px;
  border-radius: 8px;
  text-align: center;

  &.pay {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  }

  .stat-value {
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .stat-label {
    font-size: 14px;
    opacity: 0.9;
  }
}
.ranking-section, .trend-section {
  margin-bottom: 30px;
  h3 {
    margin-bottom: 15px;
    font-size: 16px;
    color: #333;
  }
}
.rank-badge {
  display: inline-block;
  width: 24px;
  height: 24px;
  line-height: 24px;
  text-align: center;
  border-radius: 50%;
  background: #ddd;
  color: #666;
  font-size: 12px;
  &.rank-1 {
    background: #ffd700;
    color: #fff;
  }
  &.rank-2 {
    background: #c0c0c0;
    color: #fff;
  }
  &.rank-3 {
    background: #cd7f32;
    color: #fff;
  }
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
.trend-chart {
  .chart-container {
    display: flex;
    align-items: flex-end;
    height: 200px;
    padding: 20px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }
  .chart-bar {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    height: 100%;

    .bar {
      width: 60%;
      max-width: 50px;
      background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
      border-radius: 4px 4px 0 0;
      position: relative;
      min-height: 20px;
      transition: height 0.3s;

      .count {
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        color: #666;
      }
    }
    .date {
      margin-top: 10px;
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
