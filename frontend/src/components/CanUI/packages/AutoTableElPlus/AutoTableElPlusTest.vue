<script setup lang="ts">
import {ref} from 'vue'
import AutoTableElPlus from './index.vue'
import {AutoTableColumn} from './types'

const tableData = ref<any[]>([
  {id: 1, name: 'test 1', name2: 'test 21'},
  {id: 2, name: 'test 2', name2: 'test 22'},
  {id: 3, name: 'test 3', name2: 'test 23'},
  {id: 4, name: 'test 4', name2: 'test 24'},
])
const tableColumns: AutoTableColumn[] = [
  {
    label: 'selection',
    type: 'selection',
    width: 50,
    fixed: 'left',
    props: {
      // 当 type: 'selection' 时，传入此值可以在切换分页后保持选中
      reserveSelection: true,
    },
  },
  {
    key: 'id',
    label: 'ID',
    width: 80,
  },
  {
    key: 'name',
    label: 'name',
    width: 300,
    render: (scope) => {
      return h('div', {style: {color: 'red'}}, scope.row.name)
    },
  },
  {
    key: 'name2',
    label: 'name2',
    formatter: (scope) => {
      return `!! ${scope.row.name2} !!`
    },
  },
]

const autoTableRef = ref()
const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any[]) => {
  multipleSelection.value = val
}
const clearSelect = () => {
  // 清空多选
  multipleSelection.value = []
  console.log(autoTableRef.value)
  if (autoTableRef.value) {
    autoTableRef.value.tableRef.clearSelection()
  }
}
</script>

<template>
  <el-space>
    <el-button @click="clearSelect" :disabled="!multipleSelection.length">清空多选</el-button>
  </el-space>
  <AutoTableElPlus
    ref="autoTableRef"
    :data="tableData"
    :columns="tableColumns"
    @selectionChange="handleSelectionChange"
    :row-key="(row) => row.id"
  />
  <pre>{{ multipleSelection }}</pre>
</template>
