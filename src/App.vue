<template>
  <div>
    <router-view></router-view>
    <Top/>
  </div>
</template>

<script>
  import Top from './components/Top';
  export default {
    components: {Top},
    name : 'root',
  }
</script>

<style>

</style>
