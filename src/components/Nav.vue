<template>
    <div class="nav-container">
        <div class="col-lg-3 logo left">
            <router-link to="/"><img src="../assets/logo.png"></router-link>
        </div>
        <div class="col-lg-5 cat">
            <div class="nav">
                <span class="nav-item">NEW ARRIVALS</span>
                <span class="nav-item">CATEGORIES</span>
                <span class="nav-item">BRANDS</span>
                <span class="nav-item">CONTACT</span>
            </div>
        </div>
        <div class="col-lg-2">
            <div class="search">
                <input type="search" placeholder="search" autofocus>
                <i class="fas fa-search"></i>
            </div>
        </div>
        <div class="col-lg-2 log right">
            <div v-if="!uinfo">
                <router-link to="/login">Sign In</router-link>
                <i class="fas fa-sign-in-alt"></i>
            </div>
            <div v-else>
                <div @click="show_shortcut=!show_shortcut">
                    <i class="far fa-user-circle"></i>
                    <span class="nav-item user">{{uinfo.username}}</span>
                </div>
                <div class="shortcut" v-if="show_shortcut">
                    <span class="short" @click="logout">Log Out</span>
                    <router-link to="/me" class="short">Me</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import session from '../lib/session';

export default {
    data() {
        return {
            uinfo: session.uinfo(),
            show_shortcut: false,
        }
    },
    methods: {
      logout() {
        session.logout();
      },
    },
}
</script>

<style scoped>
.nav-container {
  font-size: 0;
  padding-top: 15px;
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

.log {
    text-align: center;
}

.log a {
    padding: 5px 8px;
    font-size: 14px;
    color: rgba(0,0,0,.7);
}

.user {
    padding: 5px;
}

.shortcut {
    margin-top: 5px;
    padding: 5px;
    width: 100px;
    position: relative;
    left: 51px;
    background: rgba(0,0,0,.05);
    color:rgba(0,0,0,.7);
    font-size: 12px;
}
.short {
    padding: 5px;
    display: block;
}

.short:hover {
    background:rgba(0,0,0,.3)
}


</style>
