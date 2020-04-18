<template>
    <el-dialog :title="isEdit?'修改用户':'新增用户'" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="username" label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="phone" label="电话" :label-width="formLabelWidth">
                <el-input v-model="form.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="role_id" label="角色" :label-width="formLabelWidth">
                <el-select class="long" v-model="form.role_id">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="管理员" :value="2"></el-option>
                    <el-option label="老师" :value="3"></el-option>
                    <el-option label="学生" :value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="status" label="状态" :label-width="formLabelWidth">
                <el-select class="long" v-model="form.status">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="启用" :value="1"></el-option>
                    <el-option label="禁用" :value="0"></el-option>
                </el-select>
                <!--                <el-input v-model="form.status" autocomplete="off"></el-input>-->
            </el-form-item>
            <el-form-item prop="remark" label="用户备注" :label-width="formLabelWidth">
                <el-input v-model="form.remark" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOrEditUser">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {apiAddUser, apiUpdateUser} from "../../../api/user";
    import {checkemail, checkphone} from "../../../utils/myCheck";

    export default {
        name: "processEnt",
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    username: '',
                    email: '',
                    phone: '',
                    role_id: '',
                    status: '',
                    remark: '',
                    id:''
                },
                rules: {
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '邮箱不能为空', trigger: 'blur'},
                        {validator: checkemail, trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'},
                        {validator: checkphone, trigger: 'blur'}
                    ],
                    role_id: [
                        {required: true, message: '企业介绍不能为空', trigger: 'blur'}
                    ]
                },
                formLabelWidth: '100px',
                isEdit: false
            };
        },
        methods: {
            addOrEditUser() {
                // this.$refs.form.validate((valid) => {
                //     if (valid) {
                        if (this.isEdit) {
                            apiUpdateUser(this.form).then(res => {
                                if (res.data.code === 200) {
                                    this.$message.success('修改用户成功!');
                                    this.dialogFormVisible = false;
                                    this.$parent.getUserData();
                                } else if (res.data.code === 201) {
                                    this.$message.error(res.data.message);
                                }
                            });
                        } else {
                            apiAddUser(this.form).then(res => {
                                if (res.data.code === 200) {
                                    this.$message.success('添加用户成功!');
                                    this.dialogFormVisible = false;
                                    // 只会重置表单验证的字段
                                    // this.$refs.form.resetFields();
                                    // this.form.remark = '';
                                    this.$parent.getUserData();
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            });
                        }
            //         }
            //         else {
            //             this.$message.error('请完善输入项!');
            //         }
            //     })
            }
        }
    }
</script>

<style lang="less">
    .el-dialog__header {
        text-align: center;
        background: linear-gradient(to right, #00c6f7, #2194ec);

        .el-dialog__title {
            color: #fff;
        }

        .el-dialog__headerbtn {
            .el-dialog__close {
                color: #fff;
            }
        }

    }

    .dialog-footer {
        text-align: center;
    }
</style>