import './css/global.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all.js';

import Vue from 'vue';
import App from './App.vue';
import Home from './page/Home';
import Detail from './page/Detail';
import Search from './page/Search';

import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {path: '/', component: Home},
    {path: '/detail', component: Detail},   
    {path: '/search', component: Search},       
  ]
})

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
