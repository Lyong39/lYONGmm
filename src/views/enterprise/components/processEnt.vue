<template>
    <el-dialog :title="isEdit?'修改企业':'新增企业'" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="eid" label="企业编号" :label-width="formLabelWidth">
                <el-input v-model="form.eid" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="企业名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="short_name" label="企业简称" :label-width="formLabelWidth">
                <el-input v-model="form.short_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="intro" label="企业简介" :label-width="formLabelWidth">
                <el-input v-model="form.intro" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="企业备注" :label-width="formLabelWidth">
                <el-input v-model="form.remark" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addOrEditEnt">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {apiAddEnt, apiUpdateEnt} from "../../../api/enterprise";

    export default {
        name: "processEnt",
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    eid: '',
                    name: '',
                    short_name: '',
                    intro: '',
                    remark: ''
                },
                rules: {
                    eid: [
                        {required: true, message: '企业编号不能为空', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '企业名称不能为空', trigger: 'blur'}
                    ],
                    short_name: [
                        {required: true, message: '企业简称不能为空', trigger: 'blur'}
                    ],
                    intro: [
                        {required: true, message: '企业介绍不能为空', trigger: 'blur'}
                    ]
                },
                formLabelWidth: '120px',
                isEdit: false
            };
        },
        methods: {
            addOrEditEnt() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        if (this.isEdit) {
                            apiUpdateEnt(this.form).then(res => {
                                if (res.data.code === 200) {
                                    this.$message.success('修改企业成功!');
                                    this.dialogFormVisible = false;
                                    this.$parent.getEntData();
                                } else if (res.data.code === 201) {
                                    this.$message.error(res.data.message);
                                }
                            });
                        } else {
                            apiAddEnt(this.form).then(res => {
                                if (res.data.code === 200) {
                                    this.$message.success('添加企业成功!');
                                    this.dialogFormVisible = false;
                                    // 只会重置表单验证的字段
                                    this.$refs.form.resetFields();
                                    this.form.remark = '';
                                    this.$parent.getEntData();
                                } else {
                                    this.$message.error(res.data.message);
                                }
                            });
                        }
                    } else {
                        this.$message.error('请完善输入项!');
                    }
                })
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