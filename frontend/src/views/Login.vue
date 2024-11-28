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
    console.log('[userLogin] res', res)

    const {authorizationToken, refreshToken} = res as unknown as any
    if (!authorizationToken || !refreshToken) {
      window.$message.error('Invalid backend token!')
      return
    }
    localStorage.setItem(LsKeys.LS_KEY_AUTHORIZATION_TOKEN, authorizationToken)
    localStorage.setItem(LsKeys.LS_KEY_REFRESH_TOKEN, refreshToken)

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
      <div class="login-box-wrapper vp-panel" v-loading="isLoading">
        <div class="l-title">Login</div>

        <div v-if="!cryptKeyRef || isShowCryptKeyConfig" class="flex-row-center-gap font-code">
          <div>请输入接口传输密钥(ck):</div>
          <input
            type="text"
            class="vp-input"
            v-model="cryptKeyEditing"
            style="width: 100%"
            placeholder="请输入接口密钥"
          />
          <button
            class="vp-button primary"
            @click="saveCryptKey()"
            :disabled="!cryptKeyEditing"
            style="margin-left: auto"
          >
            Submit
          </button>
        </div>

        <template v-else>
          <LoginForm ref="loginFormRef" @submit="handleLogin" :disabled="isLoading" />

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
              Login
            </button>
          </div>
        </template>
      </div>
    </DesktopWallpaper>
  </div>
</template>

<style lang="scss" scoped>
.login-view {
  height: 100%;
  overflow: auto;

  .desktop-wallpaper {
    min-height: 400px;
    display: flex;
    align-items: center;
    position: unset;
  }

  :deep(.n-layout-scroll-container) {
    display: flex;
    align-items: center;
    justify-content: center;
    @media screen and (max-height: 500px) {
      align-items: flex-start;
    }
  }
  .login-box-wrapper {
    padding: 16px;
    margin: 0 auto;
    width: 340px;

    .l-title {
      margin-bottom: 24px;
      text-align: center;
    }
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
