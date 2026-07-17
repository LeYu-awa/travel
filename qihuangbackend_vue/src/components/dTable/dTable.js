export default {
  props: {
    //表格唯一标识
    tableKey: {
      type: String,
      default: ''
    },
    //表格组件绑定的key
    tableRefKey: {
      type: String,
      default: ''
    },
    rowStyle: {
      type: Function,
      default: () => {
        return {}
      }
    },
    //数据
    tableData: {
      type: Array,
      required: true
    },
    //显示加载状态
    showLoading: {
      type: Boolean,
      default: false
    },
    //显示多选
    showSelection: {
      type: Boolean,
      default: false
    },
    //显示序号
    showIndex: {
      type: Boolean,
      default: false
    },
    //斑马纹
    stripe: {
      type: Boolean,
      default: false
    },
    //当前大小
    pageSize: {
      type: Number,
      default: 10
    },
    //当前页
    currentPage: {
      type: Number,
      default: 1
    },
    //空数据缺省文字
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    //高亮选中
    highlightCurrentRow: {
      type: Boolean,
      default: true
    },
    //显示列边框
    border: {
      type: Boolean,
      default: true
    },
    //表头行高度
    tableHeadHeight: {
      type: Number,
      default: 40
    },
    //表格行高度
    tableRowHeight: {
      type: Number,
      default: 40
    },
    //表格数据配置
    tableHeaderData: {
      type: Array,
      required: true
    },
    //默认排序
    defaultSort: {
      type: Object,
      default: () => undefined
    },
    //默认选中的项(多选)
    defaultMultipleSelection: {
      type: Array,
      default: () => []
    },
    //默认选中的项(单选)
    defaultSeleted: {
      type: Object,
      default: () => undefined
    },
    //树形配置
    treeConfig: {
      type: Object
    },
    //合并单元格函数
    spanMethod: {
      type: Function
    },
    //找到某条数据 滚动到该位置(垂直)
    scrollItem: {
      type: Object
    },
    //行唯一的标识字段
    rowKey: {
      type: String,
      default: 'id'
    },
    //滚动到具体位置(垂直)
    scrollTop: {
      type: Number
    },
    //列是否可勾选函数
    selectable: {
      type: Function
    }
  },
}