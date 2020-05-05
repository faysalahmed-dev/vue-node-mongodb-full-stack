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
import PrivateRouterPage from '@/pages/PrivateRouterPage';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', name: 'homePage', component: HomePage },
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
            path: '/test',
            component: PrivateRouterPage,
            meta: { requiresAuth: true }
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
            component: AuthOnlyUserPage
        },
        {
            path: '*',
            name: 'pageNotFound',
            component: NotFoundPage
        }
    ]
});

router.beforeEach((to, form, next) => {
    store.dispatch('auth/getAuthUser').then(() => {
        const isAuthenticated = store.getters['auth/isAuthenticated'];
        if (to.meta.publicUserOnly && isAuthenticated) {
            return next({ name: 'homePage' });
        }
        if (to.meta.requiresAuth && !isAuthenticated) {
            return next({ name: 'authUserOnly' });
        }
        next();
    });
});

export default router;
