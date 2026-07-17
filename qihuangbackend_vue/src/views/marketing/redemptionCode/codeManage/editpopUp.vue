<template>
  <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%" @close="close">
    <d-from
      :reset-fields-flag="resetFieldsFlag"
      :validate-flag="validateFlag"
      label-position="right"
      label-width="130px"
      :rules="rules"
      :form-datas="projectInfo"
      display="grid"
      :form-items="fromItems"
      :form-line-num="1"
      @submit="onSubmitForm"
    >
    </d-from>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dFrom from '@/components/dFrom/dFrom.vue'
import { getLiveList} from '@/api/liveStreamingManage'
import { addCodeActivity} from '@/api/redemptionCode'
addCodeActivity
export default {
  components: {
    dFrom
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
  data() {
    return {
      rules: {
        room_id: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入项目名', trigger: 'blur' }
        ],
        num: [
          { required: false, message: '请输入制卡数量', trigger: 'blur' }
        ],
        is_activation: [
          { required: true, message: '请选择是否激活', trigger: 'blur' }
        ],
      },
      resetFieldsFlag: false,
      validateFlag: false,
      fromItems: [

        {   
          label: '选择直播',
          prop: 'room_id',
          placeholder: '',
          type: 'selete',
          seleteData:[]
        },
        {
          label: '名称',
          prop: 'name',
          placeholder: '',
          type: 'input'
        },
        
        {
          label: '制卡数量',
          prop: 'num',
          placeholder: '请输入',
          type: 'inputNumber',
        },
        {
          label: '是否激活',
          prop: 'is_activation',
          placeholder: '请选择',
          type: 'radio',
          seleteData: [{ value: 0, label: '否' }, { value: 1, label: '是' }]
        },
        {
          label: '备注',
          prop: 'remark',
          placeholder: '请输入',
          type: 'textarea',
        }
        
      ],
      projectInfo: {
        room_id:'',
        num: '', //生成数量
        is_activation: '', //是否激活
        remark: '',//备注
      },
      activity:[],
      goods:[],
      liveList:[]
    }
  },
  mounted() {
    this.getLiveList()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    onSubmitForm() {
      console.log('表单验证')
      this.IfupdateProjectInfo()
    },
    cancel() {
      this.$emit('cancel')
      this.resetFieldsFlag = !this.resetFieldsFlag
    },
    confirm() {
      this.validateFlag = !this.validateFlag
    },
    getLiveDetails() {
      // console.log(this.$props.fromData)
      // getLiveDetails({ room_id: this.$props.fromData.id }).then(res => {
      //   console.log(res)
      //   this.projectInfo = res.data.info;
      //   this.activity = res.data.activity;
      //   this.goods = res.data.goods;
      // })
    },
    IfupdateProjectInfo() {
      addCodeActivity(this.projectInfo).then(res => {
        if (res.status == 200) {
          this.$message.success('添加成功');
          this.$emit('confirm')
        } else {
          this.$message.error(res.message);
        }
      })
    },
    getLiveList(){
      getLiveList({page: 1, limit: 999}).then(res => {
        res.data.data.map(item=>{
          item.value = item.id
          item.label = item.title
        })
        this.fromItems[0].seleteData = res.data.data
      })
    }
  }
}
</script>
<style scoped lang="less"></style>
