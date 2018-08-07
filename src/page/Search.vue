<template>
    <div class="container">
        <Nav/>     
        <div class="content">
            <h3>Search</h3>
            <div class="result">Showing 36 results for "deniem"</div>
            <!-- <SearchBar/> -->
            <form @submit.prevent="search(keyword)" class="search">
                <div class="con">
                    <input v-model="keyword" class="col-lg-12" type="search" placeholder="search..." autofocus>
                    <button type="submit" hidden></button>
                </div>
            </form>
            <div class="row">
                <div class="col col-lg-3 cats">
                    <div class="cat-item">
                        <h4>BRAND</h4>
                        <div class="item-group">
                            <span @click="set_condition('brand_id', brand.id);search()" v-for="(brand,i) in brand_list" :key="i">{{brand.name}}</span>
                        </div>
                    </div>
                    <div class="cat-item">
                        <h4>FABRIC</h4>
                        <div class="item-group">
                            <span @click="set_condition('fabric_id', fabric.id);search()" v-for="(fabric,i) in fabric_list" :key="i">{{fabric.name}}</span>
                        </div>
                    </div>
                </div>
                <div class="col col-lg-9">
                    <div class="empty" v-if="!result">
                        <h1>Not Found</h1>
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAOqSURBVGhD7Zl7qBVFHIBPapphgoKGBqFoJb5A/ctMolIUH0VCpSA+QMG3ZogJYRBqhvj6wyhCI6NQ8Y8SpBQlwkeYJEqJpj0wwSKhLN9vv289c7nKPefs7jmXcy7sBx844+7snJ2Z3/5mbi4jIyMjI6MJ0AFfxNn4Nr6O43AANsOapgVOwG/xFt4u4Bn8AJ/EmuNpPIqhs//jV7gG38L3cCMew3DNdXwf22FNMAevoZ37AV/DllgIR2I1XkXvOYFPYVVZhHbGTvmDksz/LrgPvf9f7ItV4VW0E+fwGStS0Ao/Rds5hQaJRuEJHIMu4sHogpbH8D90nj9vRRk0x93oj9luRSWxc9+jjdf3D5yCLlzLS7EStMezaJvlvpg65uJNtNG/cAtuwL14A8OPMow+hJXC59runqhUJi+h3wCj0DwMUynQEw+iDzSsVhIjnevN53e2Ii025IKzk+OtKMDDuAtdJ5XmM/T506NSSkajjXwTlYrjAm0MpqJ9+DAqpWQZlv02ymQ42odtUSkhTpUF+CfaiCMTh07Y9u4/Y/E4+qxi9Ef78F1USsBA/A29WQ9gnC+sKYbXX8QRVhThAfwcvf4f9JmFeBa9zkX/MU7CNliUUXgZvdGhNCLFwZjvPcFS4dJ261+/GQsxFutfq6YvhuYG12Uv9G164UIrEmB0882GBxlpimHaEV6YrsRSdMTn0HQ/JJdfYmusw6EOydoqK1IwCL9Gh/9RK0owEneiaXuSdSU98Ge0v1vR/ke8gFb+ipX8MjcmvqzTaL8nWyHr0Yr5UanpYFCx379jtF6O5yviLu64mJIbYg2hrsE4Uy4pP6J9j7YNF/KFSkwrI9gbaDZwBW23viaWBoNhWIlDhxVou29auJQv+AbTYmxfgiHyqXuTX9CP2RE0cw7/pz+hX+5y8FTGtjwLiPbIFrpZSEEfDG2Y7n+BZs2P4P10R0fsJIYfZB6Vdja4rm1juYVN+cI0Cwl5GcMomM73wzi4HZiJ59F7zSDSbGtDoJphwVMOC4cxybz12Casg3WYZmr2xvBN+MSKBDiKf6P3ugXPPYhhqJ1zcfFH+6VNck9DOBIeODi6SQgnNvujUh7zLHdifv7jZrvVZAjaV/vsIcg9uFX1F7oPfxdLZplVwNnjljvkW4uxQcwqw4GCiaDz1oX0SpWdiCaXYevtSLyDdXlWQxh5dqA31KKHcCjGpivOwrVoiPYYqFp+hE59/wxRdBQyMjIyMjIymj653B2ohkAKuuW/hwAAAABJRU5ErkJggg==">
                    </div>
                    <div class="row" v-else>
                        <div :key="index" v-for="(row, index) in result" class="col-lg-3">
                            <div class="card">
                                <div class="thumbnail">
                                    <img :src="get_thumbnail(row)">
                                </div>
                                <div class="prev">
                                    <router-link :to="'/detail/' + row.id" class="title">{{row.title}}</router-link>
                                    <div class="price">
                                         <span class="col-lg-6 left">$ {{row.price}}</span>
                                         <div class="col-lg-6 right">
                                             <button class="contrast">
                                            <router-link :to="'/detail/' + row.id">Detail</router-link>
                                            </button>
                                         </div>
                                    </div>
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
        this.search(this.$route.query.keyword);
        this.list_brand();
        this.list_fabric();
    },
    data() {
        return {
            search_param: {},
            brand_list: [],
            fabric_list: [],
            result: [],
            list: {},
            keyword: '',
        }
    },
    methods: {
        search (keyword) {
            let brand_id = this.$route.query.brand_id || '';
            let fabric_id = this.$route.query.fabric_id || '';
            let brand_query = brand_id ? `and "brand_id" = ${brand_id}`: '';
            let fabric_query = fabric_id ? `and "fabric_id" = ${fabric_id}`: '';

            let query = `where("title" contains "${keyword || ''}" ${brand_query} ${fabric_query})`
            api('product/read', { query}).then(r => this.result = r.data)
        },
        list_brand() {
            api('brand/read')
                .then(r => this.brand_list = r.data);
        },
        list_fabric() {
            api('fabric/read')
                .then(r => this.fabric_list = r.data);
        },
        set_condition(type, value) {
            let condition = {};
            condition[type] = value;

            let o = this.search_param;
            let n = Object.assign({}, o, condition);
            this.$router.replace({query: n});
        },
    },
    mixins: [ProductList],
    watch: {
        search_param: {
            deep: true,
            handler() {
                this.search;
            }
        },
    },
}
</script>

<style scoped>
    button {
        line-height: 1;
    }
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
        height: 312px;
        padding-bottom: 10px;
    }
    .card .left {
        text-align: left;
    }
    .prev {
        height: 68px;
        padding-bottom: 5px;
    }
    .prev > * {
        text-align: center;
        padding-top: 7px;
        padding-bottom: 5px;
    }
    .prev a {
        height: 30px;
        display: block;
        font-size: 16px;
        color: black;

    }
    .prev .title:hover {
        color:#999;
    }
    .prev .price{
        padding-right: 8px;
        height: 30px;
        font-size: 14px;
        margin-top: 28px;
    }
    .price > * {
        display: inline-block;
        vertical-align: center;
    }
    .price a {
        height: 18px;
    }
    .price button a {
        color: #fff;
        font: 13px sans-serif;
    }
    .price button a:hover {
        color: black;
        
    }
    .empty {
        position: relative;
        left: 26%;
        padding-top: 30px;
        color:#555;

    }
    .empty h1 {
        margin-right: 10px;
        display: inline-block;
        font-weight: normal;
    }
    .empty img {
        position: relative;
        top: 10px;
        display: inline-block;
    }
    .contrast {
        background: rgba(0,0,0,.6);
    }

</style>
