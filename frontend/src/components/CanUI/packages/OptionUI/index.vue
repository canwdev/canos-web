<script lang="ts">
export default {
  name: 'OptionUI',
}
</script>
<script lang="ts" setup>
import {defineComponent, PropType, toRefs} from 'vue'
import OptionItem from './OptionItem.vue'
import {StOptionItem, StOptionType} from './enum'

const CONTROL_FOLDED_KEY_MAP = 'option_ui_folded_key_map'

const props = withDefaults(
  defineProps<{
    // 选项列表
    optionList: StOptionItem[]
    // 可选 配置存储对象 Ref，可以是 pinia store
    store?: any
    expandId?: string
  }>(),
  {
    expandId: '',
  },
)
const {expandId, store} = toRefs(props)
const emit = defineEmits(['onToggleExpand', 'updateValue'])

// 提供给所有子组件
provide('sharedStore', store)

// 保存展开状态
const foldedKeyMap = ref(
  JSON.parse(localStorage.getItem(CONTROL_FOLDED_KEY_MAP + expandId.value) || 'null') || {},
)

// 切换展开状态
const handleToggleExpand = (item: StOptionItem) => {
  if (foldedKeyMap.value[item.key]) {
    delete foldedKeyMap.value[item.key]
  } else {
    foldedKeyMap.value[item.key] = true
  }
  localStorage.setItem(CONTROL_FOLDED_KEY_MAP + expandId.value, JSON.stringify(foldedKeyMap.value))
}
</script>

<template>
  <div class="option-ui">
    <OptionItem
      v-show="!item.hidden"
      v-for="item in optionList"
      :item="item"
      :key="item.key"
      :folded-key-map="foldedKeyMap"
      @onToggleExpand="handleToggleExpand"
      @updateValue="(v) => emit('updateValue', v)"
    />
  </div>
</template>
