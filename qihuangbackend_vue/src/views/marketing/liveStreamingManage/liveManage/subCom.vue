<template>
  <div>
    <el-dialog title="副播列表" :visible.sync="dialogVisible" width="40%" @close="close">
    <div class="divBox">
    <el-card class="mt14">
      <div class="mb14">
        <el-button type="primary" size="small" @click="getPermission">搜索</el-button>
        <el-button size="small" type="primary" @click="onadd">添加副播</el-button>
      </div>
      <dTable :table-data="tableData" :table-header-data="tableHeaderData">
        <template #operation="scope">
          <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
        </template>
        <template #image="scope">
          <el-image 
            style="width: 60px; height: 60px"
            :src="scope.row.avatar" 
            :preview-src-list="[scope.row.avatar]">
          </el-image>
        </template>
      </dTable>
      <div class="block">
        <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
        @currentChange="onCurrentChange"></dFooter>
      </div>
    </el-card>
    </div>
  </el-dialog>
  <el-dialog title="禁止进入" :visible.sync="userShow" width="40%" @close="userShow=false">
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
    <template #user_id="scope">
      <el-select
        v-model="projectInfo.user_id"
        filterable
        remote
        reserve-keyword
        placeholder="请输入关键词"
        :remote-method="remoteMethod"
        :loading="loading">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </template>
    </d-from>
    <span slot="footer" class="dialog-footer">
      <el-button @click="userShow=false">取 消</el-button>
      <el-button type="primary" @click="onConfirm()">确 定</el-button>
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
import { getPermission, addPermission, deletePermission } from '@/api/liveStreamingManage'
import { userLstApi } from '@/api/user'

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
      value:'',
      resetFieldsFlag: false,
      validateFlag: false,
      projectInfo: {
        user_id:''
      },
      rules: {
        user_id: [{ required: true, message: '请选择', trigger: 'blur' }],
      },
      fromItems: [
        {
          label: '选择用户',
          prop: 'user_id',
          placeholder: '请输入',
          type: 'slot',
          slotName:'user_id'
        },
      ],
      userShow:false,
      pageConfig: {
        currentPage: 1,
        pageSize: 10,
        pageSizes: 10,
        total: 0,
        disabled: false,
        layout: 'total, sizes, prev, pager, next, jumper'
      },
      loading:false,
      showLoading: false,
      tableFrom: {
        seckill_status:'',
        keyword:''
      },
      seckillStatusList:[],
      tableData: [],
      tableHeaderData: [
        { prop: 'image', label: '图片', columnType: 'slot', align: 'left', 'min-width': '249' },
        { prop: 'nickname', label: '昵称', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData:[
        // { name: 'edit', label: '编辑', icon: 'edit', type: 'primary' },
        { name: 'del', label: '删除', icon: 'edit', type: 'primary' }
      ],
      options:[]
    }
  },
  mounted() {
    this.getPermission({})
  },
  methods: {
    addPermission(str){
      addPermission(str).then(res => {
        if (res.status == 200) {
          this.$message.success('新增成功');
          this.value = ''
          this.userShow = false
          this.getPermission({})
        } else {
          this.$message.error(res.message);
        }
      })
    },
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        this.userLstApi({keyword:query})
      } else {
        this.options = [];
      }
    },
    userLstApi(str) {
      userLstApi(str).then(res => {
        this.options =  res.data.list.map(item => {
          return {
            label: item.nickname, // 假设每个对象都有一个label属性
            value: item.uid  // 假设每个对象都有一个value属性
          };
        })
        this.loading = false;
      })
    },
    onSubmitForm() {
      console.log(this.value)
      let str = {
        room_id: this.fromData.id,
        user_id:this.projectInfo.user_id
      }
      this.addPermission(str)
    },
    close() {
      this.$emit('close')
    },
    onadd() {
      this.userLstApi()
      this.userShow = true
    },
    onConfirm() {
      this.validateFlag = !this.validateFlag
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
    deletePermission(id){
      deletePermission({id:id}).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getPermission()
      })
    },
    getPermission() {
      getPermission({room_id:this.fromData.id}).then(res => {
        console.log(res)
        res.data.map(item => {
            item.operation = this.operationData
          })
        this.tableData = res.data

      })
    },
    onErtion(name, row) {
      console.log('操作插槽事件', name, row)
      switch (name) {
        case 'edit':
          this.userShow = true
          break
        case 'del':
          this.$confirm('是否删除此数据?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.deletePermission(row.id)

            })
          break
      }
    },
  }
}
</script>
<style scoped lang="less"></style>
