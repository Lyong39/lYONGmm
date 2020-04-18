<template>
    <el-dialog title="新增学科" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
            <el-form-item prop="rid" label="学科编号" :label-width="formLabelWidth">
                <el-input v-model="form.rid" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="学科名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学科简称" :label-width="formLabelWidth">
                <el-input v-model="form.short_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学科简介" :label-width="formLabelWidth">
                <el-input v-model="form.intro" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="学科备注" :label-width="formLabelWidth">
                <el-input v-model="form.remark" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSubject">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>

    import {apiAddSubject} from "../../../api/subject";

    export default {
        name: "addDialog",
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    rid: '',
                    name: '',
                    short_name: '',
                    intro: '',
                    remark: ''
                },
                rules: {
                    rid: [
                        {required: true, message: '学科编号不能为空', trigger: 'blur'}
                    ],
                    name: [
                        {required: true, message: '学科名称不能为空', trigger: 'blur'}
                    ]
                },
                formLabelWidth: '120px'
            };
        },
        methods: {
            addSubject() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        apiAddSubject(this.form).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success('添加学科成功!');
                                this.dialogFormVisible = false;
                                // 只会重置表单验证的字段
                                this.$refs.form.resetFields();
                                this.form.short_name = '';
                                this.form.intro = '';
                                this.form.remark = '';
                                this.$parent.getSubjectData();
                            }
                        });
                    } else {
                        this.$message.error('请输入学科编号和名称!');
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