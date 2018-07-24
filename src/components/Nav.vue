<template>
    <div class="nav-container">
        <div class="col-lg-3 logo left">
            <router-link to="/"><img src="../assets/logo.png"></router-link>
        </div>
        <div class="col-lg-7 cat">
            <div class="nav">
                <span class="nav-item active">DENIM</span>
                <span class="nav-item">NEW ARRIVALS</span>
                <span class="nav-item">CATEGORIES</span>
                <span class="nav-item">BRANDS</span>
                <span class="nav-item">CONTACT</span>
            </div>
            <!-- <div class="col-lg-4">
                <h4>STORE</h4>
                <a>Shop Online</a>
                <a>Latest Arrival</a>
                <a>Policies</a>
                <a>Looks</a>
            </div>
            <div class="col-lg-4">
                <h4>CONTENT</h4>
                <a>Updates</a>
                <a>Features</a>
                <a>Reviews</a>
                <a>Tumblr</a>
            </div>
            <div class="col-lg-4">
                <h4>MAGAZING</h4>
                <a>Masthead</a>
                <a>Issues</a>
                <a>Stockists</a>
                <a>Subscriptions</a>
            </div> -->
        </div>
        <div class="search">
            <input type="search" placeholder="search" autofocus>
            <i class="fas fa-search"></i>
                <!-- <i class="fas fa-cart-plus"></i> -->
                <!-- <i class="fal fa-search"></i> -->
                <!-- <i class="fas fa-american-sign-language-interpreting"></i> -->
                <!-- <i class="fas fa-grin-stars"></i> -->
        </div>
    </div>
</template>

<style scoped>
.nav-container {
  font-size: 0;
  padding-top: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(0,0,0,.5);
}
.nav-container > * {
  vertical-align: middle;
}
.nav-container .cat {
  font-size: 0;
}
.nav-container .cat .col-lg-4 {
  font-size: 13px;
}

.nav-container .cat .col-lg-4 h4 {
  font-size: 15px;
}

.nav-container .cat .col-lg-4 a {
  display: block;
  cursor: pointer;
}

img {
    width: 100%;
    margin-left: 0;
}

.nav {
    padding-left: 40px;
}

.nav .nav-item {
    font-weight: normal;
    cursor: pointer;
    font-size: 15px;
    margin-right: 13px;
    color: rgba(0,0,0,.7);
}

.nav .nav-item.active {
    color: rgba(0,0,0,.9);
    font-weight: bold;

}

.nav .nav-item:hover {
    color: rgba(0,0,0,.9);
    font-weight: bold;
}

.search {
    display: inline-block;
    font-size: 18px;
    border-bottom: 1px solid rgba(0,0,0,.5);
}

.search input {
    outline: none;
    padding: 5px;
    border: 0;
}

</style>
