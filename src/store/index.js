/* eslint-disable no-unused-vars */
import Vue from 'vue';
import Vuex from 'vuex';

import { get } from '@/api/api';

// import categories from './modules/categories';
// import threads from './modules/threads';
import meetups from './modules/meetups';
import auth from './modules/auth';
const _SET_CATEGORIES = 'SET_CATEGORIES';
const _SET_THREADS = 'SET_THREADS';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { meetups, auth },
    state: {
        threads: null, // => array
        categories: null // => arrary
    },
    getters: {
        threads: state => state.threads,
        categories: state => state.categories
    },
    mutations: {
        [_SET_THREADS](state, threads) {
            state.threads = threads;
        },
        [_SET_CATEGORIES](state, categories) {
            state.categories = categories;
        }
    },
    actions: {
        async fetchThreads({ state, commit }, threadsId) {
            try {
                commit(_SET_THREADS, null);
                const res = await get(`threads?meetupId=${threadsId}`);
                commit(_SET_THREADS, res.data.data);
                return state;
            } catch (err) {
                console.log(err.response);
            }
        },
        async fetchCategories({ state, commit }) {
            try {
                commit(_SET_CATEGORIES, null);
                const res = await get('categories');
                commit(_SET_CATEGORIES, res.data.data);
                return state;
            } catch (err) {
                console.log(err.response);
            }
        }
    },
    strict: true
});
