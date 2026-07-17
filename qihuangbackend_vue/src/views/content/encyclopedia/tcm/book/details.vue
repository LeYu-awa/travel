<template>
  <div class="box">
    <el-card>
      <el-page-header @back="back" :content="$route.query.name + '详情'">
      </el-page-header>
    </el-card>
    <div class="selCard mt14">
      <el-form :model="tableFrom" ref="searchForm" inline size="small" label-width="85px">
        <el-form-item label="药膳名称：" prop="name">
          <el-input v-model="tableFrom.name" placeholder="请输入药膳名称" class="selWidth" />
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
      <dTable :default-expand-all="false"
        :tree-config="{ rowKey: 'id', children: 'children', hasChildren: 'hasChildren' }" :table-data="tableData"
        :table-header-data="tableHeaderData" :showLoading="showLoading">
        <template #operation="scope">
          <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
        </template>
        <!-- <template #bookChapter="{ row }">
          <el-button size="mini" type="primary" @click="lookChapter(row)">查看章节</el-button>
        </template> -->
        <template #image="scope">
          <el-image style="width: 60px; height: 60px" :src="scope.row.image" :preview-src-list="[scope.row.image]">
          </el-image>
        </template>
      </dTable>
      <!-- <div class="block">
          <dFooter :show-loading="showLoading" :page-config="pageConfig" @sizeChange="onSizeChange"
          @currentChange="onCurrentChange"></dFooter>
        </div> -->
    </el-card>
    <chapterDrawer v-if="drawershow" :from-data="fromData" :dialog-visible="drawershow" @close="drawershow = false" />
    <editCatalogpopUp v-if="editshow" :dialog-visible="editshow" :from-data="fromData" @cancel="editshow = false"
      @confirm="onConfirm" @close="editshow = false" />
    <editChapterpopUp v-if="chaptershow" :dialog-visible="chaptershow" :from-data="fromData"
      @cancel="chaptershow = false" @confirm="onConfirm" @close="chaptershow = false" />
  </div>
</template>

<script>
import dFooter from '@/components/dFooter/dFooter.vue'
import dTable from '@/components/dTable/dTable.vue'
import timeOptions from '@/utils/timeOptions';
import operation from '@/components/operation/operation.vue'
import editCatalogpopUp from './editCatalogpopUp.vue'
import editChapterpopUp from './editChapterpopUp.vue'
import chapterDrawer from './chapterDrawer.vue'
import { bookCatalogList, bookCatalogDelete } from '@/api/content'
import { handleTree } from '@/utils/tree'
export default {
  name: "LiveManage",
  components: {
    dTable,
    dFooter,
    editCatalogpopUp,
    editChapterpopUp,
    operation,
    chapterDrawer
  },
  data() {
    return {
      editshow: false,
      chaptershow: false,
      drawershow: false,
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
        name: ''
      },
      seckillStatusList: [],
      tableData: [],
      tableHeaderData: [
        // { prop: 'id', label: 'id', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'name', label: '目录名称', columnType: 'text', align: 'left', 'min-width': '249' },
        { prop: 'sort', label: '排序', columnType: 'text', align: 'left', 'min-width': '249' },
        // { prop: 'bookChapter', label: '章节', columnType: 'slot', align: 'left', 'min-width': '249' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '270', fixed: 'right' }
      ],
      operationData: [
        { name: 'addNext', label: '新增下级' },
        // { name: 'addChapter', label: '新增小节' },
        { name: 'edit', label: '编辑' },
        { name: 'del', label: '删除' },
      ],
    };
  },
  mounted() {
    this.tableFrom.book_id = this.$route.query.id
    this.getList()
  },
  methods: {
    lookChapter(e) {
      this.fromData = {
        ...e,
        catalog_id: e.id,
        book_id: this.$route.query.id
      }
      this.drawershow = true

    },
    onConfirm() {
      this.$message.success('操作成功')
      this.editshow = false
      this.chaptershow = false
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
      this.fromData = {
        book_id: this.$route.query.id
      }
    },
    onErtion(name, row) {
      switch (name) {
        case 'addNext':
          this.fromData = { book_id: this.$route.query.id, parent_id: row.id }
          this.editshow = true
          break
        case 'addChapter':
          this.fromData = { book_id: this.$route.query.id, catalog_id: row.id }
          this.chaptershow = true
          break
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
            this.IfbookCatalogDelete(row.id)

          })
          break
      }
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 删除接口
    IfbookCatalogDelete(str) {
      bookCatalogDelete(str).then(res => {
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
      bookCatalogList(this.tableFrom)
        .then((res) => {
          this.showLoading = false
          res.data.map(item => {
            item.operation = this.operationData
          })
          this.tableData = handleTree(res.data, 'id', 'parent_id')
          // this.pageConfig.total = res.data.total
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