<template>
  <div>
    <dTable :table-data="tableData" :table-header-data="tableHeaderData" :showLoading="showLoading">
      <template #operation="scope">
        <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
      </template>
      <template #isActivation="scope">
        <el-switch
            v-model="scope.row.is_activation"
            :active-value="1"
            :inactive-value="0"
            active-text="开启"
            inactive-text="结束"
            @click.native="onchangeIsShow(scope.row)"
          />
      </template>
    </dTable>
    <div class="block">
      <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
      @currentChange="onCurrentChange"></dFooter>
    </div>
  </div>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import operation from '@/components/operation/operation.vue'
import { getCodeList, codeActivation } from '@/api/redemptionCode'
export default {
  components: {
    dTable,
    dFooter,
    operation
  },
  props: {

  },
  data() {
    return {
      showLoading:false,
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
        { prop: 'id', label: '编号', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'code', label: '兑换码', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'nickname', label: '兑换人', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'phone', label: '兑换人电话', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'use_time', label: '兑换时间', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'isActivation', label: '状态', columnType: 'slot', align: 'left', 'min-width': '249' },
      ],
      tableFrom: {
        page: 1,
        limit:10,
        name: '',
        room_id: '',
        activity_id:''
      }
    }
  },
  mounted() {
    this.getCodeList()
  },
  methods: {
    onErtion() {
      
    },
    onSizeChange(val) {
      // this.tableFrom.page = val
      // this.getList()
    },
    onCurrentChange(val) {
      // this.tableFrom.limit = val
      // this.getList()
    }, 
    onSearch(id) {
      this.tableFrom.activity_id = id
      this.tableFrom.page = 1
      this.getCodeList()
    },
    // 修改状态
    onchangeIsShow(row) {
      codeActivation({id:row.id,is_activation:row.is_activation,type:'2'})
        .then(({ message }) => {
          this.$message.success('修改成功');
          // this.getLiveList();
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
    getCodeList() {
      getCodeList(this.tableFrom)
        .then((res) => {
          this.showLoading = false
          res.data.data.map(item => {
            item.operation = this.operationData
          })
          this.tableData = res.data.data
          // this.pageConfig.total = res.data.total
        })
        .catch((res) => {
          this.showLoading = false
          this.$message.error(res.message)
        })
    }
  }
}
</script>
<style scoped lang="less"></style>
