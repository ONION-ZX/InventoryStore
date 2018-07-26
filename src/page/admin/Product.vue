<template>
  <div>
    <Nav :pushDown = "true"/>
    <div>
      <div class="container row">
        <div class="col-lg-3">
          <AdminNav/>
        </div>
        <div class="col-lg-9">
            <div class="content-card">
                <h2>商品列表</h2>
                <form @submit="search($event)">
                    <input class="search" type="search" v-model="keyword" placeholder="搜" autofocus>
                    <button type="submit" hidden>搜</button>
                </form>
                <button @click="show_form = !show_form" class="btn btn-outline-dark tool-bar">创建商品</button>

                <form v-if="show_form" @submit="cou($event)">
                    <!-- <div class="error-list">
                        <div id="exchange_times-error"></div>
                        <div id="publish_reason-error"></div>
                        <div id="price-error"></div>
                        <div id="title-error"></div>
                        <div id="condition-error"></div>
                    </div> -->
                    <div class="input-control">
                        <label>标题</label>
                        <input error-el="#title-error" v-validator="'required|min_length:4|max_length:64'" type="text" v-model="current.title">
                    </div>
                    <div class="input-control">
                        <label>价格</label>
                        <input error-el="#price-error" v-validator="'positive'" type="number" v-model="current.price">
                    </div>
                    <div class="input-control disib">
                        <label>品牌</label>
                        <Dropdown :onSelect="set_brand_id" ref="edit_brand" :api="'brand.name'" :list = "list"/>
                    </div>
                    <div class="input-control disib">
                        <label>尺码</label>
                        <Dropdown :onSelect="set_size_id" ref="edit_size" :api="'size.name'" :list = "list"/>
                    </div>
                    <div class="input-control disib">
                        <label>面料</label>
                        <Dropdown :onSelect="set_fabric_id" ref="edit_fabric" :api="'fabric.name'" :list = "list"/>
                    </div>
                    <div class="input-control disib">
                        <label>颜色</label>
                        <Dropdown :onSelect="set_color_id" ref="edit_color" :api="'color.name'" :list = "list"/>
                    </div>
                   <div class="input-control row">
                       <button class="btn btn-outline-secondary" type="submit">提交</button>
                       <button class="btn btn-outline-secondary" @click="show_form = false" type="button">取消</button>
                   </div>
                </form>
                <table class="table" v-if="!show_form">
                    <thead>
                        <th>标题</th>
                        <th>价格</th>
                        <th>货号</th>
                        <th>品牌</th>
                        <th>尺码</th>
                        <th>面料</th>
                        <th>颜色</th>
                        <th>库存</th>
                        <th>折扣</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(row,index) in list">
                            <td>{{row.title}}</td>
                            <td>{{row.price ? row.price : '-'}}</td>
                            <td>{{row.no ? row.no : '-'}}</td>
                            <td>{{row.$brand ? row.$brand.name : '-'}}</td>
                            <td>{{row.$size ? row.$size.name : '-'}}</td>
                            <td>{{row.$fabric ? row.$fabric.name : '-'}}</td>
                            <td>{{row.$color ? row.$color.name : '-'}}</td>
                            <td>{{row.stock ? row.stock : 'SOLD-OUT'}}</td>
                            <td>{{row.discount ? '是': '否'}}</td>
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
            <Pagination :showForm="!show_form" :totalCount="total" :limit="limit" :onChange="on_page_change"/>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
/* eslint-disable */

  import api from "../../lib/api";
  import Common from '../../mixins/Common';  
  import AdminPage from '../../mixins/AdminPage';
  import Dropdown  from "../../components/Dropdown";


  export default {
      mounted() {
          this.read_by_model('brand');
          this.read_by_model('size');
          this.read_by_model('fabric');
          this.read_by_model('color');
        //   this.read_then_set('size');
        //   this.read_then_set('fabric');
      },
       data() {
         return {
           current: {
               preview: [],
           },
           list: [],
           model: 'product',
           searchable : ['title','description'],
           with: [
               {type: 'has_one', model: 'brand'},
               {type: 'has_one', model: 'size'},
               {type: 'has_one', model: 'fabric'},
               {type: 'has_one', model: 'color'},               
           ],
         }
       },
       methods: {
           set_brand_id(row) {
            this.$set(this.current, 'brand_id', row.id);
           },
           set_size_id(row) {
            this.$set(this.current, 'size_id', row.id);
         },
           set_fabric_id(row) {
            this.$set(this.current, 'fabric_id', row.id);
         },
           set_color_id(row) {
            this.$set(this.current, 'color_id', row.id);
         },
           after_set_current() {
               this.current.preview = this.current.preview || []; 
           },
       },
       mixins: [AdminPage, Common],
  }
</script>

<style scoped>

 .disib {
     width: 15%;
     margin-top: 5px;
     display: inline-block;
     margin-bottom: 15px;
 }

 .disib label {
     padding-left: 10px;
     padding-bottom: 5px;
 }
</style>

