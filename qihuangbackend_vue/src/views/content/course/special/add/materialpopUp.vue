<template>
  <el-dialog title="选择素材" :visible.sync="dialogVisible" width="60%" @close="close">
    <div class="">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px">
        <el-form-item label="素材标题：" prop="title">
          <el-input v-model="tableFrom.title" placeholder="请输入素材标题" class="selWidth" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
          <el-button size="small" @click="searchReset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card style="flex: 1">
      <dTable showSelection @multipleSelection="multipleSelection" :table-data="tableData" :table-header-data="tableHeaderData" :showLoading="showLoading">
     </dTable>
      <div class="block">
        <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
          @currentChange="onCurrentChange"></dFooter>
      </div>
    </el-card>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="onSubmitForm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import timeOptions from '@/utils/timeOptions';
import operation from '@/components/operation/operation.vue'
import { materialList, materialDelete } from '@/api/content'
export default {
  components: {
    dTable,
    dFooter,
    operation
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      loading: false,
      fromData: {
        id: null,
        image: '',
        svga: '',
        money: '',
        name: '123'
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
        name: ''
      },
      seckillStatusList: [],
      tableData: [],
      typeObj: {
        0: '--',
        1: '图文',
        2: '音频',
        3: '视频',
      },
      tableHeaderData: [
        { prop: 'title', label: '素材标题', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'type', label: '分类', columnType: 'slot', align: 'left', 'min-width': '110' },
        { prop: 'cover_image', label: '封面图片', columnType: 'image', align: 'left', 'min-width': '249' },
      ],
      selectList: [], // 选择的list
    }
  },
  computed: {

  },
  watch:{
   'props.dialogVisible': {
    handler(){
      this.getList(1)
    },
    deep: true,
    immediate: true
   }
  },
  methods: {
    onConfirm() {
      this.editshow = false
      this.getList(1)
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
    multipleSelection(e){
      this.selectList = e
    },
    onSearch() {
      this.getList(1)
    },
    // 重置
    searchReset() {
      // this.tableFrom.date = ""
      this.$refs.searchForm.resetFields()
      this.getList(1)
    },
    onadd() {
      this.editshow = true
      this.fromData = {}
    },
    // 删除接口
    IfmaterialDelete(str) {
      materialDelete(str).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getList()
      })
    },
    close() {
      this.$emit('close')
    },
    cancel() {
      this.$emit('cancel')
    },
    onSubmitForm(){
      this.$emit('confirm', this.selectList)
    },
    // 列表
    getList(num) {
      this.showLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page

      materialList()
        .then((res) => {
          this.showLoading = false
          res.data.list.map(item => {
            item.operation = this.operationData
          })
          this.tableData = res.data.list
          this.pageConfig.total = res.data.total
        })
        .catch((res) => {
          this.showLoading = false
          this.$message.error(res.message)
        })
    },
  },
}
</script>
<style scoped lang="less"></style>
