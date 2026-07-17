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
// import { addProjectInfo, getTemplateField, updateProjectInfo, getProjectInfoById, svnTest, databaseList, employdataList, userinfoList } from '@/api/projectManage'
// import { getField } from '@/api/configManage'
import dFrom from '@/components/dFrom/dFrom.vue'
import { getLiveDetails, editLive } from '@/api/liveStreamingManage'
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
        projectName: [
          { required: true, message: '请输入项目名', trigger: 'blur' }
        ],
        projectUrl: [
          { required: false, message: '请输入项目地址', trigger: 'blur' }
        ],
        affiliation: [
          { required: true, message: '请输入所属分公司', trigger: 'blur' }
        ],
        codeUrl: [
          { required: false, message: '请输入svn', trigger: 'blur' }
        ],
        template: [
          { required: false, message: '请选择', trigger: 'blur' }
        ],
        // isUser: [
        //   { required: true, message: '请选择', trigger: 'blur' }
        // ],
        isEmploy: [
          { required: true, message: '请选择', trigger: 'blur' }
        ],
        collectedId: [
          { required: false, message: '请选择', trigger: 'blur' }
        ],
        headId: [
          { required: true, message: '请选择', trigger: 'blur' }
        ]
      },
      resetFieldsFlag: false,
      validateFlag: false,
      fromItems: [
        {
          label: '直播间号',
          prop: 'live_code',
          placeholder: '',
          type: 'text',
          disabled:true
        },
        {
          label: '直播间标题',
          prop: 'title',
          placeholder: '请输入直播间标题',
          type: 'input'
        },
        {
          label: '直播封面',
          prop: 'room_image',
          placeholder: '',
          type: 'image'
        },

        {
          label: '直播简介',
          prop: 'assistant_title',
          placeholder: '请输入',
          type: 'textarea',
        },
        {
          label: '虚拟在线人数',
          prop: 'virtual_user',
          placeholder: '请输入',
          type: 'inputNumber',
        },
        {
          label: '排序',
          prop: 'sort',
          placeholder: '请输入',
          type: 'inputNumber',
        },
        {
          label: '开播提醒',
          prop: 'is_remind',
          placeholder: '请选择',
          type: 'radio',
          seleteData: [{ value: 0, label: '否' }, { value: 1, label: '是' }]
        },
        {
          label: '开播前提醒时间(分)',
          prop: 'productIds',
          placeholder: '请输入',
          type: 'inputNumber',
        },
        {
          label: '自动录制',
          prop: 'is_transcribe',
          placeholder: '请选择',
          type: 'radio',
          seleteData: [{ value: 0, label: '否' }, { value: 1, label: '是' }]
        },
        {
          label: '直播回放',
          prop: 'isUser',
          placeholder: '请选择',
          type: 'radio',
          seleteData: [{ value: 0, label: '否' }, { value: 1, label: '是' }]
        },
        // {
        //   label: '直播间聊天',
        //   prop: 'isUser',
        //   placeholder: '请选择',
        //   type: 'radio',
        //   seleteData: [{ value: 0, label: '否' }, { value: 1, label: '是' }]
        // },
        // {
        //   label: '直播间课堂',
        //   prop: 'isUser',
        //   placeholder: '请选择',
        //   type: 'radio',
        //   seleteData: [{ value: 0, label: '否' }, { value: 1, label: '是' }]
        // },
        {
          label: '直播间推荐',
          prop: 'is_recommend',
          placeholder: '请选择',
          type: 'radio',
          seleteData: [{ value: 0, label: '否' }, { value: 1, label: '是' }]
        },
        {
          label: '直播间排行',
          prop: 'isUser',
          placeholder: '请选择',
          type: 'radio',
          seleteData: [{ value: 0, label: '否' }, { value: 1, label: '是' }]
        },
      ],
      projectInfo: {
        title: '',
        room_image: '',
        assistant_title: '',
        virtual_user: '',
        sort: '',
        is_remind: '',
        productIds: '',
        is_transcribe: '',
        isUser: '',
        is_recommend: ''
      },
      activity:[],
      goods:[]
    }
  },
  mounted() {
    this.getLiveDetails()
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
      console.log(this.$props.fromData)
      getLiveDetails({ room_id: this.$props.fromData.id }).then(res => {
        console.log(res)
        this.projectInfo = res.data.info;
        this.activity = res.data.activity;
        this.goods = res.data.goods;
      })
    },
    IfupdateProjectInfo() {
      let str = {
        info:this.projectInfo,
        activity: this.activity,
        goods:this.goods,
        room_id:this.$props.fromData.id
      }
      editLive(str).then(res => {
        if (res.status == 200) {
          this.$message.success('修改成功');
          // this.$router.go(-1);
          this.$emit('confirm')
        } else {
          this.$message.error(res.message);
        }
      })
    },
  }
}
</script>
<style scoped lang="less"></style>
