<template>
    <div class="container">
        <Nav/>     
        <div class="content">
            <h3>Search</h3>
            <div class="result">Showing 36 results for "deniem"</div>
            <!-- <SearchBar/> -->
            <div class="search">
                <div class="con">
                    <input v-model="keyword" class="col-lg-12" type="search" placeholder="search..." autofocus>
                </div>
            </div>
            <div class="row">
                <div class="col col-lg-3 cats">
                    <div class="cat-item">
                        <h4>BRAND</h4>
                        <div class="item-group">
                            <span>And WANDER</span>
                            <span>Archbes</span>
                            <span>Arpenteur</span>
                            <span>Atelier & Repairs</span>
                            <span>Bather</span>
                            <span>Begg & Co</span>
                            <span>Blue In Green</span>
                            <span>Cabane De Zucca</span>
                            <span>Arpenteur</span>  
                            <span>Atelier & Repairs</span>
                            <span>Bather</span>
                            <span>Begg & Co</span>
                            <span>Blue In Green</span>
                            <span>Cabane De Zucca</span>
                        </div>
                    </div>
                </div>
                <div class="col col-lg-9">
                    <div class="row">
                        <div :key="index" v-for="(row, index) in result" class="col-lg-3">
                            <div class="card">
                                <div class="thumbnail">
                                    <img :src="get_thumbnail(row)">
                                </div>
                                <div class="prev">
                                    <div class="title">{{row.title}}</div>
                                    <div class="price">{{row.price}}</div>
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
import SearchBar from '../components/SearchBar';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import ProductList from '../mixins/ProductList';
export default {
    components: {Nav, Footer, SearchBar},
    mounted() {
        this.prepare_search_param();
        this.search();
    },
    data() {
        return {
            result: [],
            list: {},
            search_param: {},
            keyword: '',
        }
    },
    methods: {
        prepare_search_param() {
            let query = this.$route.query;
            this.search_param = query;
        },
        search() {
            let param = this.search_param
              , brand_query
              , fabric_query
              , color_query;
            param.brand_id && (brand_query = `and "brand_id" = ${param.brand_id}`);
            param.fabric_id && (fabric_query = `and "fabric_id" = ${param.fabric_id}`);
            param.color_id && (color_query = `and "color_id" = ${param.color_id}`);
            // let query = `where("title" contains ${param.keyword})`
            // let query = `where("title" contains "${param.keyword || ''}" ${brand_query} ${fabric_query} ${color_query})`;

            api('product/read', {query:{brand_query} })
                .then(r => {
                    this.result = r.data;
                    console.log(this.result);
                })
        },
    },
    watch: {
      '$route.query': {
        deep: true,
        handler() {
          this.prepare_search_param();
          this.search();
        }
      }
    },
    mixins: [ProductList],
}
</script>

<style scoped>
    .result {
        font-size: 12px;
        color: rgba(0,0,0,.6);
    }

    .search input {
        height: 50px;
    }
    .search {
        text-align: center;
        padding: 5px;
        display: block;
        font-size: 18px;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    .con {
        padding-left: 5px;
        display: inline-block;
        border: 1px solid rgba(0,0,0,.2);
        width: 550px;
    }
    .search input {
        outline: none;
        border: 0;
    }
    .cat-item {
        padding-bottom: 15px;
        border-bottom: 1px solid rgba(0,0,0,.2);
        cursor: pointer;
        color: rgba(0,0,0,.8);
    }
    .cat-item h4 {
        margin-bottom: 10px;
    }
    .cat-item span {
        font-size: 12px;
        padding-top: 5px;
        display: block;
    }
    .item-group {
        max-height: 240px;
        overflow: auto;
    }
    .row > * {
        vertical-align: top;
    }
    .card {
        padding: 5px;
    }
    .prev {
        font-size: 12px;
    }
</style>
