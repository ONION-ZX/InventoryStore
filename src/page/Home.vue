<template>
    <div class="container">
        <Nav/>
        <div class="slider" v-if="swiper.length">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(it, index) in swiper" :key="index">
                    <router-link to="/search">
                        <img :src="it.name" :alt="it.desc">
                    </router-link>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>

            </swiper>
        </div>
        <div class="main">
            <div class="cat-item">
                <div class="row d_jump_new">
                    <h2>Latest Arrival</h2>
                    <div :key="i" class="col-lg-3" v-for="(row,i) in latest_arrival_list">
                        <div class="card">
                            <div class="thumbnail">
                                <img :src="get_thumbnail(row)">
                            </div>
                            <div class="info">
                                <router-link to="'/detail/'+row.id">
                                    <h4 class="title">{{row.title}}</h4>
                                </router-link>
                                <div class="desc">{{row.desc}}</div>
                                <div class="buy">
                                    <div class="price">${{row.price}}</div>
                                    <button>
                                    <router-link :to="'/detail/'+ row.id">Detail</router-link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row d_jump_hot">
                    <h2>Hot Recommend</h2>
                    <div :key="i" class="col-lg-3" v-for="(row,i) in hot_list">
                        <div class="card">
                            <div class="thumbnail">
                                <img :src="get_thumbnail(row)">
                            </div>
                            <div class="info">
                                <h4 class="title">{{row.title}}</h4>
                                <div class="desc">{{row.desc}}</div>
                                <div class="buy">
                                    <div class="price">${{row.price}}</div>
                                    <button>
                                    <router-link :to="'/detail/'+ row.id">Detail</router-link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row d_jump_sale">
                    <h2>On Sale</h2>
                    <div :key="i" class="col-lg-3" v-for="(row,i) in on_sale_list">
                        <div class="card">
                            <div class="thumbnail">
                                <img :src="get_thumbnail(row)">
                            </div>
                            <div class="info">
                                <h4 class="title">{{row.title}}</h4>
                                <div class="desc">{{row.desc}}</div>
                                <div class="buy">
                                    <div class="price">${{row.price}}</div>
                                    <button>
                                    <router-link :to="'/detail/'+ row.id">Detail</router-link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
</template>

<script>
import api from '../lib/api';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProductList from '../mixins/ProductList';
import { log } from 'async';

export default {
    components: {Nav, Footer},
    mounted() {
        this.read_on_sale();
        this.read_hot();
        this.read_latest_arrival();
        this.read_by_model('swiper');
    },
    data() {
        return {
            on_sale_list: [],
            hot_list: [],
            latest_arrival_list: [],
            swiper: [],
            swiperOption : {
                autoplay:true,
                autoplay: {
                    delay:100,
                },
                keyboard   : true,
                mousewheel : true,
                clickable  : false,
                loop       : true,
                autoplay   : true,
                pagination : {
                    el : '.swiper-pagination',
                },
            },
        }
    },
    methods: {
        read_by_model(model) {
            api(`${model}/read`)
            .then(r => {
            this[model] = r.data;
            });
        },
        read_on_sale() {
            api('product/read', {where: {on_sale: true},limit: 8})
                .then(r => {
                    this.on_sale_list = r.data;
                });
        },
        read_hot() {
            api('product/read', {where: {hot: true},limit: 8})
                .then(r => {
                    this.hot_list = r.data;
                });
        },
        read_latest_arrival() {
            api('product/read', {where: {latest_arrival: true},limit: 8})
                .then(r => {
                    this.latest_arrival_list = r.data;
                });
        },
    },
    mixins: [ ProductList],
}
</script>

<style scoped>
    .slider,
    .main {
        padding-top: 10px;
    }
    .slider img {
        margin-left: auto;
        margin-right: auto;
    }
    .card {
        margin-right: 5px;
        background: rgba(0,0,0,.08);
        padding-bottom: 23px;
    }
    .card h4 {
        color: black;
    }
    .card img:hover {
        opacity: .8;
    }
    .info {
        padding: 5px;
        height: 130px;
    }
    .info .title {
        text-align: center;
        padding: 5px;
        height: 40px;
    }

    .info .desc {
        display: block;
        height: 40px;
        text-align: center;
    }

    .row {
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .row .info {
        font-size: 15px;
    }
    .row h2 {
        margin: 5px;
        font-size: 25px;
        margin-left: 0;
    }
    .buy {
        margin-top: 30px;
        font-size: 0;
        height: 30px;
    }
    .buy > * {
        display: inline-block;
        vertical-align: center;
    }
    .buy .price {
        font-size: 15px;
        width: 70%;
    }
    .buy button {
        width: 30%;
    }
    .buy button a {
        color: rgba(0,0,0,.9);
    }
    .buy button a:hover {
        color: rgba(0,0,0,.6);
    }
</style>
