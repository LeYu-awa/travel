<template>
  <div>
    <div class="mb14">
      <el-button size="small" type="primary" @click="onadd">添加活动</el-button>
    </div>
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
import { getCodeActivityList, codeActivation, deleteCodeActivity, getCodeList } from '@/api/redemptionCode'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'


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
        { prop: 'name', label: '活动名称', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'title', label: '专题名称', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'num', label: '兑换码数量', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'use', label: '使用数量', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'isActivation', label: '状态', columnType: 'slot', align: 'left', 'min-width': '249' },
        { prop: 'remark', label: '备注', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'create_time', label: '添加时间', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData:[
        { name: 'export', label: '导出兑换码' },
        { name: 'look', label: '查看兑换码' },
        { name: 'delete', label: '删除'},
      ],
      tableFrom: {
        name: '',
        room_id:''
      }
    }
  },
  mounted() {
    this.getCodeActivityList()
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
    onadd() {
      this.$emit('onadd')
    },
    onErtion(name, row) {
      console.log('操作插槽事件', name, row)
      switch (name) {
        case 'look':
          this.$emit('onlook',row.id)
          break
        case 'export':
          let str = {
            activity_id: row.id,
            page: 1,
            limit:999,
          }
          // const loading = this.$loading({
          //     lock: true,
          //     text: 'Loading',
          //     spinner: 'el-icon-loading',
          //     background: 'rgba(0, 0, 0, 0.7)'
          //   });
          getCodeList(str)
          .then((res) => {
            
            const data =  res.data.data.map(item => {
              return {
                编号: item.id,
                活动名称: row.name,
                专题名称: row.title,
                兑换码:item.code,
                是否激活: item.is_activation === 1?'已激活':'未激活',
                是否使用: item.is_use === 1 ? '已使用' : '未使用',
                兑换人: item.nickname,
                兑换人电话: item.phone,
                兑换时间: item.use_time
              }
            })
             // 创建工作簿和工作表
            const ws = XLSX.utils.json_to_sheet(data)
            const wb = XLSX.utils.book_new()
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

            // 导出为 Excel 文件
            const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
            saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '兑换码导出.xlsx')
          })
          .catch((res) => {
            // this.showLoading = false
            // this.$message.error(res.message)
          })
          break;
        case 'delete':
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
    // 修改状态
    onchangeIsShow(row) {
      codeActivation({id:row.id,is_activation:row.is_activation,type:'1'})
        .then(({ message }) => {
          this.$message.success('修改成功');
          // this.getLiveList();
        })
        .catch(({ message }) => {
          this.$message.error(message);
        });
    },
    // 删除接口
    IfdelGift(str) {
      deleteCodeActivity(str).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getCodeActivityList()
      })
    },
    onSearch() {
      this.getCodeActivityList()
    },
    getCodeActivityList() {
      getCodeActivityList(this.tableFrom)
        .then((res) => {
          this.showLoading = false
          res.data.map(item => {
            item.operation = this.operationData
          })
          this.tableData = res.data
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
