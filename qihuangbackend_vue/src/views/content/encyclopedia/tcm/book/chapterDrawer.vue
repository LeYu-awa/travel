<template>
    <el-drawer :title="fromDataNew.name" size="60%" :visible.sync="dialogVisible" direction="rtl" :before-close="close">
        <div class="selCard">
            <div class="mb14">
                <el-button size="small" type="primary" @click="onadd">添加</el-button>
            </div>
            <dTable :default-expand-all="false"
                :tree-config="{ rowKey: 'id', children: 'children', hasChildren: 'hasChildren' }"
                :table-data="tableData" :table-header-data="tableHeaderData" :showLoading="showLoading">
                <template #operation="scope">
                    <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
                </template>
                <template #bookChapter="{ row }">
                    <el-button size="mini" type="primary">查看章节</el-button>
                </template>
                <template #image="scope">
                    <el-image style="width: 60px; height: 60px" :src="scope.row.image"
                        :preview-src-list="[scope.row.image]">
                    </el-image>
                </template>
            </dTable>
        </div>
        <editChapterpopUp v-if="chaptershow" :dialog-visible="chaptershow" :from-data="fromDataPopup"
            @cancel="chaptershow = false" @confirm="onConfirm" @close="chaptershow = false" />

    </el-drawer>
</template>
<script>

import dTable from '@/components/dTable/dTable.vue'
import operation from '@/components/operation/operation.vue'
import editChapterpopUp from './editChapterpopUp.vue'
import { bookChapterDelete, bookChapterList } from '@/api/content'
export default {
    components: {
        editChapterpopUp, dTable, operation
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
    computed: {
        fromDataNew: {
            get() {
                return this.fromData;
            },
            set(v) { }
        }
    },
    data() {
        return {
            showLoading: false,
            chaptershow: false,
            fromDataPopup: {},
            tableData: [],
            tableHeaderData: [
                // { prop: 'id', label: 'id', columnType: 'text', align: 'left', 'min-width': '249' },
                { prop: 'name', label: '目录名称', columnType: 'text', align: 'left', 'min-width': '200' },
                { prop: 'sort', label: '排序', columnType: 'text', align: 'left', 'min-width': '50' },
                { prop: 'content', label: '内容', columnType: 'text', align: 'left', 'min-width': '249' },
                // { prop: 'bookChapter', label: '章节', columnType: 'slot', align: 'left', 'min-width': '249' },
                { prop: 'operation', label: '操作', columnType: 'slot', 'width': '140', fixed: 'right' }
            ],
            operationData: [
                { name: 'edit', label: '编辑' },
                { name: 'del', label: '删除' },
            ],
        }
    },
    created() {
        this.getList()
    },
    methods: {
        onErtion(name, row) {
            switch (name) {
                case 'edit':
                    this.fromDataPopup = { ...row }
                    this.chaptershow = true
                    break
                case 'del':
                    this.$confirm('是否删除此数据?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.IfbookChapterDelete(row.id)

                    })
                    break
            }
        },
        // 删除接口
        IfbookChapterDelete(str) {
            bookChapterDelete(str).then(res => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.getList()
            })
        },
        close() {
            this.$emit("close");
        },
        onConfirm() {
            this.$message.success('操作成功')
            this.chaptershow = false
            this.getList(1)
        },
        onadd() {
            this.chaptershow = true
            this.fromDataPopup = {
                book_id: this.fromDataNew.book_id,
                catalog_id: this.fromDataNew.catalog_id
            }
        },
        async getList() {
            let { data } = await bookChapterList({
                catalog_id: this.fromDataNew.catalog_id,
                book_id: this.fromDataNew.book_id
            })
            data.map(item => {
                item.operation = this.operationData
            })
            console.log(data)

            this.tableData = data
        }
    }
}
</script>