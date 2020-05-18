import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NotFoundPage from '@/pages/NotFoundPage';
import MeetupsFindPage from '@/pages/MeetupsFindPage';
import MeetupDetailsPage from '@/pages/MeetupDetailsPage';
import AuthUserOnlyPage from '@/pages/AuthUserOnlyPage';
import MeetupCreatePage from '@/pages/MeetupCreatePage';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'homePage', component: HomePage },
        {
            path: '/meetup/create-new',
            component: MeetupCreatePage,
            name: 'meetupCreatePage',
            meta: { requiresAuth: true }
        },
        {
            path: '/meetup/:meetupSlug',
            name: 'meetupDetailsPage',
            component: MeetupDetailsPage
        },
        {
            path: '/find-meetups',
            name: 'meetupsFindPage',
            component: MeetupsFindPage
        },
        {
            path: '/login',
            name: 'loginPage',
            component: LoginPage,
            meta: { publicUserOnly: true }
        },
        {
            path: '/signup',
            name: 'signupPage',
            component: SignupPage,
            meta: { publicUserOnly: true }
        },
        {
            path: '/401',
            name: 'authUserOnlyPage',
            component: AuthUserOnlyPage,
            meta: { publicUserOnly: true }
        },
        {
            path: '*',
            name: 'notFoundPage',
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
        return next({ name: 'authUserOnlyPage' });
    }
    next();
});

export default router;
