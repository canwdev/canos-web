<script lang="ts">
// TODO: Big.js 解决精度问题
function add(a, b) {
  return a + b
}

// 使用BigInt对象实现minus方法
function minus(a, b) {
  return a - b
}

/**
 * 返回数组中最接近的值
 * @param input
 * @param range
 */
export function findClosestValue(input: number, range: number[]) {
  // 初始化最接近值和最小差距
  let closestIndex = -1
  let closestValue = range[0]
  let minDifference = Math.abs(input - range[0])

  // 遍历数组，找到最接近的值
  for (let i = 1; i < range.length; i++) {
    const currentDifference = Math.abs(input - range[i])

    // 更新最接近值和最小差距
    if (currentDifference < minDifference) {
      closestIndex = i
      closestValue = range[i]
      minDifference = currentDifference
    }
  }

  return {
    index: closestIndex,
    value: closestValue,
  }
}

export default defineComponent({
  name: 'AdvancedNumberInput',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    isDebug: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    min: Number,
    max: Number,
    // 步长，如果设置了marks则无视此参数
    step: {
      type: Number,
      default: 1,
    },
    // 显示格式化函数
    format: Function,
    parse: Function,
    // NaiveUI n-slider 通用的marks参数
    marks: {
      type: Object as PropType<{[markValue: number]: string}>,
    },
  },
  setup(props, {emit}) {
    const {marks, step, min, max, modelValue, readonly, disabled} = toRefs(props)

    const mValue = computed({
      get: () => props['modelValue'],
      set: (value) => {
        return emit(`update:modelValue`, value)
      },
    })

    const marksNumberArray = computed((): number[] | null => {
      if (!marks.value) {
        return null
      }
      const arr: number[] = []
      Object.keys(marks.value).forEach((n) => {
        arr.push(Number(n))
      })
      // 把数字从小到大排序
      return arr.sort((a, b) => a - b)
    })

    /**
     * 获取下一个mark的数字，如果没有就返回null
     * @param isNext true=下一个，false=上一个
     */
    const getNextMarksNumber = (isNext: boolean): number | null => {
      const numbers = marksNumberArray.value
      // 处理marks逻辑
      if (numbers) {
        let idx = numbers.findIndex((n) => n === mValue.value)
        if (idx < 0) {
          // 如果数值找不到，就查找最接近的值
          const cl = findClosestValue(mValue.value, numbers)
          idx = cl.index
          if (idx < 0) {
            console.error('number not found!', {idx, numbers, mValue: mValue.value, isNext})
            idx = 0
          }
        }
        if (isNext) {
          if (numbers[idx + 1] !== undefined) {
            return numbers[idx + 1]
          }
        } else {
          if (numbers[idx - 1] !== undefined) {
            return numbers[idx - 1]
          }
        }
      }
      return null
    }

    // 如果可以正常增加就返回数字，否则返回null
    const nextUpValue = computed(() => {
      // 处理marks逻辑
      if (marksNumberArray.value) {
        return getNextMarksNumber(true)
      }

      // 处理正常逻辑
      const _max = max.value

      const val = add(mValue.value, step.value)
      // const val = mValue.value + step.value

      if (_max !== undefined) {
        if (val <= _max) {
          return val
        } else {
          return null
        }
      }
      return val
    })
    const isAllowUp = computed(() => nextUpValue.value !== null)

    // 如果可以正常减少就返回数字，否则返回null
    const nextDownValue = computed(() => {
      // 处理marks逻辑
      if (marksNumberArray.value) {
        return getNextMarksNumber(false)
      }

      // 处理正常逻辑
      const _min = min.value
      // fix js number float precision bug: 0.4-0.3 = 0.10000000000000003
      const val = minus(mValue.value, step.value)
      // const val = mValue.value - step.value

      if (_min !== undefined) {
        if (val >= _min) {
          return val
        } else {
          return null
        }
      }
      return val
    })

    const isAllowDown = computed(() => nextDownValue.value !== null)

    const handleUp = () => {
      if (isAllowUp.value && !props.disabled) {
        mValue.value = nextUpValue.value as number
      }
    }
    const handleDown = () => {
      if (isAllowDown.value && !props.disabled) {
        mValue.value = nextDownValue.value as number
      }
    }

    const inputValue = ref('')
    const getValue = (val) => {
      if (props.format) {
        return props.format(val)
      } else {
        return String(val)
      }
    }
    watch(
      modelValue,
      (val) => {
        inputValue.value = getValue(val)
      },
      {immediate: true}
    )
    const handleEnter = () => {
      if (readonly.value || disabled.value) {
        return
      }
      let val: number
      if (props.parse) {
        val = props.parse(String(inputValue.value)) || 0
      } else {
        val = Number(inputValue.value) || 0
      }

      // 限制范围
      if (props.max !== undefined && val > props.max) {
        val = props.max
      }
      if (props.min !== undefined && val < props.min) {
        val = props.min
      }

      // 自动四舍五入到最近的step
      if (props.step) {
        val = Math.round(val / props.step) * props.step
      }

      mValue.value = val
      inputValue.value = getValue(val)
    }

    const isFocused = ref(false)
    const handleFocus = () => {
      isFocused.value = true
    }
    const handleBlur = () => {
      handleEnter()
      isFocused.value = false
    }

    return {
      mValue,
      handleUp,
      handleDown,
      isAllowUp,
      isAllowDown,
      nextUpValue,
      nextDownValue,
      marksNumberArray,
      inputValue,
      handleBlur,
      handleEnter,
      handleFocus,
      isFocused,
    }
  },
})
</script>

<template>
  <div class="advanced-number-input" :class="{disabled, focused: isFocused}">
    <input
      v-model="inputValue"
      type="text"
      class="text-input"
      :readonly="readonly"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.enter="handleEnter"
      @keyup.up="handleUp"
      @keyup.down="handleDown"
      :disabled="disabled"
    />

    <div v-if="isDebug" class="debug-val">{{ modelValue }}</div>

    <div class="toggle-wrap">
      <button @click="handleUp" class="btn-no-style btn-up" :disabled="!isAllowUp || disabled">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 12 12"
        >
          <g fill="none">
            <path
              d="M2.146 7.354a.5.5 0 0 0 .708 0L6 4.207l3.146 3.147a.5.5 0 1 0 .708-.708l-3.5-3.5a.5.5 0 0 0-.708 0l-3.5 3.5a.5.5 0 0 0 0 .708z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </button>
      <button
        @click="handleDown"
        class="btn-no-style btn-down"
        :disabled="!isAllowDown || disabled"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 12 12"
        >
          <g fill="none">
            <path
              d="M2.146 4.646a.5.5 0 0 1 .708 0L6 7.793l3.146-3.147a.5.5 0 1 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 0-.708z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.advanced-number-input {
  padding: 1px 8px;
  background-color: #080a0b;
  color: #c0c4cc;
  font-size: 12px;
  border-radius: 4px;
  transition: all 0.3s;
  border: 1px solid transparent;
  position: relative;
  height: 24px;
  min-width: 50px;

  .debug-val {
    position: absolute;
    bottom: 100%;
    left: 0;
    background-color: #ffffff;
    padding: 2px;
    color: black;
    font-size: 12px;
    line-height: 1;
  }

  &:hover,
  &.focused {
    border-color: $primary;
  }

  .text-input {
    position: absolute;
    top: 0;
    left: 0;
    right: 16px;
    height: 100%;
    background-color: transparent;
    color: inherit;
    border: none;
    padding-left: 4px;
    outline: none;

    // readonly
    &:read-only {
      cursor: default;
    }
  }

  &.disabled {
    cursor: not-allowed;
    opacity: 0.5;
    &:hover {
      border-color: transparent;
    }

    .toggle-wrap {
      button {
        cursor: not-allowed;
      }
    }
  }

  .toggle-wrap {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    button {
      width: 10px;
      height: 9px;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
