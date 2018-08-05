<template>
    <div class="container">
        <Nav/>
        <div :key="i" v-for="(it,i) in product_list">
            <div class="col-lg-3">
                <div class="thumbnail">
                    <img :src="get_thumbnail(it.$product)">
                </div>
            </div>
            <div class="main col-lg-9">
                <div>        
                    <h3>{{it.$product.title}}</h3>
                    <div><span class="col-lg-8">price: </span><span class="col-lg-4 right">$ {{it.$product.price}}</span></div>
                    <div><span class="col-lg-8">count: </span><span class="col-lg-4 right"> {{it.count}}</span></div>
                    <div><span class="col-lg-8">subtotal: </span><span class="col-lg-4 right"> {{it.count * it.$product.price}}</span></div>
                </div>
            </div>
        </div>
        <div class="total">
            <div><span class="col-lg-12 right">total: {{total}}</span></div>
        </div>
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
        this.current.id.forEach((id) => {
            id = parseInt(id);
            this.cart_id_list.push(id);
        });
        this.find();
    },
    data() {
        return {
            current: {
                pay_by: 'wechat',
            },
            with:[
                {model: 'product', relation: 'has_one'},
            ],
            product: {},
            cart_id_list: [],
            product_list: [],
            cart_list: [],
            payment_url: null,
            submitted: false,
        }
    },
    computed: {
        total() {
            let total = 0;
            this.product_list.forEach(it => {
                if(!it)
                    it.price = 0
                total += it.$product.price * it.count;
            })            
            return total;
        },
    },
    methods: {
        find() {
            for(let i in this.cart_id_list) {
                let id = this.cart_id_list[i];
                api('cart/find',{id,with: this.with})
                    .then(r => {
                        this.current.id = r.data.id;
                        this.product = r.data;
                        this.product_list.push(this.product);
                    })
            }
        },
        submit(e) {
            e.preventDefault();
            this.current.user_id = session.his_id(); //提交订单的用户id
            this.current.total_price = this.total; //总价
            this.current.oid = generate_oid(this.current.id); //订单号
            this.current.product_info = this.product_list;
            api('order/create',this.current)
                .then(r => {
                    this.current.id = r.data.id;
                    console.log(r)
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

