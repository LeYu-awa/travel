

<template>
  <svg aria-hidden="true"
    :style="{ fontSize: iconSize + 'px', width: iconSize + 'px', height: iconSize + 'px', color: color ? color : undefined }"
    fill="currentColor">
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script >
export default {
  props: {
    prefix: {
      type: String,
      default: 'icon'
    },
    name: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 15
    }
  },
  computed: {
    iconSize() {

      return this.size
    },
    symbolId() {
      return `#${this.prefix}-${this.name}`
    }
  }
}

</script>
<style scoped></style>