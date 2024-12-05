<script lang="ts" setup>
import {computed, ref} from 'vue'
import {Terminal} from '@xterm/xterm'
import {FitAddon} from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'

import {useStorage} from '@vueuse/core'
import {remoteApi} from '@/api/remote'
import AutoFormElPlus from '@/components/CanUI/packages/AutoFormElPlus/index.vue'
import {FormRules} from 'element-plus'
import {AutoFormItemType, MixedFormItems} from '@/components/CanUI/packages/AutoFormElPlus/enum'

// 创建一个对象来存储连接信息
const dataForm = useStorage('temp_ssh_connection_info', {
  host: '',
  port: 22,
  username: '',
  password: '',
  privateKey: '',
  passphrase: '',
})
const dataFormRules = computed<FormRules>(() => {
  return {
    host: [{required: true, trigger: 'blur'}],
    port: [{required: true, trigger: 'blur'}],
    username: [{required: true, trigger: 'blur'}],
  }
})
const formItems = computed((): MixedFormItems[] => {
  return [
    [
      {
        label: 'Host',
        key: 'host',
        type: AutoFormItemType.INPUT,
      },
      {
        label: 'Port',
        key: 'port',
        type: AutoFormItemType.INPUT_NUMBER,
      },
    ],
    [
      {
        label: 'Username',
        key: 'username',
        type: AutoFormItemType.INPUT,
      },
      {
        label: 'password',
        key: 'password',
        type: AutoFormItemType.INPUT,
      },
    ],
    [
      {
        label: 'privateKey',
        key: 'privateKey',
        type: AutoFormItemType.INPUT,
        props: {
          type: 'textarea',
        },
      },
      {
        label: 'passphrase',
        key: 'passphrase',
        type: AutoFormItemType.INPUT,
      },
    ],
  ]
})

const command = ref('fastfetch')
const connected = ref(false)
const terminalEl = ref()
const terminal = shallowRef<Terminal>()

const initTerminal = () => {
  terminal.value = new Terminal({
    cursorBlink: false,
    convertEol: true, //启用时，光标将设置为下一行的开头
    disableStdin: false, //是否应禁用输入。
    cursorStyle: 'underline', //光标样式
  })
  const fitAddon = new FitAddon()
  terminal.value.loadAddon(fitAddon)
  terminal.value.open(terminalEl.value)
  setInterval(() => {
    fitAddon.fit()
  }, 1000)
}

const connectSSH = async () => {
  try {
    const data = await remoteApi.connect({
      host: dataForm.value.host,
      port: dataForm.value.port,
      username: dataForm.value.username,
      password: dataForm.value.password,
      privateKey: dataForm.value.privateKey,
    })

    if (data.success) {
      connected.value = true
      initTerminal()
    } else {
      throw new Error('Failed to connect')
    }
  } catch (error) {
    console.error('Connection failed', error)
  }
}

const executeCommand = async () => {
  try {
    const data = await remoteApi.execute({
      command: command.value,
    })

    if (data.success) {
      terminal.value.write(data.result)
    }
  } catch (error) {
    console.error('Command execution failed', error)
  }
}
</script>

<template>
  <div class="remote-app">
    <AutoFormElPlus
      @onSubmit="connectSSH"
      :form-schema="{
        model: dataForm,
        rules: dataFormRules,
        props: {
          labelPosition: 'top',
        },
        formItems,
      }"
    />
    <div v-if="connected" class="command-input flex-row-center-gap">
      <input
        class="vp-input"
        v-model="command"
        @keyup.enter="executeCommand"
        placeholder="Enter command"
      />
      <button class="vp-button" @click="executeCommand">Execute</button>
    </div>
    <div class="terminal-container" ref="terminalEl"></div>
  </div>
</template>

<style lang="scss" scoped>
.remote-app {
  display: flex;
  flex-direction: column;
  height: 100%;
  .terminal-container {
    flex: 1;
    width: 100%;
    overflow: hidden;
  }
}
</style>
