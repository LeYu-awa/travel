<template>
  <div class="d-footer__wapper d-common-flex-row d-comon-flex-justend">
    <el-pagination v-if="pageConfig" v-model:currentPage="pageConfig.currentPage" v-model:page-size="pageConfig.pageSize"
      :pager-count="5" :background="false" :disabled="showLoading" :layout="pageConfig.layout" :total="pageConfig.total"
      @size-change="onSizeChange" @current-change="onCurrentChange" />
  </div>
</template>
<script >
import dFooter from './dFooter'
export default {
  props: {
    pageConfig: {
      type: Object
    },
    showLoading: {
      type: Boolean,
      default: false
    }
  },
  mixins: [dFooter],
  data() {
    return {

    }
  },
  methods: {
    onSizeChange(val) {
      this.$emit('sizeChange', val)
    },
    onCurrentChange(val) {
      this.$emit('currentChange', val)
    }
  },
}
</script>
<style scoped>
.d-footer__wapper {
  --d-footer-padding: 40px;
  --d-footer-border-color: #f2f2f2;
  --d-footer-lineheight: 40px;
  align-items: center;
  padding-top: 8px;
  min-height: 40px;
}

.d-comon-flex-justend {
  display: flex;
  justify-content: flex-end;
}

.d-common-flex-row {
  display: flex;
  flex-direction: row;
}
</style>