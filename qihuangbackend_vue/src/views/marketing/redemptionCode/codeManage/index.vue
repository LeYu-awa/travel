<template>
  <div class="box">
    <div class="top" ></div>
    <div class="bottom" ></div>
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px" >
        <el-form-item label="活动名称：" prop="name">
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
    <!-- <div class="selCard">
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
    </div> -->
    <el-card class="mt14" style="flex: 1">
      <el-tabs v-model="activeName">
        <el-tab-pane label="活动列表" name="activity"></el-tab-pane>
        <el-tab-pane label="兑换码列表" name="code"></el-tab-pane>
      </el-tabs>
      <activityCom v-show="activeName=='activity'"  ref="activityComref" @onadd="onadd" @onlook="onlook"> </activityCom>
      <codeCom v-show="activeName=='code'" ref="codeComref"> </codeCom>
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
import editpopUp from './editpopUp.vue'
import activityCom from './components/activityCom.vue'
import codeCom from './components/codeCom.vue'
import { getGift,delGift } from '@/api/liveStreamingManage'

export default {
  name: "LiveManage",
  components: {
    dTable,
    dFooter,
    editpopUp,
    operation,
    activityCom,
    codeCom
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
        { prop: 'name', label: '名称', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'image', label: '图片', columnType: 'slot', align: 'left', 'min-width': '249' },
        { prop: 'money', label: '价格（虚拟货币）', columnType: 'text', align: 'left', 'min-width': '249' },
        // { prop: 'createTime1', label: '状态', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData:[
        { name: 'edit', label: '编辑' },
        { name: 'del', label: '删除'},
      ],
      activeName:'activity'
    };
  },
  mounted() {
    
  },
  methods: {
    onConfirm() {
      this.editshow = false
      this.$refs.activityComref.onSearch()
    },
    onlook(id) {
      console.log(id)
      this.activeName = 'code'
      this.$refs.codeComref.onSearch(id)
    },
    onSearch() {
      this.$refs.activityComref.onSearch()
      
      // this.tableFrom.page = 1
      // this.getList()
    },
    // 重置
    searchReset(){
      // this.tableFrom.date = ""
      // this.$refs.searchForm.resetFields()
      // this.tableFrom.page = 1
      // this.getList()
    },
    onadd() {
      console.log(123456)
      this.editshow = true
      this.fromData = {
        id: null,
        image: '',
        svga:'',
        money:'',
        name:''
       }
    },
  },
};
</script>
<style scoped lang="scss">
@import '@/styles/form.scss';
</style>
