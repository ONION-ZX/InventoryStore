<template>
  <div>
    <Nav/>
    <div>
      <div class="container row">
        <div class="col-lg-3">
          <AdminNav/>
        </div>
        <div class="col-lg-9">
          <div class="content-card">
            <h2>首页轮播图列表</h2>
            <form @submit="search($event)">
                <input class="search" type="search" v-model="keyword" placeholder="搜" autofocus>
                <button type="submit" hidden>搜</button>
            </form>
            <button @click="show_form = !show_form" class="btn btn-outline-dark tool-bar">新增轮播图</button>
            <form v-if="show_form" @submit="cou($event)">
                    <div class="input-control">
                        <label>轮播图地址</label>
                        <input type="text" v-model="current.name">
                    </div>
                    <div class="input-control">
                        <label>描述</label>
                        <input type="text" v-model="current.desc">
                    </div>
                   <div class="input-control row">
                       <button class="btn operate btn-outline-secondary" type="submit">提交</button>
                       <button class="btn operate btn-outline-secondary" @click="show_form = false" type="button">取消</button>
                   </div>
                </form>
                <div class="table">
                    <table v-if="!show_form">
                    <thead>
                        <th>轮播图</th>
                        <th>大图地址</th>
                        <th>描述</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        <tr class="row" :key="index" v-for="(row,index) in list">
                            <td class="img">
                                <img :src="row.name">
                            </td>
                            <td><a :href="row.name">{{row.name}}</a></td>
                            <td>{{row.desc}}</td>
                            <td>
                                <div class="btn-group operate">
                                  <button class="btn-small operate" @click="remove(row.id)">删除</button>
                                  <button class="btn-small operate" @click="update(row)">编辑</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
              </table>
            </div>
          </div>
          <Pagination v-if="!show_form" :showForm="!show_form" :totalCount="total" :limit="limit" :onChange="on_page_change"/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import AdminPage from '../../mixins/AdminPage';

  export default {
       data() {
         return {
           model: 'swiper',
           searchable : ['name'],
         }
       },
       mixins: [AdminPage],
  }
</script>

<style scoped>
img {
    /* max-width: 50%; */
    margin: 0;
    display: inline-block;
}
.img {
    width: 250px;
}
</style>
