

<template>
  <div>
    <svg-icon v-if="iconConfig.type === 'custom'" class="d-common-hover d-common-svg" :name="iconConfig.icon"
      :color="iconConfig.color" :size="iconConfig.size" />
    <i v-else-if="iconConfig.type === 'el'" :class="'el-icon-' + iconConfig.icon" class="d-common-hover d-common-svg"
      :style="{ 'color': iconConfig.color, 'font-size': iconConfig.size }"></i>
  </div>
</template>
<script>
import { PropType } from 'vue'
import svgIcon from '@/components/SvgIconT/index.vue'
export default {
  components: {
    svgIcon
  },
  props: {
    iconConfig: {
      type: Object,
      required: true
    }
  }
}
</script>
<style scoped>
.d-common-hover:hover {
  cursor: pointer;
}
</style>