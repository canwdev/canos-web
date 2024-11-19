<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {LsKeys} from '@/enum'
import ViewPortWindow from '@/components/CanUI/packages/ViewPortWindow/index.vue'
import DesktopWallpaper from '@/components/OS/DesktopWindowManager/DesktopWallpaper.vue'
import {usersApi} from '@/api/users'
import LoginForm from '@/components/OS/SettingsApp/Users/LoginForm.vue'
import {cryptKeyRef} from '@/utils/my-crypt'

const route = useRoute()
const router = useRouter()

const cryptKeyEditing = ref('')
watch(
  cryptKeyRef,
  (val) => {
    cryptKeyEditing.value = val
  },
  {immediate: true},
)
const isShowCryptKeyConfig = ref(false)
const saveCryptKey = () => {
  cryptKeyRef.value = cryptKeyEditing.value
  isShowCryptKeyConfig.value = false
}

const isLoading = ref(false)
const handleLogin = async (data) => {
  if (isLoading.value) {
    return
  }
  try {
    isLoading.value = true
    let {username, password} = data

    const res = await usersApi.userLogin(username, password)
    const {access_token} = res as unknown as any
    if (!access_token) {
      window.$message.error('Invalid token!')
      return
    }
    console.log('set access_token', access_token)
    localStorage.setItem(LsKeys.LS_KEY_AUTHORIZATION, access_token)

    if (route.query.redirect) {
      await router.push({path: route.query.redirect as string})
    } else {
      await router.push({path: '/'})
    }
  } catch (e) {
    console.error(e)
  } finally {
    isLoading.value = false
  }
}

const beforeLogin = () => {
  loginFormRef.value.submitForm()
}

// 自动聚焦输入框
const inputUsernameRef = ref()
const autoFocusInput = () => {
  inputUsernameRef.value?.focus()
}

const loginFormRef = ref()
onMounted(() => {
  nextTick(() => {
    autoFocusInput()
  })
})
</script>

<template>
  <div class="login-view">
    <DesktopWallpaper>
      <ViewPortWindow visible :show-close="false">
        <template #titleBarLeft>Login</template>

        <div
          v-if="!cryptKeyRef || isShowCryptKeyConfig"
          class="card-wrap flex-row-center-gap font-code"
        >
          <div>请输入接口传输密钥(ck):</div>
          <input
            type="text"
            class="vp-input"
            v-model="cryptKeyEditing"
            style="width: 100%"
            placeholder="请输入接口密钥"
          />
          <button class="vp-button primary" @click="saveCryptKey()" :disabled="!cryptKeyEditing">
            Submit
          </button>
        </div>

        <div v-else class="card-wrap">
          <LoginForm
            v-loading="isLoading"
            ref="loginFormRef"
            @submit="handleLogin"
            :disabled="isLoading"
          />

          <div class="login-actions">
            <button class="vp-button" type="button" @click="$router.push({name: 'IpChooserView'})">
              <span class="mdi mdi-ip-network"></span>
            </button>
            <button class="vp-button" type="button" @click="isShowCryptKeyConfig = true">
              <span class="mdi mdi-security-network"></span>
            </button>
            <button
              class="vp-button btn-login"
              type="button"
              @click="beforeLogin"
              :disabled="isLoading"
            >
              Login{{ isLoading ? 'ing...' : '' }}
            </button>
          </div>
        </div>
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

  .btn-login {
    background-color: $primary;
    color: white;
  }

  .login-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
  }
}
</style>
