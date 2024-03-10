<script lang="ts">
import {defineComponent, PropType} from 'vue'
import {useModelWrapper} from '@/hooks/use-model-wrapper'
import {QuickOptionItem} from './enum'
import {onClickOutside, onKeyStroke} from '@vueuse/core'
import VueRender from '@/components/CommonUI/OptionUI/Tools/VueRender.vue'

export default defineComponent({
  name: 'QuickOptions',
  components: {VueRender},
  props: {
    visible: {
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
  },
  emits: ['onClose', 'update:visible'],
  setup(props, {emit}) {
    const {options, isStatic, autoFocus} = toRefs(props)
    const mVisible = useModelWrapper(props, emit, 'visible')
    const quickRootRef = ref()

    // 点击外部隐藏
    onClickOutside(quickRootRef, (event) => {
      if (!isStatic.value) {
        mVisible.value = false
      }
    })

    const scrollToIndex = (index) => {
      const el = quickRootRef.value.querySelector(`[data-index="${index}"]`)
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
      scrollToIndex(curIndex.value)
    }
    const selectNext = () => {
      curIndex.value++
      if (curIndex.value > mOptions.value.length - 1) {
        curIndex.value = 0
      }
      scrollToIndex(curIndex.value)
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
    }

    const handleKeyPress = (event) => {
      event.preventDefault()
      if (event.key === 'Escape' || event.key === 'q') {
        handleBack()
      } else if (event.key === 'ArrowUp') {
        selectPrev()
      } else if (event.key === 'ArrowDown') {
        selectNext()
      } else if (event.key === 'ArrowLeft') {
        handleBack()
      } else if (event.key === 'ArrowRight') {
        handleKeyEnter()
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

    const handleOptionClick = async (item: QuickOptionItem) => {
      if (item.children) {
        let subList: QuickOptionItem[] = []
        if (typeof item.children === 'function') {
          subList = await item.children()
        } else if (item.children.length) {
          subList = item.children
        }
        menuStack.value.push(subList)
        curIndex.value = 0
      } else if (item?.props?.onClick) {
        item.props.onClick(item)
        mVisible.value = false
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
    }
  },
})
</script>

<template>
  <div
    v-if="mVisible || isStatic"
    class="quick-options vp-panel _scrollbar_mini"
    :class="{_absolute: !isStatic, _s: isStatic}"
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

    <div
      class="option-item"
      v-for="(item, index) in mOptions"
      :key="index"
      @click="handleOptionClick(item)"
      :class="{
        focus: curIndex === index,
        clickable: item?.props?.onClick || (item.children && item.children),
      }"
      :data-index="index"
    >
      <div class="index-wrap" v-if="index < 9">
        <span>{{ index + 1 }}</span>
      </div>
      <div class="item-icon" v-if="item.icon">
        <img :src="item.icon" alt="icon" />
      </div>
      <div class="item-content" v-if="item.html" v-html="item.html"></div>
      <div class="item-content" v-else-if="item.render">
        <VueRender :render-fn="item.render" />
      </div>
      <div class="item-content" v-else>
        {{ item.label }}
      </div>
      <div v-if="item.children && item.children" class="arrow-wrap">
        <div class="css-arrow right"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    border-bottom: 1px solid $color_border;
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
