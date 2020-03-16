import Vue from "vue";
import VueRouter from "vue-router";
import Login from '../views/login/index';

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
        }
    ]
});

export default vueRouter;