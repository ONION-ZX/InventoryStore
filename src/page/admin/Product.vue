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
                        <input error-el="#title-error" v-validator="'required|min_length:4'" type="text" v-model="current.title">
                    </div>
                    <div class="input-control">
                        <label>添加图片</label>
                        <div style="margin-bottom: 5px">
                            <div :key="i" v-for="(p,i) in current.preview">
                                <input type="text" placeholder="描述" v-model="p.desc">
                                <input type="url" placeholder="图片地址" v-model="p.url">
                                <button type="button" @click="current.preview.splice(i,1)">-</button>
                            </div>
                            <button type="button" @click="current.preview.push({})">+</button>
                        </div>
                    </div>
                    <div class="input-control">
                        <label>价格</label>
                        <input error-el="#price-error" v-validator="'positive'" type="number" v-model="current.price">
                    </div>
                    <div class="input-control">
                        <label>描述</label>
                        <textarea placeholder="请描述你的商品..." error-el="#desc-error" v-validator="'required'" type="text" v-model="current.desc"></textarea>
                    </div>
                    <div class="input-control disib">
                        <label>品牌</label>
                        <Dropdown :onSelect="set_brand_id" ref="edit_brand" :api="'brand.name'" :list = "brand"/>
                    </div>
                    <div class="input-control disib">
                        <label>尺码</label>
                        <Dropdown :onSelect="set_size_id" ref="edit_size" :api="'size.name'" :list = "size"/>
                    </div>
                    <div class="input-control disib">
                        <label>面料</label>
                        <Dropdown :onSelect="set_fabric_id" ref="edit_fabric" :api="'fabric.name'" :list = "fabric"/>
                    </div>
                    <div class="input-control disib">
                        <label>颜色</label>
                        <Dropdown :onSelect="set_color_id" ref="edit_color" :api="'color.name'" :list = "color"/>
                    </div>
                    <div class="input-control">
                        <label>是否促销</label>
                        <input type="checkbox" v-model="current.on_sale">
                    </div>
                    <div class="input-control">
                        <label>是否热卖</label>
                        <input type="checkbox" v-model="current.hot">
                    </div>
                    <div class="input-control">
                        <label>是否为新款</label>
                        <input type="checkbox" v-model="current.latest_arrival">
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
                        <!-- <th>描述</th> -->
                        <!-- <th>货号</th> -->
                        <th>品牌</th>
                        <th>尺码</th>
                        <th>面料</th>
                        <th>颜色</th>
                        <th>库存</th>
                        <th>折扣</th>
                        <th>是否促销</th>
                        <th>是否热卖</th>
                        <th>是否为新款</th>
                        <th>操作</th>
                    </thead>
                    <tbody>
                        <tr :key="index" v-for="(row,index) in list">
                            <td>{{row.title}}</td>
                            <td>{{row.price ? row.price : '-'}}</td>
                            <!-- <td>{{row.desc ? row.desc : '-'}}</td> -->
                            <!-- <td>{{row.no ? row.no : '-'}}</td> -->
                            <td>{{row.$brand ? row.$brand.name : '-'}}</td>
                            <td>{{row.$size ? row.$size.name : '-'}}</td>
                            <td>{{row.$fabric ? row.$fabric.name : '-'}}</td>
                            <td>{{row.$color ? row.$color.name : '-'}}</td>
                            <td>{{row.stock ? row.stock : 'SOLD-OUT'}}</td>
                            <td>{{row.discount ? '是': '否'}}</td>
                            <td>{{row.on_sale ? '是': '否'}}</td>
                            <td>{{row.hot ? '是': '否'}}</td>
                            <td>{{row.latest_arrival ? '是': '否'}}</td>
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
  import validator from "../../directive/validator";
  import Common from '../../mixins/Common';  
  import AdminPage from '../../mixins/AdminPage';
  import Dropdown  from "../../components/Dropdown";


  export default {
      mixins: [AdminPage, Common],
      directives: { validator },
      mounted() {
          this.read_by_model('brand');
          this.read_by_model('size');
          this.read_by_model('fabric');
          this.read_by_model('color');
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
               {relation: 'has_one', model: 'brand'},
               {relation: 'has_one', model: 'size'},
               {relation: 'has_one', model: 'fabric'},
               {relation: 'has_one', model: 'color'},  
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
 textarea {
     margin-top: 8px;
 }
</style>

