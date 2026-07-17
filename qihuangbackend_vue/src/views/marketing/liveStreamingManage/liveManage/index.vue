<template>
  <div class="divBox">
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px" >
        <el-form-item label="直播间号：" prop="live_code">
          <el-input
            v-model="tableFrom.live_code"
            placeholder="请输入商品名称，关键字，产品编号"
            class="selWidth"
          />
        </el-form-item>
        <!-- <el-form-item label="所属专题：" prop="seckill_status">
          <el-select
            v-model="tableFrom.seckill_status"
            placeholder="请选择"
            class="selWidth"
            clearable
          >
            <el-option
              v-for="item in seckillStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item> -->
        <el-form-item label="时间选择：">
          <el-date-picker
            v-model="tableFrom.timeVal"
            value-format="yyyy/MM/dd"
            format="yyyy/MM/dd"
            size="small"
            type="daterange"
            placement="bottom-end"
            placeholder="自定义时间"
            style="width: 280px"
            :picker-options="pickerOptions"
            @change="onchangeTime"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onsearch">搜索</el-button>
          <el-button size="small" @click="searchReset()">重置</el-button> 
        </el-form-item>
      </el-form>
    </div>
    <el-card class="mt14">
      <dTable :table-data="tableData" :table-header-data="tableHeaderData">
        <template #operation="scope">
          <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
        </template>
        <template #image="scope">
          <el-image 
            style="width: 60px; height: 60px"
            :src="scope.row.room_image" 
            :preview-src-list="[scope.row.room_image]">
          </el-image>
        </template>
        <template #is_transcribe="scope">
          <el-switch
            v-model="scope.row.is_transcribe"
            :active-value="1"
            :inactive-value="0"
            active-text="是"
            inactive-text="否"
            @click.native="onchangeIsShow(scope.row)"
          />
        </template>
        <template #is_live="scope">
          <div class="label-div red" v-if="scope.row.is_live==0">未直播</div>
          <div class="label-div green" v-if="scope.row.is_live==1">正在直播</div>
        </template>
      </dTable>
      <div class="block">
        <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
        @currentChange="onCurrentChange"></dFooter>
      </div>
    </el-card>
    <editpopUp
      v-if="editshow"
      :dialog-visible="editshow"
      :from-data="fromData"
      @cancel="editshow=false"
      @confirm="oneditConfirm"
      @close="editshow=false"
    />
    <userManage
      v-if="userManageShow"
      :dialog-visible="userManageShow"
      :from-data="fromData"
      @cancel="userManageShow=false"
      @confirm="onConfirm"
      @close="userManageShow=false"
    />
    <activityRecom
      v-if="activityShow"
      :dialog-visible="activityShow"
      :from-data="fromData"
      @cancel="activityShow=false"
      @confirm="onConfirm"
      @close="activityShow=false"
    />
    <rewardCom
      v-if="rewardShow"
      :dialog-visible="rewardShow"
      :from-data="fromData"
      @cancel="rewardShow=false"
      @confirm="onConfirm"
      @close="rewardShow=false"
    />
    <commentCom
      v-if="commentShow"
      :dialog-visible="commentShow"
      :from-data="fromData"
      @cancel="commentShow=false"
      @confirm="onConfirm"
      @close="commentShow=false"
    />
    <subCom
      v-if="subShow"
      :dialog-visible="subShow"
      :from-data="fromData"
      @cancel="subShow=false"
      @confirm="onConfirm"
      @close="subShow=false"
    >
    </subCom>
  </div>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import timeOptions from '@/utils/timeOptions';
import operation from '@/components/operation/operation.vue'
import editpopUp from './editpopUp.vue'
import userManage from './userManage.vue'
import activityRecom from './activityRecom.vue'
import commentCom from './commentCom.vue'
import rewardCom from './rewardCom.vue'
import subCom from './subCom.vue'
import { getLiveList, changeLiveInfo, deleteLive } from '@/api/liveStreamingManage'
export default {
  name: "LiveManage",
  components: {
    dTable,
    dFooter,
    editpopUp,
    operation,
    userManage,
    activityRecom,
    commentCom,
    rewardCom,
    subCom
  },
  data() {
    return {
      editshow: false,
      userManageShow: false,
      activityShow: false,
      rewardShow: false,
      commentShow: false,
      subShow:false,
      fromData:{},
      pickerOptions: timeOptions,
      pageConfig: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: 10,
        total: 0,
        disabled: false,
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      showLoading: false,
      tableFrom: {
        live_code: '',
        page: 1,
        limit: 10,
        timeVal:'',
        start_date:'',
        end_date:''
      },
      seckillStatusList:[],
      tableData: [],
      tableHeaderData: [
        { prop: 'live_code', label: '直播间ID', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'title', label: '直播标题', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'image', label: '封面', columnType: 'slot', align: 'left', 'min-width': '80' },
        { prop: 'live_start_time', label: '开播时间', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'live_pwd', label: '直播间密码', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'online user', label: '在线人数', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'virtual_user', label: '虚拟在线人数', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'is_transcribe', label: '自动录制', columnType: 'slot', align: 'left', 'min-width': '80' },
        { prop: 'is_live', label: '状态', columnType: 'slot', align: 'left', 'min-width': '80' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData:[
        { name: 'edit', label: '编辑直播间', icon: 'edit', type: 'primary' },
        { name: 'subBroadcast', label: '副播管理', icon: 'edit', type: 'primary' },
        { name: 'userManage', label: '用户管理', icon: 'edit', type: 'primary' },
        { name: 'remind', label: '直播提醒', icon: 'edit', type: 'primary' },
        { name: 'activityRecom', label: '活动推荐', icon: 'edit', type: 'primary' },
        { name: 'Reward', label: '查看打赏', icon: 'edit', type: 'primary' },
        { name: 'comment', label: '查看评论', icon: 'edit', type: 'primary' },
      ],
    };
  },
  mounted() {
    this.getLiveList()
  },
  methods: {
    onsearch() {
      this.tableFrom.page = 1
      this.getLiveList()
    },
    getLiveList(){
      this.showLoading = true
      if(this.tableFrom.timeVal.length>0){
        this.tableFrom.start_date = this.tableFrom.timeVal[0]
        this.tableFrom.end_date =this.tableFrom.timeVal[1]
      } else {
        this.tableFrom.start_date = ''
        this.tableFrom.end_date =''
      }
      getLiveList(this.tableFrom)
        .then((res) => {
          this.showLoading = false
          if (res.data.data.length>0) {
            res.data.data.map(item => {
              item.operation = this.operationData
            })
          }
          
          this.tableData = res.data.data
          console.log(this.tableData,'--this.tableData---')
          this.pageConfig.total = res.data.total
        })
        .catch((res) => {
          this.showLoading = false
          this.$message.error(res.message)
        })
    },
    // 修改状态
    onchangeIsShow(row) {
      console.log(row.is_show)
      changeLiveInfo({room_id:row.id,type:'is_transcribe',value:row.is_show})
        .then(({ message }) => {
          this.$message.success('修改成功');
          // this.getLiveList();
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
    oneditConfirm() {
      this.editshow = false
      this.getLiveList()
    },
    onConfirm() {
      this.editshow = false
      console.log()
    },
    onSizeChange(val) {
      this.tableFrom.limit = val
      this.getLiveList()
    },
    onCurrentChange(val) {
      this.tableFrom.page = val
      this.getLiveList()
    },
    // 具体日期
    onchangeTime(e) {
      console.log(e)
      // this.tableFrom.timeVal = e;
      // this.tableFrom.start_date = e ? this.timeVal.join("-") : "";
      // this.getList(1);
    },
    // 重置
    searchReset(){
      this.tableFrom.timeVal = ""
      this.$refs.searchForm.resetFields()
    },
    onErtion(name, row) {
      console.log('操作插槽事件', name, row)
      switch (name) {
        case 'edit':
          this.fromData = { ...row }
          this.editshow = true
          break
        case 'userManage':
          // this.fromData = { ...row }
          this.userManageShow = true
          break
        case 'remind':
            this.$confirm('是否发送直播提醒', '直播提醒', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
            }).then(() => {
              
            })
          break
        case 'activityRecom':
          // this.fromData = { ...row }
          this.activityShow = true
          break
        case 'Reward':
          // this.fromData = { ...row }
          this.rewardShow = true
          break
        case 'comment':
          // this.fromData = { ...row }
          this.commentShow = true
          break
        case 'subBroadcast': // 副播管理
          this.fromData = { ...row }
          this.subShow = true
          console.log(this.subShow)
          break
          
      }
    },
  },
};
</script>

<style scoped lang="scss">
.label-div{
  width: 68px;
  height: 20px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  text-align: center;
  line-height: 20px;
}
.red{
  background-color: #FF5722;
}
.green{
  background-color: #67c23a;
}
</style>
