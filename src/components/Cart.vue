<template>
    <div v-if="show_cart" class="container">
        <div class="cart">
            <div class="product">
                <div class="col-lg-4">
                    <div class="thumbnail">
                        <img src="../assets/product/product1.jpg">
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="detail">
                        <div class="title">French Navy Deck Jacket</div>
                        <div class="count">
                            <button class="col-lg-3">-</button>
                            <input class="col-lg-3" type="number">
                            <button class="col-lg-3">+</button>
                        </div>
                    </div>
                </div>
                <div class="col-lg-2">
                    <div class="price">$ 125</div>
                    <div class="subtotal">$ 1250</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['show_cart'],
    data() {
        return {
        }
    }
}
</script>

<style scoped>
    .cart {
        padding: 10px;
        width: 350px;
        height: 500px;
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
    }
    .subtotal {
        margin-top: 43px;
    }
</style>


