<!-- 编辑直播的直播带货 -->
<template>
  <div>
    <el-form
        ref="formValidate"
        v-loading="Loading"
        class="formValidate mt20"
        :rules="ruleValidate"
        :model="formValidate"
        label-width="120px"
        size="small"
        @submit.native.prevent
      >
          <el-form-item label="商品推荐">
            <el-button type="primary"  @click="addGoods">选择商品</el-button>
          </el-form-item>
          <el-form-item label="商品展示" >
            <dTable :table-data="tableData" :table-header-data="tableHeaderData">
              <template #operation="scope">
                <operation :row="scope.row" :col="scope.item" @opertionClick="onErtion" />
              </template>
              <template #image="scope">
                <el-image 
                  style="width: 60px; height: 60px"
                  :src="scope.row.image" 
                  :preview-src-list="[scope.row.image]">
                </el-image>
              </template>
            </dTable>
          </el-form-item>
          <el-form-item label="活动推荐" >
            <el-button type="primary" @click="onselectActivity">选择活动</el-button>
          </el-form-item>
          <!-- <el-form-item label="添加活动" prop="name">
            <el-button type="primary" >添加活动</el-button>
          </el-form-item> -->
          <el-form-item label="活动展示" >
            <dTable :table-data="activitytableData" :table-header-data="activitytableHeaderData">
              <template #operation="scope">
                <operation :row="scope.row" :col="scope.item" @opertionClick="onactivityErtion" />
              </template>
              <!-- <template #status="scope">
                <el-switch
                  v-model="scope.row.status"
                  :active-value="1"
                  :inactive-value="0"
                  active-text="上架"
                  inactive-text="下架"
                  @click.native="onchangeIsShow(scope.row)"
                />
              </template> -->
              <template #image="scope">
                <el-image 
                  style="width: 60px; height: 60px"
                  :src="scope.row.pic" 
                  :preview-src-list="[scope.row.pic]">
                </el-image>
              </template>
            </dTable>
          </el-form-item>
      </el-form>
      <selectActivity
      v-if="selectActivityShow"
      :dialog-visible="selectActivityShow"
      :from-data="fromData"
      @cancel="selectActivityShow=false"
      @onConfirm="onConfirm"
      @close="selectActivityShow=false"
      ></selectActivity>
      <goodsList ref="goodsList" @ongoodlists="selectList" />
  </div>
</template>
<script>
import dTable from '@/components/dTable/dTable.vue'
import operation from '@/components/operation/operation.vue'
import goodsList from '../../../atmosphere/atmosphereList/goodsList.vue';
import selectActivity from './selectActivity.vue'
export default {
  props: {
    activityList: {
      type: Array,
      required: true
    },
    goodsList: {
      type: Array,
      required: true
    }
  },
  components: {
    dTable,
    operation,
    goodsList,
    selectActivity
  },
  name: 'basicSet',
  data() {
    return {
      selectActivityShow: false,// 选择活动弹窗
      fromData:{},//
      Loading: false,
      ruleValidate: {
        activity_name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
      formValidate: {
        name: '',
        calss: '',
        describe: '',
        reply: '',
        label:[],
        agree:'',
        cover: '',
        banner: '',
        poster: '',
        service:'',
        agree:''
      },
      tableData: [],
      tableHeaderData: [
        { prop: 'product_id', label: '编号', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'image', label: '封面', columnType: 'slot', align: 'left', 'min-width': '60' },
        { prop: 'store_name', label: '商品名称', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'price', label: '售价', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'sales', label: '销量', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'sort', label: '排序', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '120', fixed: 'right' }
      ],
      operationData: [
        { name: 'edit', label: '编辑', icon: 'edit', type: 'primary' },
        { name: 'delete', label: '删除', icon: 'edit', type: 'primary' },
      ],
      activitytableData:[],
      activitytableHeaderData: [
        { prop: 'activity_id', label: '编号', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'activity_name', label: '活动名称', columnType: 'text', align: 'left', 'min-width': '80' },
        { prop: 'image', label: '封面', columnType: 'slot', align: 'left', 'min-width': '60' },
        { prop: 'operation', label: '操作', columnType: 'slot', 'width': '80', fixed: 'right' }
      ],
      activityOperationData:[
        { name: 'delete', label: '删除', icon: 'edit', type: 'primary' },
      ],
    }
  },
  mounted() {
    
  },
  watch: {
    activityList(newValue) {
      newValue.map(item => { 
        item.operation = this.activityOperationData
      })
      this.activitytableData = newValue; // 浅拷贝fromData的值到formValidate
    },
    goodsList(newValue) {
      newValue.map(item => { 
        item.operation = this.operationData
      })
      this.tableData = newValue; // 浅拷贝fromData的值到formValidate
    }
  },
  methods: {
    addGoods() {
      this.$refs.goodsList.dialogVisible = true;
    },
    //选择完商品确定方法
    selectList(datalist) {
      // this.listLoading = true;
      datalist.map(item => {
        item.operation = this.operationData
        item.sales = 0
        item.sort = 0
      })
      this.tableData = datalist
      // if (this.tableFrom.spu_ids.length) {
      //   //如果spu_ids有长度，就push商品id，并且去重以后重新请求列表
      //   this.tableFrom.spu_ids.push(...spu_ids);
      //   this.tableFrom.spu_ids = [...new Set(this.tableFrom.spu_ids)];
      // } else {
      //   this.$set(this.tableFrom, 'spu_ids', spu_ids);
      // }
      // this.getList('');
    },
    onConfirm(data) {
      console.log('onConfirm', data)
      data.map(item => {
        item.operation = this.activityOperationData
      })
      this.activitytableData = data
      this.selectActivityShow = false;
    },
    // 选择活动点击按钮
    onselectActivity() {
      console.log(123456)
      this.selectActivityShow = true;
    },
    onErtion() {
      
    },
    onactivityErtion(name, row) {
      switch (name) { 
        case 'delete':
           this.$confirm('是否删除此数据?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.activitytableData = this.activitytableData.filter(item => item.id !== row.id);
            })
          break
      }
    },
    onvalidate() {
      let that = this
      return new Promise((resolve, reject) => {
        let goods = []
        let activity = []
        if (this.tableData.length > 0) {
          
          this.tableData.map(item => {
            let str = {
                goods_id: item.product_id,//商品id
                is_show: 1,//是否显示
                sort: item.sort,// 排序
                sales: item.sales,//销量
                fake_sales: '', //虚假销量
            }
            goods.push(str)
          })
        }
        if (this.activitytableData.length > 0) {
          
          this.activitytableData.map(item => {
            let str = {
                activity_id: item.activity_id,//活动id
                sort: 0,// 排序
            }
            activity.push(str)
          })
        }
        that.$refs.formValidate.validate((valid) => {
          if (valid) {
            console.log(123456)
            let strdata = {
              goods: goods,
              activity: activity,
            }
            // 表单验证通过，执行异步操作（例如发送数据到服务器）
            resolve(strdata); // 解析 Promise，并返回成功信息
          } else {
            console.log('error submit!!');
            reject('表单验证失败'); // 拒绝 Promise，并返回失败信息
          }
        });
      });
    }
  }
}
</script>
<style scoped lang="scss">
.label-div{
  display: flex;
  align-items: center;
  .label-div-input{
    width: 30%;
    margin-right: 5px;
  }
  span{
    color: #999999;
    margin-left: 10px;
  }
}
.label-item{
  display: flex;
  align-items: center;
  margin-top: 5px;
}
</style>