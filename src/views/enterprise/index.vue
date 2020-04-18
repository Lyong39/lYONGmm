<template>
    <div>
        <el-card shadow="always">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="企业编号">
                    <el-input class="short" v-model="obj.eid"></el-input>
                </el-form-item>
                <el-form-item label="企业名称">
                    <el-input class="long" v-model="obj.name"></el-input>
                </el-form-item>
                <el-form-item label="创建者">
                    <el-input class="short" v-model="obj.username"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select class="long" v-model="obj.status">
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
                    <el-button type="primary" @click="openAddEnt"><i class="el-icon-plus"></i> 新增企业</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card shadow="always">
            <el-table :data="entList" style="width: 100%">
                <el-table-column type="index" label="序号">
                </el-table-column>
                <el-table-column prop="eid" label="企业编号">
                </el-table-column>
                <el-table-column prop="name" label="企业名称">
                </el-table-column>
                <el-table-column prop="username" label="创建者">
                </el-table-column>
                <el-table-column label="创建日期">
                    <template slot-scope="scope">
                        {{scope.row.create_time | myTime}}
                    </template>
                </el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        {{ scope.row.status === 0 ? '禁用':'启用' }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-link type="primary" @click="openEditEnt(scope.row)">编辑</el-link>&nbsp;
                        <el-link type="primary" @click="diable(scope.row)">
                            {{scope.row.status === 0 ? '启用':'禁用'}}
                        </el-link>&nbsp;
                        <el-link type="primary" @click="delEnt(scope.row)">删除</el-link>
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

    import processEnt from "./components/processEnt";
    import {apiDelEnt, apiEditEntStatus, apiGetList} from "../../api/enterprise";

    export default {
        name: "index",
        created() {
            this.getEntData();
        },
        data() {
            return {
                obj: {
                    name: '',
                    page: 1,//当前页
                    limit: 4,//页容量
                    eid: '',
                    username: '',
                    status: ''
                },
                formInline: {
                    rid: '',
                    name: '',
                    username: '',
                    status: ''
                },
                pageSizes: [2, 4, 6, 8],
                total: 0,//总数据量
                entList: []
            }
        },
        methods: {
            openAddEnt() {
                this.$refs.processEnt.dialogFormVisible = true;
                this.$refs.processEnt.isEdit = false;
                // 清空子组件的form数据解决修改后用新增时的数据赋值
                /**
                 * 也可以用这种方式
                 * this.$refs.processEnt.$refs.form.resetFields();
                 * this.$refs.processEnt.form.remark='';
                 */
                this.$refs.processEnt.form.eid = '';
                this.$refs.processEnt.form.name = '';
                this.$refs.processEnt.form.short_name = '';
                this.$refs.processEnt.form.intro = '';
                this.$refs.processEnt.form.remark = '';
            },
            openEditEnt(row) {
                this.$refs.processEnt.dialogFormVisible = true;
                this.$refs.processEnt.isEdit = true;
                // 保存编辑中的状态
                // 解决row数据源与编辑表单,双向绑定带来的数据修改问题
                let str = JSON.stringify(row);
                let obj = JSON.parse(str);
                this.$refs.processEnt.form = obj;
                this.$nextTick(() => {
                    this.$refs.processEnt.$refs.form.clearValidate();
                })
            },
            onDelete() {
                this.obj.eid = '';
                this.obj.name = '';
                this.obj.username = '';
                this.obj.status = '';
            },
            onSearch() {
                this.getEntData();
            },
            handleSizeChange(val) {
                this.obj.limit = val;
                this.getEntData();
            },
            handleCurrentChange(val) {
                this.obj.page = val;
                this.getEntData();
            },
            getEntData() {
                apiGetList(this.obj).then(res => {
                    this.entList = res.data.data.items;
                    this.total = res.data.data.pagination.total;
                })
            },
            diable(row) {
                let id = row.id;
                apiEditEntStatus(id).then(res => {
                    if (res.data.code === 200) {
                        if (row.status === 0) {
                            this.$message.success('启用成功!')
                        } else {
                            this.$message.success('禁用成功!')
                        }
                        this.getEntData();
                    }
                })
            },
            delEnt(row) {
                this.$confirm('此操作将永久删除该学科, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiDelEnt(row.id).then(res => {
                        if (res.data.code === 200) {
                            this.$message.success('删除成功!');
                            if (this.entList.length === 1) {
                                this.obj.page -= 1;
                            }
                            this.getEntData();
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
            processEnt
        }
    }
</script>

<style scoped>

</style>