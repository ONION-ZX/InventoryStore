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
            <h2>订单列表</h2>
            <div class="tool-bar">
              <div>
                <button @click="show_form=!show_form">创建订单</button>
              </div>

              <form @submit="search($event)">
                <input type="search" v-model="keyword" placeholder="搜订单" autofocus>
                <button type="submit" hidden>搜</button>
              </form>
            </div>
            <form v-if="show_form" @submit="cou($event)">
              <div class="input-control">
                <label>下单用户</label>
                <Dropdown :onSelect="set_order_user" :api="'user.username,realname'" :list = "user_list" displayKey="username" ref="edit_publisher"/>                
              </div>
              <div class="input-control">
                <label>订单id</label>
                <input v-validator="'required'"
                       type="text"
                       v-model="current.id">
              </div>
              <div class="input-control">
                <label>支付方式</label>
                <input v-validator="'required'" type="text" v-model="current.pay_by">
              </div>
              <div class="input-control">
                <label>备注</label>
                <input type="text" v-model="current.memo">
              </div>
              <div class="input-control">
                <label>合计</label>
                <input type="text" v-model="current.total_price">
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
                <th>订单id</th>
                <th>品牌</th>
                <th>支付方式</th>
                <th>备注</th>
                <th>总价</th>
                <th>操作</th>
                </thead>
                <tbody>
                <tr :key="i" v-for="(row,i) in list">
                  <td>{{row.$user ? row.$user.username : '-'}}</td>
                  <td>{{row.id || '-'}}</td>
                  <td>{{row.$brand ? row.$brand.name : '-'}}</td>
                  <td>{{row.pay_by || '-'}}</td>
                  <td>{{row.memo || '-' }}</td>
                  <td>{{row.total_price || '-'}}</td>
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
        searchable : [ 'username', 'memo', 'pay_by' ],
        with: [
          {type: 'has_one', model: 'user'},
          {type: 'has_one', model: 'brand'},
        ],
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
