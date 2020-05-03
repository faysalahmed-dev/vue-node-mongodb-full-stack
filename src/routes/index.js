import Vue from 'vue';
import VueRouter from 'vue-router';

import HomePage from '@/pages/HomePage';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage';
import NotFoundPage from '@/pages/NotFoundPage';
import FindMeetupsPage from '@/pages/FindMeetupsPage';
import MeetupDetailsPage from '@/pages/MeetupDetailsPage';

Vue.use(VueRouter);

export default new VueRouter({
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
            path: '/login',
            name: 'login',
            component: LoginPage
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupPage
        },
        {
            path: '*',
            name: 'pageNotFound',
            component: NotFoundPage
        }
    ]
});
