<script lang="ts">
import {ComputedRef, defineComponent, PropType, Ref} from 'vue'
import {QuickOptionItem} from './enum'
import {onClickOutside, useVModel} from '@vueuse/core'
import QOptionItem from './utils/QOptionItem.vue'

export default defineComponent({
  name: 'QuickOptions',
  components: {QOptionItem},
  props: {
    // 是否显示菜单
    visible: {
      type: Boolean,
      default: false,
    },
    // 点击菜单项自动隐藏
    closeOnClick: {
      type: Boolean,
      default: true,
    },
    // 是否水平展示
    horizontal: {
      type: Boolean,
      default: false,
    },
    // 菜单标题
    title: {
      type: String,
      default: '',
    },
    // 菜单配置项
    options: {
      type: Array as PropType<QuickOptionItem[]>,
      default() {
        return []
      },
    },
    // 是否为静态菜单（点击外部不自动隐藏，并且不自动弹出子菜单）
    isStatic: {
      type: Boolean,
      default: false,
    },
    // 自动聚焦以便键盘操作
    autoFocus: {
      type: Boolean,
      default: true,
    },
    // 展示数字（Beta）
    showIndex: {
      type: Boolean,
      default: true,
    },
    // 菜单项的自定义类
    itemCls: {
      type: String,
      default: '',
    },
  },
  emits: ['onClose', 'update:visible', 'onBack', 'onEnter'],
  setup(props, {emit}) {
    const {options, horizontal, isStatic, autoFocus, closeOnClick} = toRefs(props)
    const mVisible = useVModel(props, 'visible', emit)
    const quickRootRef = ref()

    // 点击外部隐藏
    onClickOutside(quickRootRef, (event) => {
      if (isStatic.value) {
        return
      }
      if (mVisible.value) {
        setTimeout(() => {
          mVisible.value = false
          emit('onClose')
        })
      }
    })

    const scrollToIndex = () => {
      const el = quickRootRef.value.querySelector(`[data-index="${curIndex.value}"]`)
      nextTick(() => {
        el && el.scrollIntoView({behavior: 'instant', block: 'center'})
      })
    }

    const curIndex = ref(0)
    const getNextStep = (index) => {
      // 如果下一个选项为spilt，就跳过
      if (mOptions.value[index] && mOptions.value[index].split) {
        return 2
      }
      return 1
    }
    const selectPrev = () => {
      curIndex.value -= getNextStep(curIndex.value - 1)
      if (curIndex.value < 0) {
        curIndex.value = mOptions.value.length - 1
      }
      scrollToIndex()
    }
    const selectNext = () => {
      curIndex.value += getNextStep(curIndex.value + 1)
      if (curIndex.value > mOptions.value.length - 1) {
        curIndex.value = 0
      }
      scrollToIndex()
    }
    const focus = () => {
      setTimeout(() => {
        quickRootRef.value?.focus()
      }, 10)
    }

    onMounted(() => {
      if (autoFocus.value && mVisible.value) {
        focus()
      }
    })

    watch(mVisible, (val) => {
      if (val) {
        curIndex.value = 0
        if (autoFocus.value) {
          focus()
        }
      } else {
        menuStack.value = []
        menuItemStack.value = []
      }
    })

    // 打开的菜单堆栈，支持内容为计算属性
    const menuStack = ref<QuickOptionItem[][]>([])
    // 打开的当前元素堆栈，主要用于显示标题
    const menuItemStack = ref<QuickOptionItem[]>([])
    const backTitle = computed(() => {
      if (!menuItemStack.value.length) {
        return ' '
      }
      const lastItem = menuItemStack.value[menuItemStack.value.length - 1]
      return lastItem.html || lastItem.label
    })

    const mOptions = computed((): QuickOptionItem[] => {
      if (menuStack.value.length) {
        const last: any = menuStack.value[menuStack.value.length - 1]
        // 检测列表是否为计算属性
        if (last.__v_isRef) {
          // 获取计算属性的值
          return last.value
        }
        return last
      }
      return options.value
    })

    const handleBack = () => {
      if (menuStack.value.length) {
        menuStack.value.pop()
        menuItemStack.value.pop()
        emit('onBack')
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
      let isPreventDefault = true
      if (event.key === 'Escape' || event.key === 'q') {
        handleBack()
      } else if (event.key === 'Tab') {
        selectNext()
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

        // console.log(number)
        const item = mOptions.value[number - 1]
        if (item) {
          handleOptionClick(item)
        }
      } else {
        isPreventDefault = false
      }
      if (isPreventDefault) {
        event.preventDefault()
      }
    }

    const handleKeyEnter = () => {
      const item = mOptions.value[curIndex.value]
      handleOptionClick(item)
    }

    const handleOptionClick = async (item: QuickOptionItem, event?, openChildrenOnly = false) => {
      // console.log('handleOptionClick', item)
      if (item.disabled) {
        return
      }

      if (item?.props?.onClick && !openChildrenOnly) {
        item.props.onClick(item, event)
        if (closeOnClick.value) {
          emit('onClose')
          mVisible.value = false
        }
      }
      // 只有静态菜单才允许在原地打开子菜单
      else if (isStatic.value && item.children) {
        let subList: QuickOptionItem[] | any = []
        if (typeof item.children === 'function') {
          subList = await item.children()
        } else if (item.children.length) {
          subList = item.children
        }

        menuStack.value.push(subList)
        menuItemStack.value.push(item)
        curIndex.value = 0
        emit('onEnter')
      }
      if (isStatic.value && item?.props?.isBack) {
        if (typeof item.props.isBack === 'number') {
          for (let i = 0; i < item.props.isBack; i++) {
            handleBack()
          }
        } else {
          handleBack()
        }
      }
    }

    const handleOptionContextmenu = async (item: QuickOptionItem, event?) => {
      if (item?.props?.onContextmenu) {
        event?.preventDefault()
        item.props.onContextmenu(item, event)
      }
    }
    const isFocused = () => document.activeElement !== quickRootRef.value
    return {
      mVisible,
      quickRootRef,
      menuStack,
      curIndex,
      handleKeyPress,
      backTitle,
      handleBack,
      mOptions,
      handleOptionClick,
      handleOptionContextmenu,
      focus,
      isFocused,
    }
  },
})
</script>

<template>
  <div
    v-show="mVisible || isStatic"
    class="quick-options"
    :class="{
      _static: isStatic,
      horizontal,
      'vp-panel': !horizontal && !isStatic,
    }"
    @keydown.stop="handleKeyPress"
    tabindex="0"
    ref="quickRootRef"
  >
    <div class="option-title" v-if="title">
      {{ title }}
      <button class="btn-no-style" @click="mVisible = false">×</button>
    </div>

    <div
      v-if="menuStack.length"
      class="option-item vp-bg _back clickable"
      @click="handleBack"
      title="Back (q)"
    >
      <div class="index-wrap">
        <div style="transform: scale(0.7)">
          <div class="css-arrow left"></div>
        </div>
      </div>
      <span v-html="backTitle"></span>
    </div>

    <template v-for="(v, index) in mOptions" :key="index">
      <div v-if="v.split" class="option-split"></div>
      <QOptionItem
        v-else
        :item="v"
        :index="index"
        :cur-index="curIndex"
        :item-cls="itemCls"
        :show-index="showIndex"
        :is-static="isStatic"
        @click="handleOptionClick(v, $event)"
        @contextmenu.prevent.stop="handleOptionContextmenu(v, $event)"
        @onArrowClick="handleOptionClick(v, $event, true)"
        @onClose="$emit('onClose'), (mVisible = false)"
        @onSubMenuHide="focus"
      />
      <!--@mouseover="curIndex = index"-->
    </template>
  </div>
</template>

<style lang="scss">
.quick-options {
  transition:
    border 0.2s,
    outline-color 0.2s;
  width: fit-content;

  &:focus {
    border: 1px solid $primary;
    outline: none;
    .option-item {
      &.focus {
        outline-color: $primary;
      }
    }
  }

  &._static {
    box-shadow: none;
    border: none;
    border-radius: 0;
    .option-item {
      outline: 1px solid transparent;
      outline-offset: -1px;
    }
  }

  &.horizontal {
    display: flex;
    .option-item {
      padding: 4px 8px;
      min-width: auto;

      &.show-index {
        padding: 4px 8px;
      }
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

  .option-split {
    border-bottom: 1px solid $color_border;
    margin-top: 1px;
    margin-bottom: 1px;
  }

  .option-item {
    padding: 8px 24px 8px 8px;
    line-height: 1.2;
    min-width: 120px;
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 8px;

    &.show-index {
      padding: 8px 24px;
    }

    .sub-option-items {
      position: absolute;
      top: 0;
      left: 100%;
      // 解决绝对定位，fit-content 不生效的问题
      width: max-content;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.3s;
    }

    &._back {
      padding: 2px 24px;
      font-size: 12px;
      position: sticky;
      top: 0;
      z-index: 2;
      border: none;
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
      align-content: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      font-size: 16px;
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
      display: flex;
      &:hover {
        color: $primary;
      }
    }

    &:focus {
      outline: none;
    }

    &:not(&._back) {
      &:hover,
      &.focus,
      &.hover {
        background-color: $color_hover;
        transition: all 0s;
      }
    }

    &.active {
      color: white !important;
      background-color: $primary !important;
    }

    &:not(.disabled) {
      &.clickable {
        user-select: none;
        cursor: pointer;
        &:active {
          color: white;
          background-color: $primary !important;
        }
      }
    }

    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
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
