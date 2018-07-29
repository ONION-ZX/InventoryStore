<template>
    <div class="container">
        <Nav/>
        <div class="slider">
            <div class="img">
               <img src="../assets/main.jpg"> 
            </div>
            <span class="desc">ANCIENS VÊTEMENTS DE MÉTIERS, TENUES OUVRIÈRES, DE CORVÉE, CURIOSITÉS VESTIMENTAIRES OPULAIRES...</span>
            <!-- <img src="../assets/sub-bg.jpg">  -->
        </div>
        <div class="main">
            <div class="cat-item">
                <div class="row">
                    <h2>Latest Arrival</h2>
                    <div :key="i" class="col-lg-3" v-for="(row,i) in main_list">
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
                                    <router-link :to="'/detail/'+row.id">Detail</router-link>
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
        this.read();
    },
    data() {
        return {
            main_list: [],
        }
    },
    methods: {
        read() {
            api('product/read')
                .then(r => {
                    this.main_list = r.data;
                    console.log(this.main_list);
                })
        }
    },
    mixins: [ ProductList ],
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
