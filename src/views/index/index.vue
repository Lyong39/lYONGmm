<template>
    <el-container>
        <el-header>
            <div class="left">
                <i class="el-icon-s-fold"></i>
                <img src="../../assets/index_logo.png" alt="">
                <span>黑马面面</span>
            </div>
            <div class="right">
                <img :src="imgUrl" alt="">
                <span class="word">{{userInfo.username}}</span>
                <el-button type="primary" size="mini" @clike="logout">退出</el-button>
            </div>
        </el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {apiInfo} from "../../api";
    import {deleteToken} from "../../utils/myToken";

    export default {
        name: "index",
        created() {
            apiInfo().then(res => {
                this.userInfo = res.data.data;
                this.imgUrl = process.env.VUE_APP_URL + '/' + this.userInfo.avatar;
            })
        },
        data() {
            return {
                userInfo: {
                    userInfo: {},
                },
                imgUrl: ''
            }
        },
        methods: {
            logout() {
                this.$confirm('您确定要退出吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    deleteToken()
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
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
</style>