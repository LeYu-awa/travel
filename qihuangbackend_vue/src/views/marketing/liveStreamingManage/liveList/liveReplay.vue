<template>
  <div>
    <el-dialog title="直播回放管理" :visible.sync="dialogVisible" width="68%" @close="close" custom-class="popup">
      <div class="divBox">
        <div class="selCardList">
          <div class="title">视频回放设置</div>
          <el-form inline size="small" label-width="85px">
            <el-form-item label="回放设置：">
              <el-radio-group v-model="replayEnabled" @change="onReplaySwitch">
                <el-radio label="1">回放开启</el-radio>
                <el-radio label="0">关闭回放</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-button size="small" type="primary" @click="onReplaySwitch" :loading="switchLoading">保存设置</el-button>
          </el-form>
        </div>
        <div class="selCardList">
          <div class="title">同步条件</div>
          <el-form inline size="small" label-width="85px">
            <el-form-item label="时间范围：">
              <el-date-picker
                v-model="fetchTimeRange"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="onFetchTimeChange"
                align="right">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="fetchReplayList">拉取直播回放</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-card class="mt14">
          <div class="title" style="padding-left: 0">录制文件列表</div>
          <dTable :table-data="tableData" :table-header-data="tableHeaderData" :loading="showLoading">
            <template #operation="scope">
              <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
            </template>
            <template #state="scope">
              <el-tag :type="scope.row.record_url ? 'success' : 'info'">
                {{ scope.row.record_url ? '可用' : '无文件' }}
              </el-tag>
            </template>
          </dTable>
          <div class="block">
            <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
              @currentChange="onCurrentChange"></dFooter>
          </div>
        </el-card>
      </div>
    </el-dialog>
    <!-- 预览弹窗 -->
    <el-dialog
      :title="'直播间号【' + (currentRecord.stream_name || '') + '】的直播回放'"
      :visible.sync="previewShow" width="68%" @close="previewShow=false">
      <div class="video-div">
        <video v-if="currentRecord.record_url" :src="currentRecord.record_url" controls autoplay></video>
        <div v-else class="no-video">暂无可预览的视频</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewShow=false">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 下载弹窗 -->
    <el-dialog
      :title="'直播间号【' + (currentRecord.stream_name || '') + '】的直播回放下载'"
      :visible.sync="downloadShow" width="68%" @close="downloadShow=false">
      <div class="download-div">
        <div class="list">
          <div class="serial">1</div>
          下载视频导出工具
          <el-button size="small" type="primary" style="margin-left: 10px">
            <a href="http://xiaoetong-1252524126.file.myqcloud.com/m3u8-downloader-win-0.1.3 (1).exe">下载</a>
          </el-button>
        </div>
        <div class="list">
          <div class="serial">2</div>
          完成下载后，复制以下链接至工具视频地址处
        </div>
        <div class="list-input">
          <div class="list-input-div">{{ currentRecord.record_url || '' }}</div>
          <el-button size="small" type="primary" style="margin-left: 10px" @click="oncopy(currentRecord.record_url || '')">复制</el-button>
        </div>
        <div class="list">
          <div class="serial">3</div>
          在下载的导出工具中，操作步骤如图：
        </div>
        <div class="list-image">
          <img src="../../../../assets/images/img_live_export.png">
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="downloadShow=false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import timeOptions from '@/utils/timeOptions';
import operation from '@/components/operation/operation.vue'
import { getLiveReplayList, saveReplaySetting, getReplaySetting } from '@/api/liveStreamingManage'

export default {
  components: {
    dTable,
    dFooter,
    operation,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    fromData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      previewShow: false,
      downloadShow: false,
      showLoading: false,
      switchLoading: false,
      replayEnabled: '1',
      currentRecord: {},
      fetchTimeRange: [],
      fetchStartTime: '',
      fetchEndTime: '',
      pickerOptions: timeOptions,
      pageConfig: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: 10,
        total: 0,
        disabled: false,
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      tableData: [],
      tableHeaderData: [
        { prop: 'id', label: '序号', columnType: 'text', align: 'left', 'min-width': '60' },
        { prop: 'stream_name', label: '直播间号', columnType: 'text', align: 'left', 'min-width': '120' },
        { prop: 'start_time', label: '开始时间', columnType: 'text', align: 'left', 'min-width': '180' },
        { prop: 'end_time', label: '结束时间', columnType: 'text', align: 'left', 'min-width': '180' },
        { prop: 'duration', label: '时长(秒)', columnType: 'text', align: 'left', 'min-width': '100' },
        { prop: 'format', label: '格式', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'state', label: '状态', columnType: 'slot', align: 'left', 'min-width': '100' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData: [
        { name: 'preview', label: '预览', icon: 'edit', type: 'primary' },
        { name: 'download', label: '下载', icon: 'edit', type: 'primary' },
      ],
    }
  },
  mounted() {
    this.loadReplaySetting();
    this.fetchReplayList();
  },
  methods: {
    async loadReplaySetting() {
      try {
        const res = await getReplaySetting();
        this.replayEnabled = (res.data && res.data.replay_enabled) || '1';
      } catch (e) { /* 使用默认值 */ }
    },
    async onReplaySwitch() {
      this.switchLoading = true;
      try {
        await saveReplaySetting({ replay_enabled: this.replayEnabled });
        this.$message.success('回放设置已保存');
      } catch (e) {
        this.$message.error('保存失败');
      } finally {
        this.switchLoading = false;
      }
    },
    async fetchReplayList() {
      if (!this.fromData || !this.fromData.live_code) {
        this.$message.warning('缺少直播间号');
        return;
      }
      this.showLoading = true;
      try {
        const params = {
          live_code: this.fromData.live_code,
          page: this.pageConfig.currentPage,
          limit: this.pageConfig.pageSize,
        };
        if (this.fetchStartTime) {
          params.start_time = this.fetchStartTime;
        }
        if (this.fetchEndTime) {
          params.end_time = this.fetchEndTime;
        }
        const res = await getLiveReplayList(params);
        const list = (res.data && res.data.list) || [];
        this.tableData = list.map(item => ({
          ...item,
          operation: this.operationData,
        }));
        this.pageConfig.total = (res.data && res.data.count) || 0;
      } catch (e) {
        this.$message.error('获取回放列表失败');
      } finally {
        this.showLoading = false;
      }
    },
    onFetchTimeChange(e) {
      if (e && e.length === 2) {
        this.fetchStartTime = new Date(e[0]).toISOString();
        this.fetchEndTime = new Date(e[1]).toISOString();
      } else {
        this.fetchStartTime = '';
        this.fetchEndTime = '';
      }
    },
    oncopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('Copy');
      document.body.removeChild(textarea);
      this.$message({ message: '复制成功', type: 'success' });
    },
    onErtion(name, row) {
      switch (name) {
        case 'preview':
          this.currentRecord = { ...row };
          this.previewShow = true;
          break;
        case 'download':
          this.currentRecord = { ...row };
          this.downloadShow = true;
          break;
      }
    },
    close() {
      this.$emit('close')
    },
    onSizeChange(val) {
      this.pageConfig.pageSize = val;
      this.pageConfig.currentPage = 1;
      this.fetchReplayList();
    },
    onCurrentChange(val) {
      this.pageConfig.currentPage = val;
      this.fetchReplayList();
    },
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-dialog__body {
  background: #f3f3f4;
}
.selCardList {
  background: #ffffff;
  border-radius: 4px;
  margin-bottom: 15px;
  position: relative;
}
.title {
  height: 42px;
  line-height: 42px;
  padding: 0 15px;
  border-bottom: 1px solid #f6f6f6;
  color: #333;
  border-radius: 2px 2px 0 0;
  font-size: 14px;
  margin-bottom: 20px;
}
.video-div {
  width: 100%;
  min-height: 300px;
  video {
    width: 100%;
    height: 100%;
  }
  .no-video {
    text-align: center;
    color: #999;
    padding: 100px 0;
  }
}
.download-div {
  background: #ffffff;
  padding: 10px 15px;
  border-radius: 12px;
}
.list {
  height: 33px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  .serial {
    border-radius: 50%;
    width: 33px;
    height: 33px;
    border: 1px solid #eee;
    text-align: center;
    margin-right: 8px;
    line-height: 33px;
  }
}
.list-input {
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-left: 42px;
  .list-input-div {
    height: 33px;
    line-height: 24px;
    float: left;
    padding: 5px;
    background-color: #eee;
    border-radius: 5px;
    width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}
.list-image {
  width: 100%;
  min-height: 200px;
  margin-top: 5px;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
