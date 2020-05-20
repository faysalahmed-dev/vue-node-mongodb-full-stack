import { get, post } from '@/api/api';
import Vue from 'vue';
import _ from 'lodash';
import catchError from '../catchError';
const SET_THREADS = 'SET_THREADS';
const UPDATE_THREADS = 'UPDATE_THREADS';
const SET_POST = 'POST_DATA';

export default {
    namespaced: true,
    state: {
        threads: null
    },
    mutations: {
        [SET_THREADS](state, threads) {
            state.threads = threads;
        },
        [UPDATE_THREADS](state, newThread) {
            Vue.set(state.threads, newThread.id, newThread);
        },
        [SET_POST](state, { threadId, postData }) {
            Vue.set(state.threads[threadId], 'posts', [postData, ...state.threads[threadId].posts]);
        }
    },
    getters: {
        threads: state => state.threads
    },
    actions: {
        fetchThreads: catchError(async ({ state, commit }, threadsId) => {
            commit(SET_THREADS, null);
            const res = await get(`threads?meetupId=${threadsId}`);
            commit(SET_THREADS, _.keyBy(res.data.data, 'id'));
            return state.threads;
        }),
        createThread: catchError(async ({ commit }, { meetupId, threadData }) => {
            const { data } = await post(`threads/create-thread?meetupId=${meetupId}`, threadData);
            commit(UPDATE_THREADS, data.data);
            return data.data;
        }),
        createThreadPost: catchError(async ({ commit }, { threadId, postData }) => {
            const { data } = await post(`posts/create-post/${threadId}`, postData);
            commit(SET_POST, { threadId, postData: data.data });
            return data.data;
        })
    }
};
