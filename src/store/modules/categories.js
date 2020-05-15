import { get } from '@/api/api';
import Vue from 'vue';
const _SET_CATEGORIES = 'SET_CATEGORIES';

export default {
    namespaced: true,
    state: {},
    mutations: {
        [_SET_CATEGORIES](state, categories) {
            categories.forEach(category => {
                Vue.set(state, category.id, category);
            });
        }
    },
    actions: {
        async fetchCategories({ state, commit }) {
            try {
                const res = await get('categories');
                commit(_SET_CATEGORIES, res.data.data);
                return state;
            } catch (err) {
                console.log(err.response);
            }
        }
    }
};
