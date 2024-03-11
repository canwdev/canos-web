<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {QuickOptionItem} from './enum'
import {onClickOutside, useVModel} from '@vueuse/core'
import QOptionItem from './QOptionItem.vue'

export default defineComponent({
  name: 'QuickOptions',
  components: {QOptionItem},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    horizontal: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    options: {
      type: Array as PropType<QuickOptionItem[]>,
      default() {
        return []
      },
    },
    isStatic: {
      type: Boolean,
      default: false,
    },
    autoFocus: {
      type: Boolean,
      default: true,
    },
    itemCls: {
      type: String,
      default: '',
    },
  },
  emits: ['onClose', 'update:visible'],
  setup(props, {emit}) {
    const {options, horizontal, isStatic, autoFocus} = toRefs(props)
    const mVisible = useVModel(props, 'visible', emit)
    const quickRootRef = ref()

    // 点击外部隐藏
    onClickOutside(quickRootRef, (event) => {
      if (!isStatic.value) {
        mVisible.value = false
      }
    })

    const scrollToIndex = () => {
      const el = quickRootRef.value.querySelector(`[data-index="${curIndex.value}"]`)
      nextTick(() => {
        el && el.scrollIntoView({behavior: 'instant', block: 'center'})
      })
    }

    const curIndex = ref(0)
    const selectPrev = () => {
      curIndex.value--
      if (curIndex.value < 0) {
        curIndex.value = mOptions.value.length - 1
      }
      scrollToIndex()
    }
    const selectNext = () => {
      curIndex.value++
      if (curIndex.value > mOptions.value.length - 1) {
        curIndex.value = 0
      }
      scrollToIndex()
    }
    const focus = () => {
      setTimeout(() => {
        quickRootRef.value.focus()
      }, 100)
    }

    onMounted(() => {
      if (isStatic.value) {
        if (autoFocus.value) {
          focus()
        }
      }
    })

    watch(mVisible, (val) => {
      if (val) {
        curIndex.value = 0
        focus()
      } else {
        menuStack.value = []
      }
    })

    const menuStack = ref<QuickOptionItem[][]>([])
    const mOptions = computed((): QuickOptionItem[] => {
      if (menuStack.value.length) {
        return menuStack.value[menuStack.value.length - 1]
      }
      return options.value
    })

    const handleBack = () => {
      if (menuStack.value.length) {
        menuStack.value.pop()
      } else {
        mVisible.value = false
        setTimeout(() => {
          emit('onClose')
        }, 100)
      }
      curIndex.value = 0
      scrollToIndex()
    }

    const handleKeyPress = (event) => {
      event.preventDefault()
      if (event.key === 'Escape' || event.key === 'q') {
        handleBack()
      } else if (event.key === 'ArrowUp') {
        if (horizontal.value) {
          handleBack()
        } else {
          selectPrev()
        }
      } else if (event.key === 'ArrowDown') {
        if (horizontal.value) {
          handleKeyEnter()
        } else {
          selectNext()
        }
      } else if (event.key === 'ArrowLeft') {
        if (horizontal.value) {
          selectPrev()
        } else {
          handleBack()
        }
      } else if (event.key === 'ArrowRight') {
        if (horizontal.value) {
          selectNext()
        } else {
          handleKeyEnter()
        }
      } else if (event.key === 'Enter') {
        // Enter key is pressed
        handleKeyEnter()
      } else if (event.key === ' ') {
        // Space key is pressed
        handleKeyEnter()
      } else if (event.keyCode >= 49 && event.keyCode <= 57) {
        // 检测按键 1~9
        const number = Number(String.fromCharCode(event.keyCode))
        if (Number.isNaN(number)) {
          return
        }

        console.log(number)
        const item = mOptions.value[number - 1]
        if (item) {
          handleOptionClick(item)
        }
      }
    }

    const handleKeyEnter = () => {
      const item = mOptions.value[curIndex.value]
      handleOptionClick(item)
    }

    const handleOptionClick = async (item: QuickOptionItem, event?) => {
      if (item?.props?.onClick) {
        item.props.onClick(item, event)
        mVisible.value = false
      } else if (item.children) {
        let subList: QuickOptionItem[] = []
        if (typeof item.children === 'function') {
          subList = await item.children()
        } else if (item.children.length) {
          subList = item.children
        }
        menuStack.value.push(subList)
        curIndex.value = 0
      }
      if (item?.props?.isBack) {
        handleBack()
      }
    }

    const handleOptionContextmenu = async (item: QuickOptionItem, event?) => {
      if (item?.props?.onContextmenu) {
        event?.preventDefault()
        item.props.onContextmenu(item, event)
      }
    }

    return {
      mVisible,
      quickRootRef,
      menuStack,
      curIndex,
      handleKeyPress,
      handleBack,
      mOptions,
      handleOptionClick,
      handleOptionContextmenu,
    }
  },
})
</script>

<template>
  <div
    v-if="mVisible || isStatic"
    class="quick-options _scrollbar_mini"
    :class="{_absolute: !isStatic, _s: isStatic, horizontal, 'vp-panel': !horizontal && !isStatic}"
    @keydown.stop="handleKeyPress"
    tabindex="0"
    ref="quickRootRef"
  >
    <div class="option-title" v-if="title">
      {{ title }}
      <button class="btn-no-style" @click="mVisible = false">×</button>
    </div>

    <div v-if="menuStack.length" class="option-item _back clickable" @click="handleBack">
      <div class="index-wrap">
        <div style="transform: scale(0.7)">
          <div class="css-arrow left"></div>
        </div>
      </div>
      Back (q)
    </div>

    <template v-for="(item, index) in mOptions" :key="index">
      <n-dropdown v-if="item.dropdown" :options="item.dropdown" size="small">
        <QOptionItem
          :item="item"
          :index="index"
          :cur-index="curIndex"
          :item-cls="itemCls"
          @click="handleOptionClick(item, $event)"
          @contextmenu="handleOptionContextmenu(item, $event)"
        />
      </n-dropdown>

      <QOptionItem
        v-else
        :item="item"
        :index="index"
        :cur-index="curIndex"
        :item-cls="itemCls"
        @click="handleOptionClick(item, $event)"
        @contextmenu="handleOptionContextmenu(item, $event)"
      />
    </template>
  </div>
</template>

<style lang="scss">
.quick-options {
  &:focus {
    border: 1px solid $primary;
    outline: none;
    .option-item {
      &.focus {
        background-color: $primary_opacity !important;
      }
    }
  }

  &._absolute {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    overflow: hidden;
  }

  &._s {
    box-shadow: none;
    border: none;
    border-radius: 0;
  }

  &.horizontal {
    display: flex;
    .option-item {
      padding: 4px 8px;
      min-width: auto;
      .index-wrap,
      .arrow-wrap {
        display: none;
      }
    }
  }

  .option-title {
    padding: 0 6px;
    font-size: 10px;
    opacity: 0.7;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .option-item {
    padding: 8px 24px;
    line-height: 1.2;
    min-width: 120px;
    position: relative;
    box-sizing: border-box;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    gap: 8px;

    &._back {
      padding: 2px 24px;
      font-size: 12px;
    }

    .index-wrap {
      position: absolute;
      left: 8px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 12px;
      span {
        opacity: 0.7;
      }
    }

    .item-icon {
      display: inline-flex;
      width: 24px;
      height: 24px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    .item-content {
      flex: 1;
      word-break: break-word;
    }

    .arrow-wrap {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
    }

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: $color_border;
      transition: all 0s;
    }

    &.active {
      color: white;
      background-color: $primary !important;
    }

    &.clickable {
      cursor: pointer;
      &:active {
        color: white;
        background-color: $primary !important;
      }
    }
  }
}

.css-arrow {
  border: solid currentColor;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;

  &.right {
    transform: rotate(-45deg);
  }

  &.left {
    transform: rotate(135deg);
  }

  &.up {
    transform: rotate(-135deg);
  }

  &.down {
    transform: rotate(45deg);
  }
}
</style>
