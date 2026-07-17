<template>
<div class="divBox">
    <div class="selCard">
        <el-form :model="userFrom" ref="searchForm" size="small" label-width="85px" :inline="true">
            <el-form-item label="搜索时间：">
                <el-date-picker
                    v-model="timeVal"
                    value-format="yyyy/MM/dd"
                    format="yyyy/MM/dd"
                    size="small"
                    type="daterange"
                    placement="bottom-end"
                    placeholder="自定义时间"
                    style="width: 280px;"
                    :picker-options="pickerOptions"
                    @change="onchangeTime"
                />
                </el-form-item>
                <el-form-item label="搜索词：" prop="keyword">
                <el-input v-model="userFrom.keyword" placeholder="请输入搜索词" clearable class="selWidth" @keyup.enter.native="getList(1)" />
            </el-form-item>
            <el-form-item label="用户昵称：" prop="nickname">
                <el-input v-model="userFrom.nickname" placeholder="请输入昵称" clearable class="selWidth" @keyup.enter.native="getList(1)" />
            </el-form-item> 
            <el-form-item>
                <el-button type="primary" size="small" @click="getList(1)">搜索</el-button>
                <el-button size="small" @click="searchReset()">重置</el-button> 
            </el-form-item>                
        </el-form>
    </div>
    <el-card class="mt14">
        <div class="mb5">
            <el-tabs v-model="user_type" @tab-click="getList(1)">
                <el-tab-pane label="全部用户" name="" />
                <el-tab-pane label="微信用户" name="wechat" />
                <el-tab-pane label="小程序用户" name="routine" />
                <el-tab-pane label="H5用户" name="h5" />
                <el-tab-pane label="APP用户" name="app" />
                <el-tab-pane label="PC用户" name="pc" />
            </el-tabs>
        </div>
        <el-table v-loading="listLoading" :data="tableData.data" size="small" >         
            <el-table-column prop="uid" label="用户ID" min-width="60">
                <template slot-scope="scope">
                    <span>{{scope.row.uid !=0 ? scope.row.uid : '未知'}}</span>
                </template>
            </el-table-column> 
            <el-table-column label="头像" min-width="50">
                <template slot-scope="scope">
                    <div class="demo-image__preview">
                        <el-image style="width: 36px; height: 36px" :src="scope.row.user ? scope.row.user.avatar : moren" :preview-src-list="[(scope.row.user && scope.row.user.avatar) || moren]" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="昵称" min-width="90">
                <template slot-scope="{row}">
                    <div class="acea-row">                       
                        <div>{{ row.user && row.user.nickname ? row.user.nickname : '未知'}}</div>
                    </div>                   
                </template>
            </el-table-column>
          <el-table-column label="用户类型" min-width="100">
            <template slot-scope="{row}">
              <span v-if="row.user">{{ row.user.user_type == 'wechat' ? '公众号' : row.user.user_type == 'routine' ? '小程序' : row.user.user_type }}</span>
              <span v-else>未知</span>
            </template>
          </el-table-column>
          <el-table-column label="搜索词" prop="content" min-width="120" />
          <el-table-column label="搜索时间" prop="create_time" min-width="120" />
        </el-table>
        <div class="block">
            <el-pagination background :page-size="userFrom.limit" :current-page="userFrom.page" layout="total, prev, pager, next, jumper" :total="tableData.total" @size-change="handleSizeChange" @current-change="pageChange" />
        </div>
    </el-card>
</div>
</template>
<script>
// +----------------------------------------------------------------------
// | CRMEB [ CRMEB赋能开发者，助力企业发展 ]
// +----------------------------------------------------------------------
// | Copyright (c) 2016~2024 https://www.crmeb.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed CRMEB并不是自由软件，未经许可不能去掉CRMEB相关版权
// +----------------------------------------------------------------------
// | Author: CRMEB Team <admin@crmeb.com>
// +----------------------------------------------------------------------
import {userSearchLstApi} from '@/api/user'
import timeOptions from '@/utils/timeOptions';
export default {
    name: 'UserList',
    components: {},
    data() {
        return {
            pickerOptions: timeOptions,
            moren: require("@/assets/images/f.png"),
            timeVal: [],
            maxCols: 3,
            isShowSend: true,
            visible: false,
            user_type: '',
            tableData: {
                data: [],
                total: 0
            },
            listLoading: true,
            row: '',
            userFrom: {
                date: '',
                nickname: '',
                keyword: '',
                page: 1,
                limit: 20
            },
            grid: {
                xl: 8,
                lg: 12,
                md: 12,
                sm: 24,
                xs: 24
            },
            grid2: {
                xl: 18,
                lg: 16,
                md: 12,
                sm: 24,
                xs: 24
            },
            grid3: {
                xl: 8,
                lg: 12,
                md: 12,
                sm: 24,
                xs: 24
            },
        }
    },
    mounted() {
        this.getList('')
    },
    methods: {     
        /**重置 */
        searchReset(){
            this.timeVal = []
            this.userFrom.date = ""
            this.$refs.searchForm.resetFields()
            this.getList(1)
        },
        // 具体日期
        onchangeTime(e) {
            this.timeVal = e
            this.userFrom.page = 1
            this.userFrom.date = e ? this.timeVal.join('-') : ''
            this.getList('')
        },     
        // 列表
        getList(num) {
            this.listLoading = true
            this.userFrom.page = num ? num : this.userFrom.page;
            this.userFrom.user_type = this.user_type
            if (this.userFrom.user_type === '0') this.userFrom.user_type = ''
            userSearchLstApi(this.userFrom).then(res => {
                this.tableData.data = res.data.list
                this.tableData.total = res.data.count
                this.listLoading = false
            }).catch(res => {
                this.listLoading = false
                this.$message.error(res.message)
            })
        },        
        pageChange(page) {
            this.userFrom.page = page
            this.getList('')
        },
        handleSizeChange(val) {
            this.userFrom.limit = val
            this.getList('')
        },
        handleClick() {
            this.getList('')
        },

    }
}
</script>

<style lang="scss" scoped>

</style>
