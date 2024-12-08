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
import VueTerminal from '@/components/CanUI/packages/VueTerminal/index.vue'

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
const vueTerminalRef = ref()

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
      vueTerminalRef.value.write(data.result)
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
    <VueTerminal ref="vueTerminalRef" :dark="true" />
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
  }
}
</style>
