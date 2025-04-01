<script lang="ts">
export default {
  name: 'VueTerminal',
}
</script>

<script setup lang="ts">
import {ref, watch, onMounted, toRefs, nextTick} from 'vue'
import {ITerminalOptions, Terminal} from '@xterm/xterm'
import {FitAddon} from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import {useResizeObserver} from '@vueuse/core'
import {WebLinksAddon} from '@xterm/addon-web-links'

const props = withDefaults(
  defineProps<{
    dark?: boolean
    optionsOverride?: ITerminalOptions
  }>(),
  {
    dark: true,
  },
)
const emit = defineEmits(['onData', 'resize'])
const {dark} = toRefs(props)

const terminalEl = ref()
const terminalRef = shallowRef<Terminal>()
const fitAddon = shallowRef<FitAddon>()

// https://github.com/ysk2014/xterm-theme/tree/master/src/iterm
const getTheme = () => {
  return dark.value
    ? // Dracula
      {
        foreground: '#f8f8f2',
        background: '#1e1f29',
        cursor: '#bbbbbb',

        black: '#000000',
        brightBlack: '#555555',

        red: '#ff5555',
        brightRed: '#ff5555',

        green: '#50fa7b',
        brightGreen: '#50fa7b',

        yellow: '#f1fa8c',
        brightYellow: '#f1fa8c',

        blue: '#bd93f9',
        brightBlue: '#bd93f9',

        magenta: '#ff79c6',
        brightMagenta: '#ff79c6',

        cyan: '#8be9fd',
        brightCyan: '#8be9fd',

        white: '#bbbbbb',
        brightWhite: '#ffffff',
      }
    : // Piatto_Light
      {
        foreground: '#414141',
        background: '#ffffff',
        cursor: '#5e77c8',
        selectionBackground: '#e2e2e2',

        black: '#414141',
        brightBlack: '#3f3f3f',

        red: '#b23771',
        brightRed: '#db3365',

        green: '#66781e',
        brightGreen: '#829429',

        yellow: '#cd6f34',
        brightYellow: '#cd6f34',

        blue: '#3c5ea8',
        brightBlue: '#3c5ea8',

        magenta: '#a454b2',
        brightMagenta: '#a454b2',

        cyan: '#66781e',
        brightCyan: '#829429',

        white: '#ffffff',
        brightWhite: '#f2f2f2',
      }
}

const initTerminal = () => {
  const options: ITerminalOptions = {
    cursorBlink: false,
    convertEol: true, //启用时，光标将设置为下一行的开头
    disableStdin: false, //是否应禁用输入。
    // cursorStyle: 'bar', //光标样式
    theme: getTheme(),
  }
  if (props.optionsOverride) {
    Object.assign(options, props.optionsOverride)
  }
  const terminal = new Terminal(options)
  terminalRef.value = terminal

  fitAddon.value = new FitAddon()
  terminal.loadAddon(fitAddon.value)
  terminal.loadAddon(new WebLinksAddon())
  terminal.open(terminalEl.value)

  // 处理输入
  terminal.onData((data) => {
    // console.log(data)
    emit('onData', data)
  })
}

// 销毁方法
const destroyTerminal = () => {
  // 销毁终端实例
  if (terminalRef.value) {
    terminalRef.value.dispose()
    terminalRef.value = undefined
  }
}
useResizeObserver(terminalEl, (entries) => {
  // const entry = entries[0]
  // const { width, height } = entry.contentRect
  if (terminalRef.value && fitAddon.value) {
    fitAddon.value.fit()
    emit('resize', {
      cols: terminalRef.value.cols,
      rows: terminalRef.value.rows,
    })
  }
})

watch(dark, (val) => {
  if (terminalRef.value) {
    terminalRef.value.options.theme = getTheme()
  }
})

onMounted(() => {
  initTerminal()
})
onBeforeUnmount(() => {
  destroyTerminal()
})

defineExpose({
  write: (val) => {
    terminalRef.value?.write(val)
  },
  clear: () => {
    terminalRef.value?.clear()
  },
  focus: () => {
    terminalRef.value?.focus()
  },
  terminalRef,
})
</script>

<template>
  <div class="terminal-container" ref="terminalEl"></div>
</template>

<style lang="scss" scoped>
.terminal-container {
  width: 100%;
  height: 260px;
  :deep(.xterm-screen) {
    //padding: 0.5rem;
  }
}
</style>
