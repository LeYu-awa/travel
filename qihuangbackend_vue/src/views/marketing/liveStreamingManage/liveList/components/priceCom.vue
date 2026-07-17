<!-- 编辑直播的价格设置 -->
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
          <el-form-item label="付费方式：" prop="can_see">
            <el-radio-group v-model="formValidate.can_see">
              <!-- <el-radio :label="1">付费</el-radio>
              <el-radio :label="2">免费</el-radio>
              <el-radio :label="3">加密</el-radio> -->
              <el-radio :label="1">免费</el-radio>
              <el-radio :label="2">会员</el-radio>
              <el-radio :label="3">付费</el-radio>
              <el-radio :label="4">加密</el-radio>
            </el-radio-group>
          </el-form-item>
          <div v-if="formValidate.can_see==3">
            <el-form-item label="购买金额：" prop="see_money">
              <el-input-number v-model="formValidate.see_money" size="small" class="selWidth" placeholder="请输入金额" style="width: 30%;"/>
            </el-form-item>
            <!-- <el-form-item label="会员付费方式：" prop="describe">
            <el-radio-group v-model="formValidate.state">
              <el-radio :label="0">付费</el-radio>
              <el-radio :label="1">免费</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="单独分销：" prop="describe">
            <el-radio-group v-model="formValidate.state">
              <el-radio :label="0">开启</el-radio>
              <el-radio :label="1">关闭</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="拼团状态：" prop="describe">
            <el-radio-group v-model="formValidate.state">
              <el-radio :label="0">开启</el-radio>
              <el-radio :label="1">关闭</el-radio>
            </el-radio-group>
          </el-form-item> -->
          </div>
          <div v-if="formValidate.can_see==4">
            <el-form-item label="设置密码：" prop="live_pwd">
              <el-input placeholder="请输入密码" v-model="formValidate.live_pwd" show-password style="width: 30%;"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：" prop="value">
              <el-input placeholder="请输入密码" v-model="formValidate.value" show-password style="width: 30%;"></el-input>
            </el-form-item>
          </div>
      </el-form>
      
  </div>
</template>
<script>
export default {
  props: {
    fromData: {
      type: Object,
      required: true
    }
  },
  
  name: 'basicSet',
  data() {
    return {
      Loading: false,
      ruleValidate: {
        can_see: [{ required: true, message: '请选择方式', trigger: 'blur' }],
        see_money: [{ required: true, message: '请输入金额', trigger: 'blur' }],
        live_pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        value: [{ required: true, message: '请输入确认密码', trigger: 'blur' }],
      },
      formValidate: {
        can_see:null, //付费方式：1免费 2会员 3加密
        see_money: null, //购买金额
        live_pwd:''//设置密码
      },
      value:'' //确认密码
    }
  },
  watch: {
    fromData(newValue) {
      if (newValue.live_pwd) {
        newValue.can_see = 4
      }
      console.log(newValue);
      this.formValidate = { ...newValue }; // 浅拷贝fromData的值到formValidate
    }
  },
  methods:{
    onvalidate() {
      
      let that = this
      return new Promise((resolve, reject) => {
        that.$refs.formValidate.validate((valid) => {
          if (valid) {
            // 表单验证通过，执行异步操作（例如发送数据到服务器）
            that.formValidate.can_see = that.formValidate.can_see == 4?1:that.formValidate.can_see
            resolve(that.formValidate); // 解析 Promise，并返回成功信息
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