<template>
  <div :style="{width: width}" class="card side-nav">
    <router-link class="nav-item" to="/admin/user">用户管理</router-link>
    <router-link class="nav-item" to="/admin/order">订单管理</router-link>
    <router-link class="nav-item" to="/admin/product">商品管理</router-link>
    <router-link class="nav-item" to="/admin/brand">品牌管理</router-link>
    <router-link class="nav-item" to="/admin/size">尺码管理</router-link>
    <router-link class="nav-item" to="/admin/size">面料管理</router-link>
    <router-link class="nav-item" to="/admin/color">颜色管理</router-link>


    <!-- <router-link class="nav-item" to="/admin/chart">质量管理</router-link> -->
  </div>
</template>

<script>
  export default {
    props : [ 'width' ],
  };
</script>

<style scoped>
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
