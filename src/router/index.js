import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../views/login/index';
import index from '../views/index/index'
import chart from '../views/chart/index';
import enterprise from '../views/enterprise/index'
import question from '../views/question/index'
import subject from '../views/subject/index'
import user from '../views/user/index'
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
import {getToken} from "../utils/myToken";
import {apiInfo} from "../api";
import {Message} from 'element-ui';
import store from "../store";

Vue.use(VueRouter);

let vueRouter = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: 'login'
        },
        {
            path: '/login',
            component: Login,
            meta: {
                title: 'heimamm',
                roles: ['管理员', '老师', '学生']
            }
        },
        {
            path: '/index',
            component: index,
            meta: {
                title: 'heimamm',
                roles: ['管理员', '老师', '学生']
            },
            children: [
                {
                    // path不加'/'   路由路径会拼接上一级路径: '/index/chart'
                    path: 'chart',
                    component: chart,
                    meta: {
                        title: '数据概览',
                        roles: ['管理员', '老师']
                    }
                },
                {
                    // path加'/'  路由路径访问就是'/enterprise'
                    path: '/enterprise',
                    component: enterprise,
                    meta: {
                        title: '企业列表',
                        roles: ['管理员']
                    }
                },
                {
                    path: '/question',
                    component: question,
                    meta: {
                        title: '题库列表',
                        roles: ['管理员', '老师', '学生']
                    }
                },
                {
                    path: '/subject',
                    component: subject,
                    meta: {
                        title: '学科列表',
                        roles: ['管理员']
                    }
                },
                {
                    path: '/user',
                    component: user,
                    meta: {
                        title: '用户列表',
                        roles: ['管理员', '老师']
                    }
                }
            ]
        }
    ]
});

vueRouter.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    NProgress.start();
    if (to.path !== '/login') {
        if (!getToken()) {
            NProgress.done();
            Message.error('您还没有登录,请登录!')
            next('/login')
        } else {
            apiInfo().then(res => {
                if (res.data.data.status === 0) {
                    Message.error('账号封禁,请联系管理员!');
                    NProgress.done();
                } else {
                    if (res.data.code === 200) {
                        let userInfo = {
                            username: res.data.data.username,
                            userimg: process.env.VUE_APP_ONLINEURL + '/' + res.data.data.avatar
                        };
                        store.commit('setUserInfo', userInfo);
                        const role = res.data.data.role;
                        if (to.meta.roles.includes(role)){
                            next()
                        }else {
                            Message.error('你没有访问权限,请联系管理员!');
                            NProgress.done();
                        }
                        next();
                    } else if (res.data.code === 206) {
                        NProgress.done();
                        Message.error('token错误,请重新登录!');
                        next('/login');
                    }
                }
            });
        }
    } else {
        next()
    }
});
vueRouter.afterEach(() => {
    NProgress.done();
});

export default vueRouter;
