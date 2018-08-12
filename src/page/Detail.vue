<template>
     <div class="container">
        <Nav/>
        <div class="main">
            <div class="breadcrumb">
                <div class="col-lg-9 path">
                    HOME / SALE / SIDE ROPE HENLEY NECK THERMAL SHIRTS - KHAKI WAFFLE
                </div>
                <div class="col-lg-3 neighbour">
                    <div class="col-lg-6 right"> &lt;&nbsp;Previous&nbsp;|&nbsp;</div>
                    <div class="col-lg-6 left">&nbsp;Next &gt;</div>
                </div>
            </div>
            <div class="row info">
                <div class="col col-lg-6">
                    <div class="product_flickity">
                        <img :src="get_thumbnail(detail)">
                    </div>
                </div>
                <div class="col col-lg-6">
                    <h1 class="title">{{detail.title}}</h1>
                    <div class="price">$ {{detail.price}}</div>
                    <div class="memo">You Save 70% ($ 151.20)</div>
                    <div class="size">
                        <label>SIZE</label>
                        <button>ONE SIZE</button>
                    </div>
                    <div class="count">
                        <button @click="minus">-</button>
                        <input type="text" v-model.number="count">
                        <button @click="add">+</button>
                    </div>
                    <button class="cart" type="button" @click="add_to_cart(user_id,detail.id, count)">ADD TO CART</button>
                    <router-link :to="to_new_order()" class="purchase" >PURCHASE NOW</router-link>
                    <div class="content">
                        <div class="row cat">
                            <span class="col active">DETAIL</span>
                            <span class="col">SIZE CHART</span>
                        </div>
                        <div class="row data">
                            <div class="desc col">Rumble Red No. RR_10_019
                            Side Rope Henley Neck Thermal Shirts
                            </div>
                            <ul class="col">
                                <li>Color: Khaki Waffle</li>
                                <li>100% Cotton</li>
                                <li>Made in Japan</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="related">
            <h2>Related Items</h2>
            <div class="col-lg-4">
                <div class="pad">
                    <img src="../assets/product/product6.jpg">                    
                </div>
            </div>
            <div class="col-lg-4">
                <div class="pad">
                    <img src="../assets/product/product7.jpg">                    
                </div>
            </div>
            <div class="col-lg-4">
                <div class="pad">
                    <img src="../assets/product/product5.jpg">                    
                </div>
            </div>
        </div>       
        <Footer/>
    </div>
</template>

<script>
import api from '../lib/api';
import session from '../lib/session';
import ProductList from '../mixins/ProductList';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import {add, update, product_exist, find_by_product_id} from '../hub/cart';
export default {
    components: {Nav, Footer},
    mixins: [ProductList ],
    data() {
        return {           
            detail: {},
            count: 1,
            user_id: session.uinfo().id,
        }
    },
    mounted() {
        console.log(session.uinfo());
        let id = this.get_product_id();
        this.find(id);
    },
    methods: {
        add,
        update,
        product_exist,
        add_to_cart(user_id, product_id, count) {
            if(!user_id) {
                alert('请先登录!')
                this.$router.push('/login');
            } else {
                if(product_exist(product_id)) {
                let product = find_by_product_id(product_id);
                product.count += count;
                } else {
                    add(user_id, product_id, count);
                }
            }
        },
        find(id) {
            api('product/find', {id})
                .then(r => {
                    this.detail = r.data;
                })
        },
        get_product_id() {
            return this.$route.params.id;
        },
        to_new_order() {
            if(session.logged_in()) {
                return {
                    path: '/new-order',
                    query: {
                        user_id: this.user_id,
                        id: this.$route.params.id,
                        count: this.count,
                    }
                }
            } else {
                return {
                    path: '/login',
                }
            }
        },       
        add() {
            this.count ++;
        },
        minus() {
            if(this.count >= 1)
                return --this.count;
        },
    }
}
</script>

<style scoped>
    h2 {
        margin-top: 20px;
        margin-bottom: 20px;
        line-height: 1.2;
    }
    .info .price {
        padding: 3px;
        padding-left: 0;
        font-size: 1.3rem;
    }
    .memo {
        font-size: 12px;
        color: rgba(0,0,0,.4);
    }
    .size, .info .content {
        margin-top: 35px;
    }
    .size > * {
        display: block;
    }
    .size label {
        font-size: 15px;
        font-weight: bold;
    }
    .size button {
        font-weight: bold;
        font-size: 14px;
        margin-top: 10px;
        height: 40px;
        min-width: 80px;
        background: #fff;
        border: 1px solid rgba(0,0,0,.6);
    }
    .count {
        margin-top: 10px;
    }
    .count > * {
        height: 30px;
        vertical-align: bottom;
    }
    .count input {
        padding: 0;
        text-align: center;
        border-left: 0;
        border-right: 0;
        border-top: 0;
        /* border-bottom: 1px solid rgba(0,0,0,.3); */

    }
    .count button {
        border-radius: 0;
        line-height: 1;
    }
    .size button:hover,
    .purchase:hover,
    .cart {
        background: rgba(0,0,0,.9);
        color: #fff;
    }
    .cart {
        height: 35px;
    }
    
    .cart, .purchase {
        display: block;
        margin-top: 20px;
        width: 250px;
        font-size: 13px;
    }
    .cart:hover,
    .purchase {
        background: #fff;
        border: 1px solid rgba(0,0,0,.6);
        color: rgba(0,0,0,.6);
    }
    .purchase {
        text-align: center;
        padding: 5px 0;
    }
    .data {
        padding-left: 30px;
        padding-top: 5px;
        border-top: 1px solid rgba(0,0,0,.2);
    }
    .cat .col {
        margin-right: 25px;
    }
    .data, .cat {
        color: rgba(0,0,0,.5);
        font-size: 15px;
    }

    img {
        margin-left: auto;
        margin-right: auto;
    }
    .product_flickity img {
        width: 70%;
        margin-right: 20px;
    }
    .product_gallery {
        margin-top: 10px;
    }
    .pad {
        padding-right: 5px;
    }
    .tags {
        padding: 5px;
        font-size: 12px;
        color: rgba(0,0,0,.5);
        cursor: pointer;
    }
    .detail button {
        padding: 8px;
        background: #fff;
        text-align: center;
        border: 1px solid rgba(0,0,0,.3);
        margin-bottom: 30px;
        border-radius: 5px;
    }
    .detail button:hover {
        background: rgba(0,0,0,.3);
        color: #fff;
    }
    .breadcrumb {
        cursor: pointer;
        padding: 5px;
        color: rgba(0,0,0,.4);
        font-size: 12px;
    }
    .info > * {
        vertical-align: top;
    }
    .active {
        border-bottom: 2px solid rgba(0,0,0,.5);
    }
    .related {
        margin-top: 20px;
    }
    .related h2 {
        text-align: center;
    }
</style>


