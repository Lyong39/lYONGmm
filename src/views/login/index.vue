<template>
    <div class="login">
        <div class="leftbox">
            <div class="title">
                <img class="titleimg" src="../../assets/title-logo.png" alt="">
                <span class="titlename">黑马面面</span>
                <span class="titleline"></span>
                <span class="titlelogin">用户登录</span>
            </div>

            <el-form class="loginform" :rules="rules" ref="form" :model="form" label-width="0px">
                <el-form-item prop="phone">
                    <el-input placeholder="请输入手机号"
                              prefix-icon="el-icon-user"
                              v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input placeholder="请输入密码"
                              prefix-icon="el-icon-lock"
                              v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item prop="loginCode">
                    <el-row>
                        <el-col :span="16">
                            <el-input placeholder="请输入验证码"
                                      prefix-icon="el-icon-key"
                                      v-model="form.loginCode"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <img class="loginCode" @click="changeImg" :src='imgUrl' alt="">
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item prop="isCheck">
                    <el-checkbox v-model="form.isCheck">
                        我已阅读并同意
                        <el-link type="primary">用户协议</el-link>
                        和
                        <el-link type="primary">隐私条款</el-link>
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginbtn" type="primary" @click="onSubmit">登录</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="loginbtn" type="primary" @click="openregister">注册</el-button>
                </el-form-item>
            </el-form>

        </div>
        <img class="rightimg" src="../../assets/login_banner_ele.png" alt="">
        <register ref="register"/>
    </div>
</template>

<script>

    import register from "./components/register";
    import {checkphone} from "@/utils/myCheck";
    import {apiLogin} from "@/api/login";


    export default {
        name: "index",
        data() {
            return {
                form: {
                    phone: '',
                    password: '',
                    loginCode: '',
                    isCheck: []
                },
                rules: {
                    phone: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'},
                        {validator: checkphone, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    loginCode: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    isCheck: [
                        {required: true, message: '请阅读用户协议和隐私条款', trigger: 'change'}
                    ]
                },
                imgUrl: process.env.VUE_APP_ONLINEURL + '/captcha?type=login&t=' + Date.now()
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        apiLogin({
                            phone: this.form.phone,
                            password: this.form.password,
                            code: this.form.loginCode
                        }).then(res => {
                            console.log(res);
                            this.$message({
                                message: '恭喜你，登录成功！',
                                type: 'success'
                            });
                        });
                    } else {
                        this.$message.error('登录失败！请检查账户输入...');
                        return false;
                    }
                });
            },
            changeImg() {
                this.imgUrl = process.env.VUE_APP_ONLINEURL + '/captcha?type=sendsms&t=' + Date.now();
            },
            openregister() {
                this.$refs.register.dialogFormVisible = true;
            }
        },
        components: {
            register
        }
    }
</script>

<style lang="less" scoped>

    .login {
        height: 100%;
        background: linear-gradient(225deg, rgba(20, 147, 250, 1), rgba(1, 198, 250, 1));
        display: flex;
        /*  两边间隔相等  */
        justify-content: space-around;
        /*  上下居中  */
        align-items: center;

        .leftbox {
            width: 478px;
            height: 550px;
            background: rgba(245, 245, 245, 1);
            padding: 48px 42px 86px;
            /*padding 不会计入盒子的宽高中*/
            box-sizing: border-box;

            .title {
                display: flex;
                /*  上下对齐  */
                align-items: center;

                .titleimg {
                    width: 22px;
                    height: 17px;
                    margin-left: 6px;
                }

                .titlename {
                    font-size: 24px;
                    font-family: SourceHanSansCN;
                    font-weight: 400;
                    color: rgba(12, 12, 12, 1);
                    margin-left: 16px;
                    margin-right: 14px;
                }

                .titleline {
                    width: 1px;
                    height: 28px;
                    background: rgba(199, 199, 199, 1);
                    margin-right: 12px;
                }

                .titlelogin {
                    font-size: 22px;
                    font-family: PingFangSC;
                    font-weight: 400;
                    color: rgba(12, 12, 12, 1);
                }
            }

            .loginform {
                margin-top: 29px;

                .loginCode {
                    width: 100%;
                    height: 40px;
                }

                .el-link {
                    vertical-align: baseline;
                }

                .loginbtn {
                    width: 100%;
                }
            }

        }

        .rightimg {
            width: 633px;
            height: 435px;
        }
    }

</style>