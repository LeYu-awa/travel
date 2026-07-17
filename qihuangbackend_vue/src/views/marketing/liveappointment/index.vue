<template>
  <div class="box">
    <div class="selCard">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px">
        <el-form-item label="直播标题" prop="title">
          <el-input v-model="tableFrom.title" placeholder="请输入直播标题" class="selWidth" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="onSearch">搜索</el-button>
          <el-button size="small" @click="searchReset()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-card class="mt14" style="flex: 1">
      <div class="mb14">
        <el-button size="small" type="primary" @click="onadd">添加</el-button>
      </div>

      <dTable @switchChange="switchChange" :table-data="tableData" :default-expand-all="false"
        :tree-config="{ rowKey: 'id', children: 'children', hasChildren: 'hasChildren' }"
        :table-header-data="tableHeaderData" :showLoading="showLoading">
        <template #operation="scope">
          <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
        </template>
      </dTable>
      <div class="block">
        <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
          @currentChange="onCurrentChange"></dFooter>
      </div>
    </el-card>
    <editpopUp v-if="editshow" :dialog-visible="editshow" :from-data="fromData" @cancel="editshow = false"
      @confirm="onConfirm" @close="editshow = false" />
  </div>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import timeOptions from '@/utils/timeOptions';
import operation from '@/components/operation/operation.vue'
import editpopUp from './editpopUp.vue'
import { liveAppointmentList, liveAppointmentDelete, liveAppointmentEdit } from '@/api/marketing'
import { handleTree } from '@/utils/tree'
export default {
  name: "LiveManage",
  components: {
    dTable,
    dFooter,
    editpopUp,
    operation
  },
  data() {
    return {
      editshow: false,
      fromData: {
        id: null,
        name: '123',
        is_show: true,
        pid: 0,
        sort: 0
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
        limit: 10,
        name: '',
        is_free: 'all',
        is_hot: 'all',
        is_recommend: 'all',
        status: 'all'


      },
      seckillStatusList: [],
      tableData: [],
      tableHeaderData: [
        // { prop: 'id', label: '编号', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'title', label: '直播标题', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'live_id', label: '直播间ID', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'specialty_type_name', label: '专科类型', columnType: 'text', align: 'left', 'min-width': '140' },
        { prop: 'lecturer_name', label: '讲师姓名', columnType: 'text', align: 'left', 'min-width': '140' },
        { prop: 'status_text', label: '状态', columnType: 'text', align: 'left', 'min-width': '120' },
        { prop: 'max_participants', label: '最大参与人数', columnType: 'text', align: 'left', 'min-width': '100' },
        { prop: 'current_participants', label: '当前参与人数', columnType: 'text', align: 'left', 'min-width': '100' },
        { prop: 'description', label: '直播描述', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'price', label: '价格', columnType: 'text', align: 'left', 'min-width': '120' },
        { prop: 'cost_price', label: '成本价', columnType: 'text', align: 'left', 'min-width': '120' },
        {
          prop: 'is_free', label: '是否免费', columnType: 'switch', activeText: '是',
          inactiveText: '否', align: 'left', 'min-width': '140'
        },
        { prop: 'cover_image', label: '封面图片URL', columnType: 'image', align: 'left', 'min-width': '120' },
        { prop: 'live_url', label: '直播链接', columnType: 'text', align: 'left', 'min-width': '120' },
        { prop: 'playback_url', label: '回放链接', columnType: 'text', align: 'left', 'min-width': '120' },
        { prop: 'tags', label: '标签', columnType: 'text', align: 'left', 'min-width': '140' },
        { prop: 'sort_order', label: '排序', columnType: 'text', align: 'left', 'min-width': '100' },
        {
          prop: 'is_recommend', label: '是否推荐', columnType: 'switch', activeText: '是',
          inactiveText: '否', align: 'left', 'min-width': '140'
        },
        {
          prop: 'is_hot', label: '是否热门', columnType: 'switch', activeText: '是',
          inactiveText: '否', align: 'left', 'min-width': '140'
        },
        { prop: 'create_time_text', label: '创建时间', columnType: 'text', align: 'left', 'min-width': '170' },
        { prop: 'update_time_text', label: '更新时间', columnType: 'text', align: 'left', 'min-width': '170' },

        // { prop: 'money', label: '专题数量', columnType: 'text', align: 'left', 'min-width': '249' },
        // { prop: 'is_show', label: '状态', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '230', fixed: 'right' }
      ],
      operationData: [
        { name: 'edit', label: '编辑' },
        { name: 'del', label: '删除' },
      ],
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    switchChange(e) {
      liveAppointmentEdit(e)
    },
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
    onSearch() {
      this.getList(1)
    },
    // 重置
    searchReset() {
      this.$refs.searchForm.resetFields()
      this.getList(1)
    },
    onadd() {
      this.editshow = true
      this.fromData = {}
    },
    onErtion(name, row) {
      switch (name) {
        case 'add':
          this.fromData = { pid: row.id, pName: row.name }
          this.editshow = true
          break
        case 'edit':
          this.fromData = { ...row, specialty_type: Number(row.specialty_type) }
          this.editshow = true
          break
        case 'del':
          this.$confirm('是否删除此数据?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.IfliveAppointmentDelete(row.id)

          })
          break
      }
    },
    // 删除接口
    IfliveAppointmentDelete(str) {
      liveAppointmentDelete(str).then(res => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.getList()
      })
    },
    // 列表
    getList(num) {
      this.showLoading = true
      this.tableFrom.page = num ? num : this.tableFrom.page
      liveAppointmentList(this.tableFrom)
        .then((res) => {
          this.showLoading = false
          console.log(res)
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
};
</script>
<style scoped lang="scss">
@import '@/styles/form.scss';
</style>
