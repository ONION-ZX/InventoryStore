<template>
     <div class="container">
        <Nav/>
        <div class="detail">
            <h2 class="title">1940's FRENCH BLUE MOLESKIN FADED WORK JACKET, CLASSIC BRAND "LE MONT ST MICHEL" - Ancienne veste de travail en moleskine bleue, "Le Mont St Michel", France vers 1940</h2>
            <div class="img-group">
                <img src="../assets/detail1.jpg">
                <img src="../assets/detail2.jpg">
                <img src="../assets/detail3.jpg">
            </div>
            <div class="tags">
                <span>tags:</span>
                <a>#1940 </a>
                <a>#Bleu </a>
                <a>#WWII </a>
                <a>#Bourgeron</a>
            </div>
            <button class="col-lg-12" type="button">ADD TO CART</button>
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

<style>
    .title {
        padding: 10px;
        text-align: center;
    }
    img {
        margin-left: auto;
        margin-right: auto;
        margin-top: 10px;
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
</style>


