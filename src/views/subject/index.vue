<template>
    <div>
        <el-card shadow="always">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="学科编号">
                    <el-input class="short" v-model="formInline.rid"></el-input>
                </el-form-item>
                <el-form-item label="学科名称">
                    <el-input class="long" v-model="formInline.name"></el-input>
                </el-form-item>
                <el-form-item label="创建者">
                    <el-input class="short" v-model="formInline.username"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select class="long" v-model="formInline.status">
                        <el-option label="所有" value=""></el-option>
                        <el-option label="禁用" :value="0"></el-option>
                        <el-option label="开启" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onDelete">清除</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="openAddSubject"><i class="el-icon-plus"></i> 新增学科</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="always">
            <el-table :data="subjectList" style="width: 100%">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column prop="rid" label="学科编号">
                </el-table-column>
                <el-table-column prop="name" label="学科名称">
                </el-table-column>
                <el-table-column prop="short_name" label="简称">
                </el-table-column>
                <el-table-column prop="username" label="创建者">
                </el-table-column>
                <el-table-column prop="create_time" label="创建日期">
                    <template slot-scope="scope">
                        {{scope.row.create_time | myTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        {{ scope.row.status === 0 ? '禁用':'启用' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="openEditSubject(scope.row)">编辑</el-link>&nbsp;
                        <el-link type="primary" @click="diable(scope.row)">
                            {{scope.row.status === 0 ? '启用':'禁用'}}
                        </el-link>&nbsp;
                        <el-link type="primary" @click="delSubject(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination
                class="myPagination"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="pageSizes"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
        <addDialog ref="addDialog"/>
        <edit-dialog ref="editDialog"/>
    </div>
</template>

<script>
    import {apiChangeStatus, apiDelSubject, apiGetSubject} from "../../api/subject";
    import addDialog from "./components/addDialog";
    import editDialog from "./components/editDialog";

    export default {
        name: "index",
        created() {
            this.getSubjectData();
        },
        data() {
            return {
                formInline: {
                    rid: '',
                    name: '',
                    username: '',
                    status: ''
                },
                currentPage: 1,//当前页
                pageSizes: [2, 4, 6, 8],
                pageSize: 4,//页容量
                total: 0,//总数据量
                subjectList: []
            }
        },
        methods: {
            openAddSubject() {
                this.$refs.addDialog.dialogFormVisible = true;
            },
            openEditSubject(row) {
                this.$refs.editDialog.dialogFormVisible = true;
                // 保存编辑中的状态
                if (row.id != this.$refs.editDialog.form.id) {
                    // 解决row数据源与编辑表单,双向绑定带来的数据修改问题
                    let str = JSON.stringify(row);
                    let obj = JSON.parse(str);
                    this.$refs.editDialog.form = obj;
                }
            },
            onDelete() {
                this.formInline.rid = '';
                this.formInline.name = '';
                this.formInline.username = '';
                this.formInline.status = '';
            },
            onSearch() {
                this.getSubjectData({
                    rid: this.formInline.rid,
                    name: this.formInline.name,
                    username: this.formInline.username,
                    status: this.formInline.status
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getSubjectData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getSubjectData();
            },
            getSubjectData() {
                apiGetSubject({
                    page: this.currentPage,
                    limit: this.pageSize,
                    rid: this.formInline.rid,
                    name: this.formInline.name,
                    username: this.formInline.username,
                    status: this.formInline.status
                }).then(res => {
                    this.subjectList = res.data.data.items;
                    this.total = res.data.data.pagination.total;
                })
            },
            diable(row) {
                let id = row.id;
                apiChangeStatus(id).then(res => {
                    if (res.data.code === 200) {
                        if (row.status === 0) {
                            this.$message.success('启用成功!')
                        } else {
                            this.$message.success('禁用成功!')
                        }
                        this.getSubjectData();
                    }
                })
            },
            delSubject(row) {
                this.$confirm('此操作将永久删除该学科, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiDelSubject(row.id).then(res => {
                        if (res.data.code === 200) {
                            this.$message.success('删除成功!');
                            if (this.subjectList.length === 1) {
                                this.currentPage -= 1;
                            }
                            this.getSubjectData();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        components: {
            addDialog,
            editDialog
        }
    }
</script>

<style lang="less">

    .demo-form-inline {
        .short {
            width: 120px;
        }

        .long {
            width: 180px;
        }
    }

    .myPagination {
        text-align: center;
        margin-top: 30px;
    }

    .el-card {
        margin-top: 20px;
    }
</style>