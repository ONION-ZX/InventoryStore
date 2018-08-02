import Vue from 'vue';
import api from '../lib/api';

init();

const hub = {
  cart : {},
};

function all () {
  return hub;
}

function add (product_id, count) {
  api('cart/create', { product_id, count })
    .then(() => {
        read();
        alert('已添加!');
    });
}

function read () {
  api('cart/read', { key_by : 'id', with : 'has_one:product', limit : 50 })
    .then(r => {
      Vue.set(hub, 'cart', r.data);
    });
}

function remove (id) {
  api('cart/delete', { id })
    .then(() => {
      read();
      // alert('已删除');
    });
}

function update (id, row) {
  row.id = id;
  api('cart/update', row)
    .then(r => read());
}

function count () {
  return Object.keys(hub.cart).length;
}

function find_by_product_id (product_id) {
  for (let id in hub.cart) {
    let it = hub.cart[ id ];
    if (it.product_id == product_id)
      return it;
  }
}

function product_exist (product_id) {
  return !!find_by_product_id(product_id);
}


function init () {
  read();
}

export {hub, all, add, read, remove, update, count, find_by_product_id, product_exist}
