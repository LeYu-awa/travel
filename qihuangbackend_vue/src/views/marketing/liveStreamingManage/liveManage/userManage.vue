<template>
  <div>
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%" @close="close">
    <div class="divBox">
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px" >
        <el-form-item label="用户名称" prop="keyword">
          <el-input
            v-model="tableFrom.keyword"
            placeholder="请输入商品名称，关键字，产品编号"
            class="selWidth"
          />
        </el-form-item>
        <el-form-item label="时间范围：">
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
          <el-button type="primary" size="small" >搜索</el-button>
          <el-button size="small" @click="searchReset()">重置</el-button> 
        </el-form-item>
      </el-form>
    </div>
    <el-card class="mt14">
      <div>直播间用户列表</div>
      <dTable :table-data="tableData" :table-header-data="tableHeaderData">
        <template #operation="scope">
          <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
        </template>
      </dTable>
      <div class="block">
        <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
        @currentChange="onCurrentChange"></dFooter>
      </div>
    </el-card>
    </div>
  </el-dialog>
  <el-dialog title="禁止发言" :visible.sync="forbidden" width="40%" @close="forbidden=false">
    <d-from
      :reset-fields-flag="resetFieldsFlag"
      :validate-flag="validateFlag"
      label-position="right"
      label-width="130px"
      :rules="rules"
      :form-datas="projectInfo"
      display="grid"
      :form-items="fromItems"
      :form-line-num="1"
      @submit="onSubmitForm"
    >
    </d-from>
    <span slot="footer" class="dialog-footer">
      <el-button @click="forbidden=false">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </span>
  </el-dialog>
  <el-dialog title="禁止进入" :visible.sync="noEntryShow" width="40%" @close="noEntryShow=false">
    <d-from
      :reset-fields-flag="resetFieldsFlag2"
      :validate-flag="validateFlag2"
      label-position="right"
      label-width="130px"
      :rules="rules"
      :form-datas="projectInfo2"
      display="grid"
      :form-items="fromItems2"
      :form-line-num="1"
      @submit="onSubmitForm2"
    >
    </d-from>
    <span slot="footer" class="dialog-footer">
      <el-button @click="noEntryShow=false">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import timeOptions from '@/utils/timeOptions';
import editpopUp from './editpopUp.vue'
import operation from '@/components/operation/operation.vue'
import dFrom from '@/components/dFrom/dFrom.vue'
export default {
  components: {
    dTable,
    dFooter,
    editpopUp,
    operation,
    dFrom
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
      forbidden: false,
      noEntryShow: false,
      resetFieldsFlag: false,
      validateFlag: false,
      projectInfo: {},
      rules: {},
      fromItems: [
        {
          label: '是否禁言',
          prop: 'isUser',
          placeholder: '请选择',
          type: 'radio',
          seleteData: [{ value: 0, label: '否' }, { value: 1, label: '是' }]
        },
        {
          label: '禁言时间：分',
          prop: 'productIds',
          placeholder: '请输入',
          type: 'inputNumber',
        },
      ],
      resetFieldsFlag2: false,
      validateFlag2: false,
      projectInfo2: {},
      fromItems2: [
        {
          label: '是否禁止进入直播间',
          prop: 'isUser',
          placeholder: '请选择',
          type: 'radio',
          seleteData: [{ value: 0, label: '否' }, { value: 1, label: '是' }]
        },
        {
          label: '禁言时间：分',
          prop: 'productIds',
          placeholder: '请输入',
          type: 'inputNumber',
        },
      ],
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
        seckill_status:'',
        keyword:''
      },
      seckillStatusList:[],
      tableData: [],
      tableHeaderData: [
        { prop: 'dataBase', label: '头像', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'databasePassword', label: '昵称', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'databaseUrl', label: '访问次数及', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'databaseUsername', label: '是否在线', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'createTime1', label: '是否禁言', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'createTime2', label: '禁言到期时间', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'createTime3', label: '是否禁止进入', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'createTime4', label: '禁止进入直播间到期时间', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData:[
        { name: 'forbidden', label: '禁言', icon: 'edit', type: 'primary' },
        { name: 'noEntry', label: '禁止进入', icon: 'edit', type: 'primary' }
      ],
    }
  },
  mounted() {
    this.tableData = [{dataBase:'123456',operation:this.operationData}]
  },
  methods: {
    close() {
      this.$emit('close')
    },
    onSubmitForm() {
      console.log('表单验证')
    },
    onSubmitForm2() {
      console.log('表单验证')
    },
    onConfirm() {
      this.editshow = false
      console.log()
    },
    onSizeChange(val) {
      // this.searchFromData.pageSize = val
      // this.fetchData()
    },
    onCurrentChange(val) {
      // this.searchFromData.pageNo = val
      // this.fetchData()
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
      // this.tableFrom.date = ""
      this.$refs.searchForm.resetFields()
    },
    onErtion(name, row) {
      console.log('操作插槽事件', name, row)
      switch (name) {
        case 'forbidden':
          // this.fromData = { ...row }
          this.forbidden = true
          break
        case 'noEntry':
          // this.fromData = { ...row }
          this.noEntryShow = true
          break
      }
    },
  }
}
</script>
<style scoped lang="less"></style>
