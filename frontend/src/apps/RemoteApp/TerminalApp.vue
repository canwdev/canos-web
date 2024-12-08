<script lang="ts" setup>
import VueTerminal from '@/components/CanUI/packages/VueTerminal/index.vue'
import {io, Socket} from 'socket.io-client'
import {onMounted} from 'vue'
import {API_BACKEND_WS} from '@/enum'
import {getToken} from '@/utils/service'
import {usersApi} from '@/api/users'
import {IUserInfo} from '@server/types/user'
import {useMainStore} from '@/store/main'

const mainStore = useMainStore()
const vueTerminalRef = ref()
const socketRef = shallowRef<Socket>()

const handleInput = (data) => {
  if (socketRef.value && socketRef.value.connected) {
    socketRef.value.emit('stdin', data)
  }
}
const handleOutput = (data) => {
  const term = vueTerminalRef.value
  if (term) {
    term.write(data)
  }
}

const handleResize = ({cols, rows}) => {
  // 仅适用于 Linux
  handleInput(`\x01${cols},${rows}`)
}

onMounted(async () => {
  setTimeout(() => {
    vueTerminalRef.value?.focus()
  }, 100)

  // 触发一次token认证，防止token过期
  mainStore.userInfo = (await usersApi.userGetInfo()) as unknown as IUserInfo

  const uri = `${API_BACKEND_WS}/terminal-ws`
  const socket = io(uri, {
    extraHeaders: {
      Authorization: getToken() || '',
    },
  })
  socketRef.value = socket
  console.log(`[ws] 正在连接服务器... ${uri}`)
  socket.on('connect', () => {
    console.log('[ws] 服务器已连接')
    // 启动终端
    socket.emit('start-terminal')
  })

  // 处理终端输出
  socket.on('stdout', handleOutput)
  // 处理错误
  socket.on('stderr', handleOutput)

  socket.on('exception', (data) => {
    console.error('[ws] 异常:', data)
  })
  socket.on('disconnect', (e) => {
    console.error('[ws] 连接已断开', e)
  })
  socket.on('connect_error', (error) => {
    // 处理第一次连接失败的情况
    console.error('[ws] 连接失败:', error)
  })
})

onBeforeUnmount(() => {
  if (socketRef.value) {
    socketRef.value.disconnect()
    socketRef.value = undefined
  }
})
</script>

<template>
  <div class="terminal-app">
    <VueTerminal
      ref="vueTerminalRef"
      :dark="true"
      :options-override="{
        cursorBlink: true,
        convertEol: false,
      }"
      @onData="handleInput"
    />
    <!--@resize="handleResize"-->
  </div>
</template>

<style lang="scss" scoped>
.terminal-app {
  display: flex;
  flex-direction: column;
  height: 100%;
  .terminal-container {
    flex: 1;
    width: 100%;
  }
}
</style>
