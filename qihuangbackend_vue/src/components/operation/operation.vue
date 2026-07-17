<template>
  <div class="d-common-flex-row">
    <template v-for="item in operationArr">

      <span class="d-table-compon-operation d-common-flex-center"
        @click="onClick(item.name, row)">
        <!-- <el-tooltip effect="dark" placement="top" :content="item.label" :disabled="!showBubble"> -->
          <el-button class="btn-bottom" type="text"  :style="{ 'color': item.color }">
            {{ item.label }}</el-button>
        <!-- </el-tooltip> -->
      </span>
    </template>
  </div>
</template>
<script >
import dIcon from '@/components/dIcon.vue'
export default {
  components: {
    dIcon
  },
  props: {
    row: {
      type: Object,
      required: true
    },
    col: {
      type: Object,
      required: true
    },
    showBubble: {
      type: Boolean,
      default: true
    },
    //强制显示按钮
    forceShowButton: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tooltipVisible: false
    }
  },
  computed: {
    operationArr() {
      const row = this.row
      return row[this.col.prop]
    },
    showButtons() {
      return this.$store.commit('user/getUserCurrentBtnList')
    }
  },
  methods: {
    onClick(name, row) {
      this.$emit('opertionClick', name, row)
    },
  },
  deactivated() {
    for (const key in this.tooltipVisible) {
      this.tooltipVisible[key] = false
    }
  },

}

</script>
<style scoped>
.btn-bottom {
  margin: 3px 5px;
}
</style>