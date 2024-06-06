<template>
  <div class="login">
    <el-card class="box-card" shadow="never">
      <div class="mb-3">
        <img src="@/assets/icons/sidebar/logo.svg" alt="logo" />
      </div>
      <h2 class="text-center my-2">Войти в систему</h2>
      <el-form
        label-position="top"
        ref="ruleFormRef"
        :model="_form"
        :rules="_rules"
        status-icon
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="Логин" label-position="top" prop="username">
          <el-input
            v-model.trim="_form.userName"
            autocomplete="off"
            class="input"
            type="text"
            placeholder="Введите логин"
            @keyup.enter="login(ruleFormRef)"
          />
        </el-form-item>

        <el-form-item label="Пароль" prop="password">
          <el-input
            v-model.trim="_form.password"
            autocomplete="off"
            class="input"
            type="password"
            placeholder="Введите пароль"
            show-password
            @keyup.enter="login(ruleFormRef)"
          />
        </el-form-item>
      </el-form>
      <el-button class="btn" @click="login(ruleFormRef)" type="warning" size="large">Войти</el-button>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useLoginStore } from '@/stores/login.pinia'
import { useRouter, type Router } from 'vue-router'

const router: Router = useRouter()

const { submitLogin } = useLoginStore()

const ruleFormRef = ref()
const _form = reactive({
  userName: '',
  password: ''
})

const _rules = reactive({
  userName: [{ required: true, message: 'Введите логин', trigger: 'blur' }],
  password: [{ required: true, message: 'Введите пароль', trigger: 'blur' }]
})
const login =  (formEl: any) => {
  if (!formEl) return
  formEl.validate(async (valid: any) => {
    if (valid) {
      await submitLogin(_form)
      await router.push('monitoring/online-users')
    }
    else return false
  })
}
</script>

<style src="@/assets/styles/_login.style.scss" scoped></style>
