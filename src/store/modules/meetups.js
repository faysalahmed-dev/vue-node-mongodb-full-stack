import { get, post } from '@/api/api';
import _ from 'lodash';
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
            try {
                commit(_SET_MEETUPS, null);
                const res = await get('meetups');
                commit(_SET_MEETUPS, res.data.data);
                return state.meetups;
            } catch (err) {
                console.log(err.response);
                return Promise.reject(err.response.data.message);
            }
        },
        async fetchMeetup({ commit, state }, meetupId) {
            try {
                commit(_SET_MEETUP, null);
                const res = await get(`meetups/${meetupId}`);
                commit(_SET_MEETUP, res.data.data);
                return state.meetup;
            } catch (err) {
                console.log(err.response);
                return Promise.reject(err.response.data.message);
            }
        },
        async createMeetup(context, data) {
            try {
                const form = new FormData();
                if (Array.isArray(data.images)) {
                    data.images.forEach(image => form.append('images', image));
                }
                form.append('data', JSON.stringify(_.omit(data, ['images'])));

                const res = await post('meetups/create-meetup', form);
                return res.data.data;
            } catch (error) {
                const { data } = error.response;
                if (data.error) {
                    const err = Object.values(data.error);
                    return Promise.reject(err);
                }
                return Promise.reject(data.message || 'some thing went wrong');
            }
        }
    }
};
