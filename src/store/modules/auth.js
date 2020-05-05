import * as http from '@/api/api';
import router from '@/routes/index';

const SET_USER = Symbol('SET_USER').toString();
//const USER = Symbol('user').toString();

export default {
    namespaced: true,
    state: { user: null },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
        },
        user(state) {
            return state.user;
        }
    },
    mutations: {
        [SET_USER](state, userData) {
            state.user = userData;
        }
    },
    actions: {
        async loginUser({ commit }, data) {
            try {
                const user = await http.post('users/login', data);
                commit(SET_USER, user.data.data);
                router.replace('/');
            } catch (error) {
                console.log(error.response);
            }
        },
        async signupUser({ commit }, data) {
            try {
                const user = await http.post('users/signup', data);
                commit(SET_USER, user.data.data);
                router.replace('/');
            } catch (error) {
                console.log(error.response);
            }
        },
        async getAuthUser({ commit }) {
            try {
                const user = await http.get('users/auth-user');
                commit(SET_USER, user.data.data);
            } catch (error) {
                console.log(error.response);
                commit(SET_USER, null);
            }
        },
        async logoutUser({ commit }) {
            try {
                await http.get('users/logout');
                commit(SET_USER, null);
            } catch (err) {
                console.log(err.response);
            }
        }
    }
};
