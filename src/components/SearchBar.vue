<template>
  <form class="search" @submit.prevent="search();submit()" v-if="show_form">
    <input type="search"
           placeholder="搜"
           @keyup="change"
           v-model="kwd">
    <i class="fas fa-search"></i>
  </form>
</template>

<script>
  export default {
    props: ['onChange', 'onSubmit', 'keyword'],
    data() {
      return {
        show_form: true,
        kwd: '',
      };
    },
    methods: {
      change() {
        if(this.onChange)
          this.onChange(this.kwd);
      },
      submit() {
        if(this.onChangeSubmit)
          this.onSubmit(this.kwd);
      },
      search() {
        this.$router.push({
          path: '/search',
          query: {keyword:this.kwd},
        });
      }
    },
    watch: {
      keyword(n) {
        this.kwd = n;
      }
    }
  }
</script>


<style scoped>
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
  .search-bar {
    /* position: relative; */
    border: 1px solid rgba(0,0,0,.1);
    /* width: 200px; */
    display: inline-block;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .search-bar input {
    padding-left: 3px;
    border: 0;
    height: 30px;
    width: 80%;
    outline: 0;
  }

  .search-bar [type="submit"] {
    height: 30px;
    border: 0;
    border-left: 1px solid rgba(0,0,0,.1);
    width: 20%;
    padding: 0;
  }
</style>
