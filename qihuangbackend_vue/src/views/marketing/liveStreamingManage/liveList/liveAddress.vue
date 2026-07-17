<template>
  <div>
    <el-dialog title="" :visible.sync="dialogVisible" width="68%" @close="close">
      <div class="pop">
        <div class="title">直播推流地址</div>
        <div class="list">
          <div class="list-text">服务器</div>
          <el-tooltip class="item" effect="dark" :content="href" placement="top">
            <div  class="list-input">{{href}}</div>
          </el-tooltip>

          <div class="list-btn"><el-button type="primary" @click="oncopy(href)">复制</el-button></div>
        </div>
        <div class="list">
          <div class="list-text">串流密钥</div>
          <el-tooltip class="item" effect="dark" :content="code" placement="top">
            <div  class="list-input">{{code}}</div>
          </el-tooltip>
          <div class="list-btn"><el-button type="primary" @click="oncopy(code)">复制</el-button></div>
        </div>
        <!-- <div class="list"></div> -->
        <!-- <div class="tips" @click="onopen">OBS推流工具的使用方法</div> -->
      </div>
  </el-dialog>
  </div>
</template>

<script>

import { goLive } from '@/api/liveStreamingManage'
export default {
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
      code: '',
      href:''
    }
  },
  mounted() {
    this.goLive()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    oncopy(data){
      const text = data;
			const textarea = document.createElement('textarea');
			textarea.value = text;
			document.body.appendChild(textarea);
			textarea.select();
			document.execCommand('Copy');
			document.body.removeChild(textarea);
			this.$message({
          message: '复制成功',
          type: 'success'
        });
    },
    onopen() {
      window.open('https://doc.qihuang.com/zsff/crmeb_zsff/863')
    },
    goLive(){
      goLive({room_id:this.fromData.id}).then(res=>{
        console.log(res)
        this.href = res.data.href
        this.code = res.data.code
      })
    }
  }
}
</script>
<style scoped lang="scss">
.pop{
  min-width: 600px;
}
.title{
  text-align: center;
  font-size: 24px;
  line-height: 35px;

}
.list{
  display: flex;
  margin-top: 20px;
  .list-text{
    width: 80px;
    height: 38px;
    line-height: 38px;
    font-size: 15px;
    color: #0092DC;
  }
  .list-input{
    color: #333333;
    padding:0 10px;
    display: inline-block;
    width: 80%;
    background-color: #eeeeee;
    border-radius: 10px;
    margin:0 10px;
    height: 38px;
    line-height: 38px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
  }
  .list-btn{
    // width: 64px;
    // height: 38px;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    // color: #ffffff;
    // font-size: 15px;
    // background: #0092DC;
    // border-radius: 8px;
    margin-left: auto;
  }
}
.tips{
  color: #0092DC;
  font-size: 14px;
  margin-top: 20px;
  cursor:pointer;
}
</style>
