<template>
    <div>
        <el-card shadow="always">
            <el-form :inline="true" :model="obj" class="demo-form-inline">
                <el-form-item label="用户名称">
                    <el-input class="short" v-model="obj.username"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱">
                    <el-input class="long" v-model="obj.email"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select class="long" v-model="obj.role_id">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="管理员" :value="2"></el-option>
                        <el-option label="老师" :value="3"></el-option>
                        <el-option label="学生" :value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSearch">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="onDelete">清除</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="openAddUser"><i class="el-icon-plus"></i> 新增用户</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="always">
            <el-table :data="userList" border style="width: 100%">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column prop="username" label="用户名">
                </el-table-column>
                <el-table-column prop="phone" label="电话">
                </el-table-column>
                <el-table-column prop="email" label="邮箱">
                </el-table-column>
                <el-table-column prop="role" label="角色">
                </el-table-column>
                <el-table-column prop="remark" label="备注">
                </el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">
                        {{ scope.row.status === 0 ? '禁用':'启用' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="openEditUser(scope.row)">编辑</el-link>&nbsp;
                        <el-link type="primary" @click="diable(scope.row)">
                            {{scope.row.status === 0 ? '启用':'禁用'}}
                        </el-link>&nbsp;
                        <el-link type="primary" @click="delUser(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-pagination
                class="myPagination"
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="obj.page"
                :page-sizes="pageSizes"
                :page-size="obj.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
        <process-ent ref="processEnt"/>
    </div>
</template>

<script>
    import {apiDelUser, apiGetUserList, apiChangeStatus} from "../../api/user";
    import ProcessEnt from "../user/components/processEnt";

    export default {
        name: "index",
        created() {
            this.getUserData();
        },
        data() {
            return {
                pageSizes: [2, 4, 6, 8],
                total: 0,//总数据量
                userList: [],
                obj: {
                    name: '',
                    username: '',
                    email: '',
                    role_id: '',
                    page: 1,//当前页
                    limit: 4//页容量
                }
            }
        },
        methods: {
            openAddUser() {
                this.$refs.processEnt.dialogFormVisible = true;
                this.$refs.processEnt.isEdit = false;
                this.$refs.processEnt.$refs.form.resetFields();
            },
            openEditUser(row) {
                this.$refs.processEnt.dialogFormVisible = true;
                this.$refs.processEnt.isEdit = true;
                let str = JSON.stringify(row);
                let obj = JSON.parse(str);
                // 将代码延迟到最近一次渲染之后执行
                this.$refs.processEnt.$nextTick(() => { // 让组件渲染之后再进行数据赋值，解决初始化数据的污染问题
                    this.$refs.processEnt.form = obj;
                });
            },
            onDelete() {
                this.obj.username = '';
                this.obj.email = '';
                this.obj.role_id = '';
            },
            onSearch() {
                this.getUserData();
            },
            handleSizeChange(val) {
                this.obj.limit = val;
                this.getUserData();
            },
            handleCurrentChange(val) {
                this.obj.page = val;
                this.getUserData();
            },
            getUserData() {
                apiGetUserList(this.obj).then(res => {
                    this.userList = res.data.data.items;
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
                        this.getUserData();
                    }
                })
            },
            delUser(row) {
                this.$confirm('此操作将永久删除该学科, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiDelUser(row.id).then(res => {
                        if (res.data.code === 200) {
                            this.$message.success('删除成功!');
                            if (this.userList.length === 1) {
                                this.obj.page -= 1;
                            }
                            this.getUserData();
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
            ProcessEnt
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