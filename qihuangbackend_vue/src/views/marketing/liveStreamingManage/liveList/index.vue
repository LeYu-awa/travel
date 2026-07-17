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
      <div class="mb14">
        <el-button size="small" type="primary" @click="onadd">添加直播</el-button>
      </div>
      <dTable :table-data="tableData" :table-header-data="tableHeaderData" :showLoading="showLoading">
        <template #operation="scope">
          <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
        </template>
        <template #status="scope">
          <el-switch
            v-model="scope.row.is_show"
            :active-value="1"
            :inactive-value="0"
            active-text="下架"
            inactive-text="上架"
            @click.native="onchangeIsShow(scope.row)"
          />
        </template>
        <template #image="scope">
          <el-image 
            style="width: 60px; height: 60px"
            :src="scope.row.room_image" 
            :preview-src-list="[scope.row.room_image]">
          </el-image>
        </template>
      </dTable>
      <div class="block">
        <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
        @currentChange="onCurrentChange"></dFooter>
      </div>
    </el-card>
    <liveAddress
      v-if="liveShow"
      :dialog-visible="liveShow"
      :from-data="fromData"
      @cancel="liveShow=false"
      @confirm="onConfirm"
      @close="liveShow=false"
    />
    <liveReplay
      v-if="liveReplayShow"
      :dialog-visible="liveReplayShow"
      :from-data="fromData"
      @cancel="liveReplayShow=false"
      @confirm="onConfirm"
      @close="liveReplayShow=false"
    >

    </liveReplay>
  </div>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import timeOptions from '@/utils/timeOptions';
import operation from '@/components/operation/operation.vue'
import liveAddress from './liveAddress.vue'
import liveReplay from './liveReplay.vue'
import { getLiveList, changeLiveInfo, deleteLive } from '@/api/liveStreamingManage'
export default {
  name: "LiveManage",
  components: {
    dTable,
    dFooter,
    operation,
    liveAddress,
    liveReplay
  },
  data() {
    return {
      liveShow: false,
      liveReplayShow: false,
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
        { prop: 'id', label: '编号', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'title', label: '直播标题', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'type_name', label: '分类', columnType: 'text', align: 'left', 'min-width': '249' },
        // { prop: 'databaseUsername', label: '讲师', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'image', label: '封面', columnType: 'slot', align: 'left', 'min-width': '249' },
        { prop: 'live_code', label: '直播间ID', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'see_money', label: '价格', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'vip_money ', label: '会员价', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'sort', label: '排序', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'status', label: '状态', columnType: 'slot', align: 'left', 'min-width': '249' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData:[
        { name: 'edit', label: '编辑直播', icon: 'edit', type: 'primary' },
        { name: 'liveGo', label: '去直播', icon: 'edit', type: 'primary' },
        { name: 'liveReplay', label: '直播回放', icon: 'edit', type: 'primary' },
        { name: 'delete', label: '删除直播', icon: 'edit', type: 'primary' },
      ],
    };
  },
  mounted() {
    this.getLiveList()
  },
  methods: {
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
          res.data.data.map(item => {
            item.operation = this.operationData
          })
          this.tableData = res.data.data
          this.pageConfig.total = res.data.total
        })
        .catch((res) => {
          this.showLoading = false
          this.$message.error(res.message)
        })
    },
    onsearch() {
      this.tableFrom.page = 1
      this.getLiveList()
    },
    // 修改状态
    onchangeIsShow(row) {
      console.log(row.is_show)
      changeLiveInfo({room_id:row.id,type:'is_show',value:row.is_show})
        .then(({ message }) => {
          this.$message.success('上架成功');
          // this.getLiveList();
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
    onConfirm() {
      this.liveShow = false
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
      // this.tableFrom.timeVal = e ? this.timeVal.join("-") : "";
      // this.getList(1);
    },
    // 重置
    searchReset(){
      this.tableFrom.timeVal = ""
      this.$refs.searchForm.resetFields()
    },
    // 添加直播
    onadd() {
      this.$router.push({name:'EditpopUp',query:{id:0}})
    },
    onErtion(name, row) {
      console.log('操作插槽事件', name, row)
      switch (name) {
        case 'edit':
          // this.fromData = { ...row }
          this.$router.push({name:'EditpopUp',query:{id:row.id}})
          break
        case 'liveGo':
          this.fromData = { ...row }
          this.liveShow = true
          break
        case 'delete':
           this.$confirm('是否删除此数据?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.IfdelGift({ room_id: row.id })

            })
          break
        case 'liveReplay':
          this.fromData = { ...row }
          this.liveReplayShow = true
          break
          
      }
    },
    // 删除接口
    IfdelGift(str) {
      deleteLive(str).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getLiveList()
      })
    },
  },
};
</script>

<style scoped lang="scss">

</style>
