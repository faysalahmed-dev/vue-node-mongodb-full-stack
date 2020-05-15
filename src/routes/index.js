import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NotFoundPage from '@/pages/NotFoundPage';
import FindMeetupsPage from '@/pages/FindMeetupsPage';
import MeetupDetailsPage from '@/pages/MeetupDetailsPage';
import AuthOnlyUserPage from '@/pages/AuthOnlyUserPage';
import MeetupCreatePage from '@/pages/MeetupCreatePage';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'homePage', component: HomePage },
        {
            path: '/meetup/create-new',
            component: MeetupCreatePage,
            name: 'meetupCreate',
            meta: { requiresAuth: true }
        },
        {
            path: '/meetup/:id',
            name: 'meetupDetails',
            component: MeetupDetailsPage
        },
        {
            path: '/find-meetups',
            name: 'findMeetups',
            component: FindMeetupsPage
        },
        {
            path: '/login',
            name: 'login',
            component: LoginPage,
            meta: { publicUserOnly: true }
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupPage,
            meta: { publicUserOnly: true }
        },
        {
            path: '/401',
            name: 'authUserOnly',
            component: AuthOnlyUserPage,
            meta: { publicUserOnly: true }
        },
        {
            path: '*',
            name: 'pageNotFound',
            component: NotFoundPage
        }
    ]
});

router.beforeEach(async (to, form, next) => {
    await store.dispatch('auth/getAuthUser');
    const isAuthenticated = store.getters['auth/isAuthenticated'];
    if (to.meta.publicUserOnly && isAuthenticated) {
        return next({ name: 'homePage' });
    }
    if (to.meta.requiresAuth && !isAuthenticated) {
        return next({ name: 'authUserOnly' });
    }
    next();
});

export default router;
