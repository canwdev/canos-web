<script lang="ts">
import {defineComponent, PropType} from 'vue'
import OptionItem from './OptionItem.vue'
import {StOptionItem, StOptionType} from './enum'

export default defineComponent({
  name: 'OptionUI',
  components: {OptionItem},
  props: {
    optionList: {
      type: Array as PropType<StOptionItem[]>,
      default() {
        return []
      },
    },
  },
  setup(props, {emit}) {
    // 保存展开状态
    const foldedKeyMap = ref({})

    // 切换展开状态
    const handleToggleExpand = (item: StOptionItem) => {
      if (foldedKeyMap.value[item.key]) {
        delete foldedKeyMap.value[item.key]
      } else {
        foldedKeyMap.value[item.key] = true
      }
    }

    return {
      StOptionType,
      foldedKeyMap,
      handleToggleExpand,
    }
  },
})
</script>

<template>
  <div class="option-ui">
    <OptionItem
      v-for="item in optionList"
      :item="item"
      :key="item.key"
      :folded-key-map="foldedKeyMap"
      @onToggleExpand="handleToggleExpand"
    />
  </div>
</template>
