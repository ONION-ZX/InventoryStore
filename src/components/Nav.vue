<template>
    <div class="nav">
        <div class="col-lg-5 logo">
            <img src="../assets/logo.jpg">
        </div>
        <div class="col-lg-7 cat">
            <div class="col-lg-4">
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
            </div>
        </div>
    </div>
</template>

<style scoped>
.nav {
  font-size: 0;
  padding-top: 15px;
  padding-bottom: 30px;
  border-bottom: 1px solid rgba(0,0,0,.5);
}
.nav > * {
  vertical-align: middle;
}
.nav .cat {
  font-size: 0;
}
.nav .cat .col-lg-4 {
  font-size: 13px;
}

.nav .cat .col-lg-4 h4 {
  font-size: 15px;
}

.nav .cat .col-lg-4 a {
  display: block;
  cursor: pointer;
}

</style>
