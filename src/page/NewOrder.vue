<template>
    <div>
        <div v-if="!show_pay">
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
        <div class="pay" v-if="show_pay">
            <h1>打钱给我</h1>
            <div v-if="current.pay_by=='wechat'">
                <img :src="payment_url">
            </div>
            <div v-else>
                <a :href="payment_url">{{payment_url}}</a>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../lib/api';

export default {
    mounted() {
        // api('MODEL/FIND',{key: 'product'});
        // api('order/update', {
        //     id: 1,
        //     price: 100,
        // })
        this.get_product_id();
        this.find(this.current.id);
    },
    data() {
        return {
            current: {
                pay_by: 'wechat',
            },
            show_pay: false,
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
        get_product_id() {
            this.current = this.$route.query;
        },
        find(id) {
            if(!id)
                id = 1;
            api('product/find', {id})
            .then(r => {
                this.product = r.data;
            });
        },
        verify() {
            api('order/find', {
                id: this.current.id
            }).then(r => {
                if(r.data)
                    alert('支付成功!')
                alert('支付失败!')               
            })
        },
        submit(e) {
            e.preventDefault();
            this.show_pay = true;
            api('order/create', this.current)
                .then(r => {
                    const c = this.current;
                    c.id = r.data.id;
                    this.pay(c.id, c.pay_by, this.total);
                    this.submitted = true;
                });
        },
        pay(id, pay_by, fee) {
            if(fee > .2)
                fee = .01;
            return api('order/payment/url', {
                id: id,
                pay_by: pay_by,
                fee: fee,
            }).then(r => {
                this.payment_url = r.data.url || r.data.qrcode;
            })
        }
    }
}
</script>
