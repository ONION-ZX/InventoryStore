<template>
    <div class="container">
        <Nav/>
        <div class="col-lg-3">
            <div class="thumbnail">
                <img :src="get_thumbnail(product)">
            </div>
        </div>
        <div class="main col-lg-9">
            <div>        
                <h3>{{product.title}}</h3>
                <div><span class="col-lg-8">price </span><span class="col-lg-4 right"> {{product.price}}</span></div>
                <div><span class="col-lg-8">count </span><span class="col-lg-4 right"> {{current.count}}</span></div>
                <div><span class="col-lg-8">total </span><span class="col-lg-4 right"> {{total}}</span></div>
                <div class="pay">
                    <h3>PAY BY</h3>
                    <div class="type">
                        <label>Wechat</label>
                        <input type="radio" v-model="current.pay_by" value="wechat">
                    </div>
                    <div class="type">
                        <label>Alipay</label>
                        <input type="radio" v-model="current.pay_by" value="alipay">
                    </div>
                </div>
                <button type="submit" @click="submit">提交订单</button>
            </div>
    </div>
        <Footer/>
    </div>
</template>

<script>
import ProductList from '../mixins/ProductList';
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
            this.current.total_price = this.total; //总价
            this.current.oid = generate_oid(this.current.id); //订单号
            this.current.product_id = this.product.id;
            api('order/create', this.current)
                .then(r => {
                    this.current.id = r.data.id;
                    this.$router.push('/pay/' + r.data.oid);
                });
        },
    },
    mixins: [ProductList],
}
</script>

<style scoped>
    .main {
        padding-top: 15px;
    }
    .main h2 {
        margin: 0;
    }
    .right {
        text-align: right;
        font-size: 15px;
    }
    .pay {
        clear: both;
    }
    .pay .type {
        text-align: right;
    }
    .pay .type label {
        margin-right: 5px;
    }
    button[type="submit"] {
        float: right;
        margin-top: 10px;
    }
    .thumbnail {
        padding: 8px;
    }
    .thumbnail img {
        max-width: 80%;
    }
</style>

