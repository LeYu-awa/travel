<!-- 编辑直播的直播配置 -->
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
          <el-form-item label="直播时间：" prop="live_start_time">
            <el-date-picker
              v-model="formValidate.live_start_time"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="选择日期时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="开播提醒：" prop="is_remind">
            <el-radio-group v-model="formValidate.is_remind">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="直播时长：" prop="duration">
            <el-input-number v-model="formValidate.duration" size="small" class="selWidth" placeholder="请输入直播时长" style="width: 30%;"/>
            <span>分钟</span>
          </el-form-item>
          <el-form-item label="直播录制：" prop="is_transcribe">
            <el-radio-group v-model="formValidate.is_transcribe">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="直播排序：" prop="sort">
            <el-input-number v-model="formValidate.sort" size="small" class="selWidth" placeholder="请输入直播名称" style="width: 30%;"/>
            
          </el-form-item>
          <el-form-item label="虚拟在线人数：" prop="virtual_user">
            <el-input-number v-model="formValidate.virtual_user" size="small" class="selWidth" placeholder="请输入直播名称" style="width: 30%;"/>
          </el-form-item>
          <!-- <el-form-item label="有效期：" prop="name">
            <el-input-number v-model="formValidate.name" size="small" class="selWidth" placeholder="请输入直播名称" style="width: 30%;"/>
            <span>天</span>
            <span style="color: #999999;font-size: 12px;">有效期是购买后可以观看的时间，0即为不限时间</span>
          </el-form-item>
          <el-form-item label="仅会员可见" prop="describe">
            <el-radio-group v-model="formValidate.scope_type">
              <el-radio :label="0">是</el-radio>
              <el-radio :label="1">否</el-radio>
            </el-radio-group>
          </el-form-item> -->
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
        activity_name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
      formValidate: {
        live_start_time: '', //直播时间
        duration: '', //直播时长
        is_remind:'',//开播提醒
        is_transcribe: '',//直播录制
        sort:'', //直播排序
        virtual_user:'',//虚拟在线人数
      },
      value:''
    }
  },
  watch: {
    fromData: {
      handler(newValue) {
        if (newValue) {
          this.formValidate = { ...this.formValidate, ...newValue };
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods:{
    onvalidate() {
      
      let that = this
      return new Promise((resolve, reject) => {
        that.$refs.formValidate.validate((valid) => {
          if (valid) {
            // 表单验证通过，执行异步操作（例如发送数据到服务器）
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