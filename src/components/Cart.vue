<template>
    <div v-if="show_cart" class="container">
        <div class="cart-list">
            <div class="product" :key="i" v-for="(it, i) in list.cart">
                <div class="col-lg-4">
                    <div class="thumbnail">
                        <img :src="get_thumbnail(it.$product)">
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="detail">
                        <div class="title">{{it.$product.title}}</div>
                        <div class="count">
                            <button class="col-lg-3" @click="it.count > 1 &&it.count--">-</button>
                            <input class="col-lg-3" type="number" v-model="it.count">
                            <button class="col-lg-3" @click="it.count++">+</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="price">$ {{it.$product.price}}</div>
                    <div class="subtotal">$ {{it.$product.price * it.count}}</div>
                    <div>
                        <button class="remove contrast" @click="remove(it.id)">Remove</button>
                    </div>
                </div>
            </div>
            <div class="pay">
                <div class="compute">
                    <div class="col-lg-9 left">Subtotal:</div>
                    <div class="col-lg-3 right"> $ {{sum}}</div>
                </div>
                <button class="col-lg-12 contrast">GO TO CART</button>
            </div>
        </div>
    </div>
</template>
<script>
import ProductList from '../mixins/ProductList';
import { hub, all, remove, count } from '../hub/cart';
export default {
    props: ['show_cart'],
    data() {
        return {
            list: all(),
        };
    },
    methods: {
        count,
        remove,
    },
    computed: {
        sum() {
            let sum = 0;
            for(let i in this.list.cart) {
                let cart = this.list.cart[i];
                sum += cart.$product.price * cart.count;
            }
            return sum;
        },
    },
    mixins: [ProductList],
}
</script>

<style scoped>
    .cart-list {
        z-index: 2;
        padding: 10px;
        width: 400px;
        position: fixed;
        top: 13%;
        right: 0;
        background: #fff;
        border-left: 1px solid rgba(0,0,0,.3);
        border-bottom: 1px solid rgba(0,0,0,.3);
    }
    
    .thumbnail, .detail {
        padding-right: 10px;
    }
    .product {
        padding-top: 10px;
        padding-bottom: 8px;
        border-bottom: 1px solid rgba(0,0,0,.1);
    }
    .price {
        text-align: center;
    }
    .count {
        margin-top: 17px;
    }
    .count button {
        background: rgba(0,0,0,.03);
    }
    .count input {
        padding: 3px;
        border-left: 0;
        border-right: 0;
        text-align: center;
    }
    .pay {
        margin-top: 10px;
        padding: 5px;
    }
    .compute > * {
        font-size: 13px;
        font-weight: bold;
    }
    .remove {
        font-size: 12px;
        margin-top: 14px;
    }
    .subtotal {
        margin-top: 40px;
        font-size: 14px;
    }
</style>


