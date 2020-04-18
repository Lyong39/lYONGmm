<template>
    <el-container>
        <el-header>
            <div class="left">
                <i @click="isCollapse=!isCollapse" class="el-icon-s-fold"></i>
                <img src="../../assets/index_logo.png" alt="">
                <span>黑马面面</span>
            </div>
            <div class="right">
                <img :src="$store.state.userimg" alt="">
                <span class="word">{{$store.state.username}}</span>
                <el-button type="primary" size="mini" @click="logout">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside width="auto">
                <el-menu class="el-menu-vertical-demo"
                         :collapse="isCollapse"
                         :router="true"
                         :default-active='this.$route.path'>
                    <el-menu-item index="/index/chart">
                        <i class="el-icon-pie-chart"></i>
                        <span slot="title">数据概览</span>
                    </el-menu-item>
                    <el-menu-item index="/user">
                        <i class="el-icon-user"></i>
                        <span slot="title">用户列表</span>
                    </el-menu-item>
                    <el-menu-item index="/question">
                        <i class="el-icon-edit-outline"></i>
                        <span slot="title">题库列表</span>
                    </el-menu-item>
                    <el-menu-item index="/enterprise">
                        <i class="el-icon-office-building"></i>
                        <span slot="title">企业列表</span>
                    </el-menu-item>
                    <el-menu-item index="/subject">
                        <i class="el-icon-notebook-2"></i>
                        <span slot="title">学科列表</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {apiLogout} from "../../api";
    import {deleteToken} from "../../utils/myToken";

    export default {
        name: "index",
        data() {
            return {
                userInfo: {
                    userInfo: {},
                },
                imgUrl: '',
                isCollapse: false,
            }
        },
        methods: {
            logout() {
                this.$confirm('您确定要退出吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    apiLogout().then((res) => {
                        if (res.data.code === 200) {
                            deleteToken();
                            this.$router.push({path: '/login'});
                            this.$message({
                                type: 'success',
                                message: '退出成功!'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消退出'
                    });
                });
            }
        }
    }
</script>

<style lang="less">
    * {
        margin: 0;
        padding: 0;
    }

    html, body, .app {
        height: 100%;
    }

    .el-container {
        height: 100%;
    }

    .el-header {
        background-color: #fff;
        color: #333;
        line-height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .left {
            display: flex;
            align-items: center;

            i {
                font-size: 24px;
                margin-right: 22px;
            }

            img {
                width: 33px;
                height: 28px;
                margin-right: 21px;
            }

            span {
                font-size: 22px;
                color: #49A1FF;
            }
        }

        .right {
            display: flex;
            align-items: center;

            img {
                width: 43px;
                height: 43px;
                border-radius: 50%;
                margin-right: 9px;
            }

            .word {
                font-size: 14px;
                margin-right: 38px;
            }

        }
    }

    .el-aside {
        background-color: #fff;
        color: #333;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>