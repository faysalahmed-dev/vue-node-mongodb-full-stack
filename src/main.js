import Vue from 'vue';
import moment from 'moment';
import Buefy from 'buefy';
import router from '@/routes';
import store from '@/store';
import App from '@/App.vue';
import Spiner from '@/components/Spiner.vue';
import '@/registerServiceWorker';
import _ from 'lodash';

import '@/sass/styles.scss';
Vue.use(Buefy);

Vue.filter('formatTime', (value, formateType = 'LL') => {
    if (!value) return '';
    return moment(value).format(formateType);
});

Vue.filter('countWord', value => {
    if (!value) return 0;
    return _.words(value).length;
});
Vue.filter('buildImagePath', value => {
    if (!value) return '';
    if (value.startsWith('http' || 'https')) {
        return value;
    }
    return 'http://localhost:3001/' + value;
});

Vue.component('Spiner', Spiner);

Vue.config.productionTip = true;
Vue.config.performance = true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
