<template>
  <div class="box">
    <div class="top" ></div>
    <div class="bottom" ></div>
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px" >
        <el-form-item label="名称：" prop="name">
          <el-input
            v-model="tableFrom.name"
            placeholder="请输入名称"
            class="selWidth"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
          <el-button size="small" @click="searchReset()">重置</el-button> 
        </el-form-item>
      </el-form>
    </div>
    <el-card class="mt14" style="flex: 1">
      <div class="mb14">
        <!-- <el-button size="small" type="primary" @click="onadd">添加配置</el-button> -->
      </div>
      <dTable :table-data="tableData" :table-header-data="tableHeaderData" :showLoading="showLoading">
        <template #operation="scope">
          <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
        </template>
        <template #image="scope">
          <el-image 
            v-if="scope.row.images" 
            style="width: 60px; height: 60px"
            :src="scope.row.images" 
            :preview-src-list="[scope.row.images]">
          </el-image>
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
      @confirm="onConfirm"
      @close="editshow=false"
    />
  </div>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import timeOptions from '@/utils/timeOptions';
import operation from '@/components/operation/operation.vue'
import { getLiveReportList } from '@/api/liveStreamingManage'

export default {
  name: "LiveManage",
  components: {
    dTable,
    dFooter,
    operation
  },
  data() {
    return {
      editshow: false,
      fromData: {
        id: null,
        image: '',
        svga:'',
        money:'',
        name:'123'
      },
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
        page: 1,
        limit: 20,
        name:''
      },
      seckillStatusList:[],
      tableData: [],
      tableHeaderData: [
        
        { prop: 'room_id', label: '直播间id', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'title', label: '直播间标题', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'image', label: '图片', columnType: 'slot', align: 'left', 'min-width': '90' },
        { prop: 'term', label: '投诉类型', columnType: 'text', align: 'left', 'min-width': '90' },
        { prop: 'describe', label: '投诉描述', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'nickname', label: '投诉人', columnType: 'text', align: 'left', 'min-width': '90' },
        { prop: 'create_time', label: '投诉时间', columnType: 'text', align: 'left', 'min-width': '249' },
        // { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData:[
        // { name: 'edit', label: '编辑' },
        // { name: 'del', label: '删除'},
      ],
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    onConfirm() {
      this.editshow = false
      this.getList()
    },
    onSizeChange(val) {
      this.tableFrom.limit = val
      this.getList()
    },
    onCurrentChange(val) {
      this.tableFrom.page = val
      this.getList()
    },
    // 具体日期
    onchangeTime(e) {
      console.log(e)
      // this.tableFrom.timeVal = e;
      // this.tableFrom.timeVal = e ? this.timeVal.join("-") : "";
      // this.getList(1);
    },
    onSearch() {
      this.tableFrom.page = 1
      this.getList()
    },
    // 重置
    searchReset(){
      // this.tableFrom.date = ""
      this.$refs.searchForm.resetFields()
      this.tableFrom.page = 1
      this.getList()
    },
    onadd() {
      this.editshow = true
      this.fromData = {
        id: null,
        image: '',
        svga:'',
        money:'',
        name:''
       }
    },
    onErtion(name, row) {
      console.log('操作插槽事件', name, row)
      switch (name) {
        case 'edit':
          this.fromData = { ...row }
          this.editshow = true
          break
        case 'del':
          this.$confirm('是否删除此数据?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.IfdelGift({ id: row.id })

            })
          break
      }
    },
    // 删除接口
    IfdelGift(str) {
      delGift(str).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getList()
      })
    },
    // 列表
    getList() {
      this.showLoading = true
      getLiveReportList(this.tableFrom)
        .then((res) => {
          this.showLoading = false
          this.tableData = res.data
          console.log(this.tableData)
          this.pageConfig.total = res.data.length
        })
        .catch((res) => {
          this.showLoading = false
          this.$message.error(res.message)
        })
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/form.scss';
</style>
