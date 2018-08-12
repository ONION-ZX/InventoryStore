<template>
  <div class="card">
    <div class="table">
      <table>
        <thead>
        <th>订单号</th>
        <th>总价</th>
        <th>已付款</th>
        <th>产品信息</th>
        <th>操作</th>
        </thead>
        <tbody>
        <tr :key="i" v-for="(row,i) in list">
          <td>{{row.oid || '-'}}</td>
          <td>{{row.sum || 0}}</td>
          <td>{{row._paid ? '是' : '否'}}</td>
          <td><span @click="show_detail(row)" class="anchor">详情</span></td>
          <td>
            <div>
              <div v-if="!row._paid" class="btn-group">
                <button>
                  <router-link :to="`/pay/${row.oid}`" class="btn-small">去付款</router-link>
                </button>
                <button>
                  <span @click="cancel(row.id)" class="anchor btn-small">取消订单</span>
                </button>
              </div>
              <div v-else>-</div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="detail_visible" class="modal">
      <div @click="detail_visible=false" class="mask"></div>
      <div class="card modal-content">
        <h2>{{product.title}}</h2>
        <div class="cute-form">
          <span class="value"><img :src="get_thumbnail(product)"></span>
        </div>
        <div class="cute-form">
          <span class="key">BRAND: </span>
          <span class="value">{{product.$brand.name || '-'}}</span>
        </div>
        <div class="cute-form">
          <span class="key">PRICE: </span>
          <span class="value">$ {{product.price || '-'}}</span>
        </div>
        <div class="cute-form">
          <span class="key">COLOR: </span>
          <span class="value">{{product.$color.name || '-'}}</span>
        </div>
        <div class="cute-form">
          <span class="key">SIZE: </span>
          <span class="value">{{product.$size.name || '-'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProductList from '../mixins/ProductList';
  import Pagination from '../components/Pagination';
  import api     from '../lib/api';
  import session from '../lib/session';

  export default {
    components: { Pagination },
    mounted () {
      this.read();
    },

    data () {
      return {
        current:{},
        product:{},
        list:[],
        with: [
               {relation: 'has_one', model: 'brand'},
               {relation: 'has_one', model: 'size'},
               {relation: 'has_one', model: 'fabric'},
               {relation: 'has_one', model: 'color'},  
           ],
        detail_visible : false,
      };
    },

    methods : {
      show_detail (row) {
        this.current        = row;
        this.detail_visible = true;
        this.find_product(row.product_id);
      },

      find_product (product_id) {
        api('product/find', { id : product_id ,with: this.with})
          .then(r => {
            this.product = r.data;
          });
      },

      read () {
        api('order/read', {
          with  : 'has_one:product',
          where : { user_id : session.his_id() },
        }).then(r => {
          this.list = r.data;
        });
      },

      cancel (id) {
        if (!confirm('是否要取消此订单？'))
          return;

        api('order/delete', { id })
          .then(r => {
            this.read();
          });
      },
    },
    mixins: [ ProductList ],
  };
</script>

<style scoped>
  .modal-content {
    padding: 15px;
    position: fixed;
    background: #fff;
    width: 500px;
    top: 100px;
    margin-left: 0;
    margin-right: 0;
    z-index: 1;
  }

  .mask {
    background: rgba(0, 0, 0, .6);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .btn-group button {
    border: 0;
  }
  .btn-group button:hover {
    border-bottom: 2px solid rgba(0, 0, 0, .6);
  }
  
  .btn-group button:first-child {
    border-right: 0;
  }
  .btn-group button > * {
    color: rgba(0, 0, 0, .6);
  }
  .value img {
    max-width: 50%;
  }
</style>
