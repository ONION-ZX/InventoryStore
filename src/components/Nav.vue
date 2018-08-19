<template>
    <div class="container">
        <div class="nav-container">
            <div class="col-lg-3 logo left">
                <router-link to="/"><img src="../assets/logo.png"></router-link>
            </div>
            <div class="col-lg-5 cat">
                <div class="nav">
                    <span class="nav-item" @click="jump('.d_jump_new')">NEW ARRIVALS</span>
                    <span class="nav-item" @click="jump('.d_jump_hot')">HOT</span>
                    <span class="nav-item" @click="jump('.d_jump_sale')">DISCOUNT</span>
                    <span class="nav-item">CONTACT</span>
                </div>
            </div>
            <div class="col-lg-2">
                <!-- <SearchBar/> -->
                <form @submit.prevent="$router.push({path: '/search', query: {keyword}})" 
                    class="search">
                    <input v-model="keyword" type="search" placeholder="search" autofocus>
                    <i class="fas fa-search"></i>
                    <button type="submit" hidden></button>
                </form>
            </div>
            <div class="col-lg-2 log right">
                <div v-if="!uinfo">
                    <router-link to="/login">Sign In</router-link>
                    <i class="fas fa-sign-in-alt"></i>
                    <div class="test">请登录测试账号: admin 密码: yoyoyo</div>
                </div>
                <div v-else>
                    <div class="icon" @click="show_shortcut=!show_shortcut">
                        <i class="far fa-user-circle"></i>
                    </div>
                    <div class="cart" @click="show_cart=!show_cart">
                        <i class="fas fa-cart-arrow-down"></i>
                    </div>
                    <Cart :show_cart="show_cart" v-if="show_cart"/>
                    <div class="shortcut" v-if="show_shortcut">
                        <div class="short">
                            <span><router-link to="/me/order">Profile</router-link></span>
                            <i class="fas fa-smile-wink"></i>
                        </div>
                        <div class="short" @click="logout">
                            <span>Log Out</span>
                            <i class="fas fa-sign-out-alt"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Cart from './Cart';
import { count } from '../hub/cart';
import session from '../lib/session';

export default {
    components: { Cart },
    mounted() {
        count();
    },
    data() {
        return {
            keyword: null,
            show_cart: false,
            uinfo: session.uinfo(),
            show_shortcut: false,
            counts: count(),
        }
    },
    methods: {
      count,
      logout() {
        session.logout();
      },
      jump(selector) {
        let jump = document.querySelector(selector)
        // 获取需要滚动的距离
        let total = jump.offsetTop;
        let distance = document.documentElement.scrollTop || document.body.scrollTop;
        let step = total / 50;
        if(total > distance){
            smoothDown();
        } else {
            let newTotal = distance - total
            step = newTotal / 50
            smoothUp()
        }
        function smoothDown() {
            if (distance < total) {
            distance += step
　　　　　　　document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            setTimeout(smoothDown, 10)
          } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
          }
        }
        function smoothUp() {
            if (distance > total) {
            distance -= step
　　　　　　　document.body.scrollTop = distance
            document.documentElement.scrollTop = distance
            setTimeout(smoothUp, 10)
          } else {
            document.body.scrollTop = total
            document.documentElement.scrollTop = total
          }
        }
      }
    },
}
</script>

<style scoped>
.search {
    display: inline-block;
    font-size: 18px;
    border-bottom: 1px solid rgba(0,0,0,.5);
}

.search input {
    outline: none;
    padding: 5px;
    border: 0;
}
.test {
    font-size: 12px;
    padding-top: 5px;
}
.nav-container {
  font-size: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0,0,0,.5);
}
.nav-container > * {
  vertical-align: middle;
}
.nav-container .cat {
  font-size: 0;
}
.nav-container .cat .col-lg-4 {
  font-size: 13px;
}

.nav-container .cat .col-lg-4 h4 {
  font-size: 15px;
}

.nav-container .cat .col-lg-4 a {
  display: block;
  cursor: pointer;
}

img {
    width: 100%;
    margin-left: 0;
}

.nav {
    padding-left: 40px;
}

.nav .nav-item {
    font-weight: normal;
    cursor: pointer;
    font-size: 15px;
    margin-right: 13px;
    color: rgba(0,0,0,.7);
}

.nav .nav-item.active {
    color: rgba(0,0,0,.9);
    font-weight: bold;

}

.nav .nav-item:hover {
    color: rgba(0,0,0,.9);
    font-weight: bold;
}

.log {
    text-align: center;
}

.log a {
    font-size: 14px;
    color: rgba(0,0,0,.7);
    padding-right: 5px;
}

.user {
    padding: 5px;
}

.shortcut {
    padding: 5px;
    width: 100px;
    position: absolute;
    left: 79%;
    background: rgba(0,0,0,.09);
    color:rgba(0,0,0,.7);
    font-size: 12px;
    top: 24px;
}
.short {
    padding: 5px;
    font-size: 14px;

}
.short span {
    padding-right: 5px;
}

.short:hover {
    background:rgba(0,0,0,.3)
}

.icon {
    position:relative;
    padding-left: 126px;
    padding-right: 20px;

}

.icon, .cart {
    display: inline-block;
    font-size: 1.2rem;
}

.cart {
    text-align: right;
}
.count {
    font-size: 12px;
    padding-left: 5px;
}

</style>
