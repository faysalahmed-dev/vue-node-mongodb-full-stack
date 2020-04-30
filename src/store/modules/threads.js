import { get } from '@/api/api';

const _SET_THREADS = 'SET_THREADS';

export default {
    namespaced: true,
    mutations: {
        [_SET_THREADS](state, threads) {
            state = threads;
        }
    },
    actions: {
        async fetchThreads({ state, commit }, threadsId) {
            const res = await get(`threads?meetupId=${threadsId}`);
            commit(_SET_THREADS, res.data);
            return state;
        }
    }
};
