import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import store from './store/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from "moment";

Vue.config.productionTip = false;
Vue.use(ElementUI);

Vue.filter('myTime', function (time) {
    return moment(time).format('YYYY-DD-MM');
});

new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app');
