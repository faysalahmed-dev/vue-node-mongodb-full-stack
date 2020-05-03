import Vue from 'vue';
import Vuelidate from 'vuelidate';
import router from '@/routes';
import store from '@/store';
import App from './App.vue';
import moment from 'moment';
import Spiner from './components/Spiner.vue';
import './registerServiceWorker';

import './sass/styles.scss';

Vue.filter('formatTime', (value, formateType = 'LL') => {
    if (!value) return '';
    return moment(value).format(formateType);
});

Vue.component('Spiner', Spiner);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
