import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '@/pages/HomePage';
import MeetupDetailsPage from '@/pages/MeetupDetailsPage';
import FindMeetupsPage from '@/pages/FindMeetupsPage';
import NotFoundPage from '@/pages/NotFoundPage';

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
            path: '*',
            name: 'pageNotFound',
            component: NotFoundPage
        }
    ]
});
