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
                        <img src="../assets/product/product1.jpg">
                    </div>
                    <!-- <div class="product_gallery">
                        <div class="col-lg-3">
                            <div class="pad">
                                <img src="../assets/product/product8.jpg">
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="pad">
                                <img src="../assets/product/product5.jpg">
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="pad">
                                <img src="../assets/product/product6.jpg">
                            </div>
                        </div>
                        <div class="col-lg-3">
                            <div class="pad">
                                <img src="../assets/product/product7.jpg">
                            </div>
                        </div>
                    </div> -->
                </div>
                <div class="col col-lg-6">
                    <h2 class="title">French Double Breasted Work Jackets 1950’s</h2>
                    <div class="price">$ 64.80</div>
                    <div class="memo">You Save 70% ($ 151.20)</div>
                    <div class="size">
                        <label>SIZE</label>
                        <button>ONE SIZE</button>
                    </div>
                    <button class="cart" type="button">ADD TO CART</button>
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
import Nav from '../components/Nav';
import Footer from '../components/Footer';
export default {
    components: {Nav, Footer},
}
</script>

<style scpoed>
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
    .size, .content {
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
        border-radius: 4px;
        font-size: 14px;
        margin-top: 10px;
        height: 40px;
        min-width: 80px;
        background: #fff;
        border: 1px solid rgba(0,0,0,.6);
    }
    .size button:hover {
        background: rgba(0,0,0,.9);
        color: #fff;
    }
    .cart {
        margin-top: 20px;
        width: 250px;
        height: 35px;
        background: rgba(0,0,0,.9);
        font-size: 13px;
        color: #fff;
    }
    .cart:hover {
        background: #fff;
        border: 1px solid rgba(0,0,0,.6);
        color: rgba(0,0,0,.6);
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


