import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../views/login/index';
import userElement from "../views/login/userElement";

Vue.use(VueRouter);

let vueRouter = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: 'login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/userElement',
            component: userElement
        }
    ]
});

export default vueRouter;