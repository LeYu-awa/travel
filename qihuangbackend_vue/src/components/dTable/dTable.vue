<template>
  <div>
    <el-table
      ref="dTableRef"
      :key="tableRefKey"
      v-loading="showLoading"
      class="d-table-base"
      :data="tableData"
      :stripe="stripe"
      :empty-text="emptyText"
      :highlight-current-row="highlightCurrentRow"
      :border="border"
      :header-row-style="headerRowStyle"
      :row-style="getRowStyle"
      :default-sort="defaultSort"
      :row-key="treeConfig ? treeConfig.rowKey : undefined"
      :default-expand-all="treeConfig ? treeConfig.defaultExpandAll : undefined"
      :lazy="treeConfig ? treeConfig.lazy : undefined"
      :load="treeConfig ? treeConfig.load : undefined"
      :tree-props="treeConfig ? treeConfig.treeProps : undefined"
      :span-method="spanMethod"
      @sort-change="onSortChange"
      @cell-click="onCellClick"
      @current-change="onRowClick"
      @selection-change="onMultipleSelection"
    >
      <el-table-column
        v-if="showSelection"
        type="selection"
        :width="50"
        :selectable="selectable"
        :fixed="true"
      />
      <el-table-column
        v-if="showIndex"
        type="index"
        width="65"
        :index="getItemIndex"
        :fixed="true"
        label="序号"
      />
      <el-table-column
        v-for="item in tableHeaderData"
        :key="item.prop"
        :show-overflow-tooltip="item.columnType === 'text'"
        :fixed="item.fixed"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :sortable="item.sortable"
        :align="item.align"
        :min-width="item['min-width']"
        :header-align="item['header-align']"
      >
        <template v-if="item.headerSolt" #header>
          <slot :name="item.headerSolt" :item="item" />
        </template>
        <template #default="scope">
          <span v-if="item.columnType === 'slot'">
            <slot :name="item.prop" :index="scope.$index" :row="scope.row" :item="item" />
          </span>
          <span v-else-if="item.columnType === 'text'" class="d-table-col-text">
            {{ scope.row[item.prop] }}
          </span>
          <el-switch
            v-else-if="item.columnType === 'switch'"
            v-model="scope.row[item.prop]"
            :active-value="1"
            :inactive-value="0"
            :active-text="item.activeText || '显示'"
            :inactive-text="item.inactiveText || '隐藏'"
            @change="onchangeIsShow(scope.row)"
            :disabled="item.disabled"
          />
          <el-image
            v-else-if="item.columnType === 'image'"
            style="width: 36px; height: 36px"
            :src="scope.row[item.prop]"
            :preview-src-list="[scope.row[item.prop]]"
          />
        </template>
      </el-table-column>
      <template #append>
        <slot name="append" />
      </template>
    </el-table>
  </div>
</template>
<script>
import dTable from "./dTable";
export default {
  mixins: [dTable],
  computed: {
    //表头行内联样式
    headerRowStyle() {
      const style = {};
      style.fontSize = 10 + "px";
      style.height = this.tableHeadHeight + "px";
      return style;
    }
    //起始index
    // baseIndex() {
    //   return (this.pageSize * (this.currentPage - 1))
    // },
  },
  watch: {
    //监听默认多选和单选
    defaultMultipleSelection: function(newVal, oldVal) {
      this.setMultipleSelection(newVal);
    },
    defaultSeleted: function(newVal, oldVal) {
      this.setSeleted(newVal);
    }
  },
  data() {
    return {};
  },
  beforeMount() {
    // this.$nextTick().then(() => {
    //   this.setMultipleSelection(this.defaultMultipleSelection)
    //   this.setSeleted(this.defaultSeleted)
    // })
  },
  methods: {
    //表头行内联样式
    getRowStyle(obj) {
      const style = this.rowStyle(obj);
      style.height = this.tableRowHeight + "px";
      return style;
    },
    // 获取索引
    getItemIndex(index) {
      // return this.baseIndex + index + 1
    },
    onchangeIsShow(e) {
      this.$emit("switchChange", e);
    },
    // 获取项目索引 没有
    getRowIndex(row) {
      if (!this.tableData) return undefined;
      const key = this.rowKey;
      for (let i = 0, l = this.tableData.length; i < l; i++) {
        const item = this.tableData[i];
        if (item[key] === row[key]) {
          return i;
        }
      }
      return undefined;
    },
    //设置多选
    setMultipleSelection(rows) {
      const dTable = this.$refs.dTableRef;
      if (dTable) {
        if (rows.length) {
          rows.forEach(row => {
            dTable.toggleRowSelection(row, true);
          });
        } else {
          dTable.clearSelection();
        }
      }
    },
    //设置单选
    setSeleted(row) {
      const dTable = this.$refs.dTableRef;
      if (dTable) {
        dTable.setCurrentRow(row);
      }
    },
    //排序改变
    onSortChange(sort) {
      this.$emit("sortChange", { prop: sort.prop, order: sort.order });
    },
    //选中单元格
    onCellClick(row, col) {
      this.$emit("cellClick", row, col);
    },
    //选中
    onRowClick(row) {
      this.$emit("rowClick", row);
    },
    //多选
    onMultipleSelection(rows) {
      this.$emit("multipleSelection", rows);
    },
    getAlign(type) {
      if (type === "center") {
        return { "d-input-text-center": true };
      } else if (type === "left") {
        return { "d-input-text-left": true };
      } else if (type === "right") {
        return { "d-input-text-right": true };
      } else {
        return { "d-input-text-left": true };
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/form.scss";
</style>
