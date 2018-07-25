<template>
  <div>
    <Nav/>
    <div>
      <div class="container row">
        <div class="col-lg-3">
          <AdminNav/>
        </div>
        <div class="col-lg-9">
          <div class="content card">
            <h2>用户列表</h2>
            <div class="tool-bar">
              <div>
                <button @click="show_form=!show_form">创建用户</button>
              </div>

              <form @submit="search($event)">
                <input type="search" v-model="keyword" placeholder="搜用户名/手机/邮箱" autofocus>
                <button type="submit" hidden>搜</button>
              </form>
            </div>
            <form v-if="show_form" @submit="cou($event)">
              <div class="input-control">
                <label>用户名</label>
                <input v-validator="rule"
                       type="text"
                       v-model="current.username">
              </div>
              <div class="input-control">
                <label>密码</label>
                <input v-validator="'required|min_length:6|max_length:64'" type="password" v-model="current.password">
              </div>
              <div class="input-control">
                <label>真实姓名</label>
                <input type="text" v-model="current.real_name">
              </div>
              <div class="input-control">
                <div class="btn-group">
                  <button class="btn-primary" type="submit">提交</button>
                  <button @click="show_form=false" type="button">取消</button>
                </div>
              </div>
            </form>
            <div class="table">
              <table>
                <thead>
                <th>用户名</th>
                <th>真实姓名</th>
                <th>操作</th>
                </thead>
                <tbody>
                <tr :key="i" v-for="(row,i) in list">
                  <td>{{row.username}}</td>
                  <td>{{row.real_name}}</td>
                  <td>
                    <div class="btn-group">
                      <button class="btn-small" @click="set_current(row)">编辑</button>
                      <button class="btn-small" @click="remove(row.id)">删除</button>
                    </div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <Pagination :totalCount="total" :limit="limit" :onChange="on_page_change"/>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import AdminPage from '../../mixins/AdminPage';

  export default {
    data () {
      return {
        model      : 'user',
        searchable : [ 'username', 'realname', 'phone', 'mail' ],
      };
    },

    computed : {
      rule () {
        let def = {
          required   : true,
          username   : true,
          min_length : 4,
          max_length : 18,
          not_exist  : [ 'user', 'username' ],
        };

        if (this.is_update()) {
          def.not_exist.push(this.current.username);
        }

        return def;
      },
    },

    mixins : [ AdminPage ],
  };
</script>

<style scoped>
  

</style>
