import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store/index';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
Vue.config.productionTip = false;

// Vue.prototype.$myVuex = mystore
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

//Vant
import {Toast, Button} from 'vant';
Vue.use(Toast);
Vue.use(Button);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
