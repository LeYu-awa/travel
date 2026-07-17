<template>
  <div class="divBox">
    <div class="selCard">
      <el-form
        ref="searchForm"
        :model="query"
        size="small"
        label-width="90px"
        inline
      >
        <el-form-item label="时间范围：">
          <el-date-picker
            v-model="timeVal"
            type="daterange"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
            style="width: 280px;"
            :picker-options="pickerOptions"
            @change="onChangeTime"
          />
        </el-form-item>
        <el-form-item label="用户ID：">
          <el-input
            v-model.trim="query.uid"
            class="selWidth"
            placeholder="请输入用户ID"
            clearable
            @keyup.enter.native="getList(1)"
          />
        </el-form-item>
        <el-form-item label="请求类型：">
          <el-select v-model="query.req_type" class="selWidth" clearable placeholder="全部">
            <el-option label="全部" value="" />
            <el-option label="产品推荐" value="1" />
            <el-option label="智能问答" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="关键词：">
          <el-input
            v-model.trim="query.keyword"
            class="selWidth"
            placeholder="提问/回答/昵称/手机号"
            clearable
            @keyup.enter.native="getList(1)"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList(1)">搜索</el-button>
          <el-button @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card class="mt14">
      <el-table
        v-loading="listLoading"
        :data="tableData.data"
        size="small"
        highlight-current-row
        row-key="id"
      >
        <el-table-column prop="id" label="ID" width="70" />
        <el-table-column label="用户" min-width="140">
          <template slot-scope="{ row }">
            <div class="user-cell">
              <span class="user-name">{{ row.nickname || '-' }}</span>
              <span class="user-phone">{{ row.phone || 'UID:' + row.uid }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="类型" width="100" align="center">
          <template slot-scope="{ row }">
            <el-tag
              :type="row.req_type === '1' ? 'warning' : ''"
              size="mini"
              effect="plain"
            >{{ row.req_type_text }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="prompt" label="提问" min-width="200" show-overflow-tooltip />
        <el-table-column label="回答预览" min-width="280">
          <template slot-scope="{ row }">
            <div v-if="row.req_type === '1'" class="answer-preview product-preview">
              <template v-if="parseProducts(row.answer).length">
                <el-tag
                  v-for="(p, i) in parseProducts(row.answer).slice(0, 2)"
                  :key="i"
                  size="mini"
                  type="info"
                  style="margin-right:4px;"
                >{{ p.name }}</el-tag>
                <span v-if="parseProducts(row.answer).length > 2" class="more-tag">
                  +{{ parseProducts(row.answer).length - 2 }}
                </span>
              </template>
              <span v-else class="empty-text">无匹配产品</span>
            </div>
            <div v-else class="answer-preview html-preview" v-html="truncateHtml(row.answer, 80)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="device_type" label="设备" width="80" align="center">
          <template slot-scope="{ row }">
            <span>{{ deviceLabel(row.device_type) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="add_time_text" label="时间" width="160" />
        <el-table-column label="操作" width="80" fixed="right" align="center">
          <template slot-scope="{ row }">
            <el-button type="text" size="mini" @click="openDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          :current-page="query.page"
          :page-size="query.limit"
          layout="total, prev, pager, next, jumper"
          :total="tableData.total"
          @current-change="pageChange"
        />
      </div>
    </el-card>

    <!-- 详情弹窗 -->
    <el-dialog
      title="对话详情"
      :visible.sync="detailVisible"
      width="680px"
      top="6vh"
      custom-class="ai-chat-dialog"
      :close-on-click-modal="true"
      append-to-body
    >
      <template v-if="detailRow">
        <div class="detail-meta">
          <span>ID: {{ detailRow.id }}</span>
          <span>{{ detailRow.nickname || '-' }}</span>
          <span>{{ detailRow.phone || '' }}</span>
          <el-tag :type="detailRow.req_type === '1' ? 'warning' : ''" size="mini" effect="plain">
            {{ detailRow.req_type_text }}
          </el-tag>
          <span>{{ detailRow.add_time_text }}</span>
        </div>

        <div class="chat-container">
          <!-- 用户提问 -->
          <div class="chat-row chat-user">
            <div class="chat-bubble chat-bubble-user">
              <div class="bubble-content">{{ detailRow.prompt }}</div>
            </div>
          </div>

          <!-- AI回答 -->
          <div class="chat-row chat-ai">
            <div class="chat-bubble chat-bubble-ai">
              <!-- 产品推荐 -->
              <template v-if="detailRow.req_type === '1'">
                <div v-if="parseProducts(detailRow.answer).length" class="product-list">
                  <div
                    v-for="(prod, i) in parseProducts(detailRow.answer)"
                    :key="i"
                    class="product-card"
                  >
                    <img v-if="prod.pic" :src="prod.pic" class="product-img" />
                    <div class="product-info">
                      <div class="product-name">{{ prod.name }}</div>
                      <div v-if="prod.sellpoint" class="product-sellpoint">{{ prod.sellpoint }}</div>
                      <div class="product-price">&yen;{{ prod.price }}</div>
                    </div>
                  </div>
                </div>
                <div v-else class="empty-text">无匹配产品</div>
              </template>

              <!-- 智能问答 HTML -->
              <template v-else>
                <div class="html-answer" v-html="detailRow.answer"></div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { aiChatLogList } from "@/api/user";
import timeOptions from "@/utils/timeOptions";

export default {
  name: "AiChatLog",
  data() {
    return {
      pickerOptions: timeOptions,
      timeVal: [],
      listLoading: false,
      tableData: {
        data: [],
        total: 0
      },
      query: {
        keyword: "",
        uid: "",
        req_type: "",
        date: "",
        page: 1,
        limit: 20
      },
      detailVisible: false,
      detailRow: null
    };
  },
  mounted() {
    this.getList(1);
  },
  methods: {
    parseProducts(answer) {
      if (!answer) return [];
      try {
        const arr = JSON.parse(answer);
        return Array.isArray(arr) ? arr : [];
      } catch (e) {
        return [];
      }
    },
    truncateHtml(html, maxLen) {
      if (!html) return '<span style="color:#999">无回答</span>';
      const text = html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      if (text.length <= maxLen) return html;
      return text.substring(0, maxLen) + '...';
    },
    deviceLabel(type) {
      const map = { h5: 'H5', routine: '小程序', app: 'APP', wechat: '微信', pc: 'PC' };
      return map[type] || type || '-';
    },
    openDetail(row) {
      this.detailRow = row;
      this.detailVisible = true;
    },
    onChangeTime(val) {
      this.query.date = val && val.length ? val.join("-") : "";
      this.getList(1);
    },
    resetSearch() {
      this.timeVal = [];
      this.query.keyword = "";
      this.query.uid = "";
      this.query.req_type = "";
      this.query.date = "";
      this.getList(1);
    },
    getList(page) {
      this.listLoading = true;
      this.query.page = page || this.query.page;
      aiChatLogList(this.query)
        .then((res) => {
          this.tableData.data = res.data.list || [];
          this.tableData.total = res.data.count || 0;
          this.listLoading = false;
        })
        .catch((err) => {
          this.listLoading = false;
          this.$message.error((err && err.message) || "获取AI聊天记录失败");
        });
    },
    pageChange(page) {
      this.getList(page);
    }
  }
};
</script>

<style lang="scss" scoped>
.selWidth {
  width: 180px;
}

.user-cell {
  line-height: 1.5;
  .user-name {
    display: block;
    font-weight: 500;
  }
  .user-phone {
    display: block;
    font-size: 12px;
    color: #909399;
  }
}

.answer-preview {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
}
.html-preview {
  color: #606266;
  ::v-deep * { margin: 0; padding: 0; }
}
.more-tag {
  font-size: 12px;
  color: #909399;
}
.empty-text {
  color: #c0c4cc;
  font-size: 12px;
}

/* 详情弹窗 */
.detail-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
  font-size: 13px;
  color: #909399;
  flex-wrap: wrap;
}

.chat-container {
  padding: 20px 0;
}

.chat-row {
  display: flex;
  margin-bottom: 20px;
}
.chat-user {
  justify-content: flex-end;
}
.chat-ai {
  justify-content: flex-start;
}

.chat-bubble {
  max-width: 85%;
  border-radius: 12px;
  padding: 14px 18px;
  line-height: 1.6;
  font-size: 14px;
  word-break: break-all;
}

.chat-bubble-user {
  background: #ecf5ff;
  color: #303133;
  border-bottom-right-radius: 4px;
}

.chat-bubble-ai {
  background: #f4f4f5;
  color: #303133;
  border-bottom-left-radius: 4px;
}

.html-answer {
  ::v-deep h3 {
    margin: 0 0 10px;
    font-size: 15px;
    color: #303133;
  }
  ::v-deep p {
    margin: 0 0 8px;
    line-height: 1.7;
    color: #606266;
  }
  ::v-deep ul {
    margin: 0;
    padding-left: 18px;
  }
  ::v-deep li {
    margin-bottom: 6px;
    line-height: 1.6;
    color: #606266;
  }
}

/* 产品卡片 */
.product-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.product-card {
  display: flex;
  align-items: center;
  background: #fff;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 10px;
  gap: 12px;
}
.product-img {
  width: 64px;
  height: 64px;
  border-radius: 6px;
  object-fit: cover;
  flex-shrink: 0;
}
.product-info {
  flex: 1;
  min-width: 0;
}
.product-name {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.product-sellpoint {
  font-size: 12px;
  color: #909399;
  margin-bottom: 4px;
}
.product-price {
  font-size: 15px;
  color: #f56c6c;
  font-weight: 600;
}
</style>

<style>
/* 弹窗全局样式，不被 scoped 覆盖 */
.ai-chat-dialog .el-dialog__body {
  padding: 16px 24px;
  max-height: 70vh;
  overflow-y: auto;
}
</style>
