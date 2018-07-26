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
            <h2>尺码列表</h2>
            <form @submit="search($event)">
                <input class="search" type="search" v-model="keyword" placeholder="搜" autofocus>
                <button type="submit" hidden>搜</button>
            </form>
            <button @click="show_form = !show_form" class="btn btn-outline-dark tool-bar">创建尺码</button>
            <form v-if="show_form" @submit="cou($event)">
                    <div class="input-control">
                        <label>尺码名</label>
                        <input v-validator="'required|max_length:64'" type="text" v-model="current.name">
                    </div>
                   <div class="input-control row">
                       <button class="btn operate btn-outline-secondary" type="submit">提交</button>
                       <button class="btn operate btn-outline-secondary" @click="show_form = false" type="button">取消</button>
                   </div>
                </form>
                <div class="table">
                    <table v-if="!show_form">
                    <thead>
                        <th>尺码名</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(row,index) in list">
                            <td>{{row.name}}</td>
                            <td>{{row.id}}</td>
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
           model: 'size',
           searchable : ['name'],
         }
       },
       mixins: [AdminPage],
  }
</script>

<style scoped>
</style>
