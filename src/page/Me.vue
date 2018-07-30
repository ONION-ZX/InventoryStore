<template>
  <div>
    <Nav/>
    <div class="container">
      <div class="row">
        <div class="col-lg-3">
          <div class="card side-nav">
            <router-link to="/me/order" class="nav-item" relative>我的订单</router-link>
            <router-link to="/me/setting" class="nav-item" relative>设置</router-link>
          </div>
        </div>
        <div class="col-lg-9">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import Nav     from '../components/Nav';
  import Footer  from '../components/Footer';
  import api     from '../lib/api';
  import session from '../lib/session';

  export default {
    components : { Nav, Footer },
  };
</script>

<style scoped>
  .main-form {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
  }

  .footer {
    margin-top: 20px;
  }

  .tab-title {
    color: #777;
    margin-bottom: 10px;
  }

  .tab-title > * {
    cursor: pointer;
    padding: 5px;
  }
  .nav-item {
    display: block;
    text-decoration: none;
    color: rgba(0,0,0,.5);
    font-size: 15px;
    padding: 10px 20px;

  }
  .side-nav {
  background: #fff;
  }

.nav-item:hover {
  color: rgba(0,0,0,.9);
  text-decoration: none;
}

</style>
