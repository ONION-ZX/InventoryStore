<template>
    <div class="container">
        <Nav/>
        <div class="slider">
            <swiper :options="swiperOption">
                <swiper-slide v-for="(it, index) in swiper" :key="index">
                    <img :src="it.name" :alt="it.desc">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <!-- <div class="slider">
            <div class="img" :key="i" v-for="(row,i) in swiper">
               <img :src="row.name"> 
            <span class="desc">{{row.desc}}</span>
            </div>
        </div> -->
        <div class="main">
            <div class="cat-item">
                <div class="row">
                    <h2>Latest Arrival</h2>
                    <div :key="i" class="col-lg-3" v-for="(row,i) in product">
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

export default {
    components: {Nav, Footer},
    mounted() {
        // this.read();
        // this.read_swiper();
        this.read_by_model('product');
        this.read_by_model('swiper');
    },
    data() {
        return {
            product: [],
            swiper: [],
            swiperOption : {
                // keyboard   : true,
                // mousewheel : true,
                // clickable  : false,
                // loop       : true,
                autoplay   : true,
                pagination : {
                    el : '.swiper-pagination',
                },
            },
            // swiperSlides : [ 1, 2, 3 ],
        }
    },
    methods: {
        read_by_model(model) {
            api(`${model}/read`)
            .then(r => {
            this[model] = r.data;
            });
        },
        // read() {
        //     api('swiper/read')
        //         .then(r => {
        //             this.main_list = r.data;
        //         })
        // },
        
    },
    mixins: [ ProductList],
}
</script>

<style scoped>
    .desc {
        display: block;
        padding: 15px;
        padding-top: 5px;
        padding-left: 0;
        text-align: center;
    }
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
        background: rgba(0,0,0,.1);
        padding-bottom: 10px;
    }
    .info {
        padding: 5px;
        height: 130px;
    }

    .row {
        margin-top: 10px;
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
        font-size: 0;
    }
    .buy > * {
        display: inline-block;
    }
    .buy .price {
        font-size: 15px;
        width: 70%;
    }
    .buy button {
        width: 30%;
    }
</style>
