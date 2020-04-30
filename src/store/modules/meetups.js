import { get } from '@/api/api';

const _SET_MEETUPS = 'SET_MEETUPS';
const _SET_MEETUP = 'SET_MEETUP';

export default {
    namespaced: true,
    state: {
        meetups: null,
        meetup: null
    },
    getters: {
        meetups: state => state.meetups,
        meetup: state => state.meetup
    },
    mutations: {
        [_SET_MEETUPS]: (state, meetups) => (state.meetups = meetups),
        [_SET_MEETUP]: (state, meetup) => (state.meetup = meetup)
    },
    actions: {
        async fetchMeetups({ state, commit }) {
            commit(_SET_MEETUPS, null);
            const res = await get('meetups');
            commit(_SET_MEETUPS, res.data);
            return state.meetups;
        },
        async fetchMeetup({ commit, state }, meetupId) {
            commit(_SET_MEETUP, null);
            const res = await get(`meetups/${meetupId}`);
            commit(_SET_MEETUP, res.data);
            return state.meetup;
        }
    }
};
