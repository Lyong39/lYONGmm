<template>
    <el-dialog :close-on-click-modal="false" class="reg_dialog" title="用户注册" :visible.sync="dialogFormVisible">
        <el-form ref="form" :rules="rules" :model="form">
            <el-form-item label="头像" prop="avatar" :label-width="formLabelWidth">
                <el-upload
                        class="avatar-uploader"
                        :action="imgUpload"
                        name="image"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
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
                        <img class="codeimg" @click="changeImg" :src="imgUrl" alt="">
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="验证码" prop="loginCode" :label-width="formLabelWidth">
                <el-row>
                    <el-col :span="19">
                        <el-input v-model="form.loginCode" autocomplete="off"></el-input>
                    </el-col>
                    <el-col class="imgbox" :span="5">
                        <el-button class="reg_btn" :disabled="time!==0" @click="getCode">{{time===0?'获取用户验证码':time}}
                        </el-button>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancle">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import {apiGetCode, apiRegister} from '@/api/register.js';

    import {checkphone, checkemail} from "@/utils/myCheck";

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
                    loginCode: '',
                    avatar: ''
                },
                rules: {
                    avatar: [
                        {required: true, message: '头像不能为空', trigger: 'blur'}
                    ],
                    nickname: [
                        {required: true, message: '昵称不能为空', trigger: 'blur'},
                        {min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {validator: checkemail, trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'},
                        {validator: checkphone, trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                    ],
                    code: [
                        {required: true, message: '图形码不能为空', trigger: 'blur'},
                        {min: 4, max: 4, message: '长度是 4 个字符', trigger: 'blur'}
                    ],
                    loginCode: [
                        {required: true, message: '验证码不能为空', trigger: 'blur'},
                        {min: 4, max: 4, message: '长度是 4 个字符', trigger: 'blur'}
                    ]
                },
                imgUrl: process.env.VUE_APP_ONLINEURL + '/captcha?type=sendsms&t=' + Date.now(),
                imageUrl: '',
                imgUpload: process.env.VUE_APP_ONLINEURL + '/uploads',
                time: 0,
                timer: null
            }
        },
        methods: {
            cancle() {
                this.$refs.form.resetFields();
                this.dialogFormVisible = false;
                this.imageUrl = '';
            },
            submitForm() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        apiRegister({
                            username: this.form.nickname,
                            phone: this.form.phone,
                            email: this.form.email,
                            avatar: this.form.avatar,
                            password: this.form.password,
                            rcode: this.form.code
                        }).then(res => {
                            if (res.data.code === 200) {
                                this.$message({
                                    message: '恭喜你，注册成功！',
                                    type: 'success'
                                });
                                this.dialogFormVisible = false;
                                this.$refs.form.resetFields();
                                this.imageUrl = '';
                            } else {
                                this.$message.error(res.data.message);
                            }
                        })
                    } else {
                        this.$message.error('登录失败！请检查注册项输入...');
                    }
                });
            },
            changeImg() {
                this.imgUrl = process.env.VUE_APP_ONLINEURL + '/captcha?type=sendsms&t=' + Date.now();
            },
            getCode() {
                let phoneReg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
                if (!phoneReg.test(this.form.phone)) {
                    this.$message.error('手机号不合法！');
                    return;
                }
                if (this.form.code.trim().length != 4) {
                    return this.$message.error('验证码不合法！');
                }

                this.time = 5;
                this.timer = setInterval(() => {
                    if (this.time > 0) {
                        this.time--
                    }
                    if (this.time === 0) {
                        clearInterval(this.timer);
                    }
                }, 1000);
                apiGetCode({
                    code: this.form.code,
                    phone: this.form.phone
                }).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success('手机验证码为：' + res.data.data.captcha);
                    } else {
                        this.$message.error(res.data.message);
                    }
                }).catch(err => {
                    console.log(err);
                })
            },
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                this.form.avatar = res.data.file_path;
                this.$refs.form.validateField('avatar');
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || 'image/png' || 'image/gif';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG/png/gif 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
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

    .avatar-uploader {
        text-align: center;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>