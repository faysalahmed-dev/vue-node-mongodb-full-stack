import Vue from 'vue';
import router from '@/routes';
import App from './App.vue';
import moment from 'moment';
import './registerServiceWorker';

Vue.filter('formatTime', (value, formateType = 'LL') => {
    if (!value) return '';
    return moment(value).format(formateType);
});

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
