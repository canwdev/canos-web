<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {LsKeys} from '@/enum'
import ViewPortWindow from '@/components/CanUI/packages/ViewPortWindow/index.vue'
import DesktopWallpaper from '@/components/OS/DesktopWindowManager/DesktopWallpaper.vue'
import {usersApi} from '@/api/users'
import LoginForm from '@/components/OS/SettingsApp/Users/LoginForm.vue'

const route = useRoute()
const router = useRouter()

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
    // console.log(access_token)
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
      <ViewPortWindow :show-close="false">
        <template #titleBarLeft>Login</template>

        <div class="card-wrap">
          <LoginForm
            v-loading="isLoading"
            ref="loginFormRef"
            @submit="handleLogin"
            :disabled="isLoading"
          />

          <el-space>
            <button class="vp-button" type="button" @click="$router.push({name: 'IpChooserView'})">
              IP
            </button>
            <button
              class="vp-button btn-login"
              type="button"
              @click="beforeLogin"
              :disabled="isLoading"
            >
              Login{{ isLoading ? 'ing...' : '' }}
            </button>
          </el-space>
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
}
</style>
