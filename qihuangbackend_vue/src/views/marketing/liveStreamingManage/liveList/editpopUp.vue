<template>
  <div class="divBox">
    <el-card class="box-card mb20">
      <el-tabs v-if="tabList.length > 0" v-model="currentTab">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :name="item.value" :label="item.title" />
      </el-tabs>
      <!-- 基本设置 -->
      <basicSet v-show="currentTab == '1'" ref="refbasicSet" :fromData="datainfo.info"></basicSet>
      <!-- 直播带货 -->
      <commerce
       v-show="currentTab == '2'" 
       ref="refcommerce" 
       :activityList="datainfo.activity"
       :goodsList="datainfo.goods" 
       ></commerce>
      <!-- 直播配置  -->
      <configuration v-show="currentTab == '3'" ref="refconfiguration" :fromData="datainfo.info"></configuration>
      <!-- 价格设置 -->
      <priceCom v-show="currentTab == '4'" ref="refpriceCom" :fromData="datainfo.info"></priceCom>
    </el-card>
    <el-card class="fixed-card">
      <el-button >取 消</el-button>
      <!-- @click="currentTab = currentTab-1" -->
      <el-button v-show="currentTab !== '1'" size="small" >上一步</el-button>
      <!-- @click="currentTab = currentTab+1" -->
      <el-button v-show="currentTab !== '4'" size="small" type="primary" @click="onNext">下一步</el-button>
      <el-button v-show="currentTab == '4'" size="small" type="primary" @click="submitForm('formValidate')"
        >保存</el-button>
    </el-card>
  </div>
</template>

<script>
import basicSet from './components/basicSet.vue'
import commerce from './components/commerce.vue'
import configuration from './components/configuration.vue'
import priceCom from './components/priceCom.vue'
import { addLive, getLiveDetails, editLive } from '@/api/liveStreamingManage'
export default {
  name: 'addBorder',
  components: {
    basicSet,
    commerce,
    priceCom,
    configuration
  },
  data() {
    return {
      currentTab: '1',
      tabList: [
        { value: '1', title: '基本设置' },
        { value: '2', title: '直播带货' },
        { value: '3', title: '直播配置' },
        { value: '4', title: '价格设置' },
      ],
      datainfo: {
        info:{},
        activity:[],
        goods:[]
      },
      id:''
    };
  },
  
  computed: {
    isEdit() { //判断是否编辑
      return this.$route.query.id ? true : false;
    }
  },
  mounted() {
    if (this.isEdit) {
      this.id = this.$route.query.id;
      this.getLiveDetails()
    }
  },
  methods: {
    getLiveDetails() {
      getLiveDetails({ room_id: this.id }).then(res => {
        if (res.data.info.label) {
          res.data.info.label = res.data.info.label.split(',')
        } else {
          res.data.info.label = []
        }
        this.datainfo = res.data;
        if (res.data.goods&&res.data.goods.length>0) {
          res.data.goods.map(item => {
            return item.product_id = item.goods_id
          });
        }
      })
    },
    previousStep() {
      
    },
    // 下一步
    onNext() {
      switch (this.currentTab) {
        case '1':
          this.$refs.refbasicSet.onvalidate().then(res => {
            console.log(res)
            this.datainfo.info = { ...this.datainfo.info, ...res };
            this.currentTab = '2';
          });
          
          break;
        case '2':
          this.$refs.refcommerce.onvalidate().then(res => {
            console.log(res)
            this.datainfo = { ...this.datainfo, ...res };
            this.currentTab = '3';
            console.log(this.datainfo)
          });
          break;
        case '3':
        this.$refs.refconfiguration.onvalidate().then(res => {
            console.log(res)
            this.datainfo.info = { ...this.datainfo.info, ...res };
            this.currentTab = '4';
          });
          break;
      }
    },
    submitForm() {
      this.$refs.refpriceCom.onvalidate().then(res => {
          console.log(res)
          this.datainfo.info = { ...this.datainfo.info, ...res };
        
          if (this.isEdit) { 
            this.editLive()
          } else {
            this.addLive()
          }
        });
    },
    addLive(){
      addLive(this.datainfo).then(res => {
        if (res.status == 200) {
          this.$message.success('新增成功');
          this.$router.go(-1);
        } else {
          this.$message.error(res.message);
        }
      })
    },
    editLive() {
      this.datainfo.room_id = this.id
      if (this.datainfo.info.label) {
        this.datainfo.info.label = this.datainfo.info.label.join(',')
      }
      editLive(this.datainfo).then(res => {
        if (res.status == 200) {
          this.$message.success('修改成功');
          this.$router.go(-1);
        } else {
          this.$message.error(res.message);
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.desc {
  color: #999;
  font-size: 12px;
  line-height: 16px;
  margin: 0;
}
::v-deep .el-input__suffix {
  right: 10px;
  line-height: 32px;
}
.fixed-card {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  box-shadow: 0 -1px 2px rgb(240, 240, 240);
  text-align: center;
}
</style>
