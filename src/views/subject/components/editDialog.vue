<template>
    <el-dialog title="编辑学科" :visible.sync="dialogFormVisible">
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
            <el-button type="primary" @click="editSubject">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import {apiEditSubject} from "../../../api/subject";

    export default {
        name: "editDialog",
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    rid: '',
                    name: '',
                    short_name: '',
                    intro: '',
                    remark: '',
                    id: '',
                    create_time: '',
                    update_time: ''
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
            editSubject() {
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        apiEditSubject(this.form).then(res => {
                            if (res.data.code === 200) {
                                this.$message.success('修改学科成功!');
                                this.dialogFormVisible = false;
                                this.$parent.getSubjectData();
                            } else if (res.data.code === 201) {
                                this.$message.error(res.data.message);
                            }
                        });
                    } else {
                        this.$message.error('学科编号或名称不能为空!');
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