<template>
  <div class="card" v-if="list">
    <div class="table">
      <table>
        <thead>
        <th>Order ID</th>
        <th>Total</th>
        <th>Paid</th>
        <th>Pay By</th>
        <th>Product info</th>
        <th>Operate</th>
        </thead>
        <tbody>
        <tr :key="i" v-for="(row,i) in list">
          <td>{{row.oid || '-'}}</td>
          <td>{{row.total_price || 0}}</td>
          <td>{{row._paid ? 'Y' : 'N'}}</td>
          <td>{{row.pay_by ? row.pay_by : 'wechat'}}</td>
          <td><button @click="show_detail(row)" class="anchor">Detail</button></td>
          <td>
            <div>
              <div v-if="!row._paid" class="btn-group">
                <button>
                  <router-link :to="`/pay/${row.oid}`" class="btn-small">Pay</router-link>
                </button>
                <button>
                  <span @click="cancel(row.id)" class="anchor btn-small">Cancel Order</span>
                </button>
              </div>
              <div v-else>
                <button>
                  <span @click="remove(row.id)" class="anchor btn-small">Delete Order</span>
                </button>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="detail_visible" class="modal">
      <div @click="detail_visible=false" class="mask"></div>
      <div class="card modal-content">
        <div class=" col-lg-6 cute-form">
          <span class="value"><img :src="get_thumbnail(product)"></span>
        </div>
        <div class="col-lg-6">
        <h2>{{product.title}}</h2>
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
  </div>
  <div class="empty" v-else>
    <div>
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAUbSURBVHhe7Z1byG1TGIZ/Sradw0bbjSikyCHF3rnTTqQIOeSYUyRR7Jt9ty/2DXZEJJFEDgm5kxtx4ZQckguUQoQkRJLz4X37m+3P939zrTXnGGvNscZ8n3ou1vzXHHPO9a4xvzXHmGv9K0IIIYQQQgghhBCiRPaF+1fqBrg0cGefgv/Afyv2BbgbLJoT4KcwOoAavQgWy3XwVxjteK1+DveGRbEePgKjHf4KfrLk/gijY2u8DRbDkfB96HfyL7gd7g6XmU1wWiC/w6Pg4FwAf4J+B7+Fp8Flpy2Mu+F7btmLcDD2gHfB6FPUq/BguOy0hcHjJidDf/wXwoXDF/s1aHeEcue4swxr2ZkWRsPD0P79S7jQAn8q5OnI7gTlaetcWAMnwVnCIBvh99A+73Y4d1iYWaBZqO3GKc+lLOw10CWMhhugfe4fcK4F/kD4PLQbbWSXXQdroE8YhG/Wt6Fd5yU4F7iTvPCxG6O/wKtgLfQNo2Ez/BvadbNfwd8Ef4N2I/RjeDyshdQwGh6Edv1sBZ6NPAFt443PQI7g1kKuMAhP7d9B284dMAkWow+hbZSyUG2FxY9sdiBnGA3XQtsWX7ejYS8uhT9D2yDlYOGN8MSKPAvmDoOwwL8JbZsvw85wR2wjYzQ1jAYG7i8PLoEzwy7lPyGMzVxhNNwPbfss8PvAmXgS2pXHJt+Mx8CccMbUj2jcCacS9Q7WDI5c1upn0B4v5Xk+9wcWXqfZbbDAHwsnwnlvuxLlhWDNcDLJHzPlh5qcMODXod3GxCt4dtOodow1kK9h7musHdBv53AYEvUOOtZAKCeecnE99PMlvKzYD66hrXfQMQfyJzwOphKFwRpyHgx5GtonW8cWiL9meAWmFPi2MM6HIXwHTLruGFsgHBRkz7DLroB96BwG8b3jA/d4bIFwguket+wb2PVW0V5hRL3jYvc4RyAHQZ4vOemfy7Mh200lCoQvPkOwy++Fs9IrDPIstCu9Ba92y1IDOQL+AG2bueTcPW9VTSEKhFwJ7XLWllm21TsMTipFK9rHNDWQbdC3mdOdMIW2QFjI/d00b8BJBb53GMT3jjZTAzkDRu3mstPIaUBbIIQ9wn/qugZGJIUR9Y42c9QQDkM8BjnDmMvH4WUwlUmBENYO+3cOEh4ALUlhkOegXdnq3xE5AimZaYFEI7UcTm9IDoNEtYLLHoLspnb52AMhUYHnlG+WMMg70DbAIA6DhGMrdgMKJB6p/QJGp33endMZ3o/LCZJbYRNEgwKJiQp85JkwKwqknfugfW6kAkmkSyBRgfcqkES6BEIuh81z+U0p/4VWBZJI10DIOZDr8RYff1OIAkmkTyAWBZIZBVIYCqQwFEhhKJDCUCCFoUAKQ4EUhgIpDAVSGAqkMBRIYaQG4u/eUSCJpARyCvT3AZ8Os6JAZuMQ6CerePtp9h9SUCDT4W9K2htFKOfbt8DsKJDpPArtOvQWOBcUyGRuhvb5lHdlzg0F0k5UxN+FPIXNDQUSExVxPj4UzhUFspa94MKKuEeBrGWhRdyjQP7Pwou4R4HsgkXcf1Ng7kXco0BWGayIexTIahH3P/W6sCLuUSADF3HP2ANhjbCP6UKLuGfsgXgXXsQ9CmSXgxRxjwJZdbAi7vGB8Hfdo++J1+JH0B5v42BF3OMDGaODFnHPnnCWb5vW6uBFPOIBGO1s7fK757xCLxL+36Xod6pqlbfvFNczhBBCCCGEEEIIIYQoh5WV/wDyozm6shUFagAAAABJRU5ErkJggg==">
      <!-- <img src="data:image/png;base64,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"> -->
    </div>
    <span>No order is available</span>
    <p><router-link to="/search">Go to choose good things ⁽⁽ଘ(ˊᵕˋ)ଓ⁾⁾* </router-link></p>
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
        console.log(row);
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
      remove(id) {
        if(!confirm('delete order?')) 
          return;
        api('order/delete', {id})
          .then(r => {
            this.read();
          })
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
  .side-nav a {
    text-align: center;
  }
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
    max-width: 70%;
  }
  th {
    color: rgba(0, 0, 0, .7);
    font-size: 17px;
  }
  .empty {
    padding-top: 50px;
  }
  .empty img {
    margin-left: 200px;
  }
  .empty span {
    font-size: 20px;
    padding-top: 20px;
    display: block;
    margin-left: 154px;
  }
  .empty a {
    color:slategrey;
    margin-left: 120px;
  }
  .empty a:hover {
    color:silver;
  }
</style>
