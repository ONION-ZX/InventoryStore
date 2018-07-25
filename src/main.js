import './css/global.css';
import '../node_modules/@fortawesome/fontawesome-free/js/all.js';

import Vue from 'vue';
import App from './App.vue';
import Home from './page/Home';
import Detail from './page/Detail';
import Search from './page/Search';
import AdminBase from './page/admin/Base';
import User from './page/admin/User';
import Product from './page/admin/Product';
import Order from './page/admin/Order';
import Brand from './page/admin/Brand';




import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    { path: '/', component: Home},
    { path: '/detail', component: Detail},   
    { path: '/search', component: Search},       
    { path: '/admin', 
      component: AdminBase, 
      children: [
        { path: 'user', component: User},
        { path: 'product', component: Product},
        { path: 'order', component: Order},
        { path: 'brand', component: Brand},
      ],
    },
  ]
})

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: router,
}).$mount('#app')
