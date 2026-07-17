export default {
  props: {
    display: {
      type: String,
      default: 'flex',
    }, //触发表单验证
    validateFlag: {
      type: Boolean,
      required: true,
    },
    //触发清除表单
    resetFieldsFlag: {
      type: Boolean,
      required: true,
    },
    //表单验证
    rules: {
      type: Object,
      default: () => {
        return {}
      },
    },
    //表单数据
    formDatas: {
      type: Object,
      default: () => {
        return {}
      },
    },
    //表单项列表
    formItems: {
      type: Array,
      default: () => [],
    },
    //每行显示几个表单项
    formLineNum: {
      type: Number,
      default: 2,
    },
    //标签长度
    labelWidth: {
      type: String,
      default: '80px',
    },
    //标签位置
    labelPosition: {
      type: String,
      default: 'right',
    },
    //列间距
    colGap: {
      type: Number,
      default: 36,
    },
    //行间距
    rowGap: {
      type: Number,
      default: 10,
    },
    //提交前清除空数据
    clearEmpty: {
      type: Boolean,
      default: true,
    }
  }
}