<template>
    <div class="container">
        <Nav/>
        <div class="col-lg-4"></div>
        <div class="main col-lg-4">
            <div>
            <h1>下单</h1>
            <div>{{product.title}}</div>
            <div>单价:{{product.price}}</div>
            <div>数量:{{current.count}}</div>
            <div>总价:{{total}}</div>
            <div>
                <h3>支付方式</h3>
                <div>
                    <label>微信支付</label>
                    <input type="radio" v-model="current.pay_by" value="wechat">
                </div>
                <div>
                    <label>支付宝支付</label>
                    <input type="radio" v-model="current.pay_by" value="alipay">
                </div>
            </div>
            <button @click="submit">提交订单</button>
            </div>
            <!-- <div class="pay" v-if="show_pay">
                <h1>打钱给我</h1>
                <div v-if="current.pay_by=='wechat'">
                    <img :src="payment_url">
                </div>
                <div v-else>
                    <a :href="payment_url">{{payment_url}}</a>
                </div>
            </div> -->
        </div>
        <div class="col-lg-4"></div>
        <Footer/>
    </div>
</template>

<script>
import api from '../lib/api';
import session from '../lib/session';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { generate_oid } from '../lib/order';

export default {
    components: {Nav, Footer},
    mounted() {
        this.current = Object.assign({}, this.current, this.$route.query);

        this.find(this.current.id);
    },
    data() {
        return {
            current: {
                pay_by: 'wechat',
            },
            product: {},
            payment_url: null,
            submitted: false,
        }
    },
    computed: {
        total() {
            if(!this.product.price)
                this.product.price = 0;

            if(!this.current.count)
                this.current.count = 1;
            
            return this.product.price * this.current.count;
        },
    },
    methods: {
        find(id) {
            api('product/find', {id})
            .then(r => {
                this.product = r.data;
            });
        },
        submit(e) {
            e.preventDefault();
            this.current.user_id = session.his_id(); //提交订单的用户id
            this.current.sum = this.total; //总价
            this.current.oid = generate_oid(this.current.id); //订单号
            this.current.product_id = this.product.id;
            api('order/create', this.current)
                .then(r => {
                    this.current.id = r.data.id;
                    this.$router.push('/pay/' + r.data.oid);
                });
        },
    }
}
</script>

<style>

</style>

