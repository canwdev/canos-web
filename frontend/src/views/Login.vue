<script setup lang="ts">
import {FormInst, FormValidationError, useMessage, FormRules} from 'naive-ui'
import {serverApi} from '@/api/server'
import {useRouter} from 'vue-router'
import {LsKeys} from '@/enum'
import ViewPortWindow from '@/components/CommonUI/ViewPortWindow/index.vue'
import DesktopWallpaper from '@/components/OS/DesktopWindowManager/DesktopWallpaper.vue'

interface ModelType {
  username: string | null
  password: string | null
}

const router = useRouter()
const formRef = ref<FormInst | null>(null)
const message = useMessage()
const formModel = ref<ModelType>({
  username: import.meta.env.VITE_USER_NAME || '',
  password: import.meta.env.VITE_USER_PASSWORD || '',
})

const formRules: FormRules = {
  username: [
    {
      required: true,
      message: 'Username is required',
      trigger: ['blur'],
    },
  ],
  password: [
    {
      required: true,
      message: 'Password is required',
      trigger: ['blur'],
    },
  ],
}

const handleLogin = async () => {
  try {
    const {username, password} = formModel.value
    const res = await serverApi.userLogin({
      username: (username || '').trim(),
      password: password,
    })
    const {access_token} = res as unknown as any
    if (!access_token) {
      window.$message.error('Invalid token!')
      return
    }
    // console.log(access_token)
    localStorage.setItem(LsKeys.LS_KEY_AUTHORIZATION, access_token)
    await router.push({path: '/'})
  } catch (e) {
    console.error(e)
  } finally {
  }
}

// 自动聚焦输入框
const inputUsernameRef = ref()
const autoFocusInput = () => {
  inputUsernameRef.value?.focus()
}

onMounted(async () => {
  autoFocusInput()
})

const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  formRef.value?.validate((errors: Array<FormValidationError> | undefined) => {
    if (errors) {
      message.error('Invalid Form!')
      return
    }
    handleLogin()
  })
}
</script>

<template>
  <div class="login-view">
    <DesktopWallpaper>
      <ViewPortWindow :show-close="false">
        <template #titleBarLeft>Login</template>
        <n-form class="card-wrap" ref="formRef" :model="formModel" :rules="formRules">
          <n-form-item path="username" label="Username">
            <n-input
              ref="inputUsernameRef"
              v-model:value="formModel.username"
              @keyup.enter="handleValidateButtonClick"
            />
          </n-form-item>

          <n-form-item path="password" label="Password">
            <n-input
              v-model:value="formModel.password"
              type="password"
              show-password-on="click"
              @keyup.enter="handleValidateButtonClick"
              class="font-code"
            />
          </n-form-item>
          <n-space size="small" justify="end">
            <n-button @click="handleValidateButtonClick"> Login </n-button>
          </n-space>
        </n-form>
      </ViewPortWindow>
    </DesktopWallpaper>
  </div>
</template>

<style lang="scss" scoped>
.login-view {
  height: 100%;

  :deep(.n-layout-scroll-container) {
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-height: 500px) {
      align-items: flex-start;
    }
  }
  .card-wrap {
    padding: 20px;
  }
}
</style>
