<script lang="ts">
import {defineComponent, PropType} from 'vue'
import OptionItem from './OptionItem.vue'
import {StOptionItem, StOptionType} from './enum'

const CONTROL_FOLDED_KEY_MAP = 'option_ui_folded_key_map'

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
    expandId: {
      type: String,
      default: '',
    },
  },
  setup(props, {emit}) {
    const {expandId} = toRefs(props)
    // 保存展开状态
    const foldedKeyMap = ref(
      JSON.parse(localStorage.getItem(CONTROL_FOLDED_KEY_MAP + expandId.value) || 'null') || {}
    )

    // 切换展开状态
    const handleToggleExpand = (item: StOptionItem) => {
      if (foldedKeyMap.value[item.key]) {
        delete foldedKeyMap.value[item.key]
      } else {
        foldedKeyMap.value[item.key] = true
      }
      localStorage.setItem(
        CONTROL_FOLDED_KEY_MAP + expandId.value,
        JSON.stringify(foldedKeyMap.value)
      )
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
      v-show="!item.hidden"
      v-for="item in optionList"
      :item="item"
      :key="item.key"
      :folded-key-map="foldedKeyMap"
      @onToggleExpand="handleToggleExpand"
    />
  </div>
</template>
