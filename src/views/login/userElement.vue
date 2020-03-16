<template>
    <div>
        <h1>输入框测试</h1>
        <el-input
                placeholder="请输入手机号"
                prefix-icon="el-icon-user"
                v-model="phoneNum">
        </el-input>
        <el-input
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                v-model="password">
        </el-input>
        <el-input
                placeholder="请输入验证码"
                prefix-icon="el-icon-key"
                v-model="verifyCode">
        </el-input>
    </div>
</template>

<script>
    export default {
        name: "userElement",
        data() {
            return {
                phoneNum: '',
                password: '',
                verifyCode: ''
            }
        }
    }
</script>

<style scoped>

</style>