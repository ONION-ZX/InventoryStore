import './css/global.css';
import './css/swiper.css';

import '../node_modules/@fortawesome/fontawesome-free/js/all.js';

//swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import Home from './page/Home';
import Detail from './page/Detail';
import Me from './page/Me';
import MeSetting from './page/MeSetting';
import MeOrder from './page/MeOrder';


import Search from './page/Search';
import NewOrder from './page/NewOrder';
import NewCartOrder from './page/NewCartOrder';
import Pay from './page/Pay';
import Login from './page/Login';
import Signup from './page/Signup';


import AdminBase from './page/admin/Base';
import User from './page/admin/User';
import Cart from './page/admin/Cart';
import Product from './page/admin/Product';
import Order from './page/admin/Order';
import Brand from './page/admin/Brand';
import Size from './page/admin/Size';
import Fabric from './page/admin/Fabric';
import Color from './page/admin/Color';
import Swiper from './page/admin/Swiper';


import Router from 'vue-router';

Vue.use(Router);
Vue.use(Vuex);
Vue.use(VueAwesomeSwiper, /* { default global options } */)


const router = new Router({
  routes: [
    { path: '/', component: Home},
    { path: '/login', component: Login},
    { path: '/signup', component: Signup}, 
    { path: '/detail/:id', component: Detail},  
    { path: '/search', component: Search}, 
    { path: '/login', component: Login}, 
    { path: '/signup', component: Signup}, 
    { path: '/new-order', component: NewOrder},  
    { path: '/new-cartorder', component: NewCartOrder},  
    { path: '/pay/:oid', component: Pay},    
    { path: '/me', 
      component: Me,
      children: [
        { path: 'setting', component: MeSetting},  
        { path: 'order', component: MeOrder}, 
      ]
     },   

    { path: '/admin', 
      component: AdminBase, 
      children: [
        { path: 'user', component: User},
        { path: 'product', component: Product},
        { path: 'order', component: Order},
        { path: 'brand', component: Brand},
        { path: 'size', component: Size},
        { path: 'fabric', component: Fabric},
        { path: 'color', component: Color},
        { path: 'swiper', component: Swiper},
        { path: 'cart', component: Cart}, 
      ],
    },
  ]
})

const store = new Vuex.Store({
  state     : {
    show_cart: false,
    count : 1,
    price : 10,
    info  : null,
  },
  mutations : {
    detect_show_cart(state) {
      state.show_cart = !state.show_cart;
    },
  },
  getters   : {
    total (state) {
      return state.price * state.count;
    },
  },
  actions   : {
    increment_timer (store) {
      setInterval(() => {
        store.commit('increment');
      }, 500);
    },

    get_data (store) {
      api('product/read')
        .then(r => store.state.info = r.data);
    },
  },
})

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router: router,
  store,
}).$mount('#app')
