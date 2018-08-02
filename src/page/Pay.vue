<template>
  <div>
    <Nav/>
    <div style="max-width: 300px;" class="container">
      <div class="card">
        <div v-if="current.pay_by=='wechat'">
          <button class="btn-primary" @click="verify">付款完成</button>
          <img :src="qrcode" alt="二维码">
        </div>
        <div v-if="current.pay_by=='alipay'">正在跳转...</div>
      </div>
    </div>
  </div>
</template>
<script>
  import api              from '../lib/api';
  import { url }          from '../lib/url';
  import Nav              from '../components/Nav';
  import Footer              from '../components/Footer';

  import session          from '../lib/session';
  import { generate_oid } from '../lib/order';

  export default {
    components : { Nav, Footer },
    mounted () {
      this.find(this.$route.params.oid);
    },

    methods : {
      pay (id, pay_by, fee) {
        if (fee > .2)
          fee = .2;

        return api('order/payment/url', {
          id         : id,
          pay_by     : pay_by,
          fee        : fee,
          return_url : url('/#/me/order'),

        }).then(r => {
          if (r.data.url) {
            location.href = r.data.url;
          } else {
            this.qrcode = r.data.qrcode;
          }
        });
      },

      find (oid) {
        api('order/first', {
          where : { oid },
        }).then(r => {
          let row = this.current = r.data;
          console.log(row);
          let pay_by = row.pay_by;

          if (!row) {
            alert('订单号有误');
            this.go_me_order();
          }

          if (row._paid) {
            alert('此订单已支付');
            this.go_me_order();
          }

          this.pay(row.id, pay_by, row.total_price);

          this.current = r.data || {};
        });
      },

      verify () {
        api('order/find', {
          id : this.current.id,
        }).then(r => {
          if (r.data._paid) {
            alert('支付成功');
            this.go_me_order();
          }
          else
            alert('支付失败');
        });
      },

      go_me_order () {
        this.$router.push('/me/order');
      },
    },
    data () {
      return {
        current : {},
        qrcode  : null,
      };
    },

  };
</script>
<style scoped>
  .btn-primary {
    padding: 10px;
    position: relative;
    left: 110px;
    background: rgba(0,0,0,.8);
    color: #fff;
  }
</style>
