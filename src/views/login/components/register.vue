<template>
    <el-dialog class="reg_dialog" title="用户注册" :visible.sync="dialogFormVisible">
        <el-form ref="form" :rules="rules" :model="form">
            <el-form-item label="昵称" prop="nickname" :label-width="formLabelWidth">
                <el-input v-model="form.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone" :label-width="formLabelWidth">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
                <el-input v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="图形码" prop="code" :label-width="formLabelWidth">
                <el-row>
                    <el-col :span="19">
                        <el-input v-model="form.code" autocomplete="off"></el-input>
                    </el-col>
                    <el-col class="imgbox" :span="5">
                        <img class="codeimg" src="../../../assets/login_captcha.png" alt="">
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="验证码" prop="loginCode" :label-width="formLabelWidth">
                <el-row>
                    <el-col :span="19">
                        <el-input v-model="form.loginCode" autocomplete="off"></el-input>
                    </el-col>
                    <el-col class="imgbox" :span="5">
                        <el-button class="reg_btn">获取用户验证码</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        name: "register",
        data() {
            return {
                dialogFormVisible: false,
                formLabelWidth: '67px',
                form: {
                    nickname: '',
                    email: '',
                    phone: '',
                    password: '',
                    code: '',
                    loginCode: ''
                },
                rules: {
                    nickname: [
                        {required: true, message: '昵称不能为空', trigger: 'blur'},
                        {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '手机不能为空', trigger: 'blur'},
                        {min: 11, max: 11, message: '长度是 11 个字符', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                    ],
                    code: [
                        {required: true, message: '图形码不能为空', trigger: 'blur'},
                        {min: 4, max: 4, message: '长度是 4 个字符', trigger: 'blur'}
                    ],
                    loginCode: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {min: 6, max: 6, message: '长度是 6 个字符', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            submitForm() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        this.$message({
                            message: '恭喜你，注册成功！',
                            type: 'success'
                        });
                    } else {
                        this.$message.error('登录失败！请检查注册项输入...');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="less">
    .reg_dialog {
        .el-dialog__header {
            text-align: center;
            padding: 0;
            height: 53px;
            line-height: 53px;
            background: linear-gradient(to right, #0dc1ef, #1394fc);

            .el-dialog__title {
                color: #fff;
            }
        }

        .imgbox {
            height: 41px;
            text-align: right;

            .codeimg {
                width: 143px;
                height: 41px;
            }
        }

        .reg_btn {
            width: 143px;
            height: 41px;
        }

        .el-dialog__footer {
            text-align: center;
        }
    }
</style>