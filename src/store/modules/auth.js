import * as http from '@/api/api';
import router from '@/routes/index';

const SET_USER = Symbol('SET_USER').toString();
const SET_AUTH_STATE_LOADING = Symbol('SET_AUTH_STATE_LOADING').toString();

export default {
    namespaced: true,
    state: { user: null, authStateLoading: false },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
        },
        authStateLoading(state) {
            return state.authStateLoading;
        },
        user(state) {
            return state.user;
        }
    },
    mutations: {
        [SET_USER](state, userData) {
            state.user = userData;
        },
        [SET_AUTH_STATE_LOADING](state, isResolve = false) {
            state.authStateLoading = isResolve;
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
        async getAuthUser({ commit, getters }) {
            if (getters.isAuthenticated) return Promise.resolve(getters.user);
            try {
                const user = await http.get('users/auth-user');
                commit(SET_USER, user.data.data);
                commit(SET_AUTH_STATE_LOADING, true);
                return user;
            } catch (error) {
                console.log(error.response);
                commit(SET_USER, null);
                commit(SET_AUTH_STATE_LOADING, true);
                return null;
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
