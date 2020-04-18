import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        username: '',
        userimg: ''
    },
    mutations: {
        setUserInfo(state, payload) {
            state.username = payload.username;
            state.userimg = payload.userimg;
        }
    }
});

export default store;