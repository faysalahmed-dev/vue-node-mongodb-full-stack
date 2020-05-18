import isJWT from 'validator/lib/isJWT';
import * as http from '@/api/api';
import ls from '@/utils/localStorage';

const SET_USER = Symbol('SET_USER').toString();
const SET_AUTH_STATE_LOADED = Symbol('SET_AUTH_STATE_LOADED').toString();

export default {
    namespaced: true,
    state: { user: null, authStateLoaded: false },
    getters: {
        isAuthenticated(state) {
            return !!state.user;
        },
        authStateLoaded(state) {
            return state.authStateLoaded;
        },
        user(state) {
            return state.user;
        },
        isOwnerOfMeetup(state, { isAuthenticated }) {
            return meetupCreateorId => isAuthenticated && state.user.id === meetupCreateorId;
        },
        userJoinedBefore(state, { isAuthenticated }) {
            return meetupId => isAuthenticated && state.user.joinedMeetups.includes(meetupId);
        }
    },
    mutations: {
        [SET_USER](state, userData) {
            state.user = userData;
        },
        [SET_AUTH_STATE_LOADED](state, isResolve = false) {
            state.authStateLoaded = isResolve;
        }
    },
    actions: {
        async loginUser({ commit }, userInfo) {
            try {
                const {
                    data: { data, token }
                } = await http.post('users/login', userInfo);
                ls.setToken(token);
                commit(SET_USER, data);
                return data;
            } catch (error) {
                return Promise.reject(error.response.data.message || 'some thing went wrong');
            }
        },
        async signupUser({ commit }, userInfo) {
            try {
                const {
                    data: { data, token }
                } = await http.post('users/signup', userInfo);
                ls.setToken(token);
                commit(SET_USER, data);
                return data;
            } catch (error) {
                const { data } = error.response;
                if (data.error) {
                    const err = Object.values(data.error);
                    return Promise.reject(err);
                }
                return Promise.reject(data.message || 'some thing went wrong');
            }
        },
        async getAuthUser({ commit, getters }) {
            const token = ls.getToken();
            if (!token || !isJWT(token)) {
                commit(SET_USER, null);
                commit(SET_AUTH_STATE_LOADED, true);
                return null;
            }
            if (getters.isAuthenticated) return getters.user;
            try {
                const user = await http.get('users/auth-user');
                commit(SET_USER, user.data.data);
                return user;
            } catch (error) {
                console.log(error.response);
                commit(SET_USER, null);
                return null;
            } finally {
                commit(SET_AUTH_STATE_LOADED, true);
            }
        },
        logoutUser({ commit }) {
            ls.removeToken();
            commit(SET_USER, null);
        },
        meetupToUser({ commit, getters }, { type, meetupId }) {
            const user = getters.user;
            const joinedMeetups = [...user.joinedMeetups];
            if (type === 'dec') joinedMeetups.pop(meetupId);
            else joinedMeetups.push(meetupId);
            commit(SET_USER, {
                ...user,
                joinedMeetups: [...joinedMeetups]
            });
        }
    }
};
